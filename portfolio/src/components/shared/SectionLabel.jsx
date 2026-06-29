export default function SectionLabel({ children, className = '' }) {
  return (
    <p
      className={`text-sm font-medium tracking-[0.3em] text-accent-cyan uppercase ${className}`}
    >
      {children}
    </p>
  )
}
