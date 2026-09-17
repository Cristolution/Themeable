import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Card } from '../ui/Card'

type Point = { name: string; value: number }

function readVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

export function LineChartCard({ data, title = 'Weekly Traffic' }: { data: Point[]; title?: string }) {
  const [accent, setAccent] = useState(() => readVar('--color-accent', '#3b82f6'))
  const [muted, setMuted] = useState(() => readVar('--color-text-muted', '#666'))
  const [border, setBorder] = useState(() => readVar('--color-border', '#ddd'))
  const [bgElevated, setBgElevated] = useState(() => readVar('--color-bg-elevated', '#fff'))

  useEffect(() => {
    // Re-read on theme change. Variables change via CSS, so listen to a custom event the engine could dispatch.
    // Simpler: re-read on every render by reading from style element.
    setAccent(readVar('--color-accent', accent))
    setMuted(readVar('--color-text-muted', muted))
    setBorder(readVar('--color-border', border))
    setBgElevated(readVar('--color-bg-elevated', bgElevated))
  })

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
