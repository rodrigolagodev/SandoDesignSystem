/**
 * Base Badge Styles
 *
 * Contains:
 * - Host display and layout
 * - Typography (font family, weight, line height)
 * - Base appearance (border radius, transitions)
 *
 * Note: Badge is purely informative (non-interactive),
 * so no focus/hover/active states are needed.
 * Reset styles (box-sizing, margin, padding) are handled by resetStyles.
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: inline-block;
    vertical-align: middle;
  }

  .badge {
    /* Display */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--sando-badge-gap);

    /* Typography */
    font-family: var(--sando-badge-fontFamily);
    font-weight: var(--sando-badge-fontWeight);
    line-height: var(--sando-badge-lineHeight);
    white-space: nowrap;

    /* Appearance */
    border-radius: var(--sando-badge-borderRadius);
    border-width: var(--sando-badge-borderWidth);
    border-style: solid;

    /* Transition (for theming)
     * NOTE: No recipe-level badge transition tokens exist yet.
     * Using flavor-level animation tokens directly until badge.transition
     * tokens are added to badge.json. */
    transition-property: background-color, color, border-color;
    transition-duration: var(--sando-animation-duration-fast);
    transition-timing-function: var(--sando-animation-easing-entrance);
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .badge {
      transition-duration: 0.01ms !important;
    }
  }
`;
