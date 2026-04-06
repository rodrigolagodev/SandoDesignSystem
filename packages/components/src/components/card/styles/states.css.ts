/**
 * Card State Styles
 *
 * Contains:
 * - Hover states (hoverable, elevated hover, outlined hover)
 * - Active/press state
 * - Disabled state (opacity, pointer-events)
 * - Loading state (aria-busy)
 */

import { css } from 'lit';

export const stateStyles = css`
  /* ----------------------------------------
   * Hoverable: hover without click
   * ---------------------------------------- */
  .card--hoverable:hover {
    box-shadow: var(--sando-card-elevated-boxShadow-hover);
    transform: var(--sando-card-hover-transform);
  }

  .card--hoverable.card--outlined:hover {
    box-shadow: none;
    border-color: var(--sando-card-outlined-borderColor-hover);
  }

  /* ----------------------------------------
   * Interactive: clickable or href
   * Implicitly hoverable — more expressive than hoverable alone
   * ---------------------------------------- */
  .card--interactive:hover {
    transform: var(--sando-card-hover-transform);
  }

  .card--interactive.card--elevated:hover {
    box-shadow: var(--sando-card-elevated-boxShadow-hover);
  }

  .card--interactive.card--outlined:hover {
    border-color: var(--sando-card-outlined-borderColor-hover);
  }

  .card--interactive:has(.card__surface-action:active) {
    transform: scale(var(--sando-card-active-transform));
  }

  .card--interactive.card--elevated:has(.card__surface-action:active) {
    box-shadow: var(--sando-card-elevated-boxShadow-active);
  }

  /* ----------------------------------------
   * Disabled
   * ---------------------------------------- */
  .card--disabled .card__surface-action {
    cursor: not-allowed;
    pointer-events: none;
  }

  :host([disabled]) .card {
    opacity: var(--sando-card-disabled-opacity);
    pointer-events: none;
  }

  /* ----------------------------------------
   * Loading (aria-busy)
   * ---------------------------------------- */
  :host([loading]) .card {
    /* Keep shell visible; skeleton fills inner content */
    pointer-events: none;
  }
`;
