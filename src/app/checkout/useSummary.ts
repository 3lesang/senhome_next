import type { OrderItemType } from "@/types/order";

export function useSummary(items: OrderItemType[]) {
  const shippingFee = 0;

  const { totalPrice, discountPrice } = items.reduce(
    (acc, cur) => ({
      totalPrice: acc.totalPrice + cur.price * (cur.quantity ?? 1),
      discountPrice:
        acc.discountPrice + cur.price * (cur.discount / 100) * cur.quantity,
    }),
    { totalPrice: 0, discountPrice: 0 },
  );

  const finalPrice = totalPrice - discountPrice + shippingFee;
  return { totalPrice, discountPrice, finalPrice, shippingFee };
}
