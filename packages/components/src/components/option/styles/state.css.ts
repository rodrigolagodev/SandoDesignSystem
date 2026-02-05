/**
 * Option State Styles
 *
 * Contains styles for interactive states:
 * - Default: Normal appearance
 * - Hover: Mouse over
 * - Highlighted: Keyboard navigation focus
 * - Selected: Currently selected option
 * - Disabled: Prevents interaction
 */

import { css } from 'lit';

export const stateStyles = css`
  /* ========================================
     DEFAULT STATE
     ======================================== */
  .option {
    background-color: var(--sando-select-option-backgroundColor-default);
    color: var(--sando-select-option-textColor-default);
  }

  .option-checkmark {
    color: var(--sando-select-option-checkmarkColor-default);
  }

  /* ========================================
     HOVER STATE
     ======================================== */
  :host(:not([disabled])) .option:hover {
    background-color: var(--sando-select-option-backgroundColor-hover);
    color: var(--sando-select-option-textColor-hover);
  }

  /* ========================================
     HIGHLIGHTED STATE (Keyboard navigation)
     ======================================== */
  :host([highlighted]) .option {
    background-color: var(--sando-select-option-backgroundColor-focus);
    color: var(--sando-select-option-textColor-focus);
  }

  /* ========================================
     SELECTED STATE
     ======================================== */
  :host([selected]) .option {
    background-color: var(--sando-select-option-backgroundColor-selected);
    color: var(--sando-select-option-textColor-selected);
  }

  :host([selected]) .option-checkmark {
    opacity: 1;
    color: var(--sando-select-option-checkmarkColor-selected);
  }

  /* Selected + Hover */
  :host([selected]:not([disabled])) .option:hover {
    background-color: var(--sando-select-option-backgroundColor-selectedHover);
  }

  /* ========================================
     DISABLED STATE
     ======================================== */
  :host([disabled]) {
    pointer-events: none;
  }

  :host([disabled]) .option {
    cursor: not-allowed;
    background-color: var(--sando-select-option-backgroundColor-disabled);
    color: var(--sando-select-option-textColor-disabled);
  }

  :host([disabled]) .option-checkmark {
    color: var(--sando-select-option-checkmarkColor-disabled);
  }
`;
