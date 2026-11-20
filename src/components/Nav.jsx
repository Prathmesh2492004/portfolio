import { useState } from 'react'
import { useScroll } from '../hooks'
import { RESUME, OPEN_TO_WORK } from '../data'

const LINKS = ['work', 'demo', 'chess', 'about', 'journey', 'contact']
const LABELS = { demo: 'Demo', chess: 'Play' }

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState(null)
  const [prog, setProg] = useState(0)

  useScroll(() => {
    const y = window.scrollY
    const h = document.documentElement.scrollHeight - window.innerHeight
    setProg(h > 0 ? (y / h) * 100 : 0)
    setSolid(y > 40)
    let cur = null
    LINKS.forEach((id) => {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id
    })
    setActive(cur)
  })

  return (
    <>
      <div className="prog" style={{ width: prog + '%' }} />
      <header className={`nav${solid ? ' solid' : ''}`}>
        <div className="wrap">
          <a href="#top" className="logo">PRATHMESH<i /></a>
          <ul>
            {LINKS.map((id) => (
              <li key={id}>
                <a href={'#' + id} className={active === id ? 'on' : ''}>{LABELS[id] || id[0].toUpperCase() + id.slice(1)}</a>
              </li>
            ))}
          </ul>
          <div className="nav-r">
            {OPEN_TO_WORK && <span className="otw"><i />Open to work<b> · joins now</b></span>}
            <a href={RESUME} download className="btn mag res">Resume <span className="ar">↓</span></a>
            <a href="#contact" className="btn red mag hide-sm">Let's talk <span className="ar">→</span></a>
          </div>
        </div>
      </header>
    </>
  )
}
