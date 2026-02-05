/**
 * Base Select Styles
 *
 * Contains:
 * - CSS reset
 * - Layout (flexbox, alignment)
 * - Typography
 * - Base appearance (border radius, cursor, transitions)
 * - Focus states
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: inline-block;
    width: 100%;
    font-family: var(--sando-select-fontFamily);
    line-height: var(--sando-select-lineHeight);
    position: relative;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  /* Select wrapper contains everything */
  .select-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  /* Label styles */
  .select-label {
    display: block;
    margin-bottom: var(--sando-select-label-marginBottom);
    color: var(--sando-select-label-textColor-default);
    font-size: var(--sando-select-label-fontSize);
    font-weight: var(--sando-select-label-fontWeight);
  }

  :host([disabled]) .select-label {
    color: var(--sando-select-label-textColor-disabled);
  }

  .required-indicator {
    color: var(--sando-select-required-textColor);
    margin-left: 0.25em;
  }

  /* Trigger button */
  .select-trigger {
    display: flex;
    align-items: center;
    gap: var(--sando-select-size-medium-gap);
    width: 100%;
    border-radius: var(--sando-select-borderRadius);
    border-width: var(--sando-select-borderWidth);
    border-style: solid;
    cursor: pointer;
    background: none;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    text-align: left;
    transition-property: border-color, background-color, box-shadow, outline;
    transition-duration: var(--sando-select-transition-duration);
    transition-timing-function: var(--sando-select-transition-timing);
    position: relative;
    outline: 2px solid transparent;
    outline-offset: var(--sando-select-focusOutlineOffset);
  }

  /* Focus visible on trigger */
  .select-trigger:focus-visible {
    outline-color: var(--sando-select-focusOutlineColor);
    outline-width: var(--sando-select-focusOutlineWidth);
    outline-style: solid;
  }

  /* Value display area */
  .select-value {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Placeholder text color is handled by variant tokens (e.g., --sando-select-outlined-textColor-placeholder)
     which use color.text.muted - a WCAG AA compliant muted gray. No opacity needed. */

  /* Prefix and suffix slots */
  .select-prefix,
  .select-suffix {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  /* Clear button */
  .select-clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25em;
    height: 1.25em;
    padding: 0;
    margin: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--sando-select-outlined-iconColor-default);
    border-radius: 50%;
    transition-property: color, background-color;
    transition-duration: var(--sando-select-transition-duration);
    transition-timing-function: var(--sando-select-transition-timing);
  }

  .select-clear:hover {
    color: var(--sando-select-outlined-iconColor-hover);
    background-color: var(--sando-select-option-backgroundColor-hover);
  }

  .select-clear:focus-visible {
    outline: 2px solid var(--sando-select-focusOutlineColor);
    outline-offset: 1px;
  }

  .select-clear sando-icon {
    width: 100%;
    height: 100%;
    --icon-size: 100%;
  }

  /* Caret/expand icon */
  .select-caret {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25em;
    height: 1.25em;
    flex-shrink: 0;
    transition-property: transform;
    transition-duration: var(--sando-select-transition-duration);
    transition-timing-function: var(--sando-select-transition-timing);
  }

  :host([open]) .select-caret {
    transform: rotate(180deg);
  }

  .select-caret sando-icon {
    width: 100%;
    height: 100%;
    --icon-size: 100%;
  }

  /* Helper text */
  .helper-text {
    margin-top: var(--sando-select-helperText-marginTop);
    color: var(--sando-select-helperText-textColor-default);
    font-size: var(--sando-select-helperText-fontSize);
  }

  /* Error text */
  .error-text {
    margin-top: var(--sando-select-errorText-marginTop);
    color: var(--sando-select-errorText-textColor);
    font-size: var(--sando-select-errorText-fontSize);
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .select-trigger:focus-visible {
      outline-width: 4px;
      outline-offset: 3px;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .select-trigger,
    .select-caret,
    .select-clear {
      transition-duration: 0.01ms !important;
    }
  }
`;
