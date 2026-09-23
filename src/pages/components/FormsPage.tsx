import { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Checkbox } from '../../components/ui/Checkbox'
import { SearchIcon } from '../../components/ui/Icon'

const multiSelectOptions = [
  { id: 'design', label: 'Design' },
  { id: 'research', label: 'Research' },
  { id: 'ops', label: 'Ops' },
  { id: 'sales', label: 'Sales' },
  { id: 'eng', label: 'Engineering' },
]

export function FormsPage() {
  const [selected, setSelected] = useState<string[]>(['design', 'research'])
  const [email, setEmail] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [password, setPassword] = useState('')
  const [search, setSearch] = useState('')
  const [date, setDate] = useState('2026-07-12')
  const [switchOn, setSwitchOn] = useState(true)
  const [slider, setSlider] = useState(40)

  const emailError =
    emailTouched && email.length > 0 && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
  const empty = emailTouched && email.length === 0

  const toggle = (id: string) =>
    setSelected(s => (s.includes(id) ? s.filter(x => x !== id) : [...s, id]))

  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>Forms</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
        Inputs, selects, checkboxes, and the labelled-field pattern.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

        <Card title="Field" action={<span className="pill pill--neutral">label + input + helper + error</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            The labelled-field pattern: label, input, helper text, and the error state.
          </p>
          <form className="form" onSubmit={e => { e.preventDefault(); setEmailTouched(true) }}>
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

        <Card title="Input" action={<span className="pill pill--neutral">atomic</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A bare text input. Use inside a Field for the labelled version.
          </p>
          <input className="field__input" placeholder="Bare input" />
        </Card>

        <Card title="Input Group" action={<span className="pill pill--neutral">composite</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            An input with attached elements — icons, prefixes, suffixes, buttons.
          </p>
          <div className="input-group">
            <span className="input-group__addon">https://</span>
            <input className="field__input" placeholder="example.com" />
            <Button size="sm" variant="secondary">Copy</Button>
          </div>
        </Card>

        <Card title="Textarea" action={<span className="pill pill--neutral">multi-line</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A multi-line text input.
          </p>
          <textarea className="field__input" rows={3} placeholder="Tell us what you think…" />
        </Card>

        <Card title="Select" action={<span className="pill pill--neutral">dropdown</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A dropdown select for choosing one of several options.
          </p>
          <select className="field__input" defaultValue="">
            <option value="" disabled>Choose a fruit…</option>
            <option>Apple</option>
            <option>Banana</option>
            <option>Cherry</option>
          </select>
        </Card>

        <Card title="Native Select" action={<span className="pill pill--neutral">OS default</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Uses the platform-native picker — best on mobile.
          </p>
          <select className="field__input" defaultValue="">
            <option value="" disabled>Country…</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Germany</option>
          </select>
        </Card>

        <Card title="Combobox" action={<span className="pill pill--neutral">search + select</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A select with a search field, for long lists.
          </p>
          <div className="combobox">
            <input className="field__input" placeholder="Search frameworks…" />
            <ul className="combobox__list" role="listbox">
              <li className="combobox__option" role="option">React</li>
              <li className="combobox__option combobox__option--active" role="option" aria-selected="true">Vue</li>
              <li className="combobox__option" role="option">Svelte</li>
              <li className="combobox__option" role="option">Solid</li>
            </ul>
          </div>
        </Card>

        <Card title="Checkbox" action={<span className="pill pill--neutral">boolean</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A boolean input. Group several for a multi-select.
          </p>
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
        </Card>

        <Card title="Radio Group" action={<span className="pill pill--neutral">single choice</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Choose exactly one from a small set of options.
          </p>
          <fieldset className="radio-group" style={{ border: 'none', padding: 0 }}>
            <legend className="radio-group__legend">Plan</legend>
            <div className="radio-group__options">
              <label className="radio"><input type="radio" name="plan" defaultChecked /> Free</label>
              <label className="radio"><input type="radio" name="plan" /> Pro</label>
              <label className="radio"><input type="radio" name="plan" /> Team</label>
            </div>
          </fieldset>
        </Card>

        <Card title="Switch" action={<span className="pill pill--neutral">toggle</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A binary on/off control. Use for settings, not for form submission.
          </p>
          <label className="switch">
            <input type="checkbox" checked={switchOn} onChange={e => setSwitchOn(e.target.checked)} />
            <span className="switch__track"><span className="switch__thumb" /></span>
            <span>{switchOn ? 'On' : 'Off'}</span>
          </label>
        </Card>

        <Card title="Slider" action={<span className="pill pill--neutral">range</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Pick a value in a continuous range.
          </p>
          <input
            type="range"
            min={0}
            max={100}
            value={slider}
            onChange={e => setSlider(Number(e.target.value))}
            className="slider"
          />
          <div style={{ marginTop: 'var(--space-sm)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            Value: <strong style={{ color: 'var(--color-text)' }}>{slider}</strong>
          </div>
        </Card>

        <Card title="Input OTP" action={<span className="pill pill--neutral">one-time code</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Six single-character boxes for one-time codes.
          </p>
          <div className="otp">
            {Array.from({ length: 6 }).map((_, i) => (
              <input key={i} className="otp__digit" maxLength={1} inputMode="numeric" aria-label={`Digit ${i + 1}`} />
            ))}
          </div>
        </Card>

        <Card title="Date Picker" action={<span className="pill pill--neutral">native input</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A date field. Native on web, calendar UI on mobile.
          </p>
          <input type="date" className="field__input" value={date} onChange={e => setDate(e.target.value)} />
        </Card>

        <Card title="Label" action={<span className="pill pill--neutral">accessibility</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Standalone label, useful when an input is rendered separately.
          </p>
          <label className="field__label">Standalone label</label>
        </Card>

        <Card title="Search Field" action={<span className="pill pill--neutral">⌘K</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A text field with search icon, clear behaviour, and a keyboard hint.
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

        <Card title="Questionnaire" action={<span className="pill pill--neutral">multi-step form</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A sequence of forms, one step at a time, with progress and back/next navigation.
          </p>
          <ol className="steps" aria-label="Onboarding progress">
            <li className="steps__item steps__item--done"><span className="steps__circle">✓</span><span>Account</span></li>
            <li className="steps__item steps__item--current"><span className="steps__circle">2</span><span>Profile</span></li>
            <li className="steps__item steps__item--upcoming"><span className="steps__circle">3</span><span>Preferences</span></li>
          </ol>
        </Card>
      </div>
    </>
  )
}