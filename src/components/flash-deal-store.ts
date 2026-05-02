"use client";

import { create } from "zustand";
import { FLASH_DEAL_DURATION_SECONDS } from "@/lib/flash-deals";

const STORAGE_KEY = "fashionhero-flash-deal-ends-at";

interface FlashDealState {
  endsAt: number | null;
  remainingSeconds: number;
  isFlashDealActive: boolean;
  initialize: () => void;
  tick: () => void;
}

function getRemainingSeconds(endsAt: number | null): number {
  if (!endsAt) return FLASH_DEAL_DURATION_SECONDS;

  return Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
}

function getStoredEndsAt(): number {
  const stored = window.sessionStorage.getItem(STORAGE_KEY);
  const parsed = stored ? Number(stored) : NaN;

  if (Number.isFinite(parsed)) {
    return parsed;
  }

  const nextEndsAt = Date.now() + FLASH_DEAL_DURATION_SECONDS * 1000;
  window.sessionStorage.setItem(STORAGE_KEY, String(nextEndsAt));
  return nextEndsAt;
}

export const useFlashDealStore = create<FlashDealState>((set, get) => ({
  endsAt: null,
  remainingSeconds: 0,
  isFlashDealActive: false,
  initialize: () => {
    if (typeof window === "undefined") return;

    const endsAt = get().endsAt ?? getStoredEndsAt();
    const remainingSeconds = getRemainingSeconds(endsAt);

    set({
      endsAt,
      remainingSeconds,
      isFlashDealActive: remainingSeconds > 0,
    });
  },
  tick: () => {
    const endsAt = get().endsAt;
    const remainingSeconds = getRemainingSeconds(endsAt);

    set({
      remainingSeconds,
      isFlashDealActive: remainingSeconds > 0,
    });
  },
}));
