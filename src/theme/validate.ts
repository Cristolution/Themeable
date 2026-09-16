import type { Theme } from './schema'

type Result =
  | { ok: true; theme: Theme }
  | { ok: false; errors: string[] }

const HEX_RE = /^#[0-9a-fA-F]{3,8}$/
const BORDER_STYLES: ReadonlyArray<Theme['borders']['style']> = ['solid', 'dashed', 'dotted', 'none']

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function fail(errors: string[]): Result {
  return { ok: false, errors }
}

function ok(theme: Theme): Result {
  return { ok: true, theme }
}

export function validateTheme(input: unknown): Result {
  if (!isObject(input)) return fail(['theme must be an object'])

  const requiredTop = ['name', 'colors', 'typography', 'spacing', 'radius', 'shadows', 'borders', 'transitions', 'customCss']
  const errors: string[] = []
  for (const key of requiredTop) {
    if (!(key in input)) errors.push(`missing top-level key: ${key}`)
  }
  if (errors.length) return fail(errors)

  if (typeof input.name !== 'string') errors.push('name must be a string')
  if (typeof input.customCss !== 'string') errors.push('customCss must be a string')

  // colors
  if (!isObject(input.colors)) {
    errors.push('colors must be an object')
  } else {
    for (const [k, v] of Object.entries(input.colors)) {
      if (typeof v !== 'string' || !HEX_RE.test(v)) {
        errors.push(`colors.${k} must be a hex color (got ${JSON.stringify(v)})`)
      }
    }
  }

  // typography
  if (!isObject(input.typography)) {
    errors.push('typography must be an object')
  } else {
    if (!isObject(input.typography.fontFamily)) errors.push('typography.fontFamily must be an object')
    else {
      for (const [k, v] of Object.entries(input.typography.fontFamily)) {
        if (typeof v !== 'string') errors.push(`typography.fontFamily.${k} must be a string`)
      }
    }
    if (!isObject(input.typography.fontSize)) errors.push('typography.fontSize must be an object')
    else {
      for (const [k, v] of Object.entries(input.typography.fontSize)) {
        if (typeof v !== 'string') errors.push(`typography.fontSize.${k} must be a CSS length string`)
      }
    }
    if (!isObject(input.typography.fontWeight)) errors.push('typography.fontWeight must be an object')
    else {
      for (const [k, v] of Object.entries(input.typography.fontWeight)) {
        if (typeof v !== 'number') errors.push(`typography.fontWeight.${k} must be a number`)
      }
    }
    if (!isObject(input.typography.lineHeight)) errors.push('typography.lineHeight must be an object')
    else {
      for (const [k, v] of Object.entries(input.typography.lineHeight)) {
        if (typeof v !== 'number' || v <= 0) errors.push(`typography.lineHeight.${k} must be a positive number`)
      }
    }
  }

  // spacing
  if (!isObject(input.spacing)) errors.push('spacing must be an object')
  else {
    for (const [k, v] of Object.entries(input.spacing)) {
      if (typeof v !== 'string') errors.push(`spacing.${k} must be a string`)
    }
  }

  // radius
  if (!isObject(input.radius)) errors.push('radius must be an object')
  else {
    for (const [k, v] of Object.entries(input.radius)) {
      if (typeof v !== 'string') errors.push(`radius.${k} must be a string`)
    }
  }

  // shadows
  if (!isObject(input.shadows)) errors.push('shadows must be an object')
  else {
    for (const [k, v] of Object.entries(input.shadows)) {
      if (typeof v !== 'string') errors.push(`shadows.${k} must be a string`)
    }
  }

  // borders
  if (!isObject(input.borders)) errors.push('borders must be an object')
  else {
    if (typeof input.borders.width !== 'string') errors.push('borders.width must be a string')
    if (typeof input.borders.style !== 'string' || !BORDER_STYLES.includes(input.borders.style as Theme['borders']['style'])) {
      errors.push(`borders.style must be one of: ${BORDER_STYLES.join(', ')}`)
    }
  }

  // transitions
  if (!isObject(input.transitions)) errors.push('transitions must be an object')
  else {
    for (const [k, v] of Object.entries(input.transitions)) {
      if (typeof v !== 'string') errors.push(`transitions.${k} must be a string`)
    }
  }

  if (errors.length) return fail(errors)
  return ok(input as unknown as Theme)
}
