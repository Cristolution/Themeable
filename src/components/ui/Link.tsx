import { AnchorHTMLAttributes, ReactNode } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  children: ReactNode
  external?: boolean
}

export function Link({ href, children, external, className = '', ...rest }: Props) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a href={href} className={`app-link ${className}`} {...externalProps} {...rest}>
      {children}
    </a>
  )
}