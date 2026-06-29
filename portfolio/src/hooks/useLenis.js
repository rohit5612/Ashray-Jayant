import { useCallback, useContext } from 'react'
import { LenisContext } from '../context/LenisContext'

export function useLenis() {
  const lenisRef = useContext(LenisContext)

  const scrollTo = useCallback(
    (target, options) => {
      lenisRef?.current?.scrollTo(target, options)
    },
    [lenisRef],
  )

  return { scrollTo }
}
