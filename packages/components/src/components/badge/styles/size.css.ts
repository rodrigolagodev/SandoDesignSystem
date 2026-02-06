/**
 * Badge Size Styles
 *
 * Contains styles for the three size variants:
 * - sm: Compact badges for dense layouts
 * - md: Default size for most use cases
 * - lg: Larger badges for emphasis
 *
 * Also includes compact mode for reduced padding.
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     SMALL SIZE (sm)
     ======================================== */
  :host([size='sm']) .badge {
    padding-inline: var(--sando-badge-size-sm-paddingInline);
    padding-block: var(--sando-badge-size-sm-paddingBlock);
    font-size: var(--sando-badge-size-sm-fontSize);
    min-height: var(--sando-badge-size-sm-minHeight);
  }

  /* ========================================
     MEDIUM SIZE (md) - Default
     ======================================== */
  :host([size='md']) .badge,
  :host(:not([size])) .badge {
    padding-inline: var(--sando-badge-size-md-paddingInline);
    padding-block: var(--sando-badge-size-md-paddingBlock);
    font-size: var(--sando-badge-size-md-fontSize);
    min-height: var(--sando-badge-size-md-minHeight);
  }

  /* ========================================
     LARGE SIZE (lg)
     ======================================== */
  :host([size='lg']) .badge {
    padding-inline: var(--sando-badge-size-lg-paddingInline);
    padding-block: var(--sando-badge-size-lg-paddingBlock);
    font-size: var(--sando-badge-size-lg-fontSize);
    min-height: var(--sando-badge-size-lg-minHeight);
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
