import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { LenisContext } from '../../context/LenisContext'

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || location.pathname.startsWith('/project/')) {
      lenisRef.current?.destroy()
      lenisRef.current = null
      return
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenisRef.current = instance

    function raf(time) {
      instance.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      instance.destroy()
      lenisRef.current = null
    }
  }, [location.pathname])

  useEffect(() => {
    const instance = lenisRef.current
    if (!instance || location.pathname !== '/') return
    const hash = location.hash?.replace('#', '')
    if (!hash) return
    const el = document.getElementById(hash)
    if (el) {
      setTimeout(() => instance.scrollTo(el, { offset: -80, duration: 1 }), 100)
    }
  }, [location.pathname, location.hash])

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
}
