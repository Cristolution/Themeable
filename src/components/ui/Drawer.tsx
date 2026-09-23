import { useEffect, ReactNode } from 'react'
import { Button } from './Button'

type Props = {
  open: boolean
  onClose: () => void
  side?: 'start' | 'end'
  width?: number
  title?: string
  children: ReactNode
}

export function Drawer({ open, onClose, side = 'start', width = 300, title, children }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="drawer-overlay" onClick={onClose} role="presentation">
      <div
        className={`drawer drawer--${side}`}
        style={{ width }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {title && (
          <header className="drawer__header">
            <h3 className="drawer__title">{title}</h3>
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">×</Button>
          </header>
        )}
        <div className="drawer__body">{children}</div>
      </div>
    </div>
  )
}
