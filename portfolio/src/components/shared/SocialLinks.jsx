const iconPaths = {
  github:
    'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  itch:
    'M7.816 0 6.367 3.678H1.44L0 7.37h3.543L2.07 11.06 5.61 11.07 7.053 7.38h5.91l1.443 3.69h3.54L16.56 7.37h4.927L20.047 3.68h-4.927L13.67 0H7.816zm.79 7.38 1.443 3.69H5.61l1.443-3.69h1.553zm7.053 0h1.553l1.443 3.69h-4.44l1.444-3.69z',
}

const labels = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  itch: 'itch.io',
}

function Icon({ name, className }) {
  const path = iconPaths[name]
  if (!path) return <span className="text-xs font-medium uppercase">{name.slice(0, 2)}</span>
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={path} />
    </svg>
  )
}

export default function SocialLinks({ social, className = '', size = 'md' }) {
  const entries = Object.entries(social).filter(([, url]) => url)
  const btnSize = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11'
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'

  if (!entries.length) return null

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {entries.map(([key, url]) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={labels[key] ?? key}
          className={`flex ${btnSize} items-center justify-center rounded-full border border-border bg-bg-elevated text-text-muted transition-all duration-300 hover:scale-[1.03] hover:border-accent-cyan/40 hover:text-accent-cyan hover:shadow-[0_0_20px_rgb(34_211_238/0.15)]`}
        >
          <Icon name={key} className={iconSize} />
        </a>
      ))}
    </div>
  )
}
