/**
 * Base Shared Styles
 * Common CSS patterns and reusable styles across components
 */

import { css } from 'lit';

/**
 * Interactive Element Reset
 *
 * CRITICAL: `all: unset` removes ALL properties including `box-sizing`.
 * This reset restores box-sizing and adds common interactive defaults.
 *
 * Use for: buttons, clickable elements inside Shadow DOM
 */
export const interactiveReset = css`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
`;

// Keep buttonReset as alias for backwards compatibility
export const buttonReset = interactiveReset;

/**
 * Anchor Element Reset
 *
 * Same as interactiveReset but includes text-decoration reset.
 * Use for: anchor tags, link-like buttons
 */
export const anchorReset = css`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
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
  outline: var(--sando-focus-outline-width) solid var(--sando-color-focus-ring);
  outline-offset: var(--sando-focus-outline-offset);
`;

/**
 * Disabled state common styles
 */
export const disabledState = css`
  cursor: not-allowed;
  opacity: var(--sando-opacity-disabled);
  pointer-events: none;
`;

/**
 * Common transition properties
 */
export const transition = css`
  transition-property: background-color, color, border-color, transform, box-shadow, opacity;
  transition-duration: var(--sando-animation-duration-fast);
  transition-timing-function: var(--sando-animation-easing-default);
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
