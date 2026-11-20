import { tools } from '../data'

export default function Tools() {
  const row = [...tools, ...tools] // duplicated for a seamless loop
  return (
    <section className="tools" aria-label="Tools">
      <div className="wrap">
        <div className="eyebrow">Built with / <b>the tools I trust</b></div>
        <span className="mono" style={{ color: 'var(--muted)' }}>Hover to pause</span>
      </div>
      <div className="marq">{row.map((t, i) => <span key={i}>{t}</span>)}</div>
    </section>
  )
}
