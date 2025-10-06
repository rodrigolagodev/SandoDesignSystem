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
    return flavorName === 'original' ? ':root' : `[flavor="${flavorName}"]`;
  },
  groupByFn: (token) => token.path[0],
  headerFn: (options) => {
    const flavorName = options?.flavorName || 'original';
    return `/**\n * Flavors Layer - ${capitalize(flavorName)} Theme\n * Generated on ${new Date().toISOString()}\n * \n * DO NOT EDIT MANUALLY\n * This file is auto-generated from design tokens\n */\n\n`;
  }
});
