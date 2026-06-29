export default function SectionShell({ id, children, className = '' }) {
  return (
    <section id={id} data-section={id} className={`section-padding ${className}`}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">{children}</div>
    </section>
  )
}
