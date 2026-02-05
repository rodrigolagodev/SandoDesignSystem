/**
 * Select State Styles
 *
 * Contains styles for component states:
 * - error: Validation error state
 * - disabled: Prevents interaction
 */

import { css } from 'lit';

export const stateStyles = css`
  /* ========================================
     ERROR STATE
     ======================================== */
  :host([error]) .select-trigger {
    border-color: var(--sando-select-outlined-borderColor-error);
  }

  :host([error][variant='filled']) .select-trigger {
    border-color: var(--sando-select-filled-borderColor-error);
  }

  /* ========================================
     DISABLED STATE
     ======================================== */
  :host([disabled]) .select-trigger {
    cursor: not-allowed;
    background-color: var(--sando-select-outlined-backgroundColor-disabled);
    border-color: var(--sando-select-outlined-borderColor-disabled);
    color: var(--sando-select-outlined-textColor-disabled);
  }

  :host([disabled]) .select-caret {
    color: var(--sando-select-outlined-iconColor-disabled);
  }

  :host([disabled][variant='filled']) .select-trigger {
    background-color: var(--sando-select-filled-backgroundColor-disabled);
    border-color: var(--sando-select-filled-borderColor-disabled);
    color: var(--sando-select-filled-textColor-disabled);
  }

  :host([disabled][variant='filled']) .select-caret {
    color: var(--sando-select-filled-iconColor-disabled);
  }
`;
