import { Card } from '../components/ui/Card'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, Tooltip, ResponsiveContainer
} from 'recharts'

const data = [
  { skill: 'Speed', team: 85, industry: 70 },
  { skill: 'Quality', team: 92, industry: 80 },
  { skill: 'Cost', team: 78, industry: 85 },
  { skill: 'Support', team: 88, industry: 75 },
  { skill: 'Innovation', team: 95, industry: 90 },
  { skill: 'Reliability', team: 90, industry: 85 }
]

export function RadarChartPage() {
  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Radar Charts</h2>
      <Card title="Team vs Industry (skills matrix)">
        <div style={{ width: '100%', height: 360 }}>
          <ResponsiveContainer>
            <RadarChart data={data} margin={{ top: 16, right: 24, left: 24, bottom: 16 }}>
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis
                dataKey="skill"
                stroke="var(--color-text-muted)"
                tick={{ fill: 'var(--color-text)', fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                stroke="var(--color-text-muted)"
                tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--color-bg-elevated)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 8
                }}
              />
              <Legend />
              <Radar
                name="Team"
                dataKey="team"
                stroke="var(--color-accent)"
                fill="var(--color-accent)"
                fillOpacity={0.5}
              />
              <Radar
                name="Industry"
                dataKey="industry"
                stroke="var(--color-warning)"
                fill="var(--color-warning)"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  )
}
