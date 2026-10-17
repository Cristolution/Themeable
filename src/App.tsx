import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useBreakpoint } from './hooks/useBreakpoint'
import { useIsMobile } from './hooks/useIsMobile'
import { useIsTablet } from './hooks/useIsTablet'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useThemeContext } from './state/ThemeProvider'
import { presets, midnight } from './theme/presets'
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
import { AiThemeModal } from './components/ai/AiThemeModal'
import { LandingPage } from './pages/LandingPage'

// App pages load on demand so the landing page stays light.
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })))
const ActivityPage = lazy(() => import('./pages/ActivityPage').then(m => ({ default: m.ActivityPage })))
const CalendarPage = lazy(() => import('./pages/CalendarPage').then(m => ({ default: m.CalendarPage })))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })))
const TasksPage = lazy(() => import('./pages/TasksPage').then(m => ({ default: m.TasksPage })))
const FilesPage = lazy(() => import('./pages/FilesPage').then(m => ({ default: m.FilesPage })))
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })))
const SettingsPage = lazy(() => import('./pages/SettingsPage').then(m => ({ default: m.SettingsPage })))
const HelpPage = lazy(() => import('./pages/HelpPage').then(m => ({ default: m.HelpPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))
const SlidesPage = lazy(() => import('./pages/SlidesPage').then(m => ({ default: m.SlidesPage })))
const ChatPage = lazy(() => import('./pages/ChatPage').then(m => ({ default: m.ChatPage })))
const KanbanPage = lazy(() => import('./pages/KanbanPage').then(m => ({ default: m.KanbanPage })))
const HabitsPage = lazy(() => import('./pages/HabitsPage').then(m => ({ default: m.HabitsPage })))
const FinancePage = lazy(() => import('./pages/FinancePage').then(m => ({ default: m.FinancePage })))
const NotesPage = lazy(() => import('./pages/NotesPage').then(m => ({ default: m.NotesPage })))
const QuizPage = lazy(() => import('./pages/QuizPage').then(m => ({ default: m.QuizPage })))
const SocialPage = lazy(() => import('./pages/SocialPage').then(m => ({ default: m.SocialPage })))
const LineChartPage = lazy(() => import('./pages/LineChartPage').then(m => ({ default: m.LineChartPage })))
const AreaChartPage = lazy(() => import('./pages/AreaChartPage').then(m => ({ default: m.AreaChartPage })))
const PieChartPage = lazy(() => import('./pages/PieChartPage').then(m => ({ default: m.PieChartPage })))
const ScatterChartPage = lazy(() => import('./pages/ScatterChartPage').then(m => ({ default: m.ScatterChartPage })))
const RadarChartPage = lazy(() => import('./pages/RadarChartPage').then(m => ({ default: m.RadarChartPage })))
const ComponentsIndexPage = lazy(() => import('./pages/components/ComponentsIndexPage').then(m => ({ default: m.ComponentsIndexPage })))
const LayoutPage = lazy(() => import('./pages/components/LayoutPage').then(m => ({ default: m.LayoutPage })))
const FormsPage = lazy(() => import('./pages/components/FormsPage').then(m => ({ default: m.FormsPage })))
const DataDisplayPage = lazy(() => import('./pages/components/DataDisplayPage').then(m => ({ default: m.DataDisplayPage })))
const FeedbackPage = lazy(() => import('./pages/components/FeedbackPage').then(m => ({ default: m.FeedbackPage })))
const OverlayPage = lazy(() => import('./pages/components/OverlayPage').then(m => ({ default: m.OverlayPage })))
const NavigationCategoryPage = lazy(() => import('./pages/components/NavigationPage').then(m => ({ default: m.NavigationCategoryPage })))
const TypographyPage = lazy(() => import('./pages/components/TypographyPage').then(m => ({ default: m.TypographyPage })))
const MediaPage = lazy(() => import('./pages/components/MediaPage').then(m => ({ default: m.MediaPage })))
const DashboardLayout = lazy(() => import('./pages/layouts/DashboardLayout').then(m => ({ default: m.DashboardLayout })))
const SettingsLayout = lazy(() => import('./pages/layouts/SettingsLayout').then(m => ({ default: m.SettingsLayout })))
const ProfileLayout = lazy(() => import('./pages/layouts/ProfileLayout').then(m => ({ default: m.ProfileLayout })))
const SocialLayout = lazy(() => import('./pages/layouts/SocialLayout').then(m => ({ default: m.SocialLayout })))
const WikiLayout = lazy(() => import('./pages/layouts/WikiLayout').then(m => ({ default: m.WikiLayout })))
const RichTextLayout = lazy(() => import('./pages/layouts/RichTextLayout').then(m => ({ default: m.RichTextLayout })))

export default function App() {
  const { theme, setTheme, error } = useThemeContext()
  const [toast, setToast] = useState<{ message: string; tone: 'error' | 'success' } | null>(null)
  const isWide = useBreakpoint('lg')
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const [editorOpen, setEditorOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState<ExportFormat>('json')
  const [colorFormat, setColorFormat] = useState<ColorFormat>('hex')
  const [aiOpen, setAiOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // The preset the current theme started from — Reset reverts to it. With
  // auto-save there are no "unsaved changes", so this is what Reset means.
  const [basePresetName, setBasePresetName] = useLocalStorage('td:base-preset', theme.name)
  const basePreset =
    presets.find(p => p.name === basePresetName) ??
    presets.find(p => p.name === theme.name) ??
    midnight
  const modified = JSON.stringify(basePreset) !== JSON.stringify(theme)

  // `?ai=1` (linked from the landing page) opens the AI dialog on arrival.
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('ai') !== '1') return
    setAiOpen(true)
    params.delete('ai')
    const search = params.toString()
    navigate({ pathname: location.pathname, search: search ? `?${search}` : '' }, { replace: true })
  }, [location.pathname, location.search, navigate])

  const isLanding = location.pathname === '/'
  useEffect(() => {
    document.title = isLanding
      ? 'Themeable — one JSON file restyles an entire UI'
      : `${theme.name} · Themeable`
  }, [isLanding, theme.name])

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

  const handleSelectPreset = (preset: typeof presets[number], quiet = false) => {
    setTheme(preset)
    setBasePresetName(preset.name)
    if (!quiet) setToast({ message: `Loaded preset: ${preset.name}`, tone: 'success' })
  }

  const handleReset = () => {
    if (confirm(`Revert all changes and go back to the "${basePreset.name}" preset?`)) {
      setTheme(basePreset)
    }
  }

  if (isLanding) {
    return (
      <LandingPage
        theme={theme}
        presets={presets}
        onSelectPreset={p => handleSelectPreset(p, true)}
      />
    )
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
        dirty={modified}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen(o => !o)}
        onReset={handleReset}
        onOpenAi={() => setAiOpen(true)}
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
          <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
          <Routes>
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
          </Suspense>
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
      <AiThemeModal open={aiOpen} onClose={() => setAiOpen(false)} onImportText={handleImportText} />
      {toast && <Toast message={toast.message} tone={toast.tone} onDismiss={() => setToast(null)} />}
    </div>
  )
}
