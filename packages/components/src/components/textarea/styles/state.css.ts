/**
 * Textarea State Styles
 *
 * Contains styles for interactive states:
 * - Disabled: Prevents interaction
 * - Readonly: Allows viewing but not editing
 * - Error: Shows error styling
 * - Resize variations
 */

import { css } from 'lit';

export const stateStyles = css`
  /* ========================================
     DISABLED STATE
     ======================================== */
  :host([disabled]) .textarea-label {
    color: var(--sando-textarea-label-textColor-disabled);
  }

  :host([disabled]) .textarea-field,
  .textarea-field:disabled {
    background-color: var(--sando-textarea-outlined-backgroundColor-disabled);
    border-color: var(--sando-textarea-outlined-borderColor-disabled);
    color: var(--sando-textarea-outlined-textColor-disabled);
    cursor: not-allowed;
    resize: none;
  }

  :host([variant='filled'][disabled]) .textarea-field,
  :host([variant='filled']) .textarea-field:disabled {
    background-color: var(--sando-textarea-filled-backgroundColor-disabled);
    border-color: var(--sando-textarea-filled-borderColor-disabled);
    color: var(--sando-textarea-filled-textColor-disabled);
  }

  /* ========================================
     READONLY STATE
     ======================================== */
  :host([readonly]) .textarea-field,
  .textarea-field:read-only {
    cursor: default;
    resize: none;
  }

  /* ========================================
     ERROR STATE
     ======================================== */
  :host([error]) .textarea-label {
    color: var(--sando-textarea-label-textColor-error);
  }

  :host([error]) .textarea-field,
  :host([variant='outlined'][error]) .textarea-field {
    background-color: var(--sando-textarea-outlined-backgroundColor-error);
    border-color: var(--sando-textarea-outlined-borderColor-error);
    color: var(--sando-textarea-outlined-textColor-error);
  }

  :host([variant='filled'][error]) .textarea-field {
    background-color: var(--sando-textarea-filled-backgroundColor-error);
    border-color: var(--sando-textarea-filled-borderColor-error);
    color: var(--sando-textarea-filled-textColor-error);
  }

  /* ========================================
     RESIZE VARIATIONS
     ======================================== */
  :host([resize='none']) .textarea-field {
    resize: none;
  }

  :host([resize='vertical']) .textarea-field {
    resize: vertical;
  }

  :host([resize='horizontal']) .textarea-field {
    resize: horizontal;
  }

  :host([resize='both']) .textarea-field {
    resize: both;
  }
`;
