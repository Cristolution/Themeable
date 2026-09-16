import type { Theme } from './schema'
import { validateTheme } from './validate'

const KEY = 'td:theme'

export function saveTheme(theme: Theme): { ok: true } | { ok: false; error: string } {
  try {
    localStorage.setItem(KEY, JSON.stringify(theme))
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'unknown error' }
  }
}

export function loadTheme(): Theme | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    const result = validateTheme(parsed)
    return result.ok ? result.theme : null
  } catch {
    return null
  }
}

export function clearStoredTheme(): void {
  try { localStorage.removeItem(KEY) } catch { /* ignore */ }
}
