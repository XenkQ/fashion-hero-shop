"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame } from "lucide-react";
import { products } from "@/data/products";
import { formatCountdown } from "@/lib/flash-deals";
import { useFlashDealStore } from "@/components/flash-deal-store";
import { PriceDisplay } from "@/components/price-display";

function hasRealImage(src: string): boolean {
  return src.startsWith("/images/");
}

export function FlashDealCarousel() {
  const remainingSeconds = useFlashDealStore((state) => state.remainingSeconds);
  const isFlashDealActive = useFlashDealStore((state) => state.isFlashDealActive);
  const flashDealProducts = products.filter((product) => product.isFlashDeal);

  if (!isFlashDealActive || remainingSeconds <= 0 || flashDealProducts.length === 0) {
    return null;
  }

  return (
    <section className="bg-charcoal text-white py-8 md:py-10">
      <div className="px-4 md:px-8 lg:px-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.7px] text-white/70">
              <Flame className="h-3.5 w-3.5 text-destructive" aria-hidden="true" />
              Mobile Flash Deals
            </div>
            <h2 className="text-2xl font-normal md:text-[34px]">20% off favorites</h2>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-3 py-2">
            <Clock className="h-4 w-4 text-destructive" aria-hidden="true" />
            <span className="tabular-nums text-sm font-medium">
              {formatCountdown(remainingSeconds)}
            </span>
          </div>
        </div>

        <div className="flex snap-x gap-3 overflow-x-auto pb-1 scrollbar-hide md:gap-4">
          {flashDealProducts.map((product) => {
            const firstColor = product.colors[0];
            const imageSrc = firstColor.image;

            return (
              <Link
                href={`/products/${product.slug}`}
                key={product.id}
                className="min-w-[72vw] snap-start bg-white text-charcoal sm:min-w-[260px] md:min-w-[230px]"
              >
                <div className="relative aspect-square overflow-hidden bg-cream">
                  <span className="absolute left-3 top-3 z-10 bg-destructive px-2 py-1 text-[10px] font-medium uppercase tracking-[0.7px] text-white">
                    20% Off
                  </span>
                  {hasRealImage(imageSrc) ? (
                    <Image
                      src={imageSrc}
                      alt={`${product.name} - ${firstColor.name}`}
                      width={640}
                      height={640}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <div
                        className="h-16 w-28 rounded-[50%]"
                        style={{ backgroundColor: firstColor.hex }}
                      />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="truncate text-[12px] font-medium uppercase tracking-[0.5px]">
                    {product.name}
                  </h3>
                  <p className="mb-2 text-[12px] text-warm-gray">{firstColor.name}</p>
                  <PriceDisplay
                    product={product}
                    currentClassName="text-[15px]"
                    compareClassName="text-[12px]"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
