import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";
import { Product } from "@/types/product";

async function getListProductPocket() {
  const res = await pocketClient
    .collection<Product>(PRODUCT_COLLECTION)
    .getList();
  return res;
}

export { getListProductPocket };
