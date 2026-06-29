import { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import profile from '../../data/profile'
import projects from '../../data/projects'
import { sortProjects } from '../../utils/sortProjects'
import SocialLinks from '../shared/SocialLinks'
import OptimizedImage from '../shared/OptimizedImage'
import { scrollToSection } from '../../utils/scroll'
import { useLenis } from '../../hooks/useLenis'
import { useHeroIntro } from '../../hooks/useImmersive'
import { getProjectLayoutFromTags } from '../../utils/tags'

function HeroEnvironment({ sectionRef }) {
  const bgRef = useRef(null)

  useEffect(() => {
    const bg = bgRef.current
    const section = sectionRef?.current
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !bg || !section) return

    let ctx
    let alive = true

    ;(async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      if (!alive) return

      ctx = gsap.context(() => {
        gsap.to(bg, {
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    })()

    return () => {
      alive = false
      ctx?.revert()
    }
  }, [sectionRef])

  return (
    <div ref={bgRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hero-arena absolute inset-0" />
      <div className="hero-bg-glow absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020204_70%,#000_100%)]" />
      <div className="hero-noise absolute inset-0 opacity-[0.03]" />
    </div>
  )
}

function HeroPortraitShowcase() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (prefersReduced || coarse) return

    let ctx
    ;(async () => {
      const { gsap } = await import('gsap')
      ctx = gsap.context(() => {
        gsap.fromTo(el, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.25 })
      })
    })()
    return () => ctx?.revert()
  }, [])

  return (
    <div className="hero-portrait-showcase pb-12 lg:h-full lg:pb-14" data-hero-intro>
      <div ref={ref} className="hero-portrait-oval">
        <OptimizedImage
          src={profile.avatar}
          alt={`Portrait of ${profile.name}`}
          className="h-full w-full"
          imgClassName="object-cover object-[center_18%] contrast-[1.04] saturate-[0.92]"
          width={520}
          height={650}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/30 via-transparent to-transparent" />
        <span className="hero-portrait-ring" aria-hidden="true" />
      </div>

      <div className="absolute -bottom-1 left-1/2 w-max -translate-x-1/2 rounded-full border border-border/80 bg-bg-primary/90 px-4 py-2 backdrop-blur-md lg:bottom-2">
        <p className="text-center font-display text-sm font-semibold text-text-primary">{profile.name}</p>
        <p className="text-center text-[10px] tracking-[0.22em] text-accent-warm uppercase">{profile.gamertag}</p>
      </div>
    </div>
  )
}

function HeroStats({ stats }) {
  return (
    <ul className="flex flex-row flex-wrap justify-center gap-x-6 gap-y-1 lg:flex-col lg:justify-start lg:gap-0" data-hero-intro>
      {stats.map((stat) => (
        <li key={stat.label} className="hero-stat min-w-[calc(50%-0.75rem)] lg:min-w-0">
          <span className="text-[10px] font-medium tracking-[0.24em] text-text-muted uppercase">{stat.label}</span>
          <span className="hero-stat__value">{stat.value}</span>
        </li>
      ))}
    </ul>
  )
}

function HeroProjectHints({ previewProjects }) {
  if (!previewProjects.length) return null

  return (
    <div className="w-full max-w-sm space-y-2.5 lg:max-w-none" data-hero-intro>
      <p className="text-[10px] font-medium tracking-[0.24em] text-text-muted uppercase">Recent builds</p>
      <div className="flex flex-col gap-2">
        {previewProjects.map((project) => (
          <Link key={project.slug} to={`/project/${project.slug}`} className="group hero-project-hint">
            <div className="hero-project-hint__thumb">
              <OptimizedImage
                src={project.thumbnail}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500"
                width={64}
                height={48}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-semibold text-text-primary transition-colors group-hover:text-accent-warm">
                {project.title}
              </p>
              <p className="text-[11px] text-text-muted">
                {project.engine} · {project.projectType}
              </p>
            </div>
            <span className="shrink-0 pr-1 text-sm text-text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent-warm" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function CircleCta({ onClick }) {
  return (
    <button type="button" onClick={onClick} className="hero-circle-cta" data-hero-intro aria-label={profile.heroCircleCta.label}>
      <span className="flex max-w-[4.5rem] flex-col items-center gap-0.5 text-center">
        <span className="text-[9px] tracking-[0.2em] text-text-muted uppercase">{profile.heroCircleCta.eyebrow}</span>
        <span className="font-display text-xs font-semibold leading-tight sm:text-sm">{profile.heroCircleCta.label}</span>
      </span>
      <span className="hero-circle-cta__arrow" aria-hidden="true">↗</span>
    </button>
  )
}

function ScrollCue({ className = '' }) {
  const { scrollTo } = useLenis()

  return (
    <button
      type="button"
      onClick={() => scrollToSection('#projects', scrollTo)}
      className={`group flex items-center gap-3 text-text-muted transition-colors hover:text-accent-warm ${className}`}
      aria-label="Scroll to projects"
    >
      <span className="text-[10px] tracking-[0.28em] uppercase">Scroll</span>
      <span className="flex h-9 w-5 items-start justify-center border border-border p-1">
        <span className="h-1.5 w-px animate-bounce bg-accent-warm" />
      </span>
    </button>
  )
}

function buildHeroStats(projectList) {
  const jamCount = projectList.filter((p) => p.tags?.includes('GAME_JAM')).length

  return [
    { label: 'Projects Built', value: `${projectList.length}+` },
    { label: 'Primary Focus', value: 'Gameplay' },
    { label: 'Game Jams', value: jamCount > 0 ? `${jamCount}` : '—' },
    { label: 'Availability', value: profile.heroStatus.split(' ')[0] },
  ]
}

export function Hero() {
  const { scrollTo } = useLenis()
  const sectionRef = useRef(null)
  const containerRef = useRef(null)

  const sorted = sortProjects(projects)
  const previewProjects = useMemo(() => {
    const primary = sorted.find((p) => getProjectLayoutFromTags(p.tags) === 'primary')
    const secondary = sorted.find(
      (p) => p !== primary && getProjectLayoutFromTags(p.tags) === 'secondary',
    )
    return [primary, secondary].filter(Boolean).slice(0, 2)
  }, [sorted])

  const stats = useMemo(() => buildHeroStats(projects), [])

  useHeroIntro(containerRef)

  const goToProjects = () => scrollToSection('#projects', scrollTo)
  const goToContact = () => scrollToSection('#contact', scrollTo)

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-arena hero-viewport relative min-h-[100svh] overflow-hidden pt-[calc(3.75rem+env(safe-area-inset-top,0px))]"
    >
      <HeroEnvironment sectionRef={sectionRef} />

      <div
        ref={containerRef}
        className="hero-viewport__inner relative z-10 mx-auto flex min-h-[calc(100svh-3.75rem)] max-w-7xl flex-col px-4 sm:px-6 md:px-10 lg:min-h-0 lg:px-8 lg:pb-5 lg:pt-2 xl:px-10 xl:pb-6"
      >
        {/* Main three-column body; on mobile, copy splits above/below centered portrait */}
        <div className="grid min-h-0 flex-1 gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.95fr)] lg:items-center lg:gap-6 xl:gap-10">
          {/* Left — copy & CTA (contents on mobile so children reorder around portrait) */}
          <div className="contents lg:flex lg:min-h-0 lg:flex-col lg:justify-center lg:max-w-md xl:max-w-lg">
            <div className="relative z-20 order-1 flex flex-col items-center text-center lg:order-none lg:items-start lg:text-left">
              <p className="text-[11px] font-medium tracking-[0.3em] text-text-muted uppercase" data-hero-intro>
                {profile.heroEyebrow}
              </p>

              <h1 data-hero-headline className="hero-headline mt-3 text-text-primary sm:mt-4">
                <span className="hero-headline--primary block">
                  <span className="text-gradient-warm">{profile.heroHeadline.primary}</span>
                </span>
                <span className="hero-headline--accent block">{profile.heroHeadline.accent}</span>
              </h1>

              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-5 lg:justify-start" data-hero-intro>
                {profile.heroTags.map((tag) => (
                  <span key={tag} className="hero-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-20 order-3 flex flex-col items-center text-center lg:order-none lg:items-start lg:text-left">
              <p className="mt-0 max-w-md text-sm leading-relaxed text-text-secondary sm:text-base lg:mt-4 lg:text-[0.9375rem] xl:mt-5 xl:text-base" data-hero-intro>
                {profile.heroStatement}
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-4 sm:mt-6 lg:mt-5 lg:justify-start xl:mt-6" data-hero-intro>
                <button type="button" className="hero-cta-primary" onClick={goToContact}>
                  Get in Touch
                </button>
                <CircleCta onClick={goToProjects} />
              </div>

              <div className="mt-5 flex items-center justify-center gap-2 sm:mt-6 lg:hidden" data-hero-intro>
                <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-accent-warm uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-warm shadow-[0_0_8px_rgb(251_191_36/0.8)]" />
                  {profile.heroStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Center — portrait showcase */}
          <div className="relative order-2 flex items-center justify-center lg:order-none lg:px-2 xl:px-4">
            <HeroPortraitShowcase />
          </div>

          {/* Right — stats & project hints */}
          <div className="order-4 flex min-h-0 flex-col items-center justify-center gap-5 text-center lg:order-none lg:max-w-xs lg:items-start lg:text-left lg:gap-6 xl:max-w-sm xl:gap-7">
            <HeroStats stats={stats} />
            <HeroProjectHints previewProjects={previewProjects} />
          </div>
        </div>

        {/* Footer bar */}
        <div className="mt-8 flex shrink-0 flex-col items-start justify-between gap-4 border-t border-border/50 pt-5 sm:flex-row sm:items-center lg:mt-4 lg:pt-4 xl:mt-5" data-hero-intro>
          <p className="max-w-sm text-sm text-text-secondary lg:text-[0.9375rem]">
            {profile.heroTagline}
          </p>

          <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
            <ScrollCue className="lg:hidden" />
            <SocialLinks social={profile.social} size="sm" />
          </div>
        </div>
      </div>
    </section>
  )
}
