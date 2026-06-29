import { useRef } from 'react'
import profile from '../../data/profile'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import { useImageReveal, useParallax } from '../../hooks/useImmersive'
import SectionShell from '../layout/SectionShell'
import SectionLabel from '../shared/SectionLabel'
import OptimizedImage from '../shared/OptimizedImage'

export default function AboutSection() {
  const ref = useGsapReveal({ stagger: 0.1, y: 35 })
  const imageRef = useRef(null)
  const imageWrapRef = useRef(null)

  useImageReveal(imageWrapRef)
  useParallax(imageRef, { speed: 0.2 })

  const { about } = profile

  return (
    <SectionShell id="about" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end overflow-hidden pr-0 md:pr-10" aria-hidden="true">
        <span className="fade-bg-text text-right text-[10rem] md:text-[16rem]">
          {about.bgWord}
        </span>
      </div>

      <div ref={ref} className="relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5" data-reveal>
          <div
            ref={imageWrapRef}
            className="relative overflow-hidden rounded-card border border-border shadow-lg"
            style={{ boxShadow: '0 0 48px rgb(139 92 246 / 0.12), 0 8px 32px rgb(0 0 0 / 0.4)' }}
          >
            <div ref={imageRef}>
              <OptimizedImage
                src={profile.avatar}
                alt={`Portrait of ${profile.name}`}
                className="aspect-[4/5] w-full"
                width={400}
                height={500}
                priority
              />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-card ring-1 ring-inset ring-white/10" />
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-text-muted">
            <span className="rounded-full border border-border px-3 py-1">{about.location}</span>
            <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-accent-cyan">
              {about.availability}
            </span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <SectionLabel data-reveal>{about.eyebrow}</SectionLabel>
          <h2
            className="mt-4 font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl"
            data-reveal
          >
            {about.headline}
          </h2>

          <div className="gradient-separator my-8 w-full max-w-md" data-reveal />

          <div className="space-y-5">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-lg leading-relaxed text-text-secondary" data-reveal>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
