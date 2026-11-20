import { useCallback, useEffect, useRef, useState } from 'react'
import Loader from './components/Loader'
import ArrowCanvas from './components/ArrowCanvas'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Tools from './components/Tools'
import WireframeLive from './components/WireframeLive'
import About from './components/About'
import Journey from './components/Journey'
import Contact from './components/Contact'
import AskDemo from './components/AskDemo'
import Chess from './components/Chess'
import LiveStats from './components/LiveStats'
import Footer from './components/Footer'
import { reducedMotion } from './hooks'

export default function App() {
  const [go, setGo] = useState(false)
  const [toast, setToast] = useState('')
  const toastTimer = useRef()
  const rm = reducedMotion()

  const start = useCallback(() => setGo(true), [])
  useEffect(() => { if (rm) setGo(true) }, [rm])
  // The hero's entrance animations key off a "go" class on <html>.
  useEffect(() => { document.documentElement.classList.toggle('go', go) }, [go])

  // Magnetic buttons (desktop only)
  useEffect(() => {
    if (rm || !window.matchMedia('(pointer:fine)').matches) return
    const move = (e) => {
      const b = e.target.closest('.mag'); if (!b) return
      const r = b.getBoundingClientRect()
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`
    }
    const out = (e) => { const b = e.target.closest('.mag'); if (b && !b.contains(e.relatedTarget)) b.style.transform = '' }
    document.addEventListener('pointermove', move)
    document.addEventListener('pointerout', out)
    return () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerout', out) }
  }, [rm])

  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(''), 1800)
  }

  return (
    <>
      {!rm && <Loader onDone={start} />}
      <ArrowCanvas />
      <Nav />
      <main id="top">
        <Hero go={go} />
        <Work />
        <Tools />
        <AskDemo />
        <Chess />
        <WireframeLive />
        <About />
        <Journey />
        <LiveStats />
        <Contact onCopy={showToast} />
      </main>
      <Footer />
      <div className={`toast${toast ? ' show' : ''}`} role="status">{toast || 'Copied'}</div>
    </>
  )
}
