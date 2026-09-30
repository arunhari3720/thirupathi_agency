import { useEffect, useMemo, useState } from 'react'
import { featuredProducts } from '../data/products'

const SHOPIFY_ENDPOINT = 'https://shop.myarusuvai.com/products.json?limit=250'

const normalize = (value = '') =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

const categoryFor = (title = '') => {
  const t = title.toLowerCase()
  if (/(powder|pepper|turmeric|coriander|cumin|chilli|asafoetida)/.test(t) &&
      !/(masala|kulambu|curry)/.test(t)) return 'spices'
  if (/(masala|kulambu|curry)/.test(t)) return 'masalas'
  return 'mixes'
}

export function useShopifyProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch(SHOPIFY_ENDPOINT)
      .then((res) => {
        if (!res.ok) throw new Error('Product feed unavailable')
        return res.json()
      })
      .then((data) => {
        if (!active) return
        const list = (data.products || []).map((p) => ({
          id: p.id,
          title: p.title,
          handle: p.handle,
          category: categoryFor(p.title),
          image: p.images?.[0]?.src || p.featured_image?.src || '',
          images: (p.images || []).map((img) => img.src),
          variants: p.variants || [],
          description: p.body_html?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || '',
        }))
        setProducts(list)
      })
      .catch(() => {
        // Keep the UI usable even if the live shop feed blocks cross-origin requests.
        setProducts(featuredProducts.map((title, index) => ({
          id: `fallback-${index}`,
          title,
          handle: normalize(title).replace(/ /g, '-'),
          category: categoryFor(title),
          image: '',
          images: [],
          variants: [],
          description: 'Authentic Arusuvai product.',
        })))
      })
      .finally(() => active && setLoading(false))

    return () => { active = false }
  }, [])

  const orderedProducts = useMemo(() => {
    if (!products.length) return []
    const score = (title) => {
      const t = normalize(title)
      const index = featuredProducts.findIndex((name) => normalize(name) === t)
      return index === -1 ? 999 : index
    }
    return [...products].sort((a, b) => score(a.title) - score(b.title))
  }, [products])

  return { products: orderedProducts, loading }
}
