/**
 * Format: CSS Ingredients
 *
 * Generates CSS for the Ingredients layer (base tokens)
 * - Uses :root selector
 * - Contains literal values only (no CSS var references)
 * - Groups tokens by category with comments
 */

import { createCSSFormat } from './base.js';

export default createCSSFormat({
  layerName: 'Ingredients',
  selectorFn: () => ':root',
  groupByFn: (token) => token.path[0]
});
