import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Returns [ref, state] where state is 'in' once the element scrolls into view.
 *  Elements already on screen at load start visible (no flash). */
export function useReveal() {
  const ref = useRef(null)
  const [state, setState] = useState('init')
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion() || el.getBoundingClientRect().top < window.innerHeight) { setState('in'); return }
    setState('pre')
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setState('in'); io.disconnect() }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, state]
}

/** Runs a callback on every animation-frame-throttled scroll. */
export function useScroll(fn) {
  const fnRef = useRef(fn)
  fnRef.current = fn
  useEffect(() => {
    let raf = 0
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => fnRef.current()) }
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    fnRef.current()
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
}
