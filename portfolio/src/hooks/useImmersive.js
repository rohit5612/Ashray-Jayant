import { useEffect } from 'react'

export function useHeroIntro(containerRef) {
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let ctx
    ;(async () => {
      const { gsap } = await import('gsap')
      const targets = el.querySelectorAll('[data-hero-intro]')
      if (!targets.length) return

      ctx = gsap.context(() => {
        gsap.set(targets, { opacity: 0, y: 50 })
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.1,
        })

        const headline = el.querySelector('[data-hero-headline]')
        if (headline) {
          const lines = headline.querySelectorAll('span.block')
          gsap.set(lines, { opacity: 0, y: 30 })
          gsap.to(lines, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power4.out',
            delay: 0.15,
          })
        }
      }, el)
    })()

    return () => ctx?.revert()
  }, [containerRef])
}

export function useHeroMouseParallax(sectionRef, showcaseRef) {
  useEffect(() => {
    const section = sectionRef.current
    const showcase = showcaseRef.current
    if (!section || !showcase) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (prefersReduced || coarsePointer) return

    const depthEls = showcase.querySelectorAll('[data-hero-depth]')
    let rafId = null
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const onMove = (e) => {
      const rect = section.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      targetX = x
      targetY = y
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06

      showcase.style.transform = `perspective(1200px) rotateY(${currentX * 4}deg) rotateX(${-currentY * 4}deg)`

      depthEls.forEach((el) => {
        const depth = parseFloat(el.dataset.heroDepth || '1')
        el.style.transform = `translate(${currentX * 18 * depth}px, ${currentY * 14 * depth}px)`
      })

      rafId = requestAnimationFrame(animate)
    }

    section.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      section.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      showcase.style.transform = ''
      depthEls.forEach((el) => {
        el.style.transform = ''
      })
    }
  }, [sectionRef, showcaseRef])
}

export function useParallax(ref, { speed = 0.15 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let ctx
    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.to(el, {
          y: () => speed * 120,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    })()

    return () => ctx?.revert()
  }, [ref, speed])
}

export function useImageReveal(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let ctx
    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const img = el.querySelector('img')
      if (!img) return

      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          },
        )
        gsap.fromTo(
          img,
          { scale: 1.15 },
          {
            scale: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          },
        )
      })
    })()

    return () => ctx?.revert()
  }, [ref])
}
