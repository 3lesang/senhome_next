import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { getProductHandler } from "@/handlers/product";
import { getOneProductPocket } from "@/pocketbase/product/one";
import { getProductBySlugPocket } from "@/pocketbase/product/slug";
import CTAButton from "./cta";
import Footer from "./footer";
import ProductInfo from "./info";
import OrderDialog from "./order-dialog";
import ProductTabs from "./tabs";
import VariantSelect from "./variant-select";

const slug =
  "ke-up-chen-inox-304-da-nang-senhome-ke-de-bat-dia-tren-bon-rua-thong-minh-tien-loi";

export async function generateMetadata(): Promise<Metadata> {
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

export default async function Page() {
  const queryClient = new QueryClient();

  const productData = await getProductHandler(slug);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <div className="bg-background">
          <div className="max-w-7xl mx-auto py-8">
            <ProductInfo data={productData} />
            <ProductTabs content={productData.content} />
            <CTAButton />
          </div>
        </div>
      </main>
      <OrderDialog />
      <VariantSelect data={productData} />
      <Footer />
    </HydrationBoundary>
  );
}
