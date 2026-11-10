import { Helmet } from 'react-helmet-async'
import SectionShell from './SectionShell'

export default function Home() {
  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>
          Thirupathi Agency | Food Distribution in Tamil Nadu
        </title>

        <meta
          name="description"
          content="Thirupathi Agency is an authorised food distributor connecting trusted brands like Arusuvai and GRB with retailers, businesses and homes across Tamil Nadu."
        />

        <meta
          name="keywords"
          content="Thirupathi Agency, food distributor, food distribution, Arusuvai, GRB, Tamil Nadu"
        />

        <meta name="robots" content="index, follow" />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://thirupathiagency.netlify.app/"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />

        <meta
          property="og:title"
          content="Thirupathi Agency | Food Distribution in Tamil Nadu"
        />

        <meta
          property="og:description"
          content="Trusted food distribution partner connecting Arusuvai, GRB and other quality brands with retailers, businesses and homes across Tamil Nadu."
        />

        <meta
          property="og:image"
          content="https://res.cloudinary.com/gtqzljit/image/upload/v1790821022/pngwing.com.png"
        />

        <meta
          property="og:image:alt"
          content="Thirupathi Agency"
        />

        <meta
          property="og:url"
          content="https://YOUR-DOMAIN.netlify.app/"
        />

        <meta
          property="og:site_name"
          content="Thirupathi Agency"
        />

        {/* Twitter / X */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Thirupathi Agency | Food Distribution in Tamil Nadu"
        />

        <meta
          name="twitter:description"
          content="Trusted food distribution partner across Tamil Nadu."
        />

        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/gtqzljit/image/upload/v1790821022/pngwing.com.png"
        />
      </Helmet>

      <SectionShell
        id="home"
        className="home-section"
        eyebrow="THIRUPATHI AGENCY"
        number={1}
      >
        <div className="home-layout">

          <div className="home-copy">

            <p className="kicker">
              AUTHORISED FOOD DISTRIBUTOR
            </p>

            <h1>
              Good food
              <br />
              <em>travels</em> further.
            </h1>

            <p className="lead">
              A premium distribution partner connecting trusted
              brands like Arusuvai and GRB with retailers,
              businesses and homes across Tamil Nadu.
            </p>

            <button
              className="gold-button"
              onClick={() =>
                document
                  .getElementById('products')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Explore our range <span>↗</span>
            </button>

          </div>

          <div className="hero-orbit">

            <div className="hero-orbit__ring" />

            <div className="hero-spice hero-spice--one">
              CHILLI
            </div>

            <div className="hero-spice hero-spice--two">
              GHEE
            </div>

            <div className="hero-spice hero-spice--three">
              MASALA
            </div>

            <div className="hero-orbit__label">
              PURE · AUTHENTIC · RELIABLE
            </div>

          </div>

        </div>

        <div className="home-stats">

          <span>
            <b>01</b> Genuine products
          </span>

          <span>
            <b>02</b> Reliable supply
          </span>

          <span>
            <b>03</b> Business support
          </span>

        </div>

      </SectionShell>
    </>
  )
}