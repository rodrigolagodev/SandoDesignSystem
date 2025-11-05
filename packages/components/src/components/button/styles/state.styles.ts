/**
 * Button State Styles
 *
 * Contains styles for interactive states:
 * - Loading: Shows spinner, hides content
 * - Disabled: Prevents interaction
 * - Active: Persistent pressed state (for toggles/filters)
 */

import { css } from 'lit';

export const stateStyles = css`
  /* ========================================
     LOADING STATE
     ======================================== */
  :host([loading]) button,
  :host([loading]) a {
    cursor: wait;
    position: relative;
  }

  :host([loading]) .content {
    visibility: hidden;
  }

  .spinner {
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 2px solid var(--sando-button-loading-spinnerColor);
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  :host([loading]) .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes spin {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }

  /* ========================================
     DISABLED STATE
     ======================================== */
  :host([disabled]) button,
  :host([disabled]) a {
    cursor: not-allowed;
  }

  /* ========================================
     ACTIVE/PRESSED STATE
     For toggle buttons, filters, tabs
     ======================================== */
  :host([active][variant='solid']) button,
  :host([active][variant='solid']) a {
    background-color: var(--sando-button-solid-backgroundColor-active);
  }

  :host([active][variant='outline']) button,
  :host([active][variant='outline']) a {
    background-color: var(--sando-button-outline-backgroundColor-active);
    border-color: var(--sando-button-outline-borderColor-active);
  }

  :host([active][variant='ghost']) button,
  :host([active][variant='ghost']) a {
    background-color: var(--sando-button-ghost-backgroundColor-active);
  }
`;
