import {
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  Shield,
  Star,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductInfoProps {
  product?: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  onColorSelect: (color: string) => void;
  onSizeSelect: (size: string) => void;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

export default function ProductInfo({
  product = {
    id: "",
    name: "",
    slug: "",
    price: 0,
    description: "",
    content: "",
    thumbnail: "",
    category: "",
    rating: 0,
    reviewCount: 0,
    inStock: false,
    stockCount: 0,
  },
  quantity,
  onQuantityChange,
  onAddToCart,
}: ProductInfoProps) {
  // const discountPercentage = product.originalPrice
  //   ? Math.round(
  //       ((product.originalPrice - product.price) / product.originalPrice) * 100
  //     )
  //   : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{product.category}</Badge>
          {/* <Badge variant="outline">{product.brand}</Badge> */}
          {/* {discountPercentage > 0 && (
            <Badge variant="destructive">{discountPercentage}% OFF</Badge>
          )} */}
        </div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-muted-foreground text-lg">{product.description}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((item, i) => (
            <Star
              key={item as number}
              className={cn(
                "w-5 h-5",
                i < Math.floor(product.rating)
                  ? "text-yellow-400 fill-current"
                  : "text-muted-foreground/30",
              )}
            />
          ))}
        </div>
        <span className="font-medium">{product.rating}</span>
        <span className="text-muted-foreground">
          ({product.reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
        {/* {product.originalPrice && (
          <span className="text-xl text-muted-foreground line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        )} */}
      </div>

      <Separator />

      {/* Color Selection */}
      {/* {product.variants.colors && (
        <div>
          <h3 className="font-semibold mb-3">Color</h3>
          <div className="flex gap-2">
            {product.variants.colors.map((color) => (
              <Button
                key={color.value}
                variant={selectedColor === color.value ? "default" : "outline"}
                onClick={() => onColorSelect(color.value)}
                className="h-auto py-2"
              >
                {color.name}
              </Button>
            ))}
          </div>
        </div>
      )} */}

      {/* Size Selection */}
      {/* {product.variants.sizes && (
        <div>
          <h3 className="font-semibold mb-3">Size</h3>
          <div className="flex gap-2">
            {product.variants.sizes.map((size) => (
              <Button
                key={size.value}
                variant={selectedSize === size.value ? "default" : "outline"}
                onClick={() => onSizeSelect(size.value)}
                disabled={!size.available}
                className="h-auto py-2"
              >
                {size.name}
              </Button>
            ))}
          </div>
        </div>
      )} */}

      {/* Quantity */}
      <div>
        <h3 className="font-semibold mb-3">Quantity</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="h-10 w-10 rounded-r-none"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="w-16 text-center font-medium py-2 border-x">
              {quantity}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onQuantityChange(quantity + 1)}
              disabled={quantity >= product.stockCount}
              className="h-10 w-10 rounded-l-none"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            {product.stockCount} available
          </span>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="flex gap-3">
        <Button onClick={onAddToCart} className="flex-1" size="lg">
          Add to Cart - ${(product.price * quantity).toFixed(2)}
        </Button>
        <Button variant="outline" size="lg">
          <Heart className="w-5 h-5" />
        </Button>
        <Button variant="outline" size="lg">
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Trust Indicators */}
      <Card>
        <CardContent className="">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-green-600" />
              <span>Free shipping over $100</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>2-year warranty</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="w-4 h-4 text-orange-600" />
              <span>30-day returns</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
