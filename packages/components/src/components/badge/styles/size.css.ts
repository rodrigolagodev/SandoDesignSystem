/**
 * Badge Size Styles
 *
 * Contains styles for the three size variants:
 * - Small: Compact badges for dense layouts
 * - Medium: Default size for most use cases
 * - Large: Larger badges for emphasis
 *
 * Also includes compact mode for reduced padding.
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     SMALL SIZE
     ======================================== */
  :host([size='small']) .badge {
    padding-inline: var(--sando-badge-size-small-paddingInline);
    padding-block: var(--sando-badge-size-small-paddingBlock);
    font-size: var(--sando-badge-size-small-fontSize);
    min-height: var(--sando-badge-size-small-minHeight);
  }

  /* ========================================
     MEDIUM SIZE (Default)
     ======================================== */
  :host([size='medium']) .badge,
  :host(:not([size])) .badge {
    padding-inline: var(--sando-badge-size-medium-paddingInline);
    padding-block: var(--sando-badge-size-medium-paddingBlock);
    font-size: var(--sando-badge-size-medium-fontSize);
    min-height: var(--sando-badge-size-medium-minHeight);
  }

  /* ========================================
     LARGE SIZE
     ======================================== */
  :host([size='large']) .badge {
    padding-inline: var(--sando-badge-size-large-paddingInline);
    padding-block: var(--sando-badge-size-large-paddingBlock);
    font-size: var(--sando-badge-size-large-fontSize);
    min-height: var(--sando-badge-size-large-minHeight);
  }

  /* ========================================
     COMPACT MODE
     Reduces vertical padding for tight spaces
     Removes min-height constraint
     Works with all sizes
     ======================================== */
  :host([compact]) .badge {
    padding-block: var(--sando-badge-compact-paddingBlock);
    min-height: auto;
  }
`;
