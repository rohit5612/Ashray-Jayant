import projects from '../../data/projects'
import { sortProjects } from '../../utils/sortProjects'
import { useGsapReveal } from '../../hooks/useGsapReveal'
import SectionShell from '../layout/SectionShell'
import SectionLabel from '../shared/SectionLabel'
import ProjectCard from './ProjectCard'
import { getProjectLayoutFromTags } from '../../utils/tags'

export default function ProjectsSection() {
  const ref = useGsapReveal({ stagger: 0.12, y: 50 })
  const sorted = sortProjects(projects)

  const featured = sorted.filter((p) => getProjectLayoutFromTags(p.tags) === 'primary')
  const supporting = sorted.filter((p) => getProjectLayoutFromTags(p.tags) === 'secondary')
  const others = sorted.filter((p) => getProjectLayoutFromTags(p.tags) === 'compact')

  return (
    <SectionShell id="projects" className="!px-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div ref={ref}>
          <SectionLabel className="text-accent-purple" data-reveal>
            Selected Work
          </SectionLabel>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl" data-reveal>
            Projects
          </h2>
          <p className="mt-4 max-w-2xl text-text-secondary md:text-lg" data-reveal>
            Gameplay prototypes, jam games, and experiments — each one a step in the craft.
          </p>
        </div>
      </div>

      {featured.length > 0 && (
        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-8 px-4 sm:mt-14 sm:px-6 md:mt-20 md:px-10">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {supporting.length > 0 && (
        <div className="mx-auto mt-12 max-w-7xl px-4 sm:mt-16 sm:px-6 md:mt-24 md:px-10">
          <p className="mb-8 text-xs font-medium tracking-[0.25em] text-text-muted uppercase">
            More Work
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {supporting.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {others.length > 0 && (
        <div className="mx-auto mt-12 max-w-7xl px-4 pb-4 sm:mt-16 sm:px-6 md:mt-20 md:px-10">
          <p className="mb-6 text-xs font-medium tracking-[0.25em] text-text-muted uppercase">
            Experiments & Learning
          </p>
          <div className="flex flex-col gap-4">
            {others.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </SectionShell>
  )
}
