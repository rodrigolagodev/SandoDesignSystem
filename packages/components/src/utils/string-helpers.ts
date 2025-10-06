/**
 * String Helper Utilities
 * String manipulation and formatting utilities
 */

/**
 * Convert a string to kebab-case
 *
 * @param str - String to convert
 * @returns Kebab-cased string
 *
 * @example
 * toKebabCase('ButtonPrimary') // 'button-primary'
 * toKebabCase('sandoButton') // 'sando-button'
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert a string to camelCase
 *
 * @param str - String to convert
 * @returns CamelCased string
 *
 * @example
 * toCamelCase('button-primary') // 'buttonPrimary'
 * toCamelCase('sando_button') // 'sandoButton'
 */
export function toCamelCase(str: string): string {
  return str.replace(/[-_](.)/g, (_, char) => char.toUpperCase());
}

/**
 * Truncate a string to a maximum length
 *
 * @param str - String to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated string
 *
 * @example
 * truncate('Hello World', 8) // 'Hello...'
 */
export function truncate(str: string, maxLength: number, suffix = '...'): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Generate a unique ID
 *
 * @param prefix - Optional prefix
 * @returns Unique ID string
 *
 * @example
 * uniqueId('button') // 'button-abc123'
 */
export function uniqueId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Capitalize first letter of a string
 *
 * @param str - String to capitalize
 * @returns Capitalized string
 *
 * @example
 * capitalize('hello') // 'Hello'
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
