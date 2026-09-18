import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Pill } from '../components/ui/Pill'

type Question = { q: string; choices: string[]; correct: number; explanation: string }

const quiz: Question[] = [
  { q: 'What does CSS stand for?', choices: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Styling System', 'Colorful Style Syntax'], correct: 1, explanation: 'CSS = Cascading Style Sheets.' },
  { q: 'Which is NOT a valid CSS length unit?', choices: ['px', 'em', 'rem', 'frobnitz'], correct: 3, explanation: 'frobnitz is not a CSS unit.' },
  { q: 'What does "rem" stand for?', choices: ['Relative em', 'Root em', 'Render em', 'Reference em'], correct: 1, explanation: 'rem = root em (relative to root font-size).' },
  { q: 'Which CSS property controls the stacking order?', choices: ['order', 'z-index', 'stack', 'layer'], correct: 1, explanation: 'z-index controls stacking.' },
  { q: 'What does the "vh" unit in CSS stand for?', choices: ['Vertical height', 'Viewport height', 'View height', 'Visible height'], correct: 1, explanation: 'vh = 1% of viewport height.' }
]

const flashcards = [
  { front: 'CSS', back: 'Cascading Style Sheets' },
  { front: 'rem', back: 'Root em (relative to root font-size)' },
  { front: 'vh', back: 'Viewport height' },
  { front: 'z-index', back: 'CSS property controlling stacking order' },
  { front: 'media query', back: 'CSS feature for responsive design' }
]

export function QuizPage() {
  const [mode, setMode] = useState<'quiz' | 'flashcards'>('quiz')
  return (
    <>
      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
        <Button variant={mode === 'quiz' ? 'primary' : 'ghost'} onClick={() => setMode('quiz')}>Quiz</Button>
        <Button variant={mode === 'flashcards' ? 'primary' : 'ghost'} onClick={() => setMode('flashcards')}>Flashcards</Button>
      </div>
      {mode === 'quiz' ? <QuizMode /> : <FlashcardMode />}
    </>
  )
}

function QuizMode() {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const q = quiz[index]
  const isLast = index === quiz.length - 1

  const choose = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    if (i === q.correct) setScore(s => s + 1)
  }

  const next = () => {
    setIndex((index + 1) % quiz.length)
    setPicked(null)
  }

  const restart = () => { setIndex(0); setPicked(null); setScore(0) }

  return (
    <Card title={`Question ${index + 1} of ${quiz.length}`} action={<Pill tone="info">Score: {score}</Pill>}>
      <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-lg)' }}>{q.q}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        {q.choices.map((c, i) => (
          <button
            key={i}
            onClick={() => choose(i)}
            className={`quiz-choice ${picked === i ? (i === q.correct ? 'quiz-choice--correct' : 'quiz-choice--wrong') : ''} ${picked !== null && i === q.correct ? 'quiz-choice--correct' : ''}`}
            disabled={picked !== null}
          >
            {c}
          </button>
        ))}
      </div>
      {picked !== null && (
        <div style={{ marginTop: 'var(--space-md)' }}>
          <p style={{ color: picked === q.correct ? 'var(--color-success)' : 'var(--color-danger)' }}>
            {picked === q.correct ? 'Correct!' : 'Incorrect.'} {q.explanation}
          </p>
          <div style={{ marginTop: 'var(--space-md)', display: 'flex', gap: 'var(--space-sm)' }}>
            {isLast ? <Button onClick={restart}>Restart</Button> : <Button onClick={next}>Next</Button>}
          </div>
        </div>
      )}
    </Card>
  )
}

function FlashcardMode() {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const card = flashcards[index]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-md)' }}>
      <button
        className={`flashcard ${flipped ? 'flashcard--flipped' : ''}`}
        onClick={() => setFlipped(f => !f)}
      >
        <div className="flashcard__inner">
          <div className="flashcard__face">{card.front}</div>
          <div className="flashcard__face flashcard__face--back">{card.back}</div>
        </div>
      </button>
      <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
        <Button onClick={() => { setIndex((index - 1 + flashcards.length) % flashcards.length); setFlipped(false) }}>Previous</Button>
        <span style={{ alignSelf: 'center', color: 'var(--color-text-muted)' }}>{index + 1} / {flashcards.length}</span>
        <Button onClick={() => { setIndex((index + 1) % flashcards.length); setFlipped(false) }}>Next</Button>
      </div>
    </div>
  )
}
