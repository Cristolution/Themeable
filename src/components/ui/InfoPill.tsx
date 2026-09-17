import { ReactNode } from 'react'

type Props = {
  tone?: 'info'
  children: ReactNode
}

export function InfoPill({ tone = 'info', children }: Props) {
  return <span className={`pill pill--${tone}`}>{children}</span>
}