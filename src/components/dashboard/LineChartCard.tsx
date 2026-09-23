import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Card } from '../ui/Card'

type Point = { name: string; value: number }

function readVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

export function LineChartCard({ data, title = 'Weekly Traffic' }: { data: Point[]; title?: string }) {
  // Read CSS variables directly on each render. The parent re-renders whenever
  // the theme changes, so a `useState` + `useEffect` cache is unnecessary —
  // and the previous no-deps effect was an infinite-loop hazard.
  const accent = readVar('--color-accent', '#3b82f6')
  const muted = readVar('--color-text-muted', '#666')
  const border = readVar('--color-border', '#ddd')
  const bgElevated = readVar('--color-bg-elevated', '#fff')

  return (
    <Card title={title}>
      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke={border} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke={muted} fontSize={12} tickLine={false} axisLine={{ stroke: border }} />
            <YAxis stroke={muted} fontSize={12} tickLine={false} axisLine={{ stroke: border }} />
            <Tooltip contentStyle={{ background: bgElevated, border: `1px solid ${border}`, borderRadius: 8 }} />
            <Line type="monotone" dataKey="value" stroke={accent} strokeWidth={2} dot={{ fill: accent, r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}