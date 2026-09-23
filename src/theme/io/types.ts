// Shared types for the io/ converters.
//
// A "PartialTheme" is what an import yields when the source format
// doesn't carry every token (e.g. a Tailwind config only has colors).
// App.tsx merges PartialTheme onto the current theme.

import type {
  Theme, ColorTokens, TypographyTokens, SpacingTokens,
  RadiusTokens, ShadowTokens, BorderTokens, TransitionTokens, BreakpointTokens,
} from '../schema'

// DeepPartial: every leaf is optional. Required so importers can supply
// (e.g.) only { typography: { fontFamily: { body: '...' } } } without
// TS demanding the full TypographyTokens shape.
type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T

export type PartialTheme = DeepPartial<Theme> & {
  colors?: DeepPartial<ColorTokens>
  typography?: DeepPartial<TypographyTokens>
  spacing?: DeepPartial<SpacingTokens>
  radius?: DeepPartial<RadiusTokens>
  shadows?: DeepPartial<ShadowTokens>
  borders?: DeepPartial<BorderTokens>
  transitions?: DeepPartial<TransitionTokens>
  breakpoints?: DeepPartial<BreakpointTokens>
}

export type ImportResult =
  | { ok: true; partial: PartialTheme; detectedFormat: ImportFormat; warnings: string[] }
  | { ok: false; error: string }

export type ImportFormat = 'json' | 'css' | 'tailwind3'
export type ExportFormat = 'json' | 'css' | 'tailwind4' | 'tailwind3'

export type ExportPayload = {
  text: string
  filename: string
  mime: string
}