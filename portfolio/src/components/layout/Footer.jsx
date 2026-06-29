import { Link, useLocation } from 'react-router-dom'
import siteConfig from '../../data/siteConfig'
import profile from '../../data/profile'
import SocialLinks from '../shared/SocialLinks'
import { scrollToSection } from '../../utils/scroll'
import { useLenis } from '../../hooks/useLenis'

export default function Footer() {
  const location = useLocation()
  const { scrollTo } = useLenis()
  const isHome = location.pathname === '/'
  const year = new Date().getFullYear()

  const handleNav = (e, href) => {
    if (!isHome) return
    e.preventDefault()
    scrollToSection(href, scrollTo)
  }

  return (
    <footer className="border-t border-border bg-bg-secondary/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={profile.avatar}
            alt=""
            className="h-8 w-8 rounded-full border border-border object-cover object-[center_18%]"
            width={32}
            height={32}
          />
          <div>
            <p className="text-sm font-medium text-text-primary">{profile.name}</p>
            <p className="text-xs text-text-muted">{profile.gamertag} · Game Developer</p>
          </div>
        </Link>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {siteConfig.navLinks.map((link) =>
            isHome ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="text-xs text-text-muted transition-colors hover:text-accent-cyan"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href === '#home' ? '/' : `/${link.href}`}
                className="text-xs text-text-muted transition-colors hover:text-accent-cyan"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center justify-between gap-4 sm:items-end sm:gap-5 md:flex-col md:items-end md:gap-3">
          <SocialLinks social={profile.social} size="sm" />
          <p className="text-xs text-text-muted">© {year}</p>
        </div>
      </div>
    </footer>
  )
}
