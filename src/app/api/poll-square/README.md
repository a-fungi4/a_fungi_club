# Square Order Processing with Cron Jobs

This system uses cron jobs to poll Square for new orders and automatically create them in Printful.

## How It Works

### 1. Order Flow
1. Customer completes checkout through Square
2. Order data (including cart items with Printful variant IDs) is stored in Square order note
3. Cron job polls Square API every few minutes for new completed orders
4. New orders are processed and sent to Printful automatically
5. Processed order IDs are cached to prevent duplicates

### 2. Data Processing
- **Primary Method**: Uses cart data from order note (includes Printful variant IDs)
- **Fallback Method**: Uses Square line items and maps to Printful variants
- **Validation**: Ensures all required shipping information is present
- **Error Handling**: Logs errors and continues processing other orders

## Setup Instructions

### 1. Environment Variables

Add these to your `.env.local` file:

```bash
# Square API
SQUARE_ACCESS_TOKEN=your_square_access_token
SQUARE_LOCATION_ID=your_square_location_id
SQUARE_POLL_KEY=your_secret_poll_key

# Printful API
PRINTFUL_API_KEY=your_printful_api_key
PRINTFUL_STORE_ID=your_printful_store_id

# App Configuration
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### 2. Product Setup

Ensure your Square products have Printful variant IDs:

```bash
npm run sync-printful-to-square
```

### 3. Cron Job Configuration

#### Option A: System Cron (Recommended)

Add to your crontab (`crontab -e`):

```bash
# Process orders every 5 minutes
*/5 * * * * /path/to/your/project/scripts/process-orders-cron.sh

# Sync products daily at 2 AM
0 2 * * * /path/to/your/project/scripts/sync_printful_to_square_cron.sh
```

#### Option B: Using npm scripts

```bash
# Manual processing
npm run process-orders

# Manual product sync
npm run sync-printful-to-square
```

### 4. Logging

The cron job logs to `sync_cron.log` in your project root:

```bash
tail -f sync_cron.log
```

## API Endpoints

### `GET /api/poll-square?token=<SQUARE_POLL_KEY>`

Polls Square for new orders and processes them.

**Security**: Requires `SQUARE_POLL_KEY` token for authentication.

**Response**:
```json
{
  "processed": 2,
  "errors": [],
  "printfulResponses": [...],
  "cacheSize": 150
}
```

## Configuration Options

### Polling Interval

The system polls for orders updated in the last 5 minutes. You can adjust this in the code:

```typescript
const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
```

### Cache Management

Processed order IDs are cached in `/tmp/printful-orders-cache.json` to prevent duplicates.

To clear the cache:
```bash
rm /tmp/printful-orders-cache.json
```

## Testing

### Manual Testing

1. Create a test order through your checkout flow
2. Run the processing manually:
   ```bash
   npm run process-orders
   ```
3. Check the logs for processing results
4. Verify the order appears in Printful dashboard

### API Testing

Test the endpoint directly:

```bash
curl "https://your-domain.com/api/poll-square?token=your_poll_key"
```

## Troubleshooting

### Common Issues

1. **No Orders Processed**
   - Check if orders are in "COMPLETED" state
   - Verify the polling time window (last 5 minutes)
   - Check if orders have shipping information

2. **Missing Printful Variant IDs**
   - Run the sync script: `npm run sync-printful-to-square`
   - Check the variant mapping in `/api/square-products`

3. **Authentication Errors**
   - Verify `SQUARE_POLL_KEY` is set correctly
   - Check `SQUARE_ACCESS_TOKEN` is valid

4. **Printful API Errors**
   - Verify `PRINTFUL_API_KEY` and `PRINTFUL_STORE_ID`
   - Check Printful API status
   - Review error details in logs

### Debugging

1. **Check Logs**:
   ```bash
   tail -f sync_cron.log
   ```

2. **Test API Endpoint**:
   ```bash
   curl -v "https://your-domain.com/api/poll-square?token=your_poll_key"
   ```

3. **Verify Product Mapping**:
   ```bash
   curl "https://your-domain.com/api/square-products"
   ```

4. **Check Cache**:
   ```bash
   cat /tmp/printful-orders-cache.json
   ```

## Monitoring

### Health Checks

Monitor the cron job execution:

```bash
# Check if cron is running
ps aux | grep process-orders-cron

# Check recent logs
tail -20 sync_cron.log

# Check cache size
wc -l /tmp/printful-orders-cache.json
```

### Alerts

Set up monitoring for:
- Cron job failures
- High error rates
- No orders processed for extended periods
- Printful API errors

## Security Considerations

- `SQUARE_POLL_KEY` should be a strong, unique token
- API endpoints are protected by token authentication
- Sensitive data is logged securely
- Cache file permissions should be restricted

## Performance

- Polling every 5 minutes provides good balance of responsiveness and API usage
- Cache prevents duplicate processing
- Error handling ensures one bad order doesn't stop processing
- Logging helps with debugging and monitoring 