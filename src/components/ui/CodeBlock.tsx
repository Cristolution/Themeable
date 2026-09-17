import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  language?: string
}

export function CodeBlock({ children, language }: Props) {
  return (
    <pre className="code-block" data-language={language}>
      <code>{children}</code>
    </pre>
  )
}