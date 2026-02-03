/**
 * Base Checkbox Styles
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
    font-family: var(--sando-checkbox-label-fontFamily);
    line-height: var(--sando-checkbox-label-lineHeight);
  }

  :host([disabled]) {
    pointer-events: none;
  }

  .checkbox-wrapper {
    display: inline-flex;
    flex-direction: column;
  }

  .checkbox-container {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    padding: 0.25rem;
    margin: -0.25rem;
    border-radius: var(--sando-checkbox-borderRadius);
  }

  /* Hover effect on the entire label area */
  .checkbox-container:hover {
    background-color: var(--sando-checkbox-solid-backgroundColor-hover);
  }

  /* Hidden native input - visually hidden but accessible */
  .native-input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    /* Keep it in the DOM flow for focus */
    opacity: 0;
    pointer-events: none;
  }

  /* Custom checkbox box */
  .checkbox-box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-width: var(--sando-checkbox-borderWidth);
    border-style: solid;
    border-radius: var(--sando-checkbox-borderRadius);
    transition-property: background-color, border-color, box-shadow, outline;
    transition-duration: var(--sando-checkbox-transition-duration);
    transition-timing-function: var(--sando-checkbox-transition-timing);
    position: relative;
    /* Prepare for focus outline */
    outline: 2px solid transparent;
    outline-offset: var(--sando-checkbox-focusOutlineOffset, 2px);
  }

  /* Focus visible on the box when native input is focused */
  .native-input:focus-visible ~ .checkbox-box {
    outline-color: var(--sando-checkbox-focusOutlineColor);
    outline-width: var(--sando-checkbox-focusOutlineWidth, 2px);
    outline-style: solid;
  }

  /* Fallback: also target when container has focus-within */
  .checkbox-container:focus-within .checkbox-box {
    outline-color: var(--sando-checkbox-focusOutlineColor);
    outline-width: var(--sando-checkbox-focusOutlineWidth, 2px);
    outline-style: solid;
  }

  /* Hide focus ring when not using keyboard (mouse/touch) */
  .checkbox-container:focus-within:not(:focus-visible) .checkbox-box {
    outline-color: transparent;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .native-input:focus-visible ~ .checkbox-box,
    .checkbox-container:focus-within .checkbox-box {
      outline-width: 4px;
      outline-offset: 3px;
    }
  }

  /* Checkmark and indeterminate icons container */
  .checkbox-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.5);
    width: 80%;
    height: 80%;
    opacity: 0;
    transition-property: opacity, transform;
    transition-duration: var(--sando-checkbox-transition-duration);
    transition-timing-function: var(--sando-checkbox-transition-timing);
  }

  .checkbox-icon svg {
    display: block;
    width: 100%;
    height: 100%;
    stroke-width: 2.5;
  }

  /* Label text */
  .checkbox-label {
    font-weight: var(--sando-checkbox-label-fontWeight);
    color: var(--sando-checkbox-label-textColor-default);
    user-select: none;
  }

  /* Required indicator */
  .required-indicator {
    color: var(--sando-checkbox-helperText-textColor-error);
    margin-left: 0.25em;
  }

  /* Helper and error text container */
  .checkbox-description {
    margin-top: var(--sando-checkbox-helperText-marginTop);
    margin-left: calc(
      var(--sando-checkbox-size-medium-boxSize) + var(--sando-checkbox-size-medium-gap)
    );
  }

  .helper-text {
    font-size: var(--sando-checkbox-helperText-fontSize);
    color: var(--sando-checkbox-helperText-textColor-default);
  }

  .error-text {
    font-size: var(--sando-checkbox-helperText-fontSize);
    color: var(--sando-checkbox-helperText-textColor-error);
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .checkbox-box,
    .checkbox-icon {
      transition-duration: 0.01ms !important;
    }
  }
`;
