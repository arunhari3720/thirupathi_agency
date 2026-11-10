import React, { useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import ProductCard from "../components/ProductCard";
import { categories, products } from "../data/products";

export default function Products() {
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");
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
        eyebrow="OUR PRODUCTS"
        title="A portfolio built"
        accent="for everyday demand."
        text="From RKG ghee and Arusuvai masalas to home-care, beverages, incense and noodles — a clean catalogue for modern trade enquiries."
        image={products[60].image}
      />
      <section className="catalogue">
        <div className="catalogue-head">
          <div>
            <p className="eyebrow">BRAND CATALOGUE</p>
            <h2>
              Explore the <i>range.</i>
            </h2>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products or brands…"
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
            verified.
          </span>
        </div>
      </section>
    </>
  );
}
