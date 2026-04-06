/**
 * Base Input Styles
 *
 * Contains:
 * - Host display and font settings
 * - Input wrapper layout (flexbox, alignment)
 * - Label styles
 * - Native input reset and appearance
 *
 * Note: Helper/error text is now handled by sando-help-text component
 * Note: CSS reset is handled by resetStyles (imported separately)
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: inline-block;
    width: 100%;
    font-family: var(--sando-input-fontFamily);
    line-height: var(--sando-input-lineHeight);
  }

  /* Label styles - using shared sando-label tokens */
  /* Note: font-size and line-height are set per size in size.css.ts */
  .label {
    display: block;
    margin-bottom: var(--sando-label-marginBottom);
    color: var(--sando-label-textColor-default);
    font-weight: var(--sando-label-fontWeight-medium);
    text-wrap: balance; /* Prevents orphan wrapping of required indicator */
  }

  :host([disabled]) .label {
    color: var(--sando-label-textColor-disabled);
  }

  /* Required indicator via ::after pseudo-element */
  .label[data-required]::after {
    content: '*';
    color: var(--sando-label-required-textColor);
    margin-inline-start: var(--sando-label-required-marginInlineStart);
  }

  /* Input wrapper - base layout */
  .input-wrapper {
    display: flex;
    align-items: center;
    gap: var(--sando-input-gap);
    border-radius: var(--sando-input-borderRadius);
    /* DLD §7.4: transition only structural state changes — no box-shadow (focus uses outline) */
    transition-property: border-color, background-color;
    transition-duration: var(--sando-input-transition-duration);
    transition-timing-function: var(--sando-input-transition-timing);
  }

  /* Native input element - reset and base appearance */
  input {
    flex: 1;
    min-width: 0;
    /* Reset outline (not handled by global reset) */
    outline: none;
  }

  /* Help text spacing - component handles its own styling */
  sando-help-text {
    margin-top: var(--sando-input-helperText-marginTop);
  }
`;
