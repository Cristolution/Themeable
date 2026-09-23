import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { ImportExport } from '../editor/ImportExport'
import { HamburgerMenu } from '../ui/HamburgerMenu'
import { Menu, MenuTrigger, MenuPanel, MenuItem } from '../ui/Menu'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useIsTablet } from '../../hooks/useIsTablet'
import type { Theme } from '../../theme/schema'
import type { ExportFormat, ColorFormat } from '../../theme/io'

type Props = {
  themeName: string
  dirty: boolean
  onExport: (format: ExportFormat, colorFormat: ColorFormat) => void
  onReset: () => void
  menuOpen: boolean
  onToggleMenu: () => void
  presets: Theme[]
  onSelectPreset: (preset: Theme) => void
  onImportText: (text: string, filename: string) => void
  exportFormat: ExportFormat
  onExportFormatChange: (fmt: ExportFormat) => void
  colorFormat: ColorFormat
  onColorFormatChange: (fmt: ColorFormat) => void
}

export function Nav({
  themeName,
  dirty,
  onExport,
  onReset,
  menuOpen,
  onToggleMenu,
  presets,
  onSelectPreset,
  onImportText,
  exportFormat,
  onExportFormatChange,
  colorFormat,
  onColorFormatChange,
}: Props) {
  const [presetsOpen, setPresetsOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  // On mobile/tablet we collapse most actions behind a "More" menu; on desktop they sit inline.
  const compactActions = isMobile || isTablet

  // Close dropdowns when viewport widens past tablet (the desktop layout has everything inline)
  useEffect(() => {
    if (!compactActions) {
      setMoreOpen(false)
      setPresetsOpen(false)
    }
  }, [compactActions])

  const handleSelectPreset = (preset: Theme) => {
    onSelectPreset(preset)
  }

  const presetItems = (
    <MenuPanel>
      {presets.map(p => (
        <MenuItem
          key={p.name}
          value={p.name}
          active={p.name === themeName}
          dotColor={p.colors.accent}
          title={p.name}
          onSelect={() => handleSelectPreset(p)}
        >
          {p.name}
        </MenuItem>
      ))}
    </MenuPanel>
  )

  return (
    <header className="nav">
      <div className="nav__brand">
        <span className="nav__hamburger">
          <HamburgerMenu open={menuOpen} onToggle={onToggleMenu} ariaLabel="Toggle menu" />
        </span>
        <span className="nav__logo">◆</span>
        <span className="nav__title">Themeable</span>
      </div>
      <div className="nav__actions">
        {compactActions ? (
          <div className="nav__more">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMoreOpen(o => !o)}
              aria-haspopup="menu"
              aria-expanded={moreOpen}
              aria-label="More actions"
            >
              More ▾
            </Button>
            {moreOpen && (
              <div className="nav__more-menu" role="menu">
                <div className="nav__more-section">
                  <div className="nav__more-heading">Theme</div>
                  <Menu open={presetsOpen} onOpenChange={setPresetsOpen}>
                    <MenuTrigger>Presets ▾</MenuTrigger>
                    {presetItems}
                  </Menu>
                  <ImportExport
                    onImportText={onImportText}
                    onExport={onExport}
                    exportFormat={exportFormat}
                    onExportFormatChange={onExportFormatChange}
                    colorFormat={colorFormat}
                    onColorFormatChange={onColorFormatChange}
                  />
                </div>
                <div className="nav__more-section">
                  <div className="nav__more-heading">Active theme</div>
                  <div className="nav__more-theme-name">
                    {themeName}{dirty && <span className="nav__dirty" title="Unsaved changes">●</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Menu open={presetsOpen} onOpenChange={setPresetsOpen}>
              <MenuTrigger>Presets ▾</MenuTrigger>
              {presetItems}
            </Menu>
            <ImportExport
              onImportText={onImportText}
              onExport={onExport}
              exportFormat={exportFormat}
              onExportFormatChange={onExportFormatChange}
              colorFormat={colorFormat}
              onColorFormatChange={onColorFormatChange}
            />
            <span className="nav__theme-name">
              {themeName}{dirty && <span className="nav__dirty" title="Unsaved changes">●</span>}
            </span>
            <Button variant="secondary" size="sm" onClick={onReset} disabled={!dirty}>Reset</Button>
          </>
        )}
      </div>
    </header>
  )
}