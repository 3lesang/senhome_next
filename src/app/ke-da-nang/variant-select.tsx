"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import { useState } from "react";
import type { ProductDataType } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { formatVND } from "@/lib/utils";
import type { VariantType } from "@/types/product";
import { addOrderItemAtom, openFormAtom, openVariantSelectAtom } from "./atom";

interface VariantSelectProps {
  data: ProductDataType;
}

export default function VariantSelect({ data }: VariantSelectProps) {
  const [open, setOpen] = useAtom(openVariantSelectAtom);
  const [_, setOpenOrder] = useAtom(openFormAtom);
  const [options, setOptions] = useState<Record<string, string>>({});
  const [variant, setVariant] = useState<VariantType>();
  const [fileUrl, setFileUrl] = useState("");
  const [, addOrderItem] = useAtom(addOrderItemAtom);
  const {
    id,
    name,
    price: productPrice,
    discount: productDiscount,
    attrs,
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

  const price = variant?.price ?? productPrice;
  const discount = variant?.discount ?? productDiscount;

  const handleClick = () => {
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

    addOrderItem([
      {
        id: variant?.id ?? id,
        name,
        price,
        discount: discount,
        quantity: 1,
        thumbnail: data.thumbnail,
        variantId: variant?.id ?? "",
        productId: id,
        variants: attrMap,
      },
    ]);
    setOpenOrder(true);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Chọn phân loại</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 mb-4 items-end">
            {fileUrl && <Image height={100} width={100} src={fileUrl} alt="" />}
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
            <Button onClick={handleClick}>Đặt hàng</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
