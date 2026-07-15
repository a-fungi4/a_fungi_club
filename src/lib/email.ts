import nodemailer from 'nodemailer';

const STORE_NAME = 'A Fungi Club';
const OWNER_EMAIL = 'khaled@b8momani.com';

export interface OrderEmailItem {
  name: string;
  variation?: string;
  quantity: number;
  price: number; // dollars
}

export interface OrderConfirmationArgs {
  to: string;
  orderId: string;
  items: OrderEmailItem[];
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  shippingLabel?: string;
  recipient: {
    name: string;
    address1?: string;
    address2?: string;
    city?: string;
    state_code?: string;
    zip: string;
    country_code?: string;
  };
}

const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;

function transport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
  });
}

/** Email a one-time code for checking order status. Never throws. */
export async function sendOtpEmail(to: string, otp: string): Promise<boolean> {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS || !to) return false;
  try {
    await transport().sendMail({
      from: `${STORE_NAME} <${process.env.GMAIL_USER}>`,
      to,
      subject: `Your ${STORE_NAME} order-status code: ${otp}`,
      text: `Your one-time code to view your order status is: ${otp}\n\nIt expires in 10 minutes. If you didn't request this, you can ignore this email.`,
      html: `<div style="font-family:Arial,sans-serif;max-width:420px;margin:0 auto;color:#151029;">
        <p>Your one-time code to view your order status:</p>
        <p style="font-size:28px;font-weight:bold;letter-spacing:4px;color:#2DA9E1;">${otp}</p>
        <p style="font-size:13px;color:#666;">Expires in 10 minutes. If you didn't request this, ignore this email.</p>
      </div>`,
    });
    return true;
  } catch (err) {
    console.error('Failed to send OTP email:', err);
    return false;
  }
}

/**
 * Send the customer an order confirmation email (and BCC the owner).
 * Never throws — email failures must not affect a completed order.
 */
export async function sendOrderConfirmation(args: OrderConfirmationArgs): Promise<boolean> {
  const { to, orderId, items, subtotalCents, shippingCents, taxCents, totalCents, shippingLabel, recipient } = args;

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.warn('Order email skipped: GMAIL_USER/GMAIL_PASS not configured');
    return false;
  }
  if (!to) {
    console.warn('Order email skipped: no recipient email');
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
  });

  const itemLines = items
    .map(
      (i) =>
        `  • ${i.name}${i.variation ? ` (${i.variation})` : ''} × ${i.quantity} — ${money(
          Math.round(i.price * 100) * i.quantity,
        )}`,
    )
    .join('\n');

  const address = [
    recipient.name,
    recipient.address1,
    recipient.address2,
    [recipient.city, recipient.state_code, recipient.zip].filter(Boolean).join(', '),
    recipient.country_code || 'US',
  ]
    .filter(Boolean)
    .join('\n');

  const text = `Thanks for your order, ${recipient.name}!

Order #${orderId}

Items:
${itemLines}

Subtotal: ${money(subtotalCents)}
Shipping${shippingLabel ? ` (${shippingLabel})` : ''}: ${money(shippingCents)}
${taxCents > 0 ? `Tax: ${money(taxCents)}\n` : ''}Total: ${money(totalCents)}

Shipping to:
${address}

Your order is fulfilled by Printful and typically ships in 7–15 days. Payments are processed by Square. All sales are final.

Thanks for supporting ${STORE_NAME}!`;

  const itemRows = items
    .map(
      (i) =>
        `<tr><td style="padding:4px 0;">${i.name}${
          i.variation ? ` <span style="color:#888;">(${i.variation})</span>` : ''
        } × ${i.quantity}</td><td style="padding:4px 0;text-align:right;">${money(
          Math.round(i.price * 100) * i.quantity,
        )}</td></tr>`,
    )
    .join('');

  const html = `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#151029;">
  <h2 style="color:#2DA9E1;">Thanks for your order, ${recipient.name}! 🍄</h2>
  <p>Order <strong>#${orderId}</strong> is confirmed.</p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    ${itemRows}
    <tr><td colspan="2"><hr style="border:none;border-top:1px solid #ddd;"></td></tr>
    <tr><td>Subtotal</td><td style="text-align:right;">${money(subtotalCents)}</td></tr>
    <tr><td>Shipping${shippingLabel ? ` (${shippingLabel})` : ''}</td><td style="text-align:right;">${money(shippingCents)}</td></tr>
    ${taxCents > 0 ? `<tr><td>Tax</td><td style="text-align:right;">${money(taxCents)}</td></tr>` : ''}
    <tr><td><strong>Total</strong></td><td style="text-align:right;"><strong>${money(totalCents)}</strong></td></tr>
  </table>
  <p style="font-size:13px;color:#555;"><strong>Shipping to:</strong><br>${address.replace(/\n/g, '<br>')}</p>
  <p style="font-size:12px;color:#888;">Fulfilled by Printful (typically ships in 7–15 days). Payments processed by Square. All sales are final.</p>
</div>`;

  try {
    await transporter.sendMail({
      from: `${STORE_NAME} <${process.env.GMAIL_USER}>`,
      to,
      bcc: OWNER_EMAIL,
      subject: `Your ${STORE_NAME} order is confirmed 🍄`,
      text,
      html,
    });
    return true;
  } catch (err) {
    console.error('Failed to send order confirmation email:', err);
    return false;
  }
}
