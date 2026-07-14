import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        width: "100%",
        padding: "24px 16px",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        background: "#0B0714",
      }}
    >
      <nav
        aria-label="Legal"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px 20px",
          fontSize: 12,
          marginBottom: 12,
        }}
      >
        <Link href="/privacy" style={{ color: "#CCBBE9", textDecoration: "underline" }}>
          Privacy Policy
        </Link>
        <Link href="/terms" style={{ color: "#CCBBE9", textDecoration: "underline" }}>
          Terms of Service
        </Link>
        <Link href="/cookies" style={{ color: "#CCBBE9", textDecoration: "underline" }}>
          Cookie Policy
        </Link>
        <Link href="/privacy#data-rights" style={{ color: "#CCBBE9", textDecoration: "underline" }}>
          Your Data Rights
        </Link>
        <Link href="/privacy#do-not-sell" style={{ color: "#CCBBE9", textDecoration: "underline" }}>
          Do Not Sell or Share My Personal Information
        </Link>
      </nav>
      <div
        style={{
          textAlign: "center",
          fontSize: 11,
          color: "rgba(255, 255, 255, 0.5)",
        }}
      >
        &copy; {currentYear} A Fungi Club / Khaled Momani
      </div>
    </footer>
  );
}
