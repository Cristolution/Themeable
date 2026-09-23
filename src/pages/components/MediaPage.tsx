import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export function MediaPage() {
  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>Media</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
        Charts, calendars, carousels, and rich media primitives.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

        <Card title="Chart" action={<span className="pill pill--neutral">recharts</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Five chart types — line, area, pie, scatter, radar. See the Charts section.
          </p>
          <Button onClick={() => location.assign('/charts/line')}>Browse charts →</Button>
        </Card>

        <Card title="Calendar" action={<span className="pill pill--neutral">month view</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A month-grid calendar with event indicators.
          </p>
          <div className="mini-calendar">
            <div className="mini-calendar__header">September 2026</div>
            <div className="mini-calendar__weekdays">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => <span key={d}>{d}</span>)}
            </div>
            <div className="mini-calendar__grid">
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 4 + 1
                const isCurrent = day === 23
                const hasEvent = [3, 12, 17, 23, 28].includes(day)
                return (
                  <span
                    key={i}
                    className={`mini-calendar__day${isCurrent ? ' mini-calendar__day--today' : ''}`}
                  >
                    {day > 0 && day <= 30 ? day : ''}
                    {hasEvent && <span className="mini-calendar__dot" />}
                  </span>
                )
              })}
            </div>
          </div>
        </Card>

        <Card title="Carousel" action={<span className="pill pill--neutral">slideshow</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A horizontally scrolling, paginated slideshow.
          </p>
          <div className="carousel">
            <div className="carousel__track">
              {[1, 2, 3, 4, 5].map(n => (
                <div key={n} className="carousel__slide" style={{ background: 'var(--color-bg-subtle)', display: 'grid', placeItems: 'center', height: 140, borderRadius: 'var(--radius-md)' }}>
                  Slide {n}
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Avatar Group" action={<span className="pill pill--neutral">stacked</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Multiple avatars stacked horizontally with overlap.
          </p>
          <div className="avatar-group">
            <div className="avatar avatar--sm">A</div>
            <div className="avatar avatar--sm">B</div>
            <div className="avatar avatar--sm">C</div>
            <div className="avatar avatar--sm avatar--more">+5</div>
          </div>
        </Card>
      </div>
    </>
  )
}