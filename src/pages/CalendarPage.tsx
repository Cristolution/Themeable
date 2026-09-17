import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { CalendarWidget } from '../components/dashboard/CalendarWidget'
import { upcomingEvents } from '../dashboard/sampleData'

export function CalendarPage() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <h2>Calendar</h2>
        <Button onClick={() => setOpen(true)}>+ Add event</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
        <CalendarWidget />
        <Card title="Upcoming events">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {upcomingEvents.map(e => (
              <li key={e.id} style={{ paddingBottom: 'var(--space-sm)', borderBottom: 'var(--border-width) var(--border-style) var(--color-border)' }}>
                <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{e.title}</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{e.when} · {e.who}</div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Add event">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <Input label="Event title" placeholder="Sprint review" />
          <Input label="Date" type="date" />
          <Input label="Time" type="time" />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-sm)' }}>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}