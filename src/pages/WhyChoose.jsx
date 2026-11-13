import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { products } from '../data/products'
const EMBLEM =
  'https://res.cloudinary.com/gtqzljit/image/upload/v1790865783/Thirupathi_Agency_Venkateswara_Emblem.png'
// const featuredProducts = products.slice(0, 6)
// const featuredProducts = [
//   ...new Map(
//     products.map((product) => [product.brand, product])
//   ).values(),
// ];
const featuredProducts = [6, 10, 18, 1, 51, 26]
  .map((index) => products[index])
  .filter(Boolean);
const reasons = [
  'Trusted brands',
  'Reliable supply',
  'Wide product range',
  'Business support',
  'Regional reach',
  'Long-term relationships',
]
export default function WhyChoose() {
  useEffect(() => {
    const canonicalUrl = "https://thirupathiagencies.store/why-choose-us";

    document.title =
      "Why Choose Thirupathi Agencies | 10+ Years in Food Products & Distribution – Jaihindpuram, Madurai";

    const description =
      "Choose Thirupathi Agencies in Jaihindpuram, Madurai for food products and everyday essentials. Explore our complete product range, including RKG Arusuvai Masala and Masbadam, backed by 10+ years of distribution experience.";

    let metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute("content", description);

    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);

    return () => {
      canonical.setAttribute("href", "https://thirupathiagencies.store/");
    };
  }, []);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="why-hero">
        <div className="why-hero-grid">
          <motion.div
            className="why-hero-copy"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="why-hero-eyebrow">
              WHY CHOOSE US
            </span>
            <h1>
              Products move.
              <br />
              <em>Businesses grow.</em>
            </h1>
            <p>
              Thirupathi Agencies supports retailers and businesses in
              Jaihindpuram, Madurai with trusted food products and everyday
              essentials, backed by 10+ years of distribution experience.
            </p>
            <div className="hero-scroll">
              <span>SCROLL TO DISCOVER</span>
              <i>↓</i>
            </div>
          </motion.div>
          {/* RIGHT IMAGE BOX */}
          <motion.div
            className="hero-emblem-box"
            initial={{ opacity: 0, x: 50, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="hero-emblem-glow" />
            <div className="hero-emblem-circle">
              <img
                src={EMBLEM}
                alt="Thirupathi Agency Venkateswara Emblem"
              />
            </div>
            <div className="hero-emblem-label">
              <span>THIRUPATHI AGENCY</span>
              <small>QUALITY · TRUST · SUPPLY</small>
            </div>
            <div className="hero-box-number">
              01
            </div>
          </motion.div>
        </div>
      </section>
      {/* ================= MAIN ================= */}
      <section className="why-products">
        {/* INTRO */}
        <div className="why-intro">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            THE JOURNEY BEHIND EVERY SHELF
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            It starts with a
            <br />
            <em>good product.</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            From Jaihindpuram to businesses across Madurai, we help good
            products reach the right shelves at the right time. Our range
            includes RKG Arusuvai Masala, Masbadam and many other food and
            everyday-use products.
          </motion.p>
        </div>
        {/* ================= PRODUCT ORBIT ================= */}
        <div className="product-orbit-stage">
          <div className="orbit-heading">
            <span>OUR PRODUCT NETWORK</span>
            <p>
              Trusted products moving through
              <br />
              one reliable network.
            </p>
          </div>
          <div className="product-orbit">
            <div className="orbit-track">
              {featuredProducts.map((product, index) => {
                const angles = [0, 60, 120, 180, 240, 300]
                return (
                  <div
                    key={product.id}
                    className="orbit-item"
                    style={{ "--angle": `${angles[index]}deg` }}
                  >
                    <motion.div
  className="orbit-product-reveal"
  initial={{ opacity: 0, scale: 0.45 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{
    duration: 0.65,
    delay: index * 0.1,
    ease: [0.22, 1, 0.36, 1],
  }}
>
  <div className="orbit-product">
    <div className="orbit-product-image">
      <img
        src={product.image}
        alt={`${product.brand} ${product.name}`}
        loading="lazy"
      />
    </div>

    <div className="orbit-product-label">
      <strong>{product.brand}</strong>
      <span>{product.category}</span>
    </div>
  </div>
</motion.div>
                  </div>
                )
              })}
            </div>
            <motion.div
              className="orbit-center"
              initial={{
                opacity: 0,
                scale: 0.65,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.35,
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="orbit-center-inner">
                <img
                  src={EMBLEM}
                  alt="Thirupathi Agency"
                />
                <span>DISTRIBUTION</span>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="orbit-message"
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.45,
            }}
          >
            <span>FROM BRAND</span>
            <i>→</i>
            <span>THIRUPATHI AGENCY</span>
            <i>→</i>
            <span>TO BUSINESS</span>
          </motion.div>
        </div>
{/* ================= MESSAGE ================= */}
        <section className="why-message">
          <motion.div
            className="message-number"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            01
          </motion.div>
          <motion.div
            className="message-content"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span>
              WHAT MAKES THE DIFFERENCE
            </span>
            <h3>
              We don't just
              <br />
              <em>move products.</em>
            </h3>
            <p>
              We create the connection between trusted brands and the
              retailers, businesses and customers across Jaihindpuram and
              Madurai who rely on a dependable supply partner.
            </p>
          </motion.div>
        </section>
        {/* ================= REASONS ================= */}
        <section className="reason-strip">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason}
              className="reason-item"
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
            >
              <span>
                0{index + 1}
              </span>
              <strong>
                {reason}
              </strong>
            </motion.div>
          ))}
        </section>
        {/* ================= COMPLETE PRODUCT RANGE FOR SEO ================= */}
        <section className="why-product-directory" aria-labelledby="why-product-directory-title">
          <div className="why-product-directory-inner">
            <span className="why-product-directory-eyebrow">
              OUR PRODUCT RANGE · JAIHINDPURAM, MADURAI
            </span>
            <h2 id="why-product-directory-title">
              Products available through <em>Thirupathi Agencies.</em>
            </h2>
            <p>
              Explore the food products and everyday essentials listed in our
              catalogue. Thirupathi Agencies serves retailers and businesses
              in Jaihindpuram, Madurai, with a product range that includes
              RKG Arusuvai Masala and Masbadam.
            </p>
            <ul className="why-product-name-list">
              {products
                .filter((product) => product?.name)
                .map((product) => (
                  <li key={product.id || `${product.brand}-${product.name}`}>
                    <strong>{product.name}</strong>
                    {product.brand && <span>{product.brand}</span>}
                  </li>
                ))}
            </ul>
          </div>
        </section>

        {/* ================= FINAL ================= */}
        <section className="why-final">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.9,
            }}
          >
            <span>
              THAT'S WHY
            </span>
            <h2>
              Your business
              <br />
              needs more than
              <br />
              <em>a supplier.</em>
            </h2>
            <p>
              It needs a reliable distribution partner in Jaihindpuram,
              Madurai, who understands the products behind every shelf.
            </p>
            <div className="final-brand">
              THIRUPATHI AGENCIES
            </div>
          </motion.div>
        </section>
      </section>
      {/* ================= STYLES ================= */}
      <style>{`
        * {
          box-sizing: border-box;
        }
        /* ================= HERO ================= */
        .why-hero {
          min-height: 88vh;
          background:
            radial-gradient(
              circle at 75% 45%,
              rgba(205, 169, 87, 0.13),
              transparent 32%
            ),
            #f7f4ec;
          color: #172018;
          display: flex;
          align-items: center;
          overflow: hidden;
          position: relative;
        }
        .why-hero::before {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          border: 1px solid rgba(23, 32, 24, 0.06);
          border-radius: 50%;
          right: -170px;
          top: 50%;
          transform: translateY(-50%);
        }
        .why-hero-grid {
          width: min(1250px, 88%);
          margin: auto;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: 80px;
        }
        .why-hero-eyebrow {
          color: #a47b2b;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.3em;
        }
        .why-hero h1 {
          margin: 25px 0;
          font-size: clamp(58px, 8vw, 115px);
          line-height: 0.86;
          letter-spacing: -0.07em;
          font-weight: 600;
        }
        .why-hero h1 em {
          font-family: Georgia, serif;
          font-weight: 400;
        }
        .why-hero-copy p {
          max-width: 520px;
          color: #686d65;
          font-size: 18px;
          line-height: 1.7;
        }
        .hero-scroll {
          margin-top: 65px;
          display: flex;
          align-items: center;
          gap: 18px;
          color: #858a82;
          font-size: 9px;
          letter-spacing: 0.25em;
        }
        .hero-scroll i {
          font-style: normal;
          color: #a47b2b;
          font-size: 20px;
          animation: heroArrow 1.5s ease-in-out infinite;
        }
        @keyframes heroArrow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(7px);
          }
        }
        /* HERO IMAGE BOX */
        .hero-emblem-box {
          height: 560px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.7),
              rgba(237,232,219,0.6)
            );
          border: 1px solid rgba(23, 32, 24, 0.09);
          overflow: hidden;
        }
        .hero-emblem-box::before {
          content: "";
          position: absolute;
          inset: 18px;
          border: 1px solid rgba(164, 123, 43, 0.22);
        }
        .hero-emblem-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(196, 154, 76, 0.16);
          filter: blur(55px);
        }
        .hero-emblem-circle {
          position: relative;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(
              circle,
              #fffdf7 0%,
              #f1ead9 68%,
              #dfcfaa 100%
            );
          border: 1px solid rgba(164, 123, 43, 0.35);
          box-shadow:
            0 35px 80px rgba(25, 32, 26, 0.13);
          animation: emblemFloat 5s ease-in-out infinite;
        }
        .hero-emblem-circle::before {
          content: "";
          position: absolute;
          inset: 13px;
          border: 1px solid rgba(164, 123, 43, 0.25);
          border-radius: 50%;
        }
        .hero-emblem-circle img {
          width: 76%;
          height: 76%;
          object-fit: contain;
          position: relative;
          z-index: 2;
          filter: drop-shadow(
            0 14px 15px rgba(40, 40, 30, 0.12)
          );
        }
        @keyframes emblemFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .hero-emblem-label {
          position: absolute;
          bottom: 28px;
          left: 0;
          right: 0;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 7px;
          z-index: 5;
        }
        .hero-emblem-label span {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.25em;
        }
        .hero-emblem-label small {
          color: #a47b2b;
          font-size: 8px;
          letter-spacing: 0.28em;
        }
        .hero-box-number {
          position: absolute;
          top: 35px;
          right: 35px;
          color: #a47b2b;
          font-size: 11px;
          letter-spacing: 0.2em;
        }
        /* ================= MAIN ================= */
        .why-products {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 50% 20%,
              rgba(220, 188, 111, 0.14),
              transparent 30%
            ),
            #f7f4ec;
          color: #172018;
        }
        /* INTRO */
        .why-intro {
          width: min(900px, 88%);
          margin: auto;
          min-height: 75vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          align-items: center;
        }
        .why-intro > span {
          font-size: 10px;
          letter-spacing: 0.3em;
          font-weight: 700;
          color: #a47b2b;
        }
        .why-intro h2 {
          margin: 28px 0 24px;
          font-size: clamp(55px, 8vw, 110px);
          line-height: 0.9;
          letter-spacing: -0.065em;
          font-weight: 600;
        }
        .why-intro h2 em {
          font-family: Georgia, serif;
          font-weight: 400;
        }
        .why-intro p {
          max-width: 520px;
          margin: 0;
          color: #686d65;
          font-size: 17px;
          line-height: 1.7;
        }
        /* PRODUCT ORBIT */
        .product-orbit-stage {
          position: relative;
          width: 100%;
          min-height: 1050px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background:
            radial-gradient(
              circle at center,
              rgba(218, 184, 103, 0.14),
              transparent 31%
            );
        }
        .orbit-heading {
          position: absolute;
          top: 86px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          text-align: center;
          width: min(90%, 600px);
        }
        .orbit-heading span {
          display: block;
          color: #a47b2b;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.28em;
        }
        .orbit-heading p {
          margin: 14px 0 0;
          color: #777c74;
          font-size: 15px;
          line-height: 1.6;
        }
        .product-orbit {
          position: relative;
          width: 720px;
          height: 720px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .product-orbit::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(164, 123, 43, 0.20);
          box-shadow:
            0 0 0 42px rgba(164, 123, 43, 0.025),
            0 0 0 84px rgba(164, 123, 43, 0.018);
        }
        .product-orbit::after {
          content: "";
          position: absolute;
          width: 430px;
          height: 430px;
          border-radius: 50%;
          border: 1px dashed rgba(23, 32, 24, 0.10);
        }
        .orbit-track {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          animation: productOrbit 30s linear infinite;
          z-index: 4;
        }
        .orbit-item {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 150px;
          height: 190px;
          margin-left: -75px;
          margin-top: -95px;
          transform:
            rotate(var(--angle))
            translateY(-360px);
        }
        .orbit-product {
           width: 150px;
  min-height: 190px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;


          /*
           * The orbit itself rotates, but each product also
           * counter-rotates from its starting angle. This keeps
           * the product pack and its label upright at every point.
           */
          animation: productCounterOrbit 30s linear infinite;
          cursor: pointer;
          transform-origin: center center;
        }
        .orbit-item {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 190px;
  margin-left: -75px;
  margin-top: -95px;
  transform: rotate(var(--angle)) translateY(-360px);
}
        .orbit-product-image {
          width: 145px;
          height: 145px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.45s ease;
        }
        .orbit-product-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter:
            drop-shadow(
              0 18px 18px rgba(30, 35, 28, 0.15)
            );
          transition:
            transform 0.45s ease,
            filter 0.45s ease;
        }
        .orbit-product:hover .orbit-product-image {
          transform: scale(1.14);
        }
        .orbit-product:hover .orbit-product-image img {
          filter:
            drop-shadow(
              0 24px 25px rgba(30, 35, 28, 0.20)
            );
        }
        .orbit-product-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          margin-top: 3px;
          padding: 6px 11px;
          border-radius: 999px;
          background: rgba(247, 244, 236, 0.84);
          backdrop-filter: blur(8px);
          text-align: center;
        }
        .orbit-product-label strong {
          color: #172018;
          font-size: 10px;
          letter-spacing: 0.14em;
        }
        .orbit-product-label span {
          color: #858a82;
          font-size: 7px;
          letter-spacing: 0.11em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .orbit-center {
          position: relative;
          z-index: 10;
          width: 350px;
          height: 350px;
          padding: 2px;
          border-radius: 50%;
          background:
            linear-gradient(
              145deg,
              #b58a37,
              #ead9ae,
              #b58a37
            );
          box-shadow:
            0 35px 90px rgba(35, 42, 34, 0.15);
        }
        .orbit-center-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background:
            radial-gradient(
              circle at center,
              #fffef9,
              #f8f3e7
            );
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
        }
        .orbit-center-inner img {
          width: 82%;
          height: 82%;
          object-fit: contain;
          filter:
            drop-shadow(
              0 18px 18px rgba(30, 35, 28, 0.13)
            );
          animation: centerLogoFloat 4s ease-in-out infinite;
        }
        .orbit-center-inner span {
          margin-top: -27px;
          color: #a47b2b;
          font-size: 7px;
          letter-spacing: 0.35em;
        }
        .orbit-message {
          position: absolute;
          bottom: 72px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 17px;
          white-space: nowrap;
          color: #858a82;
          font-size: 8px;
          letter-spacing: 0.25em;
        }
        .orbit-message i {
          color: #b58a37;
          font-size: 18px;
          font-style: normal;
        }
        @keyframes productOrbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes productCounterOrbit {
          from {
            transform: rotate(calc(-1 * var(--angle)));
          }
          to {
            transform: rotate(calc(-360deg - var(--angle)));
          }
        }
        @keyframes centerLogoFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-7px);
          }
        }
        /* MESSAGE */
        .why-message {
          width: min(1100px, 88%);
          margin: auto;
          min-height: 80vh;
          display: grid;
          grid-template-columns: 120px 1fr;
          align-items: center;
          gap: 50px;
          border-top: 1px solid rgba(23, 32, 24, 0.1);
        }
        .message-number {
          font-size: 13px;
          color: #b58a37;
          letter-spacing: 0.2em;
        }
        .message-content > span {
          font-size: 10px;
          letter-spacing: 0.28em;
          color: #9a9e96;
        }
        .message-content h3 {
          margin: 28px 0;
          font-size: clamp(60px, 8vw, 115px);
          line-height: 0.88;
          letter-spacing: -0.065em;
          font-weight: 600;
        }
        .message-content h3 em {
          font-family: Georgia, serif;
          font-weight: 400;
        }
        .message-content p {
          max-width: 560px;
          color: #676d65;
          font-size: 18px;
          line-height: 1.7;
        }
        /* REASONS */
        .reason-strip {
          width: min(1200px, 88%);
          margin: auto;
          border-top: 1px solid rgba(23, 32, 24, 0.12);
          border-bottom: 1px solid rgba(23, 32, 24, 0.12);
        }
        .reason-item {
          display: grid;
          grid-template-columns: 80px 1fr;
          align-items: center;
          min-height: 95px;
          border-bottom: 1px solid rgba(23, 32, 24, 0.08);
        }
        .reason-item:last-child {
          border-bottom: none;
        }
        .reason-item span {
          color: #b58a37;
          font-size: 11px;
          letter-spacing: 0.15em;
        }
        .reason-item strong {
          font-size: clamp(22px, 3vw, 34px);
          font-weight: 500;
          letter-spacing: -0.025em;
        }
        /* COMPLETE PRODUCT DIRECTORY */
        .why-product-directory {
          padding: 110px 6%;
          background: #fbf9f2;
          color: #172018;
        }

        .why-product-directory-inner {
          width: min(1200px, 88%);
          margin: auto;
        }

        .why-product-directory-eyebrow {
          color: #a47b2b;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.25em;
        }

        .why-product-directory h2 {
          max-width: 850px;
          margin: 22px 0;
          font-size: clamp(38px, 5vw, 68px);
          line-height: 0.98;
          letter-spacing: -0.055em;
          font-weight: 600;
        }

        .why-product-directory h2 em {
          font-family: Georgia, serif;
          font-weight: 400;
        }

        .why-product-directory p {
          max-width: 760px;
          margin: 0 0 38px;
          color: #686d65;
          font-size: 16px;
          line-height: 1.8;
        }

        .why-product-name-list {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0 28px;
          margin: 0;
          padding: 0;
          list-style: none;
          border-top: 1px solid rgba(23, 32, 24, 0.12);
        }

        .why-product-name-list li {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(23, 32, 24, 0.10);
        }

        .why-product-name-list strong {
          color: #172018;
          font-size: 14px;
          font-weight: 600;
        }

        .why-product-name-list span {
          color: #858a82;
          font-size: 11px;
          letter-spacing: 0.06em;
        }

        /* FINAL */
        .why-final {
          min-height: 100vh;
          display: grid;
          place-items: center;
          text-align: center;
          padding: 130px 6vw;
          background: #1d2a20;
          color: #f7f4ec;
          margin-top: 150px;
        }
        .why-final > div > span {
          color: #c49b4c;
          font-size: 10px;
          letter-spacing: 0.3em;
        }
        .why-final h2 {
          margin: 35px 0;
          font-size: clamp(60px, 9vw, 130px);
          line-height: 0.85;
          letter-spacing: -0.07em;
          font-weight: 600;
        }
        .why-final h2 em {
          color: #d0a85b;
          font-family: Georgia, serif;
          font-weight: 400;
        }
        .why-final p {
          color: rgba(247, 244, 236, 0.62);
          font-size: 18px;
        }
        .final-brand {
          margin-top: 55px;
          font-size: 11px;
          letter-spacing: 0.3em;
          color: #c49b4c;
        }
        /* ================= MOBILE ================= */
        @media (max-width: 768px) {
          .why-product-directory {
            padding: 80px 0;
          }

          .why-product-directory-inner {
            width: 88%;
          }

          .why-product-name-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0 16px;
          }

          .why-hero {
            min-height: auto;
            padding: 80px 0 55px;
          }
          .why-hero-grid {
            width: 88%;
            grid-template-columns: 1fr;
            gap: 55px;
          }
          .why-hero-copy {
            text-align: center;
          }
          .why-hero h1 {
            font-size: clamp(48px, 14vw, 72px);
          }
          .why-hero-copy p {
            margin: auto;
            font-size: 15px;
          }
          .hero-scroll {
            justify-content: center;
            margin-top: 40px;
          }
          .hero-emblem-box {
            height: 420px;
          }
          .hero-emblem-box::before {
            inset: 12px;
          }
          .hero-emblem-circle {
            width: min(270px, 70vw);
            height: min(270px, 70vw);
          }
          .hero-emblem-label {
            bottom: 22px;
          }
          .hero-emblem-label span {
            font-size: 9px;
          }
          .hero-emblem-label small {
            font-size: 6px;
          }
          .hero-box-number {
            top: 25px;
            right: 25px;
          }
          .why-intro {
            min-height: 65vh;
          }
          .why-intro h2 {
            font-size: clamp(48px, 14vw, 70px);
          }
          .why-intro p {
            font-size: 15px;
          }
          .product-orbit-stage {
            min-height: 800px;
          }
          .orbit-heading {
            top: 55px;
            width: 90%;
          }
          .orbit-heading span {
            font-size: 8px;
          }
          .orbit-heading p {
            margin-top: 11px;
            font-size: 12px;
          }
          .product-orbit {
            width: 500px;
            height: 500px;
          }
          .product-orbit::after {
            width: 290px;
            height: 290px;
          }
          .orbit-item {
            width: 105px;
            height: 140px;
            margin-left: -52.5px;
            margin-top: -70px;
            transform:
              rotate(var(--angle))
              translateY(-250px);
          }
          .orbit-product {
            width: 105px;
            min-height: 140px;
          }
          .orbit-product-image {
            width: 95px;
            height: 100px;
          }
          .orbit-product-label {
            gap: 3px;
            padding: 4px 8px;
          }
          .orbit-product-label strong {
            font-size: 7px;
          }
          .orbit-product-label span {
            font-size: 5px;
          }
          .orbit-center {
            width: 245px;
            height: 245px;
          }
          .orbit-center-inner img {
            width: 84%;
            height: 84%;
          }
          .orbit-center-inner span {
            margin-top: -21px;
            font-size: 5px;
          }
          .orbit-message {
            bottom: 40px;
            gap: 9px;
            font-size: 6px;
            letter-spacing: 0.15em;
          }
          .orbit-message i {
            font-size: 14px;
          }
          .why-message {
            min-height: 75vh;
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 100px 0;
          }
          .message-content h3 {
            font-size: clamp(50px, 15vw, 75px);
          }
          .message-content p {
            font-size: 15px;
          }
          .reason-item {
            grid-template-columns: 45px 1fr;
            min-height: 85px;
          }
          .reason-item strong {
            font-size: 21px;
          }
          .why-final {
            min-height: 80vh;
            margin-top: 100px;
            padding: 100px 7vw;
          }
          .why-final h2 {
            font-size: clamp(52px, 15vw, 85px);
          }
        }
        @media (max-width: 420px) {
          .why-hero-grid {
            width: 90%;
          }
          .hero-emblem-box {
            height: 370px;
          }
          .hero-emblem-circle {
            width: 230px;
            height: 230px;
          }
          .product-orbit-stage {
            min-height: 690px;
          }
          .product-orbit {
            width: 390px;
            height: 390px;
          }
          .product-orbit::before {
            box-shadow:
              0 0 0 24px rgba(164, 123, 43, 0.025),
              0 0 0 48px rgba(164, 123, 43, 0.018);
          }
          .product-orbit::after {
            width: 225px;
            height: 225px;
          }
          .orbit-item {
            width: 82px;
            height: 108px;
            margin-left: -41px;
            margin-top: -54px;
            transform:
              rotate(var(--angle))
              translateY(-195px);
          }
          .orbit-product {
            width: 82px;
            min-height: 108px;
          }
          .orbit-product-image {
            width: 75px;
            height: 76px;
          }
          .orbit-product-label {
            padding: 3px 6px;
          }
          .orbit-product-label strong {
            font-size: 6px;
          }
          .orbit-product-label span {
            display: none;
          }
          .orbit-center {
            width: 205px;
            height: 205px;
          }
          .orbit-center-inner img {
            width: 84%;
            height: 84%;
          }
          .orbit-center-inner span {
            margin-top: -17px;
            font-size: 4px;
          }
          .orbit-heading {
            top: 38px;
          }
          .orbit-heading p {
            font-size: 10px;
          }
          .orbit-message {
            bottom: 28px;
          }
        }
          .floating-product {
            transform: scale(0.58);
          }
          .core-ring {
            width: 205px;
            height: 205px;
          }
          .core-image {
            width: 70px;
            height: 70px;
          }
          .core-inner strong {
            font-size: 12px;
          }
          .product-one {
            left: -15%;
          }
          .product-two {
            right: -15%;
          }
          .product-three {
            left: -18%;
          }
          .product-four {
            right: -18%;
          }
          .product-five {
            left: -13%;
          }
          .product-six {
            right: -13%;
          }
        }
      `}</style>
    </>
  )
}
