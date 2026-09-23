import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Checkbox } from '../components/ui/Checkbox'
import { SearchIcon } from '../components/ui/Icon'

const multiSelectOptions = [
  { id: 'design', label: 'Design' },
  { id: 'research', label: 'Research' },
  { id: 'ops', label: 'Ops' },
  { id: 'sales', label: 'Sales' },
  { id: 'eng', label: 'Engineering' }
]

const dateRange = { from: '2026-07-05', to: '2026-07-16' }

export function InputsPage() {
  const [selected, setSelected] = useState<string[]>(['design', 'research'])
  const [email, setEmail] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [password, setPassword] = useState('')
  const [search, setSearch] = useState('')
  const [date, setDate] = useState('2026-07-12')

  const emailError =
    emailTouched && email.length > 0 && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
  const empty = emailTouched && email.length === 0

  const toggle = (id: string) =>
    setSelected(s => (s.includes(id) ? s.filter(x => x !== id) : [...s, id]))

  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Inputs & Forms</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

        {/* Form Field with all the parts */}
        <Card title="Form Field" action={<span className="pill pill--neutral">label + input + helper + error</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Every part of a labeled input — label, placeholder, helper text, and the red error line.
          </p>
          <form
            className="form"
            onSubmit={e => { e.preventDefault(); setEmailTouched(true) }}
          >
            <div className={`field${emailError || empty ? ' field--invalid' : ''}`}>
              <label className="field__label" htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                className="field__input"
                placeholder="you@team.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                aria-invalid={emailError || empty}
                aria-describedby="email-hint"
              />
              {emailError ? (
                <span className="field__error" id="email-hint">Please enter a valid email address.</span>
              ) : empty ? (
                <span className="field__error" id="email-hint">Email is required.</span>
              ) : (
                <span className="field__hint" id="email-hint">We'll only use this to sign you in.</span>
              )}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="pwd">Password</label>
              <input
                id="pwd"
                type="password"
                className="field__input"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <span className="field__hint">At least 8 characters with a number.</span>
            </div>

            <div className="form__actions">
              <Button variant="ghost" type="button">Cancel</Button>
              <Button type="submit">Sign in</Button>
            </div>
          </form>
        </Card>

        {/* Sign-in Form */}
        <Card title="Sign-in Form" action={<span className="pill pill--neutral">social + email</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            The login form's nameable parts — the eye, the OR line, and the Continue-with buttons.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', maxWidth: 360 }}>
            <Button>Continue with Google</Button>
            <Button variant="secondary">Continue with GitHub</Button>
            <div className="separator" aria-hidden="true">or</div>
            <div className="field">
              <label className="field__label" htmlFor="si-email">Email</label>
              <input id="si-email" type="email" className="field__input" placeholder="you@team.com" />
            </div>
            <div className="field">
              <label className="field__label" htmlFor="si-pwd">Password</label>
              <input id="si-pwd" type="password" className="field__input" placeholder="••••••••" autoComplete="current-password" />
            </div>
            <Button>Sign in</Button>
          </div>
        </Card>

        {/* Date Picker */}
        <Card title="Date Picker" action={<span className="pill pill--neutral">native input</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            The little calendar that pops up on a date field — and the highlighted stripe of a range.
          </p>
          <div className="form">
            <div className="field">
              <label className="field__label" htmlFor="dp">Pick a date</label>
              <input id="dp" type="date" className="field__input" value={date} onChange={e => setDate(e.target.value)} />
              <span className="field__hint">Selected: {date}</span>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="field" style={{ flex: '1 1 200px' }}>
                <label className="field__label">From</label>
                <input type="date" className="field__input" defaultValue={dateRange.from} />
              </div>
              <span style={{ color: 'var(--color-text-muted)' }}>→</span>
              <div className="field" style={{ flex: '1 1 200px' }}>
                <label className="field__label">To</label>
                <input type="date" className="field__input" defaultValue={dateRange.to} />
              </div>
            </div>
          </div>
        </Card>

        {/* Search Field */}
        <Card title="Search Field" action={<span className="pill pill--neutral">⌘K</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A text field with built-in search icon, clearing behavior, and a keyboard hint.
          </p>
          <div className="search">
            <span className="search__icon" aria-hidden="true"><SearchIcon size={16} /></span>
            <input
              className="search__input"
              placeholder="Search components…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <span className="search__kbd" aria-hidden="true">⌘ K</span>
          </div>
        </Card>

        {/* Multi-select */}
        <Card title="Multi-select" action={<span className="pill pill--neutral">checkbox list</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            One control holding several values: the checkbox dropdown, the chip field, and the two-pane transfer list.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <fieldset className="radio-group" style={{ border: 'none', padding: 0 }}>
              <legend className="radio-group__legend">Departments</legend>
              <div className="radio-group__options">
                {multiSelectOptions.map(o => (
                  <Checkbox
                    key={o.id}
                    label={o.label}
                    checked={selected.includes(o.id)}
                    onChange={() => toggle(o.id)}
                  />
                ))}
              </div>
            </fieldset>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-xs)' }}>
              {selected.length === 0 && (
                <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                  Nothing selected.
                </span>
              )}
              {selected.map(id => {
                const opt = multiSelectOptions.find(o => o.id === id)!
                return (
                  <span key={id} className="pill pill--neutral">{opt.label}</span>
                )
              })}
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
