import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { convertToFileUrl } from "@/lib/utils";
import { getListFileProductPocket } from "@/pocketbase/file/product";
import { getListAttributeProductPocket } from "@/pocketbase/product/attribute/list";
import { getOneProductPocket } from "@/pocketbase/product/one";
import { getListOptionAttributeProductPocket } from "@/pocketbase/product/option/list";
import { getListReviewProductPocket } from "@/pocketbase/product/review/list";
import { getProductBySlugPocket } from "@/pocketbase/product/slug";
import { getListVariantProductPocket } from "@/pocketbase/product/variant/list";
import { getListOptionVariantPocket } from "@/pocketbase/product/variant/option";
import type { FileType } from "@/types/file";
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

async function getProductHandler(id: string) {
  const productResp = await getProductBySlugPocket(id);
  const fileReps = await getListFileProductPocket(productResp.id);
  const attrs = await getListAttributeProductPocket(productResp.id);
  const reviews = await getListReviewProductPocket(productResp.id);
  const variants = await getListVariantProductPocket(productResp.id);

  for (const attr of attrs) {
    const opts = await getListOptionAttributeProductPocket(attr.id);
    attr.opts = opts;
  }

  for (const variant of variants) {
    const opts = await getListOptionVariantPocket(variant.id);
    variant.opts = opts;
  }
  const files: FileType[] = [];
  const variantFileMap: Record<string, string> = {};

  for (const f of fileReps) {
    const file = {
      id: f.id,
      url: convertToFileUrl(f.expand?.file) ?? "",
    };
    files.push(file);
    variantFileMap[f.variant] = f.id;
  }

  const formatAttrs = attrs.map((attr) => {
    const opts = attr?.opts?.map((opt: { id: string; name: string }) => ({
      id: opt?.id,
      name: opt?.name,
    }));
    return { id: attr.id, name: attr?.name, opts };
  });

  const formatVariants = variants.map((variant) => {
    const options: string[] = variant?.opts?.map(
      (opt: { attribute_value: string }) => opt.attribute_value,
    );
    return {
      id: variant.id,
      price: variant?.price,
      discount: variant?.discount * 100,
      stock: variant?.stock,
      sku: variant?.sku,
      options,
    };
  });

  return {
    id: productResp.id,
    name: productResp?.name,
    thumbnail: convertToFileUrl(productResp?.expand?.thumbnail) ?? "",
    content: JSON.stringify(productResp?.content),
    price: productResp?.price,
    discount: productResp?.discount * 100,
    category: productResp?.expand?.category?.name,
    files: files.filter((f) => f.url),
    attrs: formatAttrs,
    countReview: reviews.length,
    rating:
      reviews?.reduce((acc, cur) => acc + cur?.rating, 0) / reviews.length,

    variants: formatVariants,
    variantFileMap: variantFileMap,
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
