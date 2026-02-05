/**
 * Base Tag Styles
 *
 * Contains:
 * - Host display and layout
 * - Typography (font family, weight, line height)
 * - Base appearance (border radius, cursor, transitions)
 * - Icon area styles (action button/link, informative icon)
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

  /* Divider between content and icon area */
  .tag__divider {
    width: var(--sando-tag-divider-width);
    height: 1.25em;
    background-color: currentColor;
    flex-shrink: 0;
    margin-inline: var(--sando-tag-gap);
  }

  /* ===== Icon Area Styles ===== */

  /* Non-interactive icon wrapper (informative mode) */
  .tag__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  /* Interactive action button/link (clickable, link, removable modes) */
  .tag__action {
    /* Reset */
    all: unset;
    box-sizing: border-box;

    /* Display */
    display: inline-flex;
    align-items: center;
    justify-content: center;

    /* Size */
    width: 1.25em;
    height: 1.25em;
    flex-shrink: 0;

    /* Appearance */
    border-radius: var(--sando-tag-action-borderRadius, var(--sando-tag-removeButton-borderRadius));
    cursor: pointer;

    /* Background */
    background-color: var(
      --sando-tag-action-backgroundColor-default,
      var(--sando-tag-removeButton-backgroundColor-default)
    );

    /* Transition */
    transition-property: background-color, color, transform;
    transition-duration: var(--sando-tag-transition-duration);
    transition-timing-function: var(--sando-tag-transition-timing);
  }

  .tag__action:hover {
    background-color: var(
      --sando-tag-action-backgroundColor-hover,
      var(--sando-tag-removeButton-backgroundColor-hover)
    );
  }

  .tag__action:active {
    transform: scale(0.95);
  }

  .tag__action:focus-visible {
    outline: var(--sando-tag-focus-outlineWidth) solid var(--sando-tag-focus-outlineColor);
    outline-offset: var(--sando-tag-focus-outlineOffset);
  }

  .tag__action:disabled,
  .tag__action[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  /* Default icon (circle-chevron-right) */
  .tag__default-icon {
    flex-shrink: 0;
    /* Size moved to size.css.ts */
  }

  /* Remove icon (X) */
  .tag__remove-icon {
    flex-shrink: 0;
    /* Size moved to size.css.ts */
  }

  /* Icon slot styling */
  ::slotted([slot='icon']) {
    flex-shrink: 0;
    --icon-color: currentColor;
    /* Size moved to size.css.ts */
  }

  /* ===== Legacy Support ===== */
  /* Keep .tag__remove for backwards compatibility during transition */

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

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .tag,
    .tag__action,
    .tag__remove {
      transition-duration: 0.01ms !important;
    }
  }
`;
