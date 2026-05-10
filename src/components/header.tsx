"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  AccountMenuIcon,
  SearchIcon,
  UserIcon,
  CartIcon,
  MenuIcon,
  CloseIcon,
  HeartIcon,
  OrderHistoryMenuIcon,
  SignOutMenuIcon,
} from "./icons";
import { SearchModal } from "./search-modal";
import { MegaMenuNav, MobileMegaMenuContent } from "./mega-menu";
import { useAuth } from "./auth-provider";

const secondaryLinks = [
  { label: "About", href: "/about" },
];

interface HeaderProps {
  onCartOpen?: () => void;
  cartCount?: number;
  wishlistCount?: number;
}

export function Header({ onCartOpen, cartCount = 0, wishlistCount = 0 }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!accountOpen) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setAccountOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [accountOpen]);

  function handleAccountClick() {
    if (!user) {
      router.push("/account/login");
      return;
    }

    setMobileMenuOpen(false);
    setAccountOpen((open) => !open);
  }

  function handleLogout() {
    setAccountOpen(false);
    setMobileMenuOpen(false);
    logout();
    router.push("/");
  }

  function handleMobileMenuLinkClick() {
    setMobileMenuOpen(false);
  }

  function handleAccountMenuLinkClick() {
    setAccountOpen(false);
  }

  const menuItemClass =
    "flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-[13px] text-charcoal/75 transition-colors hover:bg-cream hover:text-charcoal focus:bg-cream focus:text-charcoal focus:outline-none";

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-black/5">
      <nav className="mx-auto flex h-14 items-center px-4 lg:px-8 relative">
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-1 mr-3 cursor-pointer"
          onClick={() => {
            setAccountOpen(false);
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Logo */}
        <Link href="/" className="mr-8 cursor-pointer">
          <span className="text-xl font-semibold italic tracking-tight text-charcoal">
            FashionHero
          </span>
        </Link>

        {/* Desktop nav with mega menu */}
        <MegaMenuNav />

        {/* Right side icons */}
        <div className="flex items-center gap-3 ml-auto">
          {secondaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden lg:block cursor-pointer text-[12px] text-charcoal hover:opacity-60 transition-opacity"
            >
              {link.label}
            </Link>
          ))}
          <button
            aria-label="Search"
            className="p-1 cursor-pointer hover:opacity-60 transition-opacity"
            onClick={() => setSearchOpen(true)}
          >
            <SearchIcon />
          </button>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="hidden sm:block p-1 cursor-pointer hover:opacity-60 transition-opacity relative"
          >
            <HeartIcon className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <div ref={accountMenuRef} className="relative">
            <button
              type="button"
              aria-label="Account"
              aria-expanded={user ? accountOpen : undefined}
              aria-haspopup={user ? "menu" : undefined}
              className="flex p-1 cursor-pointer hover:opacity-60 transition-opacity items-center justify-center"
              onClick={handleAccountClick}
            >
              {user ? (
                <span className="w-5 h-5 rounded-full bg-charcoal text-white text-[11px] font-medium flex items-center justify-center">
                  {user.firstName.charAt(0).toUpperCase()}
                </span>
              ) : (
                <UserIcon />
              )}
            </button>
            {user && accountOpen && (
              <div
                role="menu"
                aria-label="Account menu"
                className="absolute right-0 top-full mt-3 hidden w-48 overflow-hidden rounded border border-black/10 bg-white py-1 shadow-[0_16px_40px_rgba(0,0,0,0.12)] lg:block"
              >
                <Link href="/account" role="menuitem" className={menuItemClass} onClick={handleAccountMenuLinkClick}>
                  <AccountMenuIcon />
                  Account
                </Link>
                {user.role === "user" && (
                  <Link href="/account/orders" role="menuitem" className={menuItemClass} onClick={handleAccountMenuLinkClick}>
                    <OrderHistoryMenuIcon />
                    Order History
                  </Link>
                )}
                <button type="button" role="menuitem" className={menuItemClass} onClick={handleLogout}>
                  <SignOutMenuIcon />
                  Sign out
                </button>
              </div>
            )}
          </div>
          <button
            aria-label="View Cart"
            className="p-1 cursor-pointer hover:opacity-60 transition-opacity relative"
            onClick={onCartOpen}
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-charcoal text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-[80vh]" : "max-h-0"
        )}
      >
        <div className="px-4 py-4 space-y-1 border-t border-black/5">
          <MobileMegaMenuContent onLinkClick={handleMobileMenuLinkClick} />
          {secondaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block cursor-pointer text-sm py-2"
              onClick={handleMobileMenuLinkClick}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile account menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          user && accountOpen ? "max-h-[220px]" : "max-h-0"
        )}
      >
        {user && (
          <div role="menu" aria-label="Account menu" className="px-4 py-4 space-y-1 border-t border-black/5">
            <Link
              href="/account"
              role="menuitem"
              className="flex cursor-pointer items-center gap-2 text-[13px] text-charcoal/70 hover:text-charcoal py-2"
              onClick={handleAccountMenuLinkClick}
            >
              <AccountMenuIcon />
              Account
            </Link>
            {user.role === "user" && (
              <Link
                href="/account/orders"
                role="menuitem"
                className="flex cursor-pointer items-center gap-2 text-[13px] text-charcoal/70 hover:text-charcoal py-2"
                onClick={handleAccountMenuLinkClick}
              >
                <OrderHistoryMenuIcon />
                Order History
              </Link>
            )}
            <button
              type="button"
              role="menuitem"
              className="flex w-full cursor-pointer items-center gap-2 text-left text-[13px] text-charcoal/70 hover:text-charcoal py-2"
              onClick={handleLogout}
            >
              <SignOutMenuIcon />
              Sign out
            </button>
          </div>
        )}
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
