import React from "react";

export default function ProductCard({ product, index }) {
  return (
    <article
      className={`product-card tone-${product.tone}`}
      style={{ "--delay": `${index * 60}ms` }}
    >
      <div className="product-image-wrap">
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          loading="lazy"
          onError={(e) => {
            if (product.fallback && e.currentTarget.src !== product.fallback)
              e.currentTarget.src = product.fallback;
            else e.currentTarget.style.opacity = 0.15;
          }}
        />
        <span className="product-index">0{index + 1}</span>
      </div>
      <div className="product-info">
        <small>
          {product.brand} · {product.category}
        </small>
        <h3>{product.name}</h3>
        <p>{product.size}</p>
      </div>
    </article>
  );
}
