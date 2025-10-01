import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "../consts";

async function getOneProductPocket(productId: string) {
  const res = await pocketClient
    .collection(PRODUCT_COLLECTION)
    .getOne(productId, {
      expand: "category",
    });
  return res;
}

export { getOneProductPocket };
