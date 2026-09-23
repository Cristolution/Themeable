import { ReactNode } from 'react'

type Tone = 'success' | 'warning' | 'danger' | 'neutral' | 'info'

type Props = {
  tone?: Tone
  children: ReactNode
  style?: React.CSSProperties
}

export function Pill({ tone = 'neutral', children, style }: Props) {
  return <span className={`pill pill--${tone}`} style={style}>{children}</span>
}