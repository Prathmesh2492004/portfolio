import { useRef, useState } from 'react'
import Reveal from './Reveal'
import { education, skills, steps } from '../data'
import { useScroll } from '../hooks'

function Steps() {
  const ref = useRef(null)
  const [fill, setFill] = useState(0)
  const [lit, setLit] = useState(0)
  useScroll(() => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const k = Math.max(0, Math.min(1, (window.innerHeight * 0.7 - r.top) / r.height))
    setFill(k * (r.height - 12))
    setLit([...el.querySelectorAll('li')].filter((li) => li.getBoundingClientRect().top < window.innerHeight * 0.7).length)
  })
  return (
    <div className="steps" ref={ref}>
      <span className="fill" style={{ height: fill }} />
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 26 }}>
        {steps.map((s, i) => (
          <li key={s.t} className={i < lit ? 'lit' : ''}>
            <span className="sn">{String(i + 1).padStart(2, '0')}</span><b>{s.t}</b><p>{s.d}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function About() {
  return (
    <section className="sec" id="about" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <Reveal>
          <div className="eyebrow"><b>02</b> / Behind the craft</div>
          <h2 className="h2">More than code<span className="dot">.</span><br />Crafting <span className="r">experiences.</span></h2>
        </Reveal>
        <div className="craft">
          <Reveal className="blk">
            <h4>Education</h4>
            <div className="edu">
              {education.map((e) => <div key={e.title}><b>{e.title}</b><em>{e.year}</em><small>{e.sub}</small></div>)}
            </div>
            <h4>Toolkit</h4>
            <div className="skillset">
              {skills.map((s) => (
                <div key={s.label}>
                  <div className="sl">{s.label}</div>
                  <div className="chips">{s.items.map((it) => <span className="chip" key={it}>{it}</span>)}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="blk">
            <h4>How I build</h4>
            <Steps />
          </Reveal>
          <Reveal className="redcard">
            <div className="q">From <b>raw data</b> and a blank repo to <b>products people actually use.</b></div>
            <div className="sig">Prathmesh</div>
            <div className="foot"><span>Available to join immediately</span><span /></div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
