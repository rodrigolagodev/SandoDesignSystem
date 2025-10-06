/**
 * Token Helper Utilities
 *
 * Utilities for consuming design tokens in Lit components with type safety.
 *
 * @example
 * import { css } from 'lit';
 * import { tokens } from '@sando/tokens/recipes';
 * import { token } from './token-helpers';
 *
 * static styles = css`
 *   button {
 *     background: ${token(tokens.button.solid.backgroundColor.default)};
 *     color: ${token(tokens.button.solid.textColor.default)};
 *   }
 * `;
 */

/**
 * Convert a token path to a CSS custom property usage
 *
 * @param tokenPath - The CSS custom property name from design tokens
 * @returns CSS var() expression as plain string (use with unsafeCSS in Lit)
 *
 * @example
 * token('--sando-button-solid-backgroundColor-default')
 * // Returns: 'var(--sando-button-solid-backgroundColor-default)'
 *
 * // Usage in Lit:
 * import { css, unsafeCSS } from 'lit';
 * static styles = css`
 *   button {
 *     background: ${unsafeCSS(token(tokens.button.solid.backgroundColor.default))};
 *   }
 * `;
 */
export function token(tokenPath: string): string {
  return `var(${tokenPath})`;
}

/**
 * Convert a token path to a CSS custom property usage with fallback
 *
 * @param tokenPath - The CSS custom property name from design tokens
 * @param fallback - Fallback value if token is not defined
 * @returns CSS var() expression with fallback
 *
 * @example
 * tokenWithFallback('--sando-button-borderRadius', '4px')
 * // Returns: 'var(--sando-button-borderRadius, 4px)'
 */
export function tokenWithFallback(tokenPath: string, fallback: string): string {
  return `var(${tokenPath}, ${fallback})`;
}

/**
 * Type guard to check if a value is a token string
 *
 * @param value - Value to check
 * @returns True if value is a token (starts with '--sando-')
 */
export function isToken(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('--sando-');
}

/**
 * Extract token name without prefix
 *
 * @param tokenPath - The CSS custom property name
 * @returns Token name without '--sando-' prefix
 *
 * @example
 * getTokenName('--sando-button-solid-backgroundColor-default')
 * // Returns: 'button-solid-backgroundColor-default'
 */
export function getTokenName(tokenPath: string): string {
  return tokenPath.replace(/^--sando-/, '');
}
