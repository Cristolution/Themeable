import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Toast } from '../components/ui/Toast'
import { MegaphoneIcon, InfoIcon, CheckIcon, WarningIcon, DangerIcon } from '../components/ui/Icon'

type ToastTone = 'success' | 'error'

export function SurfacesPage() {
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; tone: ToastTone } | null>(null)

  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Surfaces</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>

        {/* Banner — full-bleed */}
        <Card title="Banner" action={<span className="pill pill--neutral">full-bleed</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A full-width strip pinned at the top of a page or region, often dismissible.
          </p>
          {!bannerDismissed ? (
            <div className="banner banner--accent">
              <span><MegaphoneIcon size={16} style={{ verticalAlign: 'middle', marginInlineEnd: 'var(--space-xs)' }} /> New: theme tokens now ship with 6 shadows and 5 breakpoints.</span>
              <button
                onClick={() => setBannerDismissed(true)}
                className="banner__dismiss"
                aria-label="Dismiss banner"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text)', fontSize: 'var(--font-size-lg)' }}
              >
                ×
              </button>
            </div>
          ) : (
            <Button variant="secondary" size="sm" onClick={() => setBannerDismissed(false)}>Show banner again</Button>
          )}
        </Card>

        {/* Inline alerts (success / info / warning / danger) */}
        <Card title="Inline Alert" action={<span className="pill pill--neutral">in-flow</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A short message that sits inside the page content, often with a status icon and dismiss button.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <div className="alert alert--info" role="status">
              <span className="alert__icon" aria-hidden="true"><InfoIcon size={20} /></span>
              <div className="alert__body">
                <div className="alert__title">Heads up</div>
                <div className="alert__msg">A new version of the dashboard is available. Refresh to update.</div>
              </div>
            </div>
            <div className="alert alert--success" role="status">
              <span className="alert__icon" aria-hidden="true"><CheckIcon size={20} /></span>
              <div className="alert__body">
                <div className="alert__title">Theme saved</div>
                <div className="alert__msg">Your changes are live and persisted to localStorage.</div>
              </div>
            </div>
            <div className="alert alert--warning" role="status">
              <span className="alert__icon" aria-hidden="true"><WarningIcon size={20} /></span>
              <div className="alert__body">
                <div className="alert__title">Card expires soon</div>
                <div className="alert__msg">Your card on file expires in 3 days. Update billing to avoid interruption.</div>
              </div>
            </div>
            <div className="alert alert--danger" role="status">
              <span className="alert__icon" aria-hidden="true"><DangerIcon size={20} /></span>
              <div className="alert__body">
                <div className="alert__title">Unsaved changes</div>
                <div className="alert__msg">Closing this tab will discard your edits. Save before you go.</div>
              </div>
              <button className="alert__dismiss" aria-label="Dismiss">×</button>
            </div>
          </div>
        </Card>

        {/* Callout */}
        <Card title="Callout" action={<span className="pill pill--neutral">side-bar</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A larger, in-flow panel that interrupts reading — with a left accent stripe.
          </p>
          <div className="callout">
            <h3 className="callout__title">Note</h3>
            <p className="callout__body">
              Three in-page notices named by where they sit, and none of them is a toast.
              The alert sits inside the flow. The callout uses a colored side stripe.
              The banner spans the page.
            </p>
          </div>
        </Card>

        {/* Toast */}
        <Card title="Toast (Snackbar)" action={<span className="pill pill--neutral">floating</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            A brief, non-blocking message that appears after an action — corners of the screen, auto-dismisses.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <Button onClick={() => setToast({ message: 'Theme saved', tone: 'success' })}>Show success toast</Button>
            <Button variant="secondary" onClick={() => setToast({ message: 'Could not save theme', tone: 'error' })}>
              Show error toast
            </Button>
          </div>
          {toast && <Toast message={toast.message} tone={toast.tone} onDismiss={() => setToast(null)} />}
        </Card>

        {/* Modal */}
        <Card title="Modal Dialog" action={<span className="pill pill--neutral">blocks UI</span>}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-md)' }}>
            Blocks everything behind it. Press <kbd className="search__kbd">Esc</kbd> to dismiss.
          </p>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>Open modal</Button>
          <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Delete file?">
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-lg)' }}>
              This action cannot be undone. The file will be moved to trash.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-sm)' }}>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => { setModalOpen(false); setToast({ message: 'File deleted', tone: 'success' }) }}>
                Delete
              </Button>
            </div>
          </Modal>
        </Card>
      </div>
    </>
  )
}
