import { Card } from '../components/ui/Card'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const data = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  product: 30 + Math.round(Math.sin(i / 2) * 20) + i,
  service: 20 + Math.round(Math.cos(i / 3) * 15) + i / 2,
  support: 10 + i / 2
}))

export function AreaChartPage() {
  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Area Charts</h2>
      <Card title="Cumulative revenue streams (stacked)">
        <div style={{ width: '100%', height: 320 }}>
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
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
              <Area type="monotone" dataKey="product" stackId="1" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.6} />
              <Area type="monotone" dataKey="service" stackId="1" stroke="var(--color-success)" fill="var(--color-success)" fillOpacity={0.6} />
              <Area type="monotone" dataKey="support" stackId="1" stroke="var(--color-warning)" fill="var(--color-warning)" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  )
}
