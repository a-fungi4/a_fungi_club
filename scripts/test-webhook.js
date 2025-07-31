#!/usr/bin/env node

/**
 * Test script to simulate Square webhook events
 * Usage: node scripts/test-webhook.js
 */

import https from 'https';
import http from 'http';

// Test webhook payload
const testPayload = {
  type: 'payment.updated',
  data: {
    object: {
      payment: {
        id: 'test_payment_id',
        status: 'COMPLETED',
        orderId: 'test_order_id',
        amountMoney: {
          amount: 2500,
          currency: 'USD'
        }
      },
      order: {
        id: 'test_order_id',
        note: JSON.stringify({
          recipient: {
            name: 'John Doe',
            address1: '123 Test St',
            city: 'Test City',
            state: 'CA',
            country: 'US',
            zip: '90210',
            email: 'test@example.com'
          },
          items: [
            {
              id: 'test_variation_id',
              name: 'Test Product',
              quantity: 1,
              price: 25.00,
              variation: 'Red / Medium',
              printfulVariantId: '12345'
            }
          ]
        })
      }
    }
  }
};

async function testWebhook(url, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 3000),
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'x-square-signature': 'test.signature' // Mock signature for testing
      }
    };

    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log('Response:', responseData);
        resolve({ status: res.statusCode, data: responseData });
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function main() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const webhookUrl = `${baseUrl}/api/square-webhook`;
  const testUrl = `${baseUrl}/api/square-webhook/test`;
  
  console.log('Testing Square webhook integration...\n');
  
  try {
    // Test the test endpoint first
    console.log('1. Testing webhook test endpoint...');
    await testWebhook(testUrl, testPayload);
    console.log('\n');
    
    // Test the main webhook endpoint
    console.log('2. Testing main webhook endpoint...');
    await testWebhook(webhookUrl, testPayload);
    
  } catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test if this file is executed directly
main().catch(console.error);

export { testWebhook, testPayload }; 