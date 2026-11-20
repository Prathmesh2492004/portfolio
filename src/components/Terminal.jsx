import { useEffect, useRef, useState } from 'react'
import { reducedMotion } from '../hooks'
import { projects, skills, journey, EMAIL, PHONE, GITHUB, LINKEDIN, RESUME } from '../data'

const INTRO = [
  ['pr', '$ '], ['', 'whoami\n'], ['out', 'prathmesh.bhilegaonkar\n'],
  ['pr', '$ '], ['', 'cat stack.txt\n'], ['out', 'java · python · react · node · sql\n'],
]
const STEPS = []
INTRO.forEach(([c, t], i) => {
  if (c === 'out') STEPS.push({ i, len: t.length, delay: 380 })
  else for (let n = 1; n <= t.length; n++) STEPS.push({ i, len: n, delay: n === t.length ? (c === 'pr' ? 60 : 260) : 40 + Math.random() * 50 })
})

const CHIPS = ['help', 'projects', 'resume', 'sudo hire prathmesh']

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
const openUrl = (u) => window.open(u, '_blank', 'noopener')

/** Returns an array of [className, text] lines for a command. */
function run(raw) {
  const cmd = raw.trim().replace(/\s+/g, ' ')
  const [c, ...args] = cmd.toLowerCase().split(' ')
  switch (c) {
    case '': return []
    case 'help': return [
      ['muted', 'available commands:'],
      ['', '  whoami      who is this guy'],
      ['', '  projects    list my work   ·  open <n>'],
      ['', '  skills      tech I use'],
      ['', '  experience  internships'],
      ['', '  resume      download my CV'],
      ['', '  contact     email & phone'],
      ['', '  chess       play my minimax bot'],
      ['', '  github · linkedin · clear'],
    ]
    case 'whoami': return [['', 'Prathmesh Bhilegaonkar — Software Developer'], ['muted', "B.Tech CSE '26 · Pune · joins immediately"]]
    case 'ls': return [['', 'projects/  skills.txt  resume.pdf  contact.md']]
    case 'projects': return [
      ...projects.map((p, i) => ['', `  ${String(i + 1).padStart(2, '0')}  ${p.title}`]),
      ['muted', 'type `open 1` to view a project'],
    ]
    case 'open': {
      const n = parseInt(args[0], 10)
      const p = projects[n - 1]
      if (!p) return [['err', 'usage: open <1-' + projects.length + '>']]
      if (p.demo && p.demo.startsWith('#')) { scrollTo(p.demo.slice(1)); return [['ok', `→ jumping to ${p.title}`]] }
      openUrl(p.demo || p.href); return [['ok', `→ opening ${p.title}`]]
    }
    case 'skills': case 'cat':
      return skills.map((s) => ['', `${s.label.padEnd(14)} ${s.items.join(', ')}`])
    case 'experience': case 'exp':
      return journey.slice(0, 2).map((j) => ['', `${j.when.padEnd(18)} ${j.title} @ ${j.sub.split(' · ')[0]}`])
    case 'resume': case 'cv': {
      const a = document.createElement('a'); a.href = RESUME; a.download = 'Prathmesh_Bhilegaonkar_Resume.pdf'; a.click()
      return [['ok', '✓ downloading resume.pdf']]
    }
    case 'contact': case 'hire': case 'email':
      return [['', `email  ${EMAIL}`], ['', `phone  ${PHONE}`], ['muted', 'or try: sudo hire prathmesh']]
    case 'sudo':
      if (cmd.toLowerCase() === 'sudo hire prathmesh') {
        setTimeout(() => scrollTo('contact'), 900)
        return [['ok', '[sudo] permission granted ✓'], ['ok', 'offer letter generated… redirecting to contact']]
      }
      return [['err', 'nice try. permission denied.']]
    case 'chess': case 'play': setTimeout(() => scrollTo('chess'), 400); return [['ok', '→ loading board… good luck']]
    case 'github': openUrl(GITHUB); return [['ok', '→ opening GitHub']]
    case 'linkedin': openUrl(LINKEDIN); return [['ok', '→ opening LinkedIn']]
    case 'clear': return null
    case 'rm': return [['err', 'rm: refusing to delete my hard work']]
    default: return [['err', `command not found: ${c}`], ['muted', 'type `help` to see what works']]
  }
}

export default function Terminal({ go }) {
  const [k, setK] = useState(-1)
  const [ready, setReady] = useState(false)
  const [log, setLog] = useState([])
  const [cleared, setCleared] = useState(false)
  const [val, setVal] = useState('')
  const hist = useRef([]); const hi = useRef(0)
  const out = useRef(null); const inp = useRef(null)

  useEffect(() => {
    if (!go) return
    if (reducedMotion()) { setK(STEPS.length - 1); setReady(true); return }
    let timer, idx = -1
    const next = () => {
      idx++; setK(idx)
      if (idx < STEPS.length - 1) timer = setTimeout(next, STEPS[idx].delay)
      else timer = setTimeout(() => setReady(true), 300)
    }
    setK(-1); timer = setTimeout(next, 200)
    return () => clearTimeout(timer)
  }, [go])

  useEffect(() => { if (out.current) out.current.scrollTop = out.current.scrollHeight }, [log, k, ready])

  const exec = (command) => {
    const res = run(command)
    hist.current.push(command); hi.current = hist.current.length
    if (res === null) { setLog([]); setCleared(true); return }
    setLog((l) => [...l, ['cmd', command], ...res])
  }
  const onKey = (e) => {
    if (e.key === 'Enter') { exec(val); setVal('') }
    else if (e.key === 'ArrowUp') { e.preventDefault(); hi.current = Math.max(0, hi.current - 1); setVal(hist.current[hi.current] || '') }
    else if (e.key === 'ArrowDown') { e.preventDefault(); hi.current = Math.min(hist.current.length, hi.current + 1); setVal(hist.current[hi.current] || '') }
  }

  const intro = []
  if (k >= 0 && !cleared) {
    const { i, len } = STEPS[k]
    INTRO.forEach(([c, t], j) => {
      const cls = c === 'out' ? '' : c
      if (j < i) intro.push([cls, t]); else if (j === i) intro.push([cls, t.slice(0, len)])
    })
  }

  return (
    <div className="term" onClick={() => inp.current?.focus({ preventScroll: true })}>
      <div className="bar"><i /><i /><i /><span className="tt">prathmesh@portfolio: ~</span></div>
      <div className="out" ref={out}>
        <div className="ln">{intro.map(([c, t], i) => <span key={i} className={c || undefined}>{t}</span>)}</div>
        {ready && !cleared && log.length === 0 && <div className="ln muted">Type a command, or tap one below ↓</div>}
        {log.map(([c, t], i) => (
          <div key={i} className={'ln ' + c}>{c === 'cmd' ? <><span className="pr">$ </span>{t}</> : t}</div>
        ))}
        {ready ? (
          <label className="ln prompt">
            <span className="pr">$ </span>
            <input ref={inp} value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={onKey}
              aria-label="Terminal command" autoComplete="off" autoCapitalize="off" spellCheck="false" />
          </label>
        ) : <span className="c" />}
      </div>
      {ready && (
        <div className="tchips">
          {CHIPS.map((c) => <button key={c} type="button" onClick={(e) => { e.stopPropagation(); exec(c) }}>{c}</button>)}
        </div>
      )}
    </div>
  )
}
