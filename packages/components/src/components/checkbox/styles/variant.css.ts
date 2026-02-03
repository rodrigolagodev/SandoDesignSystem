/**
 * Checkbox Variant Styles
 *
 * Contains styles for the two visual variants:
 * - Solid: Filled background when checked
 * - Outline: Border only, transparent background
 */

import { css } from 'lit';

export const variantStyles = css`
  /* ========================================
     SOLID VARIANT (default)
     ======================================== */
  :host([variant='solid']) .checkbox-box,
  .checkbox-box {
    background-color: var(--sando-checkbox-solid-backgroundColor-default);
    border-color: var(--sando-checkbox-solid-borderColor-default);
  }

  :host([variant='solid']) .checkbox-container:hover .checkbox-box,
  :host(:not([disabled])) .checkbox-container:hover .checkbox-box {
    border-color: var(--sando-checkbox-solid-borderColor-hover);
  }

  :host([variant='solid'][checked]) .checkbox-box,
  :host([checked]) .checkbox-box {
    background-color: var(--sando-checkbox-solid-backgroundColor-checked);
    border-color: var(--sando-checkbox-solid-borderColor-checked);
  }

  :host([variant='solid'][checked]) .checkbox-container:hover .checkbox-box,
  :host([checked]:not([disabled])) .checkbox-container:hover .checkbox-box {
    background-color: var(--sando-checkbox-solid-backgroundColor-checkedHover);
    border-color: var(--sando-checkbox-solid-borderColor-checkedHover);
  }

  :host([variant='solid'][indeterminate]) .checkbox-box,
  :host([indeterminate]) .checkbox-box {
    background-color: var(--sando-checkbox-solid-backgroundColor-indeterminate);
    border-color: var(--sando-checkbox-solid-borderColor-indeterminate);
  }

  :host([variant='solid'][indeterminate]) .checkbox-container:hover .checkbox-box,
  :host([indeterminate]:not([disabled])) .checkbox-container:hover .checkbox-box {
    background-color: var(--sando-checkbox-solid-backgroundColor-indeterminateHover);
    border-color: var(--sando-checkbox-solid-borderColor-indeterminateHover);
  }

  :host([variant='solid']) .checkbox-icon,
  .checkbox-icon {
    color: var(--sando-checkbox-solid-checkmarkColor-default);
  }

  /* ========================================
     OUTLINE VARIANT
     ======================================== */
  :host([variant='outline']) .checkbox-box {
    background-color: var(--sando-checkbox-outline-backgroundColor-default);
    border-color: var(--sando-checkbox-outline-borderColor-default);
  }

  :host([variant='outline']:not([disabled])) .checkbox-container:hover .checkbox-box {
    border-color: var(--sando-checkbox-outline-borderColor-hover);
  }

  :host([variant='outline'][checked]) .checkbox-box {
    background-color: var(--sando-checkbox-outline-backgroundColor-checked);
    border-color: var(--sando-checkbox-outline-borderColor-checked);
  }

  :host([variant='outline'][checked]:not([disabled])) .checkbox-container:hover .checkbox-box {
    background-color: var(--sando-checkbox-outline-backgroundColor-checkedHover);
    border-color: var(--sando-checkbox-outline-borderColor-checkedHover);
  }

  :host([variant='outline'][indeterminate]) .checkbox-box {
    background-color: var(--sando-checkbox-outline-backgroundColor-indeterminate);
    border-color: var(--sando-checkbox-outline-borderColor-indeterminate);
  }

  :host([variant='outline'][indeterminate]:not([disabled]))
    .checkbox-container:hover
    .checkbox-box {
    background-color: var(--sando-checkbox-outline-backgroundColor-indeterminateHover);
    border-color: var(--sando-checkbox-outline-borderColor-indeterminateHover);
  }

  :host([variant='outline']) .checkbox-icon {
    color: var(--sando-checkbox-outline-checkmarkColor-default);
  }
`;
