// JSON export/import. Imports funnel through validateTheme, so the
// returned theme is always schema-conformant.

import type { Theme } from '../schema'
import { validateTheme } from '../validate'
import type { ExportPayload, ImportResult } from './types'

export function exportJson(theme: Theme): ExportPayload {
  return {
    text: JSON.stringify(theme, null, 2),
    filename: `${slug(theme.name)}.json`,
    mime: 'application/json',
  }
}

export function importJson(text: string): ImportResult {
  try {
    const parsed: unknown = JSON.parse(text)
    const result = validateTheme(parsed)
    if (!result.ok) {
      return { ok: false, error: result.errors[0] ?? 'invalid theme' }
    }
    return {
      ok: true,
      partial: result.theme,
      detectedFormat: 'json',
      warnings: [],
    }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'parse error' }
  }
}

function slug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '')
}