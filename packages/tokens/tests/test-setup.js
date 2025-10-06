/**
 * Test Setup and Global Utilities
 *
 * This file runs before all tests and provides common utilities
 */

import { beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Ensure dist directory exists
const distPath = path.resolve(process.cwd(), 'dist/sando-tokens/css');

beforeAll(() => {
  console.log('\n🔧 Setting up test environment...\n');

  // Build tokens if dist doesn't exist
  if (!fs.existsSync(distPath)) {
    console.log('📦 Building tokens for tests...');
    try {
      execSync('npm run tokens:build', { stdio: 'inherit' });
      console.log('✅ Tokens built successfully\n');
    } catch (error) {
      console.error('❌ Failed to build tokens:', error);
      process.exit(1);
    }
  } else {
    console.log('✅ Using existing token build\n');
  }
});

afterAll(() => {
  console.log('\n✨ Test suite completed\n');
});

// Export common test utilities
export const testUtils = {
  /**
   * Load a token file safely
   */
  loadTokenFile: (layer, fileName) => {
    const filePath = path.resolve(process.cwd(), `src/tokens/${layer}/${fileName}`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Token file not found: ${filePath}`);
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  },

  /**
   * Load a CSS output file
   */
  loadCSSFile: (layer, fileName) => {
    const filePath = path.resolve(process.cwd(), `dist/sando-tokens/css/${layer}/${fileName}`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`CSS file not found: ${filePath}`);
    }
    return fs.readFileSync(filePath, 'utf8');
  },

  /**
   * Parse HSL color to RGB
   */
  hslToRgb: (hslString) => {
    const match = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return null;

    let h = parseInt(match[1]) / 360;
    let s = parseInt(match[2]) / 100;
    let l = parseInt(match[3]) / 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }
};
