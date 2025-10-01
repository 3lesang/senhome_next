import pocketClient from "../client";
import { ORDER_ITEM_COLLECTION } from "../consts";

export type CreateItemOrderPayload = {
  price: number;
  quantity: number;
  discount: number;
  order: string;
  product: string;
  variant: string;
};

async function createItemOrderPocket(payload: CreateItemOrderPayload[]) {
  const batch = pocketClient.createBatch();
  for (const item of payload) {
    batch.collection(ORDER_ITEM_COLLECTION).create(item);
  }
  if (payload.length) {
    return batch.send();
  }
  return;
}

export { createItemOrderPocket };
