/**
 * Input State Styles
 *
 * Contains styles for interactive states:
 * - Hover
 * - Focus
 * - Error
 * - Disabled
 *
 * Organized by variant (outlined/filled) for each state.
 */

import { css } from 'lit';

export const stateStyles = css`
  /* ========================================
     HOVER STATE
     ======================================== */
  /* Outlined hover */
  :host([variant='outlined']) .input-wrapper:hover:not(.disabled):not(.error),
  .input-wrapper:hover:not(.disabled):not(.error) {
    border-color: var(--sando-input-outlined-borderColor-hover);
  }

  /* Filled hover */
  :host([variant='filled']) .input-wrapper:hover:not(.disabled) {
    background: var(--sando-input-filled-backgroundColor-hover);
    border-color: var(--sando-input-filled-borderColor-hover);
  }

  /* ========================================
     FOCUS STATE
     ======================================== */
  /* Outlined focus */
  :host([variant='outlined']) .input-wrapper.focused,
  .input-wrapper.focused {
    border-color: var(--sando-input-outlined-borderColor-focus);
    outline: var(--sando-input-focusOutlineWidth) solid var(--sando-input-focusOutlineColor);
    outline-offset: var(--sando-input-focusOutlineOffset);
  }

  /* Filled focus */
  :host([variant='filled']) .input-wrapper.focused {
    border-color: var(--sando-input-filled-borderColor-focus);
    outline: var(--sando-input-focusOutlineWidth) solid var(--sando-input-focusOutlineColor);
    outline-offset: var(--sando-input-focusOutlineOffset);
  }

  /* ========================================
     ERROR STATE
     ======================================== */
  /* Outlined error */
  :host([variant='outlined']) .input-wrapper.error,
  .input-wrapper.error {
    border-color: var(--sando-input-outlined-borderColor-error);
  }

  /* Filled error */
  :host([variant='filled']) .input-wrapper.error {
    border-color: var(--sando-input-filled-borderColor-error);
  }

  /* ========================================
     DISABLED STATE
     ======================================== */
  /* Outlined disabled */
  :host([variant='outlined']) .input-wrapper.disabled,
  .input-wrapper.disabled {
    background: var(--sando-input-outlined-backgroundColor-disabled);
    border-color: var(--sando-input-outlined-borderColor-disabled);
    cursor: not-allowed;
  }

  :host([variant='outlined']) input:disabled,
  input:disabled {
    cursor: not-allowed;
    color: var(--sando-input-outlined-textColor-disabled);
  }

  /* Filled disabled */
  :host([variant='filled']) .input-wrapper.disabled {
    background: var(--sando-input-filled-backgroundColor-disabled);
    border-color: var(--sando-input-filled-borderColor-disabled);
    cursor: not-allowed;
  }

  :host([variant='filled']) input:disabled {
    color: var(--sando-input-filled-textColor-disabled);
  }
`;
