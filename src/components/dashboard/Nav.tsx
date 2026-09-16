import { Button } from '../ui/Button'

type Props = {
  themeName: string
  dirty: boolean
  onSave: () => void
  onExport: () => void
  onImport: () => void
  onReset: () => void
}

export function Nav({ themeName, dirty, onSave, onExport, onImport, onReset }: Props) {
  return (
    <header className="nav">
      <div className="nav__brand">
        <span className="nav__logo">◆</span>
        <span className="nav__title">Themeable</span>
      </div>
      <nav className="nav__links">
        <a className="nav__link nav__link--active" href="#">Dashboard</a>
        <a className="nav__link" href="#">Projects</a>
        <a className="nav__link" href="#">Reports</a>
        <a className="nav__link" href="#">Settings</a>
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
