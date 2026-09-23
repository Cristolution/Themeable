// Detect import format from filename + content sniff, then dispatch to
// the matching importer. Order: filename first (cheap, decisive when
// present), then content sniff.

import { importJson } from './json'
import { importCss } from './cssImport'
import { importTailwind3 } from './tw3Import'
import type { ImportResult } from './types'

export function detectAndParse(text: string, filename?: string): ImportResult {
  const trimmed = text.trim()
  if (!trimmed) return { ok: false, error: 'file is empty' }

  const name = filename?.toLowerCase() ?? ''

  // Filename-based dispatch
  if (name.endsWith('.css')) {
    const r = importCss(trimmed)
    if (r.ok) return r
    // Fall through to content sniffing if CSS parser rejected it
  }
  if (name.endsWith('.json')) {
    return importJson(trimmed)
  }
  if (name.endsWith('.js') || name.endsWith('.ts') || name.includes('tailwind.config')) {
    const r = importTailwind3(trimmed)
    if (r.ok) return r
  }

  // Content sniffing
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    return importJson(trimmed)
  }
  if (/^\s*[:@].*\{/m.test(trimmed) && (trimmed.includes(':root') || trimmed.includes('@theme'))) {
    return importCss(trimmed)
  }
  if (trimmed.startsWith('module.exports') || /export\s+default/.test(trimmed)) {
    return importTailwind3(trimmed)
  }

  // Last resort: try each parser in order
  const tries = [importJson, importCss, importTailwind3]
  for (const fn of tries) {
    const r = fn(trimmed)
    if (r.ok) return r
  }

  return { ok: false, error: 'could not detect format from filename or content' }
}