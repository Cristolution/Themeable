import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Theme } from '../theme/schema'
import { applyTheme } from '../theme/engine'
import { saveTheme, loadTheme } from '../theme/storage'
import { midnight } from '../theme/presets'

// Default theme — Midnight preset (added in Task 21).
const defaultTheme: Theme = midnight

// Debounce window for auto-save. Short enough that a tab close loses at most
// a few hundred ms of edits, long enough to coalesce rapid typing / color drags.
const AUTOSAVE_DELAY_MS = 300

export type UseThemeOptions = {
  /**
   * Called when stored data is found but cannot be loaded — bad JSON, failed
   * validation, or a localStorage access error. The bad data has already been
   * removed from storage by the time this fires.
   */
  onCorrupt?: (reason: 'parse' | 'validate' | 'access') => void
}

export type UseThemeResult = {
  theme: Theme
  setTheme: (next: Theme) => void
  dirty: boolean
  save: () => { ok: true } | { ok: false; error: string }
  reset: () => void
  lastSaved: Theme
  /** Last save error, if any. Cleared on the next successful save. */
  error: string | null
}

export function useTheme(options: UseThemeOptions = {}): UseThemeResult {
  const { onCorrupt } = options
  // Read initial state once. Both `theme` and `lastSaved` start from the same
  // stored value (or the default), so `dirty` is false on mount.
  const initial = useMemo(
    () => loadTheme({ onCorrupt }) ?? defaultTheme,
    // onCorrupt is intentionally omitted from deps — it's a callback the
    // caller may re-create on every render and we don't want to re-load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [theme, setThemeState] = useState<Theme>(initial)
  const [lastSaved, setLastSaved] = useState<Theme>(initial)
  const [error, setError] = useState<string | null>(null)

  const lastSavedRef = useRef(lastSaved)
  lastSavedRef.current = lastSaved

  // Mirror the theme into the DOM on every change.
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Auto-save: write to localStorage after the debounce window.
  // Each new theme change resets the timer, so rapid edits coalesce into a
  // single write after the user pauses.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const result = saveTheme(theme)
      if (result.ok) {
        setLastSaved(theme)
        setError(null)
      } else {
        setError(result.error)
      }
    }, AUTOSAVE_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [theme])

  // Flush any pending save synchronously when the page is hiding — closes the
  // 300ms window where a tab close would lose the most recent edit.
  useEffect(() => {
    const flush = () => {
      // Read the freshest theme via a ref to avoid stale closures.
      saveTheme(currentThemeRef.current)
    }
    window.addEventListener('pagehide', flush)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flush()
    })
    return () => {
      window.removeEventListener('pagehide', flush)
    }
  }, [])

  const currentThemeRef = useRef(theme)
  currentThemeRef.current = theme

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
  }, [])

  const dirty = JSON.stringify(theme) !== JSON.stringify(lastSaved)

  // Manual save — kept for backwards compatibility with the Save button.
  // With auto-save in place, this is now a no-op (data is already persisted).
  const save = useCallback(() => {
    const result = saveTheme(theme)
    if (result.ok) {
      setLastSaved(theme)
      setError(null)
      return { ok: true as const }
    }
    setError(result.error)
    return result
  }, [theme])

  const reset = useCallback(() => {
    setThemeState(lastSavedRef.current)
  }, [])

  return { theme, setTheme, dirty, save, reset, lastSaved, error }
}

export { defaultTheme }
