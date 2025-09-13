"use client";

import { Eye, Star } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { isValidUrl } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { thumbnail, name } = product;
  const isUrl = isValidUrl(thumbnail);
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="relative overflow-hidden">
        {isUrl && (
          <Image
            height={100}
            width={100}
            src={thumbnail}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <Badge variant="destructive" className="absolute top-3 right-3">
          -20%
        </Badge>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          <Button
            variant="secondary"
            size="icon"
            className="bg-background/90 hover:bg-background"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 flex-1">
          {product.name}
        </h3>

        <div className="flex items-center space-x-1 mb-3">
          <div className="flex items-center">
            {[...Array(5).keys()].map((item, i) => (
              <Star
                key={item}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl font-bold">{product.price}</span>
          <span className="text-lg text-muted-foreground line-through">
            2000000
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
