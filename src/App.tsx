import { useTheme } from './state/useTheme'
import { Nav } from './components/dashboard/Nav'
import { Sidebar } from './components/dashboard/Sidebar'
import { kpis, lineData, barData, tableRows, activity } from './dashboard/sampleData'
import { StatCard } from './components/dashboard/StatCard'
import { LineChartCard } from './components/dashboard/LineChartCard'
import { BarChartCard } from './components/dashboard/BarChartCard'
import { DataTable } from './components/dashboard/DataTable'
import { FormCard } from './components/dashboard/FormCard'
import { ActivityFeed } from './components/dashboard/ActivityFeed'

export default function App() {
  const { theme, dirty, save, reset } = useTheme()

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `theme-${theme.name.toLowerCase().replace(/\s+/g, '-')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json,.json'
    input.onchange = () => {
      const file = input.files?.[0]
      if (!file) return
      // Wired up properly in Task 20.
      alert(`Import wired up properly later; got ${file.name}`)
    }
    input.click()
  }

  return (
    <div className="app-shell">
      <Nav
        themeName={theme.name}
        dirty={dirty}
        onSave={save}
        onExport={handleExport}
        onImport={handleImport}
        onReset={reset}
      />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          <h2 style={{ marginBottom: 'var(--space-lg)' }}>Overview</h2>
          <div className="kpi-grid">
            {kpis.map(k => <StatCard key={k.id} {...k} />)}
          </div>
          <div className="chart-grid" style={{ marginTop: 'var(--space-lg)' }}>
            <LineChartCard data={lineData} />
            <BarChartCard data={barData} />
          </div>
          <div style={{ marginTop: 'var(--space-lg)' }}>
            <DataTable rows={tableRows} />
          </div>
          <div style={{ marginTop: 'var(--space-lg)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
            <FormCard />
            <ActivityFeed entries={activity} />
          </div>
        </main>
      </div>
    </div>
  )
}
