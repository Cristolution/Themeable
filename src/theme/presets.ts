// Public presets surface.
// Actual preset definitions live in `./presets.generated.ts` (committed to
// the repo). This module just re-exports them so call sites can keep using
// `from '../theme/presets'` without depending on the generated filename.

export * from './presets.generated'