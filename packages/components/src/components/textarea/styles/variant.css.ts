/**
 * Textarea Variant Styles
 *
 * Contains styles for the two visual variants:
 * - Outlined: Border with transparent background (default)
 * - Filled: Filled background with subtle border
 */

import { css } from 'lit';

export const variantStyles = css`
  /* ========================================
     OUTLINED VARIANT (default)
     ======================================== */
  :host([variant='outlined']) .textarea-field,
  .textarea-field {
    background: var(--sando-textarea-outlined-backgroundColor-default);
    border-color: var(--sando-textarea-outlined-borderColor-default);
    color: var(--sando-textarea-outlined-textColor-default);
  }

  :host([variant='outlined']) .textarea-field::placeholder,
  .textarea-field::placeholder {
    color: var(--sando-textarea-outlined-textColor-placeholder);
  }

  :host([variant='outlined']) .textarea-field:hover:not(:disabled):not(:focus-visible),
  .textarea-field:hover:not(:disabled):not(:focus-visible) {
    background: var(--sando-textarea-outlined-backgroundColor-hover);
    border-color: var(--sando-textarea-outlined-borderColor-hover);
  }

  /* DLD §7.3: Use :focus-visible — mouse clicks must NOT show focus ring, keyboard nav must */
  :host([variant='outlined']) .textarea-field:focus-visible,
  .textarea-field:focus-visible {
    background: var(--sando-textarea-outlined-backgroundColor-focus);
    border-color: var(--sando-textarea-outlined-borderColor-focus);
  }

  /* ========================================
     FILLED VARIANT
     ======================================== */
  :host([variant='filled']) .textarea-field {
    background: var(--sando-textarea-filled-backgroundColor-default);
    border-color: var(--sando-textarea-filled-borderColor-default);
    color: var(--sando-textarea-filled-textColor-default);
  }

  :host([variant='filled']) .textarea-field::placeholder {
    color: var(--sando-textarea-filled-textColor-placeholder);
  }

  :host([variant='filled']) .textarea-field:hover:not(:disabled):not(:focus-visible) {
    background: var(--sando-textarea-filled-backgroundColor-hover);
    border-color: var(--sando-textarea-filled-borderColor-hover);
  }

  /* DLD §7.3: Use :focus-visible — mouse clicks must NOT show focus ring, keyboard nav must */
  :host([variant='filled']) .textarea-field:focus-visible {
    background: var(--sando-textarea-filled-backgroundColor-focus);
    border-color: var(--sando-textarea-filled-borderColor-focus);
  }
`;
