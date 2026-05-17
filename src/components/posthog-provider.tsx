"use client";

import { Button } from "@/components/ui/button";
import { CloseIcon } from "@/components/icons";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

export type AnalyticsConsent = "accepted" | "rejected";

interface CookieConsentRecord {
  status: AnalyticsConsent;
  version: 1;
  updatedAt: string;
}

interface CookieConsentContextValue {
  consent: CookieConsentRecord | null;
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  saveConsent: (status: AnalyticsConsent) => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

const CONSENT_STORAGE_KEY = "fashionhero_cookie_consent_v1";
const CONSENT_CHANGE_EVENT = "fashionhero-cookie-consent-change";
const CONSENT_VERSION = 1;
const POSTHOG_HOST_LABEL = process.env.NEXT_PUBLIC_POSTHOG_HOST || "the configured PostHog host";
let cachedConsentStorageValue: string | null | undefined;
let cachedConsent: CookieConsentRecord | null = null;

function normalizeConsentRecord(value: unknown): CookieConsentRecord | null {
  if (!value || typeof value !== "object") return null;

  const record = value as Partial<CookieConsentRecord>;
  if (record.version !== CONSENT_VERSION) return null;
  if (record.status !== "accepted" && record.status !== "rejected") return null;
  if (typeof record.updatedAt !== "string") return null;

  return {
    status: record.status,
    version: CONSENT_VERSION,
    updatedAt: record.updatedAt,
  };
}

function getStoredConsent(): CookieConsentRecord | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === cachedConsentStorageValue) {
      return cachedConsent;
    }

    cachedConsentStorageValue = stored;
    if (!stored) {
      cachedConsent = null;
      return cachedConsent;
    }

    cachedConsent = normalizeConsentRecord(JSON.parse(stored));
    return cachedConsent;
  } catch {
    cachedConsentStorageValue = null;
    cachedConsent = null;
    return null;
  }
}

function subscribeToConsentStore(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CONSENT_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
  };
}

function emitConsentChange() {
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

function persistConsent(status: AnalyticsConsent) {
  const record: CookieConsentRecord = {
    status,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };
  const serialized = JSON.stringify(record);

  cachedConsent = record;
  cachedConsentStorageValue = serialized;
  localStorage.setItem(CONSENT_STORAGE_KEY, serialized);
  emitConsentChange();
}

function isLocalhost() {
  const hostname = window.location.hostname.toLowerCase();
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

function ensurePostHogInitialized() {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!posthogKey || isLocalhost()) {
    removePostHogPersistence();
    return false;
  }

  if (!posthog.__loaded) {
    const posthogConfig = {
      defaults: "2026-01-30",
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false,
      capture_pageleave: true,
      autocapture: true,
      rageclick: true,
      capture_dead_clicks: true,
      capture_copied_text: false,
      enable_recording_console_log: false,
      person_profiles: "identified_only",
      mask_all_text: true,
      mask_all_element_attributes: true,
    } as const;

    posthog.init(posthogKey, posthogConfig);
  }

  return true;
}

function removePostHogPersistence() {
  try {
    for (let index = localStorage.length - 1; index >= 0; index -= 1) {
      const key = localStorage.key(index);
      if (key?.startsWith("ph_") || key?.startsWith("__ph_opt_in_out_")) {
        localStorage.removeItem(key);
      }
    }
  } catch {
    // Ignore storage access failures in private or restricted browsing modes.
  }

  try {
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0]?.trim();
      if (!name || (!name.startsWith("ph_") && !name.startsWith("__ph_opt_in_out_"))) {
        return;
      }

      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}`;
      const parts = window.location.hostname.split(".");
      if (parts.length > 2) {
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.${parts.slice(-2).join(".")}`;
      }
    });
  } catch {
    // Cookie cleanup is best-effort because browser/domain rules vary.
  }
}

function disablePostHogPersistence() {
  if (posthog.__loaded) {
    posthog.opt_out_capturing();
    posthog.set_config({ persistence: "memory" });
    posthog.reset();
  }

  removePostHogPersistence();
}

function PostHogPageView({ consentStatus }: { consentStatus: AnalyticsConsent | null }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();

  useEffect(() => {
    if (consentStatus !== "accepted" || !pathname || !ph) return;
    if (!ensurePostHogInitialized()) return;

    ph.capture("$pageview", { $current_url: window.location.href });
  }, [consentStatus, pathname, searchParams, ph]);

  return null;
}

function CookieConsentBanner() {
  const { consent, openSettings, saveConsent } = useCookieConsent();

  if (consent) return null;

  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-5xl rounded-lg border border-border bg-white p-4 shadow-2xl sm:inset-x-6 sm:bottom-6 sm:p-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <p className="max-w-3xl text-sm leading-6 text-charcoal">
          We use PostHog analytics to understand how visitors use FashionHero, improve the shopping experience,
          measure feature performance, and, if enabled, review session replays. With your consent, PostHog may store
          analytics cookies/local storage and collect page views, interactions, device/browser information, and feature
          usage. You can accept, reject, or change your choice anytime.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">
          <Button size="lg" className="h-10 rounded-full px-5" onClick={() => saveConsent("accepted")}>
            Accept analytics
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-10 rounded-full border-charcoal px-5"
            onClick={() => saveConsent("rejected")}
          >
            Reject
          </Button>
          <Button size="lg" variant="ghost" className="h-10 rounded-full px-5" onClick={openSettings}>
            Manage preferences
          </Button>
        </div>
      </div>
    </section>
  );
}

function CookieSettingsModal() {
  const { closeSettings, consent, saveConsent } = useCookieConsent();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(consent?.status !== "rejected");

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/45 px-4 py-4 sm:items-center">
      <section
        aria-labelledby="cookie-settings-title"
        aria-modal="true"
        role="dialog"
        className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="cookie-settings-title" className="text-xl font-semibold tracking-tight text-charcoal">
              Cookie settings
            </h2>
            <p className="mt-2 text-sm leading-6 text-warm-gray">
              Choose whether FashionHero can use PostHog analytics. Essential storefront behavior does not depend on
              this choice.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close cookie settings"
            className="grid size-9 shrink-0 place-items-center rounded-full text-warm-gray transition-colors hover:bg-cream-light hover:text-charcoal focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            onClick={closeSettings}
          >
            <CloseIcon className="size-4" />
          </button>
        </div>

        <div className="mt-6 rounded-lg border border-border p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-medium text-charcoal">Analytics</h3>
              <p className="mt-1 text-sm leading-6 text-warm-gray">
                Covers PostHog pageviews, interactions, feature flags, and session replay if enabled in PostHog.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={analyticsEnabled}
              className="relative h-7 w-12 shrink-0 rounded-full bg-muted transition-colors aria-checked:bg-charcoal focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              onClick={() => setAnalyticsEnabled((enabled) => !enabled)}
            >
              <span className="sr-only">Analytics</span>
              <span
                className={`absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform ${
                  analyticsEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-3 text-sm leading-6 text-warm-gray">
          <p>Vendor: PostHog EU Cloud via {POSTHOG_HOST_LABEL}.</p>
          <p>
            Purpose: product analytics, feature performance, behavior analysis, and session replay if enabled.
          </p>
          <p>
            Storage after consent: PostHog may use <code>ph_&lt;project_api_key&gt;_posthog</code>, localStorage,
            device/session IDs, feature flag state, and event queues.
          </p>
          <p>Retention: PostHog default cookie expiry is 365 days unless the project configuration changes.</p>
          <p>You can withdraw consent anytime by reopening these settings and turning analytics off.</p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" className="h-10 rounded-full border-charcoal px-5" onClick={closeSettings}>
            Cancel
          </Button>
          <Button
            className="h-10 rounded-full px-5"
            onClick={() => saveConsent(analyticsEnabled ? "accepted" : "rejected")}
          >
            Save preferences
          </Button>
        </div>
      </section>
    </div>
  );
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const consent = useSyncExternalStore(subscribeToConsentStore, getStoredConsent, () => null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const openSettings = useCallback(() => setIsSettingsOpen(true), []);
  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);
  const saveConsent = useCallback((status: AnalyticsConsent) => {
    persistConsent(status);
    if (status === "rejected") {
      disablePostHogPersistence();
    }
    setIsSettingsOpen(false);
  }, []);

  useEffect(() => {
    if (consent?.status !== "accepted") {
      if (consent?.status === "rejected") {
        disablePostHogPersistence();
      }
      return;
    }

    ensurePostHogInitialized();
  }, [consent]);

  const contextValue = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      isSettingsOpen,
      openSettings,
      closeSettings,
      saveConsent,
    }),
    [closeSettings, consent, isSettingsOpen, openSettings, saveConsent],
  );

  return (
    <CookieConsentContext.Provider value={contextValue}>
      <PHProvider client={posthog}>
        <Suspense fallback={null}>
          <PostHogPageView consentStatus={consent?.status ?? null} />
        </Suspense>
        {children}
        <CookieConsentBanner />
        {isSettingsOpen ? <CookieSettingsModal /> : null}
      </PHProvider>
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within PostHogProvider");
  return ctx;
}
