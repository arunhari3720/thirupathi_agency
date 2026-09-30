import SectionShell from './SectionShell'

const points = [
  ['01', 'Genuine Products', 'Authorised sourcing and brand-aligned product handling.'],
  ['02', 'Timely Supply', 'A distribution workflow designed around dependable replenishment.'],
  ['03', 'Wide Range', 'Spices, masalas and convenient food products across categories.'],
  ['04', 'Business Support', 'Responsive communication for retailers, hotels and bulk buyers.'],
  ['05', 'Trusted Brands', 'A portfolio anchored by recognisable names such as Arusuvai and GRB.'],
  ['06', 'Local Reach', 'A regional partner with a practical understanding of the market.'],
]

export default function WhyUs() {
  return (
    <SectionShell id="why-us" className="why-section" eyebrow="THE DIFFERENCE" number={4}>
      <div className="why-head">
        <div><p className="kicker">WHY CHOOSE US</p><h2>More than<br /><em>a distributor.</em></h2></div>
        <p>Six simple principles behind the way we source, handle and deliver.</p>
      </div>
      <div className="why-grid">
        {points.map(([num, title, copy]) => (
          <article key={num} className="why-card">
            <span>{num}</span><h3>{title}</h3><p>{copy}</p><i>↗</i>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}
