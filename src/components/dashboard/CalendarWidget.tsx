import { Card } from '../ui/Card'

export function CalendarWidget() {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const todayDate = today.getDate()

  const firstDay = new Date(year, month, 1).getDay() // 0 = Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthName = today.toLocaleString('default', { month: 'long' })

  const cells: Array<{ day: number | null; isToday: boolean }> = []
  for (let i = 0; i < firstDay; i++) cells.push({ day: null, isToday: false })
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, isToday: d === todayDate })

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <Card title={`${monthName} ${year}`}>
      <div className="calendar">
        <div className="calendar__weekdays">
          {weekDays.map((d, i) => <div key={i} className="calendar__weekday">{d}</div>)}
        </div>
        <div className="calendar__grid">
          {cells.map((c, i) => (
            <div
              key={i}
              className={`calendar__cell ${c.isToday ? 'calendar__cell--today' : ''} ${c.day === null ? 'calendar__cell--empty' : ''}`}
            >
              {c.day ?? ''}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
