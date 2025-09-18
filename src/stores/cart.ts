import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { CartItemType, CartState } from "@/types/cart";

export const cartAtom = atomWithStorage<CartState>("cart", { items: [] });

export const cartItemsAtom = atom((get) => get(cartAtom)?.items);

export const cartTotalQtyAtom = atom((get) =>
  get(cartAtom)?.items?.reduce((sum, i) => sum + i.quantity, 0),
);

export const addItemAtom = atom(null, (get, set, item: CartItemType) => {
  const { items } = get(cartAtom);
  const existing = items.find((i) => i.id === item.id);

  if (existing) {
    set(cartAtom, {
      items: items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
      ),
    });
  } else {
    set(cartAtom, { items: [...items, item] });
  }
});

export const removeItemAtom = atom(
  null,
  (get, set, payload: { id: string }) => {
    const { items } = get(cartAtom);
    set(cartAtom, { items: items.filter((i) => i.id !== payload.id) });
  },
);

export const clearCartAtom = atom(null, (_get, set) => {
  set(cartAtom, { items: [] });
});

export const updateQtyAtom = atom(
  null,
  (get, set, payload: { id: string; quantity: number }) => {
    const { items } = get(cartAtom);
    set(cartAtom, {
      items: items.map((i) =>
        i.id === payload.id ? { ...i, quantity: payload.quantity } : i,
      ),
    });
  },
);
