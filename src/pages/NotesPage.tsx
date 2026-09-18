import { useState, useRef, useEffect } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

type Note = { id: string; title: string; content: string; updated: string }

const seed: Note[] = [
  { id: 'n1', title: 'Welcome', content: 'Welcome to your notes.\n\nThis is a contenteditable rich-text editor. Edit freely.\n\n**Bold**, *italic*, ~~strikethrough~~, [links](https://example.com), lists.', updated: '2 hours ago' },
  { id: 'n2', title: 'Project ideas', content: '- A music app with mood detection\n- A recipe generator\n- A puzzle game for cats', updated: 'Yesterday' },
  { id: 'n3', title: 'Reading list', content: 'Books to read:\n- The Pragmatic Programmer\n- Design Systems\n- A Philosophy of Software Design', updated: '3 days ago' }
]

export function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(seed)
  const [activeId, setActiveId] = useState(notes[0].id)
  const [saved, setSaved] = useState(true)
  const editorRef = useRef<HTMLDivElement>(null)
  const active = notes.find(n => n.id === activeId)!

  useEffect(() => {
    if (editorRef.current) editorRef.current.innerText = active.content
    setSaved(true)
  }, [activeId])

  const update = () => {
    if (!editorRef.current) return
    const newContent = editorRef.current.innerText
    setNotes(ns => ns.map(n => n.id === activeId ? { ...n, content: newContent, updated: 'just now' } : n))
    setSaved(false)
    setTimeout(() => setSaved(true), 800)
  }

  const exec = (cmd: string) => {
    document.execCommand(cmd, false)
    update()
  }

  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Notes</h2>
      <div className="notes-grid">
        <Card title={`${notes.length} notes`}>
          <ul className="notes-list">
            {notes.map(n => (
              <li key={n.id}>
                <button
                  className={`notes-list__item ${n.id === activeId ? 'is-active' : ''}`}
                  onClick={() => setActiveId(n.id)}
                >
                  <div className="notes-list__title">{n.title}</div>
                  <div className="notes-list__meta">{n.updated}</div>
                </button>
              </li>
            ))}
          </ul>
        </Card>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
            <input
              className="field__input"
              value={active.title}
              onChange={e => setNotes(ns => ns.map(n => n.id === active.id ? { ...n, title: e.target.value } : n))}
              style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}
            />
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              {saved ? 'Saved' : 'Saving…'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-xs)', marginBottom: 'var(--space-sm)' }}>
            <Button variant="ghost" size="sm" onClick={() => exec('bold')}><strong>B</strong></Button>
            <Button variant="ghost" size="sm" onClick={() => exec('italic')}><em>I</em></Button>
            <Button variant="ghost" size="sm" onClick={() => exec('strikeThrough')}><s>S</s></Button>
            <Button variant="ghost" size="sm" onClick={() => exec('insertUnorderedList')}>• List</Button>
            <Button variant="ghost" size="sm" onClick={() => exec('createLink')}>Link</Button>
          </div>
          <Card>
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={update}
              className="notes-editor"
            />
          </Card>
        </div>
      </div>
    </>
  )
}
