import { useEffect, useRef } from 'react'
import { reducedMotion } from '../hooks'

const COLORS = ['#ff2d55', '#ffd60a', '#30d158', '#64d2ff', '#bf5af2', '#ff9f0a', '#ff1e3c', '#ffffff']

/** Colourful cursor-arrow particles: trail the mouse, burst on click, drift ambiently. */
export default function ArrowCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    if (reducedMotion()) return
    const cv = ref.current
    const ctx = cv.getContext('2d')
    let W, H, raf
    const P = []
    let lx = null, ly = null

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      W = window.innerWidth; H = window.innerHeight
      cv.width = W * dpr; cv.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const arrow = (x, y, o = {}) => P.push({
      x, y,
      vx: o.vx ?? (Math.random() - 0.5) * 1.2,
      vy: o.vy ?? (Math.random() - 0.5) * 1.2 - 0.3,
      r: o.r ?? (Math.random() * 0.9 - 0.45),
      vr: (Math.random() - 0.5) * 0.04,
      s: o.s ?? (0.7 + Math.random() * 0.7),
      c: COLORS[(Math.random() * COLORS.length) | 0],
      life: 0, max: o.max ?? (60 + Math.random() * 50), g: o.g ?? 0.015, a: o.a ?? 1,
    })

    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return
      if (lx === null) { lx = e.clientX; ly = e.clientY; return }
      const dx = e.clientX - lx, dy = e.clientY - ly, d = Math.hypot(dx, dy)
      if (d > 16) {
        const n = Math.min(3, Math.floor(d / 16))
        for (let i = 0; i < n; i++) arrow(lx + dx * (i / n), ly + dy * (i / n), { vx: -dx * 0.02 + (Math.random() - 0.5) * 1.4, vy: -dy * 0.02 + (Math.random() - 0.5) * 1.4 })
        lx = e.clientX; ly = e.clientY
      }
    }
    const onDown = (e) => {
      if (e.target.closest && e.target.closest('.wf')) return
      const N = 16
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2
        arrow(e.clientX, e.clientY, { vx: Math.cos(a) * 4.2, vy: Math.sin(a) * 4.2, r: a + Math.PI * 0.75, g: 0.04, max: 55 })
      }
    }
    const ambient = setInterval(() => {
      if (document.hidden || P.length > 140) return
      arrow(Math.random() * W, Math.random() * H, { vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, g: 0, max: 180, a: 0.55, s: 0.8 })
    }, 650)

    const shape = () => {
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 15); ctx.lineTo(4, 11.2); ctx.lineTo(7.2, 17.5)
      ctx.lineTo(9.6, 16.4); ctx.lineTo(6.5, 10.2); ctx.lineTo(11.5, 10.2); ctx.closePath()
    }
    const loop = () => {
      ctx.clearRect(0, 0, W, H)
      for (let i = P.length - 1; i >= 0; i--) {
        const p = P[i]
        p.life++; p.vy += p.g; p.vx *= 0.985; p.vy *= 0.985; p.x += p.vx; p.y += p.vy; p.r += p.vr
        const k = p.life / p.max
        if (k >= 1) { P.splice(i, 1); continue }
        const al = p.a * (k < 0.15 ? k / 0.15 : 1 - Math.pow((k - 0.15) / 0.85, 2))
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.scale(p.s, p.s); ctx.globalAlpha = Math.max(0, al)
        shape(); ctx.fillStyle = p.c; ctx.fill(); ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(0,0,0,.55)'; ctx.stroke(); ctx.restore()
      }
      raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    loop()
    return () => {
      cancelAnimationFrame(raf); clearInterval(ambient)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [])

  return <canvas id="fx" ref={ref} aria-hidden="true" />
}
