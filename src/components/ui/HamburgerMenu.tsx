type Props = {
  open: boolean
  onToggle: () => void
  ariaLabel?: string
}

export function HamburgerMenu({ open, onToggle, ariaLabel = 'Toggle menu' }: Props) {
  return (
    <button
      className={`hamburger ${open ? 'hamburger--open' : ''}`}
      onClick={onToggle}
      aria-label={ariaLabel}
      aria-expanded={open}
    >
      <span className="hamburger__line" />
      <span className="hamburger__line" />
      <span className="hamburger__line" />
    </button>
  )
}
