// Export theme as a tailwind.config.js snippet.
//
// Tailwind v3's JS config only accepts hex/rgb color values (Tailwind
// compiles them internally and will silently mishandle hsl/oklch strings
// passed as raw JS). When the caller asks for hsl/oklch we fall back to
// hex and emit a warning via the returned payload.

import type { Theme } from '../schema'
import type { ColorFormat } from './color'
import { formatColor } from './color'
import type { ExportPayload } from './types'

export type Tailwind3ExportResult = ExportPayload & { warnings: string[] }

export function exportTailwind3(theme: Theme, colorFormat: ColorFormat): Tailwind3ExportResult {
  const warnings: string[] = []
  let effective = colorFormat
  if (colorFormat === 'hsl' || colorFormat === 'oklch') {
    warnings.push(
      `Tailwind v3 only supports hex/rgb color values; falling back to hex for hsl/oklch request`,
    )
    effective = 'hex'
  }

  const colors = theme.colors
  const fmt = (v: string) => formatColor(v, effective)

  // Tailwind v3 expects hex/rgb under `theme.extend.colors` so default
  // palette colors stay available.
  const colorEntries: Record<string, string> = {
    bg: fmt(colors.bg),
    'bg-elevated': fmt(colors.bgElevated),
    'bg-subtle': fmt(colors.bgSubtle),
    text: fmt(colors.text),
    'text-muted': fmt(colors.textMuted),
    border: fmt(colors.border),
    accent: fmt(colors.accent),
    'accent-text': fmt(colors.accentText),
    success: fmt(colors.success),
    warning: fmt(colors.warning),
    danger: fmt(colors.danger),
    'bg-hover': fmt(colors.bgHover),
    'bg-active': fmt(colors.bgActive),
    'text-inverse': fmt(colors.textInverse),
    'border-strong': fmt(colors.borderStrong),
    'focus-ring': fmt(colors.focusRing),
    info: fmt(colors.info),
    link: fmt(colors.link),
    'code-bg': fmt(colors.codeBg),
    overlay: fmt(colors.overlay),
  }

  // Hand-format as JS so we don't have to quote-escape JSON keys.
  const lines = Object.entries(colorEntries).map(
    ([k, v]) => `      '${k.replace(/'/g, "\\'")}': '${v.replace(/'/g, "\\'")}',`,
  )

  const body = [
    `/** @type {import('tailwindcss').Config} */`,
    `module.exports = {`,
    `  theme: {`,
    `    extend: {`,
    `      colors: {`,
    ...lines,
    `      },`,
    `    },`,
    `  },`,
    `}`,
    ``,
  ].join('\n')

  if (theme.customCss.trim()) {
    warnings.push('tailwind.config.js cannot carry CSS — customCss was not exported')
  }

  return {
    text: body,
    filename: `tailwind.config.${slug(theme.name)}.js`,
    mime: 'application/javascript',
    warnings,
  }
}

function slug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '')
}