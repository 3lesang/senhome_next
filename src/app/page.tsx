import Footer from "@/components/footer";
import Header from "@/components/header";
import type { ProductDataType } from "@/components/product-card";
import { convertToFileUrl } from "@/lib/utils";
import { getListProductPocket } from "@/pocketbase/product/list";
import FeaturedProducts from "./home/featured-products";
import { Features } from "./home/features";
import HeroCarousel from "./home/hero/hero-carousel";
import { Newsletter } from "./home/newsletter";

export default async function Page() {
  const data = await getListProductPocket();

  const featureProducts = data.items.map((item) => {
    const product: ProductDataType = {
      id: item.id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      discount: item.discount * 100,
      thumbnail: convertToFileUrl(item.expand?.thumbnail) ?? "",
      rating: 0,
      reviewCount: 0,
    };
    return product;
  });

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
