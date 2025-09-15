import pocketClient from "@/pocketbase/client";
import { PRODUCT_REVIEW_COLLECTION } from "@/pocketbase/constants";

async function getListReviewProductPocket(productId: string) {
  const res = await pocketClient
    .collection(PRODUCT_REVIEW_COLLECTION)
    .getFullList({ filter: `product="${productId}"` });
  return res;
}

export { getListReviewProductPocket };
