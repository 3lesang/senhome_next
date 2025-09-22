"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
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

const formSchema = z.object({
  email: z.email("Email không hợp lệ"),
  firstName: z
    .string()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được vượt quá 50 ký tự"),
  lastName: z
    .string()
    .min(2, "Họ phải có ít nhất 2 ký tự")
    .max(50, "Họ không được vượt quá 50 ký tự"),
  phone: z
    .string()
    .regex(/^0\d{9}$/, "Số điện thoại phải có 10 chữ số và bắt đầu bằng 0"),
});

export type CustomerFormValues = z.infer<typeof formSchema>;
interface CustomerFormProps {
  ref?: React.Ref<UseFormReturn<CustomerFormValues>>;
}

export default function CustomerForm({ ref }: CustomerFormProps) {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
  });

  useImperativeHandle(ref, () => form, [form]);

  function onSubmit(values: CustomerFormValues) {
    console.log(values);
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
    <Card className="border-0 shadow-none p-0 gap-1">
      <CardHeader className="p-0">
        <CardTitle>Thông tin khách hàng</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={onReset}
            className="space-y-8 @container"
          >
            <div className="grid grid-cols-12 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                    <FormLabel className="flex shrink-0">Email</FormLabel>

                    <div className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            key="text-input-2"
                            placeholder="Địa chỉ email"
                            type="text"
                            id="text-input-2"
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
                name="firstName"
                render={({ field }) => (
                  <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                    <FormLabel className="flex shrink-0">Họ</FormLabel>

                    <div className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            key="text-input-1"
                            placeholder="Họ"
                            type="text"
                            id="text-input-1"
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
                name="lastName"
                render={({ field }) => (
                  <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                    <FormLabel className="flex shrink-0">Tên</FormLabel>

                    <div className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            key="text-input-0"
                            placeholder="Tên"
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
                name="phone"
                render={({ field }) => (
                  <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                    <FormLabel className="flex shrink-0">
                      Số điện thoại
                    </FormLabel>

                    <div className="w-full">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            key="tel-input-0"
                            placeholder="Số điện thoại"
                            type="tel"
                            id="tel-input-0"
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
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
