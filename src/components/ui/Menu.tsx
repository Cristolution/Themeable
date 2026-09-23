import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

/**
 * Menu — single source of truth for dropdown styling across the app.
 *
 * The trigger, panel, and items all share the same look as the navbar's
 * preset menu (`.nav__presets-menu` / `.preset-chip`). Use it anywhere a
 * native `<select>` would feel out of place next to the nav dropdowns.
 *
 *   <Menu value={value} onChange={setValue} options={[
 *     { value: 'a', label: 'Alpha' },
 *     { value: 'b', label: 'Beta' },
 *   ]} />
 *
 * Or compose by hand when you need a custom trigger or extra UI inside the
 * panel:
 *
 *   <Menu value={x} onChange={setX} options={...}>
 *     <MenuTrigger>{labelFor(x)} ▾</MenuTrigger>
 *     <MenuPanel>{...custom children}</MenuPanel>
 *   </Menu>
 */

export type MenuOption<V extends string | number = string> = {
  value: V
  label: ReactNode
  /** Optional className on the row (for highlighting/search match). */
  className?: string
  /** Optional dot color — shown as a small circle next to the label. */
  dotColor?: string
  /** Native title attribute on the row. */
  title?: string
  /** Disable this option (rendered but unclickable, dimmed). */
  disabled?: boolean
}

type MenuContextValue = {
  open: boolean
  setOpen: (next: boolean) => void
  triggerRef: { current: HTMLButtonElement | null }
  panelRef: { current: HTMLDivElement | null }
  triggerId: string
  panelId: string
}

const MenuContext = createContext<MenuContextValue | null>(null)

function useMenuContext(component: string): MenuContextValue {
  const ctx = useContext(MenuContext)
  if (!ctx) {
    throw new Error(`<${component}> must be rendered inside <Menu>`)
  }
  return ctx
}

type MenuProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (next: boolean) => void
  children: ReactNode
}

/**
 * Menu root — provides shared state to MenuTrigger / MenuPanel / MenuItem.
 * Pass `open` + `onOpenChange` for controlled mode, or `defaultOpen` for
 * uncontrolled.
 */
export function Menu({ open: openProp, defaultOpen, onOpenChange, children }: MenuProps) {
  const isControlled = openProp !== undefined
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false)
  const open = isControlled ? openProp : internalOpen

  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const triggerId = useId()
  const panelId = useId()

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  return (
    <MenuContext.Provider value={{ open, setOpen, triggerRef, panelRef, triggerId, panelId }}>
      <div className="menu">{children}</div>
    </MenuContext.Provider>
  )
}

type MenuTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>

/**
 * MenuTrigger — the button that opens/closes the panel. Defaults to the
 * `Button variant="ghost" size="sm"` look used everywhere else.
 */
export function MenuTrigger({ children, onClick, className = '', ...rest }: MenuTriggerProps) {
  const { open, setOpen, triggerRef, triggerId, panelId } = useMenuContext('MenuTrigger')

  return (
    <button
      {...rest}
      ref={triggerRef}
      id={triggerId}
      type="button"
      className={`menu__trigger ${className}`.trim()}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={panelId}
      onClick={e => {
        setOpen(!open)
        onClick?.(e)
      }}
    >
      {children}
    </button>
  )
}

type MenuPanelProps = {
  children: ReactNode
  /** Align the panel relative to the trigger. Defaults to "start". */
  align?: 'start' | 'end'
  className?: string
}

export function MenuPanel({ children, align = 'start', className = '' }: MenuPanelProps) {
  const { open, setOpen, panelRef, triggerRef, panelId } = useMenuContext('MenuPanel')

  // Outside click + Escape to close
  useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      const t = e.target as Node
      if (panelRef.current?.contains(t)) return
      if (triggerRef.current?.contains(t)) return
      setOpen(false)
    }
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, setOpen, panelRef, triggerRef])

  if (!open) return null

  return (
    <div
      ref={panelRef}
      id={panelId}
      role="menu"
      className={`menu__panel menu__panel--${align} ${className}`.trim()}
    >
      {children}
    </div>
  )
}

type MenuItemProps<V extends string | number = string> = {
  value: V
  /** Whether this option is currently selected. */
  active?: boolean
  disabled?: boolean
  onSelect?: (value: V) => void
  /** Optional dot color — shows a small circle before the label. */
  dotColor?: string
  className?: string
  children: ReactNode
  title?: string
}

/**
 * MenuItem — a row inside the panel. Renders a `.preset-chip`-style button.
 *
 * Used directly inside `MenuPanel`, OR auto-generated when you use the
 * convenience <Menu options={...} /> form below.
 */
export function MenuItem<V extends string | number = string>({
  value,
  active,
  disabled,
  onSelect,
  dotColor,
  className = '',
  children,
  title,
}: MenuItemProps<V>) {
  const { setOpen, triggerRef, panelRef } = useMenuContext('MenuItem')

  const handleClick = () => {
    if (disabled) return
    onSelect?.(value)
    setOpen(false)
    triggerRef.current?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      focusNextMenuItem(panelRef.current, e.currentTarget, 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      focusNextMenuItem(panelRef.current, e.currentTarget, -1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      const first = panelRef.current?.querySelector<HTMLButtonElement>('.menu__item:not(:disabled)')
      first?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      const items = panelRef.current?.querySelectorAll<HTMLButtonElement>('.menu__item:not(:disabled)')
      items && items[items.length - 1]?.focus()
    }
  }

  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      className={`preset-chip menu__item ${active ? 'preset-chip--active' : ''} ${disabled ? 'menu__item--disabled' : ''} ${className}`.trim()}
      onClick={handleClick}
      onKeyDown={onKeyDown}
      title={title}
    >
      {dotColor !== undefined && (
        <span className="preset-chip__dot" style={{ background: dotColor }} aria-hidden />
      )}
      {children}
    </button>
  )
}

function focusNextMenuItem(
  panel: HTMLDivElement | null,
  current: HTMLButtonElement,
  direction: 1 | -1
) {
  if (!panel) return
  const items = Array.from(panel.querySelectorAll<HTMLButtonElement>('.menu__item:not(:disabled)'))
  const idx = items.indexOf(current)
  if (idx < 0) return
  const next = items[(idx + direction + items.length) % items.length]
  next?.focus()
}

// ----- Convenience <Menu options={...} /> form -----

type ControlledMenuProps<V extends string | number = string> = {
  value: V
  onChange: (next: V) => void
  options: MenuOption<V>[]
  triggerLabel?: ReactNode
  align?: 'start' | 'end'
  ariaLabel?: string
  /** Class added to the trigger (for size/color tweaks). */
  triggerClassName?: string
  /** Class added to the panel. */
  panelClassName?: string
}

/**
 * Convenience wrapper — pass `value` + `onChange` + `options` and you get a
 * fully wired dropdown without manually composing MenuTrigger / MenuPanel /
 * MenuItem. Use this for the common case.
 */
export function ControlledMenu<V extends string | number = string>({
  value,
  onChange,
  options,
  triggerLabel,
  align,
  ariaLabel,
  triggerClassName,
  panelClassName,
}: ControlledMenuProps<V>) {
  return (
    <Menu>
      <MenuTrigger className={triggerClassName} aria-label={ariaLabel}>
        {triggerLabel ?? (options.find(o => o.value === value)?.label ?? String(value))} ▾
      </MenuTrigger>
      <MenuPanel align={align} className={panelClassName}>
        {options.map(o => (
          <MenuItem
            key={String(o.value)}
            value={o.value}
            active={o.value === value}
            disabled={o.disabled}
            dotColor={o.dotColor}
            className={o.className}
            title={o.title}
            onSelect={v => onChange(v as V)}
          >
            {o.label}
          </MenuItem>
        ))}
      </MenuPanel>
    </Menu>
  )
}