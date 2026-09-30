import { useEffect, useState } from 'react'

export function useElementProgress(ref) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    let frame = 0
    const update = () => {
      const rect = node.getBoundingClientRect()
      const distance = Math.max(rect.height - window.innerHeight, 1)
      const next = Math.min(1, Math.max(0, -rect.top / distance))
      setProgress(next)
      frame = 0
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref])

  return progress
}
