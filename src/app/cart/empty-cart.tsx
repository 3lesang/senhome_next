import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function EmptyCart() {
  return (
    <div className="bg-background flex-1">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="max-w-md mx-auto border-0 shadow-none">
          <CardContent className="text-center py-16">
            <div className="mb-6">
              <ShoppingBag className="w-24 h-24 text-muted-foreground/50 mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-muted-foreground mb-8">
              Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy bắt đầu mua
              sắm!
            </p>
            <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
              Tiếp tục mua sắm
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
