import { CSSProperties, ReactNode } from 'react'

type Props = {
  title?: ReactNode
  action?: ReactNode
  children: ReactNode
  className?: string
  id?: string
  style?: CSSProperties
}

export function Card({ title, action, children, className = '', id, style }: Props) {
  return (
    <section className={`card ${className}`} id={id} style={style}>
      {(title || action) && (
        <header className="card__header">
          {title && <h3 className="card__title">{title}</h3>}
          {action && <div className="card__action">{action}</div>}
        </header>
      )}
      <div className="card__body">{children}</div>
    </section>
  )
}