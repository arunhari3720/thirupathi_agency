import React, { useState } from 'react'

const nav = [
  ['Home', '/'],
  ['Our Products', '/products'],
  ['About Us', '/about'],
  ['Why Choose Us', '/why-choose-us'],
  ['Contact', '/contact'],
]

export default function Header({ path }) {
  const [open, setOpen] = useState(false)
  const go = (href) => { window.location.hash = href; setOpen(false) }
  return (
    <header className="header">
      <a href="#/" className="brand" onClick={() => setOpen(false)}>
        <span className="brand-mark"><span>✦</span></span>
        <span>
          <strong>THIRUPATHI</strong>
          <small>AGENCY</small>
          <em>AUTHORISED DEALER & DISTRIBUTOR</em>
        </span>
      </a>
      <nav className={`nav ${open ? 'is-open' : ''}`}>
        {nav.map(([label, href]) => (
          <button key={href} className={path === href ? 'active' : ''} onClick={() => go(href)}>{label}</button>
        ))}
      </nav>
      <a className="header-call" href="tel:+919876543210">☎ +91 98765 43210</a>
      <button className="menu" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">☰</button>
    </header>
  )
}
