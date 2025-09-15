"use client";

import { ArrowRight, Mail } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-8 lg:p-12">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8" />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Luôn được cập nhật
                </h2>
                <p className="text-lg text-primary-foreground/90">
                  Đăng ký nhận bản tin để là người đầu tiên biết về sản phẩm
                  mới, ưu đãi độc quyền và khuyến mãi đặc biệt.
                </p>
              </div>

              {isSubscribed ? (
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <p className="text-green-100 font-medium">
                    🎉 Cảm ơn bạn đã đăng ký! Vui lòng kiểm tra email để xác
                    nhận.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                >
                  <Input
                    type="email"
                    placeholder="Nhập địa chỉ email của bạn"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                    required
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    className="whitespace-nowrap"
                  >
                    Đăng ký
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}

              <p className="text-sm text-primary-foreground/70">
                Không spam, bạn có thể hủy đăng ký bất kỳ lúc nào. Chúng tôi tôn
                trọng quyền riêng tư của bạn.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
