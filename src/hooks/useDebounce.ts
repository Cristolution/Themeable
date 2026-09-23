import { useEffect, useRef } from 'react'

/**
 * Run `fn` after `delay`ms have elapsed since the last call to the returned
 * debounced function. Cancels any pending invocation on unmount.
 *
 * Useful for coalescing rapid state changes (e.g. auto-save) into a single
 * side effect after the user pauses.
 */
export function useDebouncedCallback<A extends unknown[]>(
  fn: (...args: A) => void,
  delay: number,
): (...args: A) => void {
  const fnRef = useRef(fn)
  fnRef.current = fn
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => {
      if (timerRef.current !== undefined) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  return (...args: A) => {
    if (timerRef.current !== undefined) {
      window.clearTimeout(timerRef.current)
    }
    timerRef.current = window.setTimeout(() => {
      timerRef.current = undefined
      fnRef.current(...args)
    }, delay)
  }
}
