"use client";

import { useCookieConsent } from "./posthog-provider";

export function CookieSettingsButton() {
  const { openSettings } = useCookieConsent();

  return (
    <button
      type="button"
      className="text-xs text-white/40 transition-colors hover:text-white focus-visible:ring-3 focus-visible:ring-white/30 focus-visible:outline-none"
      onClick={openSettings}
    >
      Cookie settings
    </button>
  );
}
