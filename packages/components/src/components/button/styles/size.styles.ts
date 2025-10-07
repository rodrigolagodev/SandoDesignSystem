/**
 * Button Size Styles
 *
 * Contains styles for the three size variants:
 * - Small: Compact size for dense UIs
 * - Medium: Default size (most common)
 * - Large: Prominent size for important actions
 *
 * Also includes icon-only mode (square aspect ratio)
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     SMALL SIZE
     ======================================== */
  :host([size="small"]) button,
  :host([size="small"]) a {
    padding: var(--sando-button-size-small-paddingBlock) var(--sando-button-size-small-paddingInline);
    font-size: var(--sando-button-size-small-fontSize);
  }

  /* ========================================
     MEDIUM SIZE (Default)
     ======================================== */
  :host([size="medium"]) button,
  :host([size="medium"]) a {
    padding: var(--sando-button-size-medium-paddingBlock) var(--sando-button-size-medium-paddingInline);
    font-size: var(--sando-button-size-medium-fontSize);
  }

  /* ========================================
     LARGE SIZE
     ======================================== */
  :host([size="large"]) button,
  :host([size="large"]) a {
    padding: var(--sando-button-size-large-paddingBlock) var(--sando-button-size-large-paddingInline);
    font-size: var(--sando-button-size-large-fontSize);
  }

  /* ========================================
     ICON-ONLY MODE
     Square buttons with 1:1 aspect ratio
     ======================================== */
  :host([icon-only][size="small"]) button,
  :host([icon-only][size="small"]) a {
    padding: var(--sando-button-size-small-paddingBlock);
    aspect-ratio: 1;
  }

  :host([icon-only][size="medium"]) button,
  :host([icon-only][size="medium"]) a {
    padding: var(--sando-button-size-medium-paddingBlock);
    aspect-ratio: 1;
  }

  :host([icon-only][size="large"]) button,
  :host([icon-only][size="large"]) a {
    padding: var(--sando-button-size-large-paddingBlock);
    aspect-ratio: 1;
  }
`;
