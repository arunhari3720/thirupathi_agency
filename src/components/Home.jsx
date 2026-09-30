import SectionShell from './SectionShell'

export default function Home() {
  return (
    <SectionShell id="home" className="home-section" eyebrow="THIRUPATHI AGENCY" number={1}>
      <div className="home-layout">
        <div className="home-copy">
          <p className="kicker">AUTHORISED FOOD DISTRIBUTOR</p>
          <h1>Good food<br /><em>travels</em> further.</h1>
          <p className="lead">A premium distribution partner connecting trusted brands like Arusuvai and GRB with retailers, businesses and homes across Tamil Nadu.</p>
          <button className="gold-button" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>Explore our range <span>↗</span></button>
        </div>
        <div className="hero-orbit">
          <div className="hero-orbit__ring" />
          <div className="hero-spice hero-spice--one">CHILLI</div>
          <div className="hero-spice hero-spice--two">GHEE</div>
          <div className="hero-spice hero-spice--three">MASALA</div>
          <div className="hero-orbit__label">PURE · AUTHENTIC · RELIABLE</div>
        </div>
      </div>
      <div className="home-stats">
        <span><b>01</b> Genuine products</span>
        <span><b>02</b> Reliable supply</span>
        <span><b>03</b> Business support</span>
      </div>
    </SectionShell>
  )
}
