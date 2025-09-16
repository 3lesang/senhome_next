"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
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
import { cartItemsAtom, cartTotalQtyAtom } from "@/stores/cart";
import { addOrderItemAtom } from "@/stores/order";

export default function CartSummary() {
  const router = useRouter();
  const [items] = useAtom(cartItemsAtom);
  const [totalQty] = useAtom(cartTotalQtyAtom);
  const [, addOrderItem] = useAtom(addOrderItemAtom);

  const shippingFee = 0;

  const { totalPrice, discountPrice } = items.reduce(
    (acc, cur) => ({
      totalPrice: acc.totalPrice + cur.price * (cur.quantity ?? 1),
      discountPrice:
        acc.discountPrice + cur.price * (cur.discount / 100) * cur.quantity,
    }),
    { totalPrice: 0, discountPrice: 0 },
  );

  const finalPrice = totalPrice - discountPrice + shippingFee;

  const handleCheckout = () => {
    addOrderItem(items);
    router.push("/checkout");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Thông tin đơn hàng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Tạm tính ({totalQty} sản phẩm)
          </span>
          <span className="font-medium">{formatVND(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Khuyến mãi</span>
          <span className="font-medium">-{formatVND(discountPrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Phí vận chuyển</span>
          <span className="font-medium">
            {shippingFee === 0 ? (
              <span className="text-green-600 font-semibold">Miễn phí</span>
            ) : (
              <span className="text-green-600 font-semibold">
                -{formatVND(shippingFee)}
              </span>
            )}
          </span>
        </div>
        <Separator />
        <div className="flex justify-between text-base font-semibold">
          <span>Tổng tiền</span>
          <span>{formatVND(finalPrice)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          className="w-full"
          size="lg"
          onClick={handleCheckout}
        >
          Tiến hành đặt hàng
        </Button>
      </CardFooter>
    </Card>
  );
}
