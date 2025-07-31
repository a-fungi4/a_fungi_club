import crypto from 'crypto';

/**
 * Verify Square webhook signature
 * @param body - Raw request body
 * @param signature - Signature from x-square-signature header
 * @param webhookUrl - The webhook URL (used in signature verification)
 * @returns boolean indicating if signature is valid
 */
export function verifyWebhookSignature(
  body: string,
  signature: string | null,
  webhookUrl: string
): boolean {
  if (!signature) {
    console.warn('No signature provided in webhook request');
    return false;
  }

  const webhookSecret = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  if (!webhookSecret) {
    console.warn('SQUARE_WEBHOOK_SIGNATURE_KEY not configured');
    return false;
  }

  try {
    // Square webhook signature format: {timestamp}.{signature}
    const [timestamp, expectedSignature] = signature.split('.');
    
    if (!timestamp || !expectedSignature) {
      console.warn('Invalid signature format');
      return false;
    }

    // Create the signature string
    const signatureString = `${webhookUrl}${body}${timestamp}`;
    
    // Generate HMAC-SHA256 hash
    const hmac = crypto.createHmac('sha256', webhookSecret);
    hmac.update(signatureString);
    const calculatedSignature = hmac.digest('hex');
    
    // Compare signatures
    const isValid = crypto.timingSafeEqual(
      Buffer.from(calculatedSignature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
    
    if (!isValid) {
      console.warn('Signature verification failed');
    }
    
    return isValid;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
} 