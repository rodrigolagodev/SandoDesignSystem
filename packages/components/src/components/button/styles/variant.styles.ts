/**
 * Button Variant Styles
 *
 * Contains styles for the three visual variants:
 * - Solid: Filled background (primary actions)
 * - Outline: Border with transparent background (secondary actions)
 * - Ghost: No border, transparent background (tertiary actions)
 */

import { css } from 'lit';

export const variantStyles = css`
  /* ========================================
     SOLID VARIANT
     ======================================== */
  :host([variant="solid"]) button,
  :host([variant="solid"]) a {
    background-color: var(--sando-button-solid-backgroundColor-default);
    color: var(--sando-button-solid-textColor-default);
    border: none;
  }

  :host([variant="solid"]) button:hover,
  :host([variant="solid"]) a:hover {
    background-color: var(--sando-button-solid-backgroundColor-hover);
  }

  :host([variant="solid"]) button:active,
  :host([variant="solid"]) a:active {
    background-color: var(--sando-button-solid-backgroundColor-active);
  }

  :host([variant="solid"][disabled]) button,
  :host([variant="solid"][disabled]) a {
    background-color: var(--sando-button-solid-backgroundColor-disabled);
    color: var(--sando-button-solid-textColor-disabled);
  }

  /* ========================================
     OUTLINE VARIANT
     ======================================== */
  :host([variant="outline"]) button,
  :host([variant="outline"]) a {
    background-color: transparent;
    color: var(--sando-button-outline-textColor-default);
    border: 1px solid var(--sando-button-outline-borderColor-default);
  }

  :host([variant="outline"]) button:hover,
  :host([variant="outline"]) a:hover {
    background-color: var(--sando-button-outline-backgroundColor-hover);
    border-color: var(--sando-button-outline-borderColor-hover);
  }

  :host([variant="outline"]) button:active,
  :host([variant="outline"]) a:active {
    background-color: var(--sando-button-outline-backgroundColor-active);
    border-color: var(--sando-button-outline-borderColor-active);
  }

  :host([variant="outline"][disabled]) button,
  :host([variant="outline"][disabled]) a {
    background-color: var(--sando-button-outline-backgroundColor-disabled);
    color: var(--sando-button-outline-textColor-disabled);
    border-color: var(--sando-button-outline-borderColor-disabled);
  }

  /* ========================================
     GHOST VARIANT
     ======================================== */
  :host([variant="ghost"]) button,
  :host([variant="ghost"]) a {
    background-color: transparent;
    color: var(--sando-button-ghost-textColor-default);
    border: none;
  }

  :host([variant="ghost"]) button:hover,
  :host([variant="ghost"]) a:hover {
    background-color: var(--sando-button-ghost-backgroundColor-hover);
  }

  :host([variant="ghost"]) button:active,
  :host([variant="ghost"]) a:active {
    background-color: var(--sando-button-ghost-backgroundColor-active);
  }

  :host([variant="ghost"][disabled]) button,
  :host([variant="ghost"][disabled]) a {
    background-color: var(--sando-button-ghost-backgroundColor-disabled);
    color: var(--sando-button-ghost-textColor-disabled);
  }

  /* ========================================
     TEXT VARIANT
     ======================================== */
  :host([variant="text"]) button,
  :host([variant="text"]) a {
    background-color: transparent;
    color: var(--sando-button-text-textColor-default);
    border: none;
    padding: 0;
    min-height: auto;
  }

  :host([variant="text"]) button:hover,
  :host([variant="text"]) a:hover {
    color: var(--sando-button-text-textColor-hover);
    text-decoration: underline;
  }

  :host([variant="text"]) button:active,
  :host([variant="text"]) a:active {
    color: var(--sando-button-text-textColor-active);
  }

  :host([variant="text"][disabled]) button,
  :host([variant="text"][disabled]) a {
    color: var(--sando-button-text-textColor-disabled);
    text-decoration: none;
  }
`;
