import { useState } from 'react'
import { Menu, MenuTrigger, MenuPanel, MenuItem } from './Menu'
import { fontList } from '../../data/fontList'

type Props = {
  value: string
  onChange: (fontStack: string) => void
  label?: string
}

export function FontPicker({ value, onChange, label }: Props) {
  const [customMode, setCustomMode] = useState(!fontList.includes(value) && value !== '')

  const displayLabel = value
    ? value.split(',')[0].replace(/['"]/g, '').trim() || 'Custom...'
    : 'Select font...'

  return (
    <div className="font-picker">
      {label && <span className="font-picker__label">{label}</span>}
      {!customMode ? (
        <div className="font-picker__row">
          <Menu>
            <MenuTrigger className="font-picker__select" aria-label={label ?? 'Font family'}>
              <span style={{ fontFamily: value }}>{displayLabel}</span> ▾
            </MenuTrigger>
            <MenuPanel>
              {fontList.map(f => (
                <MenuItem
                  key={f}
                  value={f}
                  active={f === value}
                  onSelect={onChange}
                  title={f}
                >
                  <span style={{ fontFamily: f }}>{f.split(',')[0].replace(/['"]/g, '')}</span>
                </MenuItem>
              ))}
              <MenuItem
                value="__custom__"
                active={false}
                onSelect={() => setCustomMode(true)}
              >
                Custom...
              </MenuItem>
            </MenuPanel>
          </Menu>
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