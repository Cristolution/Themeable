import { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

const toolbar = [
  { icon: 'B', label: 'Bold', wrap: ['<strong>', '</strong>'] },
  { icon: 'I', label: 'Italic', wrap: ['<em>', '</em>'] },
  { icon: 'U', label: 'Underline', wrap: ['<u>', '</u>'] },
  { icon: 'S', label: 'Strike', wrap: ['<s>', '</s>'] },
  { icon: '"', label: 'Quote', wrap: ['<blockquote>', '</blockquote>'] },
  { icon: '</>', label: 'Code', wrap: ['<code>', '</code>'] },
]

export function RichTextLayout() {
  const [content, setContent] = useState(`<h2>The Analytical Engine</h2>
<p>The <strong>Analytical Engine</strong> was a proposed mechanical general-purpose computer, conceived in 1837 by Charles Babbage.</p>
<ul>
  <li>The Mill — arithmetic logic</li>
  <li>The Store — memory</li>
  <li>The Reader — input</li>
  <li>The Printer — output</li>
</ul>
<blockquote>“The science of operations, as derived from mathematics more especially, is a science of itself.” — Ada Lovelace</blockquote>`)
  const [showSource, setShowSource] = useState(false)

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <div>
          <h1 style={{ margin: 0 }}>Document</h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 'var(--space-xs) 0 0' }}>
            Untitled · Saved 2s ago
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          <Button variant="ghost" onClick={() => setShowSource(s => !s)}>
            {showSource ? 'Hide source' : 'Show source'}
          </Button>
          <Button>Publish</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 'var(--space-lg)' }}>
        <Card>
          <div className="editor-toolbar" role="toolbar" aria-label="Formatting">
            {toolbar.map(t => (
              <button key={t.label} className="editor-toolbar__btn" title={t.label} aria-label={t.label}>
                {t.icon}
              </button>
            ))}
            <span className="editor-toolbar__sep" aria-hidden="true" />
            <select className="editor-toolbar__select" aria-label="Heading level">
              <option>Paragraph</option>
              <option>Heading 1</option>
              <option>Heading 2</option>
              <option>Heading 3</option>
            </select>
            <span className="editor-toolbar__sep" aria-hidden="true" />
            <button className="editor-toolbar__btn" aria-label="Bullet list">•</button>
            <button className="editor-toolbar__btn" aria-label="Numbered list">1.</button>
            <button className="editor-toolbar__btn" aria-label="Link">🔗</button>
            <button className="editor-toolbar__btn" aria-label="Image">🖼</button>
          </div>

          <div style={{ padding: 'var(--space-md) 0' }}>
            {showSource ? (
              <textarea
                className="field__input"
                rows={20}
                value={content}
                onChange={e => setContent(e.target.value)}
                style={{ fontFamily: 'var(--font-mono', minHeight: 400 }}
              />
            ) : (
              <div
                className="editor-content"
                contentEditable
                suppressContentEditableWarning
                onBlur={e => setContent(e.currentTarget.innerHTML)}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
        </Card>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <Card title="Outline">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 'var(--font-size-sm)' }}>
              <li style={{ padding: 'var(--space-xs) 0' }}><strong>Analytical Engine</strong></li>
              <li style={{ padding: 'var(--space-xs) 0 var(--space-xs) var(--space-sm)', color: 'var(--color-text-muted)' }}>Mill</li>
              <li style={{ padding: 'var(--space-xs) 0 var(--space-xs) var(--space-sm)', color: 'var(--color-text-muted)' }}>Store</li>
              <li style={{ padding: 'var(--space-xs) 0 var(--space-xs) var(--space-sm)', color: 'var(--color-text-muted)' }}>Reader</li>
              <li style={{ padding: 'var(--space-xs) 0 var(--space-xs) var(--space-sm)', color: 'var(--color-text-muted)' }}>Printer</li>
            </ul>
          </Card>
          <Card title="Metadata">
            <div className="field">
              <label className="field__label">Tags</label>
              <input className="field__input" placeholder="computing, history…" />
            </div>
            <div className="field" style={{ marginTop: 'var(--space-sm)' }}>
              <label className="field__label">Visibility</label>
              <select className="field__input" defaultValue="private">
                <option value="private">Private</option>
                <option value="team">Team</option>
                <option value="public">Public</option>
              </select>
            </div>
          </Card>
          <Card title="Word count">
            <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600 }}>342</div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>2,156 characters</div>
          </Card>
        </aside>
      </div>
    </>
  )
}