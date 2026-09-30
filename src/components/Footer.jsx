import React from 'react'

export default function Footer() {
  const go = (href) => { window.location.hash = href; window.scrollTo(0,0) }
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">THIRUPATHI <span>AGENCY</span></div>
          <p>Authorised dealer & distributor for trusted everyday brands across the region.</p>
        </div>
        <div><h4>Quick Links</h4><button onClick={() => go('/')}>Home</button><button onClick={() => go('/products')}>Products</button><button onClick={() => go('/about')}>About Us</button></div>
        <div><h4>Company</h4><button onClick={() => go('/why-choose-us')}>Why Choose Us</button><button onClick={() => go('/contact')}>Contact</button><button onClick={() => go('/products')}>Brand Catalogue</button></div>
        <div><h4>Contact</h4><a href="tel:+919876543210">+91 98765 43210</a><a href="mailto:thirupathiagency@gmail.com">thirupathiagency@gmail.com</a><span>Madurai, Tamil Nadu</span></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Thirupathi Agency</span><span>Distribution • Retail • Institutional Supply</span></div>
    </footer>
  )
}
