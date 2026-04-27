import type { Product, ProductColor } from "@/types";

export const BUY_NOW_PRICE_THRESHOLD_PLN = 150;
export const BUY_NOW_EXPERIMENT_VARIANT = "fake-door-v1";

export type BuyNowPaymentMethod = "blik" | "google_pay" | "apple_pay";

export function isBuyNowEligible(product: Product) {
  return product.price >= BUY_NOW_PRICE_THRESHOLD_PLN;
}

export function getBuyNowAnalyticsPayload(
  product: Product,
  selectedColor: ProductColor,
  selectedSize: number | null
) {
  return {
    experiment_variant: BUY_NOW_EXPERIMENT_VARIANT,
    product_id: product.id,
    product_price: product.price,
    seller_id: product.sellerId,
    category: product.category,
    product_category: product.productCategory,
    selected_color: selectedColor.name,
    selected_size: selectedSize,
    price_threshold_pln: BUY_NOW_PRICE_THRESHOLD_PLN,
    platform: "mobile_web",
  };
}
