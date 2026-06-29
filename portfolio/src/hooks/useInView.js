import { useEffect, useState, useRef } from 'react'

export function useInView(ref, { threshold = 0.1, once = false } = {}) {
  const [isInView, setIsInView] = useState(false)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) {
            hasTriggered.current = true
            observer.disconnect()
          }
        } else if (!once && !hasTriggered.current) {
          setIsInView(false)
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold, once])

  return isInView
}
