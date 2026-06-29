import { Link, useParams, Navigate } from 'react-router-dom'
import projects, { getProjectBySlug } from '../data/projects'
import { getAdjacentProjects } from '../utils/sortProjects'
import { getTagConfig } from '../utils/tags'
import OptimizedImage from '../components/shared/OptimizedImage'
import LazyVideo from '../components/shared/LazyVideo'
import Tag from '../components/shared/Tag'
import ProjectBand from '../components/projects/detail/ProjectBand'
import ProjectSectionHeader from '../components/projects/detail/ProjectSectionHeader'
import ProjectMetaStrip from '../components/projects/detail/ProjectMetaStrip'

const bandPad = 'py-12 md:py-16'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <Navigate to="/404" replace />
  }

  const { prev, next } = getAdjacentProjects(projects, slug)
  const hasLinks = Object.keys(project.links).length > 0

  return (
    <article>
      {/* Hero */}
      <header className="relative min-h-[55svh] pt-24">
        <div className="absolute inset-0">
          <OptimizedImage
            src={project.coverImage}
            alt=""
            className="h-full min-h-[55svh] object-cover"
            width={1600}
            height={900}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/75 to-bg-primary/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/90 via-bg-primary/45 to-transparent md:max-w-[65%]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(55svh-6rem)] max-w-7xl flex-col justify-end px-6 pb-8 md:px-10 md:pb-10">
          <Link
            to="/#projects"
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-bg-elevated/90 px-4 py-2 text-sm text-text-muted backdrop-blur-sm transition-colors hover:border-accent-cyan/40 hover:text-accent-cyan"
          >
            ← All Projects
          </Link>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => {
              const cfg = getTagConfig(t)
              return cfg ? <Tag key={t} label={cfg.label} color={cfg.color} /> : null
            })}
          </div>

          <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.05] md:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-2 text-lg text-accent-cyan">{project.subtitle}</p>
        </div>
      </header>

      {/* 01 — Overview + role */}
      <ProjectBand variant="light" className={bandPad}>
        <div className="mx-auto max-w-7xl space-y-10 px-6 md:space-y-12 md:px-10">
          <div>
            <ProjectSectionHeader
              index="01"
              label="Overview"
              title="Project story"
              description={project.fullDescription}
              compact
            />
            <ProjectMetaStrip project={project} />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-bg-elevated p-6 md:p-7">
              <h3 className="font-display text-lg font-semibold">My role</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
                {project.role}
              </p>
            </div>
            <div className="rounded-xl border border-accent-violet/20 bg-accent-violet/5 p-6 md:p-7">
              <h3 className="font-display text-lg font-semibold">What I built</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
                {project.contribution}
              </p>
            </div>
          </div>
        </div>
      </ProjectBand>

      {/* 02 — Gameplay + gallery */}
      <ProjectBand variant="muted" className={bandPad}>
        <div className="mx-auto max-w-7xl space-y-10 px-6 md:px-10">
          <div>
            <ProjectSectionHeader index="02" label="Media" title="Gameplay & gallery" compact />
            <div className="overflow-hidden rounded-xl border border-border bg-bg-elevated p-1.5 shadow-md">
              <LazyVideo
                src={project.video}
                poster={project.coverImage}
                title={`${project.title} gameplay`}
                className="rounded-lg"
              />
            </div>
          </div>

          {project.gallery?.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-xl border border-border shadow-sm ${
                    i === 0 && project.gallery.length > 1 ? 'md:col-span-2' : ''
                  }`}
                >
                  <OptimizedImage
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    width={1200}
                    height={675}
                    className={i === 0 && project.gallery.length > 1 ? 'aspect-[21/9]' : ''}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </ProjectBand>

      {/* 03 — Features */}
      <ProjectBand variant="light" className={bandPad}>
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <ProjectSectionHeader index="03" label="Systems" title="Key features" compact />
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.features.map((feature, i) => (
              <li
                key={feature}
                className="flex gap-4 rounded-xl border border-border bg-bg-elevated p-4 md:p-5"
              >
                <span className="font-display text-2xl font-bold leading-none text-accent-cyan/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm leading-relaxed text-text-muted md:text-base">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      </ProjectBand>

      {/* 04 — Reflection + tech + links */}
      <ProjectBand variant="dark" className={bandPad}>
        <div className="mx-auto max-w-7xl space-y-10 px-6 md:px-10">
          <ProjectSectionHeader
            index="04"
            label="Wrap-up"
            title="Reflection & stack"
            dark
            compact
          />

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-display text-base font-semibold text-white">Challenges</h3>
              <ul className="mt-4 space-y-2.5">
                {project.challenges?.map((c) => (
                  <li key={c} className="flex gap-2 text-sm text-white/75">
                    <span className="text-accent-cyan">—</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-display text-base font-semibold text-white">Lessons learned</h3>
              <ul className="mt-4 space-y-2.5">
                {project.lessonsLearned?.map((l) => (
                  <li key={l} className="flex gap-2 text-sm text-white/75">
                    <span className="text-accent-cyan">—</span>
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium tracking-[0.2em] text-white/50 uppercase">Tech used</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-white/90"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {hasLinks && (
            <div className="flex flex-wrap gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent-cyan px-5 py-2.5 text-sm font-semibold text-text-primary transition-all hover:shadow-lg"
                >
                  GitHub →
                </a>
              )}
              {project.links.itch && (
                <a
                  href={project.links.itch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  itch.io →
                </a>
              )}
            </div>
          )}
        </div>
      </ProjectBand>

      {/* Prev / next */}
      <ProjectBand variant="light" className="border-t border-border py-8">
        <nav className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex justify-between gap-6">
            {prev ? (
              <Link to={`/project/${prev.slug}`} className="group max-w-[45%]">
                <span className="text-[10px] tracking-widest text-text-muted uppercase">Previous</span>
                <p className="mt-1 font-display text-base font-semibold transition-colors group-hover:text-accent-cyan md:text-lg">
                  ← {prev.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={`/project/${next.slug}`} className="group max-w-[45%] text-right">
                <span className="text-[10px] tracking-widest text-text-muted uppercase">Next</span>
                <p className="mt-1 font-display text-base font-semibold transition-colors group-hover:text-accent-cyan md:text-lg">
                  {next.title} →
                </p>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </nav>
      </ProjectBand>
    </article>
  )
}
