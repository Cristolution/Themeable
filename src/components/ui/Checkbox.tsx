import { InputHTMLAttributes, ReactNode } from 'react'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: ReactNode
}

export function Checkbox({ checked, onChange, label, className = '', ...rest }: Props) {
  return (
    <label className={`checkbox ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        {...rest}
      />
      <span className="checkbox__box" aria-hidden>
        {checked && <span className="checkbox__check">✓</span>}
      </span>
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  )
}
