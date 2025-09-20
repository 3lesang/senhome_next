"use client";

import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { CheckCircle, Loader2Icon } from "lucide-react";
import { useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import CustomerForm, {
  type CustomerFormValues,
} from "@/app/checkout/customer-form";
import type { OrderSummaryType } from "@/app/checkout/order-summary";
import ShippingForm, {
  type ShippingFormValues,
} from "@/app/checkout/shipping-form";
import { useSummary } from "@/app/checkout/useSummary";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatVND } from "@/lib/utils";
import { createOrderPocket } from "@/pocketbase/order/create";
import {
  type CreateItemOrderPayload,
  createItemOrderPocket,
} from "@/pocketbase/order/item";
import { openFormAtom, orderItemsAtom } from "./atom";

export default function OrderDialog() {
  const [order, setOrder] = useState({ id: "", email: "", total: 0 });
  const [open, setOpen] = useAtom(openFormAtom);
  const [items] = useAtom(orderItemsAtom);
  const shippingRef = useRef<UseFormReturn<ShippingFormValues>>(null);
  const customerRef = useRef<UseFormReturn<CustomerFormValues>>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      shippingValues,
      customerValues,
      summaryValues,
    }: {
      shippingValues?: ShippingFormValues;
      customerValues?: CustomerFormValues;
      summaryValues?: OrderSummaryType | null;
    }) => {
      const res = await createOrderPocket({
        name: `${customerValues?.firstName} ${customerValues?.lastName}`,
        phone: customerValues?.phone ?? "",
        email: customerValues?.email ?? "",
        total_price: summaryValues?.totalPrice ?? 0,
        total_discount: summaryValues?.discountPrice ?? 0,
        final_price: summaryValues?.finalPrice ?? 0,
        shipping_address: `${shippingValues?.street}, ${shippingValues?.ward.name}, ${shippingValues?.district.name}, ${shippingValues?.province.name}`,
        payment_method: "cash",
        note: "",
        shipping_fee: summaryValues?.shippingFee ?? 0,
        status: "created",
      });
      const formatItems = items.map((item) => {
        const payload: CreateItemOrderPayload = {
          price: item.price,
          quantity: item.quantity,
          discount: item.discount / 100,
          order: res.id,
          product: item.productId,
          variant: item.variantId,
        };
        return payload;
      });
      createItemOrderPocket(formatItems);
      return res;
    },
    onSuccess: (data) => {
      setOrder({ id: data.id, email: data?.email, total: data?.final_price });
    },
  });

  const summaryValues = useSummary(items);
  const handleClick = () => {
    const customerForm = customerRef.current;
    const shippingForm = shippingRef.current;

    if (!customerForm || !shippingForm) return;

    customerForm.handleSubmit((customerData) => {
      shippingForm.handleSubmit((shippingData) => {
        mutate({
          customerValues: customerData,
          shippingValues: shippingData,
          summaryValues,
        });
      })();
    })();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {order.id && (
        <DialogContent>
          <DialogTitle>Đặt hàng thành công</DialogTitle>
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2 text-center">
              Đơn hàng đã được xác nhận!
            </h2>
            <p className="text-muted-foreground text-center">
              Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được đặt thành công.
            </p>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-muted-foreground">
              Mã đơn hàng:
            </span>
            <span className="font-bold">#{order.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-muted-foreground">
              Tổng thanh toán:
            </span>
            <span className="font-bold">{formatVND(order.total)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-muted-foreground">
              Email xác nhận:
            </span>
            <span className="font-medium">{order.email}</span>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button
                type="button"
                className="w-full"
                onClick={() => setOrder({ id: "", email: "", total: 0 })}
              >
                Tiếp tục mua hàng
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
      {!order.id && (
        <DialogContent>
          <DialogTitle>Đặt hàng</DialogTitle>
          <CustomerForm ref={customerRef} />
          <ShippingForm ref={shippingRef} />
          <DialogFooter>
            <Button
              type="button"
              className="w-full"
              onClick={handleClick}
              disabled={isPending}
            >
              {isPending && <Loader2Icon className="animate-spin" />}
              Đặt hàng
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
