import React, { useEffect, useRef, useState } from 'react'
import BrandStrip from '../components/BrandStrip'
import { products } from '../data/products'

// const featured = products.slice(0, 5)
const featured = [6, 10, 18, 1, 51, 26]
  .map((index) => products[index])
  .filter(Boolean);

const allProducts = products.filter((p) => typeof p.image === 'string' && p.image.trim().length > 0);
const marqueeProducts = [...allProducts];

/* Cloudinary images-a chinna size + auto format-ku maathum.
   Vera sites (mugi, koyas) URL-a appadiye vittudum. */
const optimize = (url, w = 500) => {
  if (
    url &&
    url.includes('res.cloudinary.com') &&
    url.includes('/upload/') &&
    !url.includes('/upload/f_auto')
  ) {
    return url.replace('/upload/', `/upload/f_auto,q_auto,w_${w}/`)
  }
  return url
}

/* Skeleton + fade-in image */
function SmartImg({ src, fallback, alt, w = 500, eager = false }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [usingFallback, setUsingFallback] = useState(false)
  const imageSrc = usingFallback && fallback ? fallback : optimize(src, w)

  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <img
      ref={ref}
      className={`smart-img${loaded ? ' is-loaded' : ''}${failed ? ' is-failed' : ''}`}
      src={imageSrc}
      alt={alt}
      loading={eager ? 'eager' : undefined}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => {
        // First try original URL if Cloudinary optimization failed.
        if (!usingFallback && src && imageSrc !== src) {
          ref.current.src = src
          return
        }

        // If original URL also fails, try the product's fallback URL.
        if (fallback && !usingFallback) {
          setUsingFallback(true)
          setLoaded(false)
          return
        }

        setFailed(true)
        setLoaded(true)
      }}
    />
  )
}

export default function Home() {
  const trackRef = useRef(null)

  useEffect(() => {
    document.title = 'Thirupathi Agency | Quality Products & Trusted Supply'

    let canonical = document.querySelector('link[rel="canonical"]')

    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }

    canonical.setAttribute(
      'href',
      'https://thirupathiagency.netlify.app/#/'
    )
  }, [])

  /* Background-la ella images-um preload (marquee-ku vara munnadiye cache aagidum) */
  useEffect(() => {
    // orbit images first, apuram marquee images
    featured.forEach((p) => {
      const img = new Image()
      img.src = optimize(p.image, 400)
    })

    const run = () => {
      allProducts.forEach((p) => {
        const img = new Image()
        img.src = optimize(p.image, 500)
      })
    }

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run, { timeout: 1500 })
      return () => window.cancelIdleCallback && window.cancelIdleCallback(id)
    } else {
      const t = setTimeout(run, 400)
      return () => clearTimeout(t)
    }
  }, [])

  /* JS-driven marquee: continuously scrolls on desktop and mobile */
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const wrap = track.parentElement
    let x = 0
    let raf = 0
    let paused = false
    let last = 0
    let halfWidth = 0
    const SPEED = 42

    const measure = () => {
      // Exact width of the first product set: position of the first duplicated card.
      const firstDuplicate = track.children[marqueeProducts.length]
      const firstCard = track.children[0]
      if (firstDuplicate && firstCard) {
        halfWidth = firstDuplicate.offsetLeft - firstCard.offsetLeft
      }
    }

    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(track)
    window.addEventListener('resize', measure)

    const tick = (now) => {
      if (!last) last = now
      const dt = Math.min(now - last, 50) / 1000
      last = now

      if (!paused && halfWidth > 0) {
        x -= SPEED * dt

        // Keep x within one full product-set width for a seamless loop.
        if (-x >= halfWidth) x += halfWidth

        track.style.transform = `translate3d(${x}px, 0, 0)`
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    const pause = () => { paused = true }
    const resume = () => {
      paused = false
      last = 0
    }

    wrap?.addEventListener('mouseenter', pause)
    wrap?.addEventListener('mouseleave', resume)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      window.removeEventListener('resize', measure)
      wrap?.removeEventListener('mouseenter', pause)
      wrap?.removeEventListener('mouseleave', resume)
    }
  }, [marqueeProducts.length])

  const go = (href) => {
    window.location.hash = href
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        .premium-hero {
          min-height: calc(100vh - 78px);
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: 0.92fr 1.08fr;
          align-items: center;
          padding: 70px 7vw 90px;
          background:
            radial-gradient(circle at 78% 48%, rgba(190,150,64,.13), transparent 28%),
            radial-gradient(circle at 92% 10%, rgba(24,75,48,.08), transparent 25%),
            linear-gradient(135deg, #faf8f0 0%, #f3efe2 48%, #fbfaf5 100%);
        }

        .premium-hero::before {
          content: "";
          position: absolute;
          width: 520px;
          height: 520px;
          right: -180px;
          top: -170px;
          border: 1px solid rgba(160,123,45,.18);
          border-radius: 50%;
        }

        .premium-hero::after {
          content: "";
          position: absolute;
          width: 720px;
          height: 720px;
          right: -300px;
          top: -270px;
          border: 1px solid rgba(160,123,45,.10);
          border-radius: 50%;
        }

        .premium-copy {
          position: relative;
          z-index: 5;
          max-width: 650px;
        }

        .premium-eyebrow {
          display: flex;
          align-items: center;
          gap: 13px;
          color: #a37b29;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .30em;
          margin-bottom: 25px;
        }

        .premium-eyebrow::before {
          content: "";
          width: 38px;
          height: 1px;
          background: #a37b29;
        }

        .premium-title {
          margin: 0;
          color: #173f2a;
          font-size: clamp(55px, 6.4vw, 96px);
          line-height: .92;
          letter-spacing: -.055em;
          font-weight: 600;
        }

        .premium-title em {
          display: block;
          color: #a37b29;
          font-family: Georgia, serif;
          font-weight: 400;
          letter-spacing: -.045em;
        }

        .premium-description {
          max-width: 530px;
          margin: 30px 0 34px;
          color: #536057;
          font-size: 16px;
          line-height: 1.8;
        }

        .premium-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .premium-primary,
        .premium-secondary {
          border: 0;
          cursor: pointer;
          padding: 15px 23px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
          transition: .35s ease;
        }

        .premium-primary {
          color: #fff;
          background: #17472d;
          box-shadow: 0 15px 35px rgba(23,71,45,.18);
        }

        .premium-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 42px rgba(23,71,45,.28);
        }

        .premium-secondary {
          color: #23432f;
          background: rgba(255,255,255,.55);
          border: 1px solid rgba(23,71,45,.14);
        }

        .premium-secondary:hover {
          background: #fff;
          transform: translateY(-3px);
        }

        .premium-stats {
          display: flex;
          gap: 38px;
          margin-top: 48px;
        }

        .premium-stat {
          position: relative;
          padding-left: 18px;
        }

        .premium-stat::before {
          content: "";
          position: absolute;
          left: 0;
          top: 5px;
          width: 2px;
          height: 35px;
          background: #b28a37;
        }

        .premium-stat strong {
          display: block;
          color: #173f2a;
          font-family: Georgia, serif;
          font-size: 22px;
        }

        .premium-stat span {
          display: block;
          margin-top: 4px;
          color: #737b72;
          font-size: 10px;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        /* ================================
           IMAGE SKELETON + FADE-IN
        ================================= */

        .smart-img {
          color: transparent; /* alt text flash aagama */
        }

        .smart-img:not(.is-loaded) {
          background:
            linear-gradient(
              100deg,
              rgba(23,63,42,.05) 20%,
              rgba(163,125,43,.16) 50%,
              rgba(23,63,42,.05) 80%
            );
          background-size: 200% 100%;
          animation: imgShimmer 1.3s linear infinite;
          border-radius: 14px;
        }

        .smart-img.is-loaded {
          animation: imgFadeIn .5s ease both;
        }

        .smart-img.is-failed {
          opacity: .25;
        }

        @keyframes imgShimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }

        @keyframes imgFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ================================
           3D ORBITAL PRODUCT SHOWCASE
        ================================= */

        .orbital-stage {
          position: relative;
          width: min(48vw, 700px);
          height: min(48vw, 700px);
          min-height: 520px;
          margin-left: auto;
          perspective: 1600px;
          -webkit-perspective: 1600px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orbital-glow {
          position: absolute;
          width: 310px;
          height: 310px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(184,145,56,.25) 0%,
            rgba(184,145,56,.08) 38%,
            transparent 72%
          );
          filter: blur(5px);
        }

        .orbital-ring {
          position: absolute;
          width: 510px;
          height: 510px;
          border: 1px solid rgba(165,126,48,.19);
          border-radius: 50%;
          transform: rotateX(67deg) rotateZ(-7deg);
        }

        .orbital-ring::before,
        .orbital-ring::after {
          content: "";
          position: absolute;
          inset: 28px;
          border: 1px dashed rgba(23,71,45,.11);
          border-radius: 50%;
        }

        .orbital-ring::after {
          inset: 72px;
          border-style: solid;
          opacity: .55;
        }

        .orbit-system {
          position: absolute;
          width: 440px;
          height: 440px;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          will-change: transform;
          animation: orbitalRotate 22s linear infinite;
        }

        .orbit-system:hover,
        .orbit-system:hover .orbit-product-card {
          animation-play-state: paused;
        }

        .orbit-product {
          --angle: 0deg;
          --depth: 0px;
          position: absolute;
          left: 50%;
          top: 50%;
          width: 170px;
          height: 225px;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          transform:
            translate(-50%, -50%)
            rotateY(var(--angle))
            translateZ(210px)
            rotateY(calc(var(--angle) * -1));
        }

        /* Card always faces the viewer: counter-rotates against the orbit */
        .orbit-product-card {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 17px 15px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: column;
          border: 1px solid rgba(255,255,255,.85);
          border-radius: 26px;
          background: linear-gradient(
            145deg,
            rgba(255,255,255,.88),
            rgba(247,243,231,.70)
          );
          box-shadow:
            0 25px 60px rgba(46,54,39,.14),
            inset 0 1px 0 rgba(255,255,255,.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: transform;
          transform: rotateX(-4deg);
          animation: orbitalCounter 22s linear infinite;
        }

        .orbit-product-card::before {
          content: "";
          position: absolute;
          inset: 7px;
          border: 1px solid rgba(163,125,43,.10);
          border-radius: 20px;
          pointer-events: none;
        }

        .orbit-product img {
          width: 125px;
          height: 155px;
          object-fit: contain;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 18px 15px rgba(35,43,32,.18));
          transition: transform .5s ease;
        }

        .orbit-product:hover img {
          transform: scale(1.08) translateY(-5px);
        }

        .orbit-brand {
          align-self: flex-start;
          position: relative;
          z-index: 3;
          color: #a37b29;
          font-size: 9px;
          letter-spacing: .16em;
          text-transform: uppercase;
          font-weight: 800;
        }

        .orbit-name {
          position: relative;
          z-index: 3;
          width: 100%;
          color: #173f2a;
          font-family: Georgia, serif;
          font-size: 14px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .orbit-number {
          position: absolute;
          right: 14px;
          top: 12px;
          color: rgba(23,63,42,.18);
          font-family: Georgia, serif;
          font-size: 22px;
          z-index: 3;
        }

        .orbital-center {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 155px;
          height: 155px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background:
            radial-gradient(
              circle at 35% 30%,
              #346c4b,
              #173f2a 65%
            );
          box-shadow:
            0 30px 70px rgba(23, 63, 42, .28),
            inset 0 1px 0 rgba(255, 255, 255, .2);
          z-index: 20;
          color: #f7f0dc;
          pointer-events: none;
        }

        .orbital-center::before {
          content: "";
          position: absolute;
          inset: -13px;
          border: 1px solid rgba(163,125,43,.32);
          border-radius: 50%;
        }

        .orbital-center span {
          display: block;
          font-size: 8px;
          letter-spacing: .25em;
          line-height: 1.8;
        }

        .orbital-center strong {
          display: block;
          margin-top: 5px;
          font-family: Georgia, serif;
          font-size: 20px;
          font-weight: 400;
        }

        .orbit-caption {
          position: absolute;
          right: 0;
          bottom: 35px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #667066;
          font-size: 9px;
          letter-spacing: .17em;
          text-transform: uppercase;
        }

        .orbit-caption::before {
          content: "";
          width: 28px;
          height: 1px;
          background: #a37b29;
        }

        @keyframes orbitalRotate {
          from {
            transform: rotateY(0deg) rotateX(4deg);
          }
          to {
            transform: rotateY(360deg) rotateX(4deg);
          }
        }

        /* exact opposite of orbitalRotate, so cards never show mirrored */
        @keyframes orbitalCounter {
          from {
            transform: rotateX(-4deg) rotateY(0deg);
          }
          to {
            transform: rotateX(-4deg) rotateY(-360deg);
          }
        }

        /* ===== Brands that move: auto-scroll marquee (JS driven) ===== */
    .featured-section .mini-marquee .mini-track {
  display: flex !important;
  flex-flow: row nowrap !important;
  width: max-content !important;
  min-width: max-content !important;
  gap: 0 !important;
  animation: none !important;
  will-change: transform;
}

.featured-section .mini-marquee .mini-track > .mini-card,
.featured-section .mini-marquee .mini-track > .mini-card:not(:first-child),
.featured-section .mini-marquee .mini-track > .mini-card:nth-child(n) {
  display: flex !important;
  flex-direction: column !important;
  flex: 0 0 auto !important;
  width: 260px !important;
  max-width: none !important;
  margin: 0 18px 0 0 !important;
  opacity: 1 !important;
  visibility: visible !important;
  transform: none !important;
  content-visibility: visible !important;
  contain: none !important;
}

@media (max-width: 650px) {
  .featured-section .mini-marquee .mini-track > .mini-card,
  .featured-section .mini-marquee .mini-track > .mini-card:nth-child(n) {
    width: 150px !important;
    margin-right: 10px !important;
  }
}

        @media (max-width: 1000px) {
          .premium-hero {
            grid-template-columns: 1fr;
            align-items: start;
            min-height: auto;
            padding-top: 30px;
            row-gap: 10px;
          }

          /* orbit first, text keela */
          .orbital-stage {
            order: -1;
            width: 100%;
            max-width: 700px;
            margin: 0 auto;
          }

          .premium-copy {
            order: 1;
            max-width: 720px;
          }
        }

        @media (max-width: 650px) {
          .premium-hero {
            padding: 45px 22px 60px;
          }

          .premium-title {
            font-size: clamp(48px, 15vw, 72px);
          }

          .premium-description {
            font-size: 14px;
          }

          .premium-stats {
            gap: 18px;
            flex-wrap: wrap;
            margin-top: 35px;
          }

          .premium-stat span {
            font-size: 8px;
          }

          .orbital-stage {
            min-height: 400px;
            height: 410px;
            margin-top: 0;
          }

          .orbital-ring {
            width: 340px;
            height: 340px;
          }

          .orbit-system {
            width: 310px;
            height: 310px;
          }

          .orbit-product {
            width: 125px;
            height: 175px;
            transform:
              translate(-50%, -50%)
              rotateY(var(--angle))
              translateZ(145px)
              rotateY(calc(var(--angle) * -1));
          }

          .orbit-product img {
            width: 88px;
            height: 110px;
          }

          .orbit-product-card {
            border-radius: 19px;
            padding: 12px 10px;
          }

          .orbital-center {
            width: 110px;
            height: 110px;
          }

          .orbital-center strong {
            font-size: 15px;
          }

          .orbit-caption {
            bottom: 5px;
            right: 50%;
            transform: translateX(50%);
            white-space: nowrap;
          }

          .mini-track .mini-card {
            width: 220px !important;
            margin-right: 14px !important;
          }
        }

        /* Reduced motion: orbit-a stop pannama very slow-a vachirukkom */
        @media (prefers-reduced-motion: reduce) {
          .orbit-system,
          .orbit-product-card {
            animation-duration: 60s;
          }

          .premium-primary,
          .premium-secondary {
            transition: none;
          }
        }
      `}</style>

      <section className="premium-hero">
        <div className="premium-copy">
          <p className="premium-eyebrow">
            THIRUPATHI AGENCIES · MADURAI
          </p>

          <h1 className="premium-title">
            Trusted brands.
            <em>Reliable supply.</em>
          </h1>

          <p className="premium-description">
            A professionally curated distribution portfolio connecting
            trusted food, home-care, wellness and everyday brands with
            retailers and businesses across the region.
          </p>

          <div className="premium-actions">
            <button
              className="premium-primary"
              onClick={() => go('/products')}
            >
              Explore our products&nbsp; ↗
            </button>

            <button
              className="premium-secondary"
              onClick={() => go('/contact')}
            >
              Talk to the agency
            </button>
          </div>

          <div className="premium-stats">
            <div className="premium-stat">
              <strong>07+</strong>
              <span>Brand categories</span>
            </div>

            <div className="premium-stat">
              <strong>Regional</strong>
              <span>Distribution support</span>
            </div>

            <div className="premium-stat">
              <strong>Direct</strong>
              <span>Trade enquiries</span>
            </div>
          </div>
        </div>

        {/* 3D ORBITAL PRODUCT CAROUSEL */}
        <div className="orbital-stage">
          <div className="orbital-glow" />
          <div className="orbital-ring" />

          <div className="orbit-system">
            {featured.map((p, i) => {
              const angle = `${i * (360 / featured.length)}deg`

              return (
                <div
                  className="orbit-product"
                  key={p.id}
                  style={{
                    '--angle': angle,
                  }}
                >
                  <div className="orbit-product-card">
                    <span className="orbit-brand">
                      {p.brand}
                    </span>

                    <span className="orbit-number">
                      0{i + 1}
                    </span>

                    <SmartImg src={p.image} alt={p.name} w={400} eager />

                    <span className="orbit-name">
                      {p.name}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* <div className="orbital-center">
            <div>
              <span>THIRUPATHI</span>
              <strong>AGENCY</strong>
              <span>AUTHORISED DISTRIBUTOR</span>
            </div>
          </div> */}

          <div className="orbit-caption">
            Explore our trusted portfolio
          </div>
        </div>
      </section>

      <BrandStrip />

      <section className="home-intro split-section">
        <div>
          <p className="eyebrow">WHAT WE DO</p>
          <h2>
            One agency.
            <br />
            <i>Many trusted shelves.</i>
          </h2>
        </div>

        <div>
          <p>
            Thirupathi Agency is designed as a modern distribution
            partner — clean, premium and easy for retailers to
            understand. Browse the catalogue by brand, discover
            the agency story, and contact the team for trade or
            bulk requirements.
          </p>

          <button
            className="text-link"
            onClick={() => go('/about')}
          >
            Know our story →
          </button>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FEATURED PORTFOLIO</p>
            <h2>
              Brands that <i>move.</i>
            </h2>
          </div>

          <button
            className="text-link"
            onClick={() => go('/products')}
          >
            View full catalogue →
          </button>
        </div>

        <div className="mini-marquee">
  <div className="mini-track" ref={trackRef}>
    {[...marqueeProducts, ...marqueeProducts].map((p, i) => (
      <div
        className="mini-card"
        key={`${p.id}-${i}`}
        aria-hidden={i >= marqueeProducts.length ? 'true' : undefined}
      >
        <SmartImg src={p.image} fallback={p.fallback} alt={p.name} w={300} eager />

        <div>
          <small>{p.brand}</small>
          <strong>{p.name}</strong>
          <span>{p.category}</span>
        </div>
      </div>
    ))}
  </div>
</div>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">FOR RETAILERS & BUSINESS</p>

          <h2>
            Need a dependable
            <br />
            <i>distribution partner?</i>
          </h2>
        </div>

        <button
          className="btn-light"
          onClick={() => go('/contact')}
        >
          Start a conversation ↗
        </button>
      </section>
    </>
  )
}