/**
 * Format: CSS Flavors with Mode Support
 *
 * Generates CSS for the Flavors layer with automatic mode support:
 * - Base mode (flavor.json): Default styling on :root
 * - Color modes: dark, high-contrast, forced-colors via @media queries
 * - Motion mode: motion-reduce via @media query
 *
 * Mode variants generate BOTH:
 * 1. @media query with :not([data-color-mode]) - automatic, follows system preference
 * 2. [data-color-mode="mode"] selector - manual override for UI switches (Storybook)
 *
 * This dual approach allows:
 * - Automatic theme switching based on OS/browser preferences
 * - Manual override via data attribute (for theme toggles in apps)
 */

import { groupBy } from '../../utils/token-tree.js';
import { capitalize } from '../../utils/formatting.js';

/**
 * Mode configuration by filename
 * Each mode includes:
 * - name: Internal identifier
 * - label: Human-readable label
 * - mediaQuery: CSS media query for automatic detection
 * - dataAttribute: Value for data-color-mode attribute (manual override)
 * - description: Documentation string
 */
const MODE_CONFIGS = {
  'flavor-dark': {
    name: 'dark',
    label: 'Dark',
    mediaQuery: '(prefers-color-scheme: dark)',
    dataAttribute: 'dark',
    description: 'Applied via system preference or data-color-mode="dark"'
  },
  'flavor-high-contrast': {
    name: 'high-contrast',
    label: 'High Contrast',
    mediaQuery: '(prefers-contrast: more)',
    dataAttribute: 'high-contrast',
    description: 'Applied via system preference or data-color-mode="high-contrast"'
  },
  'flavor-forced-colors': {
    name: 'forced-colors',
    label: 'Forced Colors',
    mediaQuery: '(forced-colors: active)',
    dataAttribute: 'forced-colors',
    description: 'Applied via system preference or data-color-mode="forced-colors"'
  },
  'flavor-motion-reduce': {
    name: 'motion-reduce',
    label: 'Reduced Motion',
    mediaQuery: '(prefers-reduced-motion: reduce)',
    dataAttribute: 'motion-reduce',
    description: 'Applied via system preference or data-color-mode="motion-reduce"'
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
 * Generates BOTH automatic (@media query) and manual (data-color-mode) selectors
 *
 * Output structure:
 * 1. @media query with :not([data-color-mode]) - automatic, follows system preference
 *    but only when no manual override is set
 * 2. [data-color-mode="mode"] selector - manual override for UI switches
 */
function generateModeVariant(flavorName, grouped, modeConfig) {
  const mediaQuery = `@media ${modeConfig.mediaQuery}`;
  const baseSelector = generateBaseSelector(flavorName);
  const dataAttr = modeConfig.dataAttribute;

  let output = '';

  // ========================================
  // 1. Automatic mode (media query)
  // Excludes when :root has manual override [data-color-mode]
  // The check must be on :root because that's where Storybook/apps set the mode
  // ========================================
  output += `/* Automatic - follows system preference when no manual override on :root */\n`;
  output += `${mediaQuery} {\n`;

  if (flavorName === 'original') {
    // For original flavor: :root:not([data-color-mode])
    output += `  :root:not([data-color-mode]) {\n`;
  } else {
    // For named flavors: :root:not([data-color-mode]) [data-flavor="name"]
    // The :not() must be on :root because apps/Storybook set data-color-mode on <html>
    output += `  :root:not([data-color-mode]) [data-flavor="${flavorName}"] {\n`;
  }

  output += indentTokens(generateTokens(grouped), 2);
  output += `  }\n`;
  output += `}\n\n`;

  // ========================================
  // 2. Manual override (data-color-mode attribute on :root)
  // For UI switches like Storybook, theme toggles, etc.
  // ========================================
  output += `/* Manual override - for UI theme switches (data-color-mode on :root) */\n`;

  if (flavorName === 'original') {
    // For original flavor: :root[data-color-mode="mode"]
    output += `:root[data-color-mode="${dataAttr}"] {\n`;
  } else {
    // For named flavors: :root[data-color-mode="mode"] [data-flavor="name"]
    // The data-color-mode is on :root, flavor is on component
    output += `:root[data-color-mode="${dataAttr}"] [data-flavor="${flavorName}"] {\n`;
  }

  output += generateTokens(grouped);
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
