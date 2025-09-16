"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useImperativeHandle } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  street: z.string(),
  province: z.object({
    id: z.string(),
    name: z.string(),
  }),
  district: z.object({
    id: z.string(),
    name: z.string(),
  }),
  ward: z.object({
    id: z.string(),
    name: z.string(),
  }),
});

export type ShippingFormValues = z.infer<typeof formSchema>;

interface ShippingFormProps {
  ref?: React.Ref<UseFormReturn<ShippingFormValues>>;
}

export default function ShippingForm({ ref }: ShippingFormProps) {
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: "",
      province: {},
      district: {},
      ward: {},
    },
  });

  useImperativeHandle(ref, () => form, [form]);

  function onSubmit(values: ShippingFormValues) {
    console.log(values);
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  const { data: provinces } = useQuery({
    queryKey: ["provinces"],
    queryFn: () =>
      axios("https://open.oapi.vn/location/provinces", {
        params: {
          page: 0,
          size: 100,
        },
      }),

    select(data) {
      return data.data?.data;
    },
  });

  const province = form.watch("province");

  const { data: districts } = useQuery({
    queryKey: ["districts", province.id],
    queryFn: () =>
      axios(`https://open.oapi.vn/location/districts/${province.id}`, {
        params: {
          page: 0,
          size: 100,
        },
      }),

    select(data) {
      return data.data?.data;
    },
    enabled: !!province.id,
  });

  const district = form.watch("district");

  const { data: wards } = useQuery({
    queryKey: ["wards", district.id],
    queryFn: () =>
      axios(`https://open.oapi.vn/location/wards/${district.id}`, {
        params: {
          page: 0,
          size: 100,
        },
      }),

    select(data) {
      return data.data?.data;
    },
    enabled: !!district.id,
  });

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle>Địa chỉ nhận hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={onReset}
            className="space-y-8"
          >
            <div className="grid grid-cols-12 gap-4">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                    <FormLabel className="flex shrink-0">Địa chỉ</FormLabel>

                    <div className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            key="text-input-0"
                            placeholder="Địa chỉ"
                            type="text"
                            id="text-input-0"
                            className=" "
                            {...field}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                    <FormLabel className="flex shrink-0">
                      Tỉnh/Thành Phố
                    </FormLabel>

                    <div className="w-full">
                      <FormControl>
                        <Select
                          value={field.value.id}
                          onValueChange={(value) => {
                            const province = provinces.find(
                              (p: any) => p.id === value,
                            );
                            field.onChange({ id: value, name: province?.name });
                            form.setValue("district", {
                              id: "",
                              name: "",
                            });
                          }}
                        >
                          <SelectTrigger className="w-full ">
                            <SelectValue placeholder="Tỉnh/Thành Phố" />
                          </SelectTrigger>
                          <SelectContent>
                            {provinces?.map((item: any) => (
                              <SelectItem key={item?.id} value={item?.id}>
                                {item?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                    <FormLabel className="flex shrink-0">Quận/Huyện</FormLabel>

                    <div className="w-full">
                      <FormControl>
                        <Select
                          value={field.value.id}
                          onValueChange={(value) => {
                            const district = districts.find(
                              (d: any) => d.id === value,
                            );
                            field.onChange({ id: value, name: district?.name });
                            form.setValue("ward", {
                              id: "",
                              name: "",
                            });
                          }}
                        >
                          <SelectTrigger
                            className="w-full"
                            disabled={!province}
                          >
                            <SelectValue placeholder="Quận/Huyện" />
                          </SelectTrigger>
                          <SelectContent>
                            {districts?.map((item: any) => (
                              <SelectItem key={item?.id} value={item?.id}>
                                {item?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ward"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                    <FormLabel className="flex shrink-0">Pường/Xã</FormLabel>

                    <div className="w-full">
                      <FormControl>
                        <Select
                          value={field.value.id}
                          onValueChange={(value) => {
                            const ward = wards.find((w: any) => w.id === value);
                            field.onChange({ id: value, name: ward?.name });
                          }}
                        >
                          <SelectTrigger
                            className="w-full"
                            disabled={!district}
                          >
                            <SelectValue placeholder="Pường/Xã" />
                          </SelectTrigger>
                          <SelectContent>
                            {wards?.map((item: any) => (
                              <SelectItem key={item?.id} value={item?.id}>
                                {item?.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
