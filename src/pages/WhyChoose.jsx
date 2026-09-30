import React from 'react'
import PageHero from '../components/PageHero'

const reasons = [
 ['01','Genuine brand portfolio','A curated selection of established consumer brands across multiple categories.'],
 ['02','Multi-category supply','Food, dairy, home care, beverage mixes, incense and other everyday essentials.'],
 ['03','Trade-first communication','Clear catalogue pages, direct contact options and a simple bulk enquiry flow.'],
 ['04','Regional reach','A Madurai-focused agency identity designed to support nearby retail and business customers.'],
 ['05','Consistent presentation','Premium, light visual language that makes a traditional distribution business feel modern and credible.'],
 ['06','Long-term relationships','The site is built around repeat trade relationships rather than one-off online checkout.'],
]

export default function WhyChoose() {
  return <><PageHero eyebrow="WHY CHOOSE US" title="More than a" accent="distributor." text="A clear value proposition for retailers, supermarkets, hotels, businesses and institutional buyers." /><section className="reasons"><div className="reasons-head"><p className="eyebrow">THE DIFFERENCE</p><h2>Why partners<br/><i>choose to stay.</i></h2></div><div className="reason-grid">{reasons.map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><b>↗</b></article>)}</div></section><section className="quote-section"><div className="quote-mark">“</div><p>Good distribution is not just movement of products. It is the quiet system behind availability, trust and repeat business.</p><span>THIRUPATHI AGENCY</span></section></>
}
