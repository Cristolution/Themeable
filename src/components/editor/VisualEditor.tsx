import type { Theme } from '../../theme/schema'
import { LengthInput } from '../ui/LengthInput'
import { SizePreview } from '../ui/SizePreview'
import { FontPicker } from '../ui/FontPicker'
import { CollapsibleSection } from '../ui/CollapsibleSection'
import { Checkbox } from '../ui/Checkbox'
import { useLocalStorage } from '../../hooks/useLocalStorage'

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
  const [search, setSearch] = useLocalStorage<string>('td:editor-search', '')
  const matchesSearch = (text: string): boolean => !search || text.toLowerCase().includes(search)
  const matchClass = (text: string): string =>
    search && matchesSearch(text) ? 'editor-token--match' : ''

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

  // Section-level visibility checks (search filter)
  const nameVisible = matchesSearch('name')
  const directionVisible = matchesSearch('direction') || matchesSearch('ltr') || matchesSearch('rtl')
  const colorsVisible = matchesSearch('colors') || Object.keys(theme.colors).some(k => matchesSearch(k))
  const hoverActiveVisible = matchesSearch('hover') || matchesSearch('active') || Object.keys(theme.colors).some(k => matchesSearch(k))
  const fontFamiliesVisible = matchesSearch('typography') || matchesSearch('font family') || matchesSearch('font') || matchesSearch('family') || Object.keys(theme.typography.fontFamily).some(k => matchesSearch(k))
  const fontSizesVisible = matchesSearch('typography') || matchesSearch('size') || matchesSearch('sizes') || Object.keys(theme.typography.fontSize).some(k => matchesSearch(k))
  const fontWeightsVisible = matchesSearch('typography') || matchesSearch('weight') || matchesSearch('weights') || Object.keys(theme.typography.fontWeight).some(k => matchesSearch(k))
  const lineHeightsVisible = matchesSearch('typography') || matchesSearch('line') || matchesSearch('height') || Object.keys(theme.typography.lineHeight).some(k => matchesSearch(k))
  const spacingVisible = matchesSearch('spacing') || Object.keys(theme.spacing).some(k => matchesSearch(k))
  const radiusVisible = matchesSearch('radius') || Object.keys(theme.radius).some(k => matchesSearch(k))
  const shadowsVisible = matchesSearch('shadows') || Object.keys(theme.shadows).some(k => matchesSearch(k))
  const specialShadowsVisible = matchesSearch('shadows') || matchesSearch('special') || ['button', 'input', 'card', 'focus', 'inner', 'glow'].some(k => matchesSearch(k))
  const bordersVisible = matchesSearch('borders') || matchesSearch('width') || matchesSearch('style')
  const transitionsVisible = matchesSearch('transitions') || Object.keys(theme.transitions).some(k => matchesSearch(k))
  const breakpointsVisible = matchesSearch('breakpoints') || Object.keys(theme.breakpoints).some(k => matchesSearch(k))
  const customCssVisible = matchesSearch('custom') || matchesSearch('css')

  return (
    <div className="visual-editor">
      <div className={nameVisible ? '' : 'editor-section--no-match'}>
        <CollapsibleSection title="Name" persistKey="name">
          <div className="ve-section">
            <h4 className="ve-section__title">Name</h4>
            <input className="field__input" value={theme.name} onChange={e => update(t => setKey(t, 'name', e.target.value))} />
          </div>
        </CollapsibleSection>
      </div>

      <div className={directionVisible ? '' : 'editor-section--no-match'}>
        <CollapsibleSection title="Direction" persistKey="direction">
          <div className="ve-section">
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
          </div>
        </CollapsibleSection>
      </div>

      <input
        type="text"
        className="editor-search"
        placeholder="Search tokens..."
        value={search}
        onChange={e => setSearch(e.target.value.toLowerCase())}
      />

      <Checkbox
        checked={theme.nightMode}
        onChange={checked => update(t => ({ ...t, nightMode: checked }))}
        label="Night mode (invert colors)"
      />

      <div className={colorsVisible ? '' : 'editor-section--no-match'}>
        <CollapsibleSection title="Colors" persistKey="colors">
          <div className="ve-section">
            <h4 className="ve-section__title">Colors</h4>
            <div className="ve-grid">
              {Object.entries(theme.colors).map(([k, v]) => (
                <label key={k} className={`ve-color ${matchClass(k)}`}>
                  <span className="ve-color__label">{k}</span>
                  <input type="color" value={v} onChange={e => updateColor(k as keyof Theme['colors'], e.target.value)} />
                </label>
              ))}
            </div>
          </div>
        </CollapsibleSection>
      </div>

      <div className={hoverActiveVisible ? '' : 'editor-section--no-match'}>
        <CollapsibleSection title="Hover & active colors" persistKey="hover-active-colors">
          <div className="ve-section">
            <h4 className="ve-section__title">Hover & active colors</h4>
            <div className="ve-grid">
              <label className={`ve-color ${matchClass('bgHover')}`}>
                <span className="ve-color__label">bgHover</span>
                <input type="color" value={theme.colors.bgHover} onChange={e => updateNewColor('bgHover', e.target.value)} />
              </label>
              <label className={`ve-color ${matchClass('bgActive')}`}>
                <span className="ve-color__label">bgActive</span>
                <input type="color" value={theme.colors.bgActive} onChange={e => updateNewColor('bgActive', e.target.value)} />
              </label>
              <label className={`ve-color ${matchClass('textInverse')}`}>
                <span className="ve-color__label">textInverse</span>
                <input type="color" value={theme.colors.textInverse} onChange={e => updateNewColor('textInverse', e.target.value)} />
              </label>
              <label className={`ve-color ${matchClass('borderStrong')}`}>
                <span className="ve-color__label">borderStrong</span>
                <input type="color" value={theme.colors.borderStrong} onChange={e => updateNewColor('borderStrong', e.target.value)} />
              </label>
              <label className={`ve-color ${matchClass('focusRing')}`}>
                <span className="ve-color__label">focusRing</span>
                <input type="color" value={theme.colors.focusRing} onChange={e => updateNewColor('focusRing', e.target.value)} />
              </label>
              <label className={`ve-color ${matchClass('info')}`}>
                <span className="ve-color__label">info</span>
                <input type="color" value={theme.colors.info} onChange={e => updateNewColor('info', e.target.value)} />
              </label>
              <label className={`ve-color ${matchClass('link')}`}>
                <span className="ve-color__label">link</span>
                <input type="color" value={theme.colors.link} onChange={e => updateNewColor('link', e.target.value)} />
              </label>
              <label className={`ve-color ${matchClass('codeBg')}`}>
                <span className="ve-color__label">codeBg</span>
                <input type="color" value={theme.colors.codeBg} onChange={e => updateNewColor('codeBg', e.target.value)} />
              </label>
              <label className={`ve-color ${matchClass('overlay')}`}>
                <span className="ve-color__label">overlay</span>
                <input type="color" value={theme.colors.overlay} onChange={e => updateNewColor('overlay', e.target.value)} />
              </label>
            </div>
          </div>
        </CollapsibleSection>
      </div>

      <div className={fontFamiliesVisible ? '' : 'editor-section--no-match'}>
        <CollapsibleSection title="Typography — font families" persistKey="typography-font-families">
          <div className="ve-section">
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
          </div>
        </CollapsibleSection>
      </div>

      <div className={fontSizesVisible ? '' : 'editor-section--no-match'}>
        <CollapsibleSection title="Typography — sizes" persistKey="typography-sizes">
          <div className="ve-section">
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
          </div>
        </CollapsibleSection>
      </div>

      <div className={fontWeightsVisible ? '' : 'editor-section--no-match'}>
        <CollapsibleSection title="Typography — weights" persistKey="typography-weights">
          <div className="ve-section">
            <h4 className="ve-section__title">Typography — weights</h4>
            <div className="ve-grid">
              {Object.entries(theme.typography.fontWeight).map(([k, v]) => (
                <label key={k} className={`ve-field ${matchClass(k)}`}>
                  <span className="ve-field__label">{k}</span>
                  <select className="field__input" value={String(v)} onChange={e => updateFontWeight(k as keyof Theme['typography']['fontWeight'], Number(e.target.value))}>
                    {WEIGHT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </label>
              ))}
            </div>
          </div>
        </CollapsibleSection>
      </div>

      <div className={lineHeightsVisible ? '' : 'editor-section--no-match'}>
        <CollapsibleSection title="Typography — line heights" persistKey="typography-line-heights">
          <div className="ve-section">
            <h4 className="ve-section__title">Typography — line heights</h4>
            <div className="ve-grid">
              {Object.entries(theme.typography.lineHeight).map(([k, v]) => (
                <label key={k} className={`ve-field ${matchClass(k)}`}>
                  <span className="ve-field__label">{k}</span>
                  <input type="number" step="0.1" min="0.5" max="3" className="field__input" value={v} onChange={e => updateLineHeight(k as keyof Theme['typography']['lineHeight'], Number(e.target.value))} />
                </label>
              ))}
            </div>
          </div>
        </CollapsibleSection>
      </div>

      <div className={spacingVisible ? '' : 'editor-section--no-match'}>
        <CollapsibleSection title="Spacing" persistKey="spacing">
          <div className="ve-section">
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
          </div>
        </CollapsibleSection>
      </div>

      <div className={radiusVisible ? '' : 'editor-section--no-match'}>
        <CollapsibleSection title="Radius" persistKey="radius">
          <div className="ve-section">
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
          </div>
        </CollapsibleSection>
      </div>

      <div className={shadowsVisible ? '' : 'editor-section--no-match'}>
        <CollapsibleSection title="Shadows" persistKey="shadows">
          <div className="ve-section">
            <h4 className="ve-section__title">Shadows</h4>
            <div className="ve-stack">
              {Object.entries(theme.shadows).map(([k, v]) => (
                <label key={k} className={`ve-field ${matchClass(k)}`}>
                  <span className="ve-field__label">{k}</span>
                  <input className="field__input" value={v} onChange={e => updateShadow(k as keyof Theme['shadows'], e.target.value)} />
                </label>
              ))}
            </div>
          </div>
        </CollapsibleSection>
      </div>

      <div className={specialShadowsVisible ? '' : 'editor-section--no-match'}>
        <CollapsibleSection title="Special shadows" persistKey="special-shadows">
          <div className="ve-section">
            <h4 className="ve-section__title">Special shadows</h4>
            <div className="ve-stack">
              <label className={`ve-field ${matchClass('button')}`}>
                <span className="ve-field__label">button</span>
                <input className="field__input" value={theme.shadows.button} onChange={e => updateNewShadow('button', e.target.value)} />
              </label>
              <label className={`ve-field ${matchClass('input')}`}>
                <span className="ve-field__label">input</span>
                <input className="field__input" value={theme.shadows.input} onChange={e => updateNewShadow('input', e.target.value)} />
              </label>
              <label className={`ve-field ${matchClass('card')}`}>
                <span className="ve-field__label">card</span>
                <input className="field__input" value={theme.shadows.card} onChange={e => updateNewShadow('card', e.target.value)} />
              </label>
              <label className={`ve-field ${matchClass('focus')}`}>
                <span className="ve-field__label">focus</span>
                <input className="field__input" value={theme.shadows.focus} onChange={e => updateNewShadow('focus', e.target.value)} />
              </label>
              <label className={`ve-field ${matchClass('inner')}`}>
                <span className="ve-field__label">inner</span>
                <input className="field__input" value={theme.shadows.inner} onChange={e => updateNewShadow('inner', e.target.value)} />
              </label>
              <label className={`ve-field ${matchClass('glow')}`}>
                <span className="ve-field__label">glow</span>
                <input className="field__input" value={theme.shadows.glow} onChange={e => updateNewShadow('glow', e.target.value)} />
              </label>
            </div>
          </div>
        </CollapsibleSection>
      </div>

      <div className={bordersVisible ? '' : 'editor-section--no-match'}>
        <CollapsibleSection title="Borders" persistKey="borders">
          <div className="ve-section">
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
              <label className={`ve-field ${matchClass('style')}`}>
                <span className="ve-field__label">style</span>
                <select className="field__input" value={theme.borders.style} onChange={e => updateBorders('style', e.target.value)}>
                  {BORDER_STYLE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </label>
            </div>
          </div>
        </CollapsibleSection>
      </div>

      <div className={transitionsVisible ? '' : 'editor-section--no-match'}>
        <CollapsibleSection title="Transitions" persistKey="transitions">
          <div className="ve-section">
            <h4 className="ve-section__title">Transitions</h4>
            <div className="ve-stack">
              {Object.entries(theme.transitions).map(([k, v]) => (
                <label key={k} className={`ve-field ${matchClass(k)}`}>
                  <span className="ve-field__label">{k}</span>
                  <input className="field__input" value={v} onChange={e => updateTransition(k as keyof Theme['transitions'], e.target.value)} />
                </label>
              ))}
            </div>
          </div>
        </CollapsibleSection>
      </div>

      <div className={breakpointsVisible ? '' : 'editor-section--no-match'}>
        <CollapsibleSection title="Breakpoints" persistKey="breakpoints">
          <div className="ve-section">
            <h4 className="ve-section__title">Breakpoints</h4>
            <div className="ve-grid">
              {Object.entries(theme.breakpoints).map(([k, v]) => (
                <label key={k} className={`ve-field ${matchClass(k)}`}>
                  <span className="ve-field__label">{k}</span>
                  <input
                    className="field__input"
                    value={v}
                    onChange={e => updateBreakpoint(k as keyof Theme['breakpoints'], e.target.value)}
                  />
                </label>
              ))}
            </div>
          </div>
        </CollapsibleSection>
      </div>

      <div className={customCssVisible ? '' : 'editor-section--no-match'}>
        <CollapsibleSection title="Custom CSS" persistKey="custom-css">
          <div className="ve-section">
            <h4 className="ve-section__title">Custom CSS</h4>
            <textarea
              className="field__input ve-textarea"
              rows={8}
              value={theme.customCss}
              onChange={e => update(t => setKey(t, 'customCss', e.target.value))}
              placeholder="/* Advanced overrides — applies after :root variables */"
            />
          </div>
        </CollapsibleSection>
      </div>
    </div>
  )
}