const colorMap = {
  cyan: 'border-accent-cyan/25 bg-accent-cyan/10 text-accent-cyan',
  violet: 'border-accent-purple/25 bg-accent-purple/10 text-accent-purple',
  blue: 'border-accent-purple/25 bg-accent-purple/10 text-accent-purple',
}

export default function Tag({ label, color = 'cyan' }) {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase ${colorMap[color] ?? colorMap.cyan}`}
    >
      {label}
    </span>
  )
}
