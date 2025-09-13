import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem as CartItemType } from "@/types/cart";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full sm:w-24 sm:h-24 object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {item.description}
                </p>
                {(item.size || item.color) && (
                  <div className="flex gap-2 mb-2">
                    {item.size && (
                      <Badge variant="secondary">Size: {item.size}</Badge>
                    )}
                    {item.color && (
                      <Badge variant="secondary">Color: {item.color}</Badge>
                    )}
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">
                  ${item.price.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">each</p>
              </div>
            </div>

            {/* Quantity Controls and Remove */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium text-foreground">
                  {item.quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveItem(item.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
