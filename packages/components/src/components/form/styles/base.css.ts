/**
 * Base Form Styles
 *
 * Contains:
 * - Host display and reset
 * - Native form element styling
 * - Loading state overlay with spinner
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: block;
    position: relative;
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

  /* Loading overlay with centered spinner */
  .form-loading-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Light semi-transparent white - spinner is visible on this */
    background-color: rgba(255, 255, 255, 0.85);
    z-index: 10;
    border-radius: inherit;
    /* Subtle backdrop blur for modern browsers */
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }

  /* Dark mode - use LIGHT overlay so dark spinner remains visible */
  @media (prefers-color-scheme: dark) {
    .form-loading-overlay {
      /* Light overlay in dark mode ensures default (dark) spinner is visible */
      background-color: rgba(255, 255, 255, 0.75);
    }
  }

  /* Respect reduced motion - higher opacity for clearer static state */
  @media (prefers-reduced-motion: reduce) {
    .form-loading-overlay {
      background-color: rgba(255, 255, 255, 0.92);
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }

    @media (prefers-color-scheme: dark) {
      .form-loading-overlay {
        /* Light overlay in dark mode with higher opacity for static state */
        background-color: rgba(255, 255, 255, 0.88);
      }
    }
  }

  /* Slotted elements maintain their normal layout */
  ::slotted(*) {
    /* Allow form controls to define their own width/spacing */
  }
`;
