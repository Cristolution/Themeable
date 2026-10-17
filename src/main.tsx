import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ThemeProvider } from './state/ThemeProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ThemeProvider
        onCorrupt={reason => {
          // Stored theme was unreadable — the UI falls back to the default theme.
          console.warn(`[theme] cleared corrupt stored theme (${reason})`)
        }}
      >
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
