// Small illustrated "screens" used as project thumbnails (pure CSS, no images).
// Figures shown inside are illustrative sample values.

const PIECES = { r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', p: '♟', R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', P: '♙' }
const FEN = 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R'
const BOARD = FEN.split('/').flatMap((row) => [...row].flatMap((ch) => (/\d/.test(ch) ? Array(+ch).fill('') : [PIECES[ch]])))

const Kisaan = () => (
  <div className="mk">
    <div className="big">Kisaan<br />Sathi</div>
    <div className="bubble q">Am I eligible for PM-KISAN? I have 1.5 acres.</div>
    <div className="bubble a">Yes, small &amp; marginal farmers qualify for ₹6,000/yr. <span className="src">[scheme doc §2]</span></div>
  </div>
)
const Career = () => (
  <div className="mk" style={{ paddingTop: 44 }}>
    <div className="big">Your best fit</div>
    {[['Data Scientist', 87], ['Software Eng.', 74], ['UX Designer', 58], ['Civil Services', 41]].map(([n, w]) => (
      <div className="row" key={n}><span>{n}</span><u style={{ '--w': w + '%' }} /><span>{w}%</span></div>
    ))}
  </div>
)
const Brain = () => (
  <>
    <div className="scan" /><div className="box" /><div className="sweep" />
    <div className="acc">92%<small>Accuracy</small></div>
  </>
)
const Dev = () => (
  <div className="mk" style={{ paddingTop: 44 }}>
    <div className="hd"><span>api/routes.py</span><span>PR #42</span></div>
    <div className="del">- def query(q): return db.search(q)</div>
    <div className="add">+ async def query(q: str) -&gt; Answer:</div>
    <div className="add">+     hits = await index.search(q, k=8)</div>
    <div className="add">+     return cite(llm.answer(q, hits))</div>
    <div className="bot"><b>DevAssist</b> · Await the index call in tests too; <code>test_routes.py:31</code> still calls it synchronously.</div>
  </div>
)
const Intellix = () => (
  <div className="mk">
    <div className="big">Intellix<span style={{ color: 'var(--red)' }}>.</span>AI</div>
    <div className="ask"><span>Summarise my notes on OS scheduling…</span><span>↵</span></div>
  </div>
)
const Chess = () => (
  <>
    <div className="board">
      {BOARD.map((p, i) => {
        const r = Math.floor(i / 8), c = i % 8
        return <i key={i} style={{ background: (r + c) % 2 ? '#b5876a' : '#efd9b9' }}>{p}</i>
      })}
    </div>
    <div className="side"><div className="big">Chess<br />Mate</div><div className="ev">minimax d=4<br />α-β pruning<br />eval +0.8</div></div>
  </>
)
const Ecom = () => (
  <div className="mk" style={{ paddingTop: 44 }}>
    <div className="kpi"><div><b>₹4.2M</b>Revenue</div><div><b>18.6K</b>Orders</div><div><b>32%</b>Repeat</div></div>
    <div className="bars">
      {[35, 52, 41, 66, 58, 74, 63, 88, 79, 95, 84, 100].map((h, i) => (
        <i key={i} style={{ height: h + '%', transitionDelay: i * 0.05 + 's' }} />
      ))}
    </div>
  </div>
)
const Vendor = () => (
  <div className="mk" style={{ paddingTop: 44 }}>
    <div className="big">Vendor scorecard</div>
    <table><tbody>
      {[['A', 96, '▲ 4.1', 'pos'], ['B', 88, '▲ 1.3', 'pos'], ['C', 71, '▼ 6.8', 'neg'], ['D', 64, '▼ 9.2', 'neg']].map(([v, o, d, c]) => (
        <tr key={v}><td>Vendor {v}</td><td>On-time {o}%</td><td className={c}>{d}</td></tr>
      ))}
    </tbody></table>
  </div>
)
const Hr = () => (
  <div className="mk">
    <div className="donut" />
    <div className="lg">
      <div className="big">Attrition</div>
      <div><i style={{ background: '#a3001a' }} />Left</div>
      <div><i style={{ background: '#ff8a3d' }} />At risk</div>
      <div><i style={{ background: '#3a2a00' }} />Retained</div>
    </div>
  </div>
)

export const THUMBS = {
  kisaan: { cls: 't-kisaan', C: Kisaan },
  career: { cls: 't-career', C: Career },
  brain: { cls: 't-brain', C: Brain },
  dev: { cls: 't-dev', C: Dev },
  intellix: { cls: 't-intellix', C: Intellix },
  chess: { cls: 't-chess', C: Chess },
  ecom: { cls: 't-ecom', C: Ecom },
  vendor: { cls: 't-vendor', C: Vendor },
  hr: { cls: 't-hr', C: Hr },
}
