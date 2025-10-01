import type { StoreType } from "@/types/store";
import pocketClient from "../client";
import { STORE_COLLECTION } from "../consts";

async function getStorePocket() {
  return pocketClient.collection<StoreType>(STORE_COLLECTION).getFullList();
}

export { getStorePocket };
