import { atom } from "jotai";
import type { OrderItemType, OrderState } from "@/types/order";

export const orderAtom = atom<OrderState>({ items: [] });

export const orderItemsAtom = atom((get) => get(orderAtom).items);

export const addOrderItemAtom = atom(null, (_, set, items: OrderItemType[]) => {
  set(orderAtom, { items });
});
