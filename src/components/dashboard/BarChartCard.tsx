import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Card } from '../ui/Card'

type Point = { name: string; value: number }

function readVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

export function BarChartCard({ data, title = 'Traffic Sources' }: { data: Point[]; title?: string }) {
  const [accent, setAccent] = useState(() => readVar('--color-accent', '#3b82f6'))
  const [muted, setMuted] = useState(() => readVar('--color-text-muted', '#666'))
  const [border, setBorder] = useState(() => readVar('--color-border', '#ddd'))
  const [bgElevated, setBgElevated] = useState(() => readVar('--color-bg-elevated', '#fff'))

  useEffect(() => {
    setAccent(readVar('--color-accent', accent))
    setMuted(readVar('--color-text-muted', muted))
    setBorder(readVar('--color-border', border))
    setBgElevated(readVar('--color-bg-elevated', bgElevated))
  })

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
