"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  taille: string;
  couleur: string;
  quantite: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, taille: string, couleur: string, quantite: number) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantite: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "shadow_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        setItems([]);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  function addItem(product: Product, taille: string, couleur: string, quantite: number) {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.product.id === product.id && i.taille === taille && i.couleur === couleur,
      );
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantite += quantite;
        return updated;
      }
      return [...prev, { product, taille, couleur, quantite }];
    });
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function updateQuantity(index: number, quantite: number) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantite: Math.max(1, quantite) } : item)),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantite, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.prix * i.quantite, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé à l'intérieur d'un CartProvider");
  }
  return context;
}