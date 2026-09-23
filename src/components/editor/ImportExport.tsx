import { Button } from '../ui/Button'
import { Menu, MenuTrigger, MenuPanel, MenuItem } from '../ui/Menu'
import type { ExportFormat, ColorFormat } from '../../theme/io'

type Props = {
  onImportText: (text: string, filename: string) => void
  exportFormat: ExportFormat
  onExportFormatChange: (fmt: ExportFormat) => void
  colorFormat: ColorFormat
  onColorFormatChange: (fmt: ColorFormat) => void
  onExport: (format: ExportFormat, colorFormat: ColorFormat) => void
}

const EXPORT_OPTIONS: { value: ExportFormat; label: string; dotColor: string }[] = [
  { value: 'json', label: 'JSON', dotColor: 'var(--color-text)' },
  { value: 'css', label: 'CSS :root', dotColor: 'var(--color-info)' },
  { value: 'tailwind4', label: 'Tailwind v4', dotColor: 'var(--color-accent)' },
  { value: 'tailwind3', label: 'Tailwind v3', dotColor: 'var(--color-warning)' },
]

const COLOR_OPTIONS: { value: ColorFormat; label: string; dotColor: string }[] = [
  { value: 'hex', label: 'Hex', dotColor: 'var(--color-accent)' },
  { value: 'rgb', label: 'RGB', dotColor: 'var(--color-info)' },
  { value: 'hsl', label: 'HSL', dotColor: 'var(--color-success)' },
  { value: 'oklch', label: 'OKLCH', dotColor: 'var(--color-warning)' },
]

export function ImportExport({
  onImportText,
  exportFormat,
  onExportFormatChange,
  colorFormat,
  onColorFormatChange,
  onExport,
}: Props) {
  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json,text/css,.json,.css,.js,.ts,application/javascript'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      const text = await file.text()
      onImportText(text, file.name)
    }
    input.click()
  }

  const formatLabel = EXPORT_OPTIONS.find(o => o.value === exportFormat)?.label ?? exportFormat
  const colorLabel = COLOR_OPTIONS.find(o => o.value === colorFormat)?.label ?? colorFormat

  return (
    <div className="import-export">
      <Button variant="ghost" size="sm" onClick={handleImport}>Import</Button>

      <Menu>
        <MenuTrigger aria-label="Export format">{formatLabel} ▾</MenuTrigger>
        <MenuPanel>
          {EXPORT_OPTIONS.map(o => (
            <MenuItem
              key={o.value}
              value={o.value}
              active={o.value === exportFormat}
              dotColor={o.dotColor}
              title={o.label}
              onSelect={v => onExportFormatChange(v as ExportFormat)}
            >
              {o.label}
            </MenuItem>
          ))}
        </MenuPanel>
      </Menu>

      <Menu>
        <MenuTrigger aria-label="Color format">{colorLabel} ▾</MenuTrigger>
        <MenuPanel>
          {COLOR_OPTIONS.map(o => (
            <MenuItem
              key={o.value}
              value={o.value}
              active={o.value === colorFormat}
              dotColor={o.dotColor}
              title={o.label}
              onSelect={v => onColorFormatChange(v as ColorFormat)}
            >
              {o.label}
            </MenuItem>
          ))}
        </MenuPanel>
      </Menu>

      <Button variant="ghost" size="sm" onClick={() => onExport(exportFormat, colorFormat)}>Export</Button>
    </div>
  )
}