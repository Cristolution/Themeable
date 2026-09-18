# Themeable Schema Reference

Quick-reference for the Theme JSON schema. For the source of truth, see `src/theme/schema.ts`.

## Top-level fields

```ts
{
  name: string,                    // Display name
  direction: 'ltr' | 'rtl',        // Default: 'ltr'
  nightMode: boolean,              // Default: false
  colors: ColorTokens,             // 20 named color slots
  typography: TypographyTokens,    // fontFamily + fontSize + fontWeight + lineHeight
  spacing: SpacingTokens,          // unit + xs/sm/md/lg/xl/2xl
  radius: RadiusTokens,            // none/sm/md/lg/full
  shadows: ShadowTokens,           // 10 named shadow values
  borders: BorderTokens,           // width + style
  transitions: TransitionTokens,   // fast/normal/slow
  breakpoints: BreakpointTokens,   // sm/md/lg/xl/2xl
  customCss: string                // Optional raw CSS appended after :root
}
```

## ColorTokens (20 slots)

```ts
{
  // Surface (3)
  bg: HexColor,                  // Page background
  bgElevated: HexColor,          // Cards, modals
  bgSubtle: HexColor,            // Subtle backgrounds (table headers, etc.)

  // Text (3)
  text: HexColor,                // Primary text
  textMuted: HexColor,           // Secondary text
  textInverse: HexColor,         // Text on dark inverse surfaces

  // Border (2)
  border: HexColor,
  borderStrong: HexColor,

  // Accent (3)
  accent: HexColor,              // Primary action color
  accentText: HexColor,          // Text on accent (must contrast)
  focusRing: HexColor,           // Usually accent with alpha

  // States (4)
  success: HexColor,
  warning: HexColor,
  danger: HexColor,
  info: HexColor,

  // Interactive (4)
  bgHover: HexColor,             // Hover on bg
  bgActive: HexColor,            // Active/pressed
  link: HexColor,                 // Hyperlinks
  codeBg: HexColor,               // Code/blockquote background

  // Modal (1)
  overlay: HexColor | rgba(...)  // Modal/drawer backdrop (often rgba)
}
```

## TypographyTokens

```ts
{
  fontFamily: {
    body: string,    // E.g., "'Inter', system-ui, sans-serif"
    heading: string,  // E.g., "'Fraunces', Georgia, serif"
    mono: string     // E.g., "'JetBrains Mono', ui-monospace, monospace"
  },
  fontSize: {
    xs: string,    // E.g., '12px'
    sm: string,    // '13px' or '14px'
    base: string,  // '14px' or '16px'
    lg: string,    // '17px' or '18px'
    xl: string,    // '20px' or '22px'
    '2xl': string  // '28px' or '32px'
  },
  fontWeight: {
    normal: number,   // 400 typically
    medium: number,   // 500 or 600
    bold: number      // 700
  },
  lineHeight: {
    tight: number,    // 1.2-1.3
    normal: number,   // 1.5-1.6
    loose: number     // 1.7-1.85
  }
}
```

## SpacingTokens

```ts
{
  unit: string,        // Base unit, e.g., '4px' or '8px'
  xs: string,          // ~1x unit
  sm: string,          // ~2x unit
  md: string,          // ~4x unit
  lg: string,          // ~6-8x unit
  xl: string,          // ~8-10x unit
  '2xl': string       // ~12-14x unit
}
```

## RadiusTokens

```ts
{
  none: string,    // '0'
  sm: string,      // 2-4px
  md: string,      // 6-10px
  lg: string,      // 12-16px
  full: string     // '9999px' for pill shapes
}
```

## ShadowTokens (10)

All values are full CSS `box-shadow` strings. Use `'none'` for unused slots.

```ts
{
  none: string,       // 'none'
  sm: string,         // Subtle: 0 1px 2px rgba(0,0,0,0.1)
  md: string,         // Standard: 0 4px 12px rgba(0,0,0,0.15)
  lg: string,         // Large: 0 12px 32px rgba(0,0,0,0.2)
  button: string,     // For raised buttons
  input: string,      // For input fields (subtle)
  card: string,       // For cards
  focus: string,      // Focus ring: 0 0 0 3px rgba(<accent>, 0.4)
  inner: string,      // Inset: inset 0 1px 2px rgba(0,0,0,0.1)
  glow: string        // Glow: 0 0 24px rgba(<accent>, 0.5)
}
```

## BorderTokens

```ts
{
  width: string,              // E.g., '1px', '2px'
  style: 'solid' | 'dashed' | 'dotted' | 'none'
}
```

## TransitionTokens

```ts
{
  fast: string,      // E.g., '120ms ease'
  normal: string,    // E.g., '200ms ease'
  slow: string       // E.g., '400ms ease'
}
```

## BreakpointTokens (defaults shown)

```ts
{
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}
```

## Validation rules (from `src/theme/validate.ts`)

- `name`: required string
- `direction`: required, must be `'ltr'` or `'rtl'`
- `nightMode`: required boolean
- Color values: must match `/^#[0-9a-fA-F]{3,8}$/` for 19 slots; `overlay` additionally accepts `rgb(...)` and `rgba(...)`
- `fontFamily.*`: non-empty string
- `fontSize.*`: non-empty string (CSS length)
- `fontWeight.*`: number (100-900)
- `lineHeight.*`: number > 0
- `radius.none`, `borders.width`: non-empty string
- `borders.style`: must be one of `solid`/`dashed`/`dotted`/`none`
- `shadows.*`, `spacing.*`, `transitions.*`, `breakpoints.*`: non-empty string
- `customCss`: optional string (defaults to empty)

Validator is at `src/theme/validate.ts`. Tests at `tests/theme/validate.test.ts`.
