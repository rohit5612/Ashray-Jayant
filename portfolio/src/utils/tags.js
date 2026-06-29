import TAGS from '../data/tags'

export function getProjectLayoutFromTags(tags = []) {
  let best = { priority: 99, cardVariant: 'compact' }

  for (const tagId of tags) {
    const tag = TAGS[tagId]
    if (!tag) continue
    if (tag.priority < best.priority && tag.cardVariant) {
      best = { priority: tag.priority, cardVariant: tag.cardVariant }
    }
  }

  return best.cardVariant
}

export function getTagConfig(tagId) {
  return TAGS[tagId] ?? null
}
