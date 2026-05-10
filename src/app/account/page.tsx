"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/account/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <nav className="text-[11px] text-warm-gray mb-8 tracking-wide">
        <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-charcoal">Account</span>
      </nav>

      <h1 className="text-2xl font-light text-charcoal mb-2">
        Hello, {user.firstName}
      </h1>
      <p className="text-[13px] text-warm-gray mb-10">
        Welcome back to your FashionHero account.
      </p>

      {/* Account Details */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-black/10">
          <h2 className="text-[12px] font-medium uppercase tracking-[0.8px] text-charcoal">
            Account Details
          </h2>
          <button className="text-[11px] text-warm-gray underline hover:text-charcoal transition-colors">
            Edit
          </button>
        </div>
        <div className="space-y-1.5 text-[13px] text-charcoal/80">
          <p>{user.firstName} {user.lastName}</p>
          <p>{user.email}</p>
        </div>
      </section>

      {/* Saved Addresses */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-black/10">
          <h2 className="text-[12px] font-medium uppercase tracking-[0.8px] text-charcoal">
            Saved Addresses
          </h2>
          <button className="text-[11px] text-warm-gray underline hover:text-charcoal transition-colors">
            Add Address
          </button>
        </div>
        <div className="text-[13px] text-charcoal/80 space-y-0.5">
          <p className="font-medium text-charcoal">{user.firstName} {user.lastName}</p>
          <p>123 Sustainable Ave</p>
          <p>San Francisco, CA 94110</p>
          <p>United States</p>
        </div>
      </section>
    </div>
  );
}
