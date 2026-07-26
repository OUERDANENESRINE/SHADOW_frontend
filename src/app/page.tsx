import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ProductGrid products={products} />
      <Footer />
    </>
  );
}
