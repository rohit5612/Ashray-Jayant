import contact from '../../data/contact'
import profile from '../../data/profile'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import SectionShell from '../layout/SectionShell'
import ContactForm from './ContactForm'
import SocialLinks from '../shared/SocialLinks'

export default function ContactSection() {
  const ref = useGsapReveal()

  return (
    <SectionShell
      id="contact"
      className="relative overflow-hidden bg-bg-secondary"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgb(139_92_246/0.08)_0%,transparent_60%)]"
        aria-hidden="true"
      />

      <div ref={ref} className="relative mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium tracking-[0.3em] text-accent-cyan uppercase" data-reveal>
          Contact
        </p>
        <h2
          className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl lg:text-7xl"
          data-reveal
        >
          {contact.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-text-secondary md:text-lg" data-reveal>
          {contact.subtext}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4" data-reveal>
          <SocialLinks social={profile.social} />
          {contact.resumeUrl && (
            <a
              href={contact.resumeUrl}
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-medium text-text-secondary transition-all duration-300 hover:scale-[1.03] hover:border-accent-purple/40 hover:text-text-primary hover:shadow-[0_0_24px_rgb(139_92_246/0.2)]"
            >
              Download Resume
            </a>
          )}
        </div>

        <div
          className="mt-14 rounded-card border border-border bg-bg-elevated p-6 text-left shadow-lg md:mt-16 md:p-8"
          data-reveal
        >
          <ContactForm />
        </div>

        <p className="mt-10 text-xs text-text-muted" data-reveal>
          {profile.name} · {profile.gamertag}
        </p>
      </div>
    </SectionShell>
  )
}
