import { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Toast } from '../../components/ui/Toast'

export function FeedbackPage() {
  const [toast, setToast] = useState<{ message: string; tone: 'error' | 'success' } | null>(null)
  const [progress, setProgress] = useState(64)

  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-sm)' }}>Feedback</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-xl)' }}>
        Alerts, toasts, spinners, and progress indicators — the components that communicate state.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

        <Card title="Alert" action={<span className="pill pill--neutral">banner</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            An inline callout for important information. Four tones.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <div className="alert alert--info">
              <strong>Heads up.</strong> Your free trial ends in 3 days.
            </div>
            <div className="alert alert--success">
              <strong>Saved.</strong> Your changes are live.
            </div>
            <div className="alert alert--warning">
              <strong>Watch out.</strong> You have unsaved changes.
            </div>
            <div className="alert alert--error">
              <strong>Failed.</strong> Couldn't reach the server.
            </div>
          </div>
        </Card>

        <Card title="Alert Dialog" action={<span className="pill pill--neutral">confirmation</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A modal that requires the user to acknowledge before continuing.
          </p>
          <Button variant="secondary" onClick={() => alert('Are you sure? (alert-dialog demo)')}>Delete account…</Button>
        </Card>

        <Card title="Toast" action={<span className="pill pill--neutral">transient</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A short, non-blocking notification that fades in and out.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <Button onClick={() => setToast({ message: 'Saved successfully', tone: 'success' })}>Show success</Button>
            <Button variant="secondary" onClick={() => setToast({ message: 'Something went wrong', tone: 'error' })}>Show error</Button>
          </div>
          {toast && <Toast message={toast.message} tone={toast.tone} onDismiss={() => setToast(null)} />}
        </Card>

        <Card title="Spinner" action={<span className="pill pill--neutral">loading</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            An indeterminate loading spinner.
          </p>
          <span className="spinner" role="status" aria-label="Loading" />
        </Card>

        <Card title="Progress" action={<span className="pill pill--neutral">determinate</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A horizontal bar showing completion of a task.
          </p>
          <div className="progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress__bar" style={{ width: `${progress}%` }} />
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)' }}>
            <Button size="sm" variant="ghost" onClick={() => setProgress(p => Math.max(0, p - 10))}>−10</Button>
            <Button size="sm" variant="ghost" onClick={() => setProgress(p => Math.min(100, p + 10))}>+10</Button>
            <span style={{ alignSelf: 'center', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>{progress}%</span>
          </div>
        </Card>
      </div>
    </>
  )
}