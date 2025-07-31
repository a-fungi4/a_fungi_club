# Square Webhook Integration

This webhook handler processes Square payment events and automatically creates orders in Printful.

## Setup Instructions

### 1. Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# Square API
SQUARE_ACCESS_TOKEN=your_square_access_token
SQUARE_LOCATION_ID=your_square_location_id
SQUARE_WEBHOOK_SIGNATURE_KEY=your_webhook_signature_key

# Printful API
PRINTFUL_API_KEY=your_printful_api_key
PRINTFUL_STORE_ID=your_printful_store_id

# App Configuration
NEXT_PUBLIC_BASE_URL=https://your-domain.com
SQUARE_CHECKOUT_REDIRECT_URL=https://your-domain.com/tg?order=success
```

### 2. Square Webhook Configuration

1. Go to your Square Developer Dashboard
2. Navigate to Webhooks
3. Create a new webhook with these settings:
   - **Event Types**: `payment.updated`
   - **URL**: `https://your-domain.com/api/square-webhook`
   - **Version**: Latest
4. Copy the webhook signature key and add it to your environment variables

### 3. Product Setup

Ensure your Square products have Printful variant IDs in their metadata:

1. Run the sync script to map Printful variants to Square variations:
   ```bash
   npm run sync-printful-to-square
   ```

2. Verify the mapping by checking the `/api/square-products` endpoint

## How It Works

### 1. Checkout Process

1. User adds items to cart (with Square variation IDs)
2. During checkout, the system:
   - Fetches the variant mapping from `/api/square-products`
   - Adds Printful variant IDs to cart items
   - Creates Square checkout with enhanced cart data in order note

### 2. Webhook Processing

When a payment is completed:

1. **Signature Verification**: Verifies the webhook signature for security
2. **Event Filtering**: Only processes `payment.updated` events with `COMPLETED` status
3. **Data Extraction**: Parses cart data from the order note
4. **Validation**: Validates shipping information and cart structure
5. **Printful Order Creation**: Creates order in Printful with:
   - Recipient information
   - Product variants and quantities
   - External reference (Square order ID)

### 3. Error Handling

The webhook includes comprehensive error handling:

- Invalid signatures return 401
- Missing or invalid data returns 400 with details
- Printful API errors return 500 with error details
- All errors are logged for debugging

## Testing

### Test Endpoint

Use the test endpoint to debug webhook data:

```bash
POST /api/square-webhook/test
```

This endpoint logs all webhook data without processing it, helping you verify:
- Webhook payload structure
- Cart data format
- Printful variant ID mapping

### Manual Testing

1. Create a test order through your checkout flow
2. Check the webhook logs in your server console
3. Verify the order appears in Printful dashboard
4. Check for any error messages or missing data

## Troubleshooting

### Common Issues

1. **Missing Printful Variant IDs**
   - Run the sync script to update Square product metadata
   - Check the variant mapping in `/api/square-products`

2. **Webhook Not Receiving Events**
   - Verify webhook URL is correct and accessible
   - Check Square webhook configuration
   - Ensure webhook signature key is set correctly

3. **Printful Order Creation Fails**
   - Verify Printful API key and store ID
   - Check that all required fields are present
   - Review Printful API error responses

4. **Signature Verification Fails**
   - Ensure `SQUARE_WEBHOOK_SIGNATURE_KEY` is set correctly
   - Verify webhook URL matches exactly
   - Check that the signature header is present

### Debugging

1. Check server logs for detailed error messages
2. Use the test endpoint to inspect webhook data
3. Verify environment variables are loaded correctly
4. Test Printful API connectivity separately

## Security Considerations

- Webhook signature verification is enabled by default
- All sensitive data is logged securely
- API keys are stored in environment variables
- Error messages don't expose sensitive information

## API Endpoints

- `POST /api/square-webhook` - Main webhook handler
- `POST /api/square-webhook/test` - Test endpoint for debugging
- `GET /api/square-products` - Product data with variant mapping
- `POST /api/square-checkout` - Creates Square checkout with enhanced cart data 