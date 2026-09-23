import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Pill } from '../components/ui/Pill'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { InfoIcon, CalendarIcon, SubtaskIcon } from '../components/ui/Icon'
import { tasks } from '../dashboard/sampleData'

const columns = [
  { id: 'todo',     label: 'To Do' },
  { id: 'progress', label: 'In Progress' },
  { id: 'done',     label: 'Done' }
] as const

const priorityToTone = { high: 'danger', medium: 'warning', low: 'neutral' } as const
const statusToTone = {
  'At risk': 'danger',
  'Blocked': 'danger',
  'On track': 'success',
  'Shipped': 'info'
} as const

const dueTone = (due: string): 'danger' | 'warning' | 'neutral' => {
  if (due === 'Today') return 'danger'
  if (due === 'Tomorrow') return 'warning'
  return 'neutral'
}

export function TasksPage() {
  const [open, setOpen] = useState(false)
  const [priority, setPriority] = useState('medium')

  const total = tasks.length
  const done = tasks.filter(t => t.column === 'done').length
  const blocked = tasks.filter(t => t.status === 'Blocked' || t.status === 'At risk').length

  return (
    <>
      {/* Banner header */}
      <div className="banner banner--accent" style={{ marginInline: 'calc(var(--space-lg) * -1)', marginBlockEnd: 'var(--space-lg)', borderRadius: 0 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <InfoIcon size={16} />
          <strong>{done} / {total}</strong> tasks done this sprint — {blocked > 0 && <span><span className="pill pill--danger" style={{ marginInlineStart: 'var(--space-xs)' }}>{blocked} need attention</span></span>}
        </span>
        <Button size="sm" onClick={() => setOpen(true)}>+ Add task</Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBlockEnd: 'var(--space-lg)' }}>
        <h2 style={{ margin: 0 }}>Tasks</h2>
        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
          <Pill tone="neutral">All</Pill>
          <Pill tone="neutral">Assigned to me</Pill>
          <Pill tone="neutral">High priority</Pill>
        </div>
      </div>

      <div className="kanban-grid">
        {columns.map(col => {
          const items = tasks.filter(t => t.column === col.id)
          return (
            <div key={col.id}>
              <h3 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBlockEnd: 'var(--space-sm)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                {col.label}
                <span className="pill pill--neutral">{items.length}</span>
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {items.map(t => (
                  <Card key={t.id}>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'flex-start' }}>
                      <span className="drag-handle" aria-label="Drag to reorder" title="Drag to reorder">⋮⋮</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-sm)' }}>
                          <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{t.title}</span>
                          <span
                            title={t.assignee}
                            style={{
                              width: 24, height: 24, borderRadius: 'var(--radius-full)',
                              background: 'var(--color-bg-subtle)',
                              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)',
                              flexShrink: 0, fontWeight: 'var(--font-weight-medium)'
                            }}
                          >
                            {t.assignee}
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)', alignItems: 'center' }}>
                          <Pill tone={priorityToTone[t.priority]}>{t.priority}</Pill>
                          <Pill tone={statusToTone[t.status as keyof typeof statusToTone]}>{t.status}</Pill>
                          <Pill tone={dueTone(t.due)}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                              <CalendarIcon size={12} /> {t.due}
                            </span>
                          </Pill>
                          {t.subtasks > 0 && (
                            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                              <SubtaskIcon size={12} /> {t.subtasks} subtask{t.subtasks === 1 ? '' : 's'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add task">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <Input label="Task title" placeholder="Update sidebar navigation" />
          <Select
            label="Priority"
            value={priority}
            onChange={e => setPriority(e.target.value)}
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' }
            ]}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-sm)' }}>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
