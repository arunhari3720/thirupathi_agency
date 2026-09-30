import React from 'react'

export default function StickyStack({ items }) {
  return <div className="sticky-stack">
    {items.map((item, i) => <section className="stack-card" key={item.title} style={{'--i':i}}>
      <div className="stack-inner">
        <div><p className="eyebrow">0{i+1} / {item.kicker}</p><h2>{item.title} <i>{item.accent}</i></h2><p>{item.text}</p></div>
        <div className="stack-visual" style={{backgroundImage:`url(${item.image})`}}><span>{item.label}</span></div>
      </div>
    </section>)}
  </div>
}
