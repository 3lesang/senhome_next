import { RotateCcw, Shield, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TrustIndicators() {
  const indicators = [
    {
      icon: Shield,
      title: "Secure Checkout",
      description: "SSL encrypted",
      color: "text-green-600",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $100",
      color: "text-blue-600",
    },
    {
      icon: RotateCcw,
      title: "30-Day Returns",
      description: "Hassle-free returns",
      color: "text-orange-600",
    },
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {indicators.map((indicator) => {
            const Icon = indicator.icon;
            return (
              <div key={indicator.title} className="flex items-center gap-3">
                <Icon className={`w-6 h-6 ${indicator.color}`} />
                <div>
                  <p className="font-semibold text-foreground">
                    {indicator.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {indicator.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
