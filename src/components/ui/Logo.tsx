type Props = {
  size?: number
  className?: string
}

/**
 * The Token T mark. The pill takes the theme's accent and the stem its text
 * colour, so the logo re-skins with every theme.
 */
export function Logo({ size = 24, className = '' }: Props) {
  return (
    <svg className={`logo ${className}`} width={size} height={size} viewBox="0 0 256 256" aria-hidden focusable="false">
      <path fill="var(--color-accent)" d="M60 24H196A36 36 0 0 1 196 96H60A36 36 0 0 1 60 24Z" />
      <path fill="var(--color-text)" d="M92 112H164V188A40 40 0 0 1 124 228H92Z" />
    </svg>
  )
}
