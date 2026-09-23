// Export theme as a Tailwind v4 inline CSS theme block.
//
// Tailwind v4 reads @theme { ... } directly in CSS, and the variable
// names match CSS custom properties. We drop the `--color-` prefix on
// color entries so users get Tailwind utility names like `bg-bg` and
// `text-accent` (Tailwind v4 strips `--color-` automatically when
// generating utilities from these vars).

import type { Theme } from '../schema'
import type { ColorFormat } from './color'
import { formatColor } from './color'
import type { ExportPayload } from './types'

export function exportTailwind4(theme: Theme, colorFormat: ColorFormat): ExportPayload {
  const colors = theme.colors
  const fmt = (v: string) => formatColor(v, colorFormat)

  const colorVars = [
    `  --color-bg: ${fmt(colors.bg)};`,
    `  --color-bg-elevated: ${fmt(colors.bgElevated)};`,
    `  --color-bg-subtle: ${fmt(colors.bgSubtle)};`,
    `  --color-text: ${fmt(colors.text)};`,
    `  --color-text-muted: ${fmt(colors.textMuted)};`,
    `  --color-border: ${fmt(colors.border)};`,
    `  --color-accent: ${fmt(colors.accent)};`,
    `  --color-accent-text: ${fmt(colors.accentText)};`,
    `  --color-success: ${fmt(colors.success)};`,
    `  --color-warning: ${fmt(colors.warning)};`,
    `  --color-danger: ${fmt(colors.danger)};`,
    `  --color-bg-hover: ${fmt(colors.bgHover)};`,
    `  --color-bg-active: ${fmt(colors.bgActive)};`,
    `  --color-text-inverse: ${fmt(colors.textInverse)};`,
    `  --color-border-strong: ${fmt(colors.borderStrong)};`,
    `  --color-focus-ring: ${fmt(colors.focusRing)};`,
    `  --color-info: ${fmt(colors.info)};`,
    `  --color-link: ${fmt(colors.link)};`,
    `  --color-code-bg: ${fmt(colors.codeBg)};`,
    `  --color-overlay: ${fmt(colors.overlay)};`,
  ]

  const fontVars = [
    `  --font-sans: ${theme.typography.fontFamily.body};`,
    `  --font-heading: ${theme.typography.fontFamily.heading};`,
    `  --font-mono: ${theme.typography.fontFamily.mono};`,
  ]

  const radiusVars = [
    `  --radius-sm: ${theme.radius.sm};`,
    `  --radius-md: ${theme.radius.md};`,
    `  --radius-lg: ${theme.radius.lg};`,
  ]

  const shadowVars = [
    `  --shadow-sm: ${theme.shadows.sm};`,
    `  --shadow-md: ${theme.shadows.md};`,
    `  --shadow-lg: ${theme.shadows.lg};`,
  ]

  const body = [
    `@theme {`,
    ...colorVars,
    ``,
    ...fontVars,
    ``,
    ...radiusVars,
    ``,
    ...shadowVars,
    `}`,
  ].join('\n')

  const custom = theme.customCss.trim()
  const full = custom ? `${body}\n\n${custom}` : body

  return {
    text: full,
    filename: `theme-${slug(theme.name)}.css`,
    mime: 'text/css',
  }
}

function slug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '')
}