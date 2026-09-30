import { useMemo } from 'react'

export default function PixelDissolve({ progress, count = 90 }) {
  const pixels = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    x: ((i * 37) % 101),
    y: ((i * 61) % 101),
    size: 3 + ((i * 7) % 7),
    delay: ((i * 13) % 100) / 100,
    drift: 18 + ((i * 17) % 45),
  })), [count])

  return (
    <div className="pixel-dissolve" aria-hidden="true">
      {pixels.map((p) => {
        const local = Math.max(0, Math.min(1, (progress - p.delay * 0.45) / 0.55))
        return (
          <i
            key={p.id}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: local * 0.82,
              transform: `translate(${local * (p.x > 50 ? p.drift : -p.drift)}px, ${local * (p.y > 50 ? p.drift : -p.drift)}px) rotate(${local * 180}deg)`,
            }}
          />
        )
      })}
    </div>
  )
}
