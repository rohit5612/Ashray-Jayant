const variants = {
  light: 'bg-bg-primary text-text-primary',
  muted: 'bg-bg-secondary text-text-primary',
  dark: 'bg-text-primary text-bg-primary',
}

const patterns = {
  light: null,
  muted: (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.4]"
      aria-hidden="true"
      style={{
        backgroundImage:
          'radial-gradient(circle at 20% 50%, rgba(30,58,95,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(91,77,130,0.05) 0%, transparent 40%)',
      }}
    />
  ),
  dark: (
    <div
      className="pointer-events-none absolute inset-0 opacity-30"
      aria-hidden="true"
      style={{
        backgroundImage:
          'radial-gradient(circle at 70% 30%, rgba(8,145,178,0.25) 0%, transparent 45%)',
      }}
    />
  ),
}

export default function ProjectBand({ variant = 'light', children, className = '' }) {
  return (
    <section className={`relative overflow-hidden ${variants[variant]} ${className}`}>
      {patterns[variant]}
      <div className="relative z-10">{children}</div>
    </section>
  )
}
