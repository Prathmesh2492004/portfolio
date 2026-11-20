import { useRef, useState } from 'react'
import Reveal from './Reveal'
import { THUMBS } from './Thumbs'
import { projects, GITHUB } from '../data'
import { reducedMotion } from '../hooks'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'web', label: 'Full-stack' },
  { id: 'data', label: 'Data analytics' },
]
const fine = () => window.matchMedia('(pointer:fine)').matches && !reducedMotion()

function Card({ p, i }) {
  const thumb = useRef(null)
  const { cls, C } = THUMBS[p.thumb]
  const move = (e) => {
    if (!fine()) return
    const r = thumb.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    thumb.current.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`
  }
  const leave = () => { thumb.current.style.transform = '' }
  const primary = p.demo || p.href
  const ext = !primary.startsWith('#')
  const linkProps = (u) => (u.startsWith('#') ? { href: u } : { href: u, target: '_blank', rel: 'noopener noreferrer' })
  return (
    <Reveal className="card" style={{ transitionDelay: (i % 3) * 0.08 + 's' }} onPointerMove={move} onPointerLeave={leave}>
      <a className={`thumb ${cls}`} ref={thumb} {...linkProps(primary)} aria-label={`${p.title}${p.demo ? ' live demo' : ''}`}>
        <span className="tag">{p.tag}</span>
        {p.demo && <span className="live-dot">● Live</span>}
        <C />
        <span className="view">{ext ? '↗' : '→'}</span>
      </a>
      <div className="meta">
        <span className="n">{String(i + 1).padStart(2, '0')}</span>
        <div><h3>{p.title}</h3><div className="k">{p.kind}</div></div>
        <a className="go-ar" {...linkProps(p.href)} aria-label={`${p.title} code`}>↗</a>
      </div>
      <p className="desc">{p.desc}</p>
      {p.impact?.length > 0 && (
        <div className="impact">{p.impact.map((m) => <div key={m.l}><b>{m.v}</b><span>{m.l}</span></div>)}</div>
      )}
      <div className="chips">{p.chips.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
      <div className="card-acts">
        {p.demo && <a className="btn red sm" {...linkProps(p.demo)}>{p.demoLabel || 'Live demo'} <span className="ar">{ext ? '↗' : '→'}</span></a>}
        <a className="btn sm" {...linkProps(p.href)}>Code <span className="ar">↗</span></a>
      </div>
    </Reveal>
  )
}

export default function Work() {
  const [filter, setFilter] = useState('all')
  const count = (id) => (id === 'all' ? projects.length : projects.filter((p) => p.cat.includes(id)).length)
  const visible = projects.map((p, i) => ({ p, i })).filter(({ p }) => filter === 'all' || p.cat.includes(filter))

  return (
    <section className="sec" id="work">
      <div className="wrap">
        <Reveal className="work-head">
          <div>
            <div className="eyebrow"><b>01</b> / Selected work</div>
            <h2 className="h2">Work that speaks<span className="dot">.</span></h2>
          </div>
          <a className="btn mag" href={`${GITHUB}?tab=repositories`} target="_blank" rel="noopener noreferrer">All repos on GitHub <span className="ar">↗</span></a>
        </Reveal>
        <Reveal className="tabs" role="tablist">
          {FILTERS.map((f) => (
            <button key={f.id} className={`tab${filter === f.id ? ' on' : ''}`} onClick={() => setFilter(f.id)}>
              {f.label}<sup>{count(f.id)}</sup>
            </button>
          ))}
        </Reveal>
        <div className="grid" key={filter}>
          {visible.map(({ p, i }) => <Card key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}
