import { useEffect } from 'react'

type Props = {
  message: string
  tone?: 'error' | 'success'
  onDismiss: () => void
}

export function Toast({ message, tone = 'error', onDismiss }: Props) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000)
    return () => clearTimeout(t)
  }, [message, onDismiss])

  return (
    <div className={`toast toast--${tone}`} role="status">
      <span>{message}</span>
      <button className="toast__close" onClick={onDismiss} aria-label="Dismiss">×</button>
    </div>
  )
}