// Export theme as a CSS :root { ... } block.
//
// Color values are run through `formatColor` so the caller can pick
// hex/rgb/hsl/oklch. Non-color values (shadows, radii, font stacks, etc.)
// are emitted verbatim.

import type { Theme } from '../schema'
import type { ColorFormat } from './color'
import { formatColor } from './color'
import type { ExportPayload } from './types'

// CSS variable name -> value transformer. Returns the raw string for
// non-color vars, and the converted color string for color vars.
function buildVarEntries(theme: Theme, colorFormat: ColorFormat): Array<{ name: string; value: string }> {
  const colors = theme.colors
  const fmt = (v: string) => formatColor(v, colorFormat)

  return [
    { name: '--color-bg', value: fmt(colors.bg) },
    { name: '--color-bg-elevated', value: fmt(colors.bgElevated) },
    { name: '--color-bg-subtle', value: fmt(colors.bgSubtle) },
    { name: '--color-text', value: fmt(colors.text) },
    { name: '--color-text-muted', value: fmt(colors.textMuted) },
    { name: '--color-border', value: fmt(colors.border) },
    { name: '--color-accent', value: fmt(colors.accent) },
    { name: '--color-accent-text', value: fmt(colors.accentText) },
    { name: '--color-success', value: fmt(colors.success) },
    { name: '--color-warning', value: fmt(colors.warning) },
    { name: '--color-danger', value: fmt(colors.danger) },
    { name: '--color-bg-hover', value: fmt(colors.bgHover) },
    { name: '--color-bg-active', value: fmt(colors.bgActive) },
    { name: '--color-text-inverse', value: fmt(colors.textInverse) },
    { name: '--color-border-strong', value: fmt(colors.borderStrong) },
    { name: '--color-focus-ring', value: fmt(colors.focusRing) },
    { name: '--color-info', value: fmt(colors.info) },
    { name: '--color-link', value: fmt(colors.link) },
    { name: '--color-code-bg', value: fmt(colors.codeBg) },
    // overlay may already be rgba(...) — formatColor handles that.
    { name: '--color-overlay', value: fmt(colors.overlay) },

    { name: '--font-body', value: theme.typography.fontFamily.body },
    { name: '--font-heading', value: theme.typography.fontFamily.heading },
    { name: '--font-mono', value: theme.typography.fontFamily.mono },

    { name: '--font-size-xs', value: theme.typography.fontSize.xs },
    { name: '--font-size-sm', value: theme.typography.fontSize.sm },
    { name: '--font-size-base', value: theme.typography.fontSize.base },
    { name: '--font-size-lg', value: theme.typography.fontSize.lg },
    { name: '--font-size-xl', value: theme.typography.fontSize.xl },
    { name: '--font-size-2xl', value: theme.typography.fontSize['2xl'] },

    { name: '--font-weight-normal', value: String(theme.typography.fontWeight.normal) },
    { name: '--font-weight-medium', value: String(theme.typography.fontWeight.medium) },
    { name: '--font-weight-bold', value: String(theme.typography.fontWeight.bold) },

    { name: '--line-height-tight', value: String(theme.typography.lineHeight.tight) },
    { name: '--line-height-normal', value: String(theme.typography.lineHeight.normal) },
    { name: '--line-height-loose', value: String(theme.typography.lineHeight.loose) },

    { name: '--space-unit', value: theme.spacing.unit },
    { name: '--space-xs', value: theme.spacing.xs },
    { name: '--space-sm', value: theme.spacing.sm },
    { name: '--space-md', value: theme.spacing.md },
    { name: '--space-lg', value: theme.spacing.lg },
    { name: '--space-xl', value: theme.spacing.xl },
    { name: '--space-2xl', value: theme.spacing['2xl'] },

    { name: '--radius-none', value: theme.radius.none },
    { name: '--radius-sm', value: theme.radius.sm },
    { name: '--radius-md', value: theme.radius.md },
    { name: '--radius-lg', value: theme.radius.lg },
    { name: '--radius-full', value: theme.radius.full },

    { name: '--shadow-none', value: theme.shadows.none },
    { name: '--shadow-sm', value: theme.shadows.sm },
    { name: '--shadow-md', value: theme.shadows.md },
    { name: '--shadow-lg', value: theme.shadows.lg },
    { name: '--shadow-button', value: theme.shadows.button },
    { name: '--shadow-input', value: theme.shadows.input },
    { name: '--shadow-card', value: theme.shadows.card },
    { name: '--shadow-focus', value: theme.shadows.focus },
    { name: '--shadow-inner', value: theme.shadows.inner },
    { name: '--shadow-glow', value: theme.shadows.glow },

    { name: '--breakpoint-sm', value: theme.breakpoints.sm },
    { name: '--breakpoint-md', value: theme.breakpoints.md },
    { name: '--breakpoint-lg', value: theme.breakpoints.lg },
    { name: '--breakpoint-xl', value: theme.breakpoints.xl },
    { name: '--breakpoint-2xl', value: theme.breakpoints['2xl'] },

    { name: '--border-width', value: theme.borders.width },
    { name: '--border-style', value: theme.borders.style },

    { name: '--transition-fast', value: theme.transitions.fast },
    { name: '--transition-normal', value: theme.transitions.normal },
    { name: '--transition-slow', value: theme.transitions.slow },
  ]
}

export function exportCss(theme: Theme, colorFormat: ColorFormat): ExportPayload {
  const entries = buildVarEntries(theme, colorFormat)
  const rootLines = entries.map(e => `  ${e.name}: ${e.value};`)
  const rootBlock = `:root {\n${rootLines.join('\n')}\n}`
  const custom = theme.customCss.trim()
  const body = custom ? `${rootBlock}\n\n${custom}` : rootBlock
  return {
    text: body,
    filename: `${slug(theme.name)}.css`,
    mime: 'text/css',
  }
}

function slug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '')
}