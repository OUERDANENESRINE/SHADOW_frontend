import { Product, ProductVariant } from "./product";

export type OrderStatus = "en_attente" | "validee" | "expediee" | "annulee";

export interface OrderItem {
  id: number;
  quantite: number;
  prixUnitaire: number;
  variant: ProductVariant & { product: Product };
}

export interface Order {
  id: number;
  statut: OrderStatus;
  total: number;
  createdAt: string;
  clientNom?: string | null;
  telephone?: string | null;
  adresse?: string | null;
  user: { id: number; nom: string; email: string } | null;
  items: OrderItem[];
}

export interface Notification {
  id: number;
  message: string;
  lue: boolean;
  createdAt: string;
  order: { id: number };
}