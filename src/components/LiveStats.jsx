import { useState } from 'react'
import Reveal from './Reveal'
import useGithub, { timeAgo } from '../useGithub'
import { GITHUB, GITHUB_USER } from '../data'

export default function LiveStats() {
  const { profile, pushes, leetcode, loaded } = useGithub()
  const [chartOk, setChartOk] = useState(true)

  const tiles = [
    profile && { v: profile.public_repos, l: 'Public repos' },
    profile && { v: profile.followers, l: 'Followers' },
    leetcode && { v: leetcode.total, l: 'LeetCode solved', sub: `${leetcode.easy}E · ${leetcode.medium}M · ${leetcode.hard}H` },
    profile && { v: new Date(profile.created_at).getFullYear(), l: 'Coding on GitHub since' },
  ].filter(Boolean)

  return (
    <section className="sec" id="activity" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <Reveal className="act-head">
          <div>
            <div className="eyebrow"><span className="livepulse" /> Live from GitHub</div>
            <h2 className="h2">Still <span className="r">shipping.</span></h2>
          </div>
          <a className="btn mag" href={GITHUB} target="_blank" rel="noopener noreferrer">@{GITHUB_USER} <span className="ar">↗</span></a>
        </Reveal>

        <div className="act-grid">
          <Reveal className="act-card chart">
            <div className="mono act-lbl">Contributions · last 12 months</div>
            {chartOk ? (
              <div className="chart-scroll">
                <img src={`https://ghchart.rshah.org/ff1e3c/${GITHUB_USER}`} alt={`GitHub contribution chart for ${GITHUB_USER}`} onError={() => setChartOk(false)} loading="lazy" />
              </div>
            ) : (
              <a className="muted-link" href={GITHUB} target="_blank" rel="noopener noreferrer">See the contribution graph on GitHub ↗</a>
            )}
            <div className="tiles">
              {tiles.length > 0 ? tiles.map((t) => (
                <div key={t.l}><b>{t.v}</b><span>{t.l}</span>{t.sub && <em>{t.sub}</em>}</div>
              )) : <div className="muted-link">{loaded ? 'Stats load from the GitHub API when you view the site online.' : 'Loading live stats…'}</div>}
            </div>
          </Reveal>

          <Reveal className="act-card">
            <div className="mono act-lbl">Latest commits</div>
            {pushes && pushes.length > 0 ? (
              <ul className="commits">
                {pushes.map((c, i) => (
                  <li key={i}>
                    <a href={`${GITHUB}/${c.repo}`} target="_blank" rel="noopener noreferrer">
                      <span className="cmsg">{c.msg}</span>
                      <span className="cmeta">{c.repo} · {timeAgo(c.at)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="muted-link">{loaded ? <>No public pushes in the last 90 days. <a href={`${GITHUB}?tab=repositories`} target="_blank" rel="noopener noreferrer">Browse repositories ↗</a></> : 'Loading commits…'}</div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
