import { NumberInput } from './NumberInput'
import { Menu, MenuTrigger, MenuPanel, MenuItem } from './Menu'

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
        <NumberInput
          className="length-input__num"
          value={num}
          step={0.1}
          onChange={updateNum}
          aria-label="length value"
        />
        <Menu>
          <MenuTrigger className="length-input__unit" aria-label="length unit">{unit} ▾</MenuTrigger>
          <MenuPanel>
            {UNITS.map(u => (
              <MenuItem
                key={u}
                value={u}
                active={u === unit}
                onSelect={updateUnit}
              >
                {u}
              </MenuItem>
            ))}
          </MenuPanel>
        </Menu>
      </div>
    </div>
  )
}