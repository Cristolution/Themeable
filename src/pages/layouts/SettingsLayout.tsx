import { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Pill } from '../../components/ui/Pill'

export function SettingsLayout() {
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(false)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [twoFA, setTwoFA] = useState(true)

  return (
    <>
      <h1 style={{ margin: '0 0 var(--space-sm)' }}>Settings</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
        Manage your account and preferences.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 'var(--space-xl)' }}>
        <nav aria-label="Settings sections" className="settings-nav">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, position: 'sticky', top: 'var(--space-md)' }}>
            {['Account', 'Profile', 'Notifications', 'Security', 'Billing', 'API'].map((s, i) => (
              <li key={s}>
                <a href={`#${s}`} className={`sidebar__link${i === 2 ? ' sidebar__link--active' : ''}`} style={{ display: 'block', padding: 'var(--space-xs) var(--space-sm)', borderRadius: 'var(--radius-sm)' }}>
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          <Card id="Account" title="Account">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 500 }}>ada@analytical.engine</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>Verified 12 Aug 2026</div>
              </div>
              <Button variant="secondary" size="sm">Change email</Button>
            </div>
          </Card>

          <Card id="Profile" title="Profile">
            <div className="field">
              <label className="field__label">Display name</label>
              <input className="field__input" defaultValue="Ada Lovelace" />
            </div>
            <div className="field" style={{ marginTop: 'var(--space-sm)' }}>
              <label className="field__label">Bio</label>
              <textarea className="field__input" rows={3} defaultValue="Mathematician. Computing pioneer." />
            </div>
          </Card>

          <Card id="Notifications" title="Notifications" action={<Pill>3 active</Pill>}>
            <SettingsRow
              title="Email notifications"
              description="Receive updates about your projects by email."
              checked={emailNotif}
              onChange={setEmailNotif}
            />
            <SettingsRow
              title="Push notifications"
              description="Get push notifications in your browser."
              checked={pushNotif}
              onChange={setPushNotif}
            />
            <SettingsRow
              title="Weekly digest"
              description="A summary every Monday morning."
              checked={weeklyDigest}
              onChange={setWeeklyDigest}
            />
          </Card>

          <Card id="Security" title="Security">
            <SettingsRow
              title="Two-factor authentication"
              description="Add an extra layer of security."
              checked={twoFA}
              onChange={setTwoFA}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-md) 0', borderTop: '1px solid var(--color-border)' }}>
              <div>
                <div style={{ fontWeight: 500 }}>Active sessions</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>3 devices</div>
              </div>
              <Button variant="ghost" size="sm">Manage</Button>
            </div>
          </Card>

          <Card id="Billing" title="Billing">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 500 }}>Pro plan</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>$29/month · renews 1 Nov 2026</div>
              </div>
              <Button variant="secondary" size="sm">Manage subscription</Button>
            </div>
          </Card>

          <Card title="Danger zone" style={{ borderColor: 'var(--color-error)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 500, color: 'var(--color-error)' }}>Delete account</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  Permanently delete your account and all data.
                </div>
              </div>
              <Button variant="ghost" size="sm">Delete…</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}

function SettingsRow({ title, description, checked, onChange }: { title: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-md) 0', borderBottom: '1px solid var(--color-border)' }}>
      <div>
        <div style={{ fontWeight: 500 }}>{title}</div>
        <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>{description}</div>
      </div>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
        <span className="switch__track"><span className="switch__thumb" /></span>
      </label>
    </div>
  )
}