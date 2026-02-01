/**
 * Base Form Group Styles
 *
 * Contains:
 * - Host display and reset
 * - Layout (flexbox, vertical stacking)
 * - Typography (font family)
 * - Field slot styling
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: block;
    font-family: var(--sando-form-group-fontFamily);
  }

  :host([disabled]) {
    pointer-events: none;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: var(--sando-form-group-gap);
  }

  /* Field wrapper */
  .form-group__field {
    display: block;
  }

  /* Slotted elements get full width by default */
  .form-group__field ::slotted(*) {
    width: 100%;
    box-sizing: border-box;
  }
`;
