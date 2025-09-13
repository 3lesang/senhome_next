"use client";

import CartItem from "@/app/cart/components/cart-item";
import CartSummary from "@/app/cart/components/cart-summary";
import EmptyCart from "@/app/cart/components/empty-cart";
import TrustIndicators from "@/app/cart/components/trustIndicators";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

function CartInfo() {
  const router = useRouter();
  const { cartItems, cartSummary, itemCount, updateQuantity, removeItem } =
    useCart();

  const handleContinueShopping = () => {
    router.push("/");
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <EmptyCart onContinueShopping={handleContinueShopping} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
              />
            ))}

            {/* Trust Indicators */}
            <div className="mt-8">
              <TrustIndicators />
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CartSummary
                summary={cartSummary}
                itemCount={itemCount}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartInfo;
