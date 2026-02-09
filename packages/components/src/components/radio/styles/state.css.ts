/**
 * Radio State Styles
 *
 * Contains styles for interactive states:
 * - Checked: Shows dot indicator
 * - Disabled: Prevents interaction
 * - Error: Shows error styling
 *
 * Note: No indeterminate state for radio buttons (unlike checkbox)
 */

import { css } from 'lit';

export const stateStyles = css`
  /* ========================================
     CHECKED STATE
     ======================================== */
  :host([checked]) .radio-dot {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  /* ========================================
     DISABLED STATE
     ======================================== */
  :host([disabled]) .radio-container {
    cursor: not-allowed;
  }

  :host([disabled]) .radio-container:hover {
    background-color: transparent;
  }

  :host([disabled]) .radio-box {
    background-color: var(--sando-radio-solid-backgroundColor-disabled);
    border-color: var(--sando-radio-solid-borderColor-disabled);
  }

  :host([disabled]) .radio-dot {
    background-color: var(--sando-radio-solid-dotColor-disabled);
  }

  :host([disabled]) .radio-label {
    color: var(--sando-radio-label-textColor-disabled);
  }

  :host([variant='outline'][disabled]) .radio-box {
    background-color: var(--sando-radio-outline-backgroundColor-disabled);
    border-color: var(--sando-radio-outline-borderColor-disabled);
  }

  :host([variant='outline'][disabled]) .radio-dot {
    background-color: var(--sando-radio-outline-dotColor-disabled);
  }

  /* ========================================
     ERROR STATE
     ======================================== */
  :host([error]) .radio-box {
    background-color: var(--sando-radio-solid-backgroundColor-error);
    border-color: var(--sando-radio-solid-borderColor-error);
  }

  :host([error]) .radio-label {
    color: var(--sando-radio-label-textColor-error);
  }

  :host([variant='outline'][error]) .radio-box {
    background-color: var(--sando-radio-outline-backgroundColor-error);
    border-color: var(--sando-radio-outline-borderColor-error);
  }

  /* ========================================
     FOCUS STATE (for native input focus)
     ======================================== */
  :host([variant='solid']) .radio-container:focus-within .radio-box,
  .radio-container:focus-within .radio-box {
    border-color: var(--sando-radio-solid-borderColor-focus);
  }

  :host([variant='outline']) .radio-container:focus-within .radio-box {
    border-color: var(--sando-radio-outline-borderColor-focus);
  }
`;
