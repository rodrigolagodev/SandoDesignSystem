/**
 * Input Size Styles
 *
 * Contains styles for the three size variants:
 * - sm: Small size
 * - md: Medium size (default)
 * - lg: Large size
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     SMALL SIZE
     ======================================== */
  :host([size='sm']) .input-wrapper {
    padding-inline: var(--sando-input-size-sm-paddingInline);
    padding-block: var(--sando-input-size-sm-paddingBlock);
    min-height: var(--sando-input-size-sm-minHeight);
  }

  :host([size='sm']) input {
    font-size: var(--sando-input-size-sm-fontSize);
  }

  :host([size='sm']) .label {
    font-size: var(--sando-label-size-sm-fontSize);
    line-height: var(--sando-label-size-sm-lineHeight);
  }

  /* ========================================
     MEDIUM SIZE (default)
     ======================================== */
  :host([size='md']) .input-wrapper,
  .input-wrapper {
    padding-inline: var(--sando-input-size-md-paddingInline);
    padding-block: var(--sando-input-size-md-paddingBlock);
    min-height: var(--sando-input-size-md-minHeight);
  }

  :host([size='md']) input,
  input {
    font-size: var(--sando-input-size-md-fontSize);
  }

  :host([size='md']) .label,
  .label {
    font-size: var(--sando-label-size-md-fontSize);
    line-height: var(--sando-label-size-md-lineHeight);
  }

  /* ========================================
     LARGE SIZE
     ======================================== */
  :host([size='lg']) .input-wrapper {
    padding-inline: var(--sando-input-size-lg-paddingInline);
    padding-block: var(--sando-input-size-lg-paddingBlock);
    min-height: var(--sando-input-size-lg-minHeight);
  }

  :host([size='lg']) input {
    font-size: var(--sando-input-size-lg-fontSize);
  }

  :host([size='lg']) .label {
    font-size: var(--sando-label-size-lg-fontSize);
    line-height: var(--sando-label-size-lg-lineHeight);
  }
`;
