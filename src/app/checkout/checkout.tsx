"use client";

import { ArrowLeft, ArrowRight, Loader2, Lock } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CheckoutStep } from "./checkout-step";
import { CustomerForm } from "./customer-form";
import { OrderConfirmation } from "./order-confirmation";
import { OrderSummary } from "./order-summary";
import { PaymentForm } from "./payment-form";
import { ShippingForm } from "./shipping-form";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface CustomerData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface ShippingData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  sameAsBilling: boolean;
}

interface PaymentData {
  method: "card" | "paypal" | "apple";
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber] = useState(Math.random().toString());

  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 199.99,
      quantity: 1,
      image:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300",
      color: "Black",
    },
    {
      id: "2",
      name: "Leather Crossbody Bag",
      price: 89.99,
      quantity: 2,
      image:
        "https://images.pexels.com/photos/904350/pexels-photo-904350.jpeg?auto=compress&cs=tinysrgb&w=300",
      color: "Brown",
    },
    {
      id: "3",
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      quantity: 1,
      image:
        "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=300",
      size: "M",
      color: "White",
    },
  ]);

  const [customerData, setCustomerData] = useState<CustomerData>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [shippingData, setShippingData] = useState<ShippingData>({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    sameAsBilling: true,
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    method: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, title: "Customer Info", isCompleted: currentStep > 1 },
    { number: 2, title: "Shipping", isCompleted: currentStep > 2 },
    { number: 3, title: "Payment", isCompleted: currentStep > 3 },
    { number: 4, title: "Review", isCompleted: orderComplete },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!customerData.email) newErrors.email = "Email is required";
      if (!customerData.firstName)
        newErrors.firstName = "First name is required";
      if (!customerData.lastName) newErrors.lastName = "Last name is required";
      if (!customerData.phone) newErrors.phone = "Phone number is required";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (customerData.email && !emailRegex.test(customerData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (step === 2 && !shippingData.sameAsBilling) {
      if (!shippingData.address) newErrors.address = "Address is required";
      if (!shippingData.city) newErrors.city = "City is required";
      if (!shippingData.state) newErrors.state = "State is required";
      if (!shippingData.zipCode) newErrors.zipCode = "ZIP code is required";
      if (!shippingData.country) newErrors.country = "Country is required";
    }

    if (step === 3 && paymentData.method === "card") {
      if (!paymentData.cardName)
        newErrors.cardName = "Cardholder name is required";
      if (!paymentData.cardNumber)
        newErrors.cardNumber = "Card number is required";
      if (!paymentData.expiryDate)
        newErrors.expiryDate = "Expiry date is required";
      if (!paymentData.cvv) newErrors.cvv = "CVV is required";

      if (
        paymentData.cardNumber &&
        paymentData.cardNumber.replace(/\s/g, "").length < 16
      ) {
        newErrors.cardNumber = "Please enter a valid card number";
      }

      if (paymentData.cvv && paymentData.cvv.length < 3) {
        newErrors.cvv = "Please enter a valid CVV";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 4) {
        handlePlaceOrder();
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setOrderComplete(true);
    setCurrentStep(5);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setOrderItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const removeItem = (id: string) => {
    setOrderItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const progressValue = (currentStep / 4) * 100;

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <OrderConfirmation
                orderNumber={orderNumber}
                email={customerData.email}
                total={total}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            <Card>
              {/* Progress Steps */}
              <CardHeader className="pb-4">
                <div className="space-y-4">
                  <Progress value={progressValue} className="w-full" />
                  <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                      <React.Fragment key={step.number}>
                        <CheckoutStep
                          step={step.number}
                          currentStep={currentStep}
                          title={step.title}
                          isCompleted={step.isCompleted}
                        />
                        {index < steps.length - 1 && (
                          <div className="flex-1 mx-4 h-px bg-border"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </CardHeader>

              <Separator />

              {/* Form Content */}
              <CardContent className="p-6">
                {currentStep === 1 && (
                  <CustomerForm
                    data={customerData}
                    onChange={setCustomerData}
                    errors={errors}
                  />
                )}

                {currentStep === 2 && (
                  <ShippingForm
                    data={shippingData}
                    onChange={setShippingData}
                    errors={errors}
                  />
                )}

                {currentStep === 3 && (
                  <PaymentForm
                    data={paymentData}
                    onChange={setPaymentData}
                    errors={errors}
                  />
                )}

                {currentStep === 4 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Review Your Order</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Card>
                        <CardContent className="pt-4">
                          <h4 className="font-medium mb-2">
                            Customer Information
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {customerData.firstName} {customerData.lastName}
                            <br />
                            {customerData.email}
                            <br />
                            {customerData.phone}
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-4">
                          <h4 className="font-medium mb-2">Shipping Address</h4>
                          <p className="text-sm text-muted-foreground">
                            {shippingData.sameAsBilling ? (
                              "Same as billing address"
                            ) : (
                              <>
                                {shippingData.address}
                                <br />
                                {shippingData.city}, {shippingData.state}{" "}
                                {shippingData.zipCode}
                                <br />
                                {shippingData.country}
                              </>
                            )}
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-4">
                          <h4 className="font-medium mb-2">Payment Method</h4>
                          <p className="text-sm text-muted-foreground capitalize">
                            {paymentData.method === "card"
                              ? `Card ending in ${paymentData.cardNumber.slice(
                                  -4,
                                )}`
                              : paymentData.method}
                          </p>
                        </CardContent>
                      </Card>
                    </CardContent>
                  </Card>
                )}
              </CardContent>

              <Separator />

              {/* Navigation Buttons */}
              <CardContent className="p-6 flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>

                <Button onClick={handleNext} disabled={isLoading} size="lg">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : currentStep === 4 ? (
                    <>
                      <Lock size={16} className="mr-2" />
                      Place Order
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight size={16} className="ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <OrderSummary
              items={orderItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
