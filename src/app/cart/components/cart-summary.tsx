import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CartSummary as CartSummaryType } from "@/types/cart";

interface CartSummaryProps {
  summary: CartSummaryType;
  itemCount: number;
  onCheckout: () => void;
}

export default function CartSummary({
  summary,
  itemCount,
  onCheckout,
}: CartSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Subtotal ({itemCount} items)
            </span>
            <span className="font-medium">${summary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-medium">${summary.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">
              {summary.shipping === 0 ? (
                <span className="text-green-600 font-semibold">Free</span>
              ) : (
                `$${summary.shipping.toFixed(2)}`
              )}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>${summary.total.toFixed(2)}</span>
          </div>
        </div>

        <Button onClick={onCheckout} className="w-full" size="lg">
          Proceed to Checkout
        </Button>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Free shipping on orders over $100
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
