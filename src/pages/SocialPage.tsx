import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { HeartIcon, CommentIcon, ShareIcon } from '../components/ui/Icon'

type Post = { id: string; user: string; initials: string; time: string; content: string; likes: number; comments: number }

const stories = ['AK', 'PS', 'DL', 'MC', 'SP', '+']

const seed: Post[] = [
  { id: 'p1', user: 'Alex Kim', initials: 'AK', time: '2h ago', content: 'Just shipped the new theme editor. Editing tokens live is so satisfying.', likes: 24, comments: 5 },
  { id: 'p2', user: 'Priya Shah', initials: 'PS', time: '4h ago', content: 'Hot take: every dashboard should have a built-in theme builder.', likes: 18, comments: 3 },
  { id: 'p3', user: 'Diego Lopez', initials: 'DL', time: '6h ago', content: 'Working on a side project. Will share soon.', likes: 7, comments: 1 },
  { id: 'p4', user: 'Mia Chen', initials: 'MC', time: 'Yesterday', content: 'Anyone else love semantic CSS variables? Makes themes so clean.', likes: 31, comments: 8 }
]

const suggested = [
  { name: 'Sam Patel', initials: 'SP', handle: '@sampatel' },
  { name: 'Lena Reed', initials: 'LR', handle: '@lenareed' },
  { name: 'Omar Diaz', initials: 'OD', handle: '@omardiaz' }
]

export function SocialPage() {
  const [posts, setPosts] = useState(seed)

  const like = (id: string) => {
    setPosts(ps => ps.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p))
  }

  return (
    <>
      <h2 style={{ marginBottom: 'var(--space-lg)' }}>Social</h2>
      <div className="social-grid">
        <div>
          <Card>
            <div className="stories">
              {stories.map(s => (
                <div key={s} className="stories__item">
                  <div className="stories__avatar">{s}</div>
                  <div className="stories__label">{s === '+' ? 'Your story' : s}</div>
                </div>
              ))}
            </div>
          </Card>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
            {posts.map(p => (
              <Card key={p.id}>
                <div className="social-post">
                  <div className="social-post__header">
                    <div className="social-post__avatar">{p.initials}</div>
                    <div>
                      <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{p.user}</div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{p.time}</div>
                    </div>
                  </div>
                  <p style={{ margin: 'var(--space-md) 0' }}>{p.content}</p>
                  <div className="social-post__actions">
                    <button onClick={() => like(p.id)} className="social-post__action">
                      <HeartIcon size={16} /> {p.likes}
                    </button>
                    <span className="social-post__action">
                      <CommentIcon size={16} /> {p.comments}
                    </span>
                    <span className="social-post__action">
                      <ShareIcon size={16} /> Share
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <Card title="Suggested follows">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {suggested.map(s => (
              <div key={s.handle} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                <div className="social-post__avatar">{s.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'var(--font-weight-medium)' }}>{s.name}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{s.handle}</div>
                </div>
                <Button size="sm">Follow</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
