import zipcodes from 'zipcodes';

const PRINTFUL_API = 'https://api.printful.com';
const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
const PRINTFUL_STORE_ID = Number(process.env.PRINTFUL_STORE_ID || 0) || undefined;

// How the SKU maps to Printful. Two supported shapes:
//   • Template-based (recommended for your store): SKU = "PF-<catalogVariantId>-T<templateId>".
//     Orders send { variant_id, product_template_id } and Printful attaches the
//     template's artwork automatically. Shipping/estimates send the catalog variant_id.
//   • Sync-based: SKU = "PF-<syncVariantId>" (no -T). Orders/shipping send
//     sync_variant_id (default), or variant_id if PRINTFUL_ID_TYPE=catalog.
const PF_ID_FIELD: 'sync_variant_id' | 'variant_id' =
  process.env.PRINTFUL_ID_TYPE === 'catalog' ? 'variant_id' : 'sync_variant_id';

/**
 * Build one Printful line item. When a templateId is present the item is
 * catalog-based (variant_id) and the template supplies the print files (only on
 * orders — shipping/estimate don't take product_template_id).
 */
function pfItem(item: PrintfulLineItem, opts: { forOrder?: boolean } = {}) {
  const { variant_id, quantity, templateId, name, retail_price } = item;
  if (templateId != null) {
    return {
      variant_id,
      quantity,
      ...(opts.forOrder ? { product_template_id: templateId, name, retail_price } : {}),
    };
  }
  return {
    [PF_ID_FIELD]: variant_id,
    quantity,
    ...(opts.forOrder ? { name, retail_price } : {}),
  };
}

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

export interface PrintfulLineItem {
  /** Catalog variant id (with templateId) or sync variant id (without). */
  variant_id: number;
  quantity: number;
  /** Printful product template id — when set, its artwork is applied on orders. */
  templateId?: number;
  retail_price?: string;
  name?: string;
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
 * Printful's shipping & tax endpoints need at least country + state + zip.
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

// ── Template → variant matching (for GTIN-based auto-mapping) ─────────────
// When a Square variation carries the template id (in its GTIN/upc field), we
// resolve its Printful catalog variant by matching color + size.

const SIZE_ALIASES: Record<string, string> = {
  small: 's', medium: 'm', large: 'l',
  xlarge: 'xl', xxl: '2xl', xxxl: '3xl', xxxxl: '4xl',
  'x-large': 'xl', '2x-large': '2xl', '3x-large': '3xl', '4x-large': '4xl',
};

function norm(s: string | undefined | null): string {
  return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** Stable key for matching a (color, size) pair across Square and Printful. */
export function variantMatchKey(color?: string | null, size?: string | null): string {
  let sz = (size || '').toLowerCase().trim();
  sz = SIZE_ALIASES[sz] || sz;
  return `${norm(color)}|${norm(sz)}`;
}

const templateMapCache = new Map<number, { map: Record<string, number>; at: number }>();
const TEMPLATE_CACHE_MS = 10 * 60 * 1000;

/**
 * For a Printful product template, return { "color|size" -> catalog variant id }
 * for every variant the template can produce. Cached per template.
 */
export async function getTemplateVariantMap(templateId: number): Promise<Record<string, number>> {
  const cached = templateMapCache.get(templateId);
  if (cached && Date.now() - cached.at < TEMPLATE_CACHE_MS) return cached.map;

  const storeQ = PRINTFUL_STORE_ID ? `?store_id=${PRINTFUL_STORE_ID}` : '';
  const tplRes = await fetch(`${PRINTFUL_API}/product-templates/${templateId}${storeQ}`, {
    headers: authHeaders(),
  });
  const tplData = await tplRes.json();
  if (!tplRes.ok) {
    throw new Error(tplData?.result || tplData?.error?.message || 'Printful template error');
  }
  const available: number[] = tplData.result?.available_variant_ids || [];
  const catalogProductId: number = tplData.result?.product_id;
  const availSet = new Set(available);

  const prodRes = await fetch(`${PRINTFUL_API}/products/${catalogProductId}`, {
    headers: authHeaders(),
  });
  const prodData = await prodRes.json();
  if (!prodRes.ok) {
    throw new Error(prodData?.result || prodData?.error?.message || 'Printful catalog error');
  }
  const variants: Array<{ id: number; color?: string; size?: string }> =
    prodData.result?.variants || [];

  const map: Record<string, number> = {};
  for (const v of variants) {
    if (availSet.has(v.id)) map[variantMatchKey(v.color, v.size)] = v.id;
  }
  templateMapCache.set(templateId, { map, at: Date.now() });
  return map;
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
      items: items.map((i) => pfItem(i)),
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
    items: items.map((i) => pfItem(i, { forOrder: true })),
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
