'use client';

import { useConsent } from "./CookieConsentProvider";

export default function CookieConsentButton() {
  const { openBanner } = useConsent();

  return (
    <button
      onClick={openBanner}
      aria-label="Manage cookie consent"
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 9998,
        width: 44,
        height: 44,
        borderRadius: "50%",
        background: "#151029",
        border: "1px solid rgba(255,255,255,0.15)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    </button>
  );
}
