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
    width: var(--sando-checkbox-size-medium, 18px);
    height: var(--sando-checkbox-size-medium, 18px);
    border: var(--sando-checkbox-borderWidth, 2px) solid
      var(--sando-checkbox-borderColor-default, #d1d5db);
    border-radius: var(--sando-checkbox-borderRadius, 4px);
    background: var(--sando-checkbox-backgroundColor-default, transparent);

    /* Smooth transition */
    transition-property: background-color, border-color, color;
    transition-duration: var(--sando-select-transition-duration, 150ms);
    transition-timing-function: var(--sando-select-transition-timing, ease);
  }

  /* Checkbox hover state (when option is hovered) */
  :host(:not([disabled])) .option:hover .option-checkbox:not(.checked) {
    border-color: var(--sando-checkbox-borderColor-hover, #9ca3af);
  }

  /* Checkbox checked state */
  .option-checkbox.checked {
    background: var(--sando-checkbox-backgroundColor-checked, #f97316);
    border-color: var(--sando-checkbox-borderColor-checked, #f97316);
    color: var(--sando-checkbox-iconColor-checked, white);
  }

  /* Checkbox icon sizing */
  .option-checkbox sando-icon {
    --sando-icon-size: 14px;
  }

  /* Disabled state */
  :host([disabled]) .option-checkbox {
    background: var(--sando-checkbox-backgroundColor-disabled, #f3f4f6);
    border-color: var(--sando-checkbox-borderColor-disabled, #e5e7eb);
  }

  :host([disabled]) .option-checkbox.checked {
    background: var(--sando-checkbox-backgroundColor-checked-disabled, #d1d5db);
    border-color: var(--sando-checkbox-borderColor-checked-disabled, #d1d5db);
    color: var(--sando-checkbox-iconColor-disabled, #9ca3af);
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
