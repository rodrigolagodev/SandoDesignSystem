/**
 * TypeScript CSS Variables Format
 *
 * Generates TypeScript objects with CSS custom property names
 * Used for Flavors and Recipes layers to maintain type-safe references
 *
 * Output example:
 * export const tokens = {
 *   button: {
 *     solid: {
 *       backgroundColor: {
 *         default: '--sando-button-solid-backgroundColor-default'
 *       }
 *     }
 *   }
 * }
 */

import { buildTokenTree } from '../../utils/token-tree.js';
import { objectToTypeScript, generateTokenJSDoc, toTitleCase } from '../../utils/formatting.js';

/**
 * Extract CSS variable name from token
 * Handles token references for flavors/recipes layers
 */
function getCSSVarName(token) {
  // Check if token has references (uses original value before resolution)
  const originalValue = token.original?.value;
  const hasReference = originalValue && typeof originalValue === 'string' && originalValue.includes('{');

  if (hasReference) {
    // Extract the referenced token path and convert to CSS var name
    // Example: "{font.family.sans.value}" -> "--sando-font-family-sans"
    const regex = /\{([^}]+)\.value\}/;
    const match = originalValue.match(regex);
    if (match) {
      const refPath = match[1].replace(/\./g, '-');
      return `--sando-${refPath}`;
    }
  }

  // No reference, use own name
  return `--sando-${token.path.join('-')}`;
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
    const jsDoc = generateTokenJSDoc({ layerName, tokenCount: 0, category: category ? toTitleCase(category) : null });
    return `${jsDoc}\n\nexport const tokens = {} as const;\n`;
  }

  // Build nested token tree with category filter
  const tokenTree = buildTokenTree(dictionary.allTokens, {
    category,
    valueFn: getCSSVarName
  });

  // Generate TypeScript code
  const jsDoc = generateTokenJSDoc({
    layerName,
    tokenCount: tokens.length,
    category: category ? toTitleCase(category) : null
  });
  const tokenObject = objectToTypeScript(tokenTree, 2);

  return `${jsDoc}

export const tokens = ${tokenObject} as const;

/**
 * Type representing all available token paths
 */
export type Tokens = typeof tokens;

/**
 * Extract token value type (the CSS custom property name string)
 */
export type TokenValue = typeof tokens[keyof typeof tokens];
`;
};
