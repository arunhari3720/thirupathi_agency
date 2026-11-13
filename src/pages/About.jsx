import React, { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { products } from "../data/products";

const EASE = [0.22, 1, 0.36, 1];

/* =========================================================
   RETAILER REVIEWS
   ========================================================= */

const reviews = [
  {
    name: "முருகன்",
    area: "அண்ணாநகர்",
    shop: "முருகன் மளிகை",
    image:
      "https://res.cloudinary.com/gtqzljit/image/upload/v1790822817/Twilight_at_Murugan_s_Neighborhood_Grocery.png",
    text: "எங்கள் கடைக்கு ஏதாவது பொருள் அவசரமாக தேவைப்பட்டாலும் உடனே சொல்லி அனுப்பிடுறாங்க. சின்ன கடைன்னு பார்க்காம எங்களுக்கு தேவையான support கொடுக்கிறாங்க.",
  },
  {
    name: "சரவணன்",
    area: "தல்லாகுளம்",
    shop: "ஸ்ரீ விநாயகா ஸ்டோர்ஸ்",
    image:
      "https://res.cloudinary.com/gtqzljit/image/upload/v1790822972/Vibrant_Indian_Neighborhood_Provision_Store_1.png",
    text: "Regular supply எங்களுக்கு ரொம்ப முக்கியம். கேட்ட பொருட்களை arrange பண்ணி சரியான நேரத்துக்கு delivery பண்ணிடுறாங்க. அதனால நம்பிக்கையா தொடர்ந்து வாங்கிட்டு இருக்கோம்.",
  },
  {
    name: "குமார்",
    area: "வில்லாபுரம்",
    shop: "குமார் மளிகை",
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1000&q=88",
    text: "ஒரு பொருள் இல்லன்னு customer கேட்டா நாங்க உடனே Thirupathi Agency-க்கு சொல்லிடுவோம். முடிஞ்ச அளவுக்கு சீக்கிரம் arrange பண்ணி கொடுத்துடுறாங்க.",
  },
  {
    name: "ரமேஷ்",
    area: "மாட்டுத்தாவணி",
    shop: "ரமேஷ் சூப்பர் மார்க்கெட்",
    image:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1000&q=88",
    text: "பல category பொருட்களையும் ஒரே இடத்துல வாங்கிக்கலாம். Delivery-யும் consistent-ஆ இருக்கு. எங்களுக்கு business பண்ணுறதுல இது பெரிய வசதி.",
  },
];

/* =========================================================
   STICKY STORY CARD
   SAME SCROLL STYLE AS YOUR PASTED FILE
   ========================================================= */

function StoryCard({ item, index }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.13]);

  const copyX = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [index % 2 ? 55 : -55, 0, index % 2 ? -25 : 25],
  );

  return (
    <section ref={ref} className="ta-story-card" style={{ zIndex: index + 2 }}>
      <motion.div className={`ta-story-grid ${index % 2 ? "reverse" : ""}`}>
        {/* IMAGE */}

        <motion.div
          className="ta-story-image"
          initial={{
            opacity: 0,
            clipPath: "inset(10% 8% 10% 8% round 32px)",
          }}
          whileInView={{
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0% round 32px)",
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1,
            ease: EASE,
          }}
        >
          <motion.img
            src={item.image}
            alt={item.title}
            style={
              reduceMotion
                ? undefined
                : {
                    y: imageY,
                    scale: imageScale,
                  }
            }
          />

          <div className="ta-image-overlay" />

          <div className="ta-image-chip">
            <span />
            {item.tag}
          </div>
        </motion.div>

        {/* TEXT */}

        <motion.div
          className="ta-story-copy"
          style={
            reduceMotion
              ? undefined
              : {
                  x: copyX,
                }
          }
        >
          <div className="ta-story-number">0{index + 1}</div>

          <p className="ta-eyebrow">{item.eyebrow}</p>

          <h2>
            {item.title}
            <br />
            <i>{item.accent}</i>
          </h2>

          <p className="ta-story-description">{item.description}</p>

          <div className="ta-mini-flow">
            {item.flow.map((step, i) => (
              <React.Fragment key={step}>
                <motion.div
                  className="ta-flow-item"
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
                    delay: i * 0.1,
                    duration: 0.55,
                    ease: EASE,
                  }}
                >
                  <span>0{i + 1}</span>

                  {step}
                </motion.div>

                {i < item.flow.length - 1 && (
                  <span className="ta-flow-arrow">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* =========================================================
   ROUTE ROADMAP
   ========================================================= */

function RouteRoadmap() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.2"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  const number = useTransform(scrollYProgress, [0, 0.7], [0, 150]);

  return (
    <section ref={ref} className="ta-route-section">
      <div className="ta-container">
        <div className="ta-route-heading">
          <div>
            <p className="ta-eyebrow">OUR DELIVERY NETWORK</p>

            <h2>
              One city.
              <br />
              <i>150+ routes.</i>
            </h2>
          </div>

          <p>
            மதுரையை சுற்றியுள்ள பல பகுதிகளில் தினசரி retail stores மற்றும்
            business customers-க்கு supply செய்து வருகிறோம்.
          </p>
        </div>

        <div className="ta-roadmap">
          <div className="ta-roadmap-grid" />

          {/* MAIN ROUTE */}

          <div className="ta-main-route">
            <motion.div
              className="ta-route-progress"
              style={{
                scaleX: lineScale,
              }}
            />
          </div>

          {/* ROUTE STOPS */}

          {[...Array(24)].map((_, i) => {
            const angle = (i / 24) * Math.PI * 2;

            const radius = 120 + (i % 4) * 38;

            const x = 50 + Math.cos(angle) * (radius / 5);

            const y = 50 + Math.sin(angle) * (radius / 3.2);

            return (
              <motion.span
                key={i}
                className="ta-route-stop"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
                animate={{
                  scale: [0.75, 1.15, 0.75],
                  opacity: [0.45, 1, 0.45],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: i * 0.08,
                }}
              />
            );
          })}

          {/* CENTER */}

          <div className="ta-route-center">
            <motion.div
              className="ta-route-ring"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="ta-route-core">TA</div>
            </motion.div>

            <strong>THIRUPATHI</strong>

            <small>AGENCY</small>
          </div>

          {/* COUNTER */}

          <div className="ta-route-counter">
            <motion.strong>
              <motion.span>{number}</motion.span>
              <span>+</span>
            </motion.strong>
            <small>DELIVERY ROUTES</small>
          </div>
        </div>

        <div className="ta-route-process">
          <span>ORDER</span>
          <b>→</b>

          <span>ARRANGE</span>
          <b>→</b>

          <span>DELIVER</span>
          <b>→</b>

          <span>REPEAT</span>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   REVIEWS
   ========================================================= */

function Reviews() {
  return (
    <section className="ta-reviews">
      <div className="ta-container">
        <div className="ta-review-heading">
          <p className="ta-eyebrow">OUR RETAIL PARTNERS</p>

          <h2>
            எங்களோடு தினமும்
            <br />
            <i>பயணிக்கும் கடைகள்.</i>
          </h2>

          <p>
            நாங்கள் சொல்லும் வார்த்தைகளை விட, எங்களுடன் தினமும் வேலை செய்யும்
            retailers சொல்லும் வார்த்தைகள்தான் முக்கியம்.
          </p>
        </div>

        <div className="ta-review-grid">
          {reviews.map((review, index) => (
            <motion.article
              key={review.name}
              className="ta-review-card"
              initial={{
                opacity: 0,
                y: 45,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.18,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.08,
                ease: EASE,
              }}
              whileHover={{
                y: -8,
              }}
            >
              {/* SHOP IMAGE */}

              <div className="ta-review-image">
                <img src={review.image} alt={`${review.shop} retailer`} />

                <div className="ta-shop-label">
                  <span />

                  {review.shop}
                </div>
              </div>

              {/* REVIEW */}

              <div className="ta-review-content">
                <div className="ta-quote">“</div>

                <p>{review.text}</p>

                <div className="ta-review-person">
                  <div>
                    <strong>{review.name}</strong>

                    <small>{review.area}</small>
                  </div>

                  <span>0{index + 1}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN ABOUT PAGE
   ========================================================= */

export default function About() {
  useEffect(() => {
    const canonicalUrl = "https://thirupathiagencies.store/about";

    let canonicalTag = document.querySelector('link[rel="canonical"]');

    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }

    canonicalTag.setAttribute("href", canonicalUrl);
    document.title = "About Thirupathi Agencies | 10+ Years in Food Products & Distribution Across Madurai";
  }, []);

  const stories = [
    {
      eyebrow: "OUR REACH",
      tag: "MADURAI NETWORK",
      title: "மதுரையின்",
      accent: "பாதிக்கும் மேற்பட்ட பகுதிகளில்.",
      description:
        "மதுரையை சுற்றியுள்ள பல பகுதிகளில் உள்ள retail stores மற்றும் business customers-க்கு தொடர்ந்து supply செய்து வருகிறோம்.",
      image: products[58]?.image,
      flow: ["Retailer", "Order", "Delivery"],
    },

    {
      eyebrow: "OUR APPROACH",
      tag: "SMALL STORE · SAME PRIORITY",
      title: "சின்ன கடை",
      accent: "என்றாலும் முக்கியம்.",
      description:
        "ஒரு சின்ன கடைக்கு ஒரு பொருள் அவசரமாக தேவைப்பட்டாலும், எங்களால் முடிந்தவரை விரைவாக arrange செய்து delivery செய்வதே எங்கள் approach.",
      image: products[16]?.image,
      flow: ["Request", "Arrange", "Deliver"],
    },

    {
      eyebrow: "OUR PROMISE",
      tag: "EVERYDAY SUPPLY",
      title: "உங்கள் shelf",
      accent: "empty ஆகாமல்.",
      description:
        "Food, masalas, ghee, beverages, home care மற்றும் everyday essentials — பல categories-ஐ ஒரே reliable distribution network மூலம் கொண்டு சேர்க்கிறோம்.",
      image: products[33]?.image,
      flow: ["Products", "Supply", "Repeat"],
    },
  ];

  return (
    <main className="ta-about">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="ta-hero">
        <div className="ta-container ta-hero-grid">
          <motion.div
            className="ta-hero-copy"
            initial={{
              opacity: 0,
              x: -45,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
              ease: EASE,
            }}
          >
            <p className="ta-eyebrow">ABOUT THIRUPATHI AGENCY</p>

            <h1>
              Distribution
              <br />
              <i>with a human touch.</i>
            </h1>

            <p>
              மதுரையின் retail network-க்கு தேவையான everyday products-ஐ
              நம்பிக்கையோடும் வேகத்தோடும் கொண்டு சேர்ப்பதே எங்கள் வேலை.
            </p>

            <div className="ta-hero-stats">
              <div>
                <strong>50%+</strong>
                <span>MADURAI COVERAGE</span>
              </div>

              <div>
                <strong>150+</strong>
                <span>DELIVERY ROUTES</span>
              </div>

              <div>
                <strong>01</strong>
                <span>RELIABLE PARTNER</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="ta-hero-product"
            initial={{
              opacity: 0,
              scale: 0.88,
              y: 35,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: EASE,
            }}
          >
            <div className="ta-hero-circle" />

            <img src={products[2]?.image} alt="Thirupathi Agency products" />

            <div className="ta-live-pill">
              <span />
              Supplying Madurai
            </div>
          </motion.div>
        </div>
      </section>

      {/* =================================================
          STICKY STORY
      ================================================= */}

      <section className="ta-story-section">
        <div className="ta-container">
          <div className="ta-story-intro">
            <p className="ta-eyebrow">WHAT WE DO</p>

            <h2>
              பெரிய network.
              <br />
              <i>Personal service.</i>
            </h2>

            <p>
              ஒரு பெரிய distribution network இருந்தாலும், எங்களுக்கு ஒவ்வொரு
              கடையும் முக்கியம்.
            </p>
          </div>
        </div>

        <div className="ta-story-stack">
          {stories.map((item, index) => (
            <StoryCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </section>

      {/* =================================================
          ROUTE ROADMAP
      ================================================= */}

      <RouteRoadmap />

      {/* =================================================
          REVIEWS
      ================================================= */}

      <Reviews />

      {/* =================================================
          FINAL CTA
      ================================================= */}

      <section className="ta-final">
        <motion.div
          className="ta-final-inner"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
            ease: EASE,
          }}
        >
          <p className="ta-eyebrow">THE THIRUPATHI PROMISE</p>

          <h2>
            உங்கள் கடைக்கு
            <br />
            <i>நம்பிக்கையான supply.</i>
          </h2>

          <p>தேவையான பொருள். சரியான நேரம். நம்பிக்கையான service.</p>

          <button
            onClick={() => {
              window.location.hash = "/contact";
            }}
          >
            CONTACT US
            <span>→</span>
          </button>
        </motion.div>
      </section>

      {/* =================================================
          CSS
      ================================================= */}

      <style>{`

        /* =========================================
           BASE
        ========================================= */

        .ta-about {
          --ink: #191714;
          --muted: #716c65;
          --cream: #f7f4ee;
          --soft: #fbfaf7;
          --line: rgba(25,23,20,.09);
          --accent: #b47b2c;

          width: 100%;
          overflow: clip;

          background: #fff;
          color: var(--ink);
        }

        .ta-about * {
          box-sizing: border-box;
        }

        .ta-container {
          width: min(1200px, calc(100% - 70px));
          margin: auto;
        }

        .ta-eyebrow {
          margin: 0;

          font-size: 10px;
          font-weight: 850;

          letter-spacing: .16em;
          text-transform: uppercase;

          color: #918a80;
        }


        /* =========================================
           HERO
        ========================================= */

        .ta-hero {
          min-height: 88vh;

          display: flex;
          align-items: center;

          padding: 90px 0;

          background:
            radial-gradient(
              circle at 80% 20%,
              rgba(221,190,135,.24),
              transparent 30%
            ),
            #faf8f3;
        }

        .ta-hero-grid {
          display: grid;

          grid-template-columns: 1fr 1fr;

          align-items: center;

          gap: 70px;
        }

        .ta-hero-copy h1 {
          margin: 18px 0 0;

          font-size: clamp(55px, 7vw, 100px);

          line-height: .86;

          letter-spacing: -.065em;

          font-weight: 850;
        }

        .ta-hero-copy h1 i {
          font-weight: 400;
          color: var(--accent);
        }

        .ta-hero-copy > p:not(.ta-eyebrow) {
          max-width: 540px;

          margin: 32px 0 0;

          font-size: 17px;
          line-height: 1.8;

          color: var(--muted);
        }

        .ta-hero-stats {
          display: flex;

          gap: 40px;

          margin-top: 48px;
        }

        .ta-hero-stats div {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .ta-hero-stats strong {
          font-size: 31px;
          line-height: 1;
        }

        .ta-hero-stats span {
          font-size: 7px;
          font-weight: 800;
          letter-spacing: 1.2px;
          color: #918a80;
        }


        /* HERO PRODUCT */

        .ta-hero-product {
          position: relative;

          min-height: 520px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ta-hero-product img {
          position: relative;
          z-index: 2;

          width: min(470px, 90%);
          height: 470px;

          object-fit: contain;

          filter:
            drop-shadow(
              0 30px 45px rgba(30,25,15,.14)
            );

          animation:
            taFloat 5s ease-in-out infinite;
        }

        @keyframes taFloat {

          0%, 100% {
            transform: translateY(0) rotate(-2deg);
          }

          50% {
            transform: translateY(-13px) rotate(2deg);
          }

        }

        .ta-hero-circle {
          position: absolute;

          width: 400px;
          height: 400px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              #ead8b5,
              #f3ead8 55%,
              transparent 70%
            );
        }

        .ta-live-pill {
          position: absolute;

          z-index: 4;

          right: 4%;
          bottom: 12%;

          display: flex;
          align-items: center;
          gap: 9px;

          padding: 12px 17px;

          border-radius: 100px;

          background: rgba(255,255,255,.92);

          box-shadow:
            0 14px 35px rgba(0,0,0,.1);

          font-size: 10px;
          font-weight: 800;
        }

        .ta-live-pill span {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #62ad61;

          box-shadow:
            0 0 0 5px rgba(98,173,97,.13);
        }


        /* =========================================
           STORY INTRO
        ========================================= */

        .ta-story-section {
          background: #fff;
        }

        .ta-story-intro {
          padding: 125px 0 75px;

          max-width: 900px;
        }

        .ta-story-intro h2 {
          margin: 18px 0 0;

          font-size: clamp(55px, 7vw, 95px);

          line-height: .86;

          letter-spacing: -.065em;
        }

        .ta-story-intro h2 i {
          color: var(--accent);
          font-weight: 400;
        }

        .ta-story-intro > p:last-child {
          max-width: 500px;

          margin-top: 28px;

          font-size: 16px;
          line-height: 1.7;

          color: var(--muted);
        }


        /* =========================================
           STICKY CARDS
           SAME STYLE AS PASTED REFERENCE
        ========================================= */

        .ta-story-stack {
          position: relative;

          background: #fff;
        }

        .ta-story-card {
          position: sticky;

          top: 0;

          min-height: 100vh;
          height: 100vh;

          display: flex;
          align-items: center;

          padding: 55px 0;

          background: #fff;

          overflow: hidden;

          box-shadow:
            0 -15px 45px rgba(25,23,20,.055);
        }

        .ta-story-card:nth-child(even) {
          background: #fcfbf8;
        }

        .ta-story-grid {
          width: min(1200px, calc(100% - 70px));

          margin: auto;

          display: grid;

          grid-template-columns: 1.08fr .92fr;

          align-items: center;

          gap: 90px;
        }

        .ta-story-grid.reverse {
          grid-template-columns: .92fr 1.08fr;
        }

        .ta-story-grid.reverse
        .ta-story-image {
          order: 2;
        }

        .ta-story-grid.reverse
        .ta-story-copy {
          order: 1;
        }


        /* IMAGE */


       /* STORY IMAGE */

.ta-story-image {
  position: relative;
  height: 520px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 34px;
  background: transparent;
  box-shadow: none;
}

.ta-story-image img {
  width: 85%;
  height: 85%;
  object-fit: contain;
  object-position: center;
  display: block;
  margin: 0;
}

/* IMAGE CHIP */

.ta-image-chip {
  position: absolute;
  left: 22px;
  bottom: 22px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 15px;
  border-radius: 100px;
  background: rgba(255,255,255,.94);
  color: #25211b;
  font-size: 10px;
  font-weight: 850;
  box-shadow: 0 12px 30px rgba(0,0,0,.12);
  backdrop-filter: blur(12px);
}

.ta-image-chip span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
}

        /* COPY */

        .ta-story-copy {
          max-width: 520px;

          position: relative;
        }

        .ta-story-number {
          margin-bottom: 20px;

          font-size: 11px;

          font-weight: 900;

          letter-spacing: 2px;

          color: #aaa399;
        }

        .ta-story-copy h2 {
          margin: 14px 0 18px;

          font-size: clamp(45px, 5.2vw, 72px);

          line-height: .92;

          letter-spacing: -.06em;

          font-weight: 850;
        }

        .ta-story-copy h2 i {
          color: var(--accent);

          font-weight: 400;

          font-style: italic;
        }

        .ta-story-description {
          max-width: 470px;

          margin: 0;

          color: var(--muted);

          font-size: 15px;

          line-height: 1.8;
        }


        /* FLOW */

        .ta-mini-flow {
          display: flex;

          align-items: center;

          flex-wrap: wrap;

          gap: 8px;

          margin-top: 30px;
        }

        .ta-flow-item {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          padding: 10px 12px;

          border: 1px solid var(--line);

          border-radius: 11px;

          background: #fff;

          box-shadow:
            0 8px 25px rgba(25,23,20,.045);

          font-size: 10px;

          font-weight: 800;
        }

        .ta-flow-item span {
          color: var(--accent);

          font-size: 8px;
        }

        .ta-flow-arrow {
          color: #b1aaa0;

          font-size: 16px;
        }


        /* =========================================
           ROUTE ROADMAP
        ========================================= */

        .ta-route-section {
          padding: 145px 0 125px;

          background: #f5f1e8;
        }

        .ta-route-heading {
          display: flex;

          justify-content: space-between;

          align-items: end;

          gap: 50px;
        }

        .ta-route-heading h2 {
          margin: 18px 0 0;

          font-size: clamp(55px, 7vw, 100px);

          line-height: .84;

          letter-spacing: -.065em;
        }

        .ta-route-heading h2 i {
          color: var(--accent);

          font-weight: 400;
        }

        .ta-route-heading > p {
          max-width: 360px;

          margin: 0;

          color: var(--muted);

          font-size: 15px;

          line-height: 1.8;
        }


        /* MAP */

        .ta-roadmap {
          position: relative;

          height: 570px;

          margin-top: 75px;

          overflow: hidden;

          border-radius: 35px;

          background: #ebe4d7;

          border: 1px solid rgba(25,23,20,.07);
        }

        .ta-roadmap-grid {
          position: absolute;
          inset: -20%;

          opacity: .17;

          background-image:
            linear-gradient(
              rgba(25,23,20,.16) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(25,23,20,.16) 1px,
              transparent 1px
            );

          background-size: 45px 45px;

          transform:
            perspective(450px)
            rotateX(48deg)
            scale(1.4);
        }

        .ta-main-route {
          position: absolute;

          left: 12%;
          top: 52%;

          width: 76%;

          height: 3px;

          background: rgba(25,23,20,.12);

          transform: rotate(-13deg);
        }

        .ta-route-progress {
          width: 100%;
          height: 100%;

          transform-origin: left;

          background:
            linear-gradient(
              90deg,
              #b47b2c,
              #d6a75f
            );
        }

        .ta-route-stop {
          position: absolute;

          width: 10px;
          height: 10px;

          border-radius: 50%;

          background: #6c8b68;

          box-shadow:
            0 0 0 5px rgba(108,139,104,.12);
        }


        /* CENTER */

        .ta-route-center {
          position: absolute;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -50%);

          display: flex;
          flex-direction: column;

          align-items: center;

          z-index: 5;
        }

        .ta-route-ring {
          width: 115px;
          height: 115px;

          display: grid;

          place-items: center;

          border:
            1px dashed rgba(25,23,20,.35);

          border-radius: 50%;
        }

        .ta-route-core {
          width: 70px;
          height: 70px;

          display: grid;

          place-items: center;

          border-radius: 50%;

          background: #fff;

          box-shadow:
            0 15px 35px rgba(25,23,20,.13);

          font-size: 18px;

          font-weight: 900;

          color: var(--accent);
        }

        .ta-route-center strong {
          margin-top: 15px;

          font-size: 11px;

          letter-spacing: 2px;
        }

        .ta-route-center small {
          margin-top: 3px;

          font-size: 7px;

          letter-spacing: 1.5px;

          color: #928b80;
        }


        /* COUNTER */

        .ta-route-counter {
          position: absolute;

          left: 30px;
          bottom: 28px;

          display: flex;

          flex-direction: column;
        }

        .ta-route-counter strong {
          font-size: 55px;

          line-height: 1;

          letter-spacing: -.04em;
        }

        .ta-route-counter strong span {
          color: var(--accent);
        }

        .ta-route-counter small {
          margin-top: 5px;

          font-size: 8px;

          font-weight: 850;

          letter-spacing: 1.5px;

          color: #918a80;
        }


        /* PROCESS */

        .ta-route-process {
          max-width: 720px;

          margin: 42px auto 0;

          display: flex;

          justify-content: space-between;

          align-items: center;

          font-size: 9px;

          font-weight: 850;

          letter-spacing: 2px;
        }

        .ta-route-process b {
          color: #aaa296;

          font-size: 18px;

          font-weight: 400;
        }


        /* =========================================
           REVIEWS
        ========================================= */

        .ta-reviews {
          padding: 140px 0;

          background: #fff;
        }

        .ta-review-heading {
          max-width: 850px;

          margin-bottom: 70px;
        }

        .ta-review-heading h2 {
          margin: 18px 0;

          font-size: clamp(52px, 6.5vw, 90px);

          line-height: .86;

          letter-spacing: -.065em;
        }

        .ta-review-heading h2 i {
          color: var(--accent);

          font-weight: 400;
        }

        .ta-review-heading > p:last-child {
          max-width: 540px;

          color: var(--muted);

          font-size: 15px;

          line-height: 1.8;
        }


        /* REVIEW GRID */

        .ta-review-grid {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 26px;
        }

        .ta-review-card {
          overflow: hidden;

          border:
            1px solid rgba(25,23,20,.08);

          border-radius: 25px;

          background: #faf8f3;

          box-shadow:
            0 15px 45px rgba(25,23,20,.06);

          transition:
            box-shadow .4s ease;
        }

        .ta-review-card:hover {
          box-shadow:
            0 25px 65px rgba(25,23,20,.12);
        }


        /* IMAGE */

        .ta-review-image {
          position: relative;

          height: 270px;

          overflow: hidden;

          background: #e8e1d5;
        }

        .ta-review-image img {
          width: 100%;
          height: 100%;

          object-fit: cover;

          transition:
            transform .7s
            cubic-bezier(.22,1,.36,1);
        }

        .ta-review-card:hover
        .ta-review-image img {
          transform: scale(1.06);
        }

        .ta-shop-label {
          position: absolute;

          left: 18px;
          bottom: 18px;

          display: flex;

          align-items: center;

          gap: 8px;

          padding: 9px 13px;

          border-radius: 100px;

          background: rgba(255,255,255,.93);

          font-size: 9px;

          font-weight: 850;

          box-shadow:
            0 10px 25px rgba(0,0,0,.12);
        }

        .ta-shop-label span {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #6c8b68;
        }


        /* REVIEW TEXT */

        .ta-review-content {
          position: relative;

          padding: 32px 32px 27px;
        }

        .ta-quote {
          position: absolute;

          right: 25px;
          top: 12px;

          font-family: Georgia, serif;

          font-size: 70px;

          line-height: 1;

          color: #d7b477;

          opacity: .4;
        }

        .ta-review-content > p {
          position: relative;

          max-width: 510px;

          margin: 0;

          font-size: 16px;

          line-height: 1.9;

          color: #4e4942;
        }

        .ta-review-person {
          margin-top: 25px;

          padding-top: 17px;

          border-top:
            1px solid rgba(25,23,20,.08);

          display: flex;

          align-items: end;

          justify-content: space-between;
        }

        .ta-review-person div {
          display: flex;

          flex-direction: column;

          gap: 4px;
        }

        .ta-review-person strong {
          font-size: 14px;
        }

        .ta-review-person small {
          font-size: 9px;

          color: #918a80;
        }

        .ta-review-person > span {
          font-size: 10px;

          font-weight: 900;

          color: #aaa296;
        }


        /* =========================================
           FINAL
        ========================================= */

        .ta-final {
          min-height: 70vh;

          display: grid;

          place-items: center;

          padding: 100px 20px;

          text-align: center;

          background: #f3ead9;
        }

        .ta-final-inner {
          max-width: 850px;
        }

        .ta-final h2 {
          margin: 18px 0;

          font-size: clamp(58px, 8vw, 110px);

          line-height: .83;

          letter-spacing: -.065em;
        }

        .ta-final h2 i {
          color: var(--accent);

          font-weight: 400;
        }

        .ta-final-inner > p:not(.ta-eyebrow) {
          margin: 30px auto;

          color: #746d64;

          font-size: 15px;
        }

        .ta-final button {
          display: inline-flex;

          align-items: center;

          gap: 18px;

          padding: 14px 22px;

          border: none;

          border-radius: 100px;

          background: #191714;

          color: #fff;

          font-size: 9px;

          font-weight: 850;

          letter-spacing: 1.5px;

          cursor: pointer;

          transition:
            transform .3s ease,
            padding .3s ease;
        }

        .ta-final button:hover {
          transform: translateY(-4px);

          padding-left: 28px;
          padding-right: 28px;
        }

        .ta-final button span {
          font-size: 18px;
        }


        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 900px) {

          .ta-container,
          .ta-story-grid {
            width: min(100% - 36px, 700px);
          }

          .ta-hero-grid,
          .ta-story-grid,
          .ta-story-grid.reverse {
            grid-template-columns: 1fr;
          }

          .ta-hero {
            padding: 70px 0;
          }

          .ta-hero-copy {
            text-align: center;
          }

          .ta-hero-copy > p:not(.ta-eyebrow) {
            margin-left: auto;
            margin-right: auto;
          }

          .ta-hero-stats {
            justify-content: center;
          }

          .ta-hero-product {
            min-height: 400px;
          }

          .ta-story-card {
            height: auto;
            min-height: 100svh;
            padding: 45px 0;
          }

          .ta-story-grid {
            gap: 35px;
          }

          .ta-story-grid.reverse
          .ta-story-image,
          .ta-story-grid.reverse
          .ta-story-copy {
            order: initial;
          }

          .ta-story-image {
            height: 380px;
          }

          .ta-story-copy {
            max-width: none;
          }

          .ta-route-heading {
            display: block;
          }

          .ta-route-heading > p {
            margin-top: 25px;
          }

          .ta-review-grid {
            grid-template-columns: 1fr;
          }

        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 600px) {

          .ta-container,
          .ta-story-grid {
            width: calc(100% - 28px);
          }

          .ta-hero {
            min-height: auto;

            padding:
              65px
              0
              55px;
          }

          .ta-hero-copy h1 {
            font-size: 52px;

            letter-spacing: -.055em;
          }

          .ta-hero-copy > p:not(.ta-eyebrow) {
            font-size: 14px;

            line-height: 1.7;
          }

          .ta-hero-stats {
            gap: 18px;

            margin-top: 35px;
          }

          .ta-hero-stats strong {
            font-size: 24px;
          }

          .ta-hero-stats span {
            font-size: 5.5px;

            letter-spacing: .8px;
          }

          .ta-hero-product {
            min-height: 320px;
          }

          .ta-hero-product img {
            width: 85%;
            height: 320px;
          }

          .ta-hero-circle {
            width: 270px;
            height: 270px;
          }

          .ta-live-pill {
            right: 1%;
            bottom: 5%;

            font-size: 8px;
          }


          /* STORY */

          .ta-story-intro {
            padding:
              85px
              0
              45px;
          }

          .ta-story-intro h2 {
            font-size: 52px;
          }

          .ta-story-intro > p:last-child {
            font-size: 14px;
          }

          .ta-story-card {
            position: sticky;

            top: 0;

            min-height: 100svh;

            height: auto;

            padding: 28px 0;
          }

          .ta-story-grid {
            gap: 23px;
          }

          .ta-story-image {
            height: 285px;

            border-radius: 24px;
          }

          .ta-story-copy h2 {
            font-size: 43px;

            margin:
              10px
              0
              14px;
          }

          .ta-story-description {
            font-size: 13px;

            line-height: 1.7;
          }

          .ta-mini-flow {
            margin-top: 20px;

            gap: 5px;
          }

          .ta-flow-item {
            padding: 8px 9px;

            font-size: 8px;
          }

          .ta-flow-arrow {
            font-size: 13px;
          }


          /* ROUTE */

          .ta-route-section {
            padding:
              90px
              0
              80px;
          }

          .ta-route-heading h2 {
            font-size: 58px;
          }

          .ta-route-heading > p {
            font-size: 14px;
          }

          .ta-roadmap {
            height: 420px;

            margin-top: 45px;

            border-radius: 24px;
          }

          .ta-roadmap-grid {
            background-size: 32px 32px;
          }

          .ta-route-stop:nth-of-type(n + 16) {
            display: none;
          }

          .ta-route-counter {
            left: 20px;
            bottom: 20px;
          }

          .ta-route-counter strong {
            font-size: 42px;
          }

          .ta-route-process {
            gap: 9px;

            font-size: 6px;
          }

          .ta-route-process b {
            font-size: 13px;
          }


          /* REVIEWS */

          .ta-reviews {
            padding:
              90px
              0;
          }

          .ta-review-heading {
            margin-bottom: 50px;
          }

          .ta-review-heading h2 {
            font-size: 52px;
          }

          .ta-review-heading > p:last-child {
            font-size: 14px;
          }

          .ta-review-grid {
            gap: 18px;
          }

          .ta-review-image {
            height: 230px;
          }

          .ta-review-content {
            padding: 25px 22px 23px;
          }

          .ta-review-content > p {
            font-size: 14px;

            line-height: 1.8;
          }


          /* FINAL */

          .ta-final {
            min-height: 65vh;

            padding:
              75px
              18px;
          }

          .ta-final h2 {
            font-size: 54px;
          }

        }


        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .ta-about *,
          .ta-about *::before,
          .ta-about *::after {
            scroll-behavior: auto !important;

            animation-duration:
              .001ms !important;

            animation-iteration-count:
              1 !important;

            transition-duration:
              .001ms !important;
          }

        }

        /* FINAL CTA */
.ta-final {
  width: 100%;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 40px;
  box-sizing: border-box;
}

.ta-final-inner {
  width: 100%;
  max-width: 1100px;
  text-align: center;
}

.ta-eyebrow {
  margin-bottom: 24px;
}

.ta-final h2 {
  margin: 0;
  font-size: clamp(42px, 6vw, 86px);
  line-height: 1.05;
}

.ta-final > .ta-final-inner > p:not(.ta-eyebrow) {
  margin: 30px auto;
  font-size: 18px;
  line-height: 1.7;
}

.ta-final button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 16px 28px;
  border: none;
  cursor: pointer;
}


/* =========================
   MOBILE
   ========================= */

@media (max-width: 768px) {

  .ta-final {
    min-height: auto;
    padding: 80px 20px;
  }

  .ta-final-inner {
    width: 100%;
    max-width: 100%;
  }

  .ta-eyebrow {
    font-size: 11px;
    letter-spacing: 2px;
    margin-bottom: 20px;
  }

  .ta-final h2 {
    font-size: clamp(38px, 11vw, 58px);
    line-height: 1.08;
  }

  .ta-final h2 br {
    display: none;
  }

  .ta-final h2 i {
    display: block;
    margin-top: 5px;
  }

  .ta-final-inner > p:not(.ta-eyebrow) {
    max-width: 300px;
    margin: 24px auto;
    font-size: 15px;
    line-height: 1.7;
  }

  .ta-final button {
    width: 100%;
    max-width: 260px;
    padding: 15px 22px;
    font-size: 13px;
  }
}


/* Smaller phones */
@media (max-width: 480px) {

  .ta-final {
    padding: 65px 16px;
  }

  .ta-final h2 {
    font-size: 38px;
  }

  .ta-eyebrow {
    font-size: 10px;
  }

  .ta-final-inner > p:not(.ta-eyebrow) {
    font-size: 14px;
  }

}

      `}</style>
    </main>
  );
}
