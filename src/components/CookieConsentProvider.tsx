'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { tools } from "./CookieConsentLogos";

const CONSENT_KEY = "afungi_cookie_consent";
const GA_ID = "G-01VLT28STB";
const META_PIXEL_ID = "3536806596455673";

interface ConsentContextType {
  consents: Record<string, boolean>;
  bannerOpen: boolean;
  hydrated: boolean;
  toggleConsent: (name: string) => void;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: () => void;
  openBanner: () => void;
  closeBanner: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within a CookieConsentProvider");
  }
  return ctx;
}

function loadGoogleAnalytics() {
  if (typeof window === "undefined" || (window as any).gtagLoaded) return;
  (window as any).gtagLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  const inline = document.createElement("script");
  inline.text = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `;
  document.head.appendChild(inline);
}

function loadMetaPixel() {
  if (typeof window === "undefined" || (window as any).fbqLoaded) return;
  (window as any).fbqLoaded = true;

  const script = document.createElement("script");
  script.text = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);
}

function defaultConsents(): Record<string, boolean> {
  const map: Record<string, boolean> = {};
  for (const tool of tools) {
    map[tool.name] = tool.necessary;
  }
  return map;
}

function allConsents(): Record<string, boolean> {
  const map: Record<string, boolean> = {};
  for (const tool of tools) {
    map[tool.name] = true;
  }
  return map;
}

function applyConsents(consents: Record<string, boolean>) {
  if (consents["Google Analytics"]) loadGoogleAnalytics();
  if (consents["Meta Pixel"]) loadMetaPixel();
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [consents, setConsents] = useState<Record<string, boolean>>(defaultConsents);

  useEffect(() => {
    setHydrated(true);
    const stored = localStorage.getItem(CONSENT_KEY);
    let parsed: Record<string, boolean>;

    if (stored) {
      if (stored === "accepted") {
        parsed = allConsents();
      } else if (stored === "rejected") {
        parsed = defaultConsents();
      } else {
        try {
          parsed = JSON.parse(stored);
        } catch {
          parsed = defaultConsents();
        }
      }
      setConsents(parsed);
      applyConsents(parsed);
      return;
    }

    if ((navigator as any).globalPrivacyControl) {
      parsed = defaultConsents();
      localStorage.setItem(CONSENT_KEY, JSON.stringify(parsed));
      setConsents(parsed);
      return;
    }

    setBannerOpen(true);
  }, []);

  const persist = (next: Record<string, boolean>, close = true) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
    setConsents(next);
    applyConsents(next);
    if (close) setBannerOpen(false);
  };

  const toggleConsent = (name: string) => {
    setConsents((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const acceptAll = () => persist(allConsents());
  const rejectNonEssential = () => persist(defaultConsents());
  const savePreferences = () => persist(consents);
  const openBanner = () => setBannerOpen(true);
  const closeBanner = () => setBannerOpen(false);

  return (
    <ConsentContext.Provider
      value={{
        consents,
        bannerOpen,
        hydrated,
        toggleConsent,
        acceptAll,
        rejectNonEssential,
        savePreferences,
        openBanner,
        closeBanner,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}
