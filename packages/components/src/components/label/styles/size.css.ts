/**
 * Label Size Styles
 *
 * Contains styles for the three size variants:
 * - sm: Small labels for compact layouts
 * - md: Default size for most use cases
 * - lg: Larger labels for emphasis
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     SMALL SIZE (sm)
     ======================================== */
  :host([size='sm']) .label {
    font-size: var(--sando-label-size-sm-fontSize);
    line-height: var(--sando-label-size-sm-lineHeight);
  }

  /* ========================================
     MEDIUM SIZE (md) - Default
     ======================================== */
  :host([size='md']) .label,
  :host(:not([size])) .label {
    font-size: var(--sando-label-size-md-fontSize);
    line-height: var(--sando-label-size-md-lineHeight);
  }

  /* ========================================
     LARGE SIZE (lg)
     ======================================== */
  :host([size='lg']) .label {
    font-size: var(--sando-label-size-lg-fontSize);
    line-height: var(--sando-label-size-lg-lineHeight);
  }
`;
