import React from 'react'

export default function BrandStrip() {
  const brands = ['RKG', 'Arusuvai', 'MUGI', 'MAS', "Koya's", '123 Noodles', 'ARASHI']
  return <section className="brand-strip"><p>OUR DISTRIBUTION PORTFOLIO</p><div>{brands.map(b => <span key={b}>{b}</span>)}</div></section>
}
