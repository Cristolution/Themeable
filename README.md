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
    ui/         Button, Input, Select, Card, Pill, Toast,
                InfoPill, Link, Modal, CodeBlock
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