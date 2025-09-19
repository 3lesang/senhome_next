"use client";

import { useAtom } from "jotai";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { formatVND, isValidUrl } from "@/lib/utils";
import { addItemAtom } from "@/stores/cart";
import type { FileType } from "@/types/file";
import type { AttributeOptionType, VariantType } from "@/types/product";
import { Button } from "./ui/button";

export type ProductDataType = {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount: number;
  thumbnail: string;
  rating: number;
  reviewCount: number;
  attrs: AttributeOptionType[];
  variants: VariantType[];
  files: FileType[];
  variantFileMap: Record<string, string>;
};

interface ProductCardProps {
  data: ProductDataType;
}

export default function ProductCard({ data }: ProductCardProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Record<string, string>>({});
  const [variant, setVariant] = useState<VariantType>();
  const [fileUrl, setFileUrl] = useState("");
  const [, addItem] = useAtom(addItemAtom);
  const {
    id,
    thumbnail,
    name,
    price,
    discount,
    rating,
    reviewCount,
    attrs,
    slug,
    variantFileMap,
    files,
  } = data;

  const handleOptionClick = (attrId: string, optId: string) => {
    const newOptions = { ...options, [attrId]: optId };
    const optionsValues = Object.values(newOptions);

    const isSameArray = (a: string[], b: string[]) =>
      a.length === b.length && a.every((val) => b.includes(val));

    const foundVariant = data.variants.find((item) =>
      isSameArray(item.options, optionsValues),
    );

    const fileUrl = files.find(
      (f) => f.id === variantFileMap[foundVariant?.id ?? ""],
    )?.url;

    setFileUrl(fileUrl ?? "");

    setVariant(foundVariant);

    setOptions(newOptions);
  };

  const handleAddToCart = () => {
    const attrMap = Object.entries(options).map(([attrId, optId]) => {
      const attr = data.attrs.find((i) => i.id === attrId);
      const opt = attr?.opts.find((i) => i.id === optId);
      return {
        attr: {
          id: attr?.id ?? "",
          name: attr?.name ?? "",
        },
        opt: {
          id: opt?.id ?? "",
          name: opt?.name ?? "",
        },
      };
    });

    addItem({
      id: variant?.id ?? id,
      name,
      price,
      discount: discount,
      quantity: 1,
      thumbnail: data.thumbnail,
      variantId: variant?.id ?? "",
      productId: id,
      variants: attrMap,
    });
    toast("Đã thêm sản phẩm vào giỏ hàng.");
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (data.variants.length) {
      return setOpen(true);
    }
    handleAddToCart();
  };

  return (
    <>
      <Link href={`/products/${slug}`}>
        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="relative overflow-hidden">
            {isValidUrl(thumbnail) && (
              <Image
                height={500}
                width={500}
                src={thumbnail}
                alt={name}
                className="w-full aspect-square object-contain group-hover:scale-105 transition-transform duration-300"
              />
            )}
            {discount > 0 && (
              <Badge variant="destructive" className="absolute top-3 right-3">
                -{discount}%
              </Badge>
            )}
          </div>

          <CardContent className="flex-1 flex flex-col">
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
                <span className="text-sm text-muted-foreground">{rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {reviewCount > 0 ? reviewCount : "Chưa có"} đánh giá
              </span>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold">
                {formatVND(price * (1 - discount / 100))}
              </span>
              {discount > 0 && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatVND(price)}
                </span>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="button" className="w-full" onClick={handleClick}>
              Thêm vào giỏ
            </Button>
          </CardFooter>
        </Card>
      </Link>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Chọn phân loại</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4 mb-4 items-end">
              {fileUrl && (
                <Image height={100} width={100} src={fileUrl} alt="" />
              )}
              <div>
                <h3 className="font-semibold">Giá</h3>
                {Number(variant?.price) > 0 && (
                  <span>{formatVND(variant?.price)}</span>
                )}
              </div>
            </div>
            <div className="space-y-4">
              {attrs.map((attr) => (
                <div key={attr.id}>
                  <h3 className="font-semibold mb-3">{attr.name}</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {attr.opts.map((opt) => (
                      <Button
                        key={opt.id}
                        variant={
                          options[attr.id] === opt.id ? "default" : "outline"
                        }
                        className="h-auto py-2"
                        onClick={() => handleOptionClick(attr.id, opt.id)}
                      >
                        {opt.name}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button
                onClick={() => {
                  handleAddToCart();
                  setOpen(false);
                }}
              >
                Thêm vào giỏ
              </Button>
            </DrawerClose>
            <DrawerClose>
              <Button variant="outline">Hủy</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
