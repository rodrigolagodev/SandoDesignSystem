/**
 * Base Checkbox Styles
 *
 * Contains:
 * - Layout (flexbox, alignment)
 * - Typography
 * - Base appearance (border radius, cursor, transitions)
 * - Focus states
 *
 * Note: CSS reset and reduced motion are handled by resetStyles
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: inline-block;
    font-family: var(--sando-checkbox-label-fontFamily);
    line-height: var(--sando-checkbox-label-lineHeight);
    /* Remove native browser focus ring from host - we show custom focus on .checkbox-box */
    outline: none;
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
    /*
     * Alignment fix: Use flex-start so the checkbox box aligns to the top
     * of multi-line label text instead of vertically centering with all lines.
     * The checkbox-box has margin-top to visually center with the first line.
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

  /* Custom checkbox box */
  .checkbox-box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-width: var(--sando-checkbox-borderWidth);
    border-style: solid;
    border-radius: var(--sando-checkbox-borderRadius);
    transition-property: background-color, border-color, outline-color;
    transition-duration: var(--sando-checkbox-transition-duration);
    transition-timing-function: var(--sando-checkbox-transition-timing);
    position: relative;
    /* Prepare for focus outline */
    outline: var(--sando-checkbox-focusOutlineWidth) solid transparent;
    outline-offset: 0;
    /*
     * Vertical alignment fix: When container uses align-items: flex-start,
     * we need margin-top to visually center the box with the first line of text.
     * Formula: (lineHeight - 1em) / 2 approximates centering with x-height.
     * Using 0.125em works well for typical line-heights (1.4-1.6).
     */
    margin-top: 0.125em;
  }

  /* Focus visible on the box - uses JS-managed .focused class for reliability across Shadow DOM */
  .checkbox-box.focused {
    outline-color: var(--sando-checkbox-focusOutlineColor);
    outline-width: var(--sando-checkbox-focusOutlineWidth);
    outline-style: solid;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .checkbox-box.focused {
      outline-width: calc(var(--sando-checkbox-focusOutlineWidth) * 2);
      outline-offset: 2px;
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

  .checkbox-icon sando-icon {
    display: block;
    width: 100%;
    height: 100%;
    --icon-size: 100%;
  }

  /* Label text */
  .checkbox-label {
    font-weight: var(--sando-checkbox-label-fontWeight);
    color: var(--sando-checkbox-label-textColor-default);
    user-select: none;
    text-wrap: balance; /* Prevents orphan wrapping of required indicator */
  }

  /* Required indicator */
  .checkbox-label[data-required]::after {
    content: '*';
    color: var(--sando-checkbox-helperText-textColor-error);
    margin-inline-start: var(--sando-checkbox-requiredIndicator-marginInlineStart);
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
`;
