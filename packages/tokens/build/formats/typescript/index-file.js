/**
 * TypeScript Index File Format
 *
 * Generates index.ts files with re-exports for convenient importing
 * Creates barrel exports for all token categories in a layer
 *
 * @example Output:
 * export { tokens as animation } from './animation.js';
 * export { tokens as border } from './border.js';
 * export { tokens as color } from './color.js';
 */

import { capitalize, generateIndexJSDoc } from '../../utils/formatting.js';

/**
 * Extract unique top-level categories from tokens
 * @param {Array} tokens - Array of design tokens
 * @param {Array} explicitCategories - Explicitly provided category names
 * @returns {Set<string>} Set of unique category names
 */
function extractCategories(tokens, explicitCategories = null) {
  // If explicit categories provided, use those
  if (explicitCategories && Array.isArray(explicitCategories)) {
    return new Set(explicitCategories);
  }

  const categories = new Set();

  tokens.forEach(token => {
    // token.path is like ['color', 'brand', '500']
    // We want the first level: 'color'
    if (token.path && token.path.length > 0) {
      categories.add(token.path[0]);
    }
  });

  return categories;
}

/**
 * Generate TypeScript index file with re-exports
 * @param {Object} options - Format options
 * @param {Object} options.dictionary - Style Dictionary object
 * @param {Object} options.file - File configuration
 * @param {Object} options.options - Custom options
 * @returns {string} Generated TypeScript code
 */
export default ({ dictionary, file, options }) => {
  const tokens = dictionary.allTokens;
  const categories = Array.from(extractCategories(tokens, options?.categories)).sort();

  // Determine if this is a values export or tokens export
  const isValuesExport = options?.isValuesExport || false;
  const exportName = isValuesExport ? 'values' : 'tokens';

  // Generate header comment using shared utility
  const header = generateIndexJSDoc({
    layerName: options?.layerName || 'Design Tokens',
    categories,
    importPath: options?.importPath || 'ingredients'
  });

  // Generate re-export statements
  const exports = categories
    .map(category => `export { ${exportName} as ${category} } from './${category}.js';`)
    .join('\n');

  // Generate type re-exports
  const typeExports = categories
    .map(category => `export type { Tokens as ${capitalize(category)}Tokens } from './${category}.js';`)
    .join('\n');

  return `${header}\n\n${exports}\n\n${typeExports}\n`;
};
