import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Pill } from '../components/ui/Pill'
import { Button } from '../components/ui/Button'
import { activity, extendedActivity, activityFilters } from '../dashboard/sampleData'

export function ActivityPage() {
  const [filter, setFilter] = useState<string>('all')
  const allEntries = [...extendedActivity, ...activity].reverse()

  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Activity</h2>
      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
        {activityFilters.map(f => (
          <Button
            key={f.id}
            variant={filter === f.id ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter(f.id)}
          >
            {f.label}
          </Button>
        ))}
      </div>
      <div className="activity-page-grid">
        <Card title="Recent Activity">
          <ul className="activity">
            {allEntries.map(e => (
              <li key={e.id} className="activity__item">
                <span className={`activity__dot activity__dot--${e.tone}`} aria-hidden />
                <div className="activity__body">
                  <div className="activity__line">
                    <strong>{e.who}</strong> {e.action} <em>{e.target}</em>
                  </div>
                  <div className="activity__when">{e.when}</div>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 'var(--space-md)', textAlign: 'center' }}>
            <Button variant="secondary" size="sm">Load more</Button>
          </div>
        </Card>
        <Card title="Activity by actor">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Alex Kim</span><Pill tone="success">14</Pill></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Priya Shah</span><Pill tone="success">11</Pill></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Diego Lopez</span><Pill tone="success">9</Pill></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Mia Chen</span><Pill tone="neutral">6</Pill></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Sam Patel</span><Pill tone="warning">3</Pill></div>
          </div>
        </Card>
      </div>
    </>
  )
}