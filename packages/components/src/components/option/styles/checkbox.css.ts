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
    border: var(--sando-checkbox-borderWidth) solid var(--sando-checkbox-borderColor-default);
    border-radius: var(--sando-checkbox-borderRadius);
    background: var(--sando-checkbox-backgroundColor-default);

    /* Smooth transition */
    transition-property: background-color, border-color, color;
    transition-duration: var(--sando-select-transition-duration);
    transition-timing-function: var(--sando-select-transition-timing);
  }

  /* ========================================
     CHECKBOX SIZE VARIANTS
     Scale checkbox based on option size
     ======================================== */

  /* Small/Medium option - smaller checkbox */
  :host([size='sm']) .option-checkbox,
  :host([size='md']) .option-checkbox {
    width: var(--sando-checkbox-size-small, var(--sando-sizing-control-xs));
    height: var(--sando-checkbox-size-small, var(--sando-sizing-control-xs));
  }

  /* Large option - medium checkbox */
  :host([size='lg']) .option-checkbox {
    width: var(--sando-checkbox-size-medium, var(--sando-sizing-control-sm));
    height: var(--sando-checkbox-size-medium, var(--sando-sizing-control-sm));
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

  /* ========================================
     CHECKBOX ICON SIZE VARIANTS
     Scale icon inside checkbox based on option size
     ======================================== */

  /* Small/Medium option - smaller icon */
  :host([size='sm']) .option-checkbox sando-icon,
  :host([size='md']) .option-checkbox sando-icon {
    --sando-icon-size: var(--sando-sizing-icon-xs);
  }

  /* Large option - larger icon */
  :host([size='lg']) .option-checkbox sando-icon {
    --sando-icon-size: var(--sando-sizing-icon-sm);
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
