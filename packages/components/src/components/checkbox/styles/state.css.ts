/**
 * Checkbox State Styles
 *
 * Contains styles for interactive states:
 * - Checked: Shows checkmark icon
 * - Indeterminate: Shows horizontal line
 * - Disabled: Prevents interaction
 * - Error: Shows error styling
 */

import { css } from 'lit';

export const stateStyles = css`
  /* ========================================
     CHECKED STATE
     ======================================== */
  :host([checked]) .checkbox-icon.checkmark {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  /* ========================================
     INDETERMINATE STATE
     Overrides checked state visually
     ======================================== */
  :host([indeterminate]) .checkbox-icon.checkmark {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }

  :host([indeterminate]) .checkbox-icon.indeterminate {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  /* ========================================
     HOVER STATE
     ======================================== */
  :host(:not([disabled])) .checkbox-container:hover .checkbox-box {
    border-color: var(--sando-checkbox-solid-borderColor-hover);
    background-color: var(--sando-checkbox-solid-backgroundColor-hover);
  }

  :host([variant='outline']:not([disabled])) .checkbox-container:hover .checkbox-box {
    border-color: var(--sando-checkbox-outline-borderColor-hover);
    background-color: var(--sando-checkbox-outline-backgroundColor-hover);
  }

  /* ========================================
     ACTIVE/PRESS STATE
     ======================================== */
  :host(:not([disabled])) .checkbox-container:active .checkbox-box {
    transform: scale(var(--sando-checkbox-active-scale, 0.98));
  }

  /* ========================================
     DISABLED STATE
     ======================================== */
  :host([disabled]) .checkbox-container {
    cursor: not-allowed;
  }

  :host([disabled]) .checkbox-box {
    background-color: var(--sando-checkbox-solid-backgroundColor-disabled);
    border-color: var(--sando-checkbox-solid-borderColor-disabled);
  }

  :host([disabled]) .checkbox-icon {
    color: var(--sando-checkbox-solid-checkmarkColor-disabled);
  }

  :host([disabled]) .checkbox-label {
    color: var(--sando-checkbox-label-textColor-disabled);
  }

  :host([variant='outline'][disabled]) .checkbox-box {
    background-color: var(--sando-checkbox-outline-backgroundColor-disabled);
    border-color: var(--sando-checkbox-outline-borderColor-disabled);
  }

  :host([variant='outline'][disabled]) .checkbox-icon {
    color: var(--sando-checkbox-outline-checkmarkColor-disabled);
  }

  /* ========================================
     ERROR STATE
     ======================================== */
  :host([error]) .checkbox-box {
    background-color: var(--sando-checkbox-solid-backgroundColor-error);
    border-color: var(--sando-checkbox-solid-borderColor-error);
  }

  :host([error]) .checkbox-label {
    color: var(--sando-checkbox-label-textColor-error);
  }

  :host([variant='outline'][error]) .checkbox-box {
    background-color: var(--sando-checkbox-outline-backgroundColor-error);
    border-color: var(--sando-checkbox-outline-borderColor-error);
  }

  /* ========================================
     FOCUS STATE (for native input focus)
     ======================================== */
  :host([variant='solid']) .checkbox-container:focus-within .checkbox-box,
  .checkbox-container:focus-within .checkbox-box {
    border-color: var(--sando-checkbox-solid-borderColor-focus);
  }

  :host([variant='outline']) .checkbox-container:focus-within .checkbox-box {
    border-color: var(--sando-checkbox-outline-borderColor-focus);
  }
`;
