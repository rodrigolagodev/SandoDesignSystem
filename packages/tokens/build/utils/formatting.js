/**
 * Formatting Utilities
 *
 * Shared utilities for generating formatted output
 */

/**
 * Capitalize the first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert a string to Title Case
 * @param {string} str - String to convert
 * @returns {string} Title cased string
 */
export function toTitleCase(str) {
  return str
    .split(/[\s-_]+/)
    .map(capitalize)
    .join(' ');
}

/**
 * Generate a file header comment
 * @param {Object} options - Header configuration
 * @param {string} options.title - Main title
 * @param {string} options.description - Description text
 * @param {Object} options.metadata - Additional metadata key-value pairs
 * @returns {string} Formatted header comment
 */
export function generateHeader(options = {}) {
  const { title = 'Generated File', description, metadata = {} } = options;

  let header = `/**\n * ${title}\n`;

  if (description) {
    header += ` *\n * ${description}\n`;
  }

  const metaEntries = Object.entries(metadata);
  if (metaEntries.length > 0) {
    header += ` *\n`;
    metaEntries.forEach(([key, value]) => {
      header += ` * ${key}: ${value}\n`;
    });
  }

  header += ` */\n\n`;

  return header;
}

/**
 * Convert object to TypeScript code with proper formatting
 * @param {Object} obj - Object to convert
 * @param {number} indent - Current indentation level
 * @returns {string} Formatted TypeScript object literal
 */
export function objectToTypeScript(obj, indent = 2) {
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
    // Handle string values
    return `${spaces}${key}: '${value}'`;
  });

  return `{\n${lines.join(',\n')}\n${' '.repeat(indent - 2)}}`;
}

/**
 * Convert object to JSON string with custom formatting
 * @param {Object} obj - Object to convert
 * @param {number} indent - Indentation spaces
 * @returns {string} Formatted JSON string
 */
export function objectToJSON(obj, indent = 2) {
  return JSON.stringify(obj, null, indent);
}

/**
 * Format file size for display
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size (e.g., "1.23 KB")
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Format duration for display
 * @param {number} ms - Duration in milliseconds
 * @returns {string} Formatted duration (e.g., "1.23s")
 */
export function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Generate JSDoc comment for TypeScript tokens
 * @param {Object} options - JSDoc configuration
 * @param {string} options.layerName - Layer name (e.g., 'Ingredients')
 * @param {number} options.tokenCount - Number of tokens
 * @param {string} options.category - Optional category name
 * @returns {string} JSDoc comment
 */
export function generateTokenJSDoc(options = {}) {
  const { layerName = 'Tokens', tokenCount = 0, category = null } = options;

  const title = category ? `${layerName} - ${toTitleCase(category)} Tokens` : `${layerName} Layer Design Tokens`;

  const exampleImport = category
    ? `import { tokens } from '@sando/tokens/${layerName.toLowerCase()}/${category.toLowerCase()}';`
    : `import { tokens } from '@sando/tokens/${layerName.toLowerCase()}';`;

  return `/**
 * ${title}
 *
 * This file provides type-safe access to CSS custom property names.
 * Use these tokens with the \`token()\` helper in your Lit components.
 *
 * @example
 * ${exampleImport}
 * import { token } from '@sando/components/styles';
 *
 * static styles = css\`
 *   button {
 *     background: \${token(tokens.brand[500])};
 *   }
 * \`;
 *
 * @generated Auto-generated from design tokens - DO NOT EDIT
 * @tokens ${tokenCount} tokens available
 */`;
}

/**
 * Generate index file JSDoc comment
 * @param {Object} options - JSDoc configuration
 * @returns {string} JSDoc comment
 */
export function generateIndexJSDoc(options = {}) {
  const { layerName = 'Tokens', categories = [], importPath = '' } = options;

  const categoryList = categories.join(', ');

  return `/**
 * ${layerName} - Auto-generated Index
 *
 * This file re-exports all token categories for convenient importing.
 *
 * @example
 * // Import specific categories
 * import { ${categories.slice(0, 3).join(', ')} } from '@sando/tokens/${importPath}';
 *
 * // Or import everything
 * import * as tokens from '@sando/tokens/${importPath}';
 *
 * @generated Auto-generated - DO NOT EDIT
 * @categories ${categories.length} categories available: ${categoryList}
 */`;
}
