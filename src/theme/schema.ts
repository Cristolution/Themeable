// Theme shape — every visual token the dashboard exposes.
// All tokens map to CSS variables via theme/engine.ts.

export type HexColor = `#${string}`

export type ColorTokens = {
  bg: HexColor
  bgElevated: HexColor
  bgSubtle: HexColor
  text: HexColor
  textMuted: HexColor
  border: HexColor
  accent: HexColor
  accentText: HexColor
  success: HexColor
  warning: HexColor
  danger: HexColor
  bgHover: HexColor
  bgActive: HexColor
  textInverse: HexColor
  borderStrong: HexColor
  focusRing: HexColor
  info: HexColor
  link: HexColor
  codeBg: HexColor
  overlay: HexColor
}

export type TypographyTokens = {
  fontFamily: {
    body: string
    heading: string
    mono: string
  }
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
  }
  fontWeight: {
    normal: number
    medium: number
    bold: number
  }
  lineHeight: {
    tight: number
    normal: number
    loose: number
  }
}

export type SpacingTokens = {
  unit: string
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

export type RadiusTokens = {
  none: string
  sm: string
  md: string
  lg: string
  full: string
}

export type ShadowTokens = {
  none: string
  sm: string
  md: string
  lg: string
  button: string
  input: string
  card: string
  focus: string
  inner: string
  glow: string
}

export type BorderTokens = {
  width: string
  style: 'solid' | 'dashed' | 'dotted' | 'none'
}

export type TransitionTokens = {
  fast: string
  normal: string
  slow: string
}

export type BreakpointTokens = {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

export type Theme = {
  name: string
  colors: ColorTokens
  typography: TypographyTokens
  spacing: SpacingTokens
  radius: RadiusTokens
  shadows: ShadowTokens
  borders: BorderTokens
  transitions: TransitionTokens
  breakpoints: BreakpointTokens
  customCss: string
}
