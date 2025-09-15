import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";

async function getProductBySlugPocket(slug: string) {
  const res = await pocketClient
    .collection(PRODUCT_COLLECTION)
    .getFirstListItem(`slug="${slug}"`, {
      expand: "category,thumbnail",
    });
  return res;
}

export { getProductBySlugPocket };
