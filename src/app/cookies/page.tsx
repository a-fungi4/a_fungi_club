import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy | A Fungi Club",
  description:
    "Cookie Policy for b8momani.com and A Fungi Club. Learn what cookies and similar technologies we use and how to manage them.",
  alternates: {
    canonical: "https://www.b8momani.com/cookies",
  },
};

const mainStyle: React.CSSProperties = {
  maxWidth: 800,
  margin: "0 auto",
  padding: "clamp(80px, 12vw, 120px) 24px 48px",
  lineHeight: 1.6,
  color: "#fff",
  fontSize: 14,
};

const linkStyle: React.CSSProperties = {
  color: "#CCBBE9",
  textDecoration: "underline",
};

export default function CookiesPage() {
  const contactEmail = "khaled@b8momani.com";

  return (
    <main style={mainStyle}>
      <h1>Cookie Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString("en-US")}</p>

      <h2>1. What Are Cookies</h2>
      <p>
        Cookies are small text files placed on your device by websites you visit.
        They are widely used to make websites work more efficiently and to
        provide information to site owners. We also use similar technologies such
        as browser localStorage for strictly functional purposes.
      </p>

      <h2>2. Cookies &amp; Storage We Use</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}>
            <th style={{ textAlign: "left", padding: "8px 0" }}>Name</th>
            <th style={{ textAlign: "left", padding: "8px 0" }}>Type</th>
            <th style={{ textAlign: "left", padding: "8px 0" }}>Category</th>
            <th style={{ textAlign: "left", padding: "8px 0" }}>Purpose</th>
            <th style={{ textAlign: "left", padding: "8px 0" }}>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <td style={{ padding: "8px 0" }}>
              <code>afungi_cart</code>
            </td>
            <td style={{ padding: "8px 0" }}>localStorage</td>
            <td style={{ padding: "8px 0" }}>Functional</td>
            <td style={{ padding: "8px 0" }}>Stores your shopping cart across sessions</td>
            <td style={{ padding: "8px 0" }}>Until cleared by user</td>
          </tr>
          <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <td style={{ padding: "8px 0" }}>
              <code>_ga</code>, <code>_ga_*</code>
            </td>
            <td style={{ padding: "8px 0" }}>Cookie</td>
            <td style={{ padding: "8px 0" }}>Analytics</td>
            <td style={{ padding: "8px 0" }}>Tracks page views and usage via Google Analytics</td>
            <td style={{ padding: "8px 0" }}>Up to 2 years</td>
          </tr>
          <tr>
            <td style={{ padding: "8px 0" }}>
              <code>_fbp</code>, <code>_fbc</code>
            </td>
            <td style={{ padding: "8px 0" }}>Cookie</td>
            <td style={{ padding: "8px 0" }}>Advertising</td>
            <td style={{ padding: "8px 0" }}>Tracks site visits for Meta ad targeting</td>
            <td style={{ padding: "8px 0" }}>Up to 90 days</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Managing Cookies</h2>
      <p>
        You can disable or delete cookies through your browser settings. You can
        also manage your preferences using the cookie consent banner shown when
        you first visit the site. If you disable cookies, some features of the
        site may not work correctly.
      </p>

      <h2>4. Third-Party Cookies</h2>
      <p>
        Our analytics and advertising providers may set cookies on your device.
        For more information, please review their policies:
      </p>
      <ul>
        <li>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Google Privacy &amp; Terms
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/policy.php"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Meta Privacy Policy
          </a>
        </li>
      </ul>

      <h2>5. Global Privacy Control</h2>
      <p>
        We honor the Global Privacy Control (GPC) browser signal. If your browser
        sends this signal, we will treat it as a request to opt out of the sale or
        sharing of personal information and will not load non-essential analytics
        or advertising scripts.
      </p>

      <h2>6. Changes to This Cookie Policy</h2>
      <p>
        We may update this Cookie Policy from time to time. Changes will be
        posted on this page with an updated date.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about cookies? Email us at{" "}
        <a href={`mailto:${contactEmail}`} style={linkStyle}>
          {contactEmail}
        </a>
        .
      </p>

      <div style={{ marginTop: 32, fontSize: 12, opacity: 0.8 }}>
        <Link href="/" style={linkStyle}>
          Return to home
        </Link>
      </div>
    </main>
  );
}
