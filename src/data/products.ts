import { Product } from "@/types/product";

/**
 * Catalogue statique — pour le moment codé en dur.
 * Quand le backend sera prêt, cette liste sera remplacée par un
 * fetch() vers une API / une base de données. En attendant,
 * ajouter un produit = ajouter un objet ici.
 */
export const products: Product[] = [
  {
    id: "veste-cuir-noire",
    name: "Veste en cuir Nightwalker",
    category: "Vestes",
    price: 189.0,
    compareAtPrice: 229.0,
    inStock: true,
    image: "/products/veste-cuir-noire.jpg",
    description:
      "Cuir souple, coupe ajustée, doublure satinée. Faite pour sortir quand la ville s'éteint.",
  },
  {
    id: "chemise-lin-graphite",
    name: "Chemise en lin Graphite",
    category: "Chemises",
    price: 69.0,
    inStock: true,
    image: "/products/chemise-lin-graphite.jpg",
    description: "Lin lavé, col italien, tombe fluide. Le gris qui va avec tout.",
  },
  {
    id: "tshirt-oversize-shadow",
    name: "T-shirt Oversize Shadow",
    category: "T-shirts",
    price: 34.0,
    inStock: false,
    image: "/products/tshirt-oversize-shadow.jpg",
    description: "Coton épais 240g, coupe oversize, logo brodé discret sur la poitrine.",
  },
  {
    id: "pantalon-cargo-nuit",
    name: "Pantalon cargo Nuit",
    category: "Pantalons",
    price: 79.0,
    inStock: true,
    image: "/products/pantalon-cargo-nuit.jpg",
    description: "Toile resistante, poches multiples, taille élastiquée pour le confort.",
  },
  {
    id: "manteau-laine-reverbere",
    name: "Manteau en laine Réverbère",
    category: "Vestes",
    price: 249.0,
    inStock: false,
    image: "/products/manteau-laine-reverbere.jpg",
    description: "Laine mélangée épaisse, coupe longue, boutonnage croisé. Notre pièce signature.",
  },
  {
    id: "chemise-flanelle-ombre",
    name: "Chemise flanelle Ombre",
    category: "Chemises",
    price: 59.0,
    inStock: true,
    image: "/products/chemise-flanelle-ombre.jpg",
    description: "Flanelle brossée à carreaux discrets, parfaite pour les nuits fraîches.",
  },
  {
    id: "tshirt-basique-noir",
    name: "T-shirt basique Onyx",
    category: "T-shirts",
    price: 24.0,
    inStock: true,
    image: "/products/tshirt-basique-noir.jpg",
    description: "Le noir profond qui ne dégorge pas. Coton peigné 180g.",
  },
  {
    id: "bonnet-cote-nuit",
    name: "Bonnet côtelé Nuit",
    category: "Accessoires",
    price: 19.0,
    inStock: true,
    image: "/products/bonnet-cote-nuit.jpg",
    description: "Maille côtelée serrée, revers double épaisseur.",
  },
  {
    id: "ceinture-cuir-vintage",
    name: "Ceinture cuir Vintage",
    category: "Accessoires",
    price: 39.0,
    inStock: false,
    image: "/products/ceinture-cuir-vintage.jpg",
    description: "Boucle laiton vieilli, cuir pleine fleur qui patine avec le temps.",
  },
];
