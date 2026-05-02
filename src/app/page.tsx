import { HeroCarousel } from "@/components/sections/hero-carousel";
import { CategoryRow } from "@/components/sections/category-row";
import { ProductCarousel } from "@/components/sections/product-carousel";
import { FeatureStory } from "@/components/sections/feature-story";
import { PromoTiles } from "@/components/sections/promo-tiles";
import { ValueProps } from "@/components/sections/value-props";
import { FlashDealCarousel } from "@/components/flash-deal-carousel";

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />
      <CategoryRow />
      <FlashDealCarousel />
      <ProductCarousel />
      <FeatureStory />
      <PromoTiles />
      <ValueProps />
    </main>
  );
}
