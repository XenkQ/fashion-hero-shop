"use client";

import { Clock, Flame } from "lucide-react";
import type { Product } from "@/types";
import { formatCountdown, getFlashDealPrice } from "@/lib/flash-deals";
import { useFlashDealStore } from "@/components/flash-deal-store";

interface FloatingTimerBannerProps {
  product: Product;
  isFlashDealContext?: boolean;
}

export function FloatingTimerBanner({ product, isFlashDealContext = false }: FloatingTimerBannerProps) {
  const remainingSeconds = useFlashDealStore((state) => state.remainingSeconds);
  const isFlashDealActive = useFlashDealStore((state) => state.isFlashDealActive);

  if (!product.isFlashDeal || !isFlashDealContext || !isFlashDealActive || remainingSeconds <= 0) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-charcoal text-white shadow-[0_-8px_24px_rgba(0,0,0,0.18)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.7px] text-white/70">
            <Flame className="h-3.5 w-3.5 text-destructive" aria-hidden="true" />
            Flash Deal
          </div>
          <p className="truncate text-sm font-medium">
            20% off now:{" "}
            <span className="text-white/60 line-through">{product.price} zl</span>{" "}
            <span className="text-destructive">{getFlashDealPrice(product.price)} zl</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-3 py-2">
          <Clock className="h-4 w-4 text-destructive" aria-hidden="true" />
          <span className="tabular-nums text-sm font-medium">
            {formatCountdown(remainingSeconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
