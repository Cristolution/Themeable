import { useEffect, useState, type InputHTMLAttributes } from 'react'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange' | 'type'> & {
  value: number
  onChange: (next: number) => void
  /** Step used by spinner arrows and ArrowUp/ArrowDown. Defaults to 1. */
  step?: number
  /** Multiplier applied when Shift is held. Defaults to 10. */
  shiftMultiplier?: number
  min?: number
  max?: number
  /** When true (default), empty input is allowed mid-edit and onChange is skipped until a number is entered. */
  allowEmpty?: boolean
}

/**
 * NumberInput — a numeric input that always shows visible up/down spinner arrows.
 *
 * - Native spinners (rendered via type="number") — keeps browser-native behavior:
 *   arrow keys, scroll-wheel stepping, PgUp/PgDn, Home/End, Shift+Arrow for x10.
 * - Allows temporary empty string while the user is typing (e.g. "1." → "") so we
 *   don't coerce to 1 prematurely. While empty, onChange is not called.
 * - Clamps to min/max on commit (blur) and after stepping.
 */
export function NumberInput({
  value,
  onChange,
  step = 1,
  shiftMultiplier = 10,
  min,
  max,
  allowEmpty = true,
  className = '',
  onKeyDown,
  onBlur,
  ...rest
}: Props) {
  // Local string state so the user can type partial values like "1." or "-".
  const [text, setText] = useState(() => formatForInput(value))

  // Keep local state in sync when the parent's value changes externally
  // (preset switch, import, undo/redo). We only overwrite when the value
  // has actually changed numerically — not on every keystroke from the parent.
  useEffect(() => {
    const parsed = parseFloat(text)
    if (Number.isNaN(parsed) || parsed !== value) {
      setText(formatForInput(value))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const commit = (raw: string) => {
    if (raw === '' || raw === '-' || raw === '.' || raw === '-.') {
      // Keep raw text visible to the user; don't fire onChange.
      return
    }
    const n = parseFloat(raw)
    if (Number.isNaN(n)) return
    const clamped = clamp(n, min, max)
    if (clamped !== n) setText(formatForInput(clamped))
    if (clamped !== value) onChange(clamped)
  }

  const stepBy = (direction: 1 | -1, shift: boolean) => {
    const current = Number.isFinite(parseFloat(text)) ? parseFloat(text) : value
    const delta = step * (shift ? shiftMultiplier : 1) * direction
    const next = clamp(current + delta, min, max)
    setText(formatForInput(next))
    if (next !== value) onChange(next)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      stepBy(e.key === 'ArrowUp' ? 1 : -1, e.shiftKey)
    }
    onKeyDown?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    commit(e.target.value)
    // If the field was left empty, restore the numeric value.
    if ((e.target.value === '' || e.target.value === '-' || e.target.value === '.') && allowEmpty) {
      setText(formatForInput(value))
    }
    onBlur?.(e)
  }

  return (
    <input
      {...rest}
      type="number"
      inputMode="decimal"
      className={`field__input number-input ${className}`.trim()}
      value={text}
      step={step}
      min={min}
      max={max}
      onChange={e => {
        const next = e.target.value
        setText(next)
        commit(next)
      }}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  )
}

function clamp(n: number, min?: number, max?: number): number {
  let v = n
  if (typeof min === 'number' && v < min) v = min
  if (typeof max === 'number' && v > max) v = max
  return v
}

function formatForInput(n: number): string {
  if (!Number.isFinite(n)) return '0'
  // Strip trailing zeros after decimal point for cleaner display, but keep
  // integers as integers.
  return Number(n.toFixed(6)).toString()
}