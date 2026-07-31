export interface Product {
  id: number;
  nom: string;
  description: string;
  prix: number;
  tailles: string[];
  couleurs: string[];
  stock: number;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}