'use client';

import { useState } from "react";

export interface ToolInfo {
  name: string;
  icon: React.ReactNode;
  bg: string;
  usage: string;
  necessary: boolean;
}

export const tools: ToolInfo[] = [
  {
    name: "Google Analytics",
    bg: "#E37400",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#fff" />
        <circle cx="12" cy="12" r="4" fill="#E37400" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#E37400" strokeWidth="2" />
      </svg>
    ),
    usage: "Tracks page views, sessions, device/browser type, and approximate location to understand site traffic.",
    necessary: false,
  },
  {
    name: "Meta Pixel",
    bg: "#0668E1",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15h-2v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.95c5.05-.5 9-4.76 9-9.95 0-5.52-4.48-10-10-10z" fill="#fff" />
      </svg>
    ),
    usage: "Records page visits, conversions, and interactions to measure and improve Meta ad campaigns.",
    necessary: false,
  },
  {
    name: "Square",
    bg: "#000",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="2" fill="#fff" />
        <rect x="13" y="3" width="8" height="8" rx="2" fill="#fff" />
        <rect x="3" y="13" width="8" height="8" rx="2" fill="#fff" />
        <rect x="13" y="13" width="8" height="8" rx="2" fill="#fff" />
      </svg>
    ),
    usage: "Processes payments and collects billing/shipping address, email, phone, and order details at checkout.",
    necessary: true,
  },
  {
    name: "Printful",
    bg: "#222",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="20" height="12" rx="2" fill="#fff" />
        <path d="M7 10h10M7 14h6" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    usage: "Receives shipping address, contact info, and ordered items to print, pack, and ship orders.",
    necessary: true,
  },
  {
    name: "Sanity",
    bg: "#F03E2F",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" fill="#fff" />
        <path d="M12 7v10M8 9l4-2 4 2" stroke="#F03E2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    usage: "Powers the CMS and delivers site content; does not directly collect personal visitor data.",
    necessary: true,
  },
  {
    name: "Resend",
    bg: "#111",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="3" fill="#fff" />
        <path d="M6 10l6 4 6-4" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    usage: "Sends transactional emails such as contact-form confirmations and order notifications.",
    necessary: true,
  },
];

interface LogoBadgeProps {
  tool: ToolInfo;
  selected: boolean;
  onToggle: () => void;
}

function LogoBadge({ tool, selected, onToggle }: LogoBadgeProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered((prev) => !prev)}
      aria-label={`${tool.name} (${tool.necessary ? 'essential' : 'optional'}): ${tool.usage}`}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 600,
        whiteSpace: "nowrap",
        color: "#fff",
        background: tool.bg,
        border: "1px solid rgba(255,255,255,0.15)",
        cursor: "help",
      }}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={onToggle}
        onClick={(e) => e.stopPropagation()}
        aria-label={`Toggle ${tool.name}`}
        style={{ margin: 0, cursor: "pointer", flexShrink: 0 }}
      />
      {tool.icon}
      {tool.name}
      <span
        style={{
          fontSize: 9,
          fontWeight: 500,
          opacity: 0.9,
          padding: "1px 5px",
          borderRadius: 4,
          background: "rgba(255,255,255,0.15)",
        }}
      >
        {tool.necessary ? "Essential" : "Optional"}
      </span>
      {hovered && (
        <span
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: 220,
            padding: "8px 12px",
            boxSizing: "border-box",
            background: "#0B0714",
            color: "#fff",
            borderRadius: 8,
            fontSize: 11,
            fontWeight: 400,
            lineHeight: 1.4,
            textAlign: "center",
            whiteSpace: "normal",
            wordWrap: "break-word",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.1)",
            zIndex: 10000,
            pointerEvents: "none",
          }}
        >
          <span style={{ display: "block", fontWeight: 600, marginBottom: 4 }}>
            {tool.necessary ? "Essential" : "Optional"}
          </span>
          {tool.usage}
          <span
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              borderWidth: "6px",
              borderStyle: "solid",
              borderColor: "#0B0714 transparent transparent transparent",
            }}
          />
        </span>
      )}
    </span>
  );
}

interface CookieConsentLogosProps {
  consents: Record<string, boolean>;
  onToggle: (name: string) => void;
}

export default function CookieConsentLogos({ consents, onToggle }: CookieConsentLogosProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 8,
        marginTop: 12,
      }}
      aria-label="Data collection tools used on this site"
    >
      {tools.map((tool) => (
        <LogoBadge
          key={tool.name}
          tool={tool}
          selected={!!consents[tool.name]}
          onToggle={() => onToggle(tool.name)}
        />
      ))}
    </div>
  );
}
