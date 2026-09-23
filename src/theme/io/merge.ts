// Merge a PartialTheme onto an existing theme. Used when an import only
// carries some tokens (e.g. a Tailwind config provides colors only).
// The merge is shallow per-section: a partial.colors.bg overrides
// currentTheme.colors.bg; everything else in currentTheme.colors stays.

import type { Theme } from '../schema'
import type { PartialTheme } from './types'

export function mergeTheme(current: Theme, partial: PartialTheme): Theme {
  const merged: Theme = { ...current }

  if (partial.name !== undefined) merged.name = partial.name
  if (partial.direction !== undefined) merged.direction = partial.direction
  if (partial.nightMode !== undefined) merged.nightMode = partial.nightMode
  if (partial.customCss !== undefined) merged.customCss = partial.customCss

  if (partial.colors) merged.colors = { ...current.colors, ...partial.colors }
  if (partial.typography) {
    merged.typography = {
      fontFamily: { ...current.typography.fontFamily, ...partial.typography.fontFamily },
      fontSize: { ...current.typography.fontSize, ...partial.typography.fontSize },
      fontWeight: { ...current.typography.fontWeight, ...partial.typography.fontWeight },
      lineHeight: { ...current.typography.lineHeight, ...partial.typography.lineHeight },
    }
  }
  if (partial.spacing) merged.spacing = { ...current.spacing, ...partial.spacing }
  if (partial.radius) merged.radius = { ...current.radius, ...partial.radius }
  if (partial.shadows) merged.shadows = { ...current.shadows, ...partial.shadows }
  if (partial.borders) merged.borders = { ...current.borders, ...partial.borders }
  if (partial.transitions) merged.transitions = { ...current.transitions, ...partial.transitions }
  if (partial.breakpoints) merged.breakpoints = { ...current.breakpoints, ...partial.breakpoints }

  return merged
}

// Sections a partial can carry, in stable order. Used to warn the user
// when a section was missing from the imported source.
export const ALL_SECTIONS = [
  'colors',
  'typography',
  'spacing',
  'radius',
  'shadows',
  'borders',
  'transitions',
  'breakpoints',
] as const

export function missingSections(partial: PartialTheme): string[] {
  const missing: string[] = []
  for (const s of ALL_SECTIONS) {
    if (!partial[s]) missing.push(s)
  }
  return missing
}