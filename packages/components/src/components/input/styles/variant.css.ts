/**
 * Input Variant Styles
 *
 * Contains styles for the two visual variants:
 * - Outlined: Border with transparent/light background (default for :host)
 * - Filled: Solid background with subtle border
 */

import { css } from 'lit';

export const variantStyles = css`
  /* ========================================
     OUTLINED VARIANT (default)
     ======================================== */
  :host([variant='outlined']) .input-wrapper,
  .input-wrapper {
    border: var(--sando-input-borderWidth) solid var(--sando-input-outlined-borderColor-default);
    background: var(--sando-input-outlined-backgroundColor-default);
  }

  :host([variant='outlined']) input,
  input {
    color: var(--sando-input-outlined-textColor-default);
  }

  :host([variant='outlined']) input::placeholder,
  input::placeholder {
    color: var(--sando-input-outlined-textColor-placeholder);
  }

  /* ========================================
     FILLED VARIANT
     ======================================== */
  :host([variant='filled']) .input-wrapper {
    background: var(--sando-input-filled-backgroundColor-default);
    border: var(--sando-input-borderWidth) solid var(--sando-input-filled-borderColor-default);
  }

  :host([variant='filled']) input {
    color: var(--sando-input-filled-textColor-default);
  }

  :host([variant='filled']) input::placeholder {
    color: var(--sando-input-filled-textColor-placeholder);
  }
`;
