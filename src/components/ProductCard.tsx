import { getColorHex } from "@/lib/variants";
import { Product } from "@/types/product";

function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export default function ProductCard({ product }: { product: Product }) {
  const { nom, prix, taille, couleur, stock, description } = product;
  const inStock = stock > 0;

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

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center gap-2">
  <span
    className="h-3.5 w-3.5 rounded-full border border-white/20"
    style={{ backgroundColor: getColorHex(couleur) }}
    title={couleur}
  />
  <span className="text-[11px] uppercase tracking-[0.2em] text-text-muted">
    {couleur}
  </span>
  {taille && (
    <span className="ml-auto rounded-full border border-white/10 px-2 py-0.5 text-[10px] tracking-wide text-text-muted">
      {taille}
    </span>
  )}
</div>
        <h3 className="font-display text-xl leading-tight tracking-wide text-text-primary">
          {nom}
        </h3>
        <p className="mb-2 line-clamp-2 text-sm text-text-muted">{description}</p>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="text-base font-medium text-text-primary">
            {formatPrice(prix)}
          </span>
        </div>

        <button
          disabled={!inStock}
          className={`mt-3 w-full rounded-full py-2.5 text-sm tracking-wide transition ${
            inStock
              ? "bg-lamp text-void hover:bg-lamp-soft cursor-pointer"
              : "cursor-not-allowed bg-white/5 text-text-muted"
          }`}
        >
          {inStock ? "Ajouter au panier" : "Indisponible"}
        </button>
      </div>
    </article>
  );
}