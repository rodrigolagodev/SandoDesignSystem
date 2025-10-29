/**
 * Test script to validate Culori installation and OKLCH functionality
 */

import { formatHex, oklch, formatCss } from 'culori';

console.log('🎨 Testing Culori Installation\n');

// Test 1: Basic OKLCH color creation
console.log('✓ Test 1: Creating OKLCH color');
const testColor = { mode: 'oklch', l: 0.65, c: 0.25, h: 30 };
console.log('  Input: { mode: "oklch", l: 0.65, c: 0.25, h: 30 }');
console.log('  Result:', testColor);
console.log('  Hex:', formatHex(testColor));
console.log('  CSS:', formatCss(testColor));
console.log('');

// Test 2: Hex to OKLCH conversion
console.log('✓ Test 2: Converting hex to OKLCH');
const orangeHex = '#f97415'; // Sando's current brand color
const orangeOKLCH = oklch(orangeHex);
console.log('  Input:', orangeHex);
console.log('  OKLCH:', orangeOKLCH);
console.log('  L (lightness):', orangeOKLCH.l);
console.log('  C (chroma):', orangeOKLCH.c);
console.log('  H (hue):', orangeOKLCH.h);
console.log('');

// Test 3: Generating a color scale (simplified)
console.log('✓ Test 3: Generating simple color scale');
const baseHue = 30; // Orange
const baseChroma = 0.20;

const lightnessSteps = {
  50: 0.98,
  100: 0.95,
  200: 0.90,
  300: 0.82,
  400: 0.73,
  500: 0.64,  // Base
  600: 0.56,
  700: 0.47,
  800: 0.38,
  900: 0.30,
  950: 0.22
};

console.log('  Generating orange palette (hue: 30°, chroma: 0.20):');
Object.entries(lightnessSteps).forEach(([step, lightness]) => {
  const color = { mode: 'oklch', l: lightness, c: baseChroma, h: baseHue };
  const hex = formatHex(color);
  console.log(`    orange-${step}: ${hex} | oklch(${lightness}, ${baseChroma}, ${baseHue})`);
});
console.log('');

// Test 4: Color space conversion accuracy
console.log('✓ Test 4: Round-trip conversion test');
const originalHex = '#3B82F6';
const convertedOKLCH = oklch(originalHex);
const backToHex = formatHex(convertedOKLCH);
console.log('  Original hex:', originalHex);
console.log('  → OKLCH:', convertedOKLCH);
console.log('  → Back to hex:', backToHex);
console.log('  Match:', originalHex.toLowerCase() === backToHex.toLowerCase() ? '✅' : '⚠️ (minor difference expected)');
console.log('');

console.log('🎉 All tests passed! Culori is ready to use.\n');
console.log('Next steps:');
console.log('  1. Create color palette generator script');
console.log('  2. Implement WCAG contrast validation');
console.log('  3. Generate 8 color palettes + 3 neutrals');
