import { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Drawer } from '../../components/ui/Drawer'
import { Modal } from '../../components/ui/Modal'

export function OverlayPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>Overlay</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
        Dialogs, drawers, menus, popovers, tooltips, and other floating surfaces.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

        <Card title="Dialog" action={<span className="pill pill--neutral">modal</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A modal dialog. Use for important, blocking actions.
          </p>
          <Button onClick={() => setModalOpen(true)}>Open dialog</Button>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Edit theme name">
            <p style={{ marginTop: 0 }}>Modal contents go here.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-sm)' }}>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setModalOpen(false)}>Save</Button>
            </div>
          </Modal>
        </Card>

        <Card title="Sheet" action={<span className="pill pill--neutral">side panel</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A side-anchored panel. Less blocking than a dialog.
          </p>
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open drawer</Button>
          <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Sheet" side="end">
            <p>Side-panel contents.</p>
          </Drawer>
        </Card>

        <Card title="Drawer" action={<span className="pill pill--neutral">off-canvas</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A slide-in drawer for navigation or filters.
          </p>
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open from end</Button>
        </Card>

        <Card title="Popover" action={<span className="pill pill--neutral">non-modal</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A small floating surface anchored to a trigger.
          </p>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Button variant="secondary" onClick={() => setMenuOpen(o => !o)}>Toggle popover</Button>
            {menuOpen && (
              <div className="popover" role="dialog" style={{ marginTop: 'var(--space-sm)' }}>
                <div className="popover__content">
                  <strong style={{ display: 'block', marginBottom: 'var(--space-xs)' }}>Dimensions</strong>
                  <label className="field__label">Width</label>
                  <input className="field__input" defaultValue="100%" />
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card title="Hover Card" action={<span className="pill pill--neutral">hover preview</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A preview shown on hover — useful for user mentions.
          </p>
          <p>
            Hover over <span className="hover-card-trigger" tabIndex={0}>@ada</span> to preview a profile.
          </p>
        </Card>

        <Card title="Tooltip" action={<span className="pill pill--neutral">on hover</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A short label that appears when hovering an element.
          </p>
          <span className="tooltip-wrapper" tabIndex={0}>
            <Button variant="ghost">Hover me</Button>
            <span className="tooltip" role="tooltip">Saves your changes</span>
          </span>
        </Card>

        <Card title="Context Menu" action={<span className="pill pill--neutral">right-click</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A menu triggered by right-click.
          </p>
          <div
            className="context-menu-target"
            onContextMenu={e => { e.preventDefault(); setMenuOpen(o => !o) }}
            style={{ padding: 'var(--space-md)', background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)', textAlign: 'center', cursor: 'context-menu' }}
          >
            Right-click here
          </div>
        </Card>

        <Card title="Menubar" action={<span className="pill pill--neutral">app menu</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A horizontal bar of dropdown menus — File, Edit, View, Help.
          </p>
          <div className="menubar">
            <button className="menubar__trigger">File</button>
            <button className="menubar__trigger">Edit</button>
            <button className="menubar__trigger">View</button>
            <button className="menubar__trigger">Help</button>
          </div>
        </Card>

        <Card title="Dropdown Menu" action={<span className="pill pill--neutral">action menu</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A button that opens a menu of actions.
          </p>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Button variant="secondary" onClick={() => setMenuOpen(o => !o)}>Actions ▾</Button>
            {menuOpen && (
              <ul className="dropdown-menu" role="menu" style={{ marginTop: 'var(--space-xs)' }}>
                <li role="menuitem">Rename</li>
                <li role="menuitem">Duplicate</li>
                <li role="menuitem" className="dropdown-menu__separator" aria-hidden="true" />
                <li role="menuitem" className="dropdown-menu__danger">Delete</li>
              </ul>
            )}
          </div>
        </Card>

        <Card title="Collapsible" action={<span className="pill pill--neutral">expandable</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A section that expands and collapses.
          </p>
          <details className="collapsible">
            <summary className="collapsible__trigger">Show more</summary>
            <div className="collapsible__content">
              Hidden content revealed on demand.
            </div>
          </details>
        </Card>
      </div>
    </>
  )
}