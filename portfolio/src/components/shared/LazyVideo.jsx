import { useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView'

export default function LazyVideo({ src, poster, className = '', title = 'Gameplay video' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.25, once: true })
  const [playing, setPlaying] = useState(false)

  if (!src) {
    return (
      <div
        ref={ref}
        className={`relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-border bg-bg-secondary ${className}`}
      >
        {poster && (
          <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        )}
        <div className="relative z-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-accent-cyan/40 bg-accent-cyan/10">
            <svg className="h-6 w-6 text-accent-cyan" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p className="text-sm text-text-muted">Gameplay video — add demo.mp4 to project assets</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={ref} className={`relative aspect-video overflow-hidden rounded-2xl ${className}`}>
      {isInView && (
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          muted
          preload="none"
          title={title}
          onPlay={() => setPlaying(true)}
          className="h-full w-full object-cover"
        />
      )}
      {!playing && poster && !isInView && (
        <img src={poster} alt="" className="h-full w-full object-cover" loading="lazy" />
      )}
    </div>
  )
}
