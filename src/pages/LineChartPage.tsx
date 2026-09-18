import { Card } from '../components/ui/Card'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const data = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  product: 30 + Math.round(Math.sin(i / 2) * 20) + i,
  service: 20 + Math.round(Math.cos(i / 3) * 15) + i / 2,
  support: 10 + i / 2
}))

export function LineChartPage() {
  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Line Charts</h2>
      <Card title="Revenue by stream (monthly)">
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="var(--color-text-muted)"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'var(--color-border)' }}
              />
              <YAxis
                stroke="var(--color-text-muted)"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'var(--color-border)' }}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--color-bg-elevated)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 8
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="product" stroke="var(--color-accent)" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="service" stroke="var(--color-success)" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="support" stroke="var(--color-warning)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  )
}
