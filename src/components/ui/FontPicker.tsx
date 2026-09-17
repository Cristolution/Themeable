import { useState } from 'react'
import { fontList } from '../../data/fontList'

type Props = {
  value: string
  onChange: (fontStack: string) => void
  label?: string
}

export function FontPicker({ value, onChange, label }: Props) {
  const [customMode, setCustomMode] = useState(!fontList.includes(value) && value !== '')

  return (
    <div className="font-picker">
      {label && <span className="font-picker__label">{label}</span>}
      {!customMode ? (
        <div className="font-picker__row">
          <select
            className="field__input font-picker__select"
            value={value}
            onChange={e => onChange(e.target.value)}
          >
            {fontList.map(f => (
              <option key={f} value={f} style={{ fontFamily: f }}>{f.split(',')[0].replace(/['"]/g, '')}</option>
            ))}
            <option value="__custom__">Custom...</option>
          </select>
          <button type="button" className="font-picker__toggle" onClick={() => setCustomMode(true)}>
            Edit
          </button>
        </div>
      ) : (
        <div className="font-picker__row">
          <input
            type="text"
            className="field__input font-picker__input"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="Custom font stack"
          />
          <button type="button" className="font-picker__toggle" onClick={() => setCustomMode(false)}>
            Pick
          </button>
        </div>
      )}
    </div>
  )
}
