import { useEffect, useState } from 'react'
import { useTheme } from '../state/useTheme'
import type { Theme } from '../theme/schema'

export function useBreakpoint(token: keyof Theme['breakpoints']): boolean {
  const { theme } = useTheme()
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    const px = parseInt(theme.breakpoints[token], 10)
    return window.matchMedia(`(min-width: ${px}px)`).matches
  })

  useEffect(() => {
    const px = parseInt(theme.breakpoints[token], 10)
    const mql = window.matchMedia(`(min-width: ${px}px)`)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [theme.breakpoints[token]])

  return matches
}