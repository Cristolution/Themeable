---
name: Themeable
description: Generate complete theme JSON files for the Themeable dashboard project. Use when the user asks for a new theme (by mood, reference, color, or description) or wants to convert an existing palette into a Themeable theme. Output: a single JSON file at themes/<name>.json that conforms to the project's Theme schema.
---

# Themeable Theme Generator

## When to invoke this skill

Invoke when the user asks for any of:
- "make me a [mood/style] theme"
- "generate a theme that feels like [reference]"
- "convert this palette / design into a Themeable theme"
- "what would a [description] theme look like"

Output a single JSON file at `themes/<kebab-case-name>.json`. Create the `themes/` directory if needed.

The project's live editor can then load the file via the Import JSON button.

## Schema (must satisfy)

Full schema lives in `src/theme/schema.ts`. Field reference:

| Field | Type | Notes |
|---|---|---|
| `name` | string | Display name |
| `direction` | `"ltr"` \| `"rtl"` | |
| `nightMode` | boolean | `false` for standard themes |
| `colors` | object | 11 named color slots (see below) |
| `typography.fontFamily` | object | `body`, `heading`, `mono` — CSS font-family strings |
| `typography.fontSize` | object | `xs`, `sm`, `base`, `lg`, `xl`, `2xl` — CSS lengths |
| `typography.fontWeight` | object | `normal`, `medium`, `bold` — numbers 100-900 |
| `typography.lineHeight` | object | `tight`, `normal`, `loose` — unitless multipliers |
| `spacing` | object | `unit`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl` — CSS lengths |
| `radius` | object | `none`, `sm`, `md`, `lg`, `full` — CSS lengths |
| `shadows` | object | `none`, `sm`, `md`, `lg`, `button`, `input`, `card`, `focus`, `inner`, `glow` — full CSS shadow values |
| `borders` | object | `width`, `style` (one of `solid`/`dashed`/`dotted`/`none`) |
| `transitions` | object | `fast`, `normal`, `slow` — CSS transition values |
| `breakpoints` | object | `sm`, `md`, `lg`, `xl`, `2xl` — CSS lengths (defaults: 640/768/1024/1280/1536 px) |
| `customCss` | string | Raw CSS appended after `:root` (optional) |

### Color slots (20 total)

`bg`, `bgElevated`, `bgSubtle`, `text`, `textMuted`, `border`, `accent`, `accentText`, `success`, `warning`, `danger`, `bgHover`, `bgActive`, `textInverse`, `borderStrong`, `focusRing`, `info`, `link`, `codeBg`, `overlay`

Hex values (e.g. `#0a0a0a`) for 19 slots. `overlay` can be hex OR rgba — schema accepts both (`#000000` or `rgba(0,0,0,0.6)`).

## Design principles

1. **Color hierarchy**: Pick one base hue + saturation. Generate the 11 core colors from related shades.
   - `bg` / `bgElevated` / `bgSubtle` = three lightness steps of the surface
   - `text` / `textMuted` = two lightness steps of text on bg
   - `accent` = one strong contrast color (button/link)
   - `accentText` = text color ON accent (must contrast with accent)
   - `success` / `warning` / `danger` / `info` = four semantic colors muted to fit the palette mood
   - `bgHover` / `bgActive` = subtle interactive states for bg
   - `border` / `borderStrong` = two border intensities
   - `textInverse` = text on dark inverse surfaces
   - `focusRing` = transparent alpha version of accent (for `:focus-visible` halos)
   - `link` = related to accent (slightly different shade or hue)
   - `codeBg` = usually bgSubtle or bgElevated
   - `overlay` = dark transparent for modals (`rgba(0,0,0,0.5–0.7)` usually)

2. **Contrast ratios**: Aim for WCAG AA:
   - text on bg: 4.5:1 (body) / 3:1 (large text)
   - accent on accentText: 4.5:1

3. **Typography coherence**: Pick 2-3 fonts that work together:
   - `body` + `heading` can be the same family or paired (e.g., Inter + Fraunces)
   - `mono` should be a real monospace (JetBrains Mono, Fira Code, IBM Plex Mono)
   - Provide font stack fallbacks: `"Inter, system-ui, sans-serif"`

4. **Type scale**: Form a clear visual hierarchy. Base 14-16px. Common ratios: 1.125 (major second), 1.25 (major third), 1.333 (perfect fourth), 1.5 (perfect fifth).
   - xs: 0.75-0.8x base
   - sm: 0.875x base
   - base: 1x
   - lg: 1.2-1.33x base
   - xl: 1.5-1.67x base
   - 2xl: 2-2.5x base

5. **Spacing scale**: Pick a base unit (4px or 8px). Multiply:
   - unit = base
   - xs = 1x
   - sm = 2x
   - md = 4x
   - lg = 6-8x
   - xl = 8-10x
   - 2xl = 12-14x

6. **Radius scale**: From 0 (sharp) to large (rounded):
   - none: 0
   - sm: 2-4px
   - md: 6-10px
   - lg: 12-16px
   - full: 9999px (pill)

7. **Shadows**: All should use a consistent base color (often derived from the theme's text color). Dark themes use darker shadows with higher alpha. Light themes use subtle dark shadows. The 6 named shadows cover: standard elevation (sm/md/lg), interactive states (button/input/card), focus ring (focus), inset (inner), and glow (glow).

8. **Breakpoints**: Default to the standard scale (640/768/1024/1280/1536 px) unless the user specifies custom values.

## Workflow

1. **Parse the request**: What mood/style/color/era/reference?
2. **Pick the palette**: hue + saturation + key colors
3. **Pick fonts**: 2-3 families that match the mood
4. **Set scales**: type, spacing, radius, shadows with consistent ratios
5. **Write the file**: `themes/<kebab-case-name>.json`
6. **Validate mentally**: All 20 colors populated, all shadow slots valid CSS strings, no `undefined` values
7. **Report briefly**: file path + theme name + 1-2 sentence mood summary

## Output format

JSON file at `themes/<kebab-case-name>.json`. Pretty-printed with 2-space indent.

Brief summary after writing:
- File path
- Theme name
- Mood/design summary (1-2 sentences)
- Note that the user can load it via the editor's "Import JSON" button (preset gallery also has a similar flow)

## Pitfalls to avoid

1. **Missing fields** — every slot must be filled (no `undefined`)
2. **Invalid hex** — must be 3, 4, 6, or 8 hex digits prefixed with `#`
3. **Mismatched font style** — playful fonts in a corporate theme, serif body in a tech theme (unless intentional)
4. **Off-palette accent** — accent that doesn't relate to the rest of the palette's hue
5. **Single shadow value** — all 10 shadow slots need distinct values (use `none` for ones not needed)
6. **Generic rgba(0,0,0,0.1) for everything** — shadows should reflect the theme's mood (warmer shadows for cozy themes, sharper for technical, larger for bold)
7. **Insufficient contrast** — test in your head: if `text` and `bg` are similar lightness, the theme is unreadable
8. **Missing fallbacks in font stacks** — always include `system-ui, sans-serif` (or appropriate fallback) as the last item

## Reference

For the full type definition and validation rules, see:
- Schema: `src/theme/schema.ts` (TypeScript types)
- Validator: `src/theme/validate.ts` (runtime validation logic)
- Examples: existing presets in `src/theme/presets.ts` (midnight, solarizedLight, monokai, paper, plus the v4 design-inspired set)

## See also

- `schema.md` — quick-reference for all field names and types
- `examples.md` — 4 worked examples spanning different styles
