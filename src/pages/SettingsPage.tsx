import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { Toast } from '../components/ui/Toast'

const tabs = ['Account', 'Appearance', 'Notifications', 'Privacy'] as const

export function SettingsPage() {
  const [tab, setTab] = useState<typeof tabs[number]>('Account')
  const [toast, setToast] = useState<{ message: string; tone: 'success' } | null>(null)

  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Settings</h2>
      <div className="settings-tabs">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`settings-tab ${tab === t ? 'settings-tab--active' : ''}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Account' && (
        <Card title="Account information">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <Input label="Display name" defaultValue="Alex Kim" />
            <Input label="Email" type="email" defaultValue="alex@example.com" />
            <Input label="Username" defaultValue="alex-kim" />
          </div>
        </Card>
      )}

      {tab === 'Appearance' && (
        <Card title="Appearance">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <Select label="Theme" options={[
              { value: 'system', label: 'Match system' },
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' }
            ]} />
            <Select label="Density" options={[
              { value: 'comfortable', label: 'Comfortable' },
              { value: 'compact', label: 'Compact' }
            ]} />
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
              Note: Theme editor on the right already lets you customize every token live.
            </p>
          </div>
        </Card>
      )}

      {tab === 'Notifications' && (
        <Card title="Notification preferences">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            {['Email me when I am mentioned', 'Email me on weekly digest', 'In-app notifications for status changes'].map(label => (
              <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <input type="checkbox" defaultChecked />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </Card>
      )}

      {tab === 'Privacy' && (
        <Card title="Privacy settings">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <Select label="Profile visibility" options={[
              { value: 'public', label: 'Public' },
              { value: 'team', label: 'Team only' },
              { value: 'private', label: 'Private' }
            ]} />
            <Select label="Activity status" options={[
              { value: 'visible', label: 'Visible' },
              { value: 'hidden', label: 'Hidden' }
            ]} />
          </div>
        </Card>
      )}

      <div style={{ marginTop: 'var(--space-lg)', display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => setToast({ message: 'Settings saved', tone: 'success' })}>Save</Button>
      </div>
      {toast && <Toast message={toast.message} tone={toast.tone} onDismiss={() => setToast(null)} />}
    </>
  )
}