import { Link } from '../components/ui/Link'

export function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: 'var(--space-2xl)' }}>
      <h2>404 — Page not found</h2>
      <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-md)' }}>
        The page you're looking for doesn't exist.
      </p>
      <p style={{ marginTop: 'var(--space-lg)' }}>
        <Link href="/dashboard">Back to dashboard</Link>
      </p>
    </div>
  )
}
