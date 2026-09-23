import { NumberInput } from './NumberInput'

type Props = {
  value: string
  onChange: (next: string) => void
  /** Optional className for the row (for search-match highlighting). */
  className?: string
}

export type ShadowParts = { x: number | null; y: number | null; blur: number | null; color: string }

/**
 * parseShadow — split a CSS box-shadow string into its four editable parts.
 * Accepts "none" / "" by returning nulls + empty color.
 */
export function parseShadow(value: string): ShadowParts {
  if (!value || value === 'none') return { x: null, y: null, blur: null, color: '' }
  const colorMatch = value.match(/(rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}|transparent)/)
  const color = colorMatch ? colorMatch[0] : ''
  const withoutColor = color ? value.replace(color, '').trim() : value.trim()
  const lengths = withoutColor.match(/(-?\d*\.?\d+(?:px|rem|em|%)?)/g) || []
  const x = lengths[0] ? parseFloat(lengths[0]) : null
  const y = lengths[1] ? parseFloat(lengths[1]) : null
  const blur = lengths[2] ? parseFloat(lengths[2]) : null
  return { x, y, blur, color }
}

/**
 * serializeShadow — combine the four parts back into a CSS box-shadow string.
 * Defaults: 0px for missing lengths, rgba(0,0,0,0.25) for missing color.
 */
export function serializeShadow(x: number | null, y: number | null, blur: number | null, color: string): string {
  if (x === null && y === null && blur === null && !color) return 'none'
  const xi = x ?? 0
  const yi = y ?? 0
  const bi = blur ?? 0
  const ci = color || 'rgba(0,0,0,0.25)'
  return `${xi}px ${yi}px ${bi}px ${ci}`
}

export function normalizeHex(value: string): string {
  if (!value) return '#000000'
  const trimmed = value.trim()
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed.toLowerCase()
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    return ('#' + trimmed.slice(1).split('').map(c => c + c).join('')).toLowerCase()
  }
  if (/^#[0-9a-fA-F]{8}$/.test(trimmed)) return trimmed.slice(0, 7).toLowerCase()
  const rgbaMatch = trimmed.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/)
  if (rgbaMatch) {
    const r = parseInt(rgbaMatch[1], 10).toString(16).padStart(2, '0')
    const g = parseInt(rgbaMatch[2], 10).toString(16).padStart(2, '0')
    const b = parseInt(rgbaMatch[3], 10).toString(16).padStart(2, '0')
    return `#${r}${g}${b}`
  }
  return '#000000'
}

/**
 * ShadowField — a single shadow row with x/y/blur number fields (each with visible
 * spinner arrows) and a color picker. The parent only sees the serialized string.
 */
export function ShadowField({ value, onChange, className = '' }: Props) {
  const parts = parseShadow(value)

  const update = (next: Partial<ShadowParts>) => {
    onChange(serializeShadow(
      next.x !== undefined ? next.x : parts.x,
      next.y !== undefined ? next.y : parts.y,
      next.blur !== undefined ? next.blur : parts.blur,
      next.color !== undefined ? next.color : parts.color
    ))
  }

  return (
    <div className={`ve-shadow-row ${className}`.trim()}>
      <NumberInput
        className="ve-shadow-row__num"
        aria-label="x offset"
        placeholder="x"
        value={parts.x ?? 0}
        onChange={v => update({ x: v })}
        step={1}
      />
      <NumberInput
        className="ve-shadow-row__num"
        aria-label="y offset"
        placeholder="y"
        value={parts.y ?? 0}
        onChange={v => update({ y: v })}
        step={1}
      />
      <NumberInput
        className="ve-shadow-row__num"
        aria-label="blur"
        placeholder="blur"
        value={parts.blur ?? 0}
        min={0}
        onChange={v => update({ blur: v })}
        step={1}
      />
      <input
        type="color"
        className="shadow-color"
        value={normalizeHex(parts.color)}
        onChange={e => update({ color: e.target.value })}
        aria-label="shadow color"
      />
    </div>
  )
}