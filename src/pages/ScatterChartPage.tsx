import { Card } from '../components/ui/Card'
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ZAxis
} from 'recharts'

const data = Array.from({ length: 30 }, (_, i) => {
  const x = 10 + i * 3 + Math.random() * 5
  const y = x * 0.6 + Math.random() * 20 + 10
  const cat = ['Email', 'Social', 'Search'][i % 3]
  return { x: Math.round(x), y: Math.round(y), category: cat }
})

const emailData = data.filter(d => d.category === 'Email')
const socialData = data.filter(d => d.category === 'Social')
const searchData = data.filter(d => d.category === 'Search')

export function ScatterChartPage() {
  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Scatter Charts</h2>
      <Card title="Sales vs Marketing spend (by channel)">
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <ScatterChart margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="x"
                name="Spend"
                stroke="var(--color-text-muted)"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'var(--color-border)' }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Sales"
                stroke="var(--color-text-muted)"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'var(--color-border)' }}
              />
              <ZAxis range={[60, 60]} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{
                  background: 'var(--color-bg-elevated)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 8
                }}
              />
              <Legend />
              <Scatter name="Email" data={emailData} fill="var(--color-accent)" />
              <Scatter name="Social" data={socialData} fill="var(--color-success)" />
              <Scatter name="Search" data={searchData} fill="var(--color-warning)" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  )
}
