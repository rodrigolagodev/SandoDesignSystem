/**
 * Option Group Size Styles
 *
 * Contains styles for size variants:
 * - sm: Compact size for tight spaces
 * - md: Default size for most use cases
 * - lg: Large size for emphasis
 *
 * Size is inherited from parent sando-select.
 * The labelPaddingInline aligns with option padding for visual consistency.
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     SMALL SIZE (sm)
     ======================================== */
  :host([size='sm']) .option-group-label {
    padding-inline: var(--sando-select-optionGroup-size-sm-labelPaddingInline);
  }

  /* ========================================
     MEDIUM SIZE (md) - default
     ======================================== */
  .option-group-label {
    padding-inline: var(--sando-select-optionGroup-size-md-labelPaddingInline);
  }

  /* ========================================
     LARGE SIZE (lg)
     ======================================== */
  :host([size='lg']) .option-group-label {
    padding-inline: var(--sando-select-optionGroup-size-lg-labelPaddingInline);
  }
`;
