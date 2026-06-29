import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import LenisProvider from './LenisProvider'
import ScrollToTop from './ScrollToTop'
import ScrollToTopButton from '../shared/ScrollToTopButton'

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) {
      setProgress(0)
      return
    }

    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  if (!isHome) return null

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-[2px] bg-gradient-to-r from-accent-purple via-accent-cyan to-accent-warm transition-[width] duration-150"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  )
}

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let ctx
    ;(async () => {
      const { gsap } = await import('gsap')
      ctx = gsap.context(() => {
        gsap.fromTo(
          'main',
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: 'power2.out' },
        )
      })
    })()

    return () => ctx?.revert()
  }, [location.pathname])

  return (
    <LenisProvider>
      <ScrollToTop />
      <ScrollProgress />
      <div className="min-h-screen bg-bg-primary text-text-primary">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      <ScrollToTopButton />
    </LenisProvider>
  )
}
