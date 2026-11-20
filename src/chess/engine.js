// Small minimax engine (negamax + alpha-beta + MVV-LVA ordering) on top of chess.js.
// Piece-square tables are the classic "simplified evaluation function" values.

const VAL = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 }
const PST = {
  p: [0,0,0,0,0,0,0,0, 50,50,50,50,50,50,50,50, 10,10,20,30,30,20,10,10, 5,5,10,25,25,10,5,5, 0,0,0,20,20,0,0,0, 5,-5,-10,0,0,-10,-5,5, 5,10,10,-20,-20,10,10,5, 0,0,0,0,0,0,0,0],
  n: [-50,-40,-30,-30,-30,-30,-40,-50, -40,-20,0,0,0,0,-20,-40, -30,0,10,15,15,10,0,-30, -30,5,15,20,20,15,5,-30, -30,0,15,20,20,15,0,-30, -30,5,10,15,15,10,5,-30, -40,-20,0,5,5,0,-20,-40, -50,-40,-30,-30,-30,-30,-40,-50],
  b: [-20,-10,-10,-10,-10,-10,-10,-20, -10,0,0,0,0,0,0,-10, -10,0,5,10,10,5,0,-10, -10,5,5,10,10,5,5,-10, -10,0,10,10,10,10,0,-10, -10,10,10,10,10,10,10,-10, -10,5,0,0,0,0,5,-10, -20,-10,-10,-10,-10,-10,-10,-20],
  r: [0,0,0,0,0,0,0,0, 5,10,10,10,10,10,10,5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, 0,0,0,5,5,0,0,0],
  q: [-20,-10,-10,-5,-5,-10,-10,-20, -10,0,0,0,0,0,0,-10, -10,0,5,5,5,5,0,-10, -5,0,5,5,5,5,0,-5, 0,0,5,5,5,5,0,-5, -10,5,5,5,5,5,0,-10, -10,0,5,0,0,0,0,-10, -20,-10,-10,-5,-5,-10,-10,-20],
  k: [-30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -20,-30,-30,-40,-40,-30,-30,-20, -10,-20,-20,-20,-20,-20,-20,-10, 20,20,0,0,0,0,20,20, 20,30,10,0,0,10,30,20],
}
const MATE = 100000

/** Static evaluation from White's point of view (centipawns). */
export function evaluate(game) {
  let score = 0
  const board = game.board()
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const sq = board[r][c]
      if (!sq) continue
      const idx = sq.color === 'w' ? r * 8 + c : (7 - r) * 8 + c
      const v = VAL[sq.type] + PST[sq.type][idx]
      score += sq.color === 'w' ? v : -v
    }
  }
  return score
}

const order = (moves) =>
  moves.sort((a, b) => (b.captured ? VAL[b.captured] * 10 - VAL[b.piece] : 0) + (b.promotion ? 800 : 0)
    - ((a.captured ? VAL[a.captured] * 10 - VAL[a.piece] : 0) + (a.promotion ? 800 : 0)))

export function search(game, depth) {
  let nodes = 0
  const negamax = (d, alpha, beta, ply) => {
    nodes++
    if (game.isCheckmate()) return -MATE + ply
    if (game.isDraw() || game.isStalemate()) return 0
    if (d === 0) return (game.turn() === 'w' ? 1 : -1) * evaluate(game)
    let best = -Infinity
    for (const m of order(game.moves({ verbose: true }))) {
      game.move(m)
      const s = -negamax(d - 1, -beta, -alpha, ply + 1)
      game.undo()
      if (s > best) best = s
      if (s > alpha) alpha = s
      if (alpha >= beta) break
    }
    return best
  }

  const t0 = performance.now()
  let bestMove = null, bestScore = -Infinity
  const moves = order(game.moves({ verbose: true }))
  for (const m of moves) {
    game.move(m)
    const s = -negamax(depth - 1, -Infinity, -bestScore, 1)
    game.undo()
    if (s > bestScore || !bestMove) { bestScore = s; bestMove = m }
  }
  // score reported from White's perspective for the eval bar
  const white = game.turn() === 'w' ? bestScore : -bestScore
  return { move: bestMove, nodes, ms: performance.now() - t0, score: white }
}
