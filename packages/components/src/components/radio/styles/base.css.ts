/**
 * Base Radio Styles
 *
 * Contains:
 * - Layout (flexbox, alignment)
 * - Typography
 * - Base appearance (border radius, cursor, transitions)
 * - Focus states
 *
 * Note: CSS reset and reduced motion are handled by resetStyles
 * Key difference from checkbox: border-radius: 50% for circular shape
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: inline-block;
    font-family: var(--sando-radio-label-fontFamily);
    line-height: var(--sando-radio-label-lineHeight);
  }

  :host([disabled]) {
    pointer-events: none;
  }

  .radio-wrapper {
    display: inline-flex;
    flex-direction: column;
  }

  .radio-container {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    /* Use focusOutlineOffset token (0.25rem) for hover area padding */
    padding: var(--sando-radio-focusOutlineOffset);
    margin: calc(-1 * var(--sando-radio-focusOutlineOffset));
    /* Container uses default border-radius (Layer 2 semantic token) */
    /* TODO: Add --sando-radio-container-borderRadius recipe token */
    border-radius: var(--sando-border-radius-default);
  }

  /* Hover effect on the entire label area */
  .radio-container:hover {
    background-color: var(--sando-radio-solid-backgroundColor-hover);
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

  /* Custom radio box - circular shape */
  .radio-box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-width: var(--sando-radio-borderWidth);
    border-style: solid;
    /* Circular shape - key difference from checkbox */
    border-radius: var(--sando-radio-borderRadius);
    transition-property: background-color, border-color, box-shadow, outline;
    transition-duration: var(--sando-radio-transition-duration);
    transition-timing-function: var(--sando-radio-transition-timing);
    position: relative;
    /* Prepare for focus outline */
    outline: var(--sando-radio-focusOutlineWidth) solid transparent;
    outline-offset: var(--sando-radio-focusOutlineOffset);
  }

  /* Focus visible on the box when native input is focused */
  .native-input:focus-visible ~ .radio-box {
    outline-color: var(--sando-radio-focusOutlineColor);
    outline-width: var(--sando-radio-focusOutlineWidth);
    outline-style: solid;
  }

  /* Fallback: also target when container has focus-within */
  .radio-container:focus-within .radio-box {
    outline-color: var(--sando-radio-focusOutlineColor);
    outline-width: var(--sando-radio-focusOutlineWidth);
    outline-style: solid;
  }

  /* Hide focus ring when not using keyboard (mouse/touch) */
  .radio-container:focus-within:not(:focus-visible) .radio-box {
    outline-color: transparent;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .native-input:focus-visible ~ .radio-box,
    .radio-container:focus-within .radio-box {
      outline-width: calc(var(--sando-radio-focusOutlineWidth) * 2);
      outline-offset: calc(var(--sando-radio-focusOutlineOffset) * 1.5);
    }
  }

  /* Dot indicator - centered circular dot for checked state */
  .radio-dot {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    border-radius: 50%;
    opacity: 0;
    transition-property: opacity, transform;
    transition-duration: var(--sando-radio-transition-duration);
    transition-timing-function: var(--sando-radio-transition-timing);
  }

  /* Label text */
  .radio-label {
    font-weight: var(--sando-radio-label-fontWeight);
    color: var(--sando-radio-label-textColor-default);
    user-select: none;
  }

  /* Required indicator */
  .required-indicator {
    color: var(--sando-radio-helperText-textColor-error);
    margin-inline-start: var(--sando-radio-requiredIndicator-marginInlineStart);
  }

  /* Helper and error text container */
  .radio-description {
    margin-top: var(--sando-radio-helperText-marginTop);
    margin-left: calc(var(--sando-radio-size-md-boxSize) + var(--sando-radio-size-md-gap));
  }

  .helper-text {
    font-size: var(--sando-radio-helperText-fontSize);
    color: var(--sando-radio-helperText-textColor-default);
  }

  .error-text {
    font-size: var(--sando-radio-helperText-fontSize);
    color: var(--sando-radio-helperText-textColor-error);
  }
`;
