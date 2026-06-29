import TAGS from '../data/tags'

const PRIORITY_MAP = Object.fromEntries(
  Object.values(TAGS)
    .filter((t) => t.cardVariant)
    .map((t) => [t.id, t.priority]),
)

export function sortProjects(projects) {
  return [...projects].sort((a, b) => {
    const aPri = Math.min(...a.tags.map((t) => PRIORITY_MAP[t] ?? 99))
    const bPri = Math.min(...b.tags.map((t) => PRIORITY_MAP[t] ?? 99))
    if (aPri !== bPri) return aPri - bPri
    return Number(b.year) - Number(a.year)
  })
}

export function getAdjacentProjects(projects, slug) {
  const sorted = sortProjects(projects)
  const idx = sorted.findIndex((p) => p.slug === slug)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  }
}
