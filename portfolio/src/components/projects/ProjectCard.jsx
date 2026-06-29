import { Link } from 'react-router-dom'
import { getProjectLayoutFromTags, getTagConfig } from '../../utils/tags'
import { prefetchRoute } from '../../hooks/usePrefetch'
import Tag from '../shared/Tag'
import OptimizedImage from '../shared/OptimizedImage'

function EngineTag({ engine }) {
  return (
    <span className="rounded-full border border-accent-cyan/25 bg-accent-cyan/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-accent-cyan uppercase">
      {engine}
    </span>
  )
}

function FeatureList({ features, limit = 3 }) {
  if (!features?.length) return null
  return (
    <ul className="mt-4 space-y-1.5">
      {features.slice(0, limit).map((f) => (
        <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-purple" aria-hidden="true" />
          {f}
        </li>
      ))}
    </ul>
  )
}

function ProjectCardPrimary({ project }) {
  return (
    <Link
      to={`/project/${project.slug}`}
      onMouseEnter={() => prefetchRoute(`/project/${project.slug}`)}
      className="group relative flex min-h-[72svh] w-full overflow-hidden rounded-card border border-border shadow-lg transition-all duration-300 sm:min-h-[80svh] md:min-h-[88svh] md:hover:-translate-y-2 md:hover:border-accent-purple/25 md:hover:shadow-[0_16px_48px_rgb(0_0_0/0.4),0_0_40px_rgb(139_92_246/0.08)]"
    >
      <div className="absolute inset-0">
        <OptimizedImage
          src={project.coverImage}
          alt={project.title}
          className="aspect-video h-full min-h-[72svh] w-full object-cover transition-transform duration-500 sm:min-h-[80svh] md:min-h-[88svh] md:group-hover:scale-[1.02]"
          width={1600}
          height={900}
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-bg-primary/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/85 via-transparent to-transparent md:max-w-[55%]" />

      <div className="relative z-10 mt-auto flex w-full flex-col justify-end p-5 sm:p-6 md:p-14 lg:p-16">
        <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5 sm:gap-3">
          {project.projectType && (
            <span className="text-xs font-medium tracking-widest text-accent-warm uppercase">
              {project.projectType}
            </span>
          )}
          <EngineTag engine={project.engine} />
          {project.tags.map((t) => {
            const cfg = getTagConfig(t)
            return cfg ? <Tag key={t} label={cfg.label} color={cfg.color} /> : null
          })}
          <span className="text-xs tracking-widest text-text-muted uppercase">{project.year}</span>
        </div>

        <h3 className="max-w-3xl font-display text-2xl font-semibold leading-[1.08] text-text-primary sm:text-3xl md:text-6xl lg:text-7xl">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-accent-cyan sm:mt-3 sm:text-base md:text-lg">{project.role}</p>
        <p className="mt-3 max-w-xl text-sm text-text-secondary sm:mt-4 sm:text-base md:text-lg">
          {project.shortDescription}
        </p>

        <FeatureList features={project.features} limit={3} />

        <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent-purple px-5 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 sm:mt-8 sm:gap-3 sm:px-6 sm:py-3.5 sm:text-base md:mt-10 md:px-8 md:py-4 md:group-hover:scale-[1.03] md:group-hover:shadow-[0_0_32px_rgb(139_92_246/0.4)]">
          View Project
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-lg transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  )
}

function ProjectCardSecondary({ project }) {
  return (
    <Link
      to={`/project/${project.slug}`}
      onMouseEnter={() => prefetchRoute(`/project/${project.slug}`)}
      className="group flex min-h-0 flex-col overflow-hidden rounded-card border border-border bg-bg-elevated transition-all duration-300 sm:min-h-[420px] md:hover:-translate-y-2 md:hover:border-accent-purple/20 md:hover:shadow-[0_12px_40px_rgb(0_0_0/0.35),0_0_32px_rgb(139_92_246/0.06)]"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <OptimizedImage
          src={project.thumbnail}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          width={800}
          height={450}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-elevated/90 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {project.projectType && (
            <span className="text-[10px] font-medium tracking-widest text-accent-warm uppercase">
              {project.projectType}
            </span>
          )}
          <EngineTag engine={project.engine} />
          {project.tags.slice(0, 2).map((t) => {
            const cfg = getTagConfig(t)
            return cfg ? <Tag key={t} label={cfg.label} color={cfg.color} /> : null
          })}
        </div>
        <h3 className="font-display text-2xl font-semibold md:text-3xl">{project.title}</h3>
        <p className="mt-2 text-sm text-text-muted">
          {project.role} · {project.year}
        </p>
        <p className="mt-3 text-text-secondary line-clamp-2">{project.shortDescription}</p>
        <FeatureList features={project.features} limit={2} />
        <span className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-accent-purple/40 bg-accent-purple/10 px-6 py-2.5 pt-6 text-sm font-semibold text-accent-purple transition-all duration-300 group-hover:scale-[1.03] group-hover:border-accent-purple group-hover:bg-accent-purple group-hover:text-white group-hover:shadow-[0_0_24px_rgb(139_92_246/0.3)]">
          View Project
          <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </span>
      </div>
    </Link>
  )
}

function ProjectCardCompact({ project }) {
  return (
    <Link
      to={`/project/${project.slug}`}
      onMouseEnter={() => prefetchRoute(`/project/${project.slug}`)}
      className="group flex flex-col gap-4 rounded-card border border-border bg-bg-elevated p-4 transition-all duration-300 sm:flex-row sm:gap-5 sm:p-5 md:hover:-translate-y-1 md:hover:border-accent-cyan/20 md:hover:shadow-lg"
    >
      <div className="aspect-video h-40 w-full shrink-0 overflow-hidden rounded-lg sm:aspect-auto sm:h-28 sm:w-36">
        <OptimizedImage
          src={project.thumbnail}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          width={144}
          height={81}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          {project.projectType && (
            <span className="text-[10px] font-medium tracking-widest text-accent-warm uppercase">
              {project.projectType}
            </span>
          )}
          <EngineTag engine={project.engine} />
        </div>
        <h3 className="font-display text-lg font-semibold text-text-primary">{project.title}</h3>
        <p className="mt-1 text-xs text-text-muted">
          {project.year} · {project.duration}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-text-secondary">{project.shortDescription}</p>
      </div>
    </Link>
  )
}

const CARD_MAP = {
  primary: ProjectCardPrimary,
  secondary: ProjectCardSecondary,
  compact: ProjectCardCompact,
}

export default function ProjectCard({ project }) {
  const variant = getProjectLayoutFromTags(project.tags)
  const Card = CARD_MAP[variant] ?? ProjectCardCompact
  return <Card project={project} />
}
