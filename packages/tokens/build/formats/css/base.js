/**
 * Base CSS Format Factory
 *
 * Provides a reusable factory for generating CSS custom properties
 * Eliminates duplication between ingredients, flavors, and recipes formats
 */

import { groupBy } from '../../utils/token-tree.js';
import { capitalize, generateHeader, formatFileSize } from '../../utils/formatting.js';

/**
 * Create a CSS format function with customizable options
 * @param {Object} options - Configuration options
 * @param {string} options.layerName - Layer name (e.g., 'Ingredients', 'Flavors')
 * @param {Function} options.selectorFn - Function that returns CSS selector
 * @param {Function} options.groupByFn - Function to group tokens
 * @param {Function} options.headerFn - Optional custom header generator
 * @returns {Function} Style Dictionary format function
 */
export function createCSSFormat(options = {}) {
  const {
    layerName = 'Tokens',
    selectorFn = () => ':root',
    groupByFn = (token) => token.path[0],
    headerFn = null
  } = options;

  return ({ dictionary, file, options: formatOptions }) => {
    const tokens = dictionary.allTokens;

    if (tokens.length === 0) {
      return '/* No tokens found */\n';
    }

    // Group tokens by category
    const grouped = groupBy(tokens, groupByFn);

    // Generate header
    let output = '';
    if (headerFn) {
      output += headerFn(formatOptions);
    } else {
      output += generateHeader({
        title: `${layerName} Layer - ${formatOptions?.componentName ? formatOptions.componentName + ' ' : ''}Tokens`,
        description: `Generated on ${new Date().toISOString()}`,
        metadata: {
          '': '',
          'DO NOT EDIT MANUALLY': '',
          'This file is auto-generated from design tokens': ''
        }
      });
    }

    // Generate CSS selector
    const selector = selectorFn(formatOptions);
    output += `${selector} {\n`;

    // Generate CSS custom properties grouped by category
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

    output += '}\n';

    return output;
  };
}

/**
 * Default header generator for CSS files
 */
function generateDefaultHeader(layerName, metadata = {}) {
  return generateHeader({
    title: `${layerName} Layer - Tokens`,
    description: `Generated on ${new Date().toISOString()}`,
    metadata: {
      '': '',
      'DO NOT EDIT MANUALLY': '',
      'This file is auto-generated from design tokens': '',
      ...metadata
    }
  });
}
