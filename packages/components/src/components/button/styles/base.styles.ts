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

    /* Transition — DLD §7.4: state changes only, no box-shadow (focus uses outline, not shadow) */
    transition-property: background-color, color, border-color, transform;
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

    /* Transition — DLD §7.4: state changes only, no box-shadow (focus uses outline, not shadow) */
    transition-property: background-color, color, border-color, transform;
    transition-duration: var(--sando-button-transition-duration);
    transition-timing-function: var(--sando-button-transition-timing);
  }

  button:focus-visible,
  a:focus-visible {
    outline: var(--sando-button-focusOutlineWidth) solid var(--sando-button-focusOutlineColor);
    outline-offset: 0;
  }

  /* High contrast mode support — DLD §7.3: use recipe token, not ingredient token */
  @media (prefers-contrast: high) {
    button:focus-visible,
    a:focus-visible {
      outline-width: var(--sando-button-focusOutlineWidth);
      outline-offset: 2px;
    }
  }

  button:active,
  a:active {
    transform: scale(var(--sando-button-transform-active));
  }

  /* Content wrapper — display: contents makes it invisible to layout,
     so its children become direct flex children of button/a.
     This prevents double-flex nesting and ensures empty slots
     don't occupy space in icon-only mode. */
  .content {
    display: contents;
  }

  /* Icons - Slots and Props */
  /* display/align-items removed: sando-icon :host already handles
     inline-flex + align-items + vertical-align on the icon side. */
  ::slotted([slot='icon-start']),
  .icon-start {
    margin-inline-end: var(--sando-button-icon-gap);
    color: inherit;
  }

  ::slotted([slot='icon-end']),
  .icon-end {
    margin-inline-start: var(--sando-button-icon-gap);
    color: inherit;
  }

  /* Icon-only: remove margins so the single icon stays perfectly centered */
  :host([icon-only]) ::slotted([slot='icon-start']),
  :host([icon-only]) .icon-start {
    margin-inline-end: 0;
  }

  :host([icon-only]) ::slotted([slot='icon-end']),
  :host([icon-only]) .icon-end {
    margin-inline-start: 0;
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
