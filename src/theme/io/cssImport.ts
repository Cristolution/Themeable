// Import a CSS :root or @theme block into a PartialTheme.
//
// Strategy: regex-extract the first balanced { ... } block whose
// preceding selector matches `:root` or `@theme`. Then parse the body
// as `--name: value;` pairs. Map known var names back to theme slots;
// ignore unknowns.

import type { PartialTheme, ImportResult } from './types'

// Tailwind v4 uses @theme inline (no parens, just a bare at-rule).
const BLOCK_RE = /(?::root|@theme)\s*\{([\s\S]*?)\}/g
const VAR_RE = /--([a-z0-9-]+)\s*:\s*([^;]+);/gi

type SlotRef = { section: keyof PartialTheme; slot: string }

// Map CSS var names to theme sections + slot names.
const VAR_MAP: Record<string, SlotRef> = {
  'color-bg':                  { section: 'colors', slot: 'bg' },
  'color-bg-elevated':         { section: 'colors', slot: 'bgElevated' },
  'color-bg-subtle':           { section: 'colors', slot: 'bgSubtle' },
  'color-text':                { section: 'colors', slot: 'text' },
  'color-text-muted':          { section: 'colors', slot: 'textMuted' },
  'color-border':              { section: 'colors', slot: 'border' },
  'color-accent':              { section: 'colors', slot: 'accent' },
  'color-accent-text':         { section: 'colors', slot: 'accentText' },
  'color-success':             { section: 'colors', slot: 'success' },
  'color-warning':             { section: 'colors', slot: 'warning' },
  'color-danger':              { section: 'colors', slot: 'danger' },
  'color-bg-hover':            { section: 'colors', slot: 'bgHover' },
  'color-bg-active':           { section: 'colors', slot: 'bgActive' },
  'color-text-inverse':        { section: 'colors', slot: 'textInverse' },
  'color-border-strong':       { section: 'colors', slot: 'borderStrong' },
  'color-focus-ring':          { section: 'colors', slot: 'focusRing' },
  'color-info':                { section: 'colors', slot: 'info' },
  'color-link':                { section: 'colors', slot: 'link' },
  'color-code-bg':             { section: 'colors', slot: 'codeBg' },
  'color-overlay':             { section: 'colors', slot: 'overlay' },
  'font-body':                 { section: 'typography', slot: 'fontFamily.body' },
  'font-heading':              { section: 'typography', slot: 'fontFamily.heading' },
  'font-mono':                 { section: 'typography', slot: 'fontFamily.mono' },
  'space-unit':                { section: 'spacing', slot: 'unit' },
  'space-xs':                  { section: 'spacing', slot: 'xs' },
  'space-sm':                  { section: 'spacing', slot: 'sm' },
  'space-md':                  { section: 'spacing', slot: 'md' },
  'space-lg':                  { section: 'spacing', slot: 'lg' },
  'space-xl':                  { section: 'spacing', slot: 'xl' },
  'space-2xl':                 { section: 'spacing', slot: '2xl' },
  'radius-none':               { section: 'radius', slot: 'none' },
  'radius-sm':                 { section: 'radius', slot: 'sm' },
  'radius-md':                 { section: 'radius', slot: 'md' },
  'radius-lg':                 { section: 'radius', slot: 'lg' },
  'radius-full':               { section: 'radius', slot: 'full' },
  'border-width':              { section: 'borders', slot: 'width' },
  'border-style':              { section: 'borders', slot: 'style' },
  'transition-fast':           { section: 'transitions', slot: 'fast' },
  'transition-normal':         { section: 'transitions', slot: 'normal' },
  'transition-slow':           { section: 'transitions', slot: 'slow' },
  'breakpoint-sm':             { section: 'breakpoints', slot: 'sm' },
  'breakpoint-md':             { section: 'breakpoints', slot: 'md' },
  'breakpoint-lg':             { section: 'breakpoints', slot: 'lg' },
  'breakpoint-xl':             { section: 'breakpoints', slot: 'xl' },
  'breakpoint-2xl':            { section: 'breakpoints', slot: '2xl' },
}

export function importCss(text: string): ImportResult {
  const vars: Record<string, string> = {}
  let foundBlock = false
  for (const match of text.matchAll(BLOCK_RE)) {
    foundBlock = true
    const body = match[1]
    for (const v of body.matchAll(VAR_RE)) {
      vars[v[1].toLowerCase()] = v[2].trim()
    }
  }

  if (!foundBlock) {
    return { ok: false, error: 'no :root or @theme block found in CSS' }
  }
  if (Object.keys(vars).length === 0) {
    return { ok: false, error: 'CSS block contained no CSS custom properties' }
  }

  const partial: PartialTheme = {}
  for (const [varName, ref] of Object.entries(VAR_MAP)) {
    if (!(varName in vars)) continue
    const value = vars[varName]
    const section = partial[ref.section]
    if (section === undefined) {
      // DeepPartial makes any field undefined; assign via bracket on a typed object.
      ;(partial as Record<string, unknown>)[ref.section] = {}
    }
    const target = (partial[ref.section] ?? {}) as Record<string, unknown>
    setNested(target, ref.slot, value)
  }

  return { ok: true, partial, detectedFormat: 'css', warnings: [] }
}

function setNested(obj: Record<string, unknown>, path: string, value: string): void {
  const parts = path.split('.')
  let cur: Record<string, unknown> = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i]
    if (!(k in cur) || typeof cur[k] !== 'object' || cur[k] === null) {
      cur[k] = {}
    }
    cur = cur[k] as Record<string, unknown>
  }
  cur[parts[parts.length - 1]] = value
}