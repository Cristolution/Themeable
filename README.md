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
- **Navigate 8 pages** — Dashboard, Activity, Calendar, Projects, Tasks, Files, Profile, Settings, Help (plus a NotFound catch-all)

## What's new

- **20 new theme tokens** — 6 shadows (`button`, `input`, `card`, `focus`, `inner`, `glow`), 9 colors (`bgHover`, `bgActive`, `textInverse`, `borderStrong`, `focusRing`, `info`, `link`, `codeBg`, `overlay`), and 5 breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`)
- **8 new pages** wired through React Router v6 (`react-router-dom`) — Activity, Calendar, Projects, Tasks, Files, Profile, Settings, Help
- **4 new shared components** — `InfoPill`, `Link`, `Modal`, `CodeBlock`
- **`useBreakpoint` hook** — reads a breakpoint token from the active theme (replaces the old `useMediaQuery`)
- **Editor expanded** — the visual editor now exposes the 9 new colors, 6 new shadows, and 5 new breakpoints

## What's new in v3

- **Text direction as a theme token** — every `Theme` now carries `direction: 'ltr' | 'rtl'`. When `applyTheme` runs, it sets `<html dir="...">` so the entire layout flips. `validateTheme` rejects anything that isn't `ltr` or `rtl`, all four built-in presets ship with `direction: 'ltr'`, and the visual editor exposes a dedicated LTR / RTL toggle at the top.
- **7 new shared UI components** — `Checkbox`, `Radio` + `RadioGroup`, `Drawer`, `HamburgerMenu`, `FontPicker`, `LengthInput`, `SizePreview`.
- **`FontPicker` with 200+ entries** — a searchable dropdown of over 230 curated font stacks (system stacks, web-safe families, serif/sans/mono/display categories), with an "Edit" affordance for custom stacks.
- **Editor overhaul for length tokens** — every font-size, spacing, radius, and border-width field now uses `LengthInput` (number input + unit dropdown for `px` / `rem` / `em` / `%` / `vh` / `vw` / `pt` / `ch`) paired with a `SizePreview` that renders a visual preview of the value (font sample, dot of the right size, rounded-corner swatch, spacing bar).
- **Responsive shell** — at narrow viewports the desktop nav links collapse behind a `HamburgerMenu` button that opens the sidebar inside a `Drawer`. Sidebar links use logical properties so the drawer slides in from the correct inline edge in both LTR and RTL.
- **Responsive editor panel** — the editor slides up as a bottom sheet at tablet widths and goes full-screen on mobile, with the visual / JSON tab strip pinned to the top.
- **Responsive dashboards** — dashboard grids, stat cards, and feature cards reflow across `sm` / `md` / `lg` breakpoints.
- **RTL via logical CSS properties** — `base.css` was rewritten to use `margin-inline-*`, `padding-inline-*`, `border-inline-start` / `border-inline-end`, `inset-inline-*`, and friends. All components honor the active `direction` automatically with no per-component branching.

## Project structure

```
src/
  theme/        Schema, engine (CSS generation), validator, presets, storage
  state/        useTheme hook
  dashboard/    Sample data
  pages/        DashboardPage, ActivityPage, CalendarPage, ProjectsPage,
                TasksPage, FilesPage, ProfilePage, SettingsPage,
                HelpPage, NotFoundPage
  components/
    editor/      EditorPanel, VisualEditor, JsonEditor, PresetGallery, ImportExport
    dashboard/  Nav, Sidebar, StatCard, charts, table, form, feed, calendar, features
    ui/         Button, Input, Select, Checkbox, Radio, RadioGroup,
                Card, Pill, Toast, Drawer, HamburgerMenu,
                InfoPill, Link, Modal, CodeBlock,
                FontPicker, LengthInput, SizePreview
  styles/       base.css, components.css
  hooks/        useBreakpoint
  App.tsx       Routes are declared inline (no router.tsx file)
```

## Theme schema

See `src/theme/schema.ts` for the full TypeScript schema. Top-level keys:

- `name` — display name
- `colors` — `bg`, `bgElevated`, `bgSubtle`, `bgHover`, `bgActive`, `text`, `textMuted`, `textInverse`, `border`, `borderStrong`, `accent`, `accentText`, `success`, `warning`, `danger`, `info`, `link`, `focusRing`, `codeBg`, `overlay` (hex / rgba)
- `typography` — fontFamily, fontSize, fontWeight, lineHeight
- `spacing` — unit, xs..2xl (CSS length strings)
- `radius` — none..full (CSS length strings)
- `shadows` — none, sm, md, lg, button, input, card, focus, inner, glow (CSS shadow values)
- `borders` — width, style (`solid` | `dashed` | `dotted` | `none`)
- `transitions` — fast, normal, slow (CSS transition values)
- `breakpoints` — sm, md, lg, xl, 2xl (CSS length strings)
- `customCss` — raw CSS appended after `:root` (no `<script>` allowed)
- `direction` — `'ltr' | 'rtl'`. Sets `<html dir>` when the theme is applied; layout uses logical CSS properties so the entire UI flips for RTL.

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