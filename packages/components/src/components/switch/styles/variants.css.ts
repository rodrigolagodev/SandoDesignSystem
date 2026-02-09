/**
 * Switch Variant Styles
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
  :host([variant='solid']) .switch-track,
  .switch-track {
    background-color: var(--sando-switch-solid-track-backgroundColor-default);
    border-color: var(--sando-switch-solid-track-borderColor-default);
  }

  :host([variant='solid']) .switch-track:hover,
  .switch-track:hover {
    background-color: var(--sando-switch-solid-track-backgroundColor-hover);
    border-color: var(--sando-switch-solid-track-borderColor-hover);
  }

  :host([variant='solid'][checked]) .switch-track,
  :host([checked]) .switch-track {
    background-color: var(--sando-switch-solid-track-backgroundColor-checked);
    border-color: var(--sando-switch-solid-track-borderColor-checked);
  }

  :host([variant='solid'][checked]) .switch-track:hover,
  :host([checked]) .switch-track:hover {
    background-color: var(--sando-switch-solid-track-backgroundColor-checkedHover);
    border-color: var(--sando-switch-solid-track-borderColor-checkedHover);
  }

  :host([variant='solid']) .switch-thumb,
  .switch-thumb {
    background-color: var(--sando-switch-solid-thumb-backgroundColor-default);
  }

  :host([variant='solid'][checked]) .switch-thumb,
  :host([checked]) .switch-thumb {
    background-color: var(--sando-switch-solid-thumb-backgroundColor-checked);
  }

  /* ========================================
     OUTLINE VARIANT
     ======================================== */
  :host([variant='outline']) .switch-track {
    background-color: var(--sando-switch-outline-track-backgroundColor-default);
    border-color: var(--sando-switch-outline-track-borderColor-default);
  }

  :host([variant='outline']) .switch-track:hover {
    background-color: var(--sando-switch-outline-track-backgroundColor-hover);
    border-color: var(--sando-switch-outline-track-borderColor-hover);
  }

  :host([variant='outline'][checked]) .switch-track {
    background-color: var(--sando-switch-outline-track-backgroundColor-checked);
    border-color: var(--sando-switch-outline-track-borderColor-checked);
  }

  :host([variant='outline'][checked]) .switch-track:hover {
    background-color: var(--sando-switch-outline-track-backgroundColor-checkedHover);
    border-color: var(--sando-switch-outline-track-borderColor-checkedHover);
  }

  :host([variant='outline']) .switch-thumb {
    background-color: var(--sando-switch-outline-thumb-backgroundColor-default);
  }

  :host([variant='outline'][checked]) .switch-thumb {
    background-color: var(--sando-switch-outline-thumb-backgroundColor-checked);
  }

  :host([variant='outline']) .switch-thumb {
    box-shadow: var(--sando-switch-outline-thumb-shadow);
  }
`;
