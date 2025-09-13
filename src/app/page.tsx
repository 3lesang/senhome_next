import Footer from "@/components/footer";
import Header from "@/components/header";
import FeaturedProducts from "./home/components/featured-products";
import { Features } from "./home/components/features";
import HeroCarousel from "./home/components/hero/hero-carousel";
import { Newsletter } from "./home/components/newsletter";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />
        <FeaturedProducts />
        <Features />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
