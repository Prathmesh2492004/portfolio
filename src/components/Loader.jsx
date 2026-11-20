import { useEffect, useState } from 'react'

/** 0 → 100 counter, then the curtain slides up and calls onDone. */
export default function Loader({ onDone }) {
  const [n, setN] = useState(0)
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const v = Math.min(100, Math.round((t - t0) / 11))
      setN(v)
      if (v < 100) raf = requestAnimationFrame(tick)
      else {
        setDone(true)
        setTimeout(onDone, 250)
        setTimeout(() => setGone(true), 1200)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  if (gone) return null
  return (
    <div className={`loader${done ? ' done' : ''}`} aria-hidden="true">
      <div className="lbl">Prathmesh B. — Portfolio '26</div>
      <div className="num">{n}</div>
    </div>
  )
}
