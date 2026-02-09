/**
 * Label Variant Styles
 *
 * Contains styles for:
 * - Font weight variants (normal, medium, semibold)
 * - Disabled state
 * - Screen-reader only (sr-only) is handled in base via :host([sr-only])
 */

import { css } from 'lit';

export const variantStyles = css`
  /* ========================================
     FONT WEIGHT VARIANTS
     ======================================== */

  /* Normal weight */
  :host([weight='normal']) .label {
    font-weight: var(--sando-label-fontWeight-normal);
  }

  /* Medium weight - Default */
  :host([weight='medium']) .label,
  :host(:not([weight])) .label {
    font-weight: var(--sando-label-fontWeight-medium);
  }

  /* Semibold weight */
  :host([weight='semibold']) .label {
    font-weight: var(--sando-label-fontWeight-semibold);
  }

  /* ========================================
     DISABLED STATE
     ======================================== */
  :host([disabled]) .label {
    color: var(--sando-label-textColor-disabled);
    cursor: not-allowed;
  }
`;
