"use client";

import { useRef } from "react";
import type { CarouselApi } from "@/components/ui/carousel";
import type { FileType } from "@/types/file";
import type { VariantType } from "@/types/product";
import ProductGallery from "./gallery";
import ProductInfoRight from "./info-right";

interface ProductInfoProps {
  data: {
    id: string;
    name: string;
    category: string;
    price: number;
    discount: number;
    thumbnail: string;
    attrs: { id: string; name: string; opts: { id: string; name: string }[] }[];
    variants: VariantType[];
    countReview: number;
    rating: number;
    files: FileType[];
    variantFileMap: Record<string, string>;
  };
}

export default function ProductInfo({ data }: ProductInfoProps) {
  const apiRef = useRef<CarouselApi>(null);

  const handleVariantChange = (id: string) => {
    const fileId = data.variantFileMap[id];
    const index = data.files?.findIndex((i) => i.id === fileId);
    apiRef.current?.scrollTo(index);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
      <ProductGallery data={data.files} ref={apiRef} />
      <ProductInfoRight data={data} onVariantChange={handleVariantChange} />
    </div>
  );
}
