import { useEffect, useState } from 'react'
import { GITHUB_USER, LEETCODE_USER } from './data'

// One shared request per page load; every component reads the same promise.
let cache = null
const getJSON = (url) => fetch(url).then((r) => (r.ok ? r.json() : Promise.reject(r.status)))

function load() {
  if (cache) return cache
  const profile = getJSON(`https://api.github.com/users/${GITHUB_USER}`).catch(() => null)
  const events = getJSON(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=40`)
    .then((evs) => {
      const pushes = []
      for (const e of evs) {
        if (e.type !== 'PushEvent') continue
        for (const c of e.payload.commits || []) {
          pushes.push({ repo: e.repo.name.split('/')[1], msg: c.message.split('\n')[0], at: e.created_at })
        }
      }
      return pushes.slice(0, 5)
    })
    .catch(() => null)
  const leetcode = LEETCODE_USER
    ? getJSON(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USER}/solved`)
        .then((d) => ({ total: d.solvedProblem, easy: d.easySolved, medium: d.mediumSolved, hard: d.hardSolved }))
        .catch(() => null)
    : Promise.resolve(null)
  cache = Promise.all([profile, events, leetcode]).then(([profile, pushes, leetcode]) => ({ profile, pushes, leetcode }))
  return cache
}

export default function useGithub() {
  const [data, setData] = useState({ profile: null, pushes: null, leetcode: null, loaded: false })
  useEffect(() => {
    let alive = true
    load().then((d) => alive && setData({ ...d, loaded: true }))
    return () => { alive = false }
  }, [])
  return data
}

export function timeAgo(iso) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000
  const units = [[31536000, 'y'], [2592000, 'mo'], [604800, 'w'], [86400, 'd'], [3600, 'h'], [60, 'm']]
  for (const [sec, u] of units) if (s >= sec) return Math.floor(s / sec) + u + ' ago'
  return 'just now'
}
