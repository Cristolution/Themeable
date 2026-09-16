import { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string }

export function Input({ label, id, className = '', ...rest }: Props) {
  const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`
  return (
    <div className="field">
      {label && <label className="field__label" htmlFor={inputId}>{label}</label>}
      <input id={inputId} {...rest} className={`field__input ${className}`} />
    </div>
  )
}