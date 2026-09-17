import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useBreakpoint } from './hooks/useBreakpoint'
import { useTheme } from './state/useTheme'
import { validateTheme } from './theme/validate'
import { presets } from './theme/presets'
import { Nav } from './components/dashboard/Nav'
import { Sidebar } from './components/dashboard/Sidebar'
import { EditorPanel } from './components/editor/EditorPanel'
import { JsonEditor } from './components/editor/JsonEditor'
import { PresetGallery } from './components/editor/PresetGallery'
import { ImportExport } from './components/editor/ImportExport'
import { Toast } from './components/ui/Toast'
import { DashboardPage } from './pages/DashboardPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  const { theme, setTheme, dirty, save, reset } = useTheme()
  const [toast, setToast] = useState<{ message: string; tone: 'error' | 'success' } | null>(null)
  const isWide = useBreakpoint('lg')
  const [editorOpen, setEditorOpen] = useState(false)

  useEffect(() => {
    if (!dirty) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [dirty])

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

  return (
    <div className="app-shell">
      <Nav
        themeName={theme.name}
        dirty={dirty}
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
        <Sidebar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
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
              <div className="editor-sheet">
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
