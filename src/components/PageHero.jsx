import React from 'react'

export default function PageHero({ eyebrow, title, accent, text, image, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title} <i>{accent}</i></h1>
        {text && <p className="hero-text">{text}</p>}
        {children}
      </div>
      <div className="page-hero-art" style={image ? {backgroundImage:`url(${image})`} : undefined}>
        {!image && <div className="hero-art-pattern" />}
      </div>
    </section>
  )
}
