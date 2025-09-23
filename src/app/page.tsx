import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { getFeatureProductHandler } from "@/handlers/product";
import { POLICY_COLLECTION, STORE_COLLECTION } from "@/pocketbase/constants";
import { getStorePocket } from "@/pocketbase/store/one";
import { getListPolicyPocket } from "@/pocketbase/store/policy/list";
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

  await queryClient.prefetchQuery({
    queryKey: [POLICY_COLLECTION],
    queryFn: () => getListPolicyPocket(),
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
