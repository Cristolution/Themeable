import { SelectHTMLAttributes } from 'react'

type Option = { value: string; label: string }
type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  options: Option[]
}

export function Select({ label, options, id, className = '', ...rest }: Props) {
  const selectId = id ?? `select-${Math.random().toString(36).slice(2, 9)}`
  return (
    <div className="field">
      {label && <label className="field__label" htmlFor={selectId}>{label}</label>}
      <select id={selectId} {...rest} className={`field__input ${className}`}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}