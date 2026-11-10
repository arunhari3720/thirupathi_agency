
import { Helmet } from 'react-helmet-async'
import SectionShell from './SectionShell'

export default function Contact() {
  return (
    <>
      <Helmet>

        {/* Basic SEO */}
        <title>
          Contact Thirupathi Agency | Food Distribution in Tamil Nadu
        </title>

        <meta
          name="description"
          content="Contact Thirupathi Agency for dealership enquiries, retail supply, bulk orders and food brand distribution opportunities across Tamil Nadu."
        />

        <meta
          name="keywords"
          content="Thirupathi Agency contact, food distributor Madurai, food distribution Tamil Nadu, dealership, bulk orders, retail supply"
        />

        <meta name="robots" content="index, follow" />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://thirupathiagency.netlify.app//#contact"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />

        <meta
          property="og:title"
          content="Contact Thirupathi Agency | Food Distribution"
        />

        <meta
          property="og:description"
          content="Reach out to Thirupathi Agency for dealership enquiries, retail supply, bulk orders and brand distribution conversations."
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
          content="https://YOUR-DOMAIN.netlify.app/#contact"
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
          content="Contact Thirupathi Agency"
        />

        <meta
          name="twitter:description"
          content="Contact Thirupathi Agency for food distribution, retail supply, bulk orders and dealership enquiries."
        />

        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/gtqzljit/image/upload/v1790821022/pngwing.com.png"
        />

      </Helmet>

      <SectionShell
        id="contact"
        className="contact-section"
        eyebrow="START A CONVERSATION"
        number={5}
      >

        <div className="contact-layout">

          <div className="contact-copy">

            <p className="kicker">
              CONTACT
            </p>

            <h2>
              Let's move
              <br />
              <em>good food.</em>
            </h2>

            <p>
              For dealership enquiries, retail supply, bulk orders
              or brand distribution conversations, reach out directly.
            </p>

            <div className="contact-links">

              <a href="tel:+919876543210">
                <span>PHONE</span>
                +91 9790448985
              </a>

              <a href="mailto:thirupathiagencies00@gmail.com">
                <span>EMAIL</span>
thirupathiagencies00@gmail.com
              </a>

              <span>
                <small>LOCATION</small>
                Madurai, Tamil Nadu
              </span>

            </div>

          </div>

          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault()
              alert(
                'Thanks! Thirupathi Agency will get back to you.'
              )
            }}
          >

            <label>
              Name
              <input
                required
                placeholder="Your name"
              />
            </label>

            <label>
              Phone
              <input
                required
                placeholder="Your phone number"
              />
            </label>

            <label>
              Requirement

              <select
                defaultValue="Retail / Distribution enquiry"
              >
                <option>
                  Retail / Distribution enquiry
                </option>

                <option>
                  Bulk order
                </option>

                <option>
                  Dealership enquiry
                </option>

                <option>
                  General enquiry
                </option>
              </select>

            </label>

            <label>
              Message

              <textarea
                placeholder="Tell us what you need…"
                rows="4"
              />
            </label>

            <button
              className="gold-button"
              type="submit"
            >
              Send enquiry <span>↗</span>
            </button>

          </form>

        </div>

        <footer className="footer-line">

          <span>
            THIRUPATHI AGENCY
          </span>

          <span>
            QUALITY · TRUST · SUPPLY
          </span>

          <span>
            © 2026
          </span>

        </footer>

      </SectionShell>
    </>
  )
}
