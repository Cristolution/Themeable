import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useBreakpoint } from './hooks/useBreakpoint'
import { useIsMobile } from './hooks/useIsMobile'
import { useIsTablet } from './hooks/useIsTablet'
import { useTheme } from './state/useTheme'
import { validateTheme } from './theme/validate'
import { presets } from './theme/presets'
import { Nav } from './components/dashboard/Nav'
import { Sidebar } from './components/dashboard/Sidebar'
import { EditorPanel } from './components/editor/EditorPanel'
import { JsonEditor } from './components/editor/JsonEditor'
import { PresetGallery } from './components/editor/PresetGallery'
import { ImportExport } from './components/editor/ImportExport'
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
import { GalleryPage } from './pages/GalleryPage'
import { HabitsPage } from './pages/HabitsPage'
import { FinancePage } from './pages/FinancePage'
import { NotesPage } from './pages/NotesPage'
import { QuizPage } from './pages/QuizPage'
import { SocialPage } from './pages/SocialPage'

export default function App() {
  const { theme, setTheme, dirty, save, reset } = useTheme()
  const [toast, setToast] = useState<{ message: string; tone: 'error' | 'success' } | null>(null)
  const isWide = useBreakpoint('lg')
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const [editorOpen, setEditorOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!dirty) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [dirty])

  // Close menu when viewport widens to desktop
  useEffect(() => {
    if (isWide && menuOpen) setMenuOpen(false)
  }, [isWide, menuOpen])

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `theme-${theme.name.toLowerCase().replace(/\s+/g, '-')}.json`
    a.click()
    URL.revokeObjectURL(url)
    setToast({ message: 'Theme exported', tone: 'success' })
  }

  const handleImportText = (text: string) => {
    try {
      const parsed: unknown = JSON.parse(text)
      const result = validateTheme(parsed)
      if (result.ok) {
        if (dirty && !confirm('You have unsaved changes. Replace with imported theme?')) return
        setTheme(result.theme)
        setToast({ message: 'Theme imported', tone: 'success' })
      } else {
        setToast({ message: `Invalid theme: ${result.errors[0]}`, tone: 'error' })
      }
    } catch (e) {
      setToast({ message: `Invalid JSON: ${e instanceof Error ? e.message : 'parse error'}`, tone: 'error' })
    }
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
    : 'editor-sheet editor-sheet--full'

  return (
    <div className="app-shell">
      <Nav
        themeName={theme.name}
        dirty={dirty}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen(o => !o)}
        onSave={() => {
          const result = save()
          if (result.ok) setToast({ message: 'Theme saved', tone: 'success' })
          else setToast({ message: `Could not save: ${result.error}`, tone: 'error' })
        }}
        onExport={handleExport}
        onImport={() => {/* legacy — ImportExport handles it now; keep prop noop */}}
        onReset={() => {
          if (!dirty || confirm('Discard unsaved changes?')) reset()
        }}
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
            <Route path="/demos/gallery" element={<GalleryPage />} />
            <Route path="/demos/habits" element={<HabitsPage />} />
            <Route path="/demos/finance" element={<FinancePage />} />
            <Route path="/demos/notes" element={<NotesPage />} />
            <Route path="/demos/quiz" element={<QuizPage />} />
            <Route path="/demos/social" element={<SocialPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        {isWide ? (
          <EditorPanel
            theme={theme}
            onChange={setTheme}
            jsonSlot={<JsonEditor theme={theme} onChange={setTheme} />}
          />
        ) : (
          <>
            {editorOpen && (
              <div className={editorSheetClass}>
                <EditorPanel
                  theme={theme}
                  onChange={setTheme}
                  jsonSlot={<JsonEditor theme={theme} onChange={setTheme} />}
                />
              </div>
            )}
            <button className="editor-toggle" onClick={() => setEditorOpen(o => !o)}>
              {editorOpen ? 'Close editor' : 'Edit theme'}
            </button>
          </>
        )}
      </div>
      <div className="app-bottombar">
        <PresetGallery
          presets={presets}
          currentName={theme.name}
          dirty={dirty}
          onSelect={handleSelectPreset}
        />
        <ImportExport onImportText={handleImportText} onExport={handleExport} />
      </div>
      {toast && <Toast message={toast.message} tone={toast.tone} onDismiss={() => setToast(null)} />}
    </div>
  )
}
