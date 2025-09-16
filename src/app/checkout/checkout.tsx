"use client";

import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { createOrderPocket } from "@/pocketbase/order/create";
import {
  type CreateItemOrderPayload,
  createItemOrderPocket,
} from "@/pocketbase/order/item";
import { orderItemsAtom } from "@/stores/order";
import CustomerForm, { type CustomerFormValues } from "./customer-form";
import OrderConfirmation from "./order-confirmation";
import OrderSummary, { type OrderSummaryType } from "./order-summary";
import ShippingForm, { type ShippingFormValues } from "./shipping-form";

export default function Checkout() {
  const [order, setOrder] = useState({ id: "", email: "", total: 0 });
  const [items] = useAtom(orderItemsAtom);

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

  const shippingRef = useRef<UseFormReturn<ShippingFormValues>>(null);
  const customerRef = useRef<UseFormReturn<CustomerFormValues>>(null);
  const summaryRef = useRef<OrderSummaryType>(null);

  const handleOrder = () => {
    const shippingValues = shippingRef.current?.getValues();
    const customerValues = customerRef.current?.getValues();
    const summaryValues = summaryRef.current;
    mutate({ shippingValues, customerValues, summaryValues });
  };

  if (order.id) {
    return (
      <OrderConfirmation
        orderNumber={order.id}
        email={order.email}
        total={order.total}
      />
    );
  }

  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
      <div className="lg:col-span-7">
        <CustomerForm ref={customerRef} />
        <ShippingForm ref={shippingRef} />
      </div>
      <div className="mt-10 sticky top-28 lg:col-span-5">
        <OrderSummary
          ref={summaryRef}
          items={items}
          onConfirm={handleOrder}
          isPending={isPending}
        />
      </div>
    </div>
  );
}
