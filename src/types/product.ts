export interface ProductVariant {
  id: number;
  taille: string;
  couleur: string;
  stock: number;
}

export interface Product {
  id: number;
  nom: string;
  description: string;
  prix: number;
  imageUrls: string[];
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}