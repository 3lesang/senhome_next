import { Card, CardContent } from "@/components/ui/card";
import { Headphones, RotateCcw, Shield, Truck } from "lucide-react";
import React from "react";

const features = [
  {
    icon: Truck,
    title: "Miễn phí vận chuyển",
    description:
      "Miễn phí vận chuyển cho mọi đơn hàng trên 100$. Giao hàng nhanh trên toàn thế giới.",
  },
  {
    icon: Shield,
    title: "Thanh toán an toàn",
    description:
      "Thanh toán 100% an toàn với mã hóa SSL và bảo vệ chống gian lận.",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    description: "Hỗ trợ khách hàng 24/7 qua chat, email và điện thoại.",
  },
  {
    icon: RotateCcw,
    title: "Đổi trả dễ dàng",
    description:
      "Đổi trả và hoàn tiền trong 30 ngày, không rắc rối cho mọi sản phẩm.",
  },
];

export const Features: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tại sao chọn SenHome?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất với dịch vụ
            và chất lượng vượt trội
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="text-center hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
