import profile from '../../data/profile'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import SectionShell from '../layout/SectionShell'
import SectionLabel from '../shared/SectionLabel'

const ACCENT_CLASS = {
  purple: 'skill-card-purple',
  cyan: 'skill-card-cyan',
  warm: 'skill-card-warm',
  violet: 'skill-card-violet',
  neutral: 'skill-card-neutral',
}

const LEGEND_COLORS = {
  purple: 'rgb(233 213 255 / 0.9)',
  cyan: 'rgb(165 243 252 / 0.9)',
  warm: 'rgb(253 224 71 / 0.9)',
  neutral: 'rgb(203 213 225 / 0.9)',
}

const LEGEND_LABELS = {
  purple: 'Engines',
  cyan: 'Languages',
  warm: 'Systems',
  neutral: 'Tools',
}

function buildLegend(skills) {
  const groups = { purple: 0, cyan: 0, warm: 0, neutral: 0 }
  for (const skill of skills) {
    const key = skill.accent === 'violet' ? 'warm' : skill.accent
    if (groups[key] !== undefined) groups[key] += 1
  }
  return Object.entries(groups)
    .filter(([, count]) => count > 0)
    .map(([accent, count]) => ({ accent, count, label: LEGEND_LABELS[accent] }))
}

function SkillCard({ skill }) {
  const accentClass = ACCENT_CLASS[skill.accent] ?? ACCENT_CLASS.neutral

  return (
    <div className={`skill-card ${accentClass} group`} data-reveal>
      <span className="skill-card-icon transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
        {skill.emoji}
      </span>
      <span className="min-w-0 truncate text-sm font-medium text-text-primary">{skill.label}</span>
    </div>
  )
}

function LegendDot({ accent }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 rounded-full"
      style={{ background: LEGEND_COLORS[accent] ?? LEGEND_COLORS.neutral }}
      aria-hidden="true"
    />
  )
}

export default function SkillsSection() {
  const ref = useGsapReveal({ stagger: 0.05, y: 20 })
  const legend = buildLegend(profile.skills)

  return (
    <SectionShell id="skills" className="relative overflow-hidden bg-bg-secondary">
      {/* Atmospheric bg */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-1/4 -left-1/4 h-[50vh] w-[50vh] rounded-full bg-accent-purple-bright/8 blur-[100px]" />
        <div className="absolute -right-1/4 -bottom-1/4 h-[45vh] w-[45vh] rounded-full bg-accent-cyan-bright/6 blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgb(255 255 255 / 0.5) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <span className="fade-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6rem] sm:text-[10rem] md:text-[18rem]">
          SKILL
        </span>
      </div>

      <div ref={ref} className="relative">
        <SectionLabel className="text-accent-purple" data-reveal>
          Toolkit
        </SectionLabel>
        <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl" data-reveal>
          Skills
        </h2>
        <p className="mt-4 max-w-2xl text-text-secondary md:text-lg" data-reveal>
          Engines, languages, and systems I use to build playable experiences.
        </p>

        <div className="gradient-separator mt-8 max-w-md" data-reveal />

        {/* Compact legend row */}
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2" data-reveal>
          {legend.map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-text-muted uppercase"
            >
              <LegendDot accent={item.accent} />
              {item.label}
              <span className="text-[10px] text-text-muted/60">· {item.count}</span>
            </span>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-10 lg:grid-cols-3">
          {profile.skills.map((skill) => (
            <SkillCard key={skill.label} skill={skill} />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
