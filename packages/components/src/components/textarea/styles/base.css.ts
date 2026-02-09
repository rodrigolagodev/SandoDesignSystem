/**
 * Base Textarea Styles
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
    display: block;
    font-family: var(--sando-textarea-fontFamily);
    /* Remove native browser focus ring from host - we show custom focus on textarea */
    outline: none;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  .textarea-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  /* Label */
  .textarea-label {
    display: block;
    font-family: var(--sando-textarea-label-fontFamily);
    font-size: var(--sando-textarea-label-fontSize);
    font-weight: var(--sando-textarea-label-fontWeight);
    line-height: var(--sando-textarea-label-lineHeight);
    color: var(--sando-textarea-label-textColor-default);
    margin-bottom: var(--sando-textarea-helperText-marginTop);
    user-select: none;
  }

  /* Required indicator */
  .required-indicator {
    color: var(--sando-textarea-helperText-textColor-error);
    margin-inline-start: var(--sando-textarea-requiredIndicator-marginInlineStart);
  }

  /* Native textarea element */
  .textarea-field {
    display: block;
    width: 100%;
    font-family: inherit;
    line-height: var(--sando-textarea-size-md-lineHeight);
    border-width: var(--sando-textarea-borderWidth);
    border-style: solid;
    border-radius: var(--sando-textarea-borderRadius);
    transition-property: background-color, border-color, box-shadow, outline;
    transition-duration: var(--sando-textarea-transition-duration);
    transition-timing-function: var(--sando-textarea-transition-timing);
    /* Prepare for focus outline */
    outline: var(--sando-textarea-focusOutlineWidth) solid transparent;
    outline-offset: var(--sando-textarea-focusOutlineOffset);
    /* Remove native resize handle - we control via resize property */
    resize: var(--sando-textarea-resize-default);
  }

  /* Focus visible state */
  .textarea-field:focus-visible {
    outline-color: var(--sando-textarea-focusOutlineColor);
    outline-width: var(--sando-textarea-focusOutlineWidth);
    outline-style: solid;
  }

  /* Placeholder styling */
  .textarea-field::placeholder {
    color: var(--sando-textarea-outlined-textColor-placeholder);
    opacity: 1; /* Override Firefox's reduced opacity */
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .textarea-field:focus-visible {
      outline-width: calc(var(--sando-textarea-focusOutlineWidth) * 2);
      outline-offset: calc(var(--sando-textarea-focusOutlineOffset) * 1.5);
    }
  }

  /* Helper and error text container */
  .textarea-description {
    margin-top: var(--sando-textarea-helperText-marginTop);
  }

  .helper-text {
    font-size: var(--sando-textarea-helperText-fontSize);
    color: var(--sando-textarea-helperText-textColor-default);
  }

  .error-text {
    font-size: var(--sando-textarea-helperText-fontSize);
    color: var(--sando-textarea-helperText-textColor-error);
  }
`;
