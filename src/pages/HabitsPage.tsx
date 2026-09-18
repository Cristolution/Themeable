import { useState } from 'react'
import { Card } from '../components/ui/Card'

type Habit = { id: string; name: string; streak: number; longest: number; history: boolean[] }

const seed: Habit[] = [
  { id: 'h1', name: 'Morning workout', streak: 7, longest: 14, history: [true, true, false, true, true, true, true] },
  { id: 'h2', name: 'Read 30 mins', streak: 3, longest: 21, history: [false, true, true, true, false, false, true] },
  { id: 'h3', name: 'Meditate', streak: 0, longest: 10, history: [true, true, true, false, false, false, false] },
  { id: 'h4', name: 'Drink 8 glasses water', streak: 5, longest: 12, history: [true, true, true, true, true, false, true] },
  { id: 'h5', name: 'No social media before noon', streak: 2, longest: 5, history: [false, true, true, false, false, true, true] }
]

export function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>(seed)

  const toggle = (id: string, day: number) => {
    setHabits(hs => hs.map(h => h.id === id ? { ...h, history: h.history.map((v, i) => i === day ? !v : v) } : h))
  }

  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Habit Tracker</h2>
      <Card>
        <table className="data-table">
          <thead>
            <tr>
              <th>Habit</th>
              <th>Streak</th>
              <th>Best</th>
              <th style={{ minWidth: 220 }}>Last 7 days</th>
            </tr>
          </thead>
          <tbody>
            {habits.map(h => (
              <tr key={h.id}>
                <td style={{ fontWeight: 'var(--font-weight-medium)' }}>{h.name}</td>
                <td>{h.streak} days</td>
                <td className="data-table__muted">{h.longest} days</td>
                <td>
                  <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                    {h.history.map((done, i) => (
                      <button
                        key={i}
                        className={`habit-day ${done ? 'habit-day--done' : ''}`}
                        onClick={() => toggle(h.id, i)}
                        aria-label={`Toggle day ${i + 1}`}
                      >{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  )
}
