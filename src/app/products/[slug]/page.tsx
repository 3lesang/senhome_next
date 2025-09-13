import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import Footer from "@/components/footer";
import Header from "@/components/header";
import {
  FILE_GRAPH_COLLECTION,
  PRODUCT_COLLECTION,
} from "@/pocketbase/constants";
import { getListFileProductPocket } from "@/pocketbase/file/product";
import { getOneProductPocket } from "@/pocketbase/product/one";
import { getProductBySlugPocket } from "@/pocketbase/product/slug";
import ProductDetail from "./detail";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;

  const resp = await getProductBySlugPocket(slug);
  const product = await getOneProductPocket(resp.id);

  if (!product?.id) {
    return {
      title: "Product not found",
      description: "This product does not exist.",
    };
  }

  return {
    title: product?.name,
    description: product?.description,
    openGraph: {
      title: product?.name,
      description: product?.description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlugPocket(slug);
  const { id } = product;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [PRODUCT_COLLECTION, id],
    queryFn: () => getOneProductPocket(id),
  });

  await queryClient.prefetchQuery({
    queryKey: [FILE_GRAPH_COLLECTION, id],
    queryFn: () => getListFileProductPocket(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <main>
        <ProductDetail key={id} slug={slug} productId={id} />
      </main>
      <Footer />
    </HydrationBoundary>
  );
}
