#!/usr/bin/env node

/**
 * Inject Vercel environment variables into Angular environment files
 * This runs during Vercel build to replace placeholders with actual values
 */

const fs = require('fs');
const path = require('path');

// Get the API key from Vercel environment variable
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('❌ ERROR: GEMINI_API_KEY environment variable is not set!');
  console.error('Please add it in Vercel Dashboard → Settings → Environment Variables');
  process.exit(1);
}

console.log('✅ Found GEMINI_API_KEY environment variable');

// Files to update
const files = [
  path.join(__dirname, '../src/environments/environment.ts'),
  path.join(__dirname, '../src/environments/environment.prod.ts')
];

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File not found: ${filePath}`);
    return;
  }

  // Read the file
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace the placeholder with actual API key
  const updatedContent = content.replace('__GEMINI_API_KEY__', apiKey);

  // Write back
  fs.writeFileSync(filePath, updatedContent, 'utf8');

  console.log(`✅ Injected API key into: ${path.basename(filePath)}`);
});

console.log('🚀 Environment variables injected successfully!');
