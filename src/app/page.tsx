import Footer from "@/components/footer";
import Header from "@/components/header";
import { getFeatureProductHandler } from "@/handlers/product";
import FeaturedProducts from "./home/featured-products";
import { Features } from "./home/features";
import HeroCarousel from "./home/hero/hero-carousel";
import { Newsletter } from "./home/newsletter";

export default async function Page() {
  const featureProducts = await getFeatureProductHandler();
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />
        <FeaturedProducts data={featureProducts} />
        <Features />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
