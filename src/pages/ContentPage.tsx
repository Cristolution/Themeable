import { useState } from 'react'
import { Card } from '../components/ui/Card'

const dotMenus = [
  { label: 'Rename…', action: 'rename' },
  { label: 'Duplicate', action: 'duplicate' },
  { label: 'Share', action: 'share' },
  { label: 'Move to Trash', action: 'trash' }
]

const chatThread = [
  { mine: false, who: 'Ada', time: '2:38 PM', body: 'Are we still on for 3?' },
  { mine: true, who: 'You', time: '2:39 PM', body: 'Yes! Booking the room now.' },
  { mine: false, who: 'Ada', time: '2:41 PM', body: 'Bring the mocks if you have them.' }
]

const dragItems = [
  'Review the design',
  'Update pricing',
  'Fix the header',
  'Ship the draft'
]

export function ContentPage() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const dismiss = (action: string) => {
    setOpenMenu(null)
    // eslint-disable-next-line no-console
    console.log(`[dots-menu] ${action}`)
  }

  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Content & Affordances</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

        {/* Truncation */}
        <Card title="Truncation (Ellipsis & Line Clamp)" action={<span className="pill pill--neutral">text-overflow</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Text cut short with … — at the end of the line, after N lines, or in the middle.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div>
              <div className="bento__label" style={{ marginBottom: 'var(--space-xs)' }}>Single-line ellipsis</div>
              <div className="truncate__demo truncate">
                The quarterly review meeting has been rescheduled to Friday afternoon at 3pm in the main hall.
              </div>
            </div>
            <div>
              <div className="bento__label" style={{ marginBottom: 'var(--space-xs)' }}>Two-line clamp</div>
              <div className="truncate__demo truncate--clamp">
                Release notes: this update reworks the sync engine, fixes twelve reported issues with offline edits,
                and adds keyboard shortcuts for every panel in the app.
              </div>
            </div>
            <div>
              <div className="bento__label" style={{ marginBottom: 'var(--space-xs)' }}>Three-line clamp</div>
              <div className="truncate__demo truncate--clamp-3">
                Release notes: this update reworks the sync engine, fixes twelve reported issues with offline edits,
                and adds keyboard shortcuts for every panel in the app. It also retires the old onboarding flow in
                favor of the new guided setup, and updates the billing page to show a clearer breakdown of charges
                and credits for the current period.
              </div>
            </div>
          </div>
        </Card>

        {/* Divider / Separator / Rule */}
        <Card title="Divider vs. Separator vs. Rule" action={<span className="pill pill--neutral">&lt;hr&gt;</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            The same thin line can mark a topic break, separate controls, or be decoration.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            <div>
              <div className="bento__label" style={{ marginBottom: 'var(--space-xs)' }}>hr — thematic break</div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>
                Section A
              </p>
              <hr className="divider" />
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>
                Section B
              </p>
            </div>

            <div>
              <div className="bento__label" style={{ marginBottom: 'var(--space-xs)' }}>role="separator" with label</div>
              <div className="separator" role="separator">Edit</div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                Cut, copy, paste, delete controls sit here.
              </p>
              <div className="separator" role="separator">View</div>
            </div>

            <div>
              <div className="bento__label" style={{ marginBottom: 'var(--space-xs)' }}>decorative rule</div>
              <hr className="divider" style={{ borderTop: '1px dashed var(--color-border)' }} />
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                Just a visual flourish — the dashed style says "soft".
              </p>
            </div>
          </div>
        </Card>

        {/* Three Dots / Overflow Menu */}
        <Card title="The Three Dots (Overflow Menu)" action={<span className="pill pill--neutral">vertical / horizontal / kebab</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Horizontal dots, vertical dots, three lines, and an ellipsis mean different things.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-lg)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {[
              { id: 'horizontal', label: 'horizontal ⋯', glyph: '⋯' },
              { id: 'vertical', label: 'vertical ⋮', glyph: '⋮' },
              { id: 'kebab', label: 'kebab ', glyph: '⋮' },
              { id: 'ellipsis', label: 'command ellipsis …', glyph: '…' }
            ].map(v => (
              <div key={v.id} className="dots-menu">
                <button
                  className="dots-menu__btn"
                  aria-haspopup="menu"
                  aria-expanded={openMenu === v.id}
                  aria-label={`More actions (${v.label})`}
                  onClick={() => setOpenMenu(openMenu === v.id ? null : v.id)}
                >
                  {v.glyph}
                </button>
                {openMenu === v.id && (
                  <div className="dots-menu__panel" role="menu">
                    {dotMenus.map(m => (
                      <button
                        key={m.action}
                        className="dots-menu__item"
                        role="menuitem"
                        onClick={() => dismiss(m.action)}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Bubble */}
        <Card title="Chat Bubble (Message Bubble)" action={<span className="pill pill--neutral">bubbles</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            The rounded box around one message in a conversation, yours on one side, theirs on the other.
          </p>
          <div className="chat-list">
            {chatThread.map((m, i) => (
              <div key={i} className={`chat-msg${m.mine ? ' chat-msg--me' : ' chat-msg--them'}`}>
                <div className="chat-msg__bubble">{m.body}</div>
                <span className="chat-msg__time">{m.who} · {m.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Drag handles / Drag & Drop affordances */}
        <Card title="Drag & Drop" action={<span className="pill pill--neutral">handles + previews</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            The grips, handles, previews, and landing cues around a drag interaction.
          </p>
          <ul className="activity" style={{ margin: 0 }}>
            {dragItems.map((item, i) => (
              <li key={i} className="activity__item">
                <span className="drag-handle" aria-label="Drag to reorder" title="Drag to reorder">⋮⋮</span>
                <span style={{ flex: 1, fontSize: 'var(--font-size-sm)' }}>{item}</span>
                <span className="pill pill--neutral">#{i + 1}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  )
}
