/**
 * Base Tag Styles
 *
 * Contains:
 * - Host display and layout
 * - Typography (font family, weight, line height)
 * - Base appearance (border radius, cursor, transitions)
 * - Focus states for interactive modes
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: inline-block;
    vertical-align: middle;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: var(--sando-tag-opacity-disabled);
  }

  .tag {
    /* Reset */
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    color: inherit;
    text-decoration: none;

    /* Display */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--sando-tag-gap);

    /* Typography */
    font-family: var(--sando-tag-fontFamily);
    font-weight: var(--sando-tag-fontWeight);
    line-height: var(--sando-tag-lineHeight);
    white-space: nowrap;

    /* Appearance */
    border-radius: var(--sando-tag-borderRadius);
    border-width: var(--sando-tag-borderWidth);
    border-style: solid;

    /* Transition */
    transition-property: background-color, color, border-color, box-shadow;
    transition-duration: var(--sando-tag-transition-duration);
    transition-timing-function: var(--sando-tag-transition-timing);
  }

  /* Content wrapper */
  .tag__content {
    display: inline-flex;
    align-items: center;
    gap: var(--sando-tag-gap);
  }

  /* Divider between content and icon/remove button */
  .tag__divider {
    width: var(--sando-tag-divider-width);
    height: 1.25em;
    background-color: currentColor;
    flex-shrink: 0;
    margin-inline: var(--sando-tag-gap);
  }

  /* Icon slot */
  ::slotted([slot='icon']) {
    flex-shrink: 0;
    --icon-color: currentColor;
  }

  /* Remove button */
  .tag__remove {
    /* Reset */
    all: unset;
    box-sizing: border-box;

    /* Display */
    display: inline-flex;
    align-items: center;
    justify-content: center;

    /* Size - inherits from parent */
    width: 1em;
    height: 1em;
    flex-shrink: 0;

    /* Appearance */
    border-radius: var(--sando-tag-removeButton-borderRadius);
    cursor: pointer;

    /* Background */
    background-color: var(--sando-tag-removeButton-backgroundColor-default);

    /* Transition */
    transition-property: background-color, color;
    transition-duration: var(--sando-tag-transition-duration);
    transition-timing-function: var(--sando-tag-transition-timing);
  }

  .tag__remove:hover {
    background-color: var(--sando-tag-removeButton-backgroundColor-hover);
  }

  .tag__remove:focus-visible {
    outline: var(--sando-tag-focus-outlineWidth) solid var(--sando-tag-focus-outlineColor);
    outline-offset: var(--sando-tag-focus-outlineOffset);
  }

  /* Remove icon (X) */
  .tag__remove-icon {
    width: 0.75em;
    height: 0.75em;
    fill: currentColor;
  }

  /* Focus visible for clickable tags */
  .tag--clickable:focus-visible {
    outline: var(--sando-tag-focus-outlineWidth) solid var(--sando-tag-focus-outlineColor);
    outline-offset: var(--sando-tag-focus-outlineOffset);
  }

  /* Cursor for interactive states */
  .tag--clickable {
    cursor: pointer;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .tag,
    .tag__remove {
      transition-duration: 0.01ms !important;
    }
  }
`;
