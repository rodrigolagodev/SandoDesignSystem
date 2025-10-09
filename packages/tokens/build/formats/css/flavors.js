/**
 * Format: CSS Flavors
 *
 * Generates CSS for the Flavors layer (semantic tokens)
 * - Uses :root for default flavor (original)
 * - Uses [flavor="name"] for variant flavors
 * - Contains CSS var() references to Ingredients
 * - Groups tokens by category with comments
 */

import { createCSSFormat } from './base.js';
import { capitalize } from '../../utils/formatting.js';

export default createCSSFormat({
  layerName: 'Flavors',
  selectorFn: (options) => {
    const flavorName = options?.flavorName || 'original';
    // Generate selectors that work with Web Components
    // For original: match when no flavor attribute OR when flavor="original"
    // For others: match only when flavor="name"
    if (flavorName === 'original') {
      return ':host:not([flavor]), :host([flavor="original"]), :root:not([flavor]), [flavor="original"]';
    }
    return `:host([flavor="${flavorName}"]), [flavor="${flavorName}"]`;
  },
  groupByFn: (token) => token.path[0],
  headerFn: (options) => {
    const flavorName = options?.flavorName || 'original';
    return `/**\n * Flavors Layer - ${capitalize(flavorName)} Theme\n * Generated on ${new Date().toISOString()}\n * \n * DO NOT EDIT MANUALLY\n * This file is auto-generated from design tokens\n * \n * Selectors:\n * - :host([flavor="${flavorName}"]) - For Web Components\n * - [flavor="${flavorName}"] - For global HTML element\n */\n\n`;
  }
});
