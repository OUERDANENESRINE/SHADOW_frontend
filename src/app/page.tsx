import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/types/product";

export default async function Home() {
  let products: Product[] = [];

  try {
    products = await fetchProducts();
  } catch (error) {
    console.error("Erreur lors du chargement des produits :", error);
  }

  return (
    <>
      <Header />
      <Hero />
      <ProductGrid products={products} />
      <Footer />
    </>
  );
}