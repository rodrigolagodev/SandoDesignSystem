/**
 * TypeScript Primitive Values Format
 *
 * Generates TypeScript objects with absolute primitive values
 * Used ONLY for Ingredients layer (no CSS variables, only raw values)
 *
 * Output example:
 * export const values = {
 *   brand: {
 *     500: '#f97415'  // ← Absolute value
 *   }
 * }
 */

import { buildTokenTree } from '../../utils/token-tree.js';
import { toTitleCase } from '../../utils/formatting.js';

/**
 * Custom TypeScript formatter that handles both strings and numbers
 */
function objectToTypeScript(obj, indent = 2) {
  const spaces = ' '.repeat(indent);
  const entries = Object.entries(obj);

  if (entries.length === 0) {
    return '{}';
  }

  const lines = entries.map(([key, value]) => {
    // Handle nested objects
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const nestedValue = objectToTypeScript(value, indent + 2);
      return `${spaces}${key}: ${nestedValue}`;
    }
    // Handle string/number values - quote strings properly
    const formattedValue = typeof value === 'string' ? `'${value}'` : value;
    return `${spaces}${key}: ${formattedValue}`;
  });

  return `{\n${lines.join(',\n')}\n${' '.repeat(indent - 2)}}`;
}

/**
 * Generate JSDoc comment for ingredient values
 */
function generateValuesJSDoc(options = {}) {
  const { layerName = 'Ingredients', tokenCount = 0, category = null } = options;

  const title = category
    ? `${layerName} - ${toTitleCase(category)} Values`
    : `${layerName} Layer Design Tokens - Primitive Values`;

  const exampleImport = category
    ? `import { values } from '@sando/tokens/${layerName.toLowerCase()}/${category.toLowerCase()}';`
    : `import { values } from '@sando/tokens/${layerName.toLowerCase()}';`;

  const exampleUsage = category
    ? `const brandColor = values.brand[500]; // '#f97415'`
    : `const brandColor = values.color.brand[500]; // '#f97415'`;

  return `/**
 * ${title}
 *
 * This file provides type-safe access to actual token values.
 * These are PRIMITIVES - no references, only absolute values.
 *
 * Use these when you need the actual value (e.g., for calculations),
 * or prefer using CSS custom properties via the \`tokens\` export from recipes/flavors.
 *
 * @example
 * ${exampleImport}
 *
 * // Get actual ${category ? category.toLowerCase() : 'color'} value
 * ${exampleUsage}
 *
 * @generated Auto-generated from design tokens - DO NOT EDIT
 * @tokens ${tokenCount} primitive values available
 */`;
}

/**
 * Main format function for Style Dictionary
 */
export default ({ dictionary, file, options }) => {
  const layerName = options?.layerName || 'Tokens';
  const category = options?.category || null;

  // Filter tokens if category is specified
  let tokens = dictionary.allTokens;
  if (category) {
    tokens = tokens.filter(token => token.path[0] === category);
  }

  if (tokens.length === 0) {
    const jsDoc = generateValuesJSDoc({ layerName, tokenCount: 0, category: category ? toTitleCase(category) : null });
    return `${jsDoc}\n\nexport const values = {} as const;\n`;
  }

  // Build nested token tree with actual values and category filter
  const tokenTree = buildTokenTree(dictionary.allTokens, {
    category,
    valueFn: (token) => token.value // Use actual value for ingredients
  });

  // Generate TypeScript code
  const jsDoc = generateValuesJSDoc({
    layerName,
    tokenCount: tokens.length,
    category: category ? toTitleCase(category) : null
  });
  const tokenObject = objectToTypeScript(tokenTree, 2);

  return `${jsDoc}

export const values = ${tokenObject} as const;

/**
 * Type representing all available token values
 */
export type Values = typeof values;

/**
 * Extract a specific value type
 */
export type TokenValue = typeof values[keyof typeof values];
`;
};
