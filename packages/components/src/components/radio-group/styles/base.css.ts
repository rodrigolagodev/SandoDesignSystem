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

  /* Label container - using shared sando-label tokens */
  /* Note: font-size and line-height are set per size below */
  .radio-group-label {
    display: block;
    color: var(--sando-label-textColor-default);
    font-weight: var(--sando-label-fontWeight-medium);
    text-wrap: balance; /* Prevents orphan wrapping of required indicator */
  }

  /* Required indicator via ::after pseudo-element */
  .radio-group-label[data-required]::after {
    content: '*';
    color: var(--sando-label-required-textColor);
    margin-inline-start: var(--sando-label-required-marginInlineStart);
  }

  /* Small size label */
  :host([size='sm']) .radio-group-label {
    font-size: var(--sando-label-size-sm-fontSize);
    line-height: var(--sando-label-size-sm-lineHeight);
  }

  /* Medium size label (default) */
  :host([size='md']) .radio-group-label,
  .radio-group-label {
    font-size: var(--sando-label-size-md-fontSize);
    line-height: var(--sando-label-size-md-lineHeight);
  }

  /* Large size label */
  :host([size='lg']) .radio-group-label {
    font-size: var(--sando-label-size-lg-fontSize);
    line-height: var(--sando-label-size-lg-lineHeight);
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
