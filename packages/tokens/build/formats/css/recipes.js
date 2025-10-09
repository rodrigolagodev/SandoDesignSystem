/**
 * Format: CSS Recipes
 *
 * Generates CSS for the Recipes layer (component tokens)
 * - Uses :host selector for Web Components compatibility
 * - Also includes :root for global usage
 * - Contains CSS var() references to Flavors
 * - Groups tokens by component with comments
 */

import { createCSSFormat } from './base.js';
import { capitalize } from '../../utils/formatting.js';

export default createCSSFormat({
  layerName: 'Recipes',
  selectorFn: () => ':host, :root',
  groupByFn: (token) => token.path[0],
  headerFn: (options) => {
    return `/**\n * Recipes Layer - Component Tokens\n * Generated on ${new Date().toISOString()}\n * \n * DO NOT EDIT MANUALLY\n * This file is auto-generated from design tokens\n * \n * Selectors:\n * - :host - For Web Components\n * - :root - For global HTML\n */\n\n`;
  }
});
