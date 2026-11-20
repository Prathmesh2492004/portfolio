import { useEffect, useRef, useState } from 'react'
import { reducedMotion, useScroll } from '../hooks'
import { stats, PHOTO } from '../data'
import Terminal from './Terminal'
import useGithub from '../useGithub'

function Counter({ to, suffix = '', go }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!go) return
    let raf
    const t0 = performance.now(), d = 1600
    const f = (t) => {
      const p = Math.min(1, (t - t0) / d)
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(f)
    }
    raf = requestAnimationFrame(f)
    return () => cancelAnimationFrame(raf)
  }, [go, to])
  return <b>{v}{suffix}</b>
}

export default function Hero({ go }) {
  const gh = useGithub()
  const wordRef = useRef(null)
  const portraitRef = useRef(null)

  useScroll(() => {
    const y = window.scrollY
    if (reducedMotion() || y > window.innerHeight * 1.2) return
    if (window.innerWidth > 820) {
      wordRef.current.style.transform = `translateX(${-y * 0.35}px)`
      portraitRef.current.style.transform = `translateX(-50%) translateY(${y * 0.18}px)`
    } else {
      wordRef.current.style.transform = ''
      portraitRef.current.style.transform = ''
    }
  })

  return (
    <section className="hero" id="hero">
      <div className="hero-tag">
        <div className="wrap">
          <span className="mono fade-up d1" style={{ color: 'var(--red)' }}>Software Developer · Data &amp; AI</span>
          <span className="mono fade-up d1" style={{ color: 'var(--muted)' }}>B.Tech CSE · Class of 2026</span>
        </div>
      </div>

      <div className="word" ref={wordRef} aria-label="Portfolio">
        {'PORTFOLIO'.split('').map((ch, i) => (
          <span key={i}><i style={{ transitionDelay: `${0.06 * i}s` }}>{ch}</i></span>
        ))}
      </div>

      <div className="portrait" ref={portraitRef}>
        <div className={`p-card${PHOTO ? ' has-photo' : ''}`}>
          {PHOTO ? <img src={PHOTO} className="p-photo" alt="Prathmesh Bhilegaonkar" /> : <div className="p-mono"><b>PB</b></div>}
          <Terminal go={go} />
        </div>
      </div>

      <div className="hero-left">
        <div className="wrap">
          <div className="hl">
            <span className="hello">Hello, I'm</span>
            <h1 className="name fade-up d1">PRATHMESH</h1>
            <div className="role fade-up d2">Developer &amp;<br />Problem Solver</div>
            <p className="fade-up d3">I build full-stack apps and ML systems in Java, Python and React, from the first data model to the screen people use.</p>
            <div className="fade-up d4"><a href="#work" className="btn red mag">See my work <span className="ar">→</span></a></div>
            <div className="loc mono fade-up d4">Pune, India</div>
          </div>
          <div className="stats fade-up d3">
            {stats.map((s) => (
              <div className="stat" key={s.label.join()}>
                <Counter to={s.live && gh.profile ? gh.profile[s.live] : s.value} suffix={s.suffix} go={go} />
                <span>{s.label[0]}<br />{s.label[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="scrollcue">
        <div className="wrap">
          <span className="mono"><span className="line" />Scroll to explore</span>
          <span className="mono">Open to SDE · Data roles</span>
        </div>
      </div>
    </section>
  )
}
