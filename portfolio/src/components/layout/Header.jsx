import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import siteConfig from '../../data/siteConfig'
import profile from '../../data/profile'
import { scrollToSection } from '../../utils/scroll'
import { useLenis } from '../../hooks/useLenis'
import { useActiveSection } from '../../hooks/useActiveSection'

const SECTION_IDS = ['home', 'projects', 'journey', 'skills', 'about', 'contact']

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { scrollTo } = useLenis()
  const isHome = location.pathname === '/'
  const activeSection = useActiveSection(isHome ? SECTION_IDS : [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    if (!isHome) return
    e.preventDefault()
    scrollToSection(href, scrollTo)
  }

  const isLinkActive = (href) => {
    const id = href.replace('#', '')
    return activeSection === id
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border bg-bg-primary/80 backdrop-blur-xl shadow-[0_4px_24px_rgb(0_0_0/0.2)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border transition-transform duration-300 group-hover:scale-105">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-full w-full object-cover"
              width={40}
              height={40}
            />
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold tracking-wide text-text-primary">
              {profile.name}
            </span>
            <span className="text-xs text-accent-cyan opacity-80 transition-opacity group-hover:opacity-100">
              {profile.gamertag}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {siteConfig.navLinks.map((link) => {
            const active = isHome && isLinkActive(link.href)
            const className = `relative px-3 py-2 text-sm transition-colors duration-300 ${
              active ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
            }`

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
      </div>
    </header>
  )
}
