import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";
import type { Product } from "@/types/product";

async function getProductBySlugPocket(slug: string) {
  const res = await pocketClient
    .collection<Product>(PRODUCT_COLLECTION)
    .getFirstListItem(`slug="${slug}"`, {
      fields: "id",
    });
  return res;
}

export { getProductBySlugPocket };
