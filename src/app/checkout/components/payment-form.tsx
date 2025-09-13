import React from "react";
import { CreditCard, Smartphone, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentData {
  method: "card" | "paypal" | "apple";
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

interface PaymentFormProps {
  data: PaymentData;
  onChange: (data: PaymentData) => void;
  errors: Record<string, string>;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  data,
  onChange,
  errors,
}) => {
  const handleChange = (field: keyof PaymentData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const paymentMethods = [
    { id: "card", name: "Credit Card", icon: CreditCard },
    { id: "paypal", name: "PayPal", icon: Wallet },
    { id: "apple", name: "Apple Pay", icon: Smartphone },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={data.method}
          onValueChange={(value) =>
            handleChange("method", value as "card" | "paypal" | "apple")
          }
          className="space-y-3"
        >
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent/50 transition-colors"
              >
                <RadioGroupItem value={method.id} id={method.id} />
                <Icon className="w-5 h-5 text-muted-foreground" />
                <Label
                  htmlFor={method.id}
                  className="font-medium cursor-pointer flex-1"
                >
                  {method.name}
                </Label>
              </div>
            );
          })}
        </RadioGroup>

        {data.method === "card" && (
          <Card className="bg-muted/30">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name *</Label>
                <Input
                  type="text"
                  id="cardName"
                  value={data.cardName}
                  onChange={(e) => handleChange("cardName", e.target.value)}
                  placeholder="John Doe"
                  className={errors.cardName ? "border-destructive" : ""}
                />
                {errors.cardName && (
                  <p className="text-sm text-destructive">{errors.cardName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number *</Label>
                <Input
                  type="text"
                  id="cardNumber"
                  value={data.cardNumber}
                  onChange={(e) =>
                    handleChange(
                      "cardNumber",
                      e.target.value
                        .replace(/\s/g, "")
                        .replace(/(.{4})/g, "$1 ")
                        .trim()
                    )
                  }
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={errors.cardNumber ? "border-destructive" : ""}
                />
                {errors.cardNumber && (
                  <p className="text-sm text-destructive">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    type="text"
                    id="expiryDate"
                    value={data.expiryDate}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      if (value.length >= 2) {
                        value =
                          value.substring(0, 2) + "/" + value.substring(2, 4);
                      }
                      handleChange("expiryDate", value);
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={errors.expiryDate ? "border-destructive" : ""}
                  />
                  {errors.expiryDate && (
                    <p className="text-sm text-destructive">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    type="text"
                    id="cvv"
                    value={data.cvv}
                    onChange={(e) =>
                      handleChange("cvv", e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="123"
                    maxLength={4}
                    className={errors.cvv ? "border-destructive" : ""}
                  />
                  {errors.cvv && (
                    <p className="text-sm text-destructive">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {data.method === "paypal" && (
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6">
              <p className="text-sm text-yellow-800">
                You will be redirected to PayPal to complete your payment
                securely.
              </p>
            </CardContent>
          </Card>
        )}

        {data.method === "apple" && (
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Use Touch ID or Face ID to pay with Apple Pay.
              </p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};
