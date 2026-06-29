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
  { label: 'Unreal Engine', delay: 0 },
  { label: 'Unity', delay: 0.5 },
  { label: 'Gameplay', delay: 1 },
  { label: 'C++', delay: 1.5 },
]

const BADGE_DESKTOP_POSITIONS = [
  'top-[6%] right-[2%]',
  'bottom-[24%] left-[2%]',
  'top-[38%] right-[-2%]',
  'bottom-[10%] right-[8%]',
]

function MobileSkillPills() {
  return (
    <div className="mt-4 flex flex-wrap gap-2 md:hidden" aria-hidden="true">
      {FLOATING_BADGES.map((badge) => (
        <span
          key={badge.label}
          className="rounded-full border border-border bg-bg-elevated/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] text-text-secondary uppercase backdrop-blur-sm"
        >
          {badge.label}
        </span>
      ))}
    </div>
  )
}

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
        className="absolute -top-[10%] -left-[8%] h-[32vh] w-[32vh] rounded-full bg-accent-purple-bright/50 blur-[56px] sm:h-[38vh] sm:w-[38vh] sm:blur-[64px] md:h-[42vh] md:w-[42vh] md:blur-[72px]"
      />
      <div
        ref={orb2Ref}
        className="absolute top-[18%] -right-[6%] h-[28vh] w-[28vh] rounded-full bg-accent-cyan-bright/45 blur-[48px] sm:h-[34vh] sm:w-[34vh] sm:blur-[56px] md:h-[38vh] md:w-[38vh] md:blur-[64px]"
      />
      <div
        ref={orb3Ref}
        className="absolute bottom-[5%] left-[30%] h-[20vh] w-[20vh] rounded-full bg-accent-warm/35 blur-[40px] sm:h-[24vh] sm:w-[24vh] md:h-[28vh] md:w-[28vh] md:blur-[56px]"
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
      duration: 6 + (i % 4) * 2,
      hideOnMobile: i % 2 === 0,
    })),
  ).current

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full bg-accent-cyan-bright animate-pulse ${p.hideOnMobile ? 'hidden sm:block' : ''}`}
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
    <div ref={showcaseRef} className="relative mx-auto w-full max-w-md sm:max-w-lg md:max-w-none" data-hero-parallax>
      {FLOATING_BADGES.map((badge, i) => (
        <FloatingBadge
          key={badge.label}
          label={badge.label}
          className={`hidden md:block ${BADGE_DESKTOP_POSITIONS[i]}`}
          delay={badge.delay}
        />
      ))}

      <div
        ref={imageRevealRef}
        className="relative overflow-hidden rounded-2xl border-glow shadow-2xl sm:rounded-card"
        data-hero-depth="1"
      >
        <div className="aspect-[16/10] w-full overflow-hidden sm:aspect-video">
          <OptimizedImage
            src={featured?.coverImage}
            alt={featured?.title ?? 'Featured project'}
            className="h-full w-full object-cover transition-transform duration-500 md:hover:scale-[1.02]"
            width={1280}
            height={720}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/20 to-transparent sm:from-bg-primary/80 sm:via-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-5 md:p-6">
          <p className="text-[9px] font-medium tracking-[0.18em] text-accent-cyan uppercase sm:text-[10px] sm:tracking-[0.2em]">
            Featured
          </p>
          <p className="mt-0.5 line-clamp-2 font-display text-base font-semibold text-text-primary sm:mt-1 sm:text-lg md:text-xl">
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

function ScrollIndicator({ className = '' }) {
  const { scrollTo } = useLenis()

  return (
    <button
      type="button"
      onClick={() => scrollToSection('#projects', scrollTo)}
      className={`group flex flex-col items-center gap-1.5 text-text-muted transition-colors duration-300 hover:text-accent-cyan sm:gap-2 ${className}`}
      aria-label="Scroll to projects"
    >
      <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
      <span className="flex h-9 w-5 items-start justify-center rounded-full border border-border p-1 sm:h-10 sm:w-6 sm:p-1.5">
        <span className="h-1.5 w-1 animate-bounce rounded-full bg-accent-cyan sm:h-2" />
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
      className="relative overflow-hidden pb-8 pt-[calc(3.75rem+env(safe-area-inset-top,0px))] md:min-h-[100svh] md:flex md:flex-col md:justify-center md:pb-0 lg:pt-20"
    >
      <CinematicBackground sectionRef={sectionRef} />
      <SubtleParticles />

      <div
        ref={containerRef}
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 md:grid-cols-2 md:gap-10 md:px-10 md:py-14 lg:gap-16 lg:py-20"
      >
        <div className="min-w-0">
          <p
            className="mb-3 text-[11px] font-medium tracking-[0.2em] text-accent-cyan uppercase sm:mb-4 sm:text-xs sm:tracking-[0.25em] md:mb-5 md:text-sm"
            data-hero-intro
          >
            {profile.heroIntro}
          </p>

          <h1
            data-hero-headline
            className="hero-headline font-display font-extrabold tracking-tight text-text-primary"
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

          <p
            className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary sm:mt-5 sm:text-base md:mt-8 md:text-lg"
            data-hero-intro
          >
            {profile.heroStatement}
          </p>

          <div
            className="mt-5 flex w-full flex-col gap-2.5 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center sm:mt-6 sm:gap-3 md:mt-8 md:gap-4 lg:mt-10"
            data-hero-intro
          >
            <Button
              className="btn-glow w-full min-[420px]:w-auto"
              onClick={() => scrollToSection('#projects', scrollTo)}
            >
              View Projects
            </Button>
            <Button
              variant="ghost"
              className="w-full min-[420px]:w-auto"
              onClick={() => scrollToSection('#contact', scrollTo)}
            >
              Contact
            </Button>
          </div>

          <div className="mt-5 flex flex-col items-center gap-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between md:mt-8" data-hero-intro>
            <SocialLinks social={profile.social} size="sm" />
            <ScrollIndicator className="md:hidden" />
          </div>
        </div>

        <div className="min-w-0" data-hero-intro>
          <HeroVisual showcaseRef={showcaseRef} />
          <MobileSkillPills />
        </div>
      </div>

      <ScrollIndicator className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 md:bottom-8 md:flex" />
    </section>
  )
}
