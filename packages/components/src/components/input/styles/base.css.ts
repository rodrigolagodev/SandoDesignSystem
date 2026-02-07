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

  /* Label styles */
  .label {
    display: block;
    margin-bottom: var(--sando-input-label-marginBottom);
    color: var(--sando-input-label-textColor-default);
    font-size: var(--sando-input-label-fontSize);
    font-weight: var(--sando-input-label-fontWeight);
  }

  :host([disabled]) .label {
    color: var(--sando-input-label-textColor-disabled);
  }

  .required-indicator {
    color: var(--sando-input-required-textColor);
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
