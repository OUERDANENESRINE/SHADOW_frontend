"use client";

import { useMemo, useState } from "react";
import { Product, ProductCategory } from "@/types/product";
import ProductCard from "./ProductCard";

const CATEGORIES: (ProductCategory | "Tout")[] = [
  "Tout",
  "Vestes",
  "Chemises",
  "T-shirts",
  "Pantalons",
  "Accessoires",
];

export default function ProductGrid({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<
    ProductCategory | "Tout"
  >("Tout");
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === "Tout" || p.category === activeCategory;
      const matchesStock = !showOnlyInStock || p.inStock;
      return matchesCategory && matchesStock;
    });
  }, [products, activeCategory, showOnlyInStock]);

  const inStockCount = products.filter((p) => p.inStock).length;

  return (
    <section id="collection" className="bg-void px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-lamp-soft/80">
             THE collection
            </span>
            <h2 className="mt-2 font-display text-4xl tracking-wide text-text-primary sm:text-5xl">
              SHADOW CLOTHES
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              {inStockCount} article{inStockCount > 1 ? "s" : ""} disponible
              {inStockCount > 1 ? "s" : ""} sur {products.length}
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm text-text-muted">
            <input
              type="checkbox"
              checked={showOnlyInStock}
              onChange={(e) => setShowOnlyInStock(e.target.checked)}
              className="h-4 w-4 accent-[#F4A73C]"
            />
            Disponibles uniquement
          </label>
        </div>

        {/* Filtres catégorie */}
        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-2 text-sm tracking-wide transition ${
                activeCategory === cat
                  ? "border-lamp bg-lamp/15 text-lamp-soft"
                  : "border-white/10 text-text-muted hover:border-white/30 hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-text-muted">
            Aucun article dans cette catégorie pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
