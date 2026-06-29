import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LenisContext } from '../../context/LenisContext'

export default function ScrollToTopButton() {
  const { pathname } = useLocation()
  const lenisRef = useContext(LenisContext)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const threshold = 480

    const update = (scrollY) => {
      setVisible(scrollY > threshold)
    }

    const onWindowScroll = () => update(window.scrollY)

    window.addEventListener('scroll', onWindowScroll, { passive: true })
    onWindowScroll()

    const lenis = lenisRef?.current
    if (lenis) {
      const onLenisScroll = ({ scroll }) => update(scroll)
      lenis.on('scroll', onLenisScroll)
      return () => {
        window.removeEventListener('scroll', onWindowScroll)
        lenis.off('scroll', onLenisScroll)
      }
    }

    return () => window.removeEventListener('scroll', onWindowScroll)
  }, [lenisRef, pathname])

  const handleClick = () => {
    const lenis = lenisRef?.current
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`fixed z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-elevated text-text-primary shadow-lg transition-all duration-300 hover:border-accent-cyan/40 hover:text-accent-cyan hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      style={{
        right: 'max(1rem, env(safe-area-inset-right))',
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
