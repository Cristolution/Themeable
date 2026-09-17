import { useTheme } from '../state/useTheme'
import { StatCard } from '../components/dashboard/StatCard'
import { LineChartCard } from '../components/dashboard/LineChartCard'
import { BarChartCard } from '../components/dashboard/BarChartCard'
import { DataTable } from '../components/dashboard/DataTable'
import { FormCard } from '../components/dashboard/FormCard'
import { ActivityFeed } from '../components/dashboard/ActivityFeed'
import { CalendarWidget } from '../components/dashboard/CalendarWidget'
import { FeatureCards } from '../components/dashboard/FeatureCards'
import { kpis, lineData, barData, tableRows, activity, featureCards } from '../dashboard/sampleData'

export function DashboardPage() {
  const { theme } = useTheme()
  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>{theme.name} Dashboard</h2>
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
      <div style={{ marginTop: 'var(--space-lg)', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-md)' }}>
        <CalendarWidget />
        <FeatureCards features={featureCards} />
      </div>
    </>
  )
}
