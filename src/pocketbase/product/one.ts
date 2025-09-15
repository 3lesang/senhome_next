import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";

async function getOneProductPocket(productId: string) {
  const res = await pocketClient
    .collection(PRODUCT_COLLECTION)
    .getOne(productId, {
      expand: "category",
    });
  return res;
}

export { getOneProductPocket };
