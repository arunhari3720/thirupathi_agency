import { useRef } from 'react'
import { useElementProgress } from '../hooks/useElementProgress'

export default function HorizontalProductRail({ products }) {
  const ref = useRef(null)
  const progress = useElementProgress(ref)
  const max = Math.max(0, products.length - 3)
  const x = progress * max * 30

  return (
    <div ref={ref} className="product-rail-wrap">
      <div className="product-rail-sticky">
        <div className="rail-heading">
          <span>SCROLL TO EXPLORE</span>
          <strong>Arusuvai, one shelf at a time.</strong>
        </div>
        <div className="product-rail" style={{ transform: `translate3d(-${x}vw, 0, 0)` }}>
          {products.map((product, index) => (
            <article className="product-card" key={product.id || index}>
              <div className="product-card__image">
                {product.image ? (
                  <img src={product.image} alt={product.title} loading="lazy" />
                ) : (
                  <div className="product-card__fallback">
                    <span>ARUSUVAI</span>
                    <b>{product.title}</b>
                    <small>Authentic South Indian Taste</small>
                  </div>
                )}
              </div>
              <div className="product-card__copy">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{product.title}</h3>
                <p>{product.variants?.[0]?.title || 'Multiple pack sizes'}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
