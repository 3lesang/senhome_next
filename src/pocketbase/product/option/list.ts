import pocketClient from "@/pocketbase/client";
import { PRODUCT_ATTRIBUTE_VALUE_COLLECTION } from "@/pocketbase/constants";

async function getListOptionAttributeProductPocket(attrId: string) {
  const res = await pocketClient
    .collection(PRODUCT_ATTRIBUTE_VALUE_COLLECTION)
    .getFullList({ filter: `attribute="${attrId}"`, fields: "id,name" });
  return res;
}

export { getListOptionAttributeProductPocket };
