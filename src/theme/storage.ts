import type { Theme } from './schema'
import { validateTheme } from './validate'

const KEY = 'td:theme'

export type LoadThemeOptions = {
  /**
   * Called when stored data is found but cannot be loaded —
   * either because JSON parsing fails or the parsed value fails validation.
   * Fired AFTER the bad entry has been removed from localStorage.
   */
  onCorrupt?: (reason: 'parse' | 'validate' | 'access') => void
}

export function saveTheme(theme: Theme): { ok: true } | { ok: false; error: string } {
  try {
    localStorage.setItem(KEY, JSON.stringify(theme))
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'unknown error' }
  }
}

export function loadTheme(options: LoadThemeOptions = {}): Theme | null {
  const { onCorrupt } = options
  let raw: string | null
  try {
    raw = localStorage.getItem(KEY)
  } catch {
    clearStoredTheme()
    onCorrupt?.('access')
    return null
  }

  if (raw === null) return null

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    clearStoredTheme()
    onCorrupt?.('parse')
    return null
  }

  const result = validateTheme(parsed)
  if (!result.ok) {
    clearStoredTheme()
    onCorrupt?.('validate')
    return null
  }

  return result.theme
}

export function clearStoredTheme(): void {
  try { localStorage.removeItem(KEY) } catch { /* ignore */ }
}
