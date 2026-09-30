import SectionShell from './SectionShell'

export default function Contact() {
  return (
    <SectionShell id="contact" className="contact-section" eyebrow="START A CONVERSATION" number={5}>
      <div className="contact-layout">
        <div className="contact-copy">
          <p className="kicker">CONTACT</p>
          <h2>Let's move<br /><em>good food.</em></h2>
          <p>For dealership enquiries, retail supply, bulk orders or brand distribution conversations, reach out directly.</p>
          <div className="contact-links">
            <a href="tel:+919876543210"><span>PHONE</span>+91 98765 43210</a>
            <a href="mailto:thirupathiagency@gmail.com"><span>EMAIL</span>thirupathiagency@gmail.com</a>
            <span><small>LOCATION</small>Madurai, Tamil Nadu</span>
          </div>
        </div>
        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Thanks! Thirupathi Agency will get back to you.') }}>
          <label>Name<input required placeholder="Your name" /></label>
          <label>Phone<input required placeholder="Your phone number" /></label>
          <label>Requirement<select defaultValue="Retail / Distribution enquiry"><option>Retail / Distribution enquiry</option><option>Bulk order</option><option>Dealership enquiry</option><option>General enquiry</option></select></label>
          <label>Message<textarea placeholder="Tell us what you need…" rows="4" /></label>
          <button className="gold-button" type="submit">Send enquiry <span>↗</span></button>
        </form>
      </div>
      <footer className="footer-line"><span>THIRUPATHI AGENCY</span><span>QUALITY · TRUST · SUPPLY</span><span>© 2026</span></footer>
    </SectionShell>
  )
}
