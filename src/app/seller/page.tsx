"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";

const dashboardStats = [
  { label: "Live listings", value: "128" },
  { label: "Orders this month", value: "342" },
  { label: "Store rating", value: "4.8" },
];

export default function SellerPage() {
  const { user } = useAuth();
  const router = useRouter();

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

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <nav className="text-[11px] text-warm-gray mb-8 tracking-wide">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-charcoal">Seller Panel</span>
      </nav>

      <div className="mb-10">
        <p className="text-[11px] font-medium uppercase tracking-[1px] text-warm-gray mb-3">
          Seller Dashboard
        </p>
        <h1 className="text-2xl md:text-3xl font-light text-charcoal mb-2">
          Welcome back, {user.firstName}
        </h1>
        <p className="text-[13px] text-warm-gray max-w-2xl">
          Track store health, recent activity, and marketplace visibility from one seller entry point.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-3 mb-10">
        {dashboardStats.map((stat) => (
          <div key={stat.label} className="border border-black/10 rounded p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-warm-gray mb-2">
              {stat.label}
            </p>
            <p className="text-2xl font-light text-charcoal">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="border border-black/10 rounded p-6">
        <h2 className="text-[12px] font-medium uppercase tracking-[0.8px] text-charcoal mb-3">
          Seller tools
        </h2>
        <p className="text-[13px] leading-relaxed text-charcoal/75">
          Product management, promotions, and seller growth tools are intentionally outside this demo slice.
          This page confirms role-aware navigation and provides a dashboard placeholder for future seller work.
        </p>
      </section>
    </div>
  );
}
