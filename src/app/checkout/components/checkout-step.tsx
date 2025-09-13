import { Check } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils";

interface CheckoutStepProps {
  step: number;
  currentStep: number;
  title: string;
  isCompleted: boolean;
}

export const CheckoutStep: React.FC<CheckoutStepProps> = ({
  step,
  currentStep,
  title,
  isCompleted,
}) => {
  const isActive = step === currentStep;
  const isPast = step < currentStep || isCompleted;

  return (
    <div className="flex items-center">
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200",
          isActive && "border-primary bg-primary text-primary-foreground",
          isPast && "border-green-500 bg-green-500 text-white",
          !isActive &&
            !isPast &&
            "border-muted-foreground bg-background text-muted-foreground",
        )}
      >
        {isPast ? (
          <Check size={16} />
        ) : (
          <span className="text-sm font-medium">{step}</span>
        )}
      </div>
      <span
        className={cn(
          "ml-3 text-sm font-medium transition-colors duration-200",
          isActive && "text-primary",
          isPast && "text-green-600",
          !isActive && !isPast && "text-muted-foreground",
        )}
      >
        {title}
      </span>
    </div>
  );
};
