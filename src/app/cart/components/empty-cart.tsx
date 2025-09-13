import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

interface EmptyCartProps {
  onContinueShopping: () => void;
}

export default function EmptyCart({ onContinueShopping }: EmptyCartProps) {
  return (
    <Card className="max-w-md mx-auto border-0 shadow-none">
      <CardContent className="text-center py-16">
        <div className="mb-6">
          <ShoppingBag className="w-24 h-24 text-muted-foreground/50 mx-auto" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added any items to your cart yet. Start
          shopping to fill it up!
        </p>
        <Button onClick={onContinueShopping} size="lg">
          Continue Shopping
        </Button>
      </CardContent>
    </Card>
  );
}
