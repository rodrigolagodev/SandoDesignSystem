/**
 * Base Button Styles
 *
 * Contains:
 * - CSS reset (via shared interactiveReset/anchorReset)
 * - Layout (flexbox, alignment)
 * - Typography (font family, weight, line height)
 * - Base appearance (border radius, cursor, transitions)
 * - Focus states
 */

import { css } from 'lit';
import { interactiveReset, anchorReset } from '../../../styles/shared/base.styles.js';

export const baseStyles = css`
  :host {
    display: inline-block;
    vertical-align: top;
    line-height: var(--sando-button-lineHeight);
  }

  :host([full-width]) {
    display: block;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  button {
    ${interactiveReset}

    /* Display */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--sando-button-gap);
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

    /* Transition */
    transition-property: background-color, color, border-color, transform, box-shadow;
    transition-duration: var(--sando-button-transition-duration);
    transition-timing-function: var(--sando-button-transition-timing);
  }

  a {
    ${anchorReset}

    /* Display */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--sando-button-gap);
    width: 100%;

    /* Typography */
    font-family: var(--sando-button-fontFamily);
    font-weight: var(--sando-button-fontWeight);
    line-height: var(--sando-button-lineHeight);
    text-align: center;
    white-space: nowrap;

    /* Appearance */
    border-radius: var(--sando-button-borderRadius);

    /* Transition */
    transition-property: background-color, color, border-color, transform, box-shadow;
    transition-duration: var(--sando-button-transition-duration);
    transition-timing-function: var(--sando-button-transition-timing);
  }

  button:focus-visible,
  a:focus-visible {
    outline: var(--sando-button-focusOutlineWidth) solid var(--sando-button-focusOutlineColor);
    outline-offset: var(--sando-button-focusOutlineOffset);
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    button:focus-visible,
    a:focus-visible {
      outline-width: var(--sando-border-width-emphasis);
      outline-offset: var(--sando-button-focusOutlineOffset);
    }
  }

  button:active,
  a:active {
    transform: scale(var(--sando-button-transform-active));
  }

  /* Icons - Slots and Props */
  ::slotted([slot='icon-start']),
  .icon-start {
    margin-inline-end: var(--sando-button-icon-gap);
  }

  ::slotted([slot='icon-end']),
  .icon-end {
    margin-inline-start: var(--sando-button-icon-gap);
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    button,
    a {
      transition-duration: 0s !important;
      animation-duration: 0s !important;
    }

    button:active,
    a:active {
      transform: none;
    }
  }
`;
