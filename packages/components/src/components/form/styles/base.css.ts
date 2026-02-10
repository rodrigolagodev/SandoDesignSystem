/**
 * Base Form Styles
 *
 * Contains:
 * - Host display and reset
 * - Native form element styling
 * - Loading state overlay
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: block;
  }

  :host([hidden]) {
    display: none;
  }

  .form {
    display: block;
    position: relative;
  }

  /* Loading state - disable pointer events on children */
  :host([loading]) .form {
    pointer-events: none;
  }

  /* Optional: Visual feedback for loading state */
  :host([loading]) .form::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.5);
    cursor: wait;
  }

  /* Slotted elements maintain their normal layout */
  ::slotted(*) {
    /* Allow form controls to define their own width/spacing */
  }
`;
