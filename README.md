# Themeable Dashboard

A generic dashboard web app whose entire visual design is driven by a JSON theme. Edit themes visually or in raw JSON, switch between built-in presets, save to `localStorage`, or import/export JSON files to share.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:5173/`.

## What you can do

- **Edit themes visually** — color pickers, dropdowns, sliders for every token
- **Edit themes as JSON** — full schema visibility, live validation
- **Switch presets** — Midnight, Solarized Light, Monokai, Paper
- **Save / Reset** — themes persist across reloads via `localStorage`
- **Import / Export** — share themes as `.json` files

## Project structure

```
src/
  theme/        Schema, engine (CSS generation), validator, presets, storage
  state/        useTheme hook
  dashboard/    Sample data
  components/
    editor/     EditorPanel, VisualEditor, JsonEditor, PresetGallery, ImportExport
    dashboard/  Nav, Sidebar, StatCard, charts, table, form, feed, calendar, features
    ui/         Button, Input, Select, Card, Pill, Toast
  styles/       base.css, components.css
  hooks/        useMediaQuery
```

## Theme schema

See `src/theme/schema.ts` for the full TypeScript schema. Top-level keys:

- `name` — display name
- `colors` — bg, bgElevated, bgSubtle, text, textMuted, border, accent, accentText, success, warning, danger (all hex)
- `typography` — fontFamily, fontSize, fontWeight, lineHeight
- `spacing` — unit, xs..2xl (CSS length strings)
- `radius` — none..full (CSS length strings)
- `shadows` — none..lg (CSS shadow values)
- `borders` — width, style (`solid` | `dashed` | `dotted` | `none`)
- `transitions` — fast, normal, slow (CSS transition values)
- `customCss` — raw CSS appended after `:root` (no `<script>` allowed)

## Tests

```bash
npm test
```

Validator tests in `tests/theme/validate.test.ts`.

## Build

```bash
npm run build
npm run preview
```

## License

MIT