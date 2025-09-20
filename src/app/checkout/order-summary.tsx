"use client";

import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import type React from "react";
import { useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatVND } from "@/lib/utils";
import type { OrderItemType } from "@/types/order";
import { useSummary } from "./useSummary";

export type OrderSummaryType = {
  totalPrice: number;
  discountPrice: number;
  shippingFee: number;
  finalPrice: number;
};

interface OrderSummaryProps {
  items: OrderItemType[];
  onConfirm?: () => void;
  ref?: React.Ref<OrderSummaryType>;
  isPending?: boolean;
}

export default function OrderSummary({
  ref,
  items,
  onConfirm,
  isPending,
}: OrderSummaryProps) {
  const { totalPrice, discountPrice, shippingFee, finalPrice } =
    useSummary(items);

  useImperativeHandle(ref, () => ({
    totalPrice,
    discountPrice,
    shippingFee,
    finalPrice,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin đơn hàng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {items?.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 p-2 border rounded-lg"
            >
              <Image
                height={100}
                width={100}
                src={item.thumbnail}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">{item.name}</h4>
                <span className="text-sm font-medium px-2 min-w-[2rem] text-center">
                  {item.quantity}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{formatVND(item.price)}</p>
              </div>
            </div>
          ))}
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tạm tính</span>
            <span>{formatVND(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Giảm giá</span>
            <span>-{formatVND(discountPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Phí vận chuyển</span>
            {shippingFee === 0 ? (
              <span className="text-green-600 font-semibold">Miễn phí</span>
            ) : (
              <span className="font-semibold">-{formatVND(shippingFee)}</span>
            )}
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-semibold">
            <span>Thành tiền</span>
            <span>{formatVND(finalPrice)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          className="w-full"
          onClick={onConfirm}
          disabled={isPending}
        >
          {isPending && <Loader2Icon className="animate-spin" />}
          Đặt hàng
        </Button>
      </CardFooter>
    </Card>
  );
}
