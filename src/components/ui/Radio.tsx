import { InputHTMLAttributes, ReactNode } from 'react'

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  name: string
  value: string
  checked: boolean
  onChange: (value: string) => void
  label?: ReactNode
}

export function Radio({ name, value, checked, onChange, label, className = '', ...rest }: RadioProps) {
  return (
    <label className={`radio ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        {...rest}
      />
      <span className="radio__dot" aria-hidden>
        {checked && <span className="radio__dot-inner" />}
      </span>
      {label && <span className="radio__label">{label}</span>}
    </label>
  )
}

type GroupProps = {
  name: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: ReactNode }[]
  label?: ReactNode
}

export function RadioGroup({ name, value, onChange, options, label }: GroupProps) {
  return (
    <fieldset className="radio-group">
      {label && <legend className="radio-group__legend">{label}</legend>}
      <div className="radio-group__options">
        {options.map(opt => (
          <Radio
            key={opt.value}
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={onChange}
            label={opt.label}
          />
        ))}
      </div>
    </fieldset>
  )
}
