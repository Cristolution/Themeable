import { Card } from '../components/ui/Card'
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const data = [
  { name: 'Engineering', value: 4500 },
  { name: 'Marketing', value: 2200 },
  { name: 'Operations', value: 1800 },
  { name: 'R&D', value: 1200 },
  { name: 'Other', value: 300 }
]

const COLORS = [
  'var(--color-accent)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-info)',
  'var(--color-text-muted)'
]

const total = data.reduce((s, d) => s + d.value, 0)

export function PieChartPage() {
  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Pie Charts</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
        <Card title="Pie - Budget breakdown">
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-bg-elevated)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8
                  }}
                  formatter={(value: number) => `${value} (${Math.round((value / total) * 100)}%)`}
                />
                <Legend />
                <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Donut - Budget breakdown">
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Tooltip
                  contentStyle={{
                    background: 'var(--color-bg-elevated)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8
                  }}
                  formatter={(value: number) => `${value} (${Math.round((value / total) * 100)}%)`}
                />
                <Legend />
                <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </>
  )
}
