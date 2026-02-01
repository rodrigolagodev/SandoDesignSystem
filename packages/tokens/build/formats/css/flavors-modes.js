/**
 * Format: CSS Flavors with Mode Support
 *
 * Generates CSS for the Flavors layer with automatic mode support:
 * - Base mode (flavor.json): Default styling on :root
 * - Color modes: dark, high-contrast, forced-colors via @media queries
 * - Motion mode: motion-reduce via @media query
 *
 * Modes are AUTOMATIC ONLY - they respond to system preferences.
 * No manual override selectors are generated.
 */

import { groupBy } from '../../utils/token-tree.js';
import { capitalize } from '../../utils/formatting.js';

/**
 * Mode configuration by filename
 */
const MODE_CONFIGS = {
  'flavor-dark': {
    name: 'dark',
    label: 'Dark',
    mediaQuery: '(prefers-color-scheme: dark)',
    description: 'Automatically applied when system is in dark mode'
  },
  'flavor-high-contrast': {
    name: 'high-contrast',
    label: 'High Contrast',
    mediaQuery: '(prefers-contrast: more)',
    description: 'Automatically applied when system requests high contrast'
  },
  'flavor-forced-colors': {
    name: 'forced-colors',
    label: 'Forced Colors',
    mediaQuery: '(forced-colors: active)',
    description: 'Automatically applied when forced-colors mode is active'
  },
  'flavor-motion-reduce': {
    name: 'motion-reduce',
    label: 'Reduced Motion',
    mediaQuery: '(prefers-reduced-motion: reduce)',
    description: 'Automatically applied when reduced motion is preferred'
  }
};

/**
 * Generate CSS for flavors with mode support
 */
export default function flavorModesFormat({ dictionary, file, options: formatOptions }) {
  const tokens = dictionary.allTokens;
  const flavorName = formatOptions?.flavorName || 'original';
  const mode = formatOptions?.mode || 'base';

  if (tokens.length === 0) {
    return '/* No tokens found */\n';
  }

  // Group tokens by category
  const grouped = groupBy(tokens, (token) => token.path[0]);

  // Detect mode type from filename
  const modeConfig = detectModeConfig(mode);

  // Generate header
  let output = generateHeader(flavorName, modeConfig);

  // Generate CSS based on mode type
  if (modeConfig === null) {
    // Base mode (flavor.json)
    output += generateBaseMode(flavorName, grouped);
  } else {
    // Mode variant (flavor-*.json)
    output += generateModeVariant(flavorName, grouped, modeConfig);
  }

  return output;
}

/**
 * Detect mode configuration from mode name
 */
function detectModeConfig(mode) {
  if (mode === 'base' || mode === 'light') {
    return null; // Base mode
  }

  const config = MODE_CONFIGS[`flavor-${mode}`];
  if (!config) {
    console.warn(`[Style Dictionary] Unknown mode: ${mode}. Treating as base mode.`);
    return null;
  }

  return config;
}

/**
 * Generate header comment
 */
function generateHeader(flavorName, modeConfig) {
  const modeLabel = modeConfig ? modeConfig.label : 'Base';
  const modeDescription = modeConfig ? modeConfig.description : 'Default styling applied to :root';

  return `/**
 * Flavors Layer - ${capitalize(flavorName)} Flavor (${modeLabel} Mode)
 * Generated on ${new Date().toISOString()}
 *
 * DO NOT EDIT MANUALLY
 * This file is auto-generated from design tokens
 *
 * ${modeDescription}
 */

`;
}

/**
 * Generate base mode CSS (flavor.json)
 * Simple :root selector for default styling
 */
function generateBaseMode(flavorName, grouped) {
  const selector = generateBaseSelector(flavorName);
  return `${selector} {\n${generateTokens(grouped)}}\n`;
}

/**
 * Generate mode variant CSS (flavor-*.json)
 * Only @media query - no manual override selectors
 */
function generateModeVariant(flavorName, grouped, modeConfig) {
  const mediaQuery = `@media ${modeConfig.mediaQuery}`;
  const selector = generateBaseSelector(flavorName);

  let output = `${mediaQuery} {\n`;
  output += `  ${selector} {\n`;
  output += indentTokens(generateTokens(grouped), 2);
  output += `  }\n`;
  output += `}\n`;

  return output;
}

/**
 * Generate base selector for a flavor
 * - original: :root (default for the whole document)
 * - other flavors: [data-flavor="name"] (scoped to elements with that attribute)
 */
function generateBaseSelector(flavorName) {
  if (flavorName === 'original') {
    return ':root';
  }
  return `[data-flavor="${flavorName}"]`;
}

/**
 * Generate CSS custom properties from grouped tokens
 */
function generateTokens(grouped) {
  let output = '';
  const categories = Object.keys(grouped).sort();

  categories.forEach((category, index) => {
    // Add spacing between categories (but not before first)
    if (index > 0) {
      output += '\n';
    }

    // Add category comment
    output += `  /* ${capitalize(category)} */\n`;

    // Add tokens for this category
    grouped[category].forEach(token => {
      output += `  ${token.name}: ${token.value};\n`;
    });
  });

  return output;
}

/**
 * Indent tokens output (for nested @media rules)
 */
function indentTokens(tokensOutput, spaces = 2) {
  const indent = ' '.repeat(spaces);
  return tokensOutput
    .split('\n')
    .map(line => line ? indent + line : line)
    .join('\n');
}
