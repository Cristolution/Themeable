import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Card } from '../ui/Card'
import { useActiveTheme } from '../../state/ThemeProvider'

type Point = { name: string; value: number }

export function BarChartCard({ data, title = 'Traffic Sources' }: { data: Point[]; title?: string }) {
  // Take colors from the theme itself rather than reading CSS variables
  // during render — those are only written after render, so they lag a frame.
  const { colors } = useActiveTheme()
  const accent = colors.accent
  const muted = colors.textMuted
  const border = colors.border
  const bgElevated = colors.bgElevated

  return (
    <Card title={title}>
      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke={border} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke={muted} fontSize={12} tickLine={false} axisLine={{ stroke: border }} />
            <YAxis stroke={muted} fontSize={12} tickLine={false} axisLine={{ stroke: border }} />
            <Tooltip contentStyle={{ background: bgElevated, border: `1px solid ${border}`, borderRadius: 8 }} cursor={{ fill: 'transparent' }} />
            <Bar dataKey="value" fill={accent} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}