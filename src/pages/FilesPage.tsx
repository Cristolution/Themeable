import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Pill } from '../components/ui/Pill'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { Link } from '../components/ui/Link'
import { files } from '../dashboard/sampleData'

export function FilesPage() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <div>
          <h2>Files</h2>
          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--space-xs)' }}>
            Workspace / <Link href="#">All files</Link>
          </div>
        </div>
        <Button onClick={() => setOpen(true)}>Upload</Button>
      </div>
      <div className="files-grid">
        <Card title="All files">
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>Name</th><th>Type</th><th>Size</th><th>Modified</th><th>Owner</th></tr>
              </thead>
              <tbody>
                {files.map(f => (
                  <tr key={f.id}>
                    <td>{f.name}</td>
                    <td><Pill tone="neutral">{f.type}</Pill></td>
                    <td className="data-table__muted">{f.size}</td>
                    <td className="data-table__muted">{f.modified}</td>
                    <td>{f.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="Storage">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Used</span><span style={{ color: 'var(--color-text-muted)' }}>2.1 GB / 10 GB</span>
            </div>
            <div style={{ height: 8, background: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div style={{ width: '21%', height: '100%', background: 'var(--color-accent)' }} />
            </div>
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>21% of available storage</div>
          </div>
        </Card>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Upload files">
        <div style={{
          border: '2px dashed var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-xl)',
          textAlign: 'center',
          color: 'var(--color-text-muted)'
        }}>
          <p>Drop files here or click to browse</p>
        </div>
      </Modal>
    </>
  )
}