import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { GITHUB } from '../data'
import { reducedMotion } from '../hooks'

// Scripted answers. Facts are from the public scheme guidelines; the real app retrieves them with RAG.
const QA = [
  {
    q: 'Am I eligible for PM-KISAN?', keys: ['kisan', 'pm-kisan', '6000', 'eligible', 'income support'],
    a: 'If your family owns cultivable land, most likely yes. PM-KISAN pays ₹6,000 a year in three ₹2,000 instalments straight to your bank account. Income-tax payers, institutional landholders and some professionals such as doctors and engineers are excluded.',
    src: ['PM-KISAN operational guidelines', 'pmkisan.gov.in'],
  },
  {
    q: 'How much premium for crop insurance?', keys: ['insurance', 'premium', 'fasal', 'bima', 'pmfby', 'crop loss'],
    a: 'Under PM Fasal Bima Yojana you pay at most 2% of the sum insured for Kharif crops, 1.5% for Rabi crops and 5% for commercial or horticultural crops. The government pays the rest of the premium.',
    src: ['PMFBY guidelines', 'pmfby.gov.in'],
  },
  {
    q: 'Can I get a cheap farm loan?', keys: ['loan', 'credit', 'kcc', 'interest', 'money'],
    a: 'Yes, through a Kisan Credit Card. Short-term crop loans up to ₹3 lakh carry 7% interest, and repaying on time earns a 3% incentive, so you effectively pay 4% a year. Apply at any bank branch with land records and ID.',
    src: ['Modified Interest Subvention Scheme', 'KCC guidelines'],
  },
  {
    q: 'How do I get my soil tested?', keys: ['soil', 'test', 'fertiliser', 'fertilizer', 'health card'],
    a: 'Under the Soil Health Card scheme your soil is tested free of cost. The card lists nutrient levels and the fertiliser doses recommended for your crop. Ask your local agriculture officer or Krishi Vigyan Kendra.',
    src: ['Soil Health Card scheme', 'soilhealth.dac.gov.in'],
  },
]
const FALLBACK = {
  a: 'This demo on the portfolio answers four sample questions. Try one of the buttons above. The full KisaanSathi app searches the scheme documents to answer any question.',
  src: [],
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export default function AskDemo() {
  const [msgs, setMsgs] = useState([{ role: 'bot', text: 'Namaste! Ask me about government schemes for farmers. I answer from official scheme documents.', src: [] }])
  const [busy, setBusy] = useState(false)
  const [val, setVal] = useState('')
  const box = useRef(null)
  const alive = useRef(true)
  useEffect(() => () => { alive.current = false }, [])
  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight }, [msgs])

  const ask = async (q) => {
    if (busy || !q.trim()) return
    setBusy(true)
    const lower = q.toLowerCase()
    const hit = QA.find((x) => x.q === q) || QA.find((x) => x.keys.some((k) => lower.includes(k))) || FALLBACK
    setMsgs((m) => [...m, { role: 'user', text: q }, { role: 'bot', typing: true }])
    const fast = reducedMotion()
    await sleep(fast ? 0 : 900)
    const words = hit.a.split(' ')
    for (let i = 1; i <= words.length; i++) {
      if (!alive.current) return
      const text = words.slice(0, i).join(' ')
      setMsgs((m) => [...m.slice(0, -1), { role: 'bot', text, src: i === words.length ? hit.src : [] }])
      if (!fast) await sleep(28)
    }
    setBusy(false)
  }

  return (
    <section className="sec" id="demo" style={{ paddingTop: 30 }}>
      <div className="wrap ask">
        <Reveal>
          <div className="eyebrow">Try it yourself</div>
          <h2 className="h2">Ask<br /><span className="r">KisaanSathi.</span></h2>
          <p>My flagship project helps farmers find the government schemes they qualify for. Tap a question to see how it answers, with sources.</p>
          <div className="qchips">
            {QA.map((x) => <button key={x.q} disabled={busy} onClick={() => ask(x.q)}>{x.q}</button>)}
          </div>
          <div className="mono" style={{ color: 'var(--muted)', marginTop: 22, lineHeight: 1.8 }}>
            Scripted demo · the real app uses RAG over<br />scheme PDFs (ChromaDB + LLaMA 3.3)
          </div>
          <a className="btn mag" style={{ marginTop: 18 }} href={`${GITHUB}/KisaanSathi`} target="_blank" rel="noopener noreferrer">See the code <span className="ar">↗</span></a>
        </Reveal>
        <Reveal className="chat">
          <div className="chat-top">
            <div className="av">KS</div>
            <div><b>KisaanSathi</b><small>{busy ? 'searching scheme documents…' : 'online · cites its sources'}</small></div>
          </div>
          <div className="chat-body" ref={box} aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={`cm ${m.role}`}>
                {m.typing ? <span className="dots"><i /><i /><i /></span> : m.text}
                {m.src?.length > 0 && <div className="csrc">{m.src.map((s) => <span key={s}>📄 {s}</span>)}</div>}
              </div>
            ))}
          </div>
          <form className="chat-in" onSubmit={(e) => { e.preventDefault(); ask(val); setVal('') }}>
            <input id="ask-input" value={val} onChange={(e) => setVal(e.target.value)} placeholder="Ask about any scheme…" aria-label="Ask KisaanSathi" autoComplete="off" />
            <button type="submit" disabled={busy}>Send</button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
