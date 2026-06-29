export default function ProjectMetaStrip({ project }) {
  const items = [
    { label: 'Role', value: project.role },
    { label: 'Engine', value: project.engine },
    { label: 'Year', value: project.year },
    { label: 'Duration', value: project.duration },
    { label: 'Type', value: project.projectType },
  ]

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-5">
      {items.map((item) => (
        <div key={item.label} className="bg-bg-elevated px-4 py-4 md:px-5 md:py-4">
          <p className="text-[10px] font-medium tracking-[0.2em] text-text-muted uppercase">
            {item.label}
          </p>
          <p className="mt-2 font-display text-sm font-semibold text-text-primary md:text-base">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  )
}
