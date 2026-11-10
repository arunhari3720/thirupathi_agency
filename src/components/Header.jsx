import React, { useState } from 'react'

const nav = [
  ['Home', '/'],
  ['Our Products', '/products'],
  ['About Us', '/about'],
  ['Why Choose Us', '/why-choose-us'],
  ['Contact', '/contact'],
]

const LOGO_URL =
  'https://res.cloudinary.com/gtqzljit/image/upload/v1790821022/pngwing.com.png'

export default function Header({ path }) {
  const [open, setOpen] = useState(false)

  const go = (href) => {
    window.location.hash = href
    setOpen(false)
  }

  return (
    <>
      <header className="header">

        {/* LOGO / BRAND */}
        <a
          href="#/"
          className="brand"
          onClick={() => setOpen(false)}
          aria-label="Thirupathi Agency Home"
        >
          <img
            src={LOGO_URL}
            alt="Thirupathi Agency"
            className="brand-logo"
          />

          <span className="brand-info">
            <strong>THIRUPATHI</strong>
            <small>AGENCIES</small>
            <em>AUTHORISED DEALER & DISTRIBUTOR</em>
          </span>
        </a>

        {/* NAVIGATION */}
        <nav className={`nav ${open ? 'is-open' : ''}`}>
          {nav.map(([label, href]) => (
            <button
              key={href}
              className={path === href ? 'active' : ''}
              onClick={() => go(href)}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* DESKTOP CALL */}
        <a
          className="header-call"
          href="tel:+919876543210"
        >
          <span>☎</span>
          <span>+91 9790448985</span>
        </a>

        {/* MOBILE MENU */}
        <button
          className="menu"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? '✕' : '☰'}
        </button>

      </header>

      <style>{`

        /* =====================================
           HEADER
        ===================================== */

        .header {
          position: sticky;
          top: 0;
          z-index: 1000;

          width: 100%;
          min-height: 76px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 8px 5%;

          box-sizing: border-box;

          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(14px);

          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }


        /* =====================================
           BRAND
        ===================================== */

        .brand {
          display: flex;
          align-items: center;

          gap: 12px;

          text-decoration: none;

          color: inherit;

          flex-shrink: 0;
        }


        /* NEW LOGO */

        .brand-logo {
          width: 58px;
          height: 58px;

          display: block;

          object-fit: contain;

          flex-shrink: 0;
        }


        .brand-info {
          display: flex;
          flex-direction: column;

          line-height: 1.05;
        }


        .brand-info strong {
          font-size: 20px;

          font-weight: 800;

          letter-spacing: 1px;
        }


        .brand-info small {
          margin-top: 3px;

          font-size: 11px;

          font-weight: 700;

          letter-spacing: 1px;

          opacity: 0.75;
        }


        .brand-info em {
          margin-top: 5px;

          font-size: 7px;

          font-style: normal;

          font-weight: 600;

          letter-spacing: 0.7px;

          opacity: 0.6;

          white-space: nowrap;
        }


        /* =====================================
           NAVIGATION
        ===================================== */

        .nav {
          display: flex;
          align-items: center;

          gap: 4px;
        }


        .nav button {
          position: relative;

          border: none;

          background: transparent;

          padding: 10px 13px;

          font-size: 14px;

          font-weight: 600;

          cursor: pointer;

          transition: 0.25s ease;
        }


        .nav button:hover {
          transform: translateY(-1px);
        }


        /* ACTIVE */

        .nav button.active {
          font-weight: 750;
        }


        .nav button.active::after {
          content: '';

          position: absolute;

          left: 13px;
          right: 13px;

          bottom: 3px;

          height: 2px;

          border-radius: 10px;

          background: currentColor;
        }


        /* =====================================
           CALL
        ===================================== */

        .header-call {
          display: flex;

          align-items: center;

          gap: 7px;

          padding: 10px 15px;

          border-radius: 999px;

          text-decoration: none;

          font-size: 13px;

          font-weight: 700;

          white-space: nowrap;

          transition: 0.25s ease;
        }


        .header-call:hover {
          transform: translateY(-1px);
        }


        /* =====================================
           MOBILE MENU BUTTON
        ===================================== */

        .menu {
          display: none;

          border: none;

          background: transparent;

          padding: 6px;

          font-size: 25px;

          line-height: 1;

          cursor: pointer;
        }


        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 1050px) {

          .header {
            padding: 8px 3%;
          }

          .nav {
            gap: 0;
          }

          .nav button {
            padding: 9px 8px;

            font-size: 13px;
          }

          .header-call {
            padding: 9px 11px;

            font-size: 12px;
          }

        }


        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 768px) {

          .header {
            min-height: 68px;

            padding: 7px 17px;
          }


          /* LOGO */

          .brand-logo {
            width: 45px;
            height: 45px;
          }


          .brand {
            gap: 9px;
          }


          .brand-info strong {
            font-size: 16px;

            letter-spacing: 0.7px;
          }


          .brand-info small {
            font-size: 8px;

            letter-spacing: 0.8px;
          }


          .brand-info em {
            font-size: 5.5px;

            letter-spacing: 0.5px;

            margin-top: 4px;
          }


          /* HIDE DESKTOP PHONE */

          .header-call {
            display: none;
          }


          /* MENU BUTTON */

          .menu {
            display: block;

            margin-left: auto;

            z-index: 1002;
          }


          /* MOBILE NAV */

          .nav {
            position: absolute;

            top: 100%;
            left: 0;

            width: 100%;

            display: flex;

            flex-direction: column;

            align-items: stretch;

            gap: 0;

            padding: 8px 17px 15px;

            box-sizing: border-box;

            background: rgba(255, 255, 255, 0.98);

            backdrop-filter: blur(15px);

            border-bottom: 1px solid rgba(0, 0, 0, 0.08);

            opacity: 0;

            visibility: hidden;

            transform: translateY(-10px);

            transition:
              opacity 0.25s ease,
              transform 0.25s ease,
              visibility 0.25s ease;
          }


          /* OPEN MENU */

          .nav.is-open {
            opacity: 1;

            visibility: visible;

            transform: translateY(0);
          }


          /* MOBILE LINKS */

          .nav button {
            width: 100%;

            padding: 14px 8px;

            text-align: left;

            font-size: 15px;

            border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          }


          .nav button:last-child {
            border-bottom: none;
          }


          /* ACTIVE MOBILE */

          .nav button.active::after {
            left: 0;

            right: auto;

            width: 30px;
          }

        }


        /* =====================================
           SMALL MOBILE
        ===================================== */

        @media (max-width: 420px) {

          .header {
            padding: 7px 13px;
          }


          .brand-logo {
            width: 40px;
            height: 40px;
          }


          .brand {
            gap: 8px;
          }


          .brand-info strong {
            font-size: 14px;
          }


          .brand-info small {
            font-size: 7px;
          }


          .brand-info em {
            font-size: 5px;

            letter-spacing: 0.3px;
          }


          .menu {
            font-size: 23px;
          }

        }

      `}</style>
    </>
  )
}