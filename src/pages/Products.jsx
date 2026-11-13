import React, { useEffect, useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import ProductCard from "../components/ProductCard";
import { categories, products } from "../data/products";

export default function Products() {
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const canonicalUrl = "https://thirupathiagencies.store/products";
    const description =
      "Explore food products and everyday essentials from Thirupathi Agencies in Madurai, including RKG Arusuvai Masala and Masbadam. Backed by 10+ years of distribution experience.";

    document.title =
      "Food Products in Madurai | RKG Arusuvai Masala & Masbadam | Thirupathi Agencies";

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
  }, []);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          `${p.brand} ${p.name} ${p.category}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [cat, query],
  );

  return (
    <>
      <PageHero
        eyebrow="THIRUPATHI AGENCIES · MADURAI"
        title="Products for"
        accent="everyday demand."
        text="Explore our food products and everyday essentials for retailers and businesses across Madurai. Our catalogue includes RKG Arusuvai Masala, Masbadam and a range of trusted brands, supported by 10+ years of distribution experience."
        image={products[60].image}
      />

      <section className="catalogue">
        <div className="catalogue-head">
          <div>
            <p className="eyebrow">FOOD PRODUCTS & BRAND CATALOGUE · MADURAI</p>
            <h2>
              Explore the <i>range.</i>
            </h2>
            <p>
              Thirupathi Agencies connects businesses in Madurai with food
              products and everyday essentials, including RKG Arusuvai Masala
              and Masbadam. Contact us for product details and availability.
            </p>
          </div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products or brands…"
            aria-label="Search products or brands"
          />
        </div>

        <div className="filters">
          {categories.map((c) => (
            <button
              key={c}
              className={cat === c ? "selected" : ""}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filtered.map((p, i) => (
            <ProductCard product={p} index={i} key={p.id} />
          ))}
        </div>

        <div className="catalogue-note">
          <strong>Catalogue note</strong>
          <span>
            Pack sizes and availability can vary by market. Product imagery is
            sourced from the respective brand/store references where confidently
            verified. For current product availability in Madurai, please
            contact Thirupathi Agencies.
          </span>
        </div>
      </section>
    </>
  );
}
