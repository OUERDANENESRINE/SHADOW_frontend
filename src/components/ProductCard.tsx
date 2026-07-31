"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { getColorHex } from "@/lib/variants";
import { useCart } from "@/context/CartContext";

function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export default function ProductCard({ product }: { product: Product }) {
  const { nom, prix, tailles, couleurs, stock, description } = product;
  const inStock = stock > 0;
  const { addItem } = useCart();

  const [selectedTaille, setSelectedTaille] = useState(tailles?.[0] || "");
  const [selectedCouleur, setSelectedCouleur] = useState(couleurs?.[0] || "");
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (!selectedTaille || !selectedCouleur) return;
    addItem(product, selectedTaille, selectedCouleur, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-lg border transition-all duration-300 ${
        inStock
          ? "border-white/10 bg-surface hover:border-lamp/50 hover:shadow-[0_0_40px_-10px_rgba(244,167,60,0.35)]"
          : "border-white/5 bg-surface/60 grayscale"
      }`}
    >
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-gradient-to-b from-[#181a1f] to-[#0e0f13]">
        <svg
          viewBox="0 0 100 100"
          className={`h-16 w-16 transition-opacity ${
            inStock ? "opacity-70 group-hover:opacity-90" : "opacity-30"
          }`}
          aria-hidden="true"
        >
          <path
            d="M35 15 L45 10 L55 10 L65 15 L78 25 L70 35 L62 30 L62 90 L38 90 L38 30 L30 35 L22 25 Z"
            fill="none"
            stroke="#F4A73C"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>

        <div className="absolute left-3 top-3">
          {inStock ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[11px] tracking-wide text-lamp-soft backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-lamp shadow-[0_0_6px_2px_rgba(244,167,60,0.7)]" />
              Disponible
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[11px] tracking-wide text-text-muted backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-text-muted/60" />
              Rupture de stock
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-xl leading-tight tracking-wide text-text-primary">
          {nom}
        </h3>
        <p className="line-clamp-2 text-sm text-text-muted">{description}</p>

        {inStock && couleurs && couleurs.length > 0 && (
          <div>
            <span className="mb-1 block text-[11px] uppercase tracking-wide text-text-muted">
              Couleur
            </span>
            <div className="flex flex-wrap gap-1.5">
              {couleurs.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCouleur(c)}
                  title={c}
                  className={`h-6 w-6 rounded-full border-2 transition ${
                    selectedCouleur === c ? "border-lamp" : "border-white/20"
                  }`}
                  style={{ backgroundColor: getColorHex(c) }}
                />
              ))}
            </div>
          </div>
        )}

        {inStock && tailles && tailles.length > 0 && (
          <div>
            <span className="mb-1 block text-[11px] uppercase tracking-wide text-text-muted">
              Taille
            </span>
            <div className="flex flex-wrap gap-1.5">
              {tailles.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTaille(t)}
                  className={`h-7 min-w-7 rounded border px-1.5 text-xs font-medium transition ${
                    selectedTaille === t
                      ? "border-lamp bg-lamp/15 text-lamp-soft"
                      : "border-white/15 text-text-muted hover:border-white/30"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-base font-medium text-text-primary">
            {formatPrice(prix)}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!inStock || !selectedTaille || !selectedCouleur}
          className={`mt-1 w-full rounded-full py-2.5 text-sm tracking-wide transition ${
            !inStock
              ? "cursor-not-allowed bg-white/5 text-text-muted"
              : added
                ? "bg-green-600 text-white"
                : "cursor-pointer bg-lamp text-void hover:bg-lamp-soft"
          }`}
        >
          {!inStock ? "Indisponible" : added ? "Ajouté ✓" : "Ajouter au panier"}
        </button>
      </div>
    </article>
  );
}