# Compliance Gap Analysis for b8momani.com / A Fungi Club

> This document is a technical gap analysis, not legal advice. Review with a privacy/compliance attorney before publishing or collecting user data.

## 1. Missing Core Legal Pages

- **No Privacy Policy.** There is no `/privacy` route and no `privacy-policy` page in `public` or `src/app`. The `/misc` page contains a dropdown labeled **"Privacy Policy"**, but its content is only a placeholder: `<p>Content for Misc Item 4</p>`. The page metadata also advertises "compliance documents" while none exist.
  - `src/app/misc/page.tsx:135-140`
  - `public/` directory contains no legal documents.
- **No Terms of Service / Terms & Conditions.** The shop checkout is live, but there are no terms governing sales, refunds, shipping, or disputes.
- **No Cookie Policy.** No page discloses what cookies/local storage are used, their purposes, retention, or how to manage them.

## 2. Tracking & Cookies Without Consent

- **Google Analytics and Meta Pixel load on every page immediately** with no cookie consent banner or opt-out mechanism.
  - `src/app/layout.tsx:75-111`
- Both scripts execute before the user can consent, which is non-compliant with GDPR/ePrivacy and increasingly with state privacy laws (e.g., California, Virginia, Colorado).
- There is no granular consent (e.g., analytics vs. marketing), no consent storage, no "reject all" option, and no signal detection for Global Privacy Control (GPC) / Do Not Track.

## 3. E-Commerce Data Collection Without Disclosures

- The shop collects and shares significant PII with third parties, but users are not informed:
  - **Square** receives cart data and asks for shipping/billing details during checkout.
  - **Printful** receives full shipping address, phone, email, and order items via `printful-order` and `square-webhook`.
  - The site uses `localStorage` to persist the cart across sessions.
- Relevant code:
  - `src/components/CartContext.tsx:31-45` (cart localStorage)
  - `src/app/api/square-checkout/route.ts:23-84` (checkout creation)
  - `src/app/api/square-webhook/route.ts:66-247` (order fulfillment to Printful)
  - `src/app/api/printful-order.ts:1-61` (Printful order creation)
- There is no legal basis (GDPR) or notice (CCPA/CPRA) for collecting, sharing, or storing this data.

## 4. Contact Form Lacks Privacy Safeguards

- The contact form collects **name, email, subject, and message** and sends them via email. The site also sends an auto-reply to the submitter.
  - `src/components/ContactForm.tsx:1-124`
  - `src/app/api/contact/route.ts:1-46`
- No privacy notice or link to a Privacy Policy is shown before submission.
- No explicit consent checkbox (e.g., "I agree to the privacy policy") or lawful-basis disclosure.
- No anti-spam/honeypot measure (e.g., CAPTCHA, reCAPTCHA, honeypot field).
- No data retention statement or deletion mechanism for submitted messages.

## 5. PII Logging in Production Code

- The Square webhook logs the full incoming payload, headers, and parsed cart data, including shipping address, email, and phone, to the server console (and any log drain).
  - `src/app/api/square-webhook/route.ts:66-87`, `115-116`, `196-197`, `229-230`
- The contact endpoint logs email-sending errors but does not otherwise store submissions.
- Long-term retention of these logs is not documented, and logs are not scrubbed of PII before being written.

## 6. No User Rights / Data Subject Mechanism

- There is no way for a user to:
  - request access to their data,
  - correct or delete their data,
  - export or port their data,
  - opt out of sale/sharing, or
  - withdraw consent.
- This affects compliance under GDPR, CCPA/CPRA, Virginia CDPA, Colorado CPA, and similar laws.

## 7. No CCPA / CPRA "Do Not Sell or Share" Opt-Out

- Because the site sends user data (e.g., page views, events, shipping info, identifiers) to Meta and Google, and customer data to Square/Printful, it should provide a clear "Do Not Sell or Share My Personal Information" link or equivalent opt-out if these transfers qualify as sale/sharing under CCPA/CPRA.
- No such link or signal handling exists.

## 8. Missing E-Commerce Disclosures

- The checkout flow does not present or require acceptance of:
  - return/refund policy,
  - shipping policy/delivery times,
  - taxes/fees breakdown,
  - business contact information, or
  - payment processor terms.
- The `/tg` page has a HowTo/Tracking section but no legally required consumer notices.
  - `src/app/tg/TGPageClient.tsx:208-247`

## 9. No Data Retention or Subprocessor Documentation

- No Privacy Policy means no disclosure of:
  - how long data is retained,
  - which subprocessors are used (Google, Meta, Square, Printful, Gmail, Sanity, etc.), or
  - what data is transferred to each.
- The `robots.txt` only blocks crawlers from `/api/`, `/component-gallery/`, and `/tg/`; it does not address legal pages.
  - `public/robots.txt:1-9`

## 10. No Consent for Local Storage / State Storage

- `CartContext` persists the cart to `localStorage` under the key `afungi_cart`. There is no cookie/storage consent notice or opt-out for this storage.
  - `src/components/CartContext.tsx:31-45`

## 11. Missing Accessibility / Privacy-By-Design Controls

- No user-facing controls to disable analytics/tracking.
- No "Privacy Settings" modal or footer link to legal pages.
- The navigation (`NavBar`, `MobileNavBar`) does not link to Privacy, Terms, or Cookie pages.
  - `src/components/NavBar.tsx:15-21`
  - `src/components/MobileNavBar.tsx:13-19`

## 12. Recommended Next Steps

1. Draft and publish a **Privacy Policy** at `/privacy` and link it in the footer/nav and on every data collection form.
2. Draft and publish **Terms of Service** and a **Refund/Shipping Policy**.
3. Implement a **cookie consent manager** that blocks Google Analytics and Meta Pixel until consent is obtained, and honors GPC/Do Not Sell signals.
4. Add a **consent checkbox** to the contact form with a link to the Privacy Policy before submission.
5. Scrub PII from server logs or define a retention policy that limits PII logging.
6. Add a **"Do Not Sell or Share My Personal Information"** link/opt-out mechanism.
7. Provide a process for users to exercise access, deletion, and correction rights.
8. Document all subprocessors and data transfers in the Privacy Policy.
9. Review and update `robots.txt` and sitemap to include the new legal pages.

---

## A. Compliance Documentation Sources

Use the resources below to draft the legal pages, consent mechanisms, and disclosures referenced in this gap analysis. **These are official guidance documents and regulatory texts, not legal templates; consult a privacy/compliance attorney before finalizing.**

### Privacy Policy / Legal Page Guidance

- **California Attorney General - Privacy Policy Guidance**
  - https://oag.ca.gov/privacy/privacy-policy
- **FTC - Privacy & Security Basics for Business**
  - https://www.ftc.gov/business-guidance/resources/start-security-guide-business
- **FTC - Disclosures 101 for Social Media Influencers** (also useful for data-use disclosures)
  - https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers

### E-Commerce / Consumer Protection

- **FTC - Mail, Internet, or Telephone Order Merchandise Rule**
  - https://www.ftc.gov/business-guidance/resources/mail-internet-or-telephone-order-merchandise-rule
- **FTC - Business Guide to the FTC's Mail, Internet, or Telephone Order Merchandise Rule**
  - https://www.ftc.gov/business-guidance/blog/2014/03/business-guide-ftcs-mail-or-telephone-order-merchandise-rule
- **PCI Security Standards Council - PCI DSS Overview**
  - https://www.pcisecuritystandards.org/pci_security/
- **Square - Seller Terms of Service / Privacy Notice** (link in checkout/disclosures)
  - https://squareup.com/us/en/legal/general
- **Printful - Privacy Notice / Data Processing Addendum**
  - https://www.printful.com/policies/privacy

### GDPR / European Data Protection

- **GDPR (Regulation (EU) 2016/679) - Full Text**
  - https://gdpr-info.eu/
- **GDPR - Article 6 (Lawfulness of Processing)**
  - https://gdpr-info.eu/art-6-gdpr/
- **GDPR - Chapter III (Rights of the Data Subject)**
  - https://gdpr-info.eu/chapter-3/
- **GDPR - Article 28 (Processor / Subprocessor Requirements)**
  - https://gdpr-info.eu/art-28-gdpr/
- **ICO (UK) - Guide to the UK GDPR**
  - https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-uk-gdpr/
- **ICO - Cookies and similar technologies**
  - https://ico.org.uk/for-organisations/guide-to-pecr/cookies-and-similar-technologies/
- **EU Standard Contractual Clauses (SCCs) for Processors**
  - https://commission.europa.eu/standard-contractual-clauses-controllers-and-processors-eu_en

### Cookie Consent / Tracking Consent

- **Cookiebot/CookieYes - Cookie consent best practices** (vendor-agnostic overview)
  - https://www.cookiebot.com/en/gdpr-cookies/
- **IAB Europe - Transparency & Consent Framework (TCF) Policy**
  - https://iabeurope.eu/tcf-2-2-policies/
- **Global Privacy Control (GPC) - Specification**
  - https://globalprivacycontrol.org/spec
- **California - Global Privacy Control signal guidance (OPPA / CPPA)**
  - https://cppa.ca.gov/regulations/

### U.S. State Privacy Laws (CCPA / CPRA / CDPA / CPA)

- **CCPA (California Consumer Privacy Act) - Full Text**
  - https://oag.ca.gov/privacy/ccpa
- **CPRA (California Privacy Rights Act) Regulations**
  - https://cppa.ca.gov/regulations/
- **CPPA - Do Not Sell or Share My Personal Information regulations**
  - https://cppa.ca.gov/regulations/
- **Virginia CDPA (Consumer Data Protection Act)**
  - https://law.lis.virginia.gov/vacode/title59.1/chapter53/
- **Colorado CPA (Colorado Privacy Act) Rules**
  - https://coag.gov/resources/colorado-privacy-act/
- **NIST - Privacy Framework** (cross-jurisdictional control mapping)
  - https://www.nist.gov/privacy-framework

### Email / Contact Form Compliance

- **FTC - CAN-SPAM Act Compliance Guide for Business**
  - https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
- **GDPR - Article 7 (Conditions for Consent)**
  - https://gdpr-info.eu/art-7-gdpr/

### Accessibility

- **WCAG 2.1 (Web Content Accessibility Guidelines)**
  - https://www.w3.org/WAI/WCAG21/Understanding/
- **W3C - Accessibility Fundamentals Overview**
  - https://www.w3.org/WAI/fundamentals/
- **ADA.gov - Introduction to Web Accessibility**
  - https://www.ada.gov/resources/web-guidance/

### Logging, Security & Data Retention

- **NIST SP 800-53 Rev. 5 - Audit and Accountability / Media Protection**
  - https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final
- **CISA - Logging Made Easy / Best Practices**
  - https://www.cisa.gov/resources-tools/services/logging-made-easy
- **GDPR - Article 5(1)(e) (Storage Limitation)**
  - https://gdpr-info.eu/art-5-gdpr/

### Subprocessor / Third-Party Transfer Documentation

- **Google - Business Data Controller Terms / SCCs**
  - https://business.safety.google/privacyeadscontrollerterms/
- **Meta - Data Processing Terms**
  - https://www.facebook.com/legal/terms/dataprocessing
- **Google Analytics - Terms of Service & Data Processing Terms**
  - https://marketingplatform.google.com/about/analytics/terms/us/
- **Sanity - Data Processing Addendum**
  - https://www.sanity.io/legal/dpa
- **Resend (email) - Privacy Policy / DPA**
  - https://resend.com/legal/privacy-policy

### Useful Generators / Checklists (Non-Legal Templates)

- **GDPR.eu - Privacy Policy Template**
  - https://gdpr.eu/privacy-policy/
- **TermsFeed - Privacy Policy / Terms & Conditions generators** (review with counsel)
  - https://www.termsfeed.com/
- **CookieYes - Cookie Policy Generator**
  - https://www.cookieyes.com/cookie-policy-generator/
- **FTC - Small Business Cybersecurity Planner**
  - https://www.cisa.gov/sites/default/files/2023-06/FCC-Small-Biz-Cyber-Planner-v2.pdf
