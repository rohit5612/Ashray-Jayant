export function scrollToSection(href, lenisScrollTo) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (!el) return

  if (lenisScrollTo) {
    lenisScrollTo(el, { offset: -80, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
