import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | A Fungi Club",
  description:
    "Terms of Service, refund policy, and shipping terms for b8momani.com and A Fungi Club.",
  alternates: {
    canonical: "https://www.b8momani.com/terms",
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

export default function TermsPage() {
  const contactEmail = "khaled@b8momani.com";

  return (
    <main style={mainStyle}>
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toLocaleDateString("en-US")}</p>

      <h2>1. Acceptance</h2>
      <p>
        By accessing or using this website, you agree to be bound by these Terms
        of Service and our{" "}
        <Link href="/privacy" style={linkStyle}>
          Privacy Policy
        </Link>
        . If you do not agree, please do not use the site.
      </p>

      <h2>2. Products &amp; Orders</h2>
      <p>
        All products are subject to availability. We reserve the right to cancel
        or refuse any order for any reason, including product availability,
        errors in product or pricing information, or suspected fraud. Prices may
        change without notice.
      </p>

      <h2>3. Refund &amp; Return Policy</h2>
      <p>
        All products are made-to-order and fulfilled by Printful
        (print-on-demand). <strong>All sales are final.</strong> We do not accept
        returns, exchanges, or refunds for buyer&apos;s remorse, wrong size
        selected, or change of mind.
      </p>
      <p>
        If your item arrives damaged, defective, or materially different from what
        was ordered, contact us at{" "}
        <a href={`mailto:${contactEmail}`} style={linkStyle}>
          {contactEmail}
        </a>{" "}
        within <strong>30 days of delivery</strong> with a photo and your order
        number. We will file a claim with Printful on your behalf; eligible
        claims will result in a free reprint or a refund at Printful&apos;s
        discretion.
      </p>
      <p>
        Slight color variations and approximate sizing are inherent to
        print-on-demand production and are not covered under this policy. We are
        not responsible for delays, losses, or damage caused by carriers once an
        order has shipped.
      </p>

      <h2>4. Shipping</h2>
      <p>
        All orders are fulfilled via Printful. Estimated production time is 2–7
        business days; estimated delivery is 5–10 additional business days
        depending on your location. Shipping costs are calculated at checkout.
        We are not responsible for delays caused by carriers or customs. We do
        not ship to P.O. boxes.
      </p>

      <h2>5. Payment</h2>
      <p>
        Payments are processed securely by Square. We do not store your payment
        card details. By completing a purchase, you agree to Square&apos;s terms
        of service and privacy policy.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        All content, artwork, designs, and branding on this site belong to
        Khaled Momani / A Fungi Club and are protected by copyright and other
        intellectual property laws. You may not reproduce, distribute, or create
        derivative works without our written permission.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, A Fungi Club and Khaled Momani
        shall not be liable for any indirect, incidental, special,
        consequential, or punitive damages, or any loss of profits or revenues,
        whether incurred directly or indirectly, arising out of your use of the
        site or purchase of products.
      </p>

      <h2>8. Governing Law</h2>
      <p>
        These terms are governed by the laws of the State of Texas, without
        regard to conflict of law principles.
      </p>

      <h2>9. Contact</h2>
      <p>
        For questions about these terms, email{" "}
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
