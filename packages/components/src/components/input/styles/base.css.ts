/**
 * Base Input Styles
 *
 * Contains:
 * - Host display and font settings
 * - Input wrapper layout (flexbox, alignment)
 * - Label styles
 * - Native input reset and appearance
 * - Helper/error text containers
 *
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
  }

  :host([disabled]) .label {
    color: var(--sando-label-textColor-disabled);
  }

  .required-indicator {
    color: var(--sando-label-required-textColor);
  }

  /* Input wrapper - base layout */
  .input-wrapper {
    display: flex;
    align-items: center;
    gap: var(--sando-input-gap);
    border-radius: var(--sando-input-borderRadius);
    transition-property: border-color, background-color, box-shadow;
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

  /* Helper text */
  .helper-text {
    margin-top: var(--sando-input-helperText-marginTop);
    color: var(--sando-input-helperText-textColor-default);
    font-size: var(--sando-input-helperText-fontSize);
  }

  /* Error text */
  .error-text {
    margin-top: var(--sando-input-errorText-marginTop);
    color: var(--sando-input-errorText-textColor);
    font-size: var(--sando-input-errorText-fontSize);
  }
`;
