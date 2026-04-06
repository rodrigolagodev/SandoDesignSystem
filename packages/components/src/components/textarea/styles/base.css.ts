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

  /* Label - using shared sando-label tokens */
  /* Note: font-size and line-height are set per size in size.css.ts */
  .textarea-label {
    display: block;
    font-family: var(--sando-label-fontFamily);
    font-weight: var(--sando-label-fontWeight-medium);
    color: var(--sando-label-textColor-default);
    margin-bottom: var(--sando-label-marginBottom);
    user-select: none;
    text-wrap: balance; /* Prevents orphan wrapping of required indicator */
  }

  /* Required indicator via ::after pseudo-element */
  .textarea-label[data-required]::after {
    content: '*';
    color: var(--sando-label-required-textColor);
    margin-inline-start: var(--sando-label-required-marginInlineStart);
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
    /* DLD §7.4: transition only structural state changes — no box-shadow (focus uses outline), no outline (causes flash) */
    transition-property: background-color, border-color;
    transition-duration: var(--sando-textarea-transition-duration);
    transition-timing-function: var(--sando-textarea-transition-timing);
    /* Prepare for focus outline — transparent by default, activated on :focus-visible */
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

  /* sando-help-text styling */
  sando-help-text {
    margin-top: var(--sando-textarea-helperText-marginTop);
  }
`;
