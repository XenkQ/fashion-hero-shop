"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CreditCard, ShieldCheck, Smartphone, ShoppingBag, Wallet, X } from "lucide-react";
import type { Product, ProductColor } from "@/types";
import {
  type BuyNowPaymentMethod,
  getBuyNowAnalyticsPayload,
  isBuyNowEligible,
} from "@/lib/buy-now-experiment";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface BuyNowExperimentProps {
  product: Product;
  selectedColor: ProductColor;
  selectedSize: number | null;
  onAddToCartFallback: () => void;
}

const paymentMethods: {
  id: BuyNowPaymentMethod;
  label: string;
  detail: string;
  icon: typeof Smartphone;
}[] = [
  { id: "blik", label: "BLIK", detail: "Bank app or one-time code", icon: Smartphone },
  { id: "google_pay", label: "Google Pay", detail: "Fast mobile wallet checkout", icon: CreditCard },
  { id: "apple_pay", label: "Apple Pay", detail: "Apple Wallet checkout", icon: CreditCard },
];

export function BuyNowExperiment({
  product,
  selectedColor,
  selectedSize,
  onAddToCartFallback,
}: BuyNowExperimentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<BuyNowPaymentMethod | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [blikCode, setBlikCode] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const exposedProductIdRef = useRef<string | null>(null);
  const eligible = isBuyNowEligible(product);
  const canShowBuyNow = eligible && selectedSize !== null;
  const basePayload = useMemo(
    () => getBuyNowAnalyticsPayload(product, selectedColor, selectedSize),
    [product, selectedColor, selectedSize]
  );

  const closeOverlay = useCallback(() => {
    trackEvent("buy_now_overlay_closed", {
      ...basePayload,
      payment_method: selectedMethod,
    });
    setIsOpen(false);
  }, [basePayload, selectedMethod]);

  useEffect(() => {
    if (!canShowBuyNow) return;
    if (exposedProductIdRef.current === product.id) return;
    exposedProductIdRef.current = product.id;
    trackEvent("buy_now_experiment_exposed", basePayload);
  }, [basePayload, canShowBuyNow, product.id]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeOverlay();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [closeOverlay, isOpen]);

  if (!canShowBuyNow) return null;

  function openOverlay() {
    trackEvent("buy_now_button_clicked", basePayload);
    trackEvent("buy_now_overlay_opened", basePayload);
    setSelectedMethod(null);
    setIsConfirmed(false);
    setBlikCode("");
    setIsOpen(true);
  }

  function selectPaymentMethod(method: BuyNowPaymentMethod) {
    setSelectedMethod(method);
    trackEvent("buy_now_payment_method_selected", {
      ...basePayload,
      payment_method: method,
    });
  }

  function confirmPaymentIntent() {
    if (!selectedMethod) return;
    trackEvent("buy_now_fake_success_shown", {
      ...basePayload,
      payment_method: selectedMethod,
    });
    setIsConfirmed(true);
  }

  function handleFallback() {
    trackEvent("buy_now_add_to_cart_fallback_clicked", {
      ...basePayload,
      payment_method: selectedMethod,
    });
    setIsOpen(false);
    onAddToCartFallback();
  }

  return (
    <>
      <button
        type="button"
        onClick={openOverlay}
        className={cn(
          "md:hidden w-full py-4 bg-amber-500 text-white text-[12px] font-medium uppercase tracking-[0.6px] rounded-full hover:bg-charcoal-light transition-colors"
        )}
      >
        {`BUY NOW - ${product.price} zl`}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            aria-label="Close buy now overlay"
            onClick={closeOverlay}
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="buy-now-title"
            tabIndex={-1}
            className="relative z-10 w-full bg-white p-5 outline-none md:max-w-md md:rounded-lg"
          >
            <button
              type="button"
              onClick={closeOverlay}
              className="absolute right-4 top-4 p-1 text-charcoal/70 hover:text-charcoal"
              aria-label="Close buy now overlay"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="pr-9">
              <p className="text-[10px] font-medium uppercase tracking-[0.8px] text-warm-gray">
                Express checkout
              </p>
              <h2 id="buy-now-title" className="mt-1 text-xl font-normal text-charcoal">
                Choose payment method
              </h2>
              <p className="mt-2 text-sm leading-5 text-warm-gray">
                {product.name}, size {selectedSize}, {selectedColor.name}.
              </p>
            </div>

            {!selectedMethod && (
              <div className="mt-5 flex flex-col gap-2">
                {paymentMethods.map(({ id, label, detail, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => selectPaymentMethod(id)}
                    className="flex w-full items-center gap-3 rounded-lg border border-border px-4 py-3 text-left hover:border-charcoal hover:bg-cream transition-colors"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium uppercase tracking-[0.5px] text-charcoal">
                        {label}
                      </span>
                      <span className="block text-xs text-warm-gray">{detail}</span>
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.6px] text-warm-gray">
                      Select
                    </span>
                  </button>
                ))}
              </div>
            )}

            {selectedMethod && !isConfirmed && (
              <div className="mt-5 overflow-hidden rounded-lg border border-border">
                <div className="flex items-center justify-between border-b border-border bg-cream px-4 py-3">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.7px] text-warm-gray">
                      Express payment
                    </p>
                    <p className="text-sm font-medium text-charcoal">
                      {paymentMethods.find((method) => method.id === selectedMethod)?.label}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal text-white">
                    {selectedMethod === "blik" ? (
                      <Smartphone className="h-5 w-5" />
                    ) : (
                      <Wallet className="h-5 w-5" />
                    )}
                  </span>
                </div>

                <div className="space-y-4 p-4">
                  <div className="flex items-start justify-between gap-4 text-sm">
                    <div>
                      <p className="font-medium text-charcoal">{product.name}</p>
                      <p className="mt-0.5 text-xs text-warm-gray">
                        Size {selectedSize}, {selectedColor.name}
                      </p>
                    </div>
                    <p className="shrink-0 font-medium text-charcoal">{product.price} zl</p>
                  </div>

                  {selectedMethod === "blik" ? (
                    <label className="block">
                      <span className="text-[11px] font-medium uppercase tracking-[0.7px] text-charcoal">
                        BLIK code
                      </span>
                      <input
                        value={blikCode}
                        onChange={(event) => setBlikCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="000000"
                        className="mt-2 w-full rounded-lg border border-border px-4 py-3 text-center text-2xl font-medium tracking-[0.4em] text-charcoal outline-none focus:border-charcoal"
                      />
                    </label>
                  ) : (
                    <div className="rounded-lg border border-border bg-white p-4">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="h-5 w-5 text-charcoal" />
                        <div>
                          <p className="text-sm font-medium text-charcoal">Ready to confirm</p>
                          <p className="text-xs text-warm-gray">
                            This simulates the wallet authorization step.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="text-xs leading-5 text-warm-gray">
                    Test mode: no payment will be charged and no order will be sent to the seller.
                  </p>

                  <button
                    type="button"
                    onClick={confirmPaymentIntent}
                    disabled={selectedMethod === "blik" && blikCode.length !== 6}
                    className="w-full rounded-full bg-charcoal px-5 py-3 text-[12px] font-medium uppercase tracking-[0.6px] text-white hover:bg-charcoal-light disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Confirm test checkout
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMethod(null);
                      setBlikCode("");
                    }}
                    className="w-full rounded-full border border-border px-5 py-3 text-[12px] font-medium uppercase tracking-[0.6px] text-charcoal hover:border-charcoal"
                  >
                    Change payment method
                  </button>
                </div>
              </div>
            )}

            {isConfirmed && (
              <div className="mt-5 rounded-lg border border-border bg-cream p-4">
                <p className="text-[12px] font-medium uppercase tracking-[0.6px] text-charcoal">
                  Thanks for your interest
                </p>
                <p className="mt-2 text-sm leading-5 text-warm-gray">
                  This is a test of faster checkout demand. The product was not purchased, no payment was
                  charged, and the seller did not receive an order.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleFallback}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-charcoal px-5 py-3 text-[12px] font-medium uppercase tracking-[0.6px] text-white hover:bg-charcoal-light"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add to cart
                  </button>
                  <button
                    type="button"
                    onClick={closeOverlay}
                    className="w-full rounded-full border border-border px-5 py-3 text-[12px] font-medium uppercase tracking-[0.6px] text-charcoal hover:border-charcoal"
                  >
                    Back to product
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
