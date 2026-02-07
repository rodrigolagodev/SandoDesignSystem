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
  .form-group__label {
    display: block;
    margin-bottom: var(--sando-form-group-label-marginBottom);
    color: var(--sando-form-group-label-textColor-default);
    font-size: var(--sando-form-group-label-fontSize);
    font-weight: var(--sando-form-group-label-fontWeight);
    line-height: var(--sando-form-group-label-lineHeight);
  }

  :host([disabled]) .form-group__label {
    color: var(--sando-form-group-label-textColor-disabled);
  }

  .required {
    color: var(--sando-form-group-required-textColor);
    margin-inline-start: var(--sando-form-group-required-marginInlineStart);
  }
`;
