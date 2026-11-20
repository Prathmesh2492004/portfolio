import Reveal from './Reveal'
import { EMAIL, PHONE, PHONE_RAW, LINKEDIN, GITHUB } from '../data'

const Icon = ({ d }) => (
  <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{d}</svg></span>
)
const ICONS = {
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  in: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></>,
  gh: <path d="M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5a3 3 0 0 0-.9-2.4c3-.3 6-1.5 6-6.6a5 5 0 0 0-1.4-3.5 4.7 4.7 0 0 0-.1-3.5s-1.1-.3-3.6 1.4a12.4 12.4 0 0 0-6.5 0C6.1 1.7 5 2 5 2a4.7 4.7 0 0 0-.1 3.5A5 5 0 0 0 3.5 9c0 5 3 6.3 6 6.6a3 3 0 0 0-.9 2.3V22" />,
  pin: <><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" /><circle cx="12" cy="9" r="2.5" /></>,
}

export default function Contact({ onCopy }) {
  const copy = (v) => {
    const done = () => onCopy('Copied ' + v)
    try { navigator.clipboard.writeText(v).then(done, done) } catch { done() }
  }
  return (
    <section className="sec" id="contact" style={{ paddingTop: 30 }}>
      <div className="wrap ct">
        <Reveal>
          <div className="eyebrow"><b>04</b> / Your next hire</div>
          <h2 className="h2">Let's build<br />together<span className="dot">.</span></h2>
          <p>Hiring for an SDE, full-stack or data role? I can join immediately and I'm open to Pune, Mumbai, Bangalore, Hyderabad and Chennai.</p>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn red mag">Start a conversation <span className="ar">↗</span></a>
        </Reveal>
        <Reveal className="rows">
          <a className="crow" href={`mailto:${EMAIL}`}>
            <Icon d={ICONS.mail} /><div><small>Email</small><span>{EMAIL}</span></div>
            <button className="act" onClick={(e) => { e.preventDefault(); copy(EMAIL) }}>Copy</button>
          </a>
          <a className="crow" href={`tel:${PHONE_RAW}`}>
            <Icon d={ICONS.phone} /><div><small>Phone</small><span>{PHONE}</span></div>
            <button className="act" onClick={(e) => { e.preventDefault(); copy(PHONE_RAW) }}>Copy</button>
          </a>
          <a className="crow" href={LINKEDIN} target="_blank" rel="noopener noreferrer">
            <Icon d={ICONS.in} /><div><small>LinkedIn</small><span>prathmesh-bhilegaonkar</span></div><span className="act">Open ↗</span>
          </a>
          <a className="crow" href={GITHUB} target="_blank" rel="noopener noreferrer">
            <Icon d={ICONS.gh} /><div><small>GitHub</small><span>Prathmesh2492004</span></div><span className="act">Open ↗</span>
          </a>
          <div className="crow">
            <Icon d={ICONS.pin} /><div><small>Based in</small><span>Pune, India · Open to relocate</span></div><span />
          </div>
        </Reveal>
        <Reveal className="mini" aria-hidden="true">
          <div className="tp mono"><span>PB / 2026</span><span style={{ color: 'var(--red)' }}>● Open</span></div>
          <div className="beam" />
          <div className="avail">Build better.<br />Ship faster.</div>
          <div className="bt">Build<span>smarter.</span></div>
        </Reveal>
      </div>
    </section>
  )
}
