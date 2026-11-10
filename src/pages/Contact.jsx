import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { products } from "../data/products";

const MAN_IMAGE =
  "https://res.cloudinary.com/gtqzljit/image/upload/v1790870045/Thirupathi_Agency_Brand_Ambassador_Cutout.png";

// const featuredProducts = products.slice(0, 5);
const featuredProducts = [6, 10, 18, 1, 51,]
  .map((index) => products[index])
  .filter(Boolean);
export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    setSent(false);
    setError("");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.currentTarget,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );

      setSent(true);
      e.currentTarget.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Unable to send your enquiry right now. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* =====================================================
          FOUNDER HERO
      ===================================================== */}

      <section className="founder-hero">
        <div className="founder-inner">

          {/* TOP LABEL */}
          <div className="founder-top-label">
            <span>THIRUPATHI AGENCY</span>
            <b>01 / CONTACT</b>
          </div>

          {/* ORBITS */}
          <div className="founder-orbit orbit-large" />
          <div className="founder-orbit orbit-small" />

          {/* BACKGROUND NAME */}
          <div className="founder-name">
            <span>FOUNDER OF</span>

            <h1>ANGUSAMY</h1>

            <p>THIRUPATHI AGENCY</p>
          </div>

          {/* =================================================
              PRODUCTS
          ================================================= */}

          {featuredProducts.map((product, index) => {
            const positions = [
              "product-pos-1",
              "product-pos-2",
              "product-pos-3",
              "product-pos-4",
              "product-pos-5",
            ];

            return (
              <motion.div
                key={product.id}
                className={`founder-product ${positions[index]}`}
                initial={{
                  opacity: 0,
                  scale: 0.7,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="product-circle">
                  <img
                    src={product.image}
                    alt={`${product.brand} ${product.name}`}
                  />
                </div>

                <span>{product.brand}</span>
              </motion.div>
            );
          })}

          {/* =================================================
              CENTER FOUNDER
          ================================================= */}

          <motion.div
            className="founder-man"
            initial={{
              opacity: 0,
              x: "-50%",
              y: 60,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              x: "-50%",
              y: 0,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="man-light" />

            <img
              src={MAN_IMAGE}
              alt="Angusamy - Founder of Thirupathi Agency"
            />
          </motion.div>

          {/* =================================================
              FOUNDER CAPTION
          ================================================= */}

          <motion.div
            className="founder-caption"
            initial={{
              opacity: 0,
              x: 20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.6,
            }}
          >
            <span>THE PERSON BEHIND</span>

            <strong>Angusamy</strong>

            <small>FOUNDER · THIRUPATHI AGENCY</small>
          </motion.div>

          {/* =================================================
              CTA
          ================================================= */}

          <motion.a
            href="#contact-form"
            className="founder-cta"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.8,
            }}
          >
            <span className="cta-text">LET'S TALK</span>
            <span className="cta-arrow">↗</span>
          </motion.a>
        </div>
      </section>

      {/* =====================================================
          CONTACT AREA
      ===================================================== */}

      <section className="contact-wrap" id="contact-form">

        {/* LEFT INFO */}
        <motion.div
          className="contact-info"
          initial={{
            opacity: 0,
            x: -30,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">THIRUPATHI AGENCY</p>

          <h2>
            Talk to the
            <br />
            <i>team.</i>
          </h2>

          <p className="contact-description">
            Have a product requirement, bulk order,
            retail enquiry or distribution opportunity?
            Let's start a conversation.
          </p>

          <div className="contact-list">

            <a href="tel:+919790448985">
              <span>☎</span>
              <p>+91 9790448985</p>
            </a>

            <a href="mailto:thirupathiagencies00@gmail.com">
              <span>✉</span>
              <p>thirupathiagencies00@gmail.com</p>
            </a>


            <div>
              <span>⌖</span>
              <p>Madurai, Tamil Nadu, India</p>
            </div>

            <div>
              <span>◷</span>
              <p>Mon – Sat · 9:00 AM – 7:00 PM</p>
            </div>

          </div>
        </motion.div>

        {/* FORM */}
        <motion.form
          className="contact-form"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onSubmit={handleSubmit}
        >
          <div className="form-top">
            <span>ENQUIRY FORM</span>
            <small>01 / 04</small>
          </div>

          <div className="form-row">

            <label>
              Name
              <input
                required
                name="from_name"
                placeholder="Your name"
              />
            </label>

            <label>
              Phone
              <input
                required
                name="phone"
                placeholder="Mobile number"
              />
            </label>

          </div>

          <label>
            Email
            <input
              type="email"
              required
              name="from_email"
              placeholder="you@example.com"
            />
          </label>

          <label>
            Requirement
            <select name="requirement" required>
              <option>Retail / Trade Enquiry</option>
              <option>Bulk Order</option>
              <option>Product Catalogue</option>
              <option>Distribution Enquiry</option>
            </select>
          </label>

          <label>
            Message
            <textarea
              rows="5"
              name="message"
              placeholder="Tell us what you need…"
            />
          </label>

         <button
  className="btn-primary"
  type="submit"
  disabled={sending}
  aria-busy={sending}
>
  {sending
    ? "Sending..."
    : sent
      ? "Enquiry Sent ✓"
      : "Send Enquiry"}
</button>
          {sent ? (
            <p className="form-note" role="status" style={{ color: "#287447" }}>
              Thank you! Your enquiry has been sent successfully.
            </p>
          ) : error ? (
            <p className="form-note" role="alert" style={{ color: "#b42318" }}>
              {error}
            </p>
          ) : null}
        </motion.form>

      </section>

      {/* =====================================================
          SERVICE AREA
      ===================================================== */}
<section className="map-card">
  <div className="map-content">
    <p className="eyebrow">SERVICE AREA</p>

    <h2>
      Madurai &
      <br />
      <i>surrounding markets.</i>
    </h2>
  </div>

  <div className="map-art">
    <iframe
      src="https://www.google.com/maps/embed?pb=!4v1794290204339!6m8!1m7!1sQOIyqswnIFtp3QO-FQ_e1w!2m2!1d9.905280567178833!2d78.10721914570253!3f251.68530611764334!4f-14.29087291190119!5f0.7820865974627469"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      title="Thirupathi Agency - Madurai Location"
    />
  </div>
</section>

      {/* =====================================================
          STYLES
      ===================================================== */}

      <style>{`

        /* =====================================================
           BASE
        ===================================================== */

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        /* =====================================================
           FOUNDER HERO
        ===================================================== */

        .founder-hero {
          width: 100%;
          min-height: 100svh;
          padding: 35px 5vw;
          background:
            radial-gradient(
              circle at 50% 48%,
              rgba(211,178,99,.20),
              transparent 34%
            ),
            #f7f4ec;
          color: #172018;
          overflow: hidden;
        }

        .founder-inner {
          position: relative;
          width: min(1350px, 100%);
          height: calc(100svh - 70px);
          min-height: 650px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
.btn-primary {
  width: 100%;
  min-height: 58px;
  margin-top: 12px;
  padding: 16px 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #1d2a20;
  border-radius: 8px;

  background: #1d2a20;
  color: #f7f4ec;

  font-family: inherit;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .16em;
  text-transform: uppercase;

  cursor: pointer;
  transition: all .3s ease;
}

.btn-primary:hover:not(:disabled) {
  background: #293b2d;
  border-color: #c9a65c;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(29, 42, 32, .15);
}

.btn-primary:disabled {
  opacity: .7;
  cursor: not-allowed;
}
        /* =====================================================
           TOP LABEL
        ===================================================== */

        .founder-top-label {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 30;

          display: flex;
          align-items: center;
          justify-content: space-between;

          font-size: 9px;
          letter-spacing: .28em;
          color: #a47b2b;
        }

        .founder-top-label b {
          font-weight: 500;
          color: #858980;
          letter-spacing: .15em;
        }

        /* =====================================================
           ORBITS
        ===================================================== */

        .founder-orbit {
          position: absolute;
          left: 50%;
          top: 50%;

          border-radius: 50%;
          pointer-events: none;

          transform: translate(-50%, -50%);
        }

        .orbit-large {
          width: min(78%, 900px);
          aspect-ratio: 1;

          border: 1px solid rgba(164,123,43,.22);

          animation:
            rotateOrbit 35s linear infinite;
        }

        .orbit-small {
          width: min(57%, 650px);
          aspect-ratio: 1;

          border: 1px dashed rgba(164,123,43,.18);

          animation:
            rotateOrbitReverse 27s linear infinite;
        }

        @keyframes rotateOrbit {

          from {
            transform:
              translate(-50%, -50%)
              rotate(0deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(360deg);
          }

        }

        @keyframes rotateOrbitReverse {

          from {
            transform:
              translate(-50%, -50%)
              rotate(360deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotate(0deg);
          }

        }

        /* =====================================================
           BACKGROUND NAME
        ===================================================== */

        .founder-name {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 100%;

          transform:
            translate(-50%, -48%);

          text-align: center;

          z-index: 2;
          pointer-events: none;
        }

        .founder-name span {
          display: block;

          margin-bottom: 8px;

          color: #a47b2b;

          font-size: 11px;
          font-weight: 600;
          letter-spacing: .42em;
        }

        .founder-name h1 {
          margin: 0;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size:
            clamp(95px, 15vw, 220px);

          line-height: .78;

          letter-spacing: -.08em;

          font-weight: 400;

          color:
            rgba(164,123,43,.31);

          white-space: nowrap;
        }

        .founder-name p {
          margin-top: 24px;

          color: #775a25;

          font-size: 10px;

          letter-spacing: .45em;
        }

        /* =====================================================
           CENTER MAN
           IMPORTANT:
           NO CSS TRANSFORM HERE.
           FRAMER MOTION CONTROLS X POSITION.
        ===================================================== */

        .founder-man {
          position: absolute;

          left: 50%;
          bottom: 1%;

          width: min(390px, 31%);
          height: 87%;

          display: flex;
          align-items: flex-end;
          justify-content: center;

          z-index: 10;
        }

        .founder-man img {
          position: relative;

          width: 100%;
          height: 100%;

          object-fit: contain;
          object-position: center bottom;

          z-index: 3;

          filter:
            drop-shadow(
              0 28px 28px
              rgba(30,35,28,.15)
            );

          animation:
            founderFloat 5s ease-in-out infinite;
        }

        .man-light {
          position: absolute;

          left: 50%;
          bottom: 25%;

          width: 280px;
          height: 280px;

          transform:
            translateX(-50%);

          border-radius: 50%;

          background:
            rgba(201,164,83,.16);

          filter: blur(55px);

          z-index: 1;
        }

        @keyframes founderFloat {

          0%,
          100% {
            margin-bottom: 0;
          }

          50% {
            margin-bottom: 7px;
          }

        }

        /* =====================================================
           PRODUCT
        ===================================================== */

        .founder-product {
          position: absolute;

          width: 115px;

          display: flex;
          flex-direction: column;
          align-items: center;

          z-index: 15;
        }

        .product-circle {
          width: 105px;
          height: 105px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 13px;

          border-radius: 50%;

          background:
            rgba(255,253,247,.9);

          border:
            1px solid
            rgba(164,123,43,.3);

          box-shadow:
            0 15px 40px
            rgba(30,35,28,.10);

          overflow: hidden;

          transition:
            transform .35s ease,
            box-shadow .35s ease;
        }

        .product-circle img {
          width: 100%;
          height: 100%;

          object-fit: contain;

          filter:
            drop-shadow(
              0 7px 10px
              rgba(30,35,28,.12)
            );

          animation:
            productFloat 4s ease-in-out infinite;
        }

        .founder-product:hover
        .product-circle {
          transform: scale(1.12);

          box-shadow:
            0 20px 50px
            rgba(164,123,43,.20);
        }

        .founder-product > span {
          margin-top: 9px;

          padding: 7px 15px;

          border-radius: 30px;

          background:
            rgba(255,253,247,.95);

          border:
            1px solid
            rgba(23,32,24,.07);

          box-shadow:
            0 8px 20px
            rgba(30,35,28,.06);

          color: #4f554d;

          font-size: 8px;
          letter-spacing: .16em;

          text-transform: uppercase;

          white-space: nowrap;
        }

        @keyframes productFloat {

          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-7px);
          }

        }

        /* =====================================================
           DESKTOP PRODUCT POSITIONS
        ===================================================== */

        .product-pos-1 {
          top: 8%;
          left: 14%;
        }

        .product-pos-2 {
          top: 11%;
          right: 13%;
        }

        .product-pos-3 {
          top: 43%;
          left: 3%;
        }

        .product-pos-4 {
          top: 46%;
          right: 3%;
        }

        .product-pos-5 {
          bottom: 7%;
          left: 17%;
        }

        /* =====================================================
           CAPTION
        ===================================================== */

        .founder-caption {
          position: absolute;

          right: 9%;
          bottom: 20%;

          z-index: 20;

          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .founder-caption span {
          font-size: 7px;
          letter-spacing: .28em;
          color: #a47b2b;
        }

        .founder-caption strong {
          margin: 7px 0;

          font-family: Georgia, serif;

          font-size: 28px;
          font-weight: 400;
          font-style: italic;

          color: #3f3420;
        }

        .founder-caption small {
          font-size: 7px;
          letter-spacing: .2em;
          color: #7e8078;
        }

        /* =====================================================
           CTA
        ===================================================== */

        .founder-cta {
          position: absolute;

          right: 8%;
          bottom: 7%;

          width: 85px;
          height: 85px;

          z-index: 25;

          border-radius: 50%;

          background: #1d2a20;

          color: #f7f4ec;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          text-decoration: none;

          box-shadow:
            0 18px 35px
            rgba(25,35,27,.18);

          transition:
            transform .3s ease;
        }

        .cta-text {
          font-size: 7px;
          letter-spacing: .15em;
        }

        .cta-arrow {
          margin-top: 5px;

          color: #c9a65c;

          font-size: 18px;
        }

        .founder-cta:hover {
          transform: scale(1.08);
        }

        /* =====================================================
           CONTACT
        ===================================================== */

        .contact-wrap {
          width: min(1180px, 90%);

          margin: auto;

          padding:
            110px 0;

          display: grid;

          grid-template-columns:
            .8fr 1.2fr;

          gap: 90px;

          color: #172018;
        }

        .contact-info {
          padding-top: 20px;
        }

        .contact-info .eyebrow {
          color: #a47b2b;

          font-size: 10px;

          letter-spacing: .3em;
        }

        .contact-info h2 {
          margin:
            25px 0 30px;

          font-size:
            clamp(55px, 6vw, 90px);

          line-height: .88;

          letter-spacing: -.06em;
        }

        .contact-info h2 i {
          font-family: Georgia, serif;
          font-weight: 400;
        }

        .contact-description {
          max-width: 430px;

          color: #737871;

          font-size: 15px;
          line-height: 1.8;

          margin-bottom: 45px;
        }

        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .contact-list a,
        .contact-list div {
          display: flex;
          align-items: center;
          gap: 15px;

          color: #4e554e;

          font-size: 14px;

          text-decoration: none;
        }

        .contact-list p {
          margin: 0;
        }

        .contact-list span {
          width: 32px;
          height: 32px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            rgba(164,123,43,.09);

          color: #a47b2b;

          font-size: 13px;
        }

        /* =====================================================
           FORM
        ===================================================== */

        .contact-form {
          padding: 40px;

          background:
            rgba(255,253,247,.72);

          border:
            1px solid
            rgba(23,32,24,.09);

          box-shadow:
            0 25px 70px
            rgba(30,35,28,.06);
        }

        .form-top {
          display: flex;
          align-items: center;
          justify-content: space-between;

          margin-bottom: 38px;
          padding-bottom: 18px;

          border-bottom:
            1px solid
            rgba(23,32,24,.1);
        }

        .form-top span {
          color: #a47b2b;

          font-size: 9px;
          font-weight: 700;

          letter-spacing: .25em;
        }

        .form-top small {
          color: #9a9e96;

          font-size: 9px;

          letter-spacing: .15em;
        }

        .contact-form label {
          display: flex;
          flex-direction: column;
          gap: 10px;

          margin-bottom: 25px;

          color: #686e67;

          font-size: 10px;

          letter-spacing: .12em;

          text-transform: uppercase;
        }

        .form-row {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 20px;
        }

        .contact-form input,
        .contact-form select,
        .contact-form textarea {
          width: 100%;

          border: none;

          border-bottom:
            1px solid
            rgba(23,32,24,.16);

          background: transparent;

          padding: 13px 0;

          outline: none;

          color: #172018;

          font-family: inherit;

          font-size: 14px;

          resize: vertical;
        }

        .contact-form input:focus,
        .contact-form select:focus,
        .contact-form textarea:focus {
          border-color: #a47b2b;
        }

        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
          color: #a6aaa3;
        }

        .btn-primary {
          width: 100%;

          margin-top: 10px;

          padding: 18px 20px;

          border: none;

          background: #1d2a20;

          color: #f7f4ec;

          display: flex;
          align-items: center;
          justify-content: space-between;

          cursor: pointer;

          font-family: inherit;

          font-size: 9px;

          letter-spacing: .2em;

          transition: .3s ease;
        }

        .button-arrow {
          font-size: 19px;
          color: #c9a65c;
        }

        .btn-primary:hover:not(:disabled) {
          background: #293b2d;
          transform: translateY(-2px);
        }

        .btn-primary:disabled {
          opacity: .65;
          cursor: not-allowed;
          transform: none;
        }

        .form-note {
          display: block;

          margin-top: 18px;

          color: #969b93;

          font-size: 10px;

          line-height: 1.6;
        }

        /* =====================================================
           MAP
        ===================================================== */

        .map-card {
          width: min(1180px, 90%);

          min-height: 430px;

          margin:
            0 auto 110px;

          padding: 65px;

          display: grid;

          grid-template-columns:
            .8fr 1.2fr;

          align-items: center;

          gap: 50px;

          background: #1d2a20;

          color: #f7f4ec;

          overflow: hidden;
        }

        .map-card .eyebrow {
          color: #c9a65c;

          font-size: 9px;

          letter-spacing: .28em;
        }

        .map-card h2 {
          margin-top: 25px;

          font-size:
            clamp(45px, 5vw, 75px);

          line-height: .9;

          letter-spacing: -.055em;
        }

        .map-card h2 i {
          font-family: Georgia, serif;

          font-weight: 400;

          color: #d0aa62;
        }

        .map-art {
          position: relative;

          height: 300px;

          border:
            1px solid
            rgba(247,244,236,.12);

          overflow: hidden;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .map-grid {
          position: absolute;

          inset: 0;

          opacity: .25;

          background-image:
            linear-gradient(
              rgba(255,255,255,.08) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.08) 1px,
              transparent 1px
            );

          background-size: 35px 35px;
        }

        .map-pin {
          position: relative;

          color: #c9a65c;

          font-size: 50px;

          text-shadow:
            0 0 30px
            rgba(201,166,92,.45);
        }

        .map-art small {
          position: absolute;

          bottom: 25px;

          color:
            rgba(247,244,236,.55);

          font-size: 8px;

          letter-spacing: .3em;
        }

        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 900px) {

          .founder-hero {
            padding:
              25px 20px;
          }

          .founder-inner {
            height: 760px;
            min-height: 760px;
          }

          .orbit-large {
            width: 90%;
          }

          .orbit-small {
            width: 65%;
          }

          .founder-name h1 {
            font-size:
              clamp(70px, 14vw, 135px);
          }

          .founder-man {
            width: 40%;
            height: 75%;
          }

          .founder-caption {
            right: 3%;
            bottom: 18%;
          }

          .contact-wrap {
            grid-template-columns: 1fr;
            gap: 65px;
          }

          .contact-info {
            text-align: center;
          }

          .contact-description {
            margin-left: auto;
            margin-right: auto;
          }

          .contact-list {
            align-items: center;
          }

          .map-card {
            grid-template-columns: 1fr;
            padding: 50px;
          }

        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 600px) {

          .founder-hero {
            min-height: 720px;

            padding:
              18px 12px 20px;
          }

          .founder-inner {

            width: 100%;

            height: 680px;
            min-height: 680px;

            overflow: hidden;
          }

          /* TOP */

          .founder-top-label {
            top: 2px;

            padding:
              0 4px;

            font-size: 6px;

            letter-spacing: .2em;
          }

          .founder-top-label b {
            font-size: 5px;
          }

          /* ORBITS */

          .orbit-large {
            width: 108%;
          }

          .orbit-small {
            width: 75%;
          }

          /* BACKGROUND NAME */

          .founder-name {
            top: 45%;

            width: 120%;
          }

          .founder-name span {
            margin-bottom: 6px;

            font-size: 6px;

            letter-spacing: .28em;
          }

          .founder-name h1 {
            font-size:
              clamp(53px, 17.5vw, 78px);

            letter-spacing: -.09em;
          }

          .founder-name p {
            margin-top: 12px;

            font-size: 5px;

            letter-spacing: .25em;
          }

          /* =================================================
             CENTER MAN
             EXACT CENTER
          ================================================= */

          .founder-man {
            left: 50%;

            bottom: 7%;

            width: 58%;
            height: 68%;

            /*
              IMPORTANT:
              NO transform here.
              Framer Motion x="-50%" handles center.
            */
          }

          .founder-man img {
            width: 100%;
            height: 100%;

            object-fit: contain;

            object-position:
              center bottom;
          }

          .man-light {
            width: 170px;
            height: 170px;

            bottom: 25%;
          }

          /* =================================================
             PRODUCTS
          ================================================= */

          .founder-product {
            width: 66px;
          }

          .product-circle {
            width: 62px;
            height: 62px;

            padding: 7px;
          }

          .founder-product > span {
            margin-top: 5px;

            padding:
              5px 8px;

            font-size: 5px;

            letter-spacing: .10em;
          }

          /* TOP LEFT */

          .product-pos-1 {
            top: 9%;
            left: 3%;
          }

          /* TOP RIGHT */

          .product-pos-2 {
            top: 9%;
            right: 3%;
          }

          /* MID LEFT */

          .product-pos-3 {
            top: 42%;
            left: 1%;
          }

          /* MID RIGHT */

          .product-pos-4 {
            top: 42%;
            right: 1%;
          }

          /* BOTTOM LEFT */

          .product-pos-5 {
            bottom: 5%;
            left: 8%;
          }

          /* =================================================
             CAPTION
          ================================================= */

          .founder-caption {
            right: 7%;
            bottom: 5%;

            z-index: 22;
          }

          .founder-caption span {
            font-size: 5px;

            letter-spacing: .18em;
          }

          .founder-caption strong {
            margin: 4px 0;

            font-size: 19px;
          }

          .founder-caption small {
            font-size: 4px;

            letter-spacing: .12em;
          }

          /* =================================================
             CTA
          ================================================= */

          .founder-cta {
            width: 60px;
            height: 60px;

            right: 5%;
            bottom: 19%;

            z-index: 30;
          }

          .cta-text {
            font-size: 5px;
          }

          .cta-arrow {
            font-size: 14px;
            margin-top: 3px;
          }

          /* =================================================
             CONTACT
          ================================================= */

          .contact-wrap {
            width: 90%;

            padding:
              75px 0;

            display: flex;
            flex-direction: column;

            gap: 55px;
          }

          .contact-info {
            padding: 0;

            text-align: left;
          }

          .contact-info .eyebrow {
            font-size: 8px;
          }

          .contact-info h2 {
            margin:
              18px 0 25px;

            font-size:
              clamp(50px, 14vw, 72px);
          }

          .contact-description {
            font-size: 13px;

            line-height: 1.7;

            margin-bottom: 35px;
          }

          .contact-list {
            align-items: flex-start;

            gap: 16px;
          }

          .contact-list a,
          .contact-list div {
            width: 100%;

            font-size: 12px;
          }

          .contact-list span {
            width: 30px;
            height: 30px;
          }

          /* FORM */

          .contact-form {
            width: 100%;

            padding:
              28px 20px;
          }

          .form-top {
            margin-bottom: 30px;
          }

          .form-top span {
            font-size: 8px;
          }

          .form-top small {
            font-size: 7px;
          }

          .form-row {
            grid-template-columns: 1fr;

            gap: 0;
          }

          .contact-form label {
            margin-bottom: 22px;

            font-size: 9px;
          }

          .contact-form input,
          .contact-form select,
          .contact-form textarea {
            font-size: 14px;

            padding:
              11px 0;
          }

          .contact-form textarea {
            min-height: 120px;
          }

          .btn-primary {
            padding:
              17px 16px;
          }

          .form-note {
            font-size: 9px;
          }

          /* MAP */

          .map-card {
            width: 90%;

            margin-bottom: 65px;

            padding:
              35px 22px;

            gap: 35px;
          }

          .map-card h2 {
            font-size:
              clamp(42px, 12vw, 60px);
          }

          .map-art {
            height: 220px;
          }

        }

        /* =====================================================
           SMALL PHONES
        ===================================================== */

        @media (max-width: 380px) {

          .founder-hero {
            min-height: 670px;
          }

          .founder-inner {
            height: 630px;
            min-height: 630px;
          }

          .founder-name h1 {
            font-size: 52px;
          }

          .founder-man {
            width: 60%;
            height: 66%;

            bottom: 7%;
          }

          .founder-product {
            width: 58px;
          }

          .product-circle {
            width: 55px;
            height: 55px;

            padding: 6px;
          }

          .founder-product > span {
            font-size: 4px;
            padding: 4px 7px;
          }

          .product-pos-1 {
            top: 10%;
            left: 2%;
          }

          .product-pos-2 {
            top: 10%;
            right: 2%;
          }

          .product-pos-3 {
            top: 43%;
            left: 0;
          }

          .product-pos-4 {
            top: 43%;
            right: 0;
          }

          .product-pos-5 {
            bottom: 4%;
            left: 6%;
          }

          .founder-caption {
            right: 3%;
            bottom: 5%;
          }

          .founder-caption strong {
            font-size: 16px;
          }

          .founder-cta {
            width: 55px;
            height: 55px;

            right: 3%;
            bottom: 18%;
          }

        }

        /* =====================================================
           VERY SMALL HEIGHT DEVICES
        ===================================================== */

        @media (max-width: 600px) and (max-height: 700px) {

          .founder-inner {
            height: 620px;
            min-height: 620px;
          }

          .founder-man {
             width: 80%;
    height: 80%;
    bottom: 6%;
          }

          .founder-name {
            top: 44%;
          }

          .founder-product {
            transform: scale(.9);
          }

        }

        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {

          .founder-orbit,
          .founder-man img,
          .product-circle img {
            animation: none;
          }

        }

      `}</style>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        className="floating-whatsapp"
        href="https://wa.me/919790448985"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Thirupathi Agency on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16.02 3.2A12.7 12.7 0 0 0 5.1 22.38L3.4 28.6l6.37-1.67A12.7 12.7 0 1 0 16.02 3.2Zm0 23.1c-2 0-3.96-.54-5.66-1.57l-.4-.24-3.78.99 1.01-3.68-.26-.42a10.46 10.46 0 1 1 9.09 4.92Zm5.74-7.83c-.31-.16-1.83-.9-2.11-1-.28-.1-.49-.16-.7.16-.21.31-.8 1-.98 1.2-.18.21-.36.24-.67.08-.31-.16-1.3-.48-2.47-1.52-.91-.81-1.53-1.81-1.71-2.12-.18-.31-.02-.48.14-.64.14-.14.31-.36.46-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.69-.96-2.31-.25-.6-.51-.52-.7-.53h-.6c-.21 0-.55.08-.83.39-.28.31-1.09 1.06-1.09 2.59s1.12 3 1.27 3.21c.16.21 2.2 3.36 5.33 4.71.75.32 1.33.52 1.79.66.75.24 1.44.2 1.98.12.6-.09 1.83-.75 2.09-1.48.26-.73.26-1.35.18-1.48-.08-.13-.28-.21-.59-.37Z"
          />
        </svg>
      </a>

      <style>{`
        .floating-whatsapp {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 9999;
          width: 58px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #25d366;
          color: #fff;
          box-shadow: 0 8px 24px rgba(0, 0, 0, .22);
          transition: transform .25s ease, box-shadow .25s ease;
          text-decoration: none;
          animation: whatsappFloat 3s ease-in-out infinite;
        }

        .floating-whatsapp svg {
          width: 32px;
          height: 32px;
        }

        .floating-whatsapp:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 30px rgba(37, 211, 102, .38);
        }

        @keyframes whatsappFloat {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -7px; }
        }

        @media (max-width: 600px) {
          .floating-whatsapp {
            width: 54px;
            height: 54px;
            right: 16px;
            bottom: 18px;
          }

          .floating-whatsapp svg {
            width: 29px;
            height: 29px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-whatsapp { animation: none; }
        }
      `}</style>

    </>
  );
}