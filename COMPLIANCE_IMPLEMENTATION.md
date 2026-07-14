# Compliance Implementation Guide — b8momani.com / A Fungi Club

> Granular, step-by-step instructions for a small-context model to implement every item in `COMPLIANCE_GAPS.md`. Each task is self-contained and references exact files and line numbers. Complete them in order — later tasks depend on earlier ones (especially Task 1).

---

## TASK 1 — Create the Privacy Policy page at `/privacy`

### 1a. Create the page file

Create a new file at:
```
src/app/privacy/page.tsx
```

The file must be a Next.js **server component** (no `'use client'`). Export a default React component named `PrivacyPage`. It must:

1. Export a `metadata` object of type `Metadata` (from `"next"`) with:
   - `title`: `"Privacy Policy | A Fungi Club"`
   - `description`: `"Privacy Policy for b8momani.com and A Fungi Club. Learn how we collect, use, and protect your personal information."`
   - `alternates.canonical`: `"https://www.b8momani.com/privacy"`

2. Render a single full-width page with the following **Privacy Policy text sections** as `<h1>`, `<h2>`, and `<p>` tags (plain semantic HTML, no special CSS classes required beyond a centered wrapper `<main>` with `max-width: 800px` inline style):

   - **`<h1>`** — "Privacy Policy"
   - **Last updated paragraph** — "Last updated: [INSERT DATE BEFORE PUBLISHING]"
   - **Section 1 `<h2>`** — "1. Who We Are"
     - Text: "This website is operated by Khaled Momani (A Fungi Club), reachable at [INSERT CONTACT EMAIL]. References to 'we', 'us', or 'our' refer to A Fungi Club."
   - **Section 2 `<h2>`** — "2. What Data We Collect"
     - Intro paragraph, then a `<ul>` with these items:
       - "Contact form: name, email address, subject, and message body."
       - "Shop/checkout: shipping address, billing address, email address, phone number, and order details. This data is collected by and shared with Square (payment processor) and Printful (order fulfillment)."
       - "Analytics: device type, browser, pages visited, time on site, and approximate location — collected via Google Analytics."
       - "Advertising: browsing behavior and page interactions — collected via Meta Pixel (Facebook/Instagram)."
       - "Cart: your selected shop items are saved to your browser's localStorage under the key `afungi_cart`."
   - **Section 3 `<h2>`** — "3. How We Use Your Data"
     - `<ul>` with: "To respond to your contact form submissions.", "To process and fulfill your orders.", "To understand site traffic and improve content (analytics).", "To show relevant advertising on Meta platforms."
   - **Section 4 `<h2>`** — "4. Legal Basis for Processing (GDPR)"
     - Text: "If you are located in the EU/EEA or UK, our legal bases are: (a) Contract performance — to process your orders; (b) Consent — for analytics and advertising cookies/tracking (see Section 6); (c) Legitimate interests — to respond to contact inquiries and prevent fraud."
   - **Section 5 `<h2>`** — "5. Third-Party Subprocessors"
     - A `<ul>` with each subprocessor, its role, and a link to its privacy policy:
       - "Square (payment processing) — [Square Privacy Notice](https://squareup.com/us/en/legal/general)"
       - "Printful (order fulfillment) — [Printful Privacy Policy](https://www.printful.com/policies/privacy)"
       - "Google Analytics — [Google Privacy Policy](https://policies.google.com/privacy)"
       - "Meta Pixel — [Meta Privacy Policy](https://www.facebook.com/policy.php)"
       - "Sanity (CMS/content storage) — [Sanity Privacy Policy](https://www.sanity.io/legal/privacy)"
       - "Resend (transactional email) — [Resend Privacy Policy](https://resend.com/legal/privacy-policy)"
   - **Section 6 `<h2>`** — "6. Cookies & Tracking"
     - Text explaining: we use Google Analytics cookies (analytics category) and Meta Pixel (advertising category); cart data is stored in localStorage (functional); a consent banner will ask for your permission before analytics/advertising cookies load; you may withdraw consent at any time via the cookie settings link in the footer.
   - **Section 7 `<h2>`** — "7. Data Retention"
     - Text: "Contact form submissions are retained in email for up to 12 months. Order data is retained as required by Square and Printful for legal/tax purposes. Analytics data retention is set to 14 months in Google Analytics. Server logs may contain PII for up to 30 days before rotation."
   - **Section 8 `<h2>`** — "8. Your Rights"
     - Intro: "Depending on your jurisdiction, you may have the following rights:", then a `<ul>`:
       - "**Access** — request a copy of your personal data."
       - "**Correction** — request correction of inaccurate data."
       - "**Deletion / Right to be Forgotten** — request deletion of your data."
       - "**Portability** — receive your data in a machine-readable format."
       - "**Opt-out of sale/sharing** — California residents may opt out of the sale or sharing of personal information (see Section 9)."
       - "**Withdraw consent** — withdraw analytics or advertising consent at any time."
     - Text: "To exercise any of these rights, email us at [INSERT CONTACT EMAIL]."
   - **Section 9 `<h2>`** — "9. Do Not Sell or Share My Personal Information (California)"
     - Text: "We do not sell personal information for money. However, sharing data with Google and Meta for advertising purposes may qualify as 'sharing' under the CCPA/CPRA. California residents may opt out by: (1) disabling advertising cookies via our cookie consent banner, (2) using the Global Privacy Control (GPC) browser signal — we will honor this signal, or (3) emailing us at [INSERT CONTACT EMAIL]."
   - **Section 10 `<h2>`** — "10. Children's Privacy"
     - Text: "This site is not directed to children under 13 and we do not knowingly collect data from children."
   - **Section 11 `<h2>`** — "11. Changes to This Policy"
     - Text: "We may update this policy. Changes will be posted on this page with an updated date."
   - **Section 12 `<h2>`** — "12. Contact"
     - Text: "Questions? Email us at [INSERT CONTACT EMAIL]."

---

## TASK 2 — Create the Terms of Service page at `/terms`

Create a new file at:
```
src/app/terms/page.tsx
```

Same structure as Task 1 (server component, `Metadata` export). Sections:

- **`<h1>`** — "Terms of Service"
- Last updated paragraph.
- **Section 1** — "1. Acceptance" — by using this site you agree to these terms.
- **Section 2** — "2. Products & Orders" — all orders are subject to availability; we reserve the right to cancel or refuse orders; prices may change without notice.
- **Section 3** — "3. Refund & Return Policy" — All products are made-to-order and fulfilled by Printful (print-on-demand). **All sales are final. We do not accept returns, exchanges, or refunds for buyer's remorse, wrong size selected, or change of mind.** If your item arrives damaged, defective, or materially different from what was ordered, contact us at [INSERT CONTACT EMAIL] within **30 days of delivery** with a photo and your order number. We will file a claim with Printful on your behalf; eligible claims will result in a free reprint or a refund at Printful's discretion. Please note that slight color variations and approximate sizing are inherent to print-on-demand production and are not covered under this policy. We are not responsible for delays or losses caused by carriers once an order has shipped.
- **Section 4** — "4. Shipping" — All orders are fulfilled via Printful. Estimated production time is 2–7 business days; estimated delivery is 5–10 additional business days depending on your location. Shipping costs are calculated at checkout. We are not responsible for delays caused by carriers or customs. We do not ship to P.O. boxes.
- **Section 5** — "5. Payment" — Payments are processed securely by Square. We do not store your payment card details.
- **Section 6** — "6. Intellectual Property" — All content, artwork, and branding on this site belongs to Khaled Momani / A Fungi Club and may not be reproduced without permission.
- **Section 7** — "7. Limitation of Liability" — To the extent permitted by law, A Fungi Club is not liable for indirect, incidental, or consequential damages.
- **Section 8** — "8. Governing Law" — [INSERT YOUR STATE, e.g., "These terms are governed by the laws of the State of Texas."]
- **Section 9** — "9. Contact" — [INSERT CONTACT EMAIL]

---

## TASK 3 — Create the Cookie Policy page at `/cookies`

Create a new file at:
```
src/app/cookies/page.tsx
```

Same structure (server component, `Metadata` export). Sections:

- **`<h1>`** — "Cookie Policy"
- Last updated paragraph.
- **Section 1** — "1. What Are Cookies" — brief explanation.
- **Section 2** — "2. Cookies & Storage We Use" — a table or `<ul>` with:
  - `afungi_cart` | localStorage | Functional | Stores your shopping cart across sessions | Until cleared by user
  - Google Analytics (`_ga`, `_ga_*`) | Cookie | Analytics | Tracks page views and usage | 2 years
  - Meta Pixel (`_fbp`, `_fbc`) | Cookie | Advertising | Tracks site visits for Meta ad targeting | 90 days
- **Section 3** — "3. Managing Cookies" — users can disable/delete cookies via browser settings, or use our cookie consent banner; GPC signals are honored.
- **Section 4** — "4. Third-Party Cookies" — links to Google and Meta cookie policies.
- **Section 5** — "5. Contact" — [INSERT CONTACT EMAIL]

---

## TASK 4 — Add all three legal pages to `src/app/sitemap.ts`

**File:** `src/app/sitemap.ts`

After line 60 (after the `misc` entry, before the closing `]`), insert three new sitemap entries:

```ts
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${base}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
```

---

## TASK 5 — Update `public/robots.txt` to allow legal pages

**File:** `public/robots.txt`

No changes needed — `/privacy`, `/terms`, and `/cookies` are already allowed by the default `Allow: /`. However, **remove the `Disallow: /tg/` line** only if the shop is intended to be indexed (currently it blocks `/tg/` which is the shop). Leave as-is if intentional. No other change required.

---

## TASK 6 — Add footer links to legal pages in `NavBar.tsx` and `MobileNavBar.tsx`

**Goal:** Every page must have visible footer links to Privacy Policy, Terms of Service, and Cookie Policy. The best approach is a shared `<Footer>` component rendered in `src/app/layout.tsx`.

### 6a. Create `src/components/Footer.tsx`

Create a new file:
```
src/components/Footer.tsx
```

It must be a client or server component (server is fine) that renders a `<footer>` element with:
- A centered `<nav aria-label="Legal">` containing three `<Link>` elements (from `"next/link"`):
  - `href="/privacy"` — text "Privacy Policy"
  - `href="/terms"` — text "Terms of Service"
  - `href="/cookies"` — text "Cookie Policy"
- An optional small copyright line: `© {new Date().getFullYear()} A Fungi Club / Khaled Momani`
- Inline styles acceptable; keep it minimal (e.g., `display: flex; gap: 16px; justify-content: center; padding: 24px 16px; font-size: 12px`).

### 6b. Import and render `Footer` in `src/app/layout.tsx`

**File:** `src/app/layout.tsx`

1. Add the import at the top with the other component imports:
   ```ts
   import Footer from "@/components/Footer";
   ```
2. Inside the `<body>` tag, after the `{children}` line (at line 135), add `<Footer />`. The final `<CartProvider>` block should look like:
   ```tsx
   <CartProvider>
     <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 100, paddingTop: 12 }}>
       <NavBar />
     </div>
     {children}
     <Footer />
   </CartProvider>
   ```

---

## TASK 7 — Implement a cookie consent banner

**Goal:** Block Google Analytics and Meta Pixel scripts until the user gives consent. Honor GPC signals. Persist consent to `localStorage`.

### 7a. Create `src/components/CookieConsentBanner.tsx`

Create a new file:
```
src/components/CookieConsentBanner.tsx
```

This must be a `'use client'` component. Logic:

1. On mount (`useEffect`), check `localStorage.getItem('afungi_cookie_consent')`.
   - If `"accepted"` — load analytics/pixel scripts (see 7b).
   - If `"rejected"` — do nothing, hide banner.
   - If `null` — also check `navigator.globalPrivacyControl === true`. If GPC is true, immediately set `localStorage.setItem('afungi_cookie_consent', 'rejected')` and hide banner. Otherwise, show the banner.
2. Banner UI renders a fixed bottom bar with:
   - Text: "We use cookies for analytics and advertising. See our [Cookie Policy](/cookies)."
   - Button: "Accept All" — sets `localStorage.setItem('afungi_cookie_consent', 'accepted')`, loads scripts, hides banner.
   - Button: "Reject Non-Essential" — sets `localStorage.setItem('afungi_cookie_consent', 'rejected')`, hides banner without loading scripts.
   - Link: "Cookie Settings / Privacy Policy" → `/privacy`
3. Script loading function (called on accept): dynamically appends the two `<script>` tags for Google Analytics (`https://www.googletagmanager.com/gtag/js?id=G-01VLT28STB`) and the Meta Pixel inline script. Use `document.createElement('script')` and `document.head.appendChild(...)`.

### 7b. Remove hardcoded tracking scripts from `src/app/layout.tsx`

**File:** `src/app/layout.tsx`

Remove lines 75–111 entirely (the `{/* Google Analytics */}` `<Script>` blocks and the Meta Pixel `<Script>` block and its `<noscript>` image). These will now be loaded conditionally by `CookieConsentBanner`.

Also remove the `import Script from "next/script"` import at line 4 if it is no longer used after this removal.

### 7c. Add `CookieConsentBanner` to `src/app/layout.tsx`

**File:** `src/app/layout.tsx`

1. Add import (after other component imports):
   ```ts
   import CookieConsentBanner from "@/components/CookieConsentBanner";
   ```
2. Render it inside `<CartProvider>`, after `<Footer />`:
   ```tsx
   <Footer />
   <CookieConsentBanner />
   ```

---

## TASK 8 — Add consent checkbox and privacy notice to `ContactForm.tsx`

**File:** `src/components/ContactForm.tsx`

### 8a. Add state for consent

Add a new state variable after line 12 (after the existing state declarations):
```ts
const [privacyConsent, setPrivacyConsent] = useState(false);
```

### 8b. Disable submit until consent is checked

On the `<button type="submit">` at line 108, change the `disabled` prop from:
```tsx
disabled={loading}
```
to:
```tsx
disabled={loading || !privacyConsent}
```

### 8c. Add the consent checkbox before the submit button

Insert the following JSX block between the closing `</div>` of `.Emailbody` (line 107) and the `<button>` (line 108):

```tsx
<div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 8 }}>
  <input
    id="privacy-consent"
    type="checkbox"
    checked={privacyConsent}
    onChange={e => setPrivacyConsent(e.target.checked)}
    required
    style={{ marginTop: 3, flexShrink: 0 }}
  />
  <label htmlFor="privacy-consent" style={{ fontSize: 12, lineHeight: '1.4' }}>
    I have read and agree to the{' '}
    <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
      Privacy Policy
    </a>
    . I consent to my submitted data being used to respond to my inquiry.
  </label>
</div>
```

### 8d. Add a honeypot field to prevent spam

Inside the `<form>` tag, add the following hidden honeypot input immediately after the opening `<form>` tag (line 44). It must be visually hidden but **not** `display:none` (bots fill hidden fields):

```tsx
<input
  type="text"
  name="website"
  autoComplete="off"
  tabIndex={-1}
  aria-hidden="true"
  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
  value=""
  onChange={() => {}}
/>
```

Then in the `handleSubmit` function, add a honeypot check as the very first line inside the `try` block (before the `fetch` call):
```ts
const form = e.currentTarget as HTMLFormElement;
const honeypot = (form.elements.namedItem('website') as HTMLInputElement)?.value;
if (honeypot) { setLoading(false); setSuccess('Message sent successfully!'); return; }
```

---

## TASK 9 — Scrub PII from Square webhook logs

**File:** `src/app/api/square-webhook/route.ts`

At lines 66–87, 115–116, 196–197, and 229–230 there are `console.log` statements that output the full request payload, headers, shipping address, email, and phone.

For each `console.log` that outputs PII (shipping address, email, phone, cart data), replace the logged value with a scrubbed version:
- Replace logging of `shippingAddress` objects with a log that only prints the **city and state** (not street address, zip, or name).
- Replace logging of `email` or `phone` fields with `"[REDACTED]"`.
- Replace logging of the full raw request body or headers with just the event type and order ID.

Example pattern — change:
```ts
console.log('Order data:', orderData);
```
to:
```ts
console.log('Order data:', { id: orderData?.id, state: orderData?.state });
```

Apply this same redaction pattern to every `console.log` in this file that touches shipping, email, phone, or raw body/header objects.

---

## TASK 10 — Add "Do Not Sell" opt-out link to footer

**File:** `src/components/Footer.tsx` (created in Task 6a)

Add a fourth link to the footer `<nav>` alongside the legal links:
```tsx
<a
  href="/privacy#do-not-sell"
  style={{ textDecoration: 'underline' }}
>
  Do Not Sell or Share My Personal Information
</a>
```

This links to the `#do-not-sell` anchor in the Privacy Policy (add an `id="do-not-sell"` to the `<h2>` of Section 9 in `src/app/privacy/page.tsx`).

---

## TASK 11 — Add data subject rights request mechanism

**Goal:** Users must be able to email a data deletion/access request. This is a minimal implementation.

### 11a. Add an anchor `id="data-rights"` to Section 8 of the Privacy Policy

In `src/app/privacy/page.tsx`, give the Section 8 `<h2>` an `id`:
```tsx
<h2 id="data-rights">8. Your Rights</h2>
```

### 11b. Add a "Data Request" link in the footer

In `src/components/Footer.tsx`, add a fifth link:
```tsx
<a href="/privacy#data-rights">Your Data Rights</a>
```

No backend form is required at this stage — linking to the Privacy Policy section with the contact email is sufficient for a small operation.

---

## TASK 12 — Update `src/app/misc/page.tsx` to replace placeholder Privacy Policy content

**File:** `src/app/misc/page.tsx`

At lines 135–140, the `MiscDropdown` for "Privacy Policy" renders:
```tsx
content={<p>Content for Misc Item 4</p>}
```

Replace it with a brief summary and a link to the full policy:
```tsx
content={
  <div>
    <p>We care about your privacy. Read our full <a href="/privacy" style={{ textDecoration: 'underline' }}>Privacy Policy</a> to understand how we collect, use, and protect your data.</p>
    <p>Key points: We use Google Analytics and Meta Pixel (with your consent). Orders are processed by Square and fulfilled by Printful. You may request deletion of your data at any time.</p>
    <p><a href="/terms" style={{ textDecoration: 'underline' }}>Terms of Service</a> &nbsp;|&nbsp; <a href="/cookies" style={{ textDecoration: 'underline' }}>Cookie Policy</a></p>
  </div>
}
```

---

## TASK 13 — Add checkout disclosures to the shop/TG page

**File:** `src/app/tg/TGPageClient.tsx` — around lines 208–247 (the HowTo/Tracking section)

Before any "Add to Cart" or "Checkout" button renders, add a visible disclosure paragraph:

```tsx
<p style={{ fontSize: 11, color: '#888', marginTop: 8 }}>
  By placing an order you agree to our{' '}
  <a href="/terms" style={{ textDecoration: 'underline' }}>Terms of Service</a>
  {' '}and{' '}
  <a href="/privacy" style={{ textDecoration: 'underline' }}>Privacy Policy</a>.
  Orders are fulfilled by Printful and payments processed by Square.
  See our <a href="/terms" style={{ textDecoration: 'underline' }}>Refund Policy</a> for returns.
</p>
```

Locate the checkout/cart area in the component and insert this paragraph immediately above or below the checkout button.

---

## TASK 14 — Update `CartContext.tsx` to gate localStorage behind consent

**File:** `src/components/CartContext.tsx` — lines 31–45 (the `localStorage` read/write calls)

Before writing to `localStorage`, check for cookie consent:
```ts
const hasConsent = () => {
  try { return localStorage.getItem('afungi_cookie_consent') !== 'rejected'; }
  catch { return true; }
};
```

Wrap the `localStorage.setItem('afungi_cart', ...)` call:
```ts
if (hasConsent()) {
  localStorage.setItem('afungi_cart', JSON.stringify(updatedCart));
}
```

For the initial read, if consent is `'rejected'`, initialize with an empty cart instead:
```ts
const stored = typeof window !== 'undefined' && localStorage.getItem('afungi_cookie_consent') !== 'rejected'
  ? localStorage.getItem('afungi_cart')
  : null;
```

> Note: `afungi_cart` is functional (not advertising) storage, so gating it is optional but good practice. If you want to always allow the cart, skip this task.

---

## TASK 15 — Final verification checklist

After completing all tasks, verify:

- [ ] `https://www.b8momani.com/privacy` renders the full Privacy Policy.
- [ ] `https://www.b8momani.com/terms` renders the Terms of Service.
- [ ] `https://www.b8momani.com/cookies` renders the Cookie Policy.
- [ ] A footer with Privacy, Terms, Cookies, and "Do Not Sell" links appears on every page.
- [ ] No Google Analytics or Meta Pixel network requests fire on initial page load before consent.
- [ ] Clicking "Accept All" in the banner causes GA and Meta Pixel to load.
- [ ] Clicking "Reject" blocks them permanently (verified by refreshing with consent=rejected in localStorage).
- [ ] `navigator.globalPrivacyControl === true` in a GPC-enabled browser auto-rejects and hides the banner.
- [ ] The contact form submit button is disabled until the privacy consent checkbox is checked.
- [ ] `src/app/sitemap.ts` includes `/privacy`, `/terms`, `/cookies`.
- [ ] Server logs in `square-webhook` no longer print raw email, phone, or shipping addresses.
- [ ] The `/misc` Privacy Policy dropdown shows a real summary + links instead of the placeholder.
- [ ] The shop/TG checkout area shows the ToS + Privacy disclosure before/after the checkout button.

---

## Reference: Files Modified / Created

| File | Action |
|------|--------|
| `src/app/privacy/page.tsx` | **Create** |
| `src/app/terms/page.tsx` | **Create** |
| `src/app/cookies/page.tsx` | **Create** |
| `src/components/Footer.tsx` | **Create** |
| `src/components/CookieConsentBanner.tsx` | **Create** |
| `src/app/layout.tsx` | **Modify** — remove hardcoded tracking scripts, add Footer + CookieConsentBanner imports |
| `src/components/ContactForm.tsx` | **Modify** — add consent checkbox, honeypot |
| `src/app/api/square-webhook/route.ts` | **Modify** — scrub PII from console.log calls |
| `src/app/misc/page.tsx` | **Modify** — replace placeholder Privacy Policy dropdown content |
| `src/app/tg/TGPageClient.tsx` | **Modify** — add checkout disclosures |
| `src/components/CartContext.tsx` | **Modify** — gate localStorage behind consent check |
| `src/app/sitemap.ts` | **Modify** — add /privacy, /terms, /cookies entries |
| `public/robots.txt` | **Review only** — no change needed |
