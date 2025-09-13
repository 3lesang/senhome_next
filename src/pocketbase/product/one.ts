import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";
import { Product } from "@/types/product";

async function getOneProductPocket(productId: string) {
  const res = await pocketClient
    .collection<Product>(PRODUCT_COLLECTION)
    .getOne(productId);
  return res;
}

export { getOneProductPocket };
