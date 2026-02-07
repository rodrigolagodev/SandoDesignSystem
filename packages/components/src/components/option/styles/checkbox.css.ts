/**
 * Option Checkbox Visual Styles (Multi-select mode)
 *
 * Contains styles for the visual checkbox shown in multi-select mode.
 * Uses checkbox tokens for visual consistency with sando-checkbox.
 * This is a presentational-only checkbox (not an actual checkbox component).
 */

import { css } from 'lit';

export const checkboxStyles = css`
  /* ========================================
     CHECKBOX VISUAL (Multi-select mode)
     ======================================== */
  .option-checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    /* Use checkbox tokens for visual consistency */
    width: var(--sando-checkbox-size-medium);
    height: var(--sando-checkbox-size-medium);
    border: var(--sando-checkbox-borderWidth) solid var(--sando-checkbox-borderColor-default);
    border-radius: var(--sando-checkbox-borderRadius);
    background: var(--sando-checkbox-backgroundColor-default);

    /* Smooth transition */
    transition-property: background-color, border-color, color;
    transition-duration: var(--sando-select-transition-duration);
    transition-timing-function: var(--sando-select-transition-timing);
  }

  /* Checkbox hover state (when option is hovered) */
  :host(:not([disabled])) .option:hover .option-checkbox:not(.checked) {
    border-color: var(--sando-checkbox-borderColor-hover);
  }

  /* Checkbox checked state */
  .option-checkbox.checked {
    background: var(--sando-checkbox-backgroundColor-checked);
    border-color: var(--sando-checkbox-borderColor-checked);
    color: var(--sando-checkbox-iconColor-checked);
  }

  /* Checkbox icon sizing */
  .option-checkbox sando-icon {
    --sando-icon-size: 14px;
  }

  /* Disabled state */
  :host([disabled]) .option-checkbox {
    background: var(--sando-checkbox-backgroundColor-disabled);
    border-color: var(--sando-checkbox-borderColor-disabled);
  }

  :host([disabled]) .option-checkbox.checked {
    background: var(--sando-checkbox-backgroundColor-checked-disabled);
    border-color: var(--sando-checkbox-borderColor-checked-disabled);
    color: var(--sando-checkbox-iconColor-disabled);
  }

  /* ========================================
     PARENT PREFIX ICON (Single-select mode with prefix)
     ======================================== */
  .option-parent-prefix-icon {
    flex-shrink: 0;
    color: inherit;
  }

  /* ========================================
     HIDE CHECKMARK IN MULTI-SELECT MODE
     Multi-select uses checkbox visual instead
     ======================================== */
  :host([multiple]) .option-checkmark {
    display: none;
  }
`;
