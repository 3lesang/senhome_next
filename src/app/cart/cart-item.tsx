import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatVND, isValidUrl } from "@/lib/utils";
import type { CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
  onRemove?: (id: string) => void;
  onQuantityChange?: (count: number) => void;
}

export default function CartItem({
  item,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    onQuantityChange?.(newQuantity);
  };

  const handleRemove = () => {
    onRemove?.(item.id);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-shrink-0">
        {isValidUrl(item.thumbnail) && (
          <Image
            height={100}
            width={100}
            src={item.thumbnail}
            alt={item.name}
            className="w-full sm:w-24 sm:h-24 object-cover rounded-lg"
          />
        )}
      </div>

      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {item.name}
            </h3>
            <div className="space-x-1">
              {item.variants?.map((v) => (
                <Badge key={v.attr.id} variant="secondary">
                  {v.attr.name}: {v.opt.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-foreground">
              {formatVND(item.price)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus />
            </Button>
            <span className="w-12 text-center font-medium text-foreground">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <Plus />
            </Button>
          </div>

          <Button variant="ghost" onClick={handleRemove}>
            <Trash2 />
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
}
