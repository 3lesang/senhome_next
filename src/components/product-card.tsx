"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatVND, isValidUrl } from "@/lib/utils";

export type ProductDataType = {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount: number;
  thumbnail: string;
  rating: number;
  reviewCount: number;
};

interface ProductCardProps {
  data: ProductDataType;
}

export default function ProductCard({ data }: ProductCardProps) {
  const { thumbnail, name, price, discount, rating, reviewCount } = data;
  const isUrl = isValidUrl(thumbnail);
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <div className="relative overflow-hidden">
        {isUrl && (
          <Image
            height={500}
            width={500}
            src={thumbnail}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <Badge variant="destructive" className="absolute top-3 right-3">
          -20%
        </Badge>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2"></div>
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 flex-1">
          {name}
        </h3>

        <div className="flex items-center space-x-1 mb-3">
          <div className="flex items-center">
            {[...Array(5).keys()].map((item, i) => (
              <Star
                key={item}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {rating} ({reviewCount})
          </span>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl font-bold">{formatVND(price)}</span>
          {discount > 0 && (
            <span className="text-lg text-muted-foreground line-through">
              {formatVND(price * (1 - discount / 100))}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
