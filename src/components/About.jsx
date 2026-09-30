import SectionShell from './SectionShell'

export default function About() {
  return (
    <SectionShell id="about" className="about-section" eyebrow="THE AGENCY" number={3}>
      <div className="about-layout">
        <div className="about-title">
          <p className="kicker">ABOUT THIRUPATHI</p>
          <h2>Built around<br /><em>trust.</em></h2>
        </div>
        <div className="about-story">
          <p className="large-copy">Thirupathi Agency is designed as a dependable bridge between quality food brands and the businesses that need them.</p>
          <p>We focus on authentic products, predictable supply and responsive service — making distribution feel less like a transaction and more like a long-term relationship.</p>
          <div className="about-pillars">
            <article><span>01</span><b>Brand-first</b><p>We represent products with care and consistency.</p></article>
            <article><span>02</span><b>Distribution-led</b><p>We keep movement, availability and communication simple.</p></article>
            <article><span>03</span><b>Local knowledge</b><p>Built for the realities of South Indian retail and food businesses.</p></article>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
