import type { Theme } from './schema'
import { defaultTheme } from '../state/useTheme'

// Full preset gallery is added in Task 21.
// For now, expose the default so the gallery has something to render.
export const presets: Theme[] = [defaultTheme]