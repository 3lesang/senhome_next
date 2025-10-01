import pocketClient from "../client";
import { ORDER_COLLECTION } from "../consts";

type CreateOrderPayload = {
  name: string;
  phone: string;
  email: string;
  total_price: number;
  total_discount: number;
  final_price: number;
  shipping_address: string;
  payment_method: string;
  note: string;
  shipping_fee: number;
  status: "created" | "canceled" | "completed";
};

async function createOrderPocket(payload: CreateOrderPayload) {
  return pocketClient.collection(ORDER_COLLECTION).create(payload);
}

export { createOrderPocket };
