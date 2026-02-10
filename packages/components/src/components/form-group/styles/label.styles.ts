/**
 * Label Styles for Form Group
 *
 * Contains:
 * - Label text styling (font, color, weight)
 * - Required indicator styling
 * - Disabled state for label
 */

import { css } from 'lit';

export const labelStyles = css`
  /* Using shared sando-label tokens for consistent label styling */
  .form-group__label {
    display: block;
    margin-bottom: var(--sando-label-marginBottom);
    color: var(--sando-label-textColor-default);
    font-size: var(--sando-label-size-md-fontSize);
    font-weight: var(--sando-label-fontWeight-medium);
    line-height: var(--sando-label-size-md-lineHeight);
  }

  :host([disabled]) .form-group__label {
    color: var(--sando-label-textColor-disabled);
  }

  .required {
    color: var(--sando-label-required-textColor);
    margin-inline-start: var(--sando-label-required-marginInlineStart);
  }
`;
