/**
 * Format: CSS Flavors with Dark Mode Support
 *
 * Generates CSS for the Flavors layer with light/dark mode support:
 * - Light mode: Uses [flavor="name"] selector (default)
 * - Dark mode: Uses @media (prefers-color-scheme: dark) AND [flavor-mode="dark"]
 * - Supports manual override with [flavor-mode="light"]
 *
 * This format merges index.json (light) + dark.json (overrides) intelligently.
 */

import { groupBy } from '../../utils/token-tree.js';
import { capitalize } from '../../utils/formatting.js';

/**
 * Generate CSS for flavors with mode support
 */
export default function flavorModesFormat({ dictionary, file, options: formatOptions }) {
  const tokens = dictionary.allTokens;
  const flavorName = formatOptions?.flavorName || 'original';
  const mode = formatOptions?.mode || 'light'; // 'light' or 'dark'

  if (tokens.length === 0) {
    return '/* No tokens found */\n';
  }

  // Group tokens by category
  const grouped = groupBy(tokens, (token) => token.path[0]);

  // Generate header
  let output = generateHeader(flavorName, mode);

  // Generate CSS selectors based on mode
  if (mode === 'light') {
    // Light mode: Default selector
    output += generateLightModeCSS(flavorName, grouped);
  } else if (mode === 'dark') {
    // Dark mode: @media query + manual override selector
    output += generateDarkModeCSS(flavorName, grouped);
  }

  return output;
}

/**
 * Generate header comment
 */
function generateHeader(flavorName, mode) {
  const modeLabel = capitalize(mode);
  return `/**
 * Flavors Layer - ${capitalize(flavorName)} Flavor (${modeLabel} Mode)
 * Generated on ${new Date().toISOString()}
 *
 * DO NOT EDIT MANUALLY
 * This file is auto-generated from design tokens
 *
 * ${mode === 'dark' ? 'Automatically applied via @media (prefers-color-scheme: dark) and [flavor-mode="dark"]' : 'Default light mode styling'}
 */

`;
}

/**
 * Generate light mode CSS
 */
function generateLightModeCSS(flavorName, grouped) {
  let output = '';

  // Generate selector for light mode
  const selector = generateLightSelector(flavorName);
  output += `${selector} {\n`;
  output += generateTokens(grouped);
  output += '}\n';

  return output;
}

/**
 * Generate dark mode CSS with @media and manual override
 */
function generateDarkModeCSS(flavorName, grouped) {
  let output = '';

  // 1. @media (prefers-color-scheme: dark) - automatic dark mode
  const mediaSelector = generateLightSelector(flavorName);
  output += `@media (prefers-color-scheme: dark) {\n`;
  output += `  ${mediaSelector} {\n`;
  output += indentTokens(generateTokens(grouped), 2);
  output += '  }\n';
  output += '}\n\n';

  // 2. [flavor-mode="dark"] - manual dark mode override
  const darkModeSelector = generateDarkModeSelector(flavorName);
  output += `${darkModeSelector} {\n`;
  output += generateTokens(grouped);
  output += '}\n';

  return output;
}

/**
 * Generate light mode selector
 */
function generateLightSelector(flavorName) {
  if (flavorName === 'original') {
    return ':host:not([flavor]), :host([flavor="original"]), :root:not([flavor]), [flavor="original"]';
  }
  return `:host([flavor="${flavorName}"]), [flavor="${flavorName}"]`;
}

/**
 * Generate dark mode selector (manual override)
 */
function generateDarkModeSelector(flavorName) {
  if (flavorName === 'original') {
    return ':host([flavor-mode="dark"]):not([flavor]), :host([flavor="original"][flavor-mode="dark"]), :root[flavor-mode="dark"]:not([flavor]), [flavor="original"][flavor-mode="dark"]';
  }
  return `:host([flavor="${flavorName}"][flavor-mode="dark"]), [flavor="${flavorName}"][flavor-mode="dark"]`;
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
