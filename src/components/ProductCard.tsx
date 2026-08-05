"use client";

import { useMemo, useState } from "react";
import { Product, ProductVariant } from "@/types/product";
import { getColorHex } from "@/lib/variants";
import { useCart } from "@/context/CartContext";

function formatPrice(value: number) {
  return `${value.toLocaleString("fr-FR")} DA`;
}

export default function ProductCard({ product }: { product: Product }) {
  const { nom, prix, description, variants, imageUrls } = product;
  const safeVariants = variants || [];
  const safeImageUrls = imageUrls || [];

  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const couleursDisponibles = useMemo(
    () => Array.from(new Set(safeVariants.map((v: ProductVariant) => v.couleur))),
    [safeVariants],
  );

  const [selectedCouleur, setSelectedCouleur] = useState(couleursDisponibles[0] || "");

  const taillesPourCouleur = useMemo(
    () => safeVariants.filter((v: ProductVariant) => v.couleur === selectedCouleur),
    [safeVariants, selectedCouleur],
  );

  const [selectedTaille, setSelectedTaille] = useState(taillesPourCouleur[0]?.taille || "");

  const selectedVariant = safeVariants.find(
    (v: ProductVariant) => v.couleur === selectedCouleur && v.taille === selectedTaille,
  );

  const hasAnyStock = safeVariants.some((v: ProductVariant) => v.stock > 0);
  const variantInStock = (selectedVariant?.stock || 0) > 0;

  function handleColorChange(couleur: string) {
    setSelectedCouleur(couleur);
    const firstAvailable = safeVariants.find((v: ProductVariant) => v.couleur === couleur);
    setSelectedTaille(firstAvailable?.taille || "");
  }

  function handleAddToCart() {
    if (!selectedVariant || selectedVariant.stock <= 0) return;
    addItem(product, selectedVariant, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function nextImage(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % safeImageUrls.length);
  }

  function prevImage(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + safeImageUrls.length) % safeImageUrls.length);
  }

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-lg border transition-all duration-300 ${
        hasAnyStock
          ? "border-white/10 bg-surface hover:border-lamp/50 hover:shadow-[0_0_40px_-10px_rgba(244,167,60,0.35)]"
          : "border-white/5 bg-surface/60 grayscale"
      }`}
    >
      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-gradient-to-b from-[#181a1f] to-[#0e0f13]">
        {safeImageUrls.length > 0 ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={safeImageUrls[currentImage]}
              alt={nom}
              className={`h-full w-full object-cover transition-opacity ${
                hasAnyStock ? "opacity-100" : "opacity-40 grayscale"
              }`}
            />

            {safeImageUrls.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-text-primary opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                  aria-label="Photo précédente"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-text-primary opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                  aria-label="Photo suivante"
                >
                  ›
                </button>

                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                  {safeImageUrls.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentImage(i);
                      }}
                      className={`h-1.5 rounded-full transition-all ${
                        i === currentImage ? "w-4 bg-lamp" : "w-1.5 bg-white/40"
                      }`}
                      aria-label={`Photo ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <svg
            viewBox="0 0 100 100"
            className={`h-16 w-16 transition-opacity ${
              hasAnyStock ? "opacity-70 group-hover:opacity-90" : "opacity-30"
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
        )}

        <div className="absolute left-3 top-3">
          {hasAnyStock ? (
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

        {couleursDisponibles.length > 0 && (
          <div>
            <span className="mb-1 block text-[11px] uppercase tracking-wide text-text-muted">
              Couleur
            </span>
            <div className="flex flex-wrap gap-1.5">
              {couleursDisponibles.map((c) => (
                <button
                  key={c as string}
                  type="button"
                  onClick={() => handleColorChange(c as string)}
                  title={c as string}
                  className={`h-6 w-6 rounded-full border-2 transition ${
                    selectedCouleur === c ? "border-lamp" : "border-white/20"
                  }`}
                  style={{ backgroundColor: getColorHex(c as string) }}
                />
              ))}
            </div>
          </div>
        )}

        {taillesPourCouleur.length > 0 && (
          <div>
            <span className="mb-1 block text-[11px] uppercase tracking-wide text-text-muted">
              Taille
            </span>
            <div className="flex flex-wrap gap-1.5">
              {taillesPourCouleur.map((v: ProductVariant) => (
                <button
                  key={v.id}
                  type="button"
                  disabled={v.stock <= 0}
                  onClick={() => setSelectedTaille(v.taille)}
                  className={`h-7 min-w-7 rounded border px-1.5 text-xs font-medium transition ${
                    v.stock <= 0
                      ? "cursor-not-allowed border-white/5 text-text-muted/40 line-through"
                      : selectedTaille === v.taille
                        ? "border-lamp bg-lamp/15 text-lamp-soft"
                        : "border-white/15 text-text-muted hover:border-white/30"
                  }`}
                >
                  {v.taille}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-base font-medium text-text-primary">{formatPrice(prix)}</span>
          
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!selectedVariant || !variantInStock}
          className={`mt-1 w-full rounded-full py-2.5 text-sm tracking-wide transition ${
            !selectedVariant || !variantInStock
              ? "cursor-not-allowed bg-white/5 text-text-muted"
              : added
                ? "bg-green-600 text-white"
                : "cursor-pointer bg-lamp text-void hover:bg-lamp-soft"
          }`}
        >
          {!selectedVariant || !variantInStock
            ? "Indisponible"
            : added
              ? "Ajouté ✓"
              : "Ajouter au panier"}
        </button>
      </div>
    </article>
  );
}