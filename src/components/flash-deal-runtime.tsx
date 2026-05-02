"use client";

import { useEffect } from "react";
import { useFlashDealStore } from "@/components/flash-deal-store";

export function FlashDealRuntime() {
  const initialize = useFlashDealStore((state) => state.initialize);
  const tick = useFlashDealStore((state) => state.tick);

  useEffect(() => {
    initialize();
    tick();

    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [initialize, tick]);

  return null;
}
