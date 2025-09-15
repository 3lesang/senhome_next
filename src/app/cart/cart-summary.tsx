import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CartSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Thông tin đơn hàng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tạm tính (4 sản phẩm)</span>
          <span className="font-medium"></span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Khuyến mãi</span>
          <span className="font-medium"></span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Phí vận chuyển</span>
          <span className="font-medium">
            <span className="text-green-600 font-semibold">Free</span>
          </span>
        </div>
        <Separator />
        <div className="flex justify-between text-base font-semibold">
          <span>Tổng tiền</span>
          <span></span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg">
          Tiến hành đặt hàng
        </Button>
      </CardFooter>
    </Card>
  );
}
