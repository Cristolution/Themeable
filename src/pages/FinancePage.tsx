import { Card } from '../components/ui/Card'
import { Pill } from '../components/ui/Pill'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts'

type Tx = { id: string; date: string; desc: string; category: string; amount: number }

const txs: Tx[] = [
  { id: '1', date: '2026-09-01', desc: 'Salary', category: 'Income', amount: 4500 },
  { id: '2', date: '2026-09-03', desc: 'Rent', category: 'Housing', amount: -1200 },
  { id: '3', date: '2026-09-05', desc: 'Groceries', category: 'Food', amount: -250 },
  { id: '4', date: '2026-09-07', desc: 'Gas', category: 'Transport', amount: -80 },
  { id: '5', date: '2026-09-10', desc: 'Freelance', category: 'Income', amount: 800 },
  { id: '6', date: '2026-09-12', desc: 'Restaurant', category: 'Food', amount: -120 },
  { id: '7', date: '2026-09-15', desc: 'Streaming', category: 'Entertainment', amount: -15 },
  { id: '8', date: '2026-09-17', desc: 'Books', category: 'Education', amount: -45 }
]

const categoryBudget = {
  Housing: 1300, Food: 500, Transport: 200, Entertainment: 100, Education: 100, Income: 0, Other: 100
} as const

export function FinancePage() {
  const byCategory = Object.keys(categoryBudget).map(cat => {
    const spent = txs.filter(t => t.category === cat).reduce((s, t) => s + (t.amount < 0 ? -t.amount : 0), 0)
    const budget = categoryBudget[cat as keyof typeof categoryBudget]
    return { name: cat, spent, budget }
  })

  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Personal Finance</h2>
      <div className="finance-grid">
        <Card title="Transactions">
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>Date</th><th>Description</th><th>Category</th><th>Amount</th></tr>
              </thead>
              <tbody>
                {txs.map(t => (
                  <tr key={t.id}>
                    <td className="data-table__muted">{t.date}</td>
                    <td>{t.desc}</td>
                    <td><Pill tone="neutral">{t.category}</Pill></td>
                    <td style={{ color: t.amount >= 0 ? 'var(--color-success)' : 'var(--color-text)' }}>
                      {t.amount >= 0 ? '+' : ''}{t.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="Budget vs Actual">
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={byCategory} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={11} tickLine={false} axisLine={{ stroke: 'var(--color-border)' }} />
                <YAxis stroke="var(--color-text-muted)" fontSize={11} tickLine={false} axisLine={{ stroke: 'var(--color-border)' }} />
                <Tooltip contentStyle={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 8 }} />
                <Bar dataKey="budget" fill="var(--color-bg-subtle)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spent" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </>
  )
}
