import { Card } from '../../components/ui/Card'
import { Pill } from '../../components/ui/Pill'
import { Button } from '../../components/ui/Button'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip as RTooltip } from 'recharts'

const revenue = [
  { d: 'Mon', v: 4200 },
  { d: 'Tue', v: 5100 },
  { d: 'Wed', v: 4800 },
  { d: 'Thu', v: 6300 },
  { d: 'Fri', v: 7100 },
  { d: 'Sat', v: 5800 },
  { d: 'Sun', v: 6200 },
]

const recentActivity = [
  { who: 'Ada', what: 'shipped a new release', when: '2m ago' },
  { who: 'Grace', what: 'merged PR #142', when: '15m ago' },
  { who: 'Alan', what: 'opened a bug report', when: '1h ago' },
  { who: 'Linus', what: 'left a review', when: '3h ago' },
]

const topPages = [
  { path: '/dashboard', views: 8421 },
  { path: '/pricing', views: 6203 },
  { path: '/docs/install', views: 4118 },
  { path: '/changelog', views: 3902 },
  { path: '/blog/launch', views: 2741 },
]

export function DashboardLayout() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <div>
          <h1 style={{ margin: 0 }}>Good afternoon, Ada</h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 'var(--space-xs) 0 0' }}>
            Here's what's happening across your projects.
          </p>
        </div>
        <Button>+ New project</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
        <Card title="Revenue">
          <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600 }}>$48,210</div>
          <div style={{ color: 'var(--color-success)', fontSize: 'var(--font-size-sm)' }}>↑ 12.4% vs last week</div>
        </Card>
        <Card title="Active users">
          <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600 }}>2,847</div>
          <div style={{ color: 'var(--color-success)', fontSize: 'var(--font-size-sm)' }}>↑ 5.2% vs last week</div>
        </Card>
        <Card title="Conversion">
          <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600 }}>3.6%</div>
          <div style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)' }}>↓ 0.4% vs last week</div>
        </Card>
        <Card title="Churn">
          <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 600 }}>1.2%</div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>— unchanged</div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-md)' }}>
        <Card title="Revenue this week" action={<Pill tone="success">+12.4%</Pill>}>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenue}>
                <XAxis dataKey="d" stroke="var(--color-text-muted)" fontSize={12} />
                <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                <RTooltip
                  contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                />
                <Line type="monotone" dataKey="v" stroke="var(--color-accent)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Top pages">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {topPages.map(p => (
              <li key={p.path} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-xs) 0', borderBottom: '1px solid var(--color-border)' }}>
                <span>{p.path}</span>
                <strong>{p.views.toLocaleString()}</strong>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div style={{ marginTop: 'var(--space-md)' }}>
        <Card title="Recent activity">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {recentActivity.map((a, i) => (
              <li key={i} style={{ display: 'flex', gap: 'var(--space-sm)', padding: 'var(--space-sm) 0', borderBottom: i < recentActivity.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <div className="avatar avatar--sm">{a.who[0]}</div>
                <div style={{ flex: 1 }}>
                  <div><strong>{a.who}</strong> {a.what}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>{a.when}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  )
}