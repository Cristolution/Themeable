import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Pill } from '../components/ui/Pill'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { tasks } from '../dashboard/sampleData'

const columns = [
  { id: 'todo', label: 'To Do' },
  { id: 'progress', label: 'In Progress' },
  { id: 'done', label: 'Done' }
] as const

const priorityToTone = { high: 'danger', medium: 'warning', low: 'neutral' } as const

export function TasksPage() {
  const [open, setOpen] = useState(false)
  const [priority, setPriority] = useState('medium')

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <h2>Tasks</h2>
        <Button onClick={() => setOpen(true)}>+ Add task</Button>
      </div>
      <div className="kanban-grid">
        {columns.map(col => {
          const items = tasks.filter(t => t.column === col.id)
          return (
            <div key={col.id}>
              <h3 style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-sm)' }}>
                {col.label} ({items.length})
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {items.map(t => (
                  <Card key={t.id}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                      <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{t.title}</div>
                      <div style={{ display: 'flex', gap: 'var(--space-xs)', alignItems: 'center' }}>
                        <Pill tone={priorityToTone[t.priority]}>{t.priority}</Pill>
                        <span title={t.assignee} style={{
                          width: 20, height: 20, borderRadius: 'var(--radius-full)',
                          background: 'var(--color-bg-subtle)', display: 'inline-flex',
                          alignItems: 'center', justifyContent: 'center',
                          fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)'
                        }}>{t.assignee}</span>
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