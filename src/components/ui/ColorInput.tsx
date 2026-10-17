import { parseColor, rgbaToHex } from '../../theme/io'

type Props = {
  value: string
  onChange: (value: string) => void
}

/**
 * Native color picker that tolerates translucent values. <input type="color">
 * only understands #rrggbb, so translucent tokens (focusRing, overlay) are
 * shown without alpha and get their original alpha re-applied on change.
 */
export function ColorInput({ value, onChange }: Props) {
  const parsed = parseColor(value)
  const alpha = parsed?.a ?? 1
  const opaque = parsed ? rgbaToHex({ ...parsed, a: 1 }) : '#000000'

  return (
    <input
      type="color"
      value={opaque}
      title={value}
      onChange={e => {
        if (alpha >= 1) return onChange(e.target.value)
        const next = parseColor(e.target.value)
        onChange(next ? rgbaToHex({ ...next, a: alpha }) : e.target.value)
      }}
    />
  )
}
