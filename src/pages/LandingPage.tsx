import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { Theme } from '../theme/schema'
import { ensureThemeFonts } from '../theme/fonts'
import { exportCss, exportTailwind4 } from '../theme/io'
import { AiPromptBuilder } from '../components/ai/AiPromptBuilder'
import { site } from '../siteConfig'

type Props = {
  theme: Theme
  presets: Theme[]
  onSelectPreset: (preset: Theme) => void
}

// A deliberately varied handful — each one changes type, shape and color.
const FEATURED = [
  'Midnight', 'Newsprint', 'Arcade', 'Claymorphism', 'Swiss Design',
  'Vaporwave', 'Garden', 'Terminal', 'Brutal', 'Liquid Glass',
]

const TOKEN_GROUPS: { name: string; detail: string }[] = [
  { name: 'Colors', detail: '20 slots, from surfaces and text to focus rings, code blocks and modal overlays' },
  { name: 'Typography', detail: 'Body, heading and mono stacks, a six-step type scale, weights and line heights' },
  { name: 'Spacing & radius', detail: 'A spacing scale and corner radii from sharp to pill' },
  { name: 'Shadows', detail: '10 named shadows, including button, input, card, focus, inset and glow' },
  { name: 'Borders & motion', detail: 'Border width and style, plus fast, normal and slow transitions' },
  { name: 'Layout', detail: 'Breakpoints, left-to-right or right-to-left direction, and an escape hatch for custom CSS' },
]

function firstFamily(stack: string) {
  return stack.split(',')[0].replace(/["']/g, '').trim()
}

export function LandingPage({ theme, presets, onSelectPreset }: Props) {
  const featured = useMemo(
    () => FEATURED.map(n => presets.find(p => p.name === n)).filter((p): p is Theme => !!p),
    [presets],
  )

  // Swatches are set in their own preset's font, so load those up front.
  useEffect(() => {
    featured.forEach(ensureThemeFonts)
  }, [featured])

  const surprise = () => {
    const pool = presets.filter(p => p.name !== theme.name)
    onSelectPreset(pool[Math.floor(Math.random() * pool.length)])
  }

  const tokenSnippet = JSON.stringify(
    {
      name: theme.name,
      colors: {
        bg: theme.colors.bg,
        text: theme.colors.text,
        accent: theme.colors.accent,
        border: theme.colors.border,
      },
      typography: { fontFamily: { heading: theme.typography.fontFamily.heading } },
      radius: { md: theme.radius.md },
    },
    null,
    2,
  )

  const cssPreview = exportCss(theme, 'oklch').text.split('\n').slice(0, 9).join('\n') + '\n  …\n}'
  const twPreview = exportTailwind4(theme, 'hex').text.split('\n').slice(0, 9).join('\n') + '\n  …\n}'

  return (
    <div className="landing">
      <header className="landing-nav">
        <Link to="/" className="landing-nav__brand">
          <span className="landing-nav__logo" aria-hidden>◆</span> Themeable
        </Link>
        <nav className="landing-nav__links" aria-label="Page">
          <a href="#tokens">What's in a theme</a>
          <a href="#ai">Make one with AI</a>
          <a href="#export">Export</a>
          {site.repoUrl && <a href={site.repoUrl} target="_blank" rel="noreferrer">GitHub</a>}
        </nav>
        <Link to="/dashboard" className="btn btn--primary btn--sm">Open the editor</Link>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-hero__copy">
            <h1 className="landing-hero__title">Restyle this entire page with one JSON&nbsp;file.</h1>
            <p className="landing-hero__lede">
              Themeable is a live theme editor for design tokens. Colors, type, spacing, shadows and
              shape all come from a single file — tweak it visually, ask an AI to write one, then
              export it as CSS variables or a Tailwind config.
            </p>

            <div className="landing-presets">
              <p className="landing-presets__label" id="preset-label">
                Try a preset. The whole page changes, including this sentence.
              </p>
              <div className="landing-presets__row" role="group" aria-labelledby="preset-label">
                {featured.map(p => (
                  <button
                    key={p.name}
                    type="button"
                    className={`swatch${p.name === theme.name ? ' is-active' : ''}`}
                    aria-pressed={p.name === theme.name}
                    onClick={() => onSelectPreset(p)}
                    style={{
                      background: p.colors.bg,
                      color: p.colors.text,
                      borderColor: p.name === theme.name ? p.colors.accent : p.colors.border,
                      borderRadius: p.radius.md,
                      fontFamily: p.typography.fontFamily.heading,
                    }}
                  >
                    <span className="swatch__dots" aria-hidden>
                      <i style={{ background: p.colors.accent }} />
                      <i style={{ background: p.colors.success }} />
                      <i style={{ background: p.colors.warning }} />
                    </span>
                    {p.name}
                  </button>
                ))}
                <button type="button" className="swatch swatch--random" onClick={surprise}>
                  Surprise me
                </button>
              </div>
            </div>

            <div className="landing-hero__ctas">
              <Link to="/dashboard" className="btn btn--primary btn--md">Open the editor</Link>
              <a href="#ai" className="btn btn--secondary btn--md">Generate a theme with AI</a>
            </div>
            <p className="landing-hero__meta">
              Free and open source. {presets.length} presets. No sign-up, nothing leaves your browser.
            </p>
          </div>

          <figure className="landing-preview" aria-label={`Preview of the ${theme.name} theme`}>
            <div className="landing-preview__ui">
              <div className="landing-preview__bar">
                <span className="landing-preview__app">{theme.name}</span>
                <span className="pill pill--success">Live</span>
              </div>
              <div className="landing-preview__stats">
                <div className="landing-preview__stat">
                  <span>Revenue</span>
                  <strong>$48,210</strong>
                  <em className="pill pill--success">+12.4%</em>
                </div>
                <div className="landing-preview__stat">
                  <span>Churn</span>
                  <strong>1.8%</strong>
                  <em className="pill pill--danger">+0.3%</em>
                </div>
              </div>
              <div className="landing-preview__chart" aria-hidden>
                {[42, 68, 51, 80, 63, 92, 74].map((h, i) => (
                  <span key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="landing-preview__form">
                <input className="field__input" placeholder="Search projects" aria-label="Sample search field" readOnly />
                <button type="button" className="btn btn--primary btn--sm" tabIndex={-1}>Create</button>
              </div>
            </div>
            <figcaption className="landing-preview__code">
              <span className="landing-preview__file">theme.json</span>
              <pre><code>{tokenSnippet}</code></pre>
            </figcaption>
          </figure>
        </section>

        <section className="landing-section" id="tokens">
          <div className="landing-section__head">
            <h2>What's in a theme</h2>
            <p>
              Every component on every page reads from the same tokens, so a theme isn't only a palette.
              It decides how buttons sit, how cards float and how headings sound.
            </p>
          </div>
          <dl className="landing-tokens">
            {TOKEN_GROUPS.map(g => (
              <div key={g.name} className="landing-tokens__row">
                <dt>{g.name}</dt>
                <dd>{g.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="landing-section__aside">
            You're currently looking at <strong>{theme.name}</strong>: headings set in{' '}
            {firstFamily(theme.typography.fontFamily.heading)}, body in{' '}
            {firstFamily(theme.typography.fontFamily.body)}, {theme.radius.md} corners.
          </p>
        </section>

        <section className="landing-section landing-ai" id="ai">
          <div className="landing-section__head">
            <h2>Describe it. Let an AI write it.</h2>
            <p>
              The prompt contains the full token schema, accessibility rules and the fonts the
              editor can load, so the reply drops straight in.
            </p>
          </div>
          <div className="landing-ai__grid">
            <ol className="landing-steps">
              <li>
                <strong>Describe the look</strong>
                <span>A mood, a brand, a decade, a place. Or start from one of the ideas.</span>
              </li>
              <li>
                <strong>Copy the prompt into any chat AI</strong>
                <span>ChatGPT, Claude, Gemini, a local model — it only needs to return JSON.</span>
              </li>
              <li>
                <strong>Paste the reply in the editor</strong>
                <span>Code fences and chatter are stripped. Fine-tune anything by hand afterwards.</span>
              </li>
            </ol>
            <div className="landing-ai__builder">
              <AiPromptBuilder />
              <Link to="/dashboard?ai=1" className="btn btn--secondary btn--md landing-ai__paste">
                I have a reply — paste it in the editor
              </Link>
            </div>
          </div>
        </section>

        <section className="landing-section" id="export">
          <div className="landing-section__head">
            <h2>Take it to your codebase</h2>
            <p>
              Export the current theme as JSON, plain CSS custom properties, a Tailwind v4{' '}
              <code>@theme</code> block or a Tailwind v3 config, with colors in hex, RGB, HSL or
              OKLCH. Import works the same way in reverse.
            </p>
          </div>
          <div className="landing-export">
            <div className="landing-export__file">
              <span className="landing-preview__file">theme.css</span>
              <pre><code>{cssPreview}</code></pre>
            </div>
            <div className="landing-export__file">
              <span className="landing-preview__file">app.css (Tailwind v4)</span>
              <pre><code>{twPreview}</code></pre>
            </div>
          </div>
        </section>

        <section className="landing-cta">
          <h2>Start from {theme.name}, or from scratch.</h2>
          <p>The editor saves to your browser as you go.</p>
          <Link to="/dashboard" className="btn btn--primary btn--md">Open the editor</Link>
        </section>
      </main>

      <footer className="landing-footer">
        <span>Themeable is free and MIT licensed.</span>
        <span className="landing-footer__links">
          <Link to="/components">Component gallery</Link>
          <Link to="/layouts/dashboard">Layouts</Link>
          {site.repoUrl && <a href={site.repoUrl} target="_blank" rel="noreferrer">Source on GitHub</a>}
        </span>
      </footer>
    </div>
  )
}
