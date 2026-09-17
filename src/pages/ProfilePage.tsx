import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Pill } from '../components/ui/Pill'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { profileStats } from '../dashboard/sampleData'

export function ProfilePage() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Profile</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-md)' }}>
        <Card>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-md)' }}>
            <div style={{
              width: 96, height: 96, borderRadius: 'var(--radius-full)',
              background: 'var(--color-bg-subtle)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 'var(--font-size-2xl)', color: 'var(--color-text-muted)',
              border: 'var(--border-width) var(--border-style) var(--color-border)'
            }}>AK</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-medium)' }}>Alex Kim</div>
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Senior Frontend Engineer</div>
              <div style={{ marginTop: 'var(--space-sm)' }}><Pill tone="success">Active</Pill></div>
            </div>
            <Button onClick={() => setOpen(true)}>Edit profile</Button>
          </div>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <Card title="Stats">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-md)' }}>
              {profileStats.map(s => (
                <div key={s.id} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>{s.value}</div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Recent activity summary">
            <p style={{ color: 'var(--color-text-muted)' }}>
              14 commits this week across 3 projects, 5 PR reviews submitted, 2 issues resolved.
            </p>
          </Card>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Edit profile">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <Input label="Display name" defaultValue="Alex Kim" />
          <Input label="Title" defaultValue="Senior Frontend Engineer" />
          <Input label="Email" type="email" defaultValue="alex@example.com" />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-sm)' }}>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}