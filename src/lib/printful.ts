import zipcodes from 'zipcodes';

const PRINTFUL_API = 'https://api.printful.com';
const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
const PRINTFUL_STORE_ID = Number(process.env.PRINTFUL_STORE_ID || 0) || undefined;

export interface Recipient {
  name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state_code?: string;
  country_code?: string;
  zip: string;
  phone?: string;
  email?: string;
}

/**
 * A line item is referenced by the SYNCED product's external variant id — which
 * is the Square variation id. Printful resolves it to the synced store product,
 * so the design / print files are attached automatically. No catalog variant id,
 * template id, or SKU parsing is needed (and we never touch the SKU, so the
 * Square↔Printful product sync stays intact).
 */
export interface PrintfulLineItem {
  externalVariantId: string; // = Square variation id
  quantity: number;
  name?: string;
  retail_price?: string;
}

export interface ShippingRate {
  id: string;
  name: string;
  rate: string; // decimal string, e.g. "4.99"
  currency: string;
  minDeliveryDays?: number;
  maxDeliveryDays?: number;
}

function authHeaders(): Record<string, string> {
  if (!PRINTFUL_API_KEY) throw new Error('PRINTFUL_API_KEY not set');
  return {
    Authorization: `Bearer ${PRINTFUL_API_KEY}`,
    'Content-Type': 'application/json',
  };
}

/**
 * Fill in state_code / city from the ZIP when the client only supplies a ZIP.
 * Printful's shipping endpoint needs at least country + state + zip.
 */
export function resolveRecipient(recipient: Recipient): Recipient {
  const out: Recipient = { ...recipient, country_code: recipient.country_code || 'US' };
  if (out.zip && (!out.state_code || !out.city)) {
    const lookup = zipcodes.lookup(out.zip);
    if (!lookup) throw new Error('Invalid ZIP code');
    out.state_code = out.state_code || lookup.state;
    out.city = out.city || lookup.city;
  }
  return out;
}

/** Return every Printful shipping option for the given items + destination. */
export async function getShippingRates(
  items: PrintfulLineItem[],
  recipient: Recipient,
): Promise<ShippingRate[]> {
  const res = await fetch(`${PRINTFUL_API}/shipping/rates`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      store_id: PRINTFUL_STORE_ID,
      recipient,
      items: items.map((i) => ({ external_variant_id: i.externalVariantId, quantity: i.quantity })),
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.result || data?.error?.message || 'Printful shipping error');
  }
  const rates = data.result;
  if (!Array.isArray(rates) || rates.length === 0) {
    throw new Error('No shipping rates available for this address');
  }
  return rates.map(
    (r: {
      id: string;
      name: string;
      rate: string;
      currency: string;
      minDeliveryDays?: number;
      maxDeliveryDays?: number;
    }) => ({
      id: r.id,
      name: r.name,
      rate: String(r.rate),
      currency: r.currency || 'USD',
      minDeliveryDays: r.minDeliveryDays,
      maxDeliveryDays: r.maxDeliveryDays,
    }),
  );
}

/**
 * Returns true if a Printful order with this external_id already exists.
 * Used for idempotency so retries / the webhook backup never double-create.
 */
export async function printfulOrderExists(externalId: string): Promise<boolean> {
  const url = `${PRINTFUL_API}/orders/@${encodeURIComponent(externalId)}${
    PRINTFUL_STORE_ID ? `?store_id=${PRINTFUL_STORE_ID}` : ''
  }`;
  const res = await fetch(url, { headers: authHeaders() });
  if (res.status === 404) return false;
  if (res.ok) return true;
  // On any other status, treat as "unknown" -> let caller attempt create.
  return false;
}

export interface PrintfulShipment {
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  shipDate?: string;
}

export interface PrintfulOrderStatus {
  found: boolean;
  status?: string; // draft | pending | inprocess | onhold | partial | fulfilled | canceled | failed
  shipments: PrintfulShipment[];
}

/** Look up a Printful order's fulfillment status + tracking by external id. */
export async function getPrintfulOrderStatus(externalId: string): Promise<PrintfulOrderStatus> {
  const url = `${PRINTFUL_API}/orders/@${encodeURIComponent(externalId)}${
    PRINTFUL_STORE_ID ? `?store_id=${PRINTFUL_STORE_ID}` : ''
  }`;
  const res = await fetch(url, { headers: authHeaders() });
  if (res.status === 404) return { found: false, shipments: [] };
  const data = await res.json();
  if (!res.ok) return { found: false, shipments: [] };
  const r = data.result || {};
  const shipments: PrintfulShipment[] = (r.shipments || []).map(
    (s: { carrier?: string; tracking_number?: string; tracking_url?: string; ship_date?: string }) => ({
      carrier: s.carrier,
      trackingNumber: s.tracking_number,
      trackingUrl: s.tracking_url,
      shipDate: s.ship_date,
    }),
  );
  return { found: true, status: r.status, shipments };
}

export interface CreateOrderArgs {
  externalId: string;
  recipient: Recipient;
  items: PrintfulLineItem[];
  /** When true, Printful charges your wallet and fulfills immediately. */
  confirm?: boolean;
}

/** Create a Printful order (draft by default; confirm to auto-fulfill). */
export async function createPrintfulOrder(args: CreateOrderArgs): Promise<unknown> {
  const { externalId, recipient, items, confirm } = args;
  const payload = {
    external_id: externalId,
    store_id: PRINTFUL_STORE_ID,
    confirm: Boolean(confirm),
    recipient: {
      name: recipient.name || '',
      address1: recipient.address1 || '',
      address2: recipient.address2 || '',
      city: recipient.city || '',
      state_code: recipient.state_code || '',
      country_code: recipient.country_code || 'US',
      zip: recipient.zip,
      phone: recipient.phone || '',
      email: recipient.email || '',
    },
    items: items.map((i) => ({
      external_variant_id: i.externalVariantId,
      quantity: i.quantity,
      ...(i.name ? { name: i.name } : {}),
      ...(i.retail_price ? { retail_price: i.retail_price } : {}),
    })),
  };
  const res = await fetch(`${PRINTFUL_API}/orders`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(
      typeof data?.result === 'string' ? data.result : JSON.stringify(data?.result || data),
    );
  }
  return data.result;
}
