import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Pill } from '../components/ui/Pill'

type Message = { id: string; who: 'me' | 'them'; text: string; time: string }

const initial: Message[] = [
  { id: '1', who: 'them', text: 'Hey! How\'s the dashboard coming along?', time: '10:24 AM' },
  { id: '2', who: 'me', text: 'Great — just added a chat interface.', time: '10:25 AM' },
  { id: '3', who: 'them', text: 'Awesome. Can I see?', time: '10:26 AM' }
]

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initial)
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)

  const send = () => {
    if (!draft.trim()) return
    setMessages(m => [...m, { id: String(m.length + 1), who: 'me', text: draft, time: 'now' }])
    setDraft('')
    setTyping(true)
    setTimeout(() => setTyping(false), 1500)
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
        <h2>Chat</h2>
        <Pill tone="success">Online</Pill>
      </div>
      <Card>
        <div className="chat-list">
          {messages.map(m => (
            <div key={m.id} className={`chat-msg chat-msg--${m.who}`}>
              <div className="chat-msg__bubble">{m.text}</div>
              <div className="chat-msg__time">{m.time}</div>
            </div>
          ))}
          {typing && <div className="chat-msg chat-msg--them"><div className="chat-msg__bubble chat-msg__bubble--typing">typing…</div></div>}
        </div>
        <div className="chat-composer">
          <input
            className="field__input chat-composer__input"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') send() }}
            placeholder="Type a message…"
          />
          <Button onClick={send}>Send</Button>
        </div>
      </Card>
    </>
  )
}
