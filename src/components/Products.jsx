import SectionShell from './SectionShell'
import HorizontalProductRail from './HorizontalProductRail'
import { categories } from '../data/products'

export default function Products({ products, loading, filter, setFilter }) {
  const filtered = filter === 'all' ? products : products.filter((p) => p.category === filter)

  return (
    <SectionShell id="products" className="products-section" eyebrow="THE PRODUCT ARCHIVE" number={2}>
      <div className="products-intro">
        <div>
          <p className="kicker">OUR PRODUCTS</p>
          <h2>From everyday spice<br /><em>to every-day memory.</em></h2>
        </div>
        <p className="section-note">Product information is sourced from the current Arusuvai catalogue/shop feed, so the gallery can stay aligned with the live product range.</p>
      </div>
      <div className="category-tabs">
        {categories.map((item) => <button className={filter === item.id ? 'selected' : ''} key={item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}
      </div>
      {loading ? <div className="loading-line">Loading live product archive…</div> : <HorizontalProductRail products={filtered} />}
    </SectionShell>
  )
}
