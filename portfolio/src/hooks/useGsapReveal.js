import { useEffect, useRef } from 'react'
import { useInView } from './useInView'

export function useGsapReveal(options = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.15, once: true })

  useEffect(() => {
    if (!isInView || !ref.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      ref.current.style.opacity = '1'
      ref.current.style.transform = 'none'
      return
    }

    let ctx
    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const targets = ref.current.querySelectorAll('[data-reveal]')
        const els = targets.length ? targets : [ref.current]

        gsap.fromTo(
          els,
          { opacity: 0, y: options.y ?? 40 },
          {
            opacity: 1,
            y: 0,
            duration: options.duration ?? 0.8,
            stagger: options.stagger ?? 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              once: true,
            },
          },
        )
      }, ref)
    })()

    return () => ctx?.revert()
  }, [isInView, options.duration, options.stagger, options.y])

  return ref
}
