import pocketClient from "@/pocketbase/client";
import { PRODUCT_ATTRIBUTE_COLLECTION } from "@/pocketbase/consts";

async function getListAttributeProductPocket(productId: string) {
  const res = await pocketClient
    .collection(PRODUCT_ATTRIBUTE_COLLECTION)
    .getFullList({ filter: `product="${productId}"`, fields: "id,name" });

  return res;
}

export { getListAttributeProductPocket };
