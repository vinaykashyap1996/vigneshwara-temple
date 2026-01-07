// Test script to verify environment variables
require('dotenv').config({ path: '.env.local' });

console.log('\n🔍 Environment Variables Test:\n');
console.log(
  'PANCHANG_CLIENT_ID:',
  process.env.PANCHANG_CLIENT_ID || '❌ NOT SET'
);
console.log(
  'PANCHANG_CLIENT_SECRET:',
  process.env.PANCHANG_CLIENT_SECRET ? '✅ SET' : '❌ NOT SET'
);
console.log('PANCHANG_SANDBOX:', process.env.PANCHANG_SANDBOX || 'false');
console.log('\n');
