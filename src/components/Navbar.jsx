import { useEffect, useState } from 'react'

const links = [
  ['home', 'Home'], ['products', 'Products'], ['about', 'About'],
  ['why-us', 'Why Choose Us'], ['contact', 'Contact'],
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id))
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 })
    links.forEach(([id]) => document.getElementById(id) && observer.observe(document.getElementById(id)))
    return () => observer.disconnect()
  }, [])

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <header className="navbar">
      <button className="brand" onClick={() => go('home')} aria-label="Thirupathi Agency home">
        <span className="brand-mark">TA</span>
        <span><b>THIRUPATHI</b><small>AGENCY · AUTHORISED DISTRIBUTOR</small></span>
      </button>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">☰</button>
      <nav className={open ? 'nav-open' : ''}>
        {links.map(([id, label]) => (
          <button key={id} className={active === id ? 'active' : ''} onClick={() => go(id)}>{label}</button>
        ))}
      </nav>
      <a className="nav-call" href="tel:+919876543210">+91 98765 43210</a>
    </header>
  )
}
