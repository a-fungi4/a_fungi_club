import { SquareClient, SquareEnvironment, type Square } from 'square';

export const squareClient = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN!,
  environment:
    process.env.SQUARE_ENVIRONMENT === 'production'
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
});

export interface CalcLineItem {
  /** Square catalog variation id. */
  catalogObjectId: string;
  quantity: number;
}

// Cache the seller's enabled tax ids briefly so we don't list the catalog on
// every quote request.
let taxCache: { ids: string[]; at: number } | null = null;
const TAX_CACHE_MS = 5 * 60 * 1000;

/** Ids of the enabled sales taxes the seller has configured in Square. */
export async function getEnabledTaxIds(): Promise<string[]> {
  if (taxCache && Date.now() - taxCache.at < TAX_CACHE_MS) return taxCache.ids;
  const ids: string[] = [];
  const page = await squareClient.catalog.list({ types: 'TAX' });
  for await (const obj of page as AsyncIterable<{ id: string; type: string; taxData?: { enabled?: boolean } }>) {
    if (obj.type === 'TAX' && obj.taxData?.enabled) ids.push(obj.id);
  }
  taxCache = { ids, at: Date.now() };
  return ids;
}

/**
 * Ask Square to compute tax for an order (subtotal + shipping) shipped to the
 * given address, applying whatever sales-tax rules the seller has configured in
 * their Square account (auto_apply_taxes). Returns tax in cents.
 *
 * NB: Square only returns tax if the seller has set up tax rate(s) in the Square
 * Dashboard and they auto-apply; there is no built-in destination-based US tax.
 */
export async function calculateSquareTaxCents(
  lineItems: CalcLineItem[],
  shippingCents: number,
  recipient: {
    name?: string;
    address1?: string;
    city?: string;
    state_code?: string;
    country_code?: string;
    zip: string;
  },
): Promise<number> {
  const orderLineItems: Square.OrderLineItem[] = lineItems.map((li) => ({
    catalogObjectId: li.catalogObjectId,
    quantity: String(li.quantity),
  }));
  if (shippingCents > 0) {
    orderLineItems.push({
      name: 'Shipping',
      quantity: '1',
      basePriceMoney: { amount: BigInt(shippingCents), currency: 'USD' },
    });
  }

  const taxIds = await getEnabledTaxIds();
  if (taxIds.length === 0) return 0; // seller hasn't configured any tax

  const res = await squareClient.orders.calculate({
    order: {
      locationId: process.env.SQUARE_LOCATION_ID!,
      lineItems: orderLineItems,
      // Apply the seller's configured taxes explicitly (auto_apply_taxes alone
      // does not reliably attach catalog taxes via the API).
      taxes: taxIds.map((id) => ({ catalogObjectId: id, scope: 'ORDER' as const })),
      fulfillments: [
        {
          type: 'SHIPMENT',
          state: 'PROPOSED',
          shipmentDetails: {
            recipient: {
              displayName: recipient.name || 'Customer',
              address: {
                addressLine1: recipient.address1 || 'N/A',
                locality: recipient.city,
                administrativeDistrictLevel1: recipient.state_code,
                postalCode: recipient.zip,
                country: (recipient.country_code || 'US') as Square.Country,
              },
            },
          },
        },
      ],
    },
  });

  const amount = res.order?.totalTaxMoney?.amount;
  return amount != null ? Number(amount) : 0;
}
