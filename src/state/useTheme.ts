import { useCallback, useEffect, useRef, useState } from 'react'
import type { Theme } from '../theme/schema'
import { applyTheme } from '../theme/engine'
import { saveTheme, loadTheme } from '../theme/storage'

// Minimal default theme — replaced by presets in Task 22.
const defaultTheme: Theme = {
  name: 'Default',
  colors: {
    bg: '#ffffff', bgElevated: '#f5f5f7', bgSubtle: '#ececef',
    text: '#1a1a1a', textMuted: '#666666', border: '#dcdce0',
    accent: '#3b82f6', accentText: '#ffffff',
    success: '#10b981', warning: '#f59e0b', danger: '#ef4444'
  },
  typography: {
    fontFamily: { body: 'system-ui, sans-serif', heading: 'system-ui, sans-serif', mono: 'ui-monospace, monospace' },
    fontSize: { xs: '12px', sm: '14px', base: '15px', lg: '18px', xl: '22px', '2xl': '28px' },
    fontWeight: { normal: 400, medium: 500, bold: 700 },
    lineHeight: { tight: 1.2, normal: 1.5, loose: 1.8 }
  },
  spacing: { unit: '4px', xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px' },
  radius: { none: '0', sm: '4px', md: '8px', lg: '12px', full: '9999px' },
  shadows: { none: 'none', sm: '0 1px 2px rgba(0,0,0,0.05)', md: '0 4px 12px rgba(0,0,0,0.1)', lg: '0 12px 32px rgba(0,0,0,0.15)' },
  borders: { width: '1px', style: 'solid' },
  transitions: { fast: '120ms ease', normal: '200ms ease', slow: '400ms ease' },
  customCss: ''
}

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
