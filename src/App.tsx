import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useBreakpoint } from './hooks/useBreakpoint'
import { useIsMobile } from './hooks/useIsMobile'
import { useIsTablet } from './hooks/useIsTablet'
import { useTheme } from './state/useTheme'
import { presets } from './theme/presets'
import {
  exportJson, exportCss, exportTailwind3, exportTailwind4,
  detectAndParse, mergeTheme, missingSections,
  type ColorFormat, type ExportFormat,
} from './theme/io'
import { Nav } from './components/dashboard/Nav'
import { Sidebar } from './components/dashboard/Sidebar'
import { EditorPanel } from './components/editor/EditorPanel'
import { Drawer } from './components/ui/Drawer'
import { Toast } from './components/ui/Toast'
import { DashboardPage } from './pages/DashboardPage'
import { ActivityPage } from './pages/ActivityPage'
import { CalendarPage } from './pages/CalendarPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { TasksPage } from './pages/TasksPage'
import { FilesPage } from './pages/FilesPage'
import { ProfilePage } from './pages/ProfilePage'
import { SettingsPage } from './pages/SettingsPage'
import { HelpPage } from './pages/HelpPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SlidesPage } from './pages/SlidesPage'
import { ChatPage } from './pages/ChatPage'
import { KanbanPage } from './pages/KanbanPage'
import { HabitsPage } from './pages/HabitsPage'
import { FinancePage } from './pages/FinancePage'
import { NotesPage } from './pages/NotesPage'
import { QuizPage } from './pages/QuizPage'
import { SocialPage } from './pages/SocialPage'
import { LineChartPage } from './pages/LineChartPage'
import { AreaChartPage } from './pages/AreaChartPage'
import { PieChartPage } from './pages/PieChartPage'
import { ScatterChartPage } from './pages/ScatterChartPage'
import { RadarChartPage } from './pages/RadarChartPage'
import { ComponentsIndexPage } from './pages/components/ComponentsIndexPage'
import { LayoutPage } from './pages/components/LayoutPage'
import { FormsPage } from './pages/components/FormsPage'
import { DataDisplayPage } from './pages/components/DataDisplayPage'
import { FeedbackPage } from './pages/components/FeedbackPage'
import { OverlayPage } from './pages/components/OverlayPage'
import { NavigationCategoryPage } from './pages/components/NavigationPage'
import { TypographyPage } from './pages/components/TypographyPage'
import { MediaPage } from './pages/components/MediaPage'
import { DashboardLayout } from './pages/layouts/DashboardLayout'
import { SettingsLayout } from './pages/layouts/SettingsLayout'
import { ProfileLayout } from './pages/layouts/ProfileLayout'
import { SocialLayout } from './pages/layouts/SocialLayout'
import { WikiLayout } from './pages/layouts/WikiLayout'
import { RichTextLayout } from './pages/layouts/RichTextLayout'

export default function App() {
  const { theme, setTheme, dirty, reset, error } = useTheme({
    onCorrupt: (reason) => {
      // Stored theme was unreadable — log so devs can investigate, but don't
      // surface a toast (the UI already shows the default theme).
      console.warn(`[theme] cleared corrupt stored theme (${reason})`)
    }
  })
  const [toast, setToast] = useState<{ message: string; tone: 'error' | 'success' } | null>(null)
  const isWide = useBreakpoint('lg')
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const [editorOpen, setEditorOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState<ExportFormat>('json')
  const [colorFormat, setColorFormat] = useState<ColorFormat>('hex')

  // Surface auto-save errors (e.g. localStorage quota exceeded) as a toast.
  useEffect(() => {
    if (error) setToast({ message: `Couldn't save: ${error}`, tone: 'error' })
  }, [error])

  // Close menu when viewport widens to desktop
  useEffect(() => {
    if (isWide && menuOpen) setMenuOpen(false)
  }, [isWide, menuOpen])

  // Close editor sheet when viewport widens to desktop (the desktop layout has its own rail)
  useEffect(() => {
    if (isWide && editorOpen) setEditorOpen(false)
  }, [isWide, editorOpen])

  const handleExport = (format: ExportFormat, color: ColorFormat) => {
    let payload
    const warnings: string[] = []
    switch (format) {
      case 'json':
        payload = exportJson(theme)
        break
      case 'css':
        payload = exportCss(theme, color)
        break
      case 'tailwind4':
        payload = exportTailwind4(theme, color)
        break
      case 'tailwind3': {
        const r = exportTailwind3(theme, color)
        payload = { text: r.text, filename: r.filename, mime: r.mime }
        warnings.push(...r.warnings)
        break
      }
    }

    const blob = new Blob([payload.text], { type: payload.mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = payload.filename
    a.click()
    URL.revokeObjectURL(url)

    if (warnings.length) {
      setToast({ message: `Exported with: ${warnings.join('; ')}`, tone: 'error' })
    } else {
      setToast({ message: 'Theme exported', tone: 'success' })
    }
  }

  const handleImportText = (text: string, filename: string) => {
    const result = detectAndParse(text, filename)
    if (!result.ok) {
      setToast({ message: `Import failed: ${result.error}`, tone: 'error' })
      return
    }
    const merged = mergeTheme(theme, result.partial)
    setTheme(merged)
    const missing = missingSections(result.partial)
    const keepMsg = missing.length ? ` kept current ${missing.join(', ')}` : ''
    const warnMsg = result.warnings.length ? ` (${result.warnings[0]})` : ''
    setToast({
      message: `Imported ${result.detectedFormat}${keepMsg}${warnMsg}`,
      tone: result.warnings.length ? 'error' : 'success',
    })
  }

  const handleSelectPreset = (preset: typeof presets[number]) => {
    setTheme(preset)
    setToast({ message: `Loaded preset: ${preset.name}`, tone: 'success' })
  }

  // Editor sheet variant: full-screen overlay at mobile, bottom-sheet at tablet
  const editorSheetClass = isMobile
    ? 'editor-sheet editor-sheet--full'
    : isTablet
    ? 'editor-sheet editor-sheet--bottom'
    : 'editor-sheet'

  return (
    <div className="app-shell">
      <Nav
        themeName={theme.name}
        dirty={dirty}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen(o => !o)}
        onReset={() => {
          if (!dirty || confirm('Discard unsaved changes?')) reset()
        }}
        presets={presets}
        onSelectPreset={handleSelectPreset}
        onImportText={handleImportText}
        exportFormat={exportFormat}
        onExportFormatChange={setExportFormat}
        colorFormat={colorFormat}
        onColorFormatChange={setColorFormat}
        onExport={handleExport}
      />
      <div className={`app-body ${isWide ? '' : 'app-body--narrow'}`}>
        {isWide ? (
          <Sidebar />
        ) : (
          <Drawer
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            side="start"
            title="Menu"
          >
            <Sidebar />
          </Drawer>
        )}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/files" element={<FilesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/demos/slides" element={<SlidesPage />} />
            <Route path="/demos/chat" element={<ChatPage />} />
            <Route path="/demos/kanban" element={<KanbanPage />} />
            <Route path="/demos/habits" element={<HabitsPage />} />
            <Route path="/demos/finance" element={<FinancePage />} />
            <Route path="/demos/notes" element={<NotesPage />} />
            <Route path="/demos/quiz" element={<QuizPage />} />
            <Route path="/demos/social" element={<SocialPage />} />
            <Route path="/charts/line" element={<LineChartPage />} />
            <Route path="/charts/area" element={<AreaChartPage />} />
            <Route path="/charts/pie" element={<PieChartPage />} />
            <Route path="/charts/scatter" element={<ScatterChartPage />} />
            <Route path="/charts/radar" element={<RadarChartPage />} />
            <Route path="/components" element={<ComponentsIndexPage />} />
            <Route path="/components/layout" element={<LayoutPage />} />
            <Route path="/components/forms" element={<FormsPage />} />
            <Route path="/components/data-display" element={<DataDisplayPage />} />
            <Route path="/components/feedback" element={<FeedbackPage />} />
            <Route path="/components/overlay" element={<OverlayPage />} />
            <Route path="/components/navigation" element={<NavigationCategoryPage />} />
            <Route path="/components/typography" element={<TypographyPage />} />
            <Route path="/components/media" element={<MediaPage />} />
            {/* Old routes — keep working as redirects */}
            <Route path="/components/containers" element={<Navigate to="/components/layout" replace />} />
            <Route path="/components/surfaces" element={<Navigate to="/components/data-display" replace />} />
            <Route path="/components/inputs" element={<Navigate to="/components/forms" replace />} />
            <Route path="/components/content" element={<Navigate to="/components/typography" replace />} />
            {/* Old flat navigation route redirect */}
            <Route path="/layouts" element={<Navigate to="/layouts/dashboard" replace />} />
            <Route path="/layouts/dashboard" element={<DashboardLayout />} />
            <Route path="/layouts/settings" element={<SettingsLayout />} />
            <Route path="/layouts/profile" element={<ProfileLayout />} />
            <Route path="/layouts/social" element={<SocialLayout />} />
            <Route path="/layouts/wiki" element={<WikiLayout />} />
            <Route path="/layouts/rich-text" element={<RichTextLayout />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        {isWide ? (
          <EditorPanel
            theme={theme}
            onChange={setTheme}
            exportFormat={exportFormat}
            colorFormat={colorFormat}
          />
        ) : (
          <>
            {editorOpen && (
              <div className={editorSheetClass}>
                <EditorPanel
                  theme={theme}
                  onChange={setTheme}
                  exportFormat={exportFormat}
                  colorFormat={colorFormat}
                />
              </div>
            )}
            <button className="editor-toggle" onClick={() => setEditorOpen(o => !o)}>
              {editorOpen ? 'Close editor' : 'Edit theme'}
            </button>
          </>
        )}
      </div>
      {toast && <Toast message={toast.message} tone={toast.tone} onDismiss={() => setToast(null)} />}
    </div>
  )
}
