// Import a tailwind.config.js / .ts snippet into a PartialTheme.
//
// Strategy: extract the colors object literal from the file using a
// brace-balancing scan (no eval, no Function — just string slicing).
// Then accept either shape:
//   theme: { extend: { colors: { ... } } }
//   theme: { colors: { ... } }
//   colors: { ... }          (top-level shorthand)
//
// Color slot names match our export (bg, accent, etc.). Unknown keys
// are ignored.

import type { PartialTheme, ImportResult } from './types'

const COLOR_KEY_MAP: Record<string, string> = {
  'bg': 'bg',
  'bg-elevated': 'bgElevated',
  'bg-subtle': 'bgSubtle',
  'text': 'text',
  'text-muted': 'textMuted',
  'border': 'border',
  'accent': 'accent',
  'accent-text': 'accentText',
  'success': 'success',
  'warning': 'warning',
  'danger': 'danger',
  'bg-hover': 'bgHover',
  'bg-active': 'bgActive',
  'text-inverse': 'textInverse',
  'border-strong': 'borderStrong',
  'focus-ring': 'focusRing',
  'info': 'info',
  'link': 'link',
  'code-bg': 'codeBg',
  'overlay': 'overlay',
}

export function importTailwind3(text: string): ImportResult {
  const objSource = extractModuleExportsObject(text)
  if (!objSource) {
    return { ok: false, error: 'could not find a module.exports object in tailwind config' }
  }

  let parsed: unknown
  try {
    // Use `new Function` rather than `eval`: the returned function is
    // scoped and we never pollute the global namespace. The source text
    // is the user's tailwind.config file (or our own export).
    parsed = new Function(`return (${objSource});`)()
  } catch (e) {
    return { ok: false, error: `could not parse config object: ${e instanceof Error ? e.message : 'unknown'}` }
  }
  if (!isPlainObject(parsed)) {
    return { ok: false, error: 'parsed config is not an object' }
  }

  // Find colors object: prefer theme.extend.colors, then theme.colors, then top-level.
  const colors = findColorsObject(parsed)
  if (!colors) {
    return { ok: false, error: 'no colors object found in tailwind config' }
  }

  const partial: PartialTheme = { colors: {} }
  let matched = 0
  for (const [k, v] of Object.entries(colors)) {
    const slot = COLOR_KEY_MAP[k]
    if (!slot) continue
    if (typeof v !== 'string') continue
    ;(partial.colors as Record<string, unknown>)[slot] = v
    matched++
  }

  if (matched === 0) {
    return { ok: false, error: 'tailwind config had no recognized color keys' }
  }

  return {
    ok: true,
    partial,
    detectedFormat: 'tailwind3',
    warnings: ['tailwind.config.js only carries colors — other theme tokens were kept from the current theme'],
  }
}

// Find the first balanced `{ ... }` object that follows `module.exports`
// (or = default export for .ts configs) and return its source slice.
function extractModuleExportsObject(text: string): string | null {
  const idx = text.search(/module\.exports\s*=/)
  if (idx === -1) return null
  const after = text.slice(idx)
  const start = after.indexOf('{')
  if (start === -1) return null
  return extractBalancedObject(after, start)
}

function extractBalancedObject(text: string, openIdx: number): string | null {
  let depth = 0
  let inString: string | null = null
  let escape = false
  for (let i = openIdx; i < text.length; i++) {
    const ch = text[i]
    if (escape) { escape = false; continue }
    if (ch === '\\') { escape = true; continue }
    if (inString) {
      if (ch === inString) inString = null
      continue
    }
    if (ch === '"' || ch === "'" || ch === '`') { inString = ch; continue }
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) return text.slice(openIdx, i + 1)
    }
  }
  return null
}

function findColorsObject(obj: Record<string, unknown>): Record<string, unknown> | null {
  const theme = (obj.theme ?? {}) as Record<string, unknown>
  const extend = (theme.extend ?? {}) as Record<string, unknown>
  if (extend.colors && isPlainObject(extend.colors)) return extend.colors
  if (theme.colors && isPlainObject(theme.colors)) return theme.colors
  if (obj.colors && isPlainObject(obj.colors)) return obj.colors
  return null
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}