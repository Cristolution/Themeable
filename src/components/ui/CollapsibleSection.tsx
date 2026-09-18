import { ReactNode } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

type Props = {
  title: string
  defaultOpen?: boolean
  persistKey?: string
  children: ReactNode
}

export function CollapsibleSection({ title, defaultOpen = true, persistKey, children }: Props) {
  // Use persisted value when persistKey is set; otherwise use defaultOpen.
  const storage = useLocalStorage<boolean>(
    persistKey ? `td:collapsed:${persistKey}` : '__unused__',
    defaultOpen
  )
  const isOpen = persistKey ? storage[0] : defaultOpen

  return (
    <details
      open={isOpen}
      onToggle={e => {
        if (persistKey) {
          e.preventDefault()
          storage[1](!storage[0])
        }
      }}
      className="collapsible"
    >
      <summary className="collapsible__summary">
        <span>{title}</span>
        <span className="collapsible__chevron" aria-hidden>{isOpen ? '−' : '+'}</span>
      </summary>
      <div className="collapsible__body">
        {children}
      </div>
    </details>
  )
}