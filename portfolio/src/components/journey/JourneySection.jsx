import { getTagConfig } from '../../utils/tags'
import journey from '../../data/journey'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import SectionShell from '../layout/SectionShell'

const BG_WORDS = ['BUILD', 'PLAY', 'ITERATE']

function MilestoneNode({ milestone, isLast }) {
  const isJam = milestone.tags?.includes('GAME_JAM')

  return (
    <div className="relative flex gap-8 pb-16" data-reveal>
      {!isLast && (
        <div
          className="absolute top-3 left-[7px] h-full w-px bg-gradient-to-b from-accent-purple/60 via-accent-cyan/40 to-transparent"
          aria-hidden="true"
        />
      )}
      <div
        className={`relative z-10 mt-1 h-4 w-4 shrink-0 rounded-full border-2 transition-shadow duration-300 hover:shadow-[0_0_12px_rgb(34_211_238/0.4)] ${
          isJam
            ? 'border-accent-purple bg-accent-purple/30'
            : 'border-accent-cyan bg-accent-cyan/20'
        }`}
      />
      <div className="rounded-card border border-border bg-bg-elevated/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-purple/20 hover:shadow-lg md:p-6">
        <span className="text-xs font-medium tracking-widest text-accent-cyan uppercase">
          {milestone.year}
        </span>
        <h3 className="mt-2 font-display text-xl font-semibold">{milestone.title}</h3>
        <p className="mt-2 max-w-lg text-text-secondary">{milestone.description}</p>
        {milestone.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {milestone.tags.map((t) => {
              const cfg = getTagConfig(t)
              return cfg ? (
                <span
                  key={t}
                  className="rounded-full border border-border bg-bg-secondary px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-text-muted uppercase"
                >
                  {cfg.label}
                </span>
              ) : null
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default function JourneySection() {
  const ref = useGsapReveal({ stagger: 0.1, y: 30 })

  return (
    <SectionShell id="journey" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {BG_WORDS.map((word, i) => (
          <span
            key={word}
            className="fade-bg-text absolute font-display text-[8rem] font-extrabold md:text-[12rem]"
            style={{
              top: `${15 + i * 28}%`,
              left: i % 2 === 0 ? '-2%' : 'auto',
              right: i % 2 === 1 ? '-2%' : 'auto',
            }}
          >
            {word}
          </span>
        ))}
      </div>

      <div ref={ref} className="relative">
        <p className="text-sm font-medium tracking-[0.3em] text-accent-cyan uppercase" data-reveal>
          Growth
        </p>
        <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl" data-reveal>
          Journey
        </h2>
        <p className="mt-4 max-w-2xl text-text-secondary" data-reveal>
          From first lines of code to gameplay systems — documenting the path forward.
        </p>

        <div className="relative mt-16 max-w-2xl">
          <div
            className="absolute top-0 bottom-0 left-[7px] w-px bg-accent-purple/20"
            aria-hidden="true"
          />
          {journey.map((milestone, i) => (
            <MilestoneNode
              key={milestone.id}
              milestone={milestone}
              isLast={i === journey.length - 1}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
