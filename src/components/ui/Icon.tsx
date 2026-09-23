import { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const base = (size?: number) => ({
  width: size ?? 18,
  height: size ?? 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false
})

export function SearchIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export function HomeIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </svg>
  )
}

export function PlusIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export function ChatIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M21 12a8 8 0 1 1-3.2-6.4L21 4l-1 4-3.5.7A8 8 0 0 1 21 12z" />
    </svg>
  )
}

export function UserIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
    </svg>
  )
}

export function MegaphoneIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M3 11v2a2 2 0 0 0 2 2h2l8 5V4l-8 5H5a2 2 0 0 0-2 2z" />
      <path d="M19 8a4 4 0 0 1 0 8" />
    </svg>
  )
}

export function InfoIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16" />
      <circle cx="12" cy="8" r="0.5" fill="currentColor" />
    </svg>
  )
}

export function CheckIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function WarningIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M12 3l10 17H2L12 3z" />
      <line x1="12" y1="10" x2="12" y2="14" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </svg>
  )
}

export function DangerIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <line x1="8" y1="8" x2="16" y2="16" />
      <line x1="16" y1="8" x2="8" y2="16" />
    </svg>
  )
}

export function BoltIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <polygon points="13 2 4 14 11 14 10 22 20 10 13 10 13 2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function BoxIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M3 7l9-4 9 4-9 4-9-4z" />
      <path d="M3 7v10l9 4 9-4V7" />
      <line x1="12" y1="11" x2="12" y2="21" />
    </svg>
  )
}

export function PaletteIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M12 3a9 9 0 1 0 0 18c1 0 2-1 2-2v-1c0-1 1-2 2-2h2a4 4 0 0 0 4-4 9 9 0 0 0-10-9z" />
      <circle cx="7" cy="11" r="1" fill="currentColor" />
      <circle cx="9" cy="7" r="1" fill="currentColor" />
      <circle cx="13" cy="6" r="1" fill="currentColor" />
      <circle cx="17" cy="9" r="1" fill="currentColor" />
    </svg>
  )
}

export function CommentIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M21 12a8 8 0 1 1-3.5-6.6L21 4l-1 4-3.4.6A8 8 0 0 1 21 12z" />
    </svg>
  )
}

export function HeartIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

export function ShareIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

export function CalendarIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
    </svg>
  )
}

export function SubtaskIcon({ size, ...rest }: IconProps) {
  return (
    <svg {...base(size)} {...rest}>
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <polyline points="6 10 9 13 14 7" />
      <rect x="7" y="11" width="14" height="10" rx="2" />
    </svg>
  )
}
