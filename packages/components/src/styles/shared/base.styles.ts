/**
 * Base Shared Styles
 * Common CSS patterns and reusable styles across components
 */

import { css } from 'lit';

/**
 * Reset styles for button elements
 */
export const buttonReset = css`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
`;

/**
 * Visually hidden but accessible to screen readers
 */
export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

/**
 * Focus visible outline styles
 */
export const focusVisible = css`
  outline: var(--sando-focus-outline-width, 2px) solid var(--sando-focus-outline-color, #0066cc);
  outline-offset: 2px;
`;

/**
 * Disabled state common styles
 */
export const disabledState = css`
  cursor: not-allowed;
  opacity: var(--sando-disabled-opacity, 0.5);
  pointer-events: none;
`;

/**
 * Common transition properties
 */
export const transition = css`
  transition-property: background-color, color, border-color, transform, box-shadow, opacity;
  transition-duration: var(--sando-transition-duration-fast, 150ms);
  transition-timing-function: var(--sando-transition-timing, ease-in-out);
`;

/**
 * Flex center utilities
 */
export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * Truncate text with ellipsis
 */
export const textTruncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/**
 * Responsive container query
 */
export const containerQuery = css`
  container-type: inline-size;
`;

/**
 * Safe area insets (for mobile notches)
 */
export const safeAreaInsets = css`
  padding-top: env(safe-area-inset-top);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
`;
