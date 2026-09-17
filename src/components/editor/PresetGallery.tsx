import type { Theme } from '../../theme/schema'

type Props = {
  presets: Theme[]
  currentName: string
  dirty: boolean
  onSelect: (preset: Theme) => void
}

export function PresetGallery({ presets, currentName, dirty, onSelect }: Props) {
  const handleSelect = (preset: Theme) => {
    if (dirty && preset.name !== currentName) {
      const ok = confirm('You have unsaved changes. Load this preset anyway?')
      if (!ok) return
    }
    onSelect(preset)
  }

  return (
    <div className="preset-gallery">
      <span className="preset-gallery__label">Presets:</span>
      {presets.map(p => (
        <button
          key={p.name}
          className={`preset-chip ${p.name === currentName ? 'preset-chip--active' : ''}`}
          onClick={() => handleSelect(p)}
          title={p.name}
        >
          <span className="preset-chip__dot" style={{ background: p.colors.accent }} aria-hidden />
          {p.name}
        </button>
      ))}
    </div>
  )
}