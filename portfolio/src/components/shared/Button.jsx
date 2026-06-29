export default function Button({
  children,
  onClick,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  const base =
    'inline-flex min-h-11 items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cyan disabled:cursor-not-allowed disabled:opacity-60 sm:px-8 sm:py-3'

  const variants = {
    primary:
      'bg-accent-purple text-white hover:scale-[1.03] hover:shadow-[0_0_32px_rgb(139_92_246/0.35)]',
    ghost:
      'border border-border text-text-primary hover:scale-[1.03] hover:border-accent-cyan/40 hover:text-accent-cyan hover:shadow-[0_0_20px_rgb(34_211_238/0.12)]',
    link: 'px-0 py-0 text-accent-cyan hover:underline underline-offset-4',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
