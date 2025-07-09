# Square Webhook API Route

**Endpoint:** `/api/square-webhook`

This API route receives webhook POST requests from Square when a payment or order event occurs. It is responsible for:

1. Verifying the webhook signature (recommended for production)
2. Extracting the order note (which contains serialized cart data)
3. Using the cart data to create an order in Printful via their API
4. Responding to Square with a success or error message

## To Do
- Implement Square webhook signature verification
- Adjust the extraction of the order note based on the actual Square webhook payload structure
- Integrate with the Printful API to create orders
- Add logging and error handling as needed

## Registering the Webhook
Register this endpoint in your Square Developer Dashboard under Webhooks, using:

```
https://a-fungi.club/api/square-webhook
```

Select the events you want to listen for (e.g., `payment.created`, `payment.updated`). 