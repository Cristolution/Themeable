import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Pill } from '../components/ui/Pill'
import { Button } from '../components/ui/Button'

type Task = { id: string; title: string; priority: 'high' | 'medium' | 'low'; assignee: string; column: string }

const seed: Task[] = [
  { id: 't1', title: 'Design new landing page', priority: 'high', assignee: 'AK', column: 'backlog' },
  { id: 't2', title: 'Wire up auth', priority: 'high', assignee: 'PS', column: 'todo' },
  { id: 't3', title: 'Set up CI/CD', priority: 'medium', assignee: 'DL', column: 'todo' },
  { id: 't4', title: 'Write tests for editor', priority: 'medium', assignee: 'AK', column: 'progress' },
  { id: 't5', title: 'Refactor modal', priority: 'low', assignee: 'MC', column: 'progress' },
  { id: 't6', title: 'Deploy v2.1', priority: 'high', assignee: 'DL', column: 'done' },
  { id: 't7', title: 'Update changelog', priority: 'low', assignee: 'SP', column: 'done' }
]

const cols = [
  { id: 'backlog', label: 'Backlog' },
  { id: 'todo', label: 'To Do' },
  { id: 'progress', label: 'In Progress' },
  { id: 'done', label: 'Done' }
]

const priorityTone = { high: 'danger', medium: 'warning', low: 'neutral' } as const

export function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>(seed)
  const [dragging, setDragging] = useState<string | null>(null)

  const moveTo = (taskId: string, column: string) => {
    setTasks(ts => ts.map(t => t.id === taskId ? { ...t, column } : t))
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <h2>Kanban Board</h2>
        <Button>+ Add task</Button>
      </div>
      <div className="kanban-grid">
        {cols.map(col => {
          const items = tasks.filter(t => t.column === col.id)
          return (
            <div
              key={col.id}
              className="kanban-col"
              onDragOver={e => e.preventDefault()}
              onDrop={() => dragging && moveTo(dragging, col.id)}
            >
              <h3 className="kanban-col__title">{col.label} ({items.length})</h3>
              <div className="kanban-col__list">
                {items.map(t => (
                  <Card key={t.id}>
                    <div
                      draggable
                      onDragStart={() => setDragging(t.id)}
                      onDragEnd={() => setDragging(null)}
                      className="kanban-card"
                    >
                      <div style={{ fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-sm)' }}>{t.title}</div>
                      <div style={{ display: 'flex', gap: 'var(--space-xs)', alignItems: 'center' }}>
                        <Pill tone={priorityTone[t.priority]}>{t.priority}</Pill>
                        <span className="kanban-card__assignee">{t.assignee}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
