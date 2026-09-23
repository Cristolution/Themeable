# Showcase Reorganization Design

**Status:** Approved (verbal, 2026-09-23)
**Goal:** Make the showcase feel like a real UI library (shadcn-style) and add real-world layout pages.

## Routes

```
Dashboard    /dashboard                          (live, unchanged)
Components   /components                         (catalog index)
  Layout       /components/layout
  Forms        /components/forms
  Data Display /components/data-display
  Feedback     /components/feedback
  Overlay      /components/overlay
  Navigation   /components/navigation
  Typography   /components/typography
  Media        /components/media
Layouts      /layouts                            (real-world screens)
  Dashboard  /layouts/dashboard
  Settings    /layouts/settings
  Profile     /layouts/profile
  Social      /layouts/social
  Wiki        /layouts/wiki
  Rich text   /layouts/rich-text
Demos        /demos/...                          (unchanged)
Charts       /charts/...                         (unchanged)
```

### Old-route redirects
- `/components/navigation` → `/components/navigation` (same path, content reorganized)
- `/components/containers` → `/components/layout`
- `/components/surfaces` → `/components/data-display`
- `/components/inputs` → `/components/forms`
- `/components/content` → `/components/typography`

## Catalog page pattern

Each category page:
- H1 with category name
- 1–2 sentence description
- Cards (existing `Card` component) per component, with:
  - Component title
  - Optional pill tag (e.g. "mobile", "overlay", "atomic")
  - 1-line description of what it is / when to use it
  - Live rendered example
- Examples with multiple variants shown together in a single card when they're variants of one component

## Layouts page pattern

Each layout page:
- Looks like a real product screen, not a "demo of components"
- Uses components from the catalog
- Shows realistic data, real composition, real spacing
- At least one piece of interactivity (tabs, form submission, toggling) to feel alive

## Component ownership

All primitives live in `src/components/ui/` as named exports. Pages import them.

## Implementation phases

**Phase 1 — Skeleton (no new components, just reorganization)**
1. Add new routes to `App.tsx`
2. Rewrite `Sidebar.tsx` with the new sections
3. Add redirect routes for old `/components/*` paths
4. Create the 8 category pages, each starting as a "Coming soon" placeholder OR by relocating existing content where it fits
5. Create 6 layout pages as "Coming soon" placeholders
6. Verify build passes and routes resolve

**Phase 2 — Catalog content (existing primitives, redistributed)**
1. Move/reorganize existing InputsPage content into Forms
2. Move existing NavigationPage content into Navigation category
3. Pull content from Containers/Surfaces/Content into the appropriate new categories
4. Verify all existing components are surfaced in at least one catalog page

**Phase 3 — New primitives + layout pages**
1. Add missing primitives listed in the user's request (priority: those needed for layout pages)
2. Build the 6 layout pages
3. Add styles for new primitives

## Out of scope
- Theming changes (already works via CSS vars)
- Component documentation pages / copy-paste code blocks
- Visual redesign of dashboard, profile, etc.
- Adding tests for trivial wrappers; tests only for primitives with nontrivial state (Combobox, Command, Rich Text Editor, OTP, Carousel).