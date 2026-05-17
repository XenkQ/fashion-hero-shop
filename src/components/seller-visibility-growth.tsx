"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { Check, Sparkles } from "lucide-react";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/icons";
import { useAuth } from "@/components/auth-provider";
import { useCookieConsent } from "@/components/posthog-provider";
import { cn } from "@/lib/utils";

interface GrowthPackage {
  name: string;
  price: number;
  audience: string;
  includes: string[];
}

const growthPackages: GrowthPackage[] = [
  {
    name: "Debut",
    price: 299,
    audience: "A seller who wants to test additional visibility of their offers with minimal investment risk.",
    includes: [
      "Promote up to 3 products",
      "Basic report",
      "Basic offer recommendations",
    ],
  },
  {
    name: "Trendsetter",
    price: 599,
    audience: "An active seller who wants to increase sales of specific products through offer optimization and analytics.",
    includes: [
      "Everything in the Debut package",
      "Promote up to 6 products",
      "ROAS, clicks and orders report",
      "Description and image recommendations",
      "Basic price benchmarks",
    ],
  },
  {
    name: "Category Leader",
    price: 999,
    audience: "A seller who treats FashionHero as a key growth channel and expects priority exposure and full analytics.",
    includes: [
      "Everything in the Trendsetter package",
      "Promote up to 9 products",
      "Priority exposure in controlled slots",
      "Comprehensive incrementality report",
      "Price, category and offer recommendations",
    ],
  },
];

function PackageCard({
  pack,
  highlighted = false,
  onSelect,
}: {
  pack: GrowthPackage;
  highlighted?: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      className={cn(
        "flex min-h-[430px] flex-col rounded border bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.05)]",
        highlighted ? "border-charcoal" : "border-black/10"
      )}
    >
      <div className="mb-6">
        {highlighted && (
          <p className="mb-3 inline-flex items-center gap-1 rounded-full bg-charcoal px-3 py-1 text-[10px] font-medium uppercase tracking-[0.8px] text-white">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            Priority
          </p>
        )}
        <h2 className="text-xl font-light text-charcoal">{pack.name}</h2>
        <p className="mt-3 text-3xl font-light text-charcoal">
          {pack.price} <span className="text-sm font-normal text-warm-gray">PLN</span>
        </p>
        <p className="mt-4 text-[13px] leading-relaxed text-charcoal/70">
          {pack.audience}
        </p>
      </div>

      <div className="mb-8 text-[13px] text-charcoal/80">
        <div>
          <h3 className="mb-3 text-[11px] font-medium uppercase tracking-[0.8px] text-warm-gray">
            What&apos;s included
          </h3>
          <ul className="space-y-2.5">
            {pack.includes.map((feature) => (
              <li key={feature} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-charcoal" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        className="btn-cta mt-auto w-full cursor-pointer"
        onClick={onSelect}
      >
        Select
      </button>
    </article>
  );
}

function InterestModal({
  selectedOption,
  onClose,
}: {
  selectedOption: string;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/45 px-4 py-5 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="visibility-interest-title"
    >
      <div className="w-full max-w-md rounded bg-white p-6 shadow-[0_22px_70px_rgba(0,0,0,0.28)]">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.9px] text-warm-gray">
              {selectedOption}
            </p>
            <h2 id="visibility-interest-title" className="text-xl font-light text-charcoal">
              Thank you for your interest
            </h2>
          </div>
          <button
            type="button"
            className="cursor-pointer rounded-full p-1 text-charcoal/60 transition-colors hover:bg-cream hover:text-charcoal focus:bg-cream focus:text-charcoal focus:outline-none"
            onClick={onClose}
            aria-label="Close notification"
          >
            <CloseIcon />
          </button>
        </div>
        <p className="text-[14px] leading-relaxed text-charcoal/75">
          We are exploring interest in Growth Starter packages. We will notify you soon
          when visibility configuration is available in your seller dashboard.
        </p>
        <button type="button" className="btn-cta mt-7 w-full cursor-pointer" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export function SellerVisibilityGrowth() {
  const { user } = useAuth();
  const { consent } = useCookieConsent();
  const posthog = usePostHog();
  const router = useRouter();
  const [activePackageIndex, setActivePackageIndex] = useState(2);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const captureGrowthVasInterest = useCallback(
    ({
      selectionType,
      packageName,
      pricePln,
    }: {
      selectionType: "package" | "manual";
      packageName: string | null;
      pricePln: number | null;
    }) => {
      if (consent?.status !== "accepted" || !posthog.__loaded || !user) return;

      posthog.capture("growth_vas_interest_submitted", {
        source: "seller_visibility",
        selection_type: selectionType,
        package_name: packageName,
        price_pln: pricePln,
        role: user.role,
        viewport: window.matchMedia("(min-width: 768px)").matches ? "desktop" : "mobile",
      });
    },
    [consent?.status, posthog, user],
  );

  const handlePackageSelect = useCallback(
    (pack: GrowthPackage) => {
      captureGrowthVasInterest({
        selectionType: "package",
        packageName: pack.name,
        pricePln: pack.price,
      });

      setSelectedOption(`Package ${pack.name}`);
    },
    [captureGrowthVasInterest],
  );

  const handleManualConfigurationSelect = useCallback(() => {
    captureGrowthVasInterest({
      selectionType: "manual",
      packageName: null,
      pricePln: null,
    });

    setSelectedOption("Manual configuration");
  }, [captureGrowthVasInterest]);

  useEffect(() => {
    if (!user) {
      router.push("/account/login");
      return;
    }

    if (user.role !== "seller") {
      router.push("/account");
    }
  }, [user, router]);

  if (!user || user.role !== "seller") return null;

  const activePackage = growthPackages[activePackageIndex];
  const canGoLeft = activePackageIndex > 0;
  const canGoRight = activePackageIndex < growthPackages.length - 1;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <nav className="mb-8 text-[11px] tracking-wide text-warm-gray">
        <Link href="/" className="transition-colors hover:text-charcoal">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/seller" className="transition-colors hover:text-charcoal">Seller Dashboard</Link>
        <span className="mx-1.5">/</span>
        <span className="text-charcoal">Visibility</span>
      </nav>

      <header className="mb-10 max-w-3xl">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[1px] text-warm-gray">
          Growth Starter
        </p>
        <h1 className="text-3xl font-light text-charcoal md:text-4xl">
          Make your products visible
        </h1>
        <p className="mt-4 text-[14px] leading-relaxed text-charcoal/70 md:text-[15px]">
          Choose a visibility package for products that should reach buyers faster.
        </p>
      </header>

      <section aria-label="Growth Starter Packages">
        <div className="hidden gap-4 md:grid md:grid-cols-3">
          {growthPackages.map((pack) => (
            <PackageCard
              key={pack.name}
              pack={pack}
              highlighted={pack.price === 999}
              onSelect={() => handlePackageSelect(pack)}
            />
          ))}
        </div>

        <div className="md:hidden">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/15 bg-white text-charcoal transition-colors enabled:hover:bg-cream disabled:cursor-not-allowed disabled:opacity-35"
              onClick={() => setActivePackageIndex((index) => Math.max(0, index - 1))}
              disabled={!canGoLeft}
              aria-label="Show cheaper package"
            >
              <ChevronLeftIcon />
            </button>
            <p className="text-[12px] font-medium uppercase tracking-[0.8px] text-warm-gray">
              {activePackage.price} PLN
            </p>
            <button
              type="button"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/15 bg-white text-charcoal transition-colors enabled:hover:bg-cream disabled:cursor-not-allowed disabled:opacity-35"
              onClick={() => setActivePackageIndex((index) => Math.min(growthPackages.length - 1, index + 1))}
              disabled={!canGoRight}
              aria-label="Show more expensive package"
            >
              <ChevronRightIcon />
            </button>
          </div>
          <PackageCard
            pack={activePackage}
            highlighted={activePackage.price === 999}
            onSelect={() => handlePackageSelect(activePackage)}
          />
        </div>
      </section>

      <div className="my-10 flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-black/10" />
        <span className="text-[12px] uppercase tracking-[0.8px] text-warm-gray">or</span>
        <span className="h-px flex-1 bg-black/10" />
      </div>

      <section className="rounded border border-black/10 bg-white p-6 md:flex md:items-start md:justify-between md:gap-8">
        <div className="max-w-2xl">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.9px] text-warm-gray">
            Full control
          </p>
          <h2 className="text-xl font-light text-charcoal">Configure manually</h2>
          <p className="mt-3 text-[13px] leading-relaxed text-charcoal/70">
            For sellers who prefer independent selection of promoted products,
            full control over the scope of visibility, and a flexible pace of growth activities.
          </p>
          <ul className="mt-5 grid gap-2.5 text-[13px] text-charcoal/80 sm:grid-cols-2">
            {[
              "Number of promoted products",
              "Exposure level and controlled slots",
              "Report scope: clicks, orders, ROAS and incrementality",
              "Offer, description, image, price and category recommendations",
              "Price benchmarks",
            ].map((feature) => (
              <li key={feature} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-charcoal" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="btn-cta mt-6 w-full cursor-pointer md:mt-0 md:w-auto"
          onClick={handleManualConfigurationSelect}
        >
          Select
        </button>
      </section>

      {selectedOption && (
        <InterestModal
          selectedOption={selectedOption}
          onClose={() => setSelectedOption(null)}
        />
      )}
    </div>
  );
}
