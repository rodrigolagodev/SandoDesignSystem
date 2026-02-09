/**
 * Switch State Styles
 *
 * Contains styles for interactive states:
 * - Checked: Thumb slides to the right
 * - Disabled: Prevents interaction
 * - Error: Shows error styling
 */

import { css } from 'lit';

export const stateStyles = css`
  /* ========================================
     CHECKED STATE
     Thumb is positioned via size.css.ts transforms
     ======================================== */
  /* Base checked state handled in size.css.ts via transform */

  /* ========================================
     DISABLED STATE
     ======================================== */
  :host([disabled]) .switch-container {
    cursor: not-allowed;
  }

  :host([disabled]) .switch-track {
    background-color: var(--sando-switch-solid-track-backgroundColor-disabled);
    border-color: var(--sando-switch-solid-track-borderColor-disabled);
  }

  :host([disabled]) .switch-thumb {
    background-color: var(--sando-switch-solid-thumb-backgroundColor-disabled);
  }

  :host([disabled]) .switch-label {
    color: var(--sando-switch-label-textColor-disabled);
  }

  :host([variant='outline'][disabled]) .switch-track {
    background-color: var(--sando-switch-outline-track-backgroundColor-disabled);
    border-color: var(--sando-switch-outline-track-borderColor-disabled);
  }

  :host([variant='outline'][disabled]) .switch-thumb {
    background-color: var(--sando-switch-outline-thumb-backgroundColor-disabled);
  }

  /* ========================================
     ERROR STATE
     ======================================== */
  :host([error]) .switch-track {
    background-color: var(--sando-switch-solid-track-backgroundColor-error);
    border-color: var(--sando-switch-solid-track-borderColor-error);
  }

  :host([error]) .switch-label {
    color: var(--sando-switch-label-textColor-error);
  }

  :host([variant='outline'][error]) .switch-track {
    background-color: var(--sando-switch-outline-track-backgroundColor-error);
    border-color: var(--sando-switch-outline-track-borderColor-error);
  }

  /* ========================================
     FOCUS STATE (for native input focus)
     ======================================== */
  :host([variant='solid']) .switch-container:focus-within .switch-track,
  .switch-container:focus-within .switch-track {
    border-color: var(--sando-switch-solid-track-borderColor-focus);
  }

  :host([variant='outline']) .switch-container:focus-within .switch-track {
    border-color: var(--sando-switch-outline-track-borderColor-focus);
  }
`;
