/**
 * Radio Variant Styles
 *
 * Contains styles for the two visual variants:
 * - Solid: Filled background when checked
 * - Outline: Border only, transparent background
 */

import { css } from 'lit';

export const variantStyles = css`
  /* ========================================
     SOLID VARIANT (default)
     ======================================== */
  :host([variant='solid']) .radio-box,
  .radio-box {
    background-color: var(--sando-radio-solid-backgroundColor-default);
    border-color: var(--sando-radio-solid-borderColor-default);
  }

  :host([variant='solid'][checked]) .radio-box,
  :host([checked]) .radio-box {
    background-color: var(--sando-radio-solid-backgroundColor-checked);
    border-color: var(--sando-radio-solid-borderColor-checked);
  }

  :host([variant='solid']) .radio-dot,
  .radio-dot {
    background-color: var(--sando-radio-solid-dotColor-default);
  }

  /* ========================================
     OUTLINE VARIANT
     ======================================== */
  :host([variant='outline']) .radio-box {
    background-color: var(--sando-radio-outline-backgroundColor-default);
    border-color: var(--sando-radio-outline-borderColor-default);
  }

  :host([variant='outline'][checked]) .radio-box {
    background-color: var(--sando-radio-outline-backgroundColor-checked);
    border-color: var(--sando-radio-outline-borderColor-checked);
  }

  :host([variant='outline']) .radio-dot {
    background-color: var(--sando-radio-outline-dotColor-default);
  }
`;
