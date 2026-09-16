import { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'md', children, className = '', ...rest }: Props) {
  return (
    <button {...rest} className={`btn btn--${variant} btn--${size} ${className}`}>
      {children}
    </button>
  )
}