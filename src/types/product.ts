export type ProductCategory =
  | "Vestes"
  | "Chemises"
  | "T-shirts"
  | "Pantalons"
  | "Accessoires";

export interface Product {
  /** Identifiant unique, utilisé plus tard comme clé pour le backend */
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  /** Prix barré optionnel (promo) */
  compareAtPrice?: number;
  /** true = en stock / disponible, false = rupture de stock */
  inStock: boolean;
  /** Chemin vers l'image dans /public, ou URL externe */
  image: string;
  description: string;
}
