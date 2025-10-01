import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { getFeatureProductHandler } from "@/handlers/product";
import { STORE_COLLECTION } from "@/pocketbase/consts";
import { getStorePocket } from "@/pocketbase/store/one";
import FeaturedProducts from "./home/featured-products";
import { Features } from "./home/features";
import HeroCarousel from "./home/hero/hero-carousel";
import { Newsletter } from "./home/newsletter";

export default async function Page() {
  const queryClient = new QueryClient();
  const featureProducts = await getFeatureProductHandler();

  await queryClient.prefetchQuery({
    queryKey: [STORE_COLLECTION],
    queryFn: () => getStorePocket(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <main>
        <HeroCarousel />
        <FeaturedProducts data={featureProducts} />
        <Features />
        <Newsletter />
      </main>
      <Footer />
    </HydrationBoundary>
  );
}
