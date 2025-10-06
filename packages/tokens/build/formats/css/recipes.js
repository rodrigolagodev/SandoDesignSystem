/**
 * Format: CSS Recipes
 *
 * Generates CSS for the Recipes layer (component tokens)
 * - Uses :root selector
 * - Contains CSS var() references to Flavors
 * - Groups tokens by component with comments
 */

import { createCSSFormat } from './base.js';
import { capitalize } from '../../utils/formatting.js';

export default createCSSFormat({
  layerName: 'Recipes',
  selectorFn: () => ':root',
  groupByFn: (token) => token.path[0],
  headerFn: (options) => {
    return `/**\n * Recipes Layer - Component Tokens\n * Generated on ${new Date().toISOString()}\n * \n * DO NOT EDIT MANUALLY\n * This file is auto-generated from design tokens\n */\n\n`;
  }
});
