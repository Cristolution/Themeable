import { useEffect, ReactNode } from 'react'
import { Button } from './Button'

type Props = {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
}

export function Modal({ open, onClose, title, children }: Props) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div className="modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}>
        {title && (
          <header className="modal__header">
            <h3 className="modal__title">{title}</h3>
            <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">×</Button>
          </header>
        )}
        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}