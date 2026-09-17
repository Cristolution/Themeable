import type { Theme } from '../../theme/schema'
import { LengthInput } from '../ui/LengthInput'
import { SizePreview } from '../ui/SizePreview'
import { FontPicker } from '../ui/FontPicker'

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

  const updateNewColor = (key: keyof Theme['colors'], value: string) =>
    update(t => ({ ...t, colors: { ...t.colors, [key]: value } }))

  const updateNewShadow = (key: keyof Theme['shadows'], value: string) =>
    update(t => ({ ...t, shadows: { ...t.shadows, [key]: value } }))

  const updateBreakpoint = (key: keyof Theme['breakpoints'], value: string) =>
    update(t => ({ ...t, breakpoints: { ...t.breakpoints, [key]: value } }))

  const updateBorders = (field: keyof Theme['borders'], value: string) =>
    update(t => ({ ...t, borders: { ...t.borders, [field]: value } }))

  const updateTransition = (key: keyof Theme['transitions'], value: string) =>
    update(t => ({ ...t, transitions: { ...t.transitions, [key]: value } }))

  const updateDirection = (value: Theme['direction']) =>
    update(t => ({ ...t, direction: value }))

  return (
    <div className="visual-editor">
      <section className="ve-section">
        <h4 className="ve-section__title">Name</h4>
        <input className="field__input" value={theme.name} onChange={e => update(t => setKey(t, 'name', e.target.value))} />
      </section>

      <section className="ve-section">
        <h4 className="ve-section__title">Direction</h4>
        <div className="ve-direction-toggle" role="radiogroup" aria-label="Text direction">
          <button
            type="button"
            role="radio"
            aria-checked={theme.direction === 'ltr'}
            className={`ve-direction-toggle__btn${theme.direction === 'ltr' ? ' is-active' : ''}`}
            onClick={() => updateDirection('ltr')}
          >
            LTR
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={theme.direction === 'rtl'}
            className={`ve-direction-toggle__btn${theme.direction === 'rtl' ? ' is-active' : ''}`}
            onClick={() => updateDirection('rtl')}
          >
            RTL
          </button>
        </div>
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
        <h4 className="ve-section__title">Hover & active colors</h4>
        <div className="ve-grid">
          <label className="ve-color">
            <span className="ve-color__label">bgHover</span>
            <input type="color" value={theme.colors.bgHover} onChange={e => updateNewColor('bgHover', e.target.value)} />
          </label>
          <label className="ve-color">
            <span className="ve-color__label">bgActive</span>
            <input type="color" value={theme.colors.bgActive} onChange={e => updateNewColor('bgActive', e.target.value)} />
          </label>
          <label className="ve-color">
            <span className="ve-color__label">textInverse</span>
            <input type="color" value={theme.colors.textInverse} onChange={e => updateNewColor('textInverse', e.target.value)} />
          </label>
          <label className="ve-color">
            <span className="ve-color__label">borderStrong</span>
            <input type="color" value={theme.colors.borderStrong} onChange={e => updateNewColor('borderStrong', e.target.value)} />
          </label>
          <label className="ve-color">
            <span className="ve-color__label">focusRing</span>
            <input type="color" value={theme.colors.focusRing} onChange={e => updateNewColor('focusRing', e.target.value)} />
          </label>
          <label className="ve-color">
            <span className="ve-color__label">info</span>
            <input type="color" value={theme.colors.info} onChange={e => updateNewColor('info', e.target.value)} />
          </label>
          <label className="ve-color">
            <span className="ve-color__label">link</span>
            <input type="color" value={theme.colors.link} onChange={e => updateNewColor('link', e.target.value)} />
          </label>
          <label className="ve-color">
            <span className="ve-color__label">codeBg</span>
            <input type="color" value={theme.colors.codeBg} onChange={e => updateNewColor('codeBg', e.target.value)} />
          </label>
          <label className="ve-color">
            <span className="ve-color__label">overlay</span>
            <input type="color" value={theme.colors.overlay} onChange={e => updateNewColor('overlay', e.target.value)} />
          </label>
        </div>
      </section>

      <section className="ve-section">
        <h4 className="ve-section__title">Typography — font families</h4>
        <div className="ve-stack">
          {(Object.keys(theme.typography.fontFamily) as Array<keyof Theme['typography']['fontFamily']>).map(k => (
            <div key={k} className="ve-length-row">
              <span className="ve-field__label">{k}</span>
              <FontPicker
                value={theme.typography.fontFamily[k]}
                onChange={newV => updateFontFamily(k, newV)}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="ve-section">
        <h4 className="ve-section__title">Typography — sizes</h4>
        <div className="ve-stack">
          {(Object.keys(theme.typography.fontSize) as Array<keyof Theme['typography']['fontSize']>).map(k => (
            <div key={k} className="ve-length-row">
              <span className="ve-field__label">{k}</span>
              <LengthInput
                value={theme.typography.fontSize[k]}
                onChange={newV => updateFontSize(k, newV)}
              />
              <SizePreview kind="fontSize" value={theme.typography.fontSize[k]} />
            </div>
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
        <div className="ve-stack">
          {(Object.keys(theme.spacing) as Array<keyof Theme['spacing']>).map(k => (
            <div key={k} className="ve-length-row">
              <span className="ve-field__label">{k}</span>
              <LengthInput
                value={theme.spacing[k]}
                onChange={newV => updateSpacing(k, newV)}
              />
              <SizePreview kind="spacing" value={theme.spacing[k]} />
            </div>
          ))}
        </div>
      </section>

      <section className="ve-section">
        <h4 className="ve-section__title">Radius</h4>
        <div className="ve-stack">
          {(Object.keys(theme.radius) as Array<keyof Theme['radius']>).map(k => (
            <div key={k} className="ve-length-row">
              <span className="ve-field__label">{k}</span>
              <LengthInput
                value={theme.radius[k]}
                onChange={newV => updateRadius(k, newV)}
              />
              <SizePreview kind="radius" value={theme.radius[k]} />
            </div>
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
        <h4 className="ve-section__title">Special shadows</h4>
        <div className="ve-stack">
          <label className="ve-field">
            <span className="ve-field__label">button</span>
            <input className="field__input" value={theme.shadows.button} onChange={e => updateNewShadow('button', e.target.value)} />
          </label>
          <label className="ve-field">
            <span className="ve-field__label">input</span>
            <input className="field__input" value={theme.shadows.input} onChange={e => updateNewShadow('input', e.target.value)} />
          </label>
          <label className="ve-field">
            <span className="ve-field__label">card</span>
            <input className="field__input" value={theme.shadows.card} onChange={e => updateNewShadow('card', e.target.value)} />
          </label>
          <label className="ve-field">
            <span className="ve-field__label">focus</span>
            <input className="field__input" value={theme.shadows.focus} onChange={e => updateNewShadow('focus', e.target.value)} />
          </label>
          <label className="ve-field">
            <span className="ve-field__label">inner</span>
            <input className="field__input" value={theme.shadows.inner} onChange={e => updateNewShadow('inner', e.target.value)} />
          </label>
          <label className="ve-field">
            <span className="ve-field__label">glow</span>
            <input className="field__input" value={theme.shadows.glow} onChange={e => updateNewShadow('glow', e.target.value)} />
          </label>
        </div>
      </section>

      <section className="ve-section">
        <h4 className="ve-section__title">Borders</h4>
        <div className="ve-stack">
          <div className="ve-length-row">
            <span className="ve-field__label">width</span>
            <LengthInput
              value={theme.borders.width}
              onChange={v => updateBorders('width', v)}
            />
            <SizePreview kind="spacing" value={theme.borders.width} />
          </div>
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
        <h4 className="ve-section__title">Breakpoints</h4>
        <div className="ve-grid">
          {Object.entries(theme.breakpoints).map(([k, v]) => (
            <label key={k} className="ve-field">
              <span className="ve-field__label">{k}</span>
              <input
                className="field__input"
                value={v}
                onChange={e => updateBreakpoint(k as keyof Theme['breakpoints'], e.target.value)}
              />
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
