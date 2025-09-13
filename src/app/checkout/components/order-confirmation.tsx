import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, Mail } from "lucide-react";
import React from "react";

interface OrderConfirmationProps {
  orderNumber: string;
  email: string;
  total: number;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  orderNumber,
  email,
  total,
}) => {
  return (
    <div className="text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-muted-foreground">
              Order Number:
            </span>
            <span className="font-bold">#{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-muted-foreground">
              Total Amount:
            </span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-muted-foreground">
              Confirmation Email:
            </span>
            <span className="font-medium">{email}</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <Button className="w-full" size="lg">
          <Download size={20} className="mr-2" />
          Download Receipt
        </Button>
        <Button variant="outline" className="w-full" size="lg">
          <Mail size={20} className="mr-2" />
          Email Receipt
        </Button>
      </div>

      <div className="text-sm text-muted-foreground space-y-2">
        <p>
          You will receive a confirmation email with tracking information once
          your order ships.
        </p>
        <p>Questions? Contact us at support@example.com</p>
      </div>
    </div>
  );
};
