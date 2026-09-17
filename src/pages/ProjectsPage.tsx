import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Pill } from '../components/ui/Pill'
import { Button } from '../components/ui/Button'
import { projects } from '../dashboard/sampleData'

const filters = ['all', 'active', 'archived'] as const

const statusToTone = { active: 'success', pending: 'warning', archived: 'neutral' } as const

export function ProjectsPage() {
  const [filter, setFilter] = useState<typeof filters[number]>('all')
  const visible = filter === 'all' ? projects : projects.filter(p => p.status === filter)

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <h2>Projects</h2>
        <Button>+ New project</Button>
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
        {filters.map(f => (
          <Button key={f} variant={filter === f ? 'primary' : 'ghost'} size="sm" onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>
      <div className="projects-grid">
        {visible.map(p => (
          <Card key={p.id} title={p.name} action={<Pill tone={statusToTone[p.status]}>{p.status}</Pill>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <div style={{ height: 6, background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ width: `${p.progress}%`, height: '100%', background: 'var(--color-accent)' }} />
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{p.progress}% complete · updated {p.updated}</div>
              <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                {p.team.map((m, i) => (
                  <span key={i} title={m} style={{
                    width: 24, height: 24, borderRadius: 'var(--radius-full)',
                    background: 'var(--color-bg-subtle)', display: 'inline-flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)',
                    border: 'var(--border-width) var(--border-style) var(--color-border)'
                  }}>{m}</span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}