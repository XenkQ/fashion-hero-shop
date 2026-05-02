import type { Product } from "@/types";

export const FLASH_DEAL_DISCOUNT_RATE = 0.2;
export const FLASH_DEAL_DURATION_SECONDS = 15 * 60;

export function formatCountdown(totalSeconds: number): string {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function getFlashDealPrice(price: number): number {
  return Math.round(price * (1 - FLASH_DEAL_DISCOUNT_RATE));
}

export function getEffectiveProductPrice(product: Product, applyFlashDeal: boolean): number {
  if (!product.isFlashDeal || !applyFlashDeal) {
    return product.price;
  }

  return getFlashDealPrice(product.price);
}

export function getProductPriceDisplay(product: Product, applyFlashDeal: boolean) {
  const isFlashDealPrice = Boolean(product.isFlashDeal && applyFlashDeal);

  return {
    isFlashDealPrice,
    currentPrice: isFlashDealPrice ? getFlashDealPrice(product.price) : product.price,
    compareAtPrice: isFlashDealPrice ? product.price : product.originalPrice,
  };
}
