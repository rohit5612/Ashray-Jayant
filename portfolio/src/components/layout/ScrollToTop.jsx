import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LenisContext } from '../../context/LenisContext'

/** Scrolls window to top on every route (pathname) change. */
export default function ScrollToTop() {
  const { pathname } = useLocation()
  const lenisRef = useContext(LenisContext)

  useEffect(() => {
    window.scrollTo(0, 0)

    const frame = requestAnimationFrame(() => {
      lenisRef?.current?.scrollTo(0, { immediate: true })
    })

    return () => cancelAnimationFrame(frame)
  }, [pathname, lenisRef])

  return null
}
