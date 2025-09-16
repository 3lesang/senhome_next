import { CheckCircle, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatVND } from "@/lib/utils";

interface OrderConfirmationProps {
  orderNumber: string;
  email: string;
  total: number;
}

export default function OrderConfirmation({
  orderNumber,
  email,
  total,
}: OrderConfirmationProps) {
  return (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Đơn hàng đã được xác nhận!</h2>
        <p className="text-muted-foreground">
          Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được đặt thành công.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-muted-foreground">
              Mã đơn hàng:
            </span>
            <span className="font-bold">#{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-muted-foreground">
              Tổng thanh toán:
            </span>
            <span className="font-bold">{formatVND(total)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-muted-foreground">
              Email xác nhận:
            </span>
            <span className="font-medium">{email}</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button className="w-full" size="lg">
          <Download size={20} className="mr-2" />
          Tải hóa đơn
        </Button>
        <Button variant="outline" className="w-full" size="lg">
          <Mail size={20} className="mr-2" />
          Gửi hóa đơn qua Email
        </Button>
      </div>

      <div className="text-sm text-muted-foreground space-y-2">
        <p>
          Bạn sẽ nhận được email xác nhận kèm thông tin vận chuyển khi đơn hàng
          được gửi đi.
        </p>
        <p>Cần hỗ trợ? Liên hệ với chúng tôi tại support@example.com</p>
      </div>
    </div>
  );
}
