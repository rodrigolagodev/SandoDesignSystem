/**
 * Base Radio Group Styles
 *
 * Contains:
 * - Host display and reset
 * - Layout (flexbox, vertical stacking)
 * - Typography (font family)
 * - Options container styling
 * - Orientation variants (vertical/horizontal)
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: block;
    font-family: var(--sando-radio-group-fontFamily);
  }

  .radio-group {
    display: flex;
    flex-direction: column;
    gap: var(--sando-radio-group-gap);
  }

  /* Label container */
  .radio-group-label {
    display: block;
    color: var(--sando-radio-group-label-textColor-default);
    font-size: var(--sando-radio-group-label-fontSize);
    font-weight: var(--sando-radio-group-label-fontWeight);
    line-height: var(--sando-radio-group-label-lineHeight);
  }

  /* Required indicator */
  .required-indicator {
    color: var(--sando-radio-group-required-textColor);
    margin-inline-start: var(--sando-radio-group-required-marginInlineStart);
  }

  /* Options container - default vertical */
  .radio-group-options {
    display: flex;
    flex-direction: column;
    gap: var(--sando-radio-group-optionsGap);
  }

  /* Horizontal orientation */
  :host([orientation='horizontal']) .radio-group-options {
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--sando-radio-group-orientation-horizontal-gap);
  }

  /* Description (helper/error) container */
  .radio-group-description {
    margin-top: var(--sando-radio-group-helperText-marginTop);
    font-size: var(--sando-radio-group-helperText-fontSize);
    line-height: var(--sando-radio-group-helperText-lineHeight);
  }

  /* Helper text */
  .helper-text {
    color: var(--sando-radio-group-helperText-textColor-default);
  }

  /* Error text */
  .error-text {
    color: var(--sando-radio-group-helperText-textColor-error);
  }
`;
