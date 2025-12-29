#!/usr/bin/env node

/**
 * Inject Vercel environment variables into Angular environment files
 * This runs during Vercel build to create environment files with actual values
 */

const fs = require('fs');
const path = require('path');

// Get the API key from Vercel environment variable
const apiKey = process.env.GEMINI_API_KEY || '';

if (!apiKey) {
  console.warn('⚠️  WARNING: GEMINI_API_KEY environment variable is not set!');
  console.warn('Chatbot will use fallback responses instead of AI.');
}

console.log('✅ Creating environment files...');

// Environment file templates
const envContent = `export const environment = {
  production: false,
  geminiApiKey: '${apiKey}'
};
`;

const envProdContent = `export const environment = {
  production: true,
  geminiApiKey: '${apiKey}'
};
`;

// Ensure environments directory exists
const envDir = path.join(__dirname, '../src/environments');
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

// Create environment files
const envPath = path.join(envDir, 'environment.ts');
const envProdPath = path.join(envDir, 'environment.prod.ts');

fs.writeFileSync(envPath, envContent, 'utf8');
console.log(`✅ Created: environment.ts`);

fs.writeFileSync(envProdPath, envProdContent, 'utf8');
console.log(`✅ Created: environment.prod.ts`);

console.log('🚀 Environment files created successfully!');
