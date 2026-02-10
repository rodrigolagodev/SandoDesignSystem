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
    /* Remove native browser focus ring from host - we show custom focus on .radio-box */
    outline: none;
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
    /*
     * Alignment fix: Use flex-start so the radio box aligns to the top
     * of multi-line label text instead of vertically centering with all lines.
     * The radio-box has margin-top to visually center with the first line.
     */
    align-items: flex-start;
    cursor: pointer;
    position: relative;
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
    /*
     * Vertical alignment fix: When container uses align-items: flex-start,
     * we need margin-top to visually center the box with the first line of text.
     * Formula: (lineHeight - 1em) / 2 approximates centering with x-height.
     * Using 0.125em works well for typical line-heights (1.4-1.6).
     */
    margin-top: 0.125em;
  }

  /* Focus visible on the box - uses JS-managed .focused class for reliability across Shadow DOM */
  .radio-box.focused {
    outline-color: var(--sando-radio-focusOutlineColor);
    outline-width: var(--sando-radio-focusOutlineWidth);
    outline-style: solid;
  }

  /*
   * Focus ring when HOST receives keyboard focus (roving tabindex pattern)
   * The host controls tabIndex (0 or -1), so :host(:focus-visible) detects
   * keyboard navigation. This is the primary focus indicator.
   */
  :host(:focus-visible) .radio-box {
    outline-color: var(--sando-radio-focusOutlineColor);
    outline-width: var(--sando-radio-focusOutlineWidth);
    outline-style: solid;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .radio-box.focused,
    :host(:focus-visible) .radio-box {
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
    text-wrap: balance; /* Prevents orphan wrapping of required indicator */
  }

  /* Required indicator */
  .radio-label[data-required]::after {
    content: '*';
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
