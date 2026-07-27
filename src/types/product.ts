export interface Product {
  id: number;
  nom: string;
  description: string;
  prix: number;
  taille: string;
  couleur: string;
  stock: number;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}