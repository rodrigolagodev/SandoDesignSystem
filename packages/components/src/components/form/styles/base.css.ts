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
    font-family: var(--sando-form-fontFamily);
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
    /* Semi-transparent surface overlay — uses recipe token with warm-neutral fallback */
    background-color: var(
      --sando-form-loading-overlayColor,
      color-mix(in oklch, var(--sando-color-background-raised, oklch(1 0.005 60)) 85%, transparent)
    );
    z-index: 10;
    border-radius: inherit;
    /* Subtle backdrop blur for modern browsers */
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }

  /* Dark mode - overlay remains light so dark spinner stays visible */
  @media (prefers-color-scheme: dark) {
    .form-loading-overlay {
      background-color: var(
        --sando-form-loading-overlayColor-dark,
        color-mix(
          in oklch,
          var(--sando-color-background-raised, oklch(1 0.005 60)) 75%,
          transparent
        )
      );
    }
  }

  /* Respect reduced motion - higher opacity for clearer static state */
  @media (prefers-reduced-motion: reduce) {
    .form-loading-overlay {
      background-color: var(
        --sando-form-loading-overlayColor-reducedMotion,
        color-mix(
          in oklch,
          var(--sando-color-background-raised, oklch(1 0.005 60)) 92%,
          transparent
        )
      );
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }

    @media (prefers-color-scheme: dark) {
      .form-loading-overlay {
        background-color: var(
          --sando-form-loading-overlayColor-dark-reducedMotion,
          color-mix(
            in oklch,
            var(--sando-color-background-raised, oklch(1 0.005 60)) 88%,
            transparent
          )
        );
      }
    }
  }

  /* Slotted elements maintain their normal layout */
  ::slotted(*) {
    /* Allow form controls to define their own width/spacing */
  }
`;
