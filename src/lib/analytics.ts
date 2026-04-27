"use client";

type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

interface PostHogClient {
  capture: (eventName: string, properties?: AnalyticsProperties) => void;
}

declare global {
  interface Window {
    posthog?: PostHogClient;
  }
}

export function trackEvent(eventName: string, properties: AnalyticsProperties = {}) {
  if (typeof window === "undefined") return;

  window.posthog?.capture(eventName, properties);

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", eventName, properties);
  }
}
