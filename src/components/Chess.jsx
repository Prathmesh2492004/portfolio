import { useMemo, useRef, useState } from 'react'
import { Chess as ChessGame } from 'chess.js'
import Reveal from './Reveal'
import { search } from '../chess/engine'

const GLYPH = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' }
const FILES = 'abcdefgh'
const LEVELS = [{ id: 2, label: 'Easy' }, { id: 3, label: 'Normal' }]

export default function Chess() {
  const game = useRef(new ChessGame())
  const [, force] = useState(0)
  const rerender = () => force((n) => n + 1)
  const [sel, setSel] = useState(null)
  const [thinking, setThinking] = useState(false)
  const [last, setLast] = useState(null)
  const [info, setInfo] = useState(null)
  const [depth, setDepth] = useState(3)

  const g = game.current
  const board = g.board()
  const targets = useMemo(() => (sel ? g.moves({ square: sel, verbose: true }).map((m) => m.to) : []), [sel, g, last]) // eslint-disable-line

  const status = (() => {
    if (g.isCheckmate()) return g.turn() === 'w' ? 'Checkmate. My bot wins this one.' : 'Checkmate! You beat the bot 🎉'
    if (g.isStalemate()) return 'Stalemate. A draw.'
    if (g.isDraw()) return 'Draw.'
    if (thinking) return 'Bot is thinking…'
    return g.inCheck() ? 'Check! Your move.' : 'Your move (you play White).'
  })()

  const botMove = () => {
    setThinking(true)
    setTimeout(() => {
      const r = search(g, depth)
      if (r.move) { g.move(r.move); setLast({ from: r.move.from, to: r.move.to }) }
      setInfo(r); setThinking(false); rerender()
    }, 60)
  }

  const click = (sq) => {
    if (thinking || g.isGameOver() || g.turn() !== 'w') return
    const piece = g.get(sq)
    if (sel && targets.includes(sq)) {
      g.move({ from: sel, to: sq, promotion: 'q' })
      setLast({ from: sel, to: sq }); setSel(null); rerender()
      if (!g.isGameOver()) botMove()
      return
    }
    setSel(piece && piece.color === 'w' ? (sel === sq ? null : sq) : null)
  }

  const reset = () => { g.reset(); setSel(null); setLast(null); setInfo(null); rerender() }
  const undo = () => {
    if (thinking) return
    g.undo(); if (g.turn() === 'b') g.undo()
    setSel(null); setLast(null); rerender()
  }

  const evalPawns = info ? Math.max(-9.9, Math.min(9.9, info.score / 100)) : 0
  const whitePct = 50 + evalPawns * 5
  const history = g.history()

  return (
    <section className="sec" id="chess" style={{ paddingTop: 30 }}>
      <div className="wrap chessw">
        <Reveal>
          <div className="eyebrow">ChessMate · playable</div>
          <h2 className="h2">Beat<br /><span className="r">my bot.</span></h2>
          <p>This is the engine idea from my ChessMate project, rewritten in JavaScript so it runs in your browser. It searches ahead with minimax and alpha-beta pruning and scores positions with piece-square tables.</p>
          <div className="eng">
            <div><b>{info ? info.nodes.toLocaleString('en-IN') : '—'}</b><span>Positions searched</span></div>
            <div><b>{info ? (info.ms / 1000).toFixed(2) + 's' : '—'}</b><span>Think time</span></div>
            <div><b>{info ? (evalPawns > 0 ? '+' : '') + evalPawns.toFixed(1) : '0.0'}</b><span>Eval (pawns)</span></div>
          </div>
          <div className="lvl" role="group" aria-label="Difficulty">
            {LEVELS.map((l) => (
              <button key={l.id} className={depth === l.id ? 'on' : ''} onClick={() => setDepth(l.id)}>{l.label} · depth {l.id}</button>
            ))}
          </div>
        </Reveal>

        <Reveal className="board-wrap">
          <div className="status mono" aria-live="polite">{status}</div>
          <div className="board-row">
            <div className="evalbar" aria-hidden="true"><i style={{ height: whitePct + '%' }} /></div>
            <div className={`cboard${thinking ? ' busy' : ''}`}>
              {board.map((row, r) => row.map((p, c) => {
                const sq = FILES[c] + (8 - r)
                const dark = (r + c) % 2 === 1
                const isTarget = targets.includes(sq)
                const cls = ['sq', dark ? 'd' : 'l', sel === sq && 'sel', last && (last.from === sq || last.to === sq) && 'last',
                  p && p.type === 'k' && p.color === g.turn() && g.inCheck() && 'chk', isTarget && (p ? 'cap' : 'tgt')].filter(Boolean).join(' ')
                return (
                  <button key={sq} className={cls} onClick={() => click(sq)} aria-label={`${sq}${p ? ' ' + (p.color === 'w' ? 'white ' : 'black ') + p.type : ''}`}>
                    {p && <span className={`pc ${p.color}`}>{GLYPH[p.type]}{'︎'}</span>}
                    {c === 0 && <span className="rk">{8 - r}</span>}
                    {r === 7 && <span className="fl">{FILES[c]}</span>}
                  </button>
                )
              }))}
            </div>
          </div>
          <div className="board-foot">
            <div className="moves mono">{history.length ? history.slice(-8).join('  ') : 'e4? d4? your call.'}</div>
            <div className="bbtns">
              <button className="btn sm" onClick={undo} disabled={!history.length || thinking}>Undo</button>
              <button className="btn red sm" onClick={reset}>New game</button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
