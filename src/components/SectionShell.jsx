import { useRef } from 'react'
import { useElementProgress } from '../hooks/useElementProgress'
import PixelDissolve from './PixelDissolve'

export default function SectionShell({ id, className = '', children, eyebrow, number }) {
  const ref = useRef(null)
  const progress = useElementProgress(ref)

  return (
    <section id={id} ref={ref} className={`stack-section ${className}`}>
      <div className="stack-section__sticky">
        <div className="section-grain" />
        <div className="section-meta">
          <span>{eyebrow}</span>
          <span>{String(number).padStart(2, '0')}</span>
        </div>
        {children}
        <PixelDissolve progress={progress} />
      </div>
    </section>
  )
}
