import pocketClient from "@/pocketbase/client";
import { PRODUCT_VARIANT_COLLECTION } from "@/pocketbase/consts";

async function getListVariantProductPocket(productId: string) {
  const res = await pocketClient
    .collection(PRODUCT_VARIANT_COLLECTION)
    .getFullList({ filter: `product="${productId}"` });

  return res;
}

export { getListVariantProductPocket };
