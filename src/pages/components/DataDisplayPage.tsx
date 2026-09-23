import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Pill } from '../../components/ui/Pill'

export function DataDisplayPage() {
  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>Data Display</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
        Avatars, badges, tables, charts, and other presentational primitives.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

        <Card title="Avatar" action={<span className="pill pill--neutral">identity</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Round or square representation of a person, with initials fallback.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
            <div className="avatar avatar--sm">A</div>
            <div className="avatar">JD</div>
            <div className="avatar avatar--lg">MK</div>
            <div className="avatar avatar--xl">+5</div>
          </div>
        </Card>

        <Card title="Badge" action={<span className="pill pill--neutral">counter</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Small numeric or status indicator attached to another element.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
            <Button>Inbox <span className="badge">3</span></Button>
            <Button variant="secondary">Notifications <span className="badge badge--accent">12</span></Button>
          </div>
        </Card>

        <Card title="Kbd" action={<span className="pill pill--neutral">keyboard</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Renders a keyboard key — used in shortcuts and help text.
          </p>
          <p style={{ margin: 0 }}>
            Press <kbd className="kbd">⌘</kbd> + <kbd className="kbd">K</kbd> to open the command palette.
          </p>
        </Card>

        <Card title="Item" action={<span className="pill pill--neutral">list row</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A row in a list — typically with media, title, description, and actions.
          </p>
          <ul className="item-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li className="item">
              <div className="avatar">AB</div>
              <div className="item__body">
                <div className="item__title">Ada Lovelace</div>
                <div className="item__subtitle">ada@analytical.engine</div>
              </div>
              <Pill>Admin</Pill>
            </li>
            <li className="item">
              <div className="avatar">GR</div>
              <div className="item__body">
                <div className="item__title">Grace Hopper</div>
                <div className="item__subtitle">grace@navy.mil</div>
              </div>
              <Pill tone="info">Editor</Pill>
            </li>
          </ul>
        </Card>

        <Card title="Table" action={<span className="pill pill--neutral">data</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Tabular data with a header row and aligned cells.
          </p>
          <table className="data-table">
            <thead>
              <tr><th>Name</th><th>Role</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td>Ada Lovelace</td><td>Admin</td><td><Pill tone="success">Active</Pill></td></tr>
              <tr><td>Grace Hopper</td><td>Editor</td><td><Pill tone="success">Active</Pill></td></tr>
              <tr><td>Alan Turing</td><td>Viewer</td><td><Pill>Invited</Pill></td></tr>
            </tbody>
          </table>
        </Card>

        <Card title="Data Table" action={<span className="pill pill--neutral">tabular + actions</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A table designed for rich data: sorting, selection, and row actions.
          </p>
          <table className="data-table data-table--rich">
            <thead>
              <tr>
                <th><input type="checkbox" aria-label="Select all" /></th>
                <th>File</th>
                <th>Modified</th>
                <th>Size</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" aria-label="Select row" /></td>
                <td>design-spec.pdf</td><td>2 days ago</td><td>3.4 MB</td>
                <td><Button size="sm" variant="ghost">Open</Button></td>
              </tr>
              <tr>
                <td><input type="checkbox" aria-label="Select row" /></td>
                <td>screenshot.png</td><td>Yesterday</td><td>820 KB</td>
                <td><Button size="sm" variant="ghost">Open</Button></td>
              </tr>
            </tbody>
          </table>
        </Card>

        <Card title="Empty" action={<span className="pill pill--neutral">zero state</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A placeholder shown when a list or view has no data yet.
          </p>
          <div className="empty-state">
            <div className="empty-state__icon" aria-hidden="true">○</div>
            <h3 className="empty-state__title">No projects yet</h3>
            <p className="empty-state__description">Get started by creating your first project.</p>
            <Button>Create project</Button>
          </div>
        </Card>

        <Card title="Skeleton" action={<span className="pill pill--neutral">loading</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A shimmering placeholder shown while content loads.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <div className="skeleton" style={{ height: 20, width: '60%' }} />
            <div className="skeleton" style={{ height: 14, width: '90%' }} />
            <div className="skeleton" style={{ height: 14, width: '80%' }} />
          </div>
        </Card>

        <Card title="Attachment" action={<span className="pill pill--neutral">file</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A clickable file attachment with icon, name, and size.
          </p>
          <div className="attachment">
            <span className="attachment__icon" aria-hidden="true">📎</span>
            <div className="attachment__body">
              <div className="attachment__name">design-spec.pdf</div>
              <div className="attachment__meta">3.4 MB</div>
            </div>
            <Button size="sm" variant="ghost">Download</Button>
          </div>
        </Card>

        <Card title="Bubble" action={<span className="pill pill--neutral">chat</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A speech-bubble style message — for chat UIs.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <div className="bubble bubble--in">Hey, what do you think of the new mock?</div>
            <div className="bubble bubble--out">Looking great. I'll send notes tomorrow.</div>
          </div>
        </Card>

        <Card title="Message" action={<span className="pill pill--neutral">richer chat</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A chat message with avatar, name, timestamp, and reactions.
          </p>
          <div className="message">
            <div className="avatar">JD</div>
            <div className="message__body">
              <div className="message__meta">
                <strong>Jane Doe</strong> <span className="message__time">10:24</span>
              </div>
              <div className="message__text">Pushed the latest changes to staging.</div>
              <div className="message__reactions">
                <span className="reaction">👍 3</span>
                <span className="reaction">🎉 1</span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Message Scroller" action={<span className="pill pill--negative">jump to present</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A chat region with a floating "Jump to present" button when scrolled up.
          </p>
          <div className="message-scroller" style={{ height: 120, position: 'relative' }}>
            <div style={{ padding: 'var(--space-sm)' }}>
              <div className="bubble bubble--in" style={{ marginBottom: 4 }}>Earlier message…</div>
              <div className="bubble bubble--in" style={{ marginBottom: 4 }}>Another one…</div>
            </div>
            <button className="message-scroller__jump" type="button">Jump to present ↓</button>
          </div>
        </Card>

        <Card title="Marker" action={<span className="pill pill--neutral">annotation</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A small dot or chip anchored to a point — for highlighting in screenshots or diagrams.
          </p>
          <div style={{ position: 'relative', height: 80, background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <span className="marker" style={{ top: 16, left: 24 }} aria-label="Marker 1">1</span>
            <span className="marker marker--accent" style={{ top: 36, left: 80 }} aria-label="Marker 2">2</span>
          </div>
        </Card>

        <Card title="Chart" action={<span className="pill pill--neutral">see /charts</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Line, area, pie, scatter, radar — see the Charts section for live examples.
          </p>
          <Button variant="secondary" onClick={() => location.assign('/charts/line')}>Open charts →</Button>
        </Card>
      </div>
    </>
  )
}