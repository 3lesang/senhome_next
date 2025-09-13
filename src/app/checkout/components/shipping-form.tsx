import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ShippingData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  sameAsBilling: boolean;
}

interface ShippingFormProps {
  data: ShippingData;
  onChange: (data: ShippingData) => void;
  errors: Record<string, string>;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
  data,
  onChange,
  errors,
}) => {
  const handleChange = (field: keyof ShippingData, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="sameAsBilling"
            checked={data.sameAsBilling}
            onCheckedChange={(checked) =>
              handleChange("sameAsBilling", checked as boolean)
            }
          />
          <Label htmlFor="sameAsBilling" className="text-sm font-normal">
            Same as billing address
          </Label>
        </div>

        {!data.sameAsBilling && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Input
                type="text"
                id="address"
                value={data.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="123 Main St"
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  type="text"
                  id="city"
                  value={data.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  placeholder="New York"
                  className={errors.city ? "border-destructive" : ""}
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Select
                  value={data.state}
                  onValueChange={(value) => handleChange("state", value)}
                >
                  <SelectTrigger
                    className={errors.state ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AL">Alabama</SelectItem>
                    <SelectItem value="AK">Alaska</SelectItem>
                    <SelectItem value="AZ">Arizona</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                  </SelectContent>
                </Select>
                {errors.state && (
                  <p className="text-sm text-destructive">{errors.state}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  type="text"
                  id="zipCode"
                  value={data.zipCode}
                  onChange={(e) => handleChange("zipCode", e.target.value)}
                  placeholder="10001"
                  className={errors.zipCode ? "border-destructive" : ""}
                />
                {errors.zipCode && (
                  <p className="text-sm text-destructive">{errors.zipCode}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select
                  value={data.country}
                  onValueChange={(value) => handleChange("country", value)}
                >
                  <SelectTrigger
                    className={errors.country ? "border-destructive" : ""}
                  >
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="MX">Mexico</SelectItem>
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-sm text-destructive">{errors.country}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
