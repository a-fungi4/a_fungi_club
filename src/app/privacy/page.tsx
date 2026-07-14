import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | A Fungi Club",
  description:
    "Privacy Policy for b8momani.com and A Fungi Club. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://www.b8momani.com/privacy",
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

export default function PrivacyPage() {
  const contactEmail = "khaled@b8momani.com";

  return (
    <main style={mainStyle}>
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString("en-US")}</p>

      <h2>1. Who We Are</h2>
      <p>
        This website is operated by Khaled Momani (A Fungi Club), reachable at{" "}
        <a href={`mailto:${contactEmail}`} style={linkStyle}>
          {contactEmail}
        </a>
        . References to &quot;we&quot;, &quot;us&quot;, or &quot;our&quot; refer to A Fungi Club.
      </p>

      <h2>2. What Data We Collect</h2>
      <p>
        We collect the following types of personal data depending on how you use this site:
      </p>
      <ul>
        <li>
          <strong>Contact form:</strong> name, email address, subject, and message body.
        </li>
        <li>
          <strong>Shop/checkout:</strong> shipping address, billing address, email address, phone number, and order details. This data is collected by and shared with Square (payment processor) and Printful (order fulfillment).
        </li>
        <li>
          <strong>Analytics:</strong> device type, browser, pages visited, time on site, and approximate location — collected via Google Analytics.
        </li>
        <li>
          <strong>Advertising:</strong> browsing behavior and page interactions — collected via Meta Pixel (Facebook/Instagram).
        </li>
        <li>
          <strong>Cart:</strong> your selected shop items are saved to your browser&apos;s localStorage under the key <code>afungi_cart</code>.
        </li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <ul>
        <li>To respond to your contact form submissions.</li>
        <li>To process and fulfill your orders.</li>
        <li>To understand site traffic and improve content (analytics).</li>
        <li>To show relevant advertising on Meta platforms.</li>
      </ul>

      <h2>4. Legal Basis for Processing (GDPR)</h2>
      <p>
        If you are located in the EU/EEA or UK, our legal bases are: (a){" "}
        <strong>Contract performance</strong> — to process your orders; (b){" "}
        <strong>Consent</strong> — for analytics and advertising cookies/tracking
        (see Section 6); (c) <strong>Legitimate interests</strong> — to respond
        to contact inquiries and prevent fraud.
      </p>

      <h2>5. Third-Party Subprocessors</h2>
      <ul>
        <li>
          <strong>Square</strong> (payment processing) —{" "}
          <a
            href="https://squareup.com/us/en/legal/general"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Privacy Notice
          </a>
        </li>
        <li>
          <strong>Printful</strong> (order fulfillment) —{" "}
          <a
            href="https://www.printful.com/policies/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Privacy Policy
          </a>
        </li>
        <li>
          <strong>Google Analytics</strong> —{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Google Privacy Policy
          </a>
        </li>
        <li>
          <strong>Meta Pixel</strong> —{" "}
          <a
            href="https://www.facebook.com/policy.php"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Meta Privacy Policy
          </a>
        </li>
        <li>
          <strong>Sanity</strong> (CMS/content storage) —{" "}
          <a
            href="https://www.sanity.io/legal/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Sanity Privacy Policy
          </a>
        </li>
        <li>
          <strong>Resend</strong> (transactional email) —{" "}
          <a
            href="https://resend.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Resend Privacy Policy
          </a>
        </li>
      </ul>

      <h2>6. Cookies &amp; Tracking</h2>
      <p>
        We use Google Analytics cookies (analytics category) and Meta Pixel
        (advertising category). Cart data is stored in localStorage
        (functional). A consent banner will ask for your permission before
        analytics/advertising cookies load. You may withdraw consent at any time
        via the cookie settings link in the footer.
      </p>

      <h2>7. Data Retention</h2>
      <p>
        Contact form submissions are retained in email for up to 12 months. Order
        data is retained as required by Square and Printful for legal/tax
        purposes. Analytics data retention is set to 14 months in Google
        Analytics. Server logs may contain personal information for up to 30 days
        before rotation.
      </p>

      <h2 id="data-rights">8. Your Rights</h2>
      <p>Depending on your jurisdiction, you may have the following rights:</p>
      <ul>
        <li>
          <strong>Access</strong> — request a copy of your personal data.
        </li>
        <li>
          <strong>Correction</strong> — request correction of inaccurate data.
        </li>
        <li>
          <strong>Deletion / Right to be Forgotten</strong> — request deletion of
          your data.
        </li>
        <li>
          <strong>Portability</strong> — receive your data in a machine-readable
          format.
        </li>
        <li>
          <strong>Opt-out of sale/sharing</strong> — California residents may
          opt out of the sale or sharing of personal information (see Section
          9).
        </li>
        <li>
          <strong>Withdraw consent</strong> — withdraw analytics or advertising
          consent at any time.
        </li>
      </ul>
      <p>
        To exercise any of these rights, email us at{" "}
        <a href={`mailto:${contactEmail}`} style={linkStyle}>
          {contactEmail}
        </a>
        .
      </p>

      <h2 id="do-not-sell">9. Do Not Sell or Share My Personal Information (California)</h2>
      <p>
        We do not sell personal information for money. However, sharing data
        with Google and Meta for advertising purposes may qualify as
        &quot;sharing&quot; under the CCPA/CPRA. California residents may opt out
        by: (1) disabling advertising cookies via our cookie consent banner,
        (2) using the Global Privacy Control (GPC) browser signal — we will honor
        this signal, or (3) emailing us at{" "}
        <a href={`mailto:${contactEmail}`} style={linkStyle}>
          {contactEmail}
        </a>
        .
      </p>

      <h2>10. Children&apos;s Privacy</h2>
      <p>
        This site is not directed to children under 13 and we do not knowingly
        collect data from children.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this policy. Changes will be posted on this page with an
        updated date.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions? Email us at{" "}
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
