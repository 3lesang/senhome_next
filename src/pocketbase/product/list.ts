import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";

async function getListProductPocket() {
  const res = await pocketClient
    .collection(PRODUCT_COLLECTION)
    .getList(1, 8, { expand: "thumbnail" });
  return res;
}

export { getListProductPocket };
