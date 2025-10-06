/**
 * Token Tree Utilities
 *
 * Shared utilities for building nested token structures
 */

/**
 * Group items by a key function
 * @param {Array} items - Items to group
 * @param {Function} keyFn - Function that returns the grouping key
 * @returns {Object} Grouped object
 *
 * @example
 * groupBy(tokens, token => token.path[0])
 * // { color: [...], space: [...] }
 */
export function groupBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

/**
 * Build a nested object structure from token paths
 * @param {Array} tokens - Array of design tokens
 * @param {Object} options - Configuration options
 * @param {string} options.category - Optional category to filter by
 * @param {Function} options.valueFn - Function to extract value from token
 * @returns {Object} Nested token tree
 *
 * @example
 * buildTokenTree(tokens, {
 *   category: 'color',
 *   valueFn: token => token.value
 * })
 */
export function buildTokenTree(tokens, options = {}) {
  const { category, valueFn = (token) => token.value } = options;
  const tree = {};

  tokens.forEach(token => {
    const path = token.path;

    // If category filter is provided, only include tokens from that category
    if (category && path[0] !== category) {
      return;
    }

    let current = tree;

    // If category is specified, skip the first level (the category itself)
    const startIndex = category ? 1 : 0;

    // Navigate/create nested structure
    for (let i = startIndex; i < path.length - 1; i++) {
      const key = path[i];
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }

    // Set the final value using the value function
    const lastKey = path[path.length - 1];
    current[lastKey] = valueFn(token);
  });

  return tree;
}

/**
 * Flatten a nested object into dot-notation paths
 * @param {Object} obj - Nested object to flatten
 * @param {string} prefix - Current path prefix
 * @returns {Object} Flattened object
 *
 * @example
 * flattenTree({ color: { brand: { 500: '#fff' } } })
 * // { 'color.brand.500': '#fff' }
 */
export function flattenTree(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flattenTree(value, newKey));
    } else {
      acc[newKey] = value;
    }

    return acc;
  }, {});
}

/**
 * Get the depth of a nested object
 * @param {Object} obj - Object to measure
 * @returns {number} Maximum depth
 */
export function getTreeDepth(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return 0;
  }

  const depths = Object.values(obj).map(value => getTreeDepth(value));
  return depths.length > 0 ? 1 + Math.max(...depths) : 1;
}
