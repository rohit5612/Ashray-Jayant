const prefetched = new Set()

export function prefetchRoute(path) {
  if (prefetched.has(path)) return
  prefetched.add(path)

  if (path.startsWith('/project/')) {
    import('../pages/ProjectPage.jsx').catch(() => {})
  }
}
