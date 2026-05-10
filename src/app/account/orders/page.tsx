"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";

const mockOrders = [
  { id: "SF-10042", date: "March 15, 2026", status: "Delivered", total: 592 },
  { id: "SF-10038", date: "February 22, 2026", status: "Delivered", total: 940 },
  { id: "SF-10031", date: "January 8, 2026", status: "Delivered", total: 480 },
];

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/account/login");
      return;
    }

    if (user.role !== "user") {
      router.push("/seller");
    }
  }, [user, router]);

  if (!user || user.role !== "user") return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <nav className="text-[11px] text-warm-gray mb-8 tracking-wide">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <span className="mx-1.5">/</span>
        <Link href="/account" className="hover:text-charcoal transition-colors">Account</Link>
        <span className="mx-1.5">/</span>
        <span className="text-charcoal">Order History</span>
      </nav>

      <h1 className="text-2xl font-light text-charcoal mb-2">Order History</h1>
      <p className="text-[13px] text-warm-gray mb-10">
        Review recent FashionHero marketplace orders.
      </p>

      <section>
        <h2 className="text-[12px] font-medium uppercase tracking-[0.8px] text-charcoal mb-4 pb-2 border-b border-black/10">
          Recent Orders
        </h2>
        <div className="space-y-3">
          {mockOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between py-3 border-b border-black/5">
              <div>
                <p className="text-[13px] font-medium text-charcoal">{order.id}</p>
                <p className="text-[12px] text-warm-gray">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-medium text-charcoal">{order.total.toFixed(0)} zl</p>
                <p className="text-[11px] text-green-700 font-medium">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
