import { useBreakpoint } from './useBreakpoint'

export function useIsTablet(): boolean {
  const atSm = useBreakpoint('sm')
  const atLg = useBreakpoint('lg')
  return atSm && !atLg
}
