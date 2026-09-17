import { useState } from 'react'
import { Card } from '../ui/Card'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

export function FormCard({ title = 'Quick Add' }: { title?: string }) {
  const [name, setName] = useState('')
  const [priority, setPriority] = useState('medium')
  const [notes, setNotes] = useState('')
  const [notify, setNotify] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Saved (mock): ${name}, ${priority}, notify=${notify}`)
  }

  return (
    <Card title={title}>
      <form onSubmit={handleSubmit} className="form">
        <Input label="Name" value={name} onChange={e => setName(e.target.value)} placeholder="Project or task name" />
        <Select
          label="Priority"
          value={priority}
          onChange={e => setPriority(e.target.value)}
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' }
          ]}
        />
        <div className="field">
          <label className="field__label" htmlFor="form-notes">Notes</label>
          <textarea
            id="form-notes"
            className="field__input"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            placeholder="Optional details"
          />
        </div>
        <label className="form__checkbox">
          <input type="checkbox" checked={notify} onChange={e => setNotify(e.target.checked)} />
          <span>Notify team on save</span>
        </label>
        <div className="form__actions">
          <Button type="submit" variant="primary">Save</Button>
        </div>
      </form>
    </Card>
  )
}