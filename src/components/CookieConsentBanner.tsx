'use client';

import Link from "next/link";
import CookieConsentLogos, { tools } from "./CookieConsentLogos";
import { useConsent } from "./CookieConsentProvider";

export default function CookieConsentBanner() {
  const {
    consents,
    bannerOpen,
    hydrated,
    toggleConsent,
    acceptAll,
    rejectNonEssential,
    savePreferences,
  } = useConsent();

  if (!hydrated || !bannerOpen) return null;

  const essentialDisabled = tools.some((tool) => tool.necessary && !consents[tool.name]);

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#151029",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "20px 24px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px 20px",
        fontSize: 13,
        color: "#fff",
      }}
    >
      <div style={{ width: "100%", maxWidth: 720, textAlign: "center" }}>
        <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>
          At afungi.club we believe in informed consent.
        </p>
        <p style={{ margin: "8px 0 0", lineHeight: 1.5 }}>
          Hiding terms and conditions in a privacy policy that&apos;s a million pages long is a shady practice. The least you should know are the tools used to collect your data.
        </p>
        <CookieConsentLogos consents={consents} onToggle={toggleConsent} />
        {essentialDisabled && (
          <p
            style={{
              margin: "10px 0 0",
              color: "#FFD6A5",
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            You disabled an essential tool. Some features (checkout, order emails, or site content) may not work correctly.
          </p>
        )}
        <p style={{ margin: "14px 0 0" }}>
          We use cookies for analytics and advertising. See our{" "}
          <Link href="/cookies" style={{ color: "#CCBBE9", textDecoration: "underline" }}>
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link href="/privacy" style={{ color: "#CCBBE9", textDecoration: "underline" }}>
            Privacy Policy
          </Link>
          .
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 14 }}>
          <button
            onClick={rejectNonEssential}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Reject Non-Essential
          </button>
          <button
            onClick={savePreferences}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Save Preferences
          </button>
          <button
            onClick={acceptAll}
            style={{
              background: "#CCBBE9",
              border: "none",
              color: "#0B0714",
              padding: "8px 16px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
