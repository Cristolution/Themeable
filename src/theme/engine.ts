import type { Theme } from './schema'

const STYLE_ID = 'theme-tokens'

/**
 * Convert a theme into a CSS string with a :root block of variables
 * and (sanitized) custom CSS appended after it.
 */
export function themeToCss(theme: Theme): string {
  const vars = flattenToVars(theme)
  const lines = vars.map(v => `  ${v.name}: ${v.value};`)
  const rootBlock = `:root {\n${lines.join('\n')}\n}\n`
  const custom = sanitizeCustomCss(theme.customCss)
  return custom ? `${rootBlock}\n${custom}` : rootBlock
}

/**
 * Inject theme CSS into the document. Reuses a single <style> element.
 */
export function applyTheme(theme: Theme): void {
  const css = themeToCss(theme)
  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!styleEl) {
    styleEl = document.createElement('style')
    styleEl.id = STYLE_ID
    document.head.appendChild(styleEl)
  }
  styleEl.textContent = css
}

/**
 * Remove any <script> tags from user-provided CSS to prevent XSS.
 */
export function sanitizeCustomCss(css: string): string {
  return css.replace(/<script/gi, '')
}

// --- internal ---

type VarEntry = { name: string; value: string }

function flattenToVars(theme: Theme): VarEntry[] {
  const out: VarEntry[] = []

  // Colors
  out.push({ name: '--color-bg', value: theme.colors.bg })
  out.push({ name: '--color-bg-elevated', value: theme.colors.bgElevated })
  out.push({ name: '--color-bg-subtle', value: theme.colors.bgSubtle })
  out.push({ name: '--color-text', value: theme.colors.text })
  out.push({ name: '--color-text-muted', value: theme.colors.textMuted })
  out.push({ name: '--color-border', value: theme.colors.border })
  out.push({ name: '--color-accent', value: theme.colors.accent })
  out.push({ name: '--color-accent-text', value: theme.colors.accentText })
  out.push({ name: '--color-success', value: theme.colors.success })
  out.push({ name: '--color-warning', value: theme.colors.warning })
  out.push({ name: '--color-danger', value: theme.colors.danger })

  // New colors
  out.push({ name: '--color-bg-hover', value: theme.colors.bgHover })
  out.push({ name: '--color-bg-active', value: theme.colors.bgActive })
  out.push({ name: '--color-text-inverse', value: theme.colors.textInverse })
  out.push({ name: '--color-border-strong', value: theme.colors.borderStrong })
  out.push({ name: '--color-focus-ring', value: theme.colors.focusRing })
  out.push({ name: '--color-info', value: theme.colors.info })
  out.push({ name: '--color-link', value: theme.colors.link })
  out.push({ name: '--color-code-bg', value: theme.colors.codeBg })
  out.push({ name: '--color-overlay', value: theme.colors.overlay })

  // Typography — font families
  out.push({ name: '--font-body', value: theme.typography.fontFamily.body })
  out.push({ name: '--font-heading', value: theme.typography.fontFamily.heading })
  out.push({ name: '--font-mono', value: theme.typography.fontFamily.mono })

  // Typography — font sizes
  for (const [k, v] of Object.entries(theme.typography.fontSize)) {
    out.push({ name: `--font-size-${k}`, value: v })
  }

  // Typography — font weights
  out.push({ name: '--font-weight-normal', value: String(theme.typography.fontWeight.normal) })
  out.push({ name: '--font-weight-medium', value: String(theme.typography.fontWeight.medium) })
  out.push({ name: '--font-weight-bold', value: String(theme.typography.fontWeight.bold) })

  // Typography — line heights
  out.push({ name: '--line-height-tight', value: String(theme.typography.lineHeight.tight) })
  out.push({ name: '--line-height-normal', value: String(theme.typography.lineHeight.normal) })
  out.push({ name: '--line-height-loose', value: String(theme.typography.lineHeight.loose) })

  // Spacing
  out.push({ name: '--space-unit', value: theme.spacing.unit })
  for (const [k, v] of Object.entries(theme.spacing)) {
    if (k === 'unit') continue
    out.push({ name: `--space-${k}`, value: v })
  }

  // Radius
  for (const [k, v] of Object.entries(theme.radius)) {
    out.push({ name: `--radius-${k}`, value: v })
  }

  // Shadows
  for (const [k, v] of Object.entries(theme.shadows)) {
    out.push({ name: `--shadow-${k}`, value: v })
  }

  // New shadows
  for (const [k, v] of Object.entries(theme.shadows)) {
    if (k === 'none' || k === 'sm' || k === 'md' || k === 'lg') continue
    out.push({ name: `--shadow-${k}`, value: v })
  }

  // Breakpoints
  for (const [k, v] of Object.entries(theme.breakpoints)) {
    out.push({ name: `--breakpoint-${k}`, value: v })
  }

  // Borders
  out.push({ name: '--border-width', value: theme.borders.width })
  out.push({ name: '--border-style', value: theme.borders.style })

  // Transitions
  out.push({ name: '--transition-fast', value: theme.transitions.fast })
  out.push({ name: '--transition-normal', value: theme.transitions.normal })
  out.push({ name: '--transition-slow', value: theme.transitions.slow })

  return out
}
