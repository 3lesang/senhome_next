import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "../consts";

async function getProductBySlugPocket(slug: string) {
  const res = await pocketClient
    .collection(PRODUCT_COLLECTION)
    .getFirstListItem(`slug="${slug}"`, {
      expand: "category,thumbnail",
    });
  return res;
}

export { getProductBySlugPocket };
