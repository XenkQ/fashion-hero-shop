"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

interface WishlistContextType {
  wishlistItems: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

const STORAGE_KEY = "stepforward-wishlist";
const WISHLIST_CHANGE_EVENT = "fashionhero-wishlist-change";
const EMPTY_WISHLIST: string[] = [];
let cachedStorageValue: string | null | undefined;
let cachedWishlist: string[] = [];

function getServerWishlistSnapshot(): string[] {
  return EMPTY_WISHLIST;
}

function loadWishlist(): string[] {
  try {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === cachedStorageValue) return cachedWishlist;

    cachedStorageValue = stored;
    cachedWishlist = stored ? JSON.parse(stored) : [];
    return cachedWishlist;
  } catch {
    cachedStorageValue = null;
    cachedWishlist = [];
    return [];
  }
}

function saveWishlist(items: string[]) {
  try {
    cachedWishlist = items;
    cachedStorageValue = JSON.stringify(items);
    localStorage.setItem(STORAGE_KEY, cachedStorageValue);
    window.dispatchEvent(new Event(WISHLIST_CHANGE_EVENT));
  } catch {
    // localStorage unavailable
  }
}

function subscribeToWishlist(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(WISHLIST_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(WISHLIST_CHANGE_EVENT, onStoreChange);
  };
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const wishlistItems = useSyncExternalStore(
    subscribeToWishlist,
    loadWishlist,
    getServerWishlistSnapshot
  );

  const toggleWishlist = useCallback((productId: string) => {
    const next = wishlistItems.includes(productId)
      ? wishlistItems.filter((id) => id !== productId)
      : [...wishlistItems, productId];
    saveWishlist(next);
  }, [wishlistItems]);

  const isWishlisted = useCallback(
    (productId: string) => wishlistItems.includes(productId),
    [wishlistItems]
  );

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}
