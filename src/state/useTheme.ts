import { useCallback, useEffect, useRef, useState } from 'react'
import type { Theme } from '../theme/schema'
import { applyTheme } from '../theme/engine'
import { saveTheme, loadTheme } from '../theme/storage'
import { midnight } from '../theme/presets'

// Default theme — Midnight preset (added in Task 21).
const defaultTheme: Theme = midnight

function stableStringify(t: Theme): string {
  return JSON.stringify(t)
}

export type UseThemeResult = {
  theme: Theme
  setTheme: (next: Theme) => void
  dirty: boolean
  save: () => { ok: true } | { ok: false; error: string }
  reset: () => void
  lastSaved: Theme
}

export function useTheme(): UseThemeResult {
  const [theme, setThemeState] = useState<Theme>(() => loadTheme() ?? defaultTheme)
  const [lastSaved, setLastSaved] = useState<Theme>(() => loadTheme() ?? defaultTheme)
  const lastSavedRef = useRef(lastSaved)
  lastSavedRef.current = lastSaved

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
  }, [])

  const dirty = stableStringify(theme) !== stableStringify(lastSaved)

  const save = useCallback(() => {
    const result = saveTheme(theme)
    if (result.ok) setLastSaved(theme)
    return result
  }, [theme])

  const reset = useCallback(() => {
    setThemeState(lastSavedRef.current)
  }, [])

  return { theme, setTheme, dirty, save, reset, lastSaved }
}

export { defaultTheme }
