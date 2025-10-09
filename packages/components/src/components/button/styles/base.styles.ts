/**
 * Base Button Styles
 *
 * Contains:
 * - CSS reset
 * - Layout (flexbox, alignment)
 * - Typography (font family, weight, line height)
 * - Base appearance (border radius, cursor, transitions)
 * - Focus states
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: inline-block;
  }

  :host([full-width]) {
    display: block;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  button,
  a {
    /* Reset */
    all: unset;
    box-sizing: border-box;

    /* Display */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    width: 100%;

    /* Typography */
    font-family: var(--sando-button-fontFamily);
    font-weight: var(--sando-button-fontWeight);
    line-height: var(--sando-button-lineHeight);
    text-align: center;
    text-decoration: none;
    white-space: nowrap;

    /* Appearance */
    border-radius: var(--sando-button-borderRadius);
    cursor: pointer;
    user-select: none;

    /* Transition */
    transition-property: background-color, color, border-color, transform, box-shadow;
    transition-duration: var(--sando-button-transition-duration);
    transition-timing-function: var(--sando-button-transition-timing);
  }

  button:focus-visible,
  a:focus-visible {
    outline: var(--sando-button-focusOutlineWidth) solid var(--sando-button-focusOutlineColor);
    outline-offset: 2px;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    button:focus-visible,
    a:focus-visible {
      outline-width: 4px;
      outline-offset: 3px;
    }
  }

  button:active,
  a:active {
    transform: scale(0.98);
  }

  /* Icons - Slots and Props */
  ::slotted([slot="icon-start"]),
  .icon-start {
    margin-inline-end: 0.25em;
  }

  ::slotted([slot="icon-end"]),
  .icon-end {
    margin-inline-start: 0.25em;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    button,
    a {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }

    button:active,
    a:active {
      transform: none;
    }
  }
`;
