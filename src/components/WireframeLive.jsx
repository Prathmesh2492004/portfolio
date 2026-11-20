import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { reducedMotion } from '../hooks'

/** The KisaanSathi chat screen. Rendered twice: once live, once as a wireframe (CSS greys it out). */
function AppScreen() {
  return (
    <div className="app">
      <div className="sb">
        <div className="brand t">KisaanSathi</div>
        <div className="it on t">Ask a question</div><div className="it t">My schemes</div>
        <div className="it t">Crop prices</div><div className="it t">Documents</div>
        <div className="lang t">EN · हिं · मरा</div>
      </div>
      <div className="main">
        <div className="top"><h4 className="t">Scheme assistant</h4><span className="pill t">Verified sources</span></div>
        <div className="msgs">
          <div className="m u t">I grow soybean on 2 acres in Latur. Which schemes can I apply for?</div>
          <div className="m b">
            <span className="okk t">3 schemes match.</span>{' '}
            <span className="t">PM-KISAN income support, PM Fasal Bima crop insurance, and the state drip-irrigation subsidy.</span>
            <div className="cites"><span className="t">PM-KISAN §2</span><span className="t">PMFBY 2024</span><span className="t">MahaDBT</span></div>
          </div>
          <div className="m u t">What documents do I need for crop insurance?</div>
        </div>
        <div className="inp"><span className="t">Ask about any scheme…</span><span className="send t">Send</span></div>
      </div>
    </div>
  )
}

const easeIO = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

export default function WireframeLive() {
  const wf = useRef(null)
  const [p, setP] = useState(100)
  const auto = useRef(true)
  const dragging = useRef(false)
  const clamp = (v) => Math.max(0, Math.min(100, v))
  const fromEv = (e) => { const r = wf.current.getBoundingClientRect(); return ((e.clientX - r.left) / r.width) * 100 }

  // When the slider first scrolls into view, sweep it across once.
  useEffect(() => {
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      if (reducedMotion()) { setP(50); return }
      const t0 = performance.now()
      const f = (t) => {
        if (!auto.current) return
        const k = (t - t0) / 2400
        if (k >= 1) { setP(50); auto.current = false; return }
        setP(k < 0.55 ? 100 - 100 * easeIO(k / 0.55) * 0.92 : 8 + 42 * easeIO((k - 0.55) / 0.45))
        raf = requestAnimationFrame(f)
      }
      raf = requestAnimationFrame(f)
    }, { threshold: 0.5 })
    io.observe(wf.current)
    const up = () => { dragging.current = false }
    window.addEventListener('pointerup', up)
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('pointerup', up) }
  }, [])

  return (
    <section className="sec">
      <div className="wrap wl">
        <Reveal>
          <div className="eyebrow">Under the hood</div>
          <h2 className="h2">From wireframe<span className="dot">.</span><br /><span className="r">To live.</span></h2>
          <p style={{ marginTop: 18 }}>Every screen starts as grey boxes. Drag across the KisaanSathi chat to watch the wireframe turn into the finished interface.</p>
          <div className="note mono" style={{ color: 'var(--muted)' }}><span>KisaanSathi · chat screen</span><span>React + Vite · FastAPI</span></div>
        </Reveal>
        <Reveal>
          <div className="wf" ref={wf} style={{ '--p': p + '%' }} aria-label="Drag to compare wireframe and live interface"
            onPointerDown={(e) => { dragging.current = true; auto.current = false; wf.current.setPointerCapture(e.pointerId); setP(clamp(fromEv(e))) }}
            onPointerMove={(e) => { if (dragging.current || (e.pointerType === 'mouse' && !auto.current)) setP(clamp(fromEv(e))) }}>
            <div className="layer live"><AppScreen /></div>
            <div className="layer wire"><div className="grid-bg" /><AppScreen /></div>
            <span className="lbl l">Wireframe</span><span className="lbl r">Live</span>
            <div className="handle"><b>‹ ›</b></div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
