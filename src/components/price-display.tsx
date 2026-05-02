"use client";

import { cn } from "@/lib/utils";
import { getProductPriceDisplay } from "@/lib/flash-deals";
import type { Product } from "@/types";
import { useFlashDealStore } from "@/components/flash-deal-store";

interface PriceDisplayProps {
  product: Product;
  className?: string;
  currentClassName?: string;
  compareClassName?: string;
}

export function PriceDisplay({
  product,
  className,
  currentClassName,
  compareClassName,
}: PriceDisplayProps) {
  const isFlashDealActive = useFlashDealStore((state) => state.isFlashDealActive);
  const { currentPrice, compareAtPrice, isFlashDealPrice } = getProductPriceDisplay(
    product,
    isFlashDealActive
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {compareAtPrice && (
        <span className={cn("text-xs text-warm-gray line-through", compareClassName)}>
          {compareAtPrice} zl
        </span>
      )}
      <span
        className={cn(
          "font-medium",
          isFlashDealPrice ? "text-destructive" : "text-charcoal",
          currentClassName
        )}
      >
        {currentPrice} zl
      </span>
    </div>
  );
}
