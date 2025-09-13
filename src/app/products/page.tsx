import Footer from "@/components/footer";
import Header from "@/components/header";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";
import { getListProductPocket } from "@/pocketbase/product/list";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ListProductPage } from "./components/list";

async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [PRODUCT_COLLECTION],
    queryFn: () => getListProductPocket(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <main>
        <ListProductPage />
      </main>
      <Footer />
    </HydrationBoundary>
  );
}

export default Page;
