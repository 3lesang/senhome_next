import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { getProductHandler } from "@/handlers/product";
import { getOneProductPocket } from "@/pocketbase/product/one";
import { getProductBySlugPocket } from "@/pocketbase/product/slug";
import ProductInfo from "./info";
import ProductTabs from "./tabs";

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

  const queryClient = new QueryClient();

  const productData = await getProductHandler(slug);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <main>
        <div className="bg-background">
          <div className="max-w-7xl mx-auto py-8">
            <ProductInfo data={productData} />
            <ProductTabs content={productData.content} />
          </div>
        </div>
      </main>
      <Footer />
    </HydrationBoundary>
  );
}
