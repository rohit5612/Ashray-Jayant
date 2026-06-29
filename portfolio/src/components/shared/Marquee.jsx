import { useEffect, useRef } from 'react'

export default function Marquee({ items, speed = 40 }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !trackRef.current) return

    let ctx
    ;(async () => {
      const { gsap } = await import('gsap')
      const track = trackRef.current
      const width = track.scrollWidth / 2

      ctx = gsap.context(() => {
        gsap.to(track, {
          x: -width,
          duration: speed,
          ease: 'none',
          repeat: -1,
        })
      })
    })()

    return () => ctx?.revert()
  }, [speed, items])

  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden border-y border-border py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg-primary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg-primary to-transparent" />
      <div ref={trackRef} className="flex w-max gap-4 px-4">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 rounded-full border border-border bg-bg-elevated px-5 py-2 text-sm text-text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
