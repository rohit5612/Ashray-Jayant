import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import siteConfig from '../../data/siteConfig'
import profile from '../../data/profile'
import { scrollToSection } from '../../utils/scroll'
import { useLenis } from '../../hooks/useLenis'
import { useActiveSection } from '../../hooks/useActiveSection'

const SECTION_IDS = ['home', 'projects', 'journey', 'skills', 'about', 'contact']

function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
      )}
    </svg>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { scrollTo } = useLenis()
  const isHome = location.pathname === '/'
  const activeSection = useActiveSection(isHome ? SECTION_IDS : [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const handleNav = (e, href) => {
    setMenuOpen(false)
    if (!isHome) return
    e.preventDefault()
    scrollToSection(href, scrollTo)
  }

  const isLinkActive = (href) => {
    const id = href.replace('#', '')
    return activeSection === id
  }

  const navLinkClass = (active) =>
    `relative block px-4 py-3 text-base transition-colors duration-300 md:px-3 md:py-2 md:text-sm ${
      active ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'border-b border-border bg-bg-primary/80 backdrop-blur-xl shadow-[0_4px_24px_rgb(0_0_0/0.2)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-10">
        <Link to="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3" onClick={() => setMenuOpen(false)}>
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-full w-full object-cover"
              width={40}
              height={40}
            />
          </div>
          <div className="hidden min-w-0 flex-col sm:flex">
            <span className="truncate text-sm font-semibold tracking-wide text-text-primary">
              {profile.name}
            </span>
            <span className="truncate text-xs text-accent-cyan opacity-80 transition-opacity group-hover:opacity-100">
              {profile.gamertag}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {siteConfig.navLinks.map((link) => {
            const active = isHome && isLinkActive(link.href)
            const className = navLinkClass(active)

            return isHome ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className={className}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-px bg-accent-cyan" />
                )}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href === '#home' ? '/' : `/${link.href}`}
                className={className}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-elevated/80 text-text-primary transition-colors hover:border-accent-cyan/40 hover:text-accent-cyan md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={`border-t border-border bg-bg-primary/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          menuOpen ? 'max-h-[min(70svh,28rem)] opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        }`}
        aria-label="Mobile"
        aria-hidden={!menuOpen}
      >
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
          {siteConfig.navLinks.map((link) => {
            const active = isHome && isLinkActive(link.href)
            const className = navLinkClass(active)

            return isHome ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className={className}
                tabIndex={menuOpen ? 0 : -1}
              >
                {link.label}
                {active && (
                  <span className="absolute left-4 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-accent-cyan" />
                )}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href === '#home' ? '/' : `/${link.href}`}
                className={className}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
