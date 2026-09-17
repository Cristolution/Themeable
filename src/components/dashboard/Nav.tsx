import { NavLink } from 'react-router-dom'
import { Button } from '../ui/Button'
import { HamburgerMenu } from '../ui/HamburgerMenu'

type Props = {
  themeName: string
  dirty: boolean
  onSave: () => void
  onExport: () => void
  onImport: () => void
  onReset: () => void
  menuOpen: boolean
  onToggleMenu: () => void
}

export function Nav({ themeName, dirty, onSave, onExport, onImport, onReset, menuOpen, onToggleMenu }: Props) {
  return (
    <header className="nav">
      <div className="nav__brand">
        <span className="nav__hamburger">
          <HamburgerMenu open={menuOpen} onToggle={onToggleMenu} ariaLabel="Toggle menu" />
        </span>
        <span className="nav__logo">◆</span>
        <span className="nav__title">Themeable</span>
      </div>
      <nav className="nav__links nav__links--desktop">
        <NavLink to="/dashboard" className={({ isActive }) => 'nav__link' + (isActive ? ' nav__link--active' : '')}>
          Dashboard
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => 'nav__link' + (isActive ? ' nav__link--active' : '')}>
          Projects
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => 'nav__link' + (isActive ? ' nav__link--active' : '')}>
          Reports
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => 'nav__link' + (isActive ? ' nav__link--active' : '')}>
          Settings
        </NavLink>
      </nav>
      <div className="nav__actions">
        <span className="nav__theme-name">
          {themeName}{dirty && <span className="nav__dirty" title="Unsaved changes">●</span>}
        </span>
        <Button variant="ghost" size="sm" onClick={onImport}>Import</Button>
        <Button variant="ghost" size="sm" onClick={onExport}>Export</Button>
        <Button variant="secondary" size="sm" onClick={onReset} disabled={!dirty}>Reset</Button>
        <Button variant="primary" size="sm" onClick={onSave}>Save</Button>
      </div>
    </header>
  )
}
