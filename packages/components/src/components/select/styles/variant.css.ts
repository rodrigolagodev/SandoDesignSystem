/**
 * Select Variant Styles
 *
 * Contains styles for visual variants:
 * - outlined: Border with transparent background
 * - filled: Filled background with subtle border
 */

import { css } from 'lit';

export const variantStyles = css`
  /* ========================================
     OUTLINED VARIANT (default behavior in CSS)
     ======================================== */
  .select-trigger {
    background-color: var(--sando-select-outlined-backgroundColor-default);
    border-color: var(--sando-select-outlined-borderColor-default);
    color: var(--sando-select-outlined-textColor-default);
  }

  .select-value.placeholder {
    color: var(--sando-select-outlined-textColor-placeholder);
  }

  .select-caret {
    color: var(--sando-select-outlined-iconColor-default);
  }

  /* Outlined hover */
  :host(:not([disabled])) .select-trigger:hover {
    border-color: var(--sando-select-outlined-borderColor-hover);
  }

  :host(:not([disabled])) .select-trigger:hover .select-caret {
    color: var(--sando-select-outlined-iconColor-hover);
  }

  /* Outlined focus */
  :host(:not([disabled])) .select-trigger:focus-visible {
    border-color: var(--sando-select-outlined-borderColor-focus);
  }

  /* ========================================
     FILLED VARIANT
     ======================================== */
  :host([variant='filled']) .select-trigger {
    background-color: var(--sando-select-filled-backgroundColor-default);
    border-color: var(--sando-select-filled-borderColor-default);
    color: var(--sando-select-filled-textColor-default);
  }

  :host([variant='filled']) .select-value.placeholder {
    color: var(--sando-select-filled-textColor-placeholder);
  }

  :host([variant='filled']) .select-caret {
    color: var(--sando-select-filled-iconColor-default);
  }

  /* Filled hover */
  :host([variant='filled']:not([disabled])) .select-trigger:hover {
    background-color: var(--sando-select-filled-backgroundColor-hover);
    border-color: var(--sando-select-filled-borderColor-hover);
  }

  :host([variant='filled']:not([disabled])) .select-trigger:hover .select-caret {
    color: var(--sando-select-filled-iconColor-hover);
  }

  /* Filled focus */
  :host([variant='filled']:not([disabled])) .select-trigger:focus-visible {
    border-color: var(--sando-select-filled-borderColor-focus);
  }
`;
