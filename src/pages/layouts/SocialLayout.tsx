import { useState } from 'react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Pill } from '../../components/ui/Pill'

interface Post {
  id: number
  author: string
  handle: string
  time: string
  text: string
  likes: number
  replies: number
  reposts: number
  liked?: boolean
}

const initialPosts: Post[] = [
  { id: 1, author: 'Grace Hopper', handle: '@grace', time: '2h', text: 'Just removed the first bug from the Mark I. The cause was literally a moth in a relay. Coining the term "debugging" today.', likes: 1283, replies: 87, reposts: 142 },
  { id: 2, author: 'Alan Turing', handle: '@alan', time: '5h', text: 'Working on a machine that thinks. Not sure if that\'s philosophy or engineering. Both, I suspect.', likes: 4321, replies: 312, reposts: 891 },
  { id: 3, author: 'Margaret Hamilton', handle: '@margaret', time: '1d', text: 'We had to invent the term "software engineering" because nobody believed code should be reliable. The bar is high. Keep it high.', likes: 9821, replies: 412, reposts: 1203 },
]

const trending = [
  { tag: '#programming', posts: '12.4K' },
  { tag: '#opensource', posts: '8.2K' },
  { tag: '#ai', posts: '6.7K' },
  { tag: '#firstbug', posts: '4.1K' },
  { tag: '#retrocomputing', posts: '2.9K' },
]

export function SocialLayout() {
  const [posts, setPosts] = useState(initialPosts)
  const [draft, setDraft] = useState('')

  const toggleLike = (id: number) => {
    setPosts(ps => ps.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p))
  }

  const submit = () => {
    if (!draft.trim()) return
    setPosts(ps => [{ id: Date.now(), author: 'You', handle: '@you', time: 'now', text: draft, likes: 0, replies: 0, reposts: 0 }, ...ps])
    setDraft('')
  }

  return (
    <>
      <h1 style={{ margin: '0 0 var(--space-lg)' }}>Home</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 'var(--space-lg)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <Card>
            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
              <div className="avatar">Y</div>
              <div style={{ flex: 1 }}>
                <textarea
                  className="field__input"
                  rows={3}
                  placeholder="What's happening?"
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-sm)' }}>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>{draft.length} / 280</span>
                  <Button size="sm" onClick={submit} disabled={!draft.trim()}>Post</Button>
                </div>
              </div>
            </div>
          </Card>

          {posts.map(p => (
            <Card key={p.id}>
              <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                <div className="avatar">{p.author[0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 'var(--space-xs)', alignItems: 'baseline' }}>
                    <strong>{p.author}</strong>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>{p.handle} · {p.time}</span>
                  </div>
                  <p style={{ margin: 'var(--space-xs) 0' }}>{p.text}</p>
                  <div style={{ display: 'flex', gap: 'var(--space-md)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                    <button onClick={() => toggleLike(p.id)} className={`post-action${p.liked ? ' post-action--liked' : ''}`}>
                      {p.liked ? '♥' : '♡'} {p.likes.toLocaleString()}
                    </button>
                    <button className="post-action">💬 {p.replies}</button>
                    <button className="post-action">↻ {p.reposts}</button>
                    <button className="post-action">↗</button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <Card title="Trending">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {trending.map(t => (
                <li key={t.tag} style={{ padding: 'var(--space-xs) 0', borderBottom: '1px solid var(--color-border)' }}>
                  <div style={{ fontWeight: 500 }}>{t.tag}</div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>{t.posts} posts</div>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Who to follow">
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Linus Torvalds', 'Donald Knuth', 'Barbara Liskov'].map(name => (
                <li key={name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--color-border)' }}>
                  <div className="avatar avatar--sm">{name[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500 }}>{name}</div>
                  </div>
                  <Button size="sm">Follow</Button>
                </li>
              ))}
            </ul>
          </Card>
          <Card title="Pro tip">
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
              Use <Pill tone="info">⌘ K</Pill> to jump anywhere in the app.
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}