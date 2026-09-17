type Props = {
  value: string
  onChange: (newValue: string) => void
  label?: string
}

const UNITS = ['px', 'rem', 'em', '%', 'vh', 'vw', 'vmin', 'vmax', 'ch', 'ex']

// Parse "4px" → { num: 4, unit: 'px' }. Falls back to num=0 unit='px' on malformed input.
function parse(val: string): { num: number; unit: string } {
  const m = val.trim().match(/^(-?\d*\.?\d+)(.*)$/)
  if (!m) return { num: 0, unit: 'px' }
  return { num: parseFloat(m[1]), unit: m[2] || 'px' }
}

export function LengthInput({ value, onChange, label }: Props) {
  const { num, unit } = parse(value)

  const updateNum = (newNum: number) => {
    onChange(`${newNum}${unit}`)
  }

  const updateUnit = (newUnit: string) => {
    onChange(`${num}${newUnit}`)
  }

  return (
    <div className="length-input">
      {label && <span className="length-input__label">{label}</span>}
      <div className="length-input__row">
        <input
          type="number"
          className="field__input length-input__num"
          value={num}
          step="0.1"
          onChange={e => updateNum(parseFloat(e.target.value) || 0)}
        />
        <select
          className="field__input length-input__unit"
          value={unit}
          onChange={e => updateUnit(e.target.value)}
        >
          {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>
    </div>
  )
}
