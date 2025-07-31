#!/usr/bin/env node

/**
 * Test script to verify cron job setup and API connectivity
 * Usage: node scripts/test-cron-setup.js
 */

import https from 'https';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const SQUARE_POLL_KEY = process.env.SQUARE_POLL_KEY;

async function testEndpoint(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.request(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, data });
      });
    });
    
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('Testing cron job setup...\n');
  
  // Test 1: Check environment variables
  console.log('1. Environment Variables:');
  console.log(`   BASE_URL: ${BASE_URL}`);
  console.log(`   SQUARE_POLL_KEY: ${SQUARE_POLL_KEY ? '✓ Set' : '✗ Missing'}`);
  console.log(`   SQUARE_ACCESS_TOKEN: ${process.env.SQUARE_ACCESS_TOKEN ? '✓ Set' : '✗ Missing'}`);
  console.log(`   PRINTFUL_API_KEY: ${process.env.PRINTFUL_API_KEY ? '✓ Set' : '✗ Missing'}`);
  console.log('');
  
  // Test 2: Test Square products endpoint
  console.log('2. Testing Square Products API:');
  try {
    const productsRes = await testEndpoint(`${BASE_URL}/api/square-products`);
    console.log(`   Status: ${productsRes.status}`);
    if (productsRes.status === 200) {
      const data = JSON.parse(productsRes.data);
      console.log(`   Products: ${data.products?.length || 0}`);
      console.log(`   Variant mappings: ${Object.keys(data.variationToPrintful || {}).length}`);
    } else {
      console.log(`   Error: ${productsRes.data}`);
    }
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }
  console.log('');
  
  // Test 3: Test poll-square endpoint (without token)
  console.log('3. Testing Poll-Square API (without token):');
  try {
    const pollRes = await testEndpoint(`${BASE_URL}/api/poll-square`);
    console.log(`   Status: ${pollRes.status}`);
    if (pollRes.status === 401) {
      console.log('   ✓ Correctly requires authentication');
    } else {
      console.log(`   ⚠ Unexpected status: ${pollRes.status}`);
    }
  } catch (error) {
    console.log(`   Error: ${error.message}`);
  }
  console.log('');
  
  // Test 4: Test poll-square endpoint (with token)
  if (SQUARE_POLL_KEY) {
    console.log('4. Testing Poll-Square API (with token):');
    try {
      const pollRes = await testEndpoint(`${BASE_URL}/api/poll-square?token=${SQUARE_POLL_KEY}`);
      console.log(`   Status: ${pollRes.status}`);
      if (pollRes.status === 200) {
        const data = JSON.parse(pollRes.data);
        console.log(`   Processed: ${data.processed || 0} orders`);
        console.log(`   Errors: ${data.errors?.length || 0}`);
        console.log(`   Cache size: ${data.cacheSize || 0}`);
      } else {
        console.log(`   Error: ${pollRes.data}`);
      }
    } catch (error) {
      console.log(`   Error: ${error.message}`);
    }
    console.log('');
  }
  
  // Test 5: Check if cron script exists and is executable
  console.log('5. Cron Script Check:');
  const fs = await import('fs');
  const path = await import('path');
  
  const scriptPath = path.join(process.cwd(), 'scripts', 'process-orders-cron.sh');
  try {
    const stats = fs.statSync(scriptPath);
    console.log(`   Script exists: ✓`);
    console.log(`   Executable: ${(stats.mode & fs.constants.S_IXUSR) ? '✓' : '✗'}`);
  } catch {
    console.log(`   Script missing: ✗`);
  }
  console.log('');
  
  // Summary
  console.log('Summary:');
  if (!SQUARE_POLL_KEY) {
    console.log('   ⚠ SQUARE_POLL_KEY is required for cron job authentication');
  }
  if (!process.env.SQUARE_ACCESS_TOKEN) {
    console.log('   ⚠ SQUARE_ACCESS_TOKEN is required for Square API access');
  }
  if (!process.env.PRINTFUL_API_KEY) {
    console.log('   ⚠ PRINTFUL_API_KEY is required for Printful API access');
  }
  
  console.log('\nTo set up cron job, run:');
  console.log('crontab -e');
  console.log('Then add:');
  console.log('*/5 * * * * /path/to/your/project/scripts/process-orders-cron.sh');
}

main().catch(console.error); 