import { createContext, ReactNode, useContext } from 'react'
import { defaultTheme, useTheme, type UseThemeOptions, type UseThemeResult } from './useTheme'

// The theme must have exactly one owner. Every `useTheme()` call creates an
// independent copy that loads, applies and auto-saves on its own, so extra
// callers would overwrite the user's edits with stale copies on page hide.
// Components read the shared instance through this context instead.
const ThemeContext = createContext<UseThemeResult | null>(null)

export function ThemeProvider({ children, ...options }: UseThemeOptions & { children: ReactNode }) {
  const value = useTheme(options)
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/** Shared theme state. Must be rendered inside <ThemeProvider>. */
export function useThemeContext(): UseThemeResult {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemeContext must be used inside <ThemeProvider>')
  return ctx
}

/** The active theme, or the default when rendered outside a provider (e.g. tests). */
export function useActiveTheme() {
  return useContext(ThemeContext)?.theme ?? defaultTheme
}
