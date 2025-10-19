/**
 * Format: CSS Flavors with Mode Support
 *
 * Generates CSS for the Flavors layer with multiple mode support:
 * - Base mode (flavor.json): Default light mode
 * - Color modes: dark, high-contrast, forced-colors (mutually exclusive)
 * - Motion mode: motion-reduce (independent, auto-only)
 *
 * Each mode file generates appropriate @media queries and manual overrides.
 */

import { groupBy } from '../../utils/token-tree.js';
import { capitalize } from '../../utils/formatting.js';

/**
 * Mode configuration by filename
 */
const MODE_CONFIGS = {
  'flavor-light': {
    type: 'color',
    name: 'light',
    label: 'Light',
    mediaQuery: null, // No automatic @media query - only manual override
    attribute: 'flavor-mode="light"',
    allowManual: true,
    manualOnly: true,
    description: 'Manual override only via [flavor-mode="light"] - use to force light mode when system is dark'
  },
  'flavor-dark': {
    type: 'color',
    name: 'dark',
    label: 'Dark',
    mediaQuery: '(prefers-color-scheme: dark)',
    attribute: 'flavor-mode="dark"',
    allowManual: true, // Allows Storybook testing while being automatic-first
    description: 'Automatically applied via @media (prefers-color-scheme: dark) - manual override available for testing'
  },
  'flavor-high-contrast': {
    type: 'color',
    name: 'high-contrast',
    label: 'High Contrast',
    mediaQuery: '(prefers-contrast: more)',
    attribute: 'flavor-mode="high-contrast"',
    allowManual: true, // Allows Storybook testing while being automatic-first
    description: 'Automatically applied via @media (prefers-contrast: more) - manual override available for testing'
  },
  'flavor-forced-colors': {
    type: 'color',
    name: 'forced-colors',
    label: 'Forced Colors',
    mediaQuery: '(forced-colors: active)',
    attribute: null,
    allowManual: false,
    description: 'Automatically applied via @media (forced-colors: active) - system controlled'
  },
  'flavor-motion-reduce': {
    type: 'motion',
    name: 'motion-reduce',
    label: 'Reduced Motion',
    mediaQuery: '(prefers-reduced-motion: reduce)',
    attribute: null,
    allowManual: false,
    independent: true,
    description: 'Automatically applied via @media (prefers-reduced-motion: reduce) - combines with any color mode'
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

  // Generate CSS selectors based on mode type
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
  const modeDescription = modeConfig ? modeConfig.description : 'Default base mode styling';

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
 * Single declaration - no duplication
 */
function generateBaseMode(flavorName, grouped) {
  const selector = generateBaseSelector(flavorName);
  return `${selector} {\n${generateTokens(grouped)}}\n`;
}

/**
 * Generate mode variant CSS (flavor-*.json)
 * Includes @media query and optional manual override
 */
function generateModeVariant(flavorName, grouped, modeConfig) {
  let output = '';

  // 1. @media query for automatic mode (if not manual-only)
  if (modeConfig.mediaQuery && !modeConfig.manualOnly) {
    const mediaQuery = `@media ${modeConfig.mediaQuery}`;
    const mediaSelector = generateMediaSelector(flavorName, modeConfig);

    output += `${mediaQuery} {\n`;
    output += `  ${mediaSelector} {\n`;
    output += indentTokens(generateTokens(grouped), 2);
    output += '  }\n';
    output += '}\n';
    output += '\n';
  }

  // 2. Manual override (only for color modes that allow it)
  if (modeConfig.allowManual && modeConfig.attribute) {
    const manualSelector = generateManualModeSelector(flavorName, modeConfig);
    output += `${manualSelector} {\n`;
    output += generateTokens(grouped);
    output += '}\n';
  }

  return output;
}

/**
 * Generate base mode selector (for flavor.json)
 */
function generateBaseSelector(flavorName) {
  if (flavorName === 'original') {
    return ':host:not([flavor]), :host([flavor="original"]), :root:not([flavor]), [flavor="original"]';
  }
  return `:host([flavor="${flavorName}"]), [flavor="${flavorName}"]`;
}

/**
 * Generate selector for @media query (automatic mode activation)
 * Modes are ONLY automatic - no manual override via attributes
 */
function generateMediaSelector(flavorName, modeConfig) {
  if (flavorName === 'original') {
    // For original flavor: match elements without flavor OR with flavor="original"
    return `:host:not([flavor]), :host([flavor="original"]), :root:not([flavor]), [flavor="original"]`;
  }

  return `:host([flavor="${flavorName}"]), [flavor="${flavorName}"]`;
}

/**
 * Generate selector for manual mode override (via [flavor-mode] attribute)
 */
function generateManualModeSelector(flavorName, modeConfig) {
  const modeAttr = modeConfig.attribute;

  if (flavorName === 'original') {
    // Manual override for original flavor
    return `:host([${modeAttr}]):not([flavor]), :host([flavor="original"][${modeAttr}]), :root[${modeAttr}]:not([flavor]), [flavor="original"][${modeAttr}], [${modeAttr}] :host:not([flavor]), [${modeAttr}] :host([flavor="original"]), [${modeAttr}] [flavor="original"]`;
  }

  return `:host([flavor="${flavorName}"][${modeAttr}]), [flavor="${flavorName}"][${modeAttr}], [${modeAttr}] :host([flavor="${flavorName}"]), [${modeAttr}] [flavor="${flavorName}"]`;
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
