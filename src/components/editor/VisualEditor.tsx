import type { Theme } from '../../theme/schema'

type Props = {
  theme: Theme
  onChange: (next: Theme) => void
}

const WEIGHT_OPTIONS = [100, 200, 300, 400, 500, 600, 700, 800, 900].map(w => ({ value: String(w), label: String(w) }))
const BORDER_STYLE_OPTIONS = ['solid', 'dashed', 'dotted', 'none'].map(s => ({ value: s, label: s }))

function setKey<T extends object, K extends keyof T>(obj: T, key: K, value: T[K]): T {
  return { ...obj, [key]: value }
}

export function VisualEditor({ theme, onChange }: Props) {
  const update = (mut: (t: Theme) => Theme) => onChange(mut(theme))

  const updateColor = (key: keyof Theme['colors'], value: string) =>
    update(t => ({ ...t, colors: { ...t.colors, [key]: value } }))

  const updateFontFamily = (key: keyof Theme['typography']['fontFamily'], value: string) =>
    update(t => ({ ...t, typography: { ...t.typography, fontFamily: { ...t.typography.fontFamily, [key]: value } } }))

  const updateFontSize = (key: keyof Theme['typography']['fontSize'], value: string) =>
    update(t => ({ ...t, typography: { ...t.typography, fontSize: { ...t.typography.fontSize, [key]: value } } }))

  const updateFontWeight = (key: keyof Theme['typography']['fontWeight'], value: number) =>
    update(t => ({ ...t, typography: { ...t.typography, fontWeight: { ...t.typography.fontWeight, [key]: value } } }))

  const updateLineHeight = (key: keyof Theme['typography']['lineHeight'], value: number) =>
    update(t => ({ ...t, typography: { ...t.typography, lineHeight: { ...t.typography.lineHeight, [key]: value } } }))

  const updateSpacing = (key: keyof Theme['spacing'], value: string) =>
    update(t => ({ ...t, spacing: { ...t.spacing, [key]: value } }))

  const updateRadius = (key: keyof Theme['radius'], value: string) =>
    update(t => ({ ...t, radius: { ...t.radius, [key]: value } }))

  const updateShadow = (key: keyof Theme['shadows'], value: string) =>
    update(t => ({ ...t, shadows: { ...t.shadows, [key]: value } }))

  const updateBorders = (field: keyof Theme['borders'], value: string) =>
    update(t => ({ ...t, borders: { ...t.borders, [field]: value } }))

  const updateTransition = (key: keyof Theme['transitions'], value: string) =>
    update(t => ({ ...t, transitions: { ...t.transitions, [key]: value } }))

  return (
    <div className="visual-editor">
      <section className="ve-section">
        <h4 className="ve-section__title">Name</h4>
        <input className="field__input" value={theme.name} onChange={e => update(t => setKey(t, 'name', e.target.value))} />
      </section>

      <section className="ve-section">
        <h4 className="ve-section__title">Colors</h4>
        <div className="ve-grid">
          {Object.entries(theme.colors).map(([k, v]) => (
            <label key={k} className="ve-color">
              <span className="ve-color__label">{k}</span>
              <input type="color" value={v} onChange={e => updateColor(k as keyof Theme['colors'], e.target.value)} />
            </label>
          ))}
        </div>
      </section>

      <section className="ve-section">
        <h4 className="ve-section__title">Typography — font families</h4>
        <div className="ve-stack">
          {Object.entries(theme.typography.fontFamily).map(([k, v]) => (
            <label key={k} className="ve-field">
              <span className="ve-field__label">{k}</span>
              <input className="field__input" value={v} onChange={e => updateFontFamily(k as keyof Theme['typography']['fontFamily'], e.target.value)} />
            </label>
          ))}
        </div>
      </section>

      <section className="ve-section">
        <h4 className="ve-section__title">Typography — sizes</h4>
        <div className="ve-grid">
          {Object.entries(theme.typography.fontSize).map(([k, v]) => (
            <label key={k} className="ve-field">
              <span className="ve-field__label">{k}</span>
              <input className="field__input" value={v} onChange={e => updateFontSize(k as keyof Theme['typography']['fontSize'], e.target.value)} />
            </label>
          ))}
        </div>
      </section>

      <section className="ve-section">
        <h4 className="ve-section__title">Typography — weights</h4>
        <div className="ve-grid">
          {Object.entries(theme.typography.fontWeight).map(([k, v]) => (
            <label key={k} className="ve-field">
              <span className="ve-field__label">{k}</span>
              <select className="field__input" value={String(v)} onChange={e => updateFontWeight(k as keyof Theme['typography']['fontWeight'], Number(e.target.value))}>
                {WEIGHT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
          ))}
        </div>
      </section>

      <section className="ve-section">
        <h4 className="ve-section__title">Typography — line heights</h4>
        <div className="ve-grid">
          {Object.entries(theme.typography.lineHeight).map(([k, v]) => (
            <label key={k} className="ve-field">
              <span className="ve-field__label">{k}</span>
              <input type="number" step="0.1" min="0.5" max="3" className="field__input" value={v} onChange={e => updateLineHeight(k as keyof Theme['typography']['lineHeight'], Number(e.target.value))} />
            </label>
          ))}
        </div>
      </section>

      <section className="ve-section">
        <h4 className="ve-section__title">Spacing</h4>
        <div className="ve-grid">
          {Object.entries(theme.spacing).map(([k, v]) => (
            <label key={k} className="ve-field">
              <span className="ve-field__label">{k}</span>
              <input className="field__input" value={v} onChange={e => updateSpacing(k as keyof Theme['spacing'], e.target.value)} />
            </label>
          ))}
        </div>
      </section>

      <section className="ve-section">
        <h4 className="ve-section__title">Radius</h4>
        <div className="ve-grid">
          {Object.entries(theme.radius).map(([k, v]) => (
            <label key={k} className="ve-field">
              <span className="ve-field__label">{k}</span>
              <input className="field__input" value={v} onChange={e => updateRadius(k as keyof Theme['radius'], e.target.value)} />
            </label>
          ))}
        </div>
      </section>

      <section className="ve-section">
        <h4 className="ve-section__title">Shadows</h4>
        <div className="ve-stack">
          {Object.entries(theme.shadows).map(([k, v]) => (
            <label key={k} className="ve-field">
              <span className="ve-field__label">{k}</span>
              <input className="field__input" value={v} onChange={e => updateShadow(k as keyof Theme['shadows'], e.target.value)} />
            </label>
          ))}
        </div>
      </section>

      <section className="ve-section">
        <h4 className="ve-section__title">Borders</h4>
        <div className="ve-grid">
          <label className="ve-field">
            <span className="ve-field__label">width</span>
            <input className="field__input" value={theme.borders.width} onChange={e => updateBorders('width', e.target.value)} />
          </label>
          <label className="ve-field">
            <span className="ve-field__label">style</span>
            <select className="field__input" value={theme.borders.style} onChange={e => updateBorders('style', e.target.value)}>
              {BORDER_STYLE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </label>
        </div>
      </section>

      <section className="ve-section">
        <h4 className="ve-section__title">Transitions</h4>
        <div className="ve-stack">
          {Object.entries(theme.transitions).map(([k, v]) => (
            <label key={k} className="ve-field">
              <span className="ve-field__label">{k}</span>
              <input className="field__input" value={v} onChange={e => updateTransition(k as keyof Theme['transitions'], e.target.value)} />
            </label>
          ))}
        </div>
      </section>

      <section className="ve-section">
        <h4 className="ve-section__title">Custom CSS</h4>
        <textarea
          className="field__input ve-textarea"
          rows={8}
          value={theme.customCss}
          onChange={e => update(t => setKey(t, 'customCss', e.target.value))}
          placeholder="/* Advanced overrides — applies after :root variables */"
        />
      </section>
    </div>
  )
}