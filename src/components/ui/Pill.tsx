import { ReactNode } from 'react'

type Props = {
  tone: 'success' | 'warning' | 'danger' | 'neutral' | 'info'
  children: ReactNode
}

export function Pill({ tone, children }: Props) {
  return <span className={`pill pill--${tone}`}>{children}</span>
}