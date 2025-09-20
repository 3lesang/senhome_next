import type { ProductDataType } from "@/components/product-card";
import { convertToFileUrl } from "@/lib/utils";
import { getListFileProductPocket } from "@/pocketbase/file/product";
import { getListAttributeProductPocket } from "@/pocketbase/product/attribute/list";
import { getListProductPocket } from "@/pocketbase/product/list";
import { getListOptionAttributeProductPocket } from "@/pocketbase/product/option/list";
import { getListReviewProductPocket } from "@/pocketbase/product/review/list";
import { getProductBySlugPocket } from "@/pocketbase/product/slug";
import { getListVariantProductPocket } from "@/pocketbase/product/variant/list";
import { getListOptionVariantPocket } from "@/pocketbase/product/variant/option";
import type { FileType } from "@/types/file";

export async function getVariantProductHandler(productId: string) {
  const attrs = await getListAttributeProductPocket(productId);
  const variants = await getListVariantProductPocket(productId);

  for (const attr of attrs) {
    const opts = await getListOptionAttributeProductPocket(attr.id);
    attr.opts = opts;
  }

  for (const variant of variants) {
    const opts = await getListOptionVariantPocket(variant.id);
    variant.opts = opts;
  }

  const formatAttrs = attrs.map((attr) => {
    const opts = attr?.opts?.map((opt: { id: string; name: string }) => ({
      id: opt?.id,
      name: opt?.name,
    }));
    return { id: attr.id, name: attr?.name, opts };
  });

  const formatVariants = variants
    .map((variant) => {
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
    })
    .sort((a, b) => a.price - b.price);
  return { attrs: formatAttrs, variants: formatVariants };
}

export async function getReviewProductHandler(productId: string) {
  const reviews = await getListReviewProductPocket(productId);
  const countReview = reviews.length;
  const countTotalRating = reviews?.reduce((acc, cur) => acc + cur?.rating, 0);
  const totalReview = reviews.length;
  const rating = totalReview > 0 ? countTotalRating / totalReview : 0;
  return { countReview, rating };
}

export async function getFileProductHandler(productId: string) {
  const fileReps = await getListFileProductPocket(productId);
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

  return { files: files.filter((f) => f.url), variantFileMap };
}

export async function getProductHandler(id: string) {
  const productResp = await getProductBySlugPocket(id);
  const { attrs, variants } = await getVariantProductHandler(productResp.id);
  const { countReview, rating } = await getReviewProductHandler(productResp.id);
  const { files, variantFileMap } = await getFileProductHandler(productResp.id);

  return {
    id: productResp.id,
    name: productResp?.name,
    slug: productResp?.slug,
    thumbnail: convertToFileUrl(productResp?.expand?.thumbnail) ?? "",
    content: JSON.stringify(productResp?.content),
    price: productResp?.price,
    discount: productResp?.discount * 100,
    category: productResp?.expand?.category?.name,
    files,
    attrs,
    countReview,
    rating,
    variants,
    variantFileMap,
  };
}

export async function getFeatureProductHandler() {
  const data = await getListProductPocket();
  for (const item of data.items) {
    const { attrs, variants } = await getVariantProductHandler(item.id);
    const { countReview, rating } = await getReviewProductHandler(item.id);
    const { files, variantFileMap } = await getFileProductHandler(item.id);
    item.attrs = attrs;
    item.variants = variants;
    item.countReview = countReview;
    item.rating = rating;
    item.files = files;
    item.variantFileMap = variantFileMap;
  }

  const featureProducts = data.items.map((item) => {
    const cheapVariant = item?.variants?.[0];
    const discount = cheapVariant?.discount ?? item?.discount * 100;
    const price = cheapVariant?.price ?? item.price;

    const product: ProductDataType = {
      id: item.id,
      name: item.name,
      slug: item.slug,
      price,
      discount,
      thumbnail: convertToFileUrl(item.expand?.thumbnail) ?? "",
      rating: item?.rating ?? 0,
      countReview: item?.countReview ?? 0,
      attrs: item.attrs,
      variants: item.variants,
      files: item?.files,
      variantFileMap: item?.variantFileMap,
    };
    return product;
  });
  return featureProducts;
}
