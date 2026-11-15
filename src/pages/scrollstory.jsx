import React, { useEffect, useRef, useState } from 'react'
import { products } from '../data/products'

/* ---------- helpers ---------- */
const pool = products.filter((p) => typeof p.image === 'string' && p.image.trim())
const pick = (idx, n) => {
  const a = idx.map((i) => products[i]).filter((p) => p && p.image)
  return a.length >= n ? a.slice(0, n) : pool.slice(0, n)
}
const opt = (url, w = 400) =>
  url && url.includes('res.cloudinary.com') && url.includes('/upload/') && !url.includes('/upload/f_auto')
    ? url.replace('/upload/', `/upload/f_auto,q_auto,w_${w}/`)
    : url

function Img({ p, w = 400, eager }) {
  return (
    <img
      src={opt(p.image, w)}
      alt={`${p.brand || ''} ${p.name || ''} - Thirupathi Agencies Madurai`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable="false"
      onError={(e) => {
        if (p.fallback && e.currentTarget.src !== p.fallback) e.currentTarget.src = p.fallback
      }}
    />
  )
}

/* Sets --p (0 to 1) on a tall section while its sticky child is pinned */
function useProgress(onChange) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      let p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0
      if (reduce) p = 1
      el.style.setProperty('--p', p.toFixed(4))
      onChange && onChange(p)
    }
    const on = () => { if (!raf && !reduce) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
    // eslint-disable-next-line
  }, [])
  return ref
}

/* ---------- data ---------- */
const morph = pick([6, 10, 18, 1, 51, 26], 6)
const scatter = [
  ['-30vw', '-30vh', '-14deg'], ['30vw', '-24vh', '11deg'], ['-32vw', '10vh', '9deg'],
  ['32vw', '14vh', '-10deg'], ['-8vw', '34vh', '-6deg'], ['10vw', '-36vh', '8deg'],
]
const grid = [[-1, -0.5], [0, -0.5], [1, -0.5], [-1, 0.5], [0, 0.5], [1, 0.5]]

const why = [
  ['01', 'Trusted brands', 'RKG Arusuvai Masala, Masbadam and more everyday essentials, all under one agency.'],
  ['02', '10+ years in Madurai', 'A decade of dependable relationships with retailers and businesses.'],
  ['03', 'Reliable supply', 'Regular stock and on-time distribution so your shelves never run empty.'],
  ['04', 'Direct trade support', 'Talk to the agency directly for wholesale and bulk enquiries.'],
]

const steps = [
  ['Enquiry', 'Call or message us with the products and quantity you need.'],
  ['Quotation', 'We share clear trade pricing for your order.'],
  ['Confirmation', 'Confirm the order and we reserve the stock.'],
  ['Dispatch', 'Your goods are packed and sent out from Madurai.'],
  ['Delivery', 'Fresh stock reaches your shop, ready to sell.'],
]

const stack = [
  ['Retail supply', 'Everyday food and home-care products for your store shelves.'],
  ['Wholesale & bulk', 'Better trade rates for larger and repeat orders.'],
  ['Brand partnerships', 'Recognised names we have represented for years.'],
  ['Regional distribution', 'Dependable delivery support across Madurai.'],
]

const gallery = pool.slice(0, 12)
const zoomImgs = (pool.length > 12 ? pool.slice(6, 13) : pool.slice(0, 7))

/* ---------- component ---------- */
export default function ScrollStory() {
  const morphRef = useProgress()
  const containerRef = useProgress()
  const [active, setActive] = useState(0)
  const wheelRef = useProgress((p) => setActive(Math.round(p * (steps.length - 1))))
  const hRef = useProgress()
  const zRef = useProgress()

  return (
    <div className="ss">
      <style>{`
.ss{--g:#173f2a;--gold:#a37b29;--txt:#536057;--bg:#faf8f0;--bg2:#f3efe2;overflow-x:clip;background:var(--bg)}
.ss *{box-sizing:border-box}
.ss img{display:block;-webkit-user-drag:none;user-select:none}
.ss-tall{position:relative}
.ss-pin{position:sticky;top:0;height:100vh;height:100svh;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center}
.ss-eye{display:flex;align-items:center;gap:12px;color:var(--gold);font-size:11px;font-weight:700;letter-spacing:.28em;margin:0 0 16px}
.ss-eye::before{content:"";width:32px;height:1px;background:var(--gold)}
.ss h2{margin:0;color:var(--g);font-size:clamp(34px,6vw,76px);line-height:.98;letter-spacing:-.045em;font-weight:600}
.ss h2 i{display:block;color:var(--gold);font-family:Georgia,serif;font-weight:400}
.ss-card{background:linear-gradient(145deg,rgba(255,255,255,.92),rgba(247,243,231,.8));border:1px solid rgba(255,255,255,.9);box-shadow:0 25px 60px rgba(46,54,39,.14);border-radius:22px}
.ss-card img{width:100%;height:100%;object-fit:contain;padding:12px;filter:drop-shadow(0 14px 12px rgba(35,43,32,.18))}

/* 1. SCROLL MORPH HERO */
.ss-morph{height:260vh;--e:min(1,calc(var(--p)*1.6));background:radial-gradient(circle at 50% 50%,rgba(190,150,64,.13),transparent 40%),var(--bg)}
.ss-morph .ss-pin{--w:min(27vw,150px)}
.ss-mtitle{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 24px;opacity:calc(1 - var(--e)*1.5);transform:scale(calc(1 + var(--e)*.15));pointer-events:none}
.ss-mcard{position:absolute;left:50%;top:50%;width:var(--w);aspect-ratio:3/4;
  --gx:calc(var(--c)*(var(--w) + 10px));--gy:calc(var(--r)*(var(--w)*1.33 + 10px));
  transform:translate(-50%,-50%) translate(calc(var(--sx)*(1 - var(--e)) + var(--gx)*var(--e)),calc(var(--sy)*(1 - var(--e)) + var(--gy)*var(--e))) rotate(calc(var(--sr)*(1 - var(--e))));will-change:transform}
.ss-mcap{position:absolute;left:0;right:0;bottom:calc(50% - var(--w)*1.33 - 52px);text-align:center;color:var(--g);font-family:Georgia,serif;font-size:clamp(18px,3vw,28px);opacity:calc((var(--e) - .7)*3.4)}
@media(max-width:650px){.ss-mcap{bottom:calc(50% - var(--w)*1.33 - 62px)}}

/* 2. CONTAINER SCROLL */
.ss-cont{height:220vh;--e:min(1,calc(var(--p)*1.5));background:var(--bg2)}
.ss-cont .ss-pin{perspective:1000px;-webkit-perspective:1000px;padding:0 16px}
.ss-chead{text-align:center;transform:translateY(calc(var(--e)*-14px));margin-bottom:22px}
.ss-cframe{width:min(92vw,880px);padding:10px;border-radius:26px;background:var(--g);box-shadow:0 40px 80px rgba(23,63,42,.3);transform:rotateX(calc(24deg*(1 - var(--e)))) scale(calc(.92 + .08*var(--e)));will-change:transform}
.ss-cgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:10px;border-radius:18px;background:var(--bg)}
.ss-cgrid .ss-card{aspect-ratio:3/4;border-radius:14px}
.ss-cont h2{font-size:clamp(30px,5vw,60px)}
@media(max-height:700px){.ss-cgrid .ss-card{aspect-ratio:1/1}}

/* 3. STICKY SCROLL / STICKY CONTENT WRAPPER */
.ss-sticky{display:grid;grid-template-columns:1fr 1.1fr;gap:6vw;padding:110px 7vw;align-items:start;background:var(--bg)}
.ss-sleft{position:sticky;top:110px}
.ss-sleft p.d{max-width:420px;margin:22px 0 0;color:var(--txt);line-height:1.8;font-size:15px}
.ss-sitem{min-height:46vh;display:flex;flex-direction:column;justify-content:center;padding:30px 26px;margin-bottom:22px;border-left:2px solid rgba(163,123,41,.4);border-radius:0 22px 22px 0;background:rgba(255,255,255,.6)}
.ss-sitem small{color:var(--gold);font-family:Georgia,serif;font-size:26px}
.ss-sitem h3{margin:8px 0;color:var(--g);font-size:clamp(22px,3vw,32px)}
.ss-sitem p{margin:0;color:var(--txt);line-height:1.75}
@media(max-width:850px){.ss-sticky{grid-template-columns:1fr;padding:70px 22px;gap:28px}.ss-sleft{position:relative;top:0}.ss-sitem{min-height:0;padding:24px 20px}}

/* 4. WORKS WHEEL */
.ss-wheel{height:420vh;background:var(--bg2)}
.ss-wbox{--R:min(36vw,170px);position:relative;width:calc(var(--R)*2);height:calc(var(--R)*2);margin-top:30px;border:1px solid rgba(163,123,41,.35);border-radius:50%;transform:rotate(calc(var(--p)*-288deg));will-change:transform}
.ss-wbox::before{content:"";position:absolute;inset:18%;border:1px dashed rgba(23,71,45,.2);border-radius:50%}
.ss-node{position:absolute;left:50%;top:50%;width:46px;height:46px;margin:-23px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:Georgia,serif;font-size:15px;background:#fff;color:var(--g);border:1px solid rgba(163,123,41,.5);
  transform:rotate(var(--a)) translateY(calc(var(--R)*-1)) rotate(calc(var(--p)*288deg - var(--a)));transition:background .3s,color .3s,scale .3s}
.ss-node.on{background:var(--g);color:#f7f0dc;scale:1.25;box-shadow:0 12px 26px rgba(23,63,42,.3)}
.ss-wcenter{position:relative;margin-top:calc(var(--R)*-1.15);width:min(78vw,340px);text-align:center;transform:none;z-index:2}
.ss-wcenter b{display:block;color:var(--gold);font-family:Georgia,serif;font-size:14px;letter-spacing:.2em}
.ss-wcenter h3{margin:6px 0;color:var(--g);font-family:Georgia,serif;font-size:clamp(26px,5vw,38px);font-weight:400}
.ss-wcenter p{margin:0;color:var(--txt);line-height:1.6;font-size:14px}
.ss-wheel .ss-whead{text-align:center}
.ss-wheel h2{font-size:clamp(30px,5vw,58px)}
.ss-wwrap{display:flex;flex-direction:column;align-items:center}

/* 5. HORIZONTAL GALLERY */
.ss-hor{height:340vh;background:var(--bg)}
.ss-hor .ss-pin{align-items:flex-start;justify-content:center;gap:26px}
.ss-hhead{padding:0 7vw}
.ss-htrack{display:flex;gap:16px;width:max-content;padding:0 7vw;transform:translate3d(calc(var(--p)*(100vw - 100%)),0,0);will-change:transform}
.ss-htrack .ss-card{width:min(62vw,260px);aspect-ratio:3/4;flex:none}
.ss-htrack .ss-card:nth-child(even){margin-top:34px}
.ss-hbar{margin:0 7vw;width:86vw;max-width:360px;height:2px;background:rgba(23,63,42,.12)}
.ss-hbar i{display:block;height:100%;background:var(--gold);transform-origin:left;transform:scaleX(var(--p))}

/* 6. ZOOM PARALLAX */
.ss-zoom{height:320vh;background:var(--g)}
.ss-zoom .ss-pin{background:var(--g)}
.ss-zi{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transform:scale(calc(1 + var(--p)*var(--k)));will-change:transform}
.ss-zi .ss-card{position:relative;width:var(--w);height:var(--h);top:var(--y);left:var(--x)}
.ss-zi .ss-card img{padding:8px}
.ss-ztext{position:relative;z-index:5;text-align:center;padding:0 24px;opacity:calc((var(--p) - .65)*3.5);pointer-events:none}
.ss-zoom h2,.ss-zoom .ss-eye{color:#f7f0dc}
.ss-zoom h2 i{color:#d9b866}
.ss-zoom .ss-eye{color:#d9b866}.ss-zoom .ss-eye::before{background:#d9b866}

/* 7. STACKING CARDS */
.ss-stack{padding:100px 7vw 140px;background:var(--bg2)}
.ss-stack>h2{margin-bottom:40px}
.ss-scard{position:sticky;top:calc(84px + var(--i)*16px);min-height:min(56vh,340px);margin-bottom:34px;padding:34px 30px;display:flex;flex-direction:column;justify-content:space-between;border-radius:28px;background:#fff;border:1px solid rgba(163,123,41,.25);box-shadow:0 -10px 40px rgba(23,63,42,.08)}
.ss-scard:nth-child(2n){background:var(--g)}
.ss-scard:nth-child(2n) h3{color:#f7f0dc}.ss-scard:nth-child(2n) p{color:rgba(247,240,220,.78)}
.ss-scard small{color:var(--gold);font-family:Georgia,serif;font-size:42px}
.ss-scard h3{margin:0 0 8px;color:var(--g);font-size:clamp(26px,4vw,44px);letter-spacing:-.03em}
.ss-scard p{margin:0;max-width:460px;color:var(--txt);line-height:1.7}
@media(max-width:650px){.ss-stack{padding:70px 18px 100px}.ss-scard{padding:24px 20px;border-radius:22px}.ss-htrack{gap:12px}.ss-morph{height:230vh}.ss-hor{height:300vh}.ss-zoom{height:280vh}}
      `}</style>

      {/* 1. scroll morph hero */}
      <section className="ss-tall ss-morph" ref={morphRef}>
        <div className="ss-pin">
          <div className="ss-mtitle">
            <p className="ss-eye">OUR PORTFOLIO</p>
            <h2>Many brands.<i>One agency.</i></h2>
          </div>
          {morph.map((p, i) => (
            <div
              className="ss-mcard ss-card"
              key={p.id ?? i}
              style={{ '--sx': scatter[i][0], '--sy': scatter[i][1], '--sr': scatter[i][2], '--c': grid[i][0], '--r': grid[i][1] }}
            >
              <Img p={p} w={300} eager />
            </div>
          ))}
          <div className="ss-mcap">Everything your shelf needs.</div>
        </div>
      </section>

      {/* 2. container scroll animation */}
      <section className="ss-tall ss-cont" ref={containerRef}>
        <div className="ss-pin">
          <div className="ss-chead">
            <p className="ss-eye" style={{ justifyContent: 'center' }}>FEATURED SHELF</p>
            <h2>Unleash <i>trusted supply.</i></h2>
          </div>
          <div className="ss-cframe">
            <div className="ss-cgrid">
              {morph.map((p, i) => (
                <div className="ss-card" key={i}><Img p={p} w={260} /></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. sticky scroll + sticky content wrapper */}
      <section className="ss-sticky">
        <div className="ss-sleft">
          <p className="ss-eye">WHY THIRUPATHI</p>
          <h2>Built on<i>reliability.</i></h2>
          <p className="d">Retailers and businesses across Madurai rely on us for steady stock and honest trade support.</p>
        </div>
        <div>
          {why.map(([n, t, d]) => (
            <div className="ss-sitem" key={n}><small>{n}</small><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </section>

      {/* 4. works wheel */}
      <section className="ss-tall ss-wheel" ref={wheelRef}>
        <div className="ss-pin">
          <div className="ss-wwrap">
            <div className="ss-whead">
              <p className="ss-eye" style={{ justifyContent: 'center' }}>HOW IT WORKS</p>
              <h2>From enquiry <i>to your shelf.</i></h2>
            </div>
            <div className="ss-wbox">
              {steps.map((s, i) => (
                <div key={s[0]} className={`ss-node${i === active ? ' on' : ''}`} style={{ '--a': `${i * 72}deg` }}>
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="ss-wcenter">
              <b>0{active + 1}</b>
              <h3>{steps[active][0]}</h3>
              <p>{steps[active][1]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. horizontal scroll gallery */}
      <section className="ss-tall ss-hor" ref={hRef}>
        <div className="ss-pin">
          <div className="ss-hhead">
            <p className="ss-eye">THE CATALOGUE</p>
            <h2>Scroll through <i>our range.</i></h2>
          </div>
          <div className="ss-htrack">
            {gallery.map((p, i) => (
              <div className="ss-card" key={i}><Img p={p} w={300} /></div>
            ))}
          </div>
          <div className="ss-hbar"><i /></div>
        </div>
      </section>

      {/* 6. zoom parallax */}
      <section className="ss-tall ss-zoom" ref={zRef}>
        <div className="ss-pin">
          {zoomImgs.map((p, i) => {
            const L = [
              ['0vw', '0vh', 'min(30vw,200px)', 'min(40vw,260px)', 4],
              ['-30vw', '-24vh', 'min(26vw,170px)', 'min(20vh,200px)', 5],
              ['28vw', '-18vh', 'min(22vw,150px)', 'min(26vh,230px)', 6],
              ['-34vw', '22vh', 'min(24vw,160px)', 'min(22vh,200px)', 6],
              ['30vw', '24vh', 'min(26vw,170px)', 'min(20vh,200px)', 7],
              ['-4vw', '-34vh', 'min(20vw,130px)', 'min(16vh,150px)', 8],
              ['4vw', '34vh', 'min(20vw,130px)', 'min(16vh,150px)', 8],
            ][i]
            return (
              <div className="ss-zi" key={i} style={{ '--k': L[4] }}>
                <div className="ss-card" style={{ '--x': L[0], '--y': L[1], '--w': L[2], '--h': L[3] }}>
                  <Img p={p} w={300} />
                </div>
              </div>
            )
          })}
          <div className="ss-ztext">
            <p className="ss-eye" style={{ justifyContent: 'center' }}>10+ YEARS · MADURAI</p>
            <h2>Trusted brands.<i>Reliable supply.</i></h2>
          </div>
        </div>
      </section>

      {/* 7. scroll stacking cards */}
      <section className="ss-stack">
        <p className="ss-eye">WHAT WE OFFER</p>
        <h2>Ways we <i>work with you.</i></h2>
        <div style={{ marginTop: 40 }}>
          {stack.map(([t, d], i) => (
            <div className="ss-scard" key={t} style={{ '--i': i }}>
              <small>0{i + 1}</small>
              <div><h3>{t}</h3><p>{d}</p></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}