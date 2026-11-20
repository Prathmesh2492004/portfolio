import Reveal from './Reveal'
import { journey, shipped, certifications } from '../data'

export default function Journey() {
  return (
    <section className="sec" id="journey" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <Reveal>
          <div className="eyebrow"><b>03</b> / The journey</div>
          <h2 className="h2">Where I've <span className="r">worked.</span></h2>
        </Reveal>
        <div className="jr">
          <Reveal className="tl">
            {journey.map((j) => (
              <details key={j.title} open={j.open}>
                <summary>
                  <span className="when">{j.when}</span>
                  <span className="what"><b>{j.title}</b><small>{j.sub}</small></span>
                  <span className="pl">+</span>
                </summary>
                <ul>{j.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              </details>
            ))}
          </Reveal>
          <Reveal className="shipped">
            <div className="eyebrow">A few that shipped</div>
            <div className="big">Shipped<span className="dot">.</span><span className="l">Live. Used.</span></div>
            <div className="slist">
              {shipped.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
                  <span><b>{s.name}</b><small>{s.sub}</small></span><em>↗</em>
                </a>
              ))}
            </div>
            <div className="certs">
              <h4>Certifications</h4>
              <div className="chips">{certifications.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
