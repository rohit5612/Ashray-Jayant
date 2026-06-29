export default function ProjectSectionHeader({
  index,
  label,
  title,
  description,
  dark = false,
  compact = false,
}) {
  return (
    <div className={compact ? 'mb-6' : 'mb-8 md:mb-10'}>
      {index && (
        <span
          className={`font-display font-bold leading-none ${
            compact ? 'text-4xl md:text-5xl' : 'text-5xl md:text-6xl'
          } ${dark ? 'text-white/10' : 'text-accent-blue/10'}`}
          aria-hidden="true"
        >
          {index}
        </span>
      )}
      {label && (
        <p className="text-xs font-medium tracking-[0.3em] text-accent-cyan uppercase">{label}</p>
      )}
      <h2
        className={`mt-1 font-display text-2xl font-semibold md:text-3xl ${
          dark ? 'text-white' : 'text-text-primary'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-2 max-w-3xl leading-relaxed ${dark ? 'text-white/70' : 'text-text-muted'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
