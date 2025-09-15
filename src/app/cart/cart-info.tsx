"use client";

import CartItem from "@/app/cart/cart-item";
import CartSummary from "@/app/cart/cart-summary";
import EmptyCart from "@/app/cart/empty-cart";
import { useCart } from "@/app/providers/cart";

export default function CartInfo() {
  const { items, removeItem, updateQty } = useCart();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="bg-background flex-1">
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeItem}
                onQuantityChange={(q) => {
                  updateQty(item.id, q);
                }}
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
