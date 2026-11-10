import { motion } from 'framer-motion'
import SectionShell from './SectionShell'

const points = [
  {
    num: '01',
    title: 'Genuine Products',
    copy: 'Authorised sourcing and brand-aligned product handling.',
  },
  {
    num: '02',
    title: 'Timely Supply',
    copy: 'A distribution workflow designed around dependable replenishment.',
  },
  {
    num: '03',
    title: 'Wide Range',
    copy: 'Spices, masalas and convenient food products across categories.',
  },
  {
    num: '04',
    title: 'Business Support',
    copy: 'Responsive communication for retailers, hotels and bulk buyers.',
  },
  {
    num: '05',
    title: 'Trusted Brands',
    copy: 'A portfolio anchored by recognisable names such as Arusuvai and GRB.',
  },
  {
    num: '06',
    title: 'Local Reach',
    copy: 'A regional partner with a practical understanding of the market.',
  },
]

const EASE = [0.22, 1, 0.36, 1]

export default function WhyUs() {
  return (
    <SectionShell
      id="why-us"
      className="why-section"
      eyebrow="THE DIFFERENCE"
      number={4}
    >

      <div className="why-modern-head">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="kicker">
            WHY CHOOSE US
          </p>

          <h2>
            Built on
            <br />
            <em>trust.</em>
          </h2>
        </motion.div>

        <motion.div
          className="why-intro"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: EASE,
          }}
        >
          <span>06 PRINCIPLES</span>

          <p>
            The small things that make a reliable
            distribution partner.
          </p>
        </motion.div>

      </div>


      <div className="why-list">

        {points.map((item, index) => (

          <motion.article
            key={item.num}
            className="why-row"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.7,
              delay: index * 0.08,
              ease: EASE,
            }}
          >

            <div className="why-number">
              {item.num}
            </div>

            <div className="why-title">
              <h3>
                {item.title}
              </h3>
            </div>

            <div className="why-copy">
              <p>
                {item.copy}
              </p>
            </div>

            <motion.div
              className="why-arrow"
              whileHover={{
                rotate: 45,
                scale: 1.15,
              }}
              transition={{
                duration: 0.3,
                ease: EASE,
              }}
            >
              ↗
            </motion.div>

          </motion.article>

        ))}

      </div>


      <motion.div
        className="why-bottom"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{
          scaleX: 1,
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1,
          delay: 0.3,
          ease: EASE,
        }}
      >

        <span>
          QUALITY
        </span>

        <i />

        <span>
          TRUST
        </span>

        <i />

        <span>
          CONSISTENCY
        </span>

        <i />

        <span>
          SUPPLY
        </span>

      </motion.div>

    </SectionShell>
  )
}