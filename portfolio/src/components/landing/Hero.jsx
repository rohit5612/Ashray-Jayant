import { useEffect, useRef } from 'react'
import profile from '../../data/profile'
import projects from '../../data/projects'
import { sortProjects } from '../../utils/sortProjects'
import Button from '../shared/Button'
import SocialLinks from '../shared/SocialLinks'
import OptimizedImage from '../shared/OptimizedImage'
import { scrollToSection } from '../../utils/scroll'
import { useLenis } from '../../hooks/useLenis'
import { useHeroIntro, useHeroMouseParallax } from '../../hooks/useImmersive'
import { getProjectLayoutFromTags } from '../../utils/tags'

const FLOATING_BADGES = [
  { label: 'Unreal Engine', style: 'top-[8%] right-[5%]', delay: 0 },
  { label: 'Unity', style: 'bottom-[28%] left-[-4%]', delay: 0.5 },
  { label: 'Gameplay', style: 'top-[42%] right-[-6%]', delay: 1 },
  { label: 'C++', style: 'bottom-[12%] right-[12%]', delay: 1.5 },
]

function CinematicBackground({ sectionRef }) {
  const bgRef = useRef(null)
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const orb3Ref = useRef(null)

  useEffect(() => {
    const bg = bgRef.current
    const orb1 = orb1Ref.current
    const orb2 = orb2Ref.current
    const orb3 = orb3Ref.current
    const section = sectionRef?.current

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !bg || !orb1 || !orb2) return

    let ctx
    let alive = true

    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!alive || !bgRef.current) return

      ctx = gsap.context(() => {
        gsap.to(orb1, {
          x: 50,
          y: -40,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        gsap.to(orb2, {
          x: -45,
          y: 35,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        if (orb3) {
          gsap.to(orb3, {
            x: 30,
            y: -25,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        }

        if (section) {
          gsap.to(bg, {
            y: 100,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        }
      })
    })()

    return () => {
      alive = false
      ctx?.revert()
    }
  }, [sectionRef])

  return (
    <div ref={bgRef} className="pointer-events-none absolute inset-0 overflow-hidden bg-[#020306]" aria-hidden="true">
      {/* Sharp bright cores — tight blur for harder falloff */}
      <div
        ref={orb1Ref}
        className="absolute -top-[10%] -left-[8%] h-[42vh] w-[42vh] rounded-full bg-accent-purple-bright/50 blur-[72px]"
      />
      <div
        ref={orb2Ref}
        className="absolute top-[18%] -right-[6%] h-[38vh] w-[38vh] rounded-full bg-accent-cyan-bright/45 blur-[64px]"
      />
      <div
        ref={orb3Ref}
        className="absolute bottom-[5%] left-[30%] h-[28vh] w-[28vh] rounded-full bg-accent-warm/35 blur-[56px]"
      />

      {/* High-contrast radial beams — abrupt stops */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_18%_12%,rgb(233_213_255/0.42)_0%,rgb(167_139_250/0.12)_22%,transparent_48%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_82%_45%,rgb(165_243_252/0.38)_0%,rgb(94_234_212/0.1)_20%,transparent_46%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_25%_at_55%_85%,rgb(251_191_36/0.22)_0%,transparent_42%)]" />

      {/* Diagonal light slice */}
      <div className="absolute inset-0 bg-[linear-gradient(128deg,transparent_38%,rgb(233_213_255/0.06)_49%,rgb(165_243_252/0.08)_51%,transparent_62%)]" />

      {/* Deep vignette — near-black edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030508_55%,#000000_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#000000/0.5_0%,transparent_35%,transparent_65%,#000000/0.7_100%)]" />
      <div className="hero-noise absolute inset-0 opacity-[0.04]" />
    </div>
  )
}

function SubtleParticles() {
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${8 + ((i * 17) % 84)}%`,
      top: `${5 + ((i * 23) % 90)}%`,
      size: i % 3 === 0 ? 2 : 1.5,
      opacity: 0.15 + (i % 5) * 0.05,
      duration: 6 + (i % 4) * 2,
    })),
  ).current

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-accent-cyan-bright animate-pulse"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: 0.25 + (p.id % 4) * 0.1,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

function FloatingBadge({ label, className, delay = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let tween
    ;(async () => {
      const { gsap } = await import('gsap')
      tween = gsap.to(el, {
        y: -12,
        duration: 3 + delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
      })
    })()

    return () => tween?.kill()
  }, [delay])

  return (
    <span
      ref={ref}
      className={`absolute z-20 rounded-full border border-border bg-bg-elevated/90 px-3 py-1.5 text-[10px] font-medium tracking-[0.15em] text-text-secondary uppercase backdrop-blur-sm md:px-4 md:py-2 md:text-xs ${className}`}
    >
      {label}
    </span>
  )
}

function HeroVisual({ showcaseRef }) {
  const sorted = sortProjects(projects)
  const featured = sorted.find((p) => getProjectLayoutFromTags(p.tags) === 'primary') ?? sorted[0]
  const miniProjects = sorted.filter((p) => p.id !== featured?.id).slice(0, 2)
  const imageRevealRef = useRef(null)

  useEffect(() => {
    const el = imageRevealRef.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let ctx
    ;(async () => {
      const { gsap } = await import('gsap')
      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.92, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'power3.out', delay: 0.5 },
        )
      })
    })()

    return () => ctx?.revert()
  }, [])

  return (
    <div ref={showcaseRef} className="relative mx-auto w-full max-w-lg lg:max-w-none" data-hero-parallax>
      {FLOATING_BADGES.map((badge) => (
        <FloatingBadge
          key={badge.label}
          label={badge.label}
          className={badge.style}
          delay={badge.delay}
        />
      ))}

      <div
        ref={imageRevealRef}
        className="relative overflow-hidden rounded-card border-glow shadow-2xl"
        data-hero-depth="1"
      >
        <div className="aspect-video w-full overflow-hidden">
          <OptimizedImage
            src={featured?.coverImage}
            alt={featured?.title ?? 'Featured project'}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            width={1280}
            height={720}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <p className="text-[10px] font-medium tracking-[0.2em] text-accent-cyan uppercase">
            Featured
          </p>
          <p className="mt-1 font-display text-lg font-semibold text-text-primary md:text-xl">
            {featured?.title}
          </p>
        </div>
      </div>

      {miniProjects.map((project, i) => (
        <div
          key={project.id}
          className={`absolute z-10 hidden overflow-hidden rounded-xl border border-border bg-bg-elevated/95 shadow-lg backdrop-blur-sm md:block ${
            i === 0 ? '-bottom-6 -left-8 w-36' : '-top-4 -right-6 w-32'
          }`}
          data-hero-depth={i === 0 ? '0.6' : '0.8'}
        >
          <OptimizedImage
            src={project.thumbnail}
            alt={project.title}
            className="aspect-video w-full object-cover"
            width={160}
            height={90}
          />
          <p className="truncate px-2 py-1.5 text-[10px] font-medium text-text-secondary">
            {project.title}
          </p>
        </div>
      ))}
    </div>
  )
}

function ScrollIndicator() {
  const { scrollTo } = useLenis()

  return (
    <button
      type="button"
      onClick={() => scrollToSection('#projects', scrollTo)}
      className="group absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-text-muted transition-colors duration-300 hover:text-accent-cyan"
      aria-label="Scroll to projects"
    >
      <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
      <span className="flex h-10 w-6 items-start justify-center rounded-full border border-border p-1.5">
        <span className="h-2 w-1 animate-bounce rounded-full bg-accent-cyan" />
      </span>
    </button>
  )
}

export function Hero() {
  const { scrollTo } = useLenis()
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const showcaseRef = useRef(null)

  useHeroIntro(containerRef)
  useHeroMouseParallax(sectionRef, showcaseRef)

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-20"
    >
      <CinematicBackground sectionRef={sectionRef} />
      <SubtleParticles />

      <div
        ref={containerRef}
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-12 md:px-10 lg:grid-cols-2 lg:gap-16 lg:py-20"
      >
        <div className="order-2 lg:order-1">
          <p
            className="mb-5 text-xs font-medium tracking-[0.25em] text-accent-cyan uppercase md:text-sm"
            data-hero-intro
          >
            {profile.heroIntro}
          </p>

          <h1
            data-hero-headline
            className="font-display text-[2.75rem] leading-[0.92] font-extrabold tracking-tight text-text-primary sm:text-6xl md:text-7xl lg:text-[5.25rem]"
          >
            {profile.heroHeadline.map((line) => (
              <span key={line.text} className="block" data-hero-intro>
                {line.highlight ? (
                  <span className="text-gradient-cyan">{line.text}</span>
                ) : (
                  line.text
                )}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary md:mt-8 md:text-lg" data-hero-intro>
            {profile.heroStatement}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 md:mt-10" data-hero-intro>
            <Button
              className="btn-glow"
              onClick={() => scrollToSection('#projects', scrollTo)}
            >
              View Projects
            </Button>
            <Button variant="ghost" onClick={() => scrollToSection('#contact', scrollTo)}>
              Contact
            </Button>
          </div>

          <div data-hero-intro>
            <SocialLinks social={profile.social} className="mt-8" size="sm" />
          </div>
        </div>

        <div className="order-1 lg:order-2" data-hero-intro>
          <HeroVisual showcaseRef={showcaseRef} />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
