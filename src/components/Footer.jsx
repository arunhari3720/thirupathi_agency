// import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  const go = (href) => {
    navigate(href)
    window.scrollTo(0, 0)
  }

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">THIRUPATHI <span>AGENCIES</span></div>
          <p>Authorised dealer & distributor for trusted everyday brands across the region.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <button onClick={() => go('/home')}>Home</button>
          <button onClick={() => go('/')}>Products</button>
          <button onClick={() => go('/about')}>About Us</button>
        </div>
        <div>
          <h4>Company</h4>
          <button onClick={() => go('/why-choose-us')}>Why Choose Us</button>
          <button onClick={() => go('/contact')}>Contact</button>
          <button onClick={() => go('/')}>Brand Catalogue</button>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="tel:+919790448985">+91 9790448985</a>
          <a href="mailto:thirupathiagencies00@gmail.com">thirupathiagencies00@gmail.com</a>
          <span>Madurai, Tamil Nadu</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Thirupathi Agencies</span>
        <span>Distribution • Retail • Institutional Supply</span>
      </div>
    </footer>
  )
}