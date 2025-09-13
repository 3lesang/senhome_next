import pocketClient from "@/pocketbase/client";
import { FILE_GRAPH_COLLECTION } from "@/pocketbase/constants";

async function getListFileProductPocket(productId: string) {
  const res = await pocketClient.collection(FILE_GRAPH_COLLECTION).getFullList({
    filter: `product="${productId}"`,
    expand: "file",
  });
  return res;
}

export { getListFileProductPocket };
