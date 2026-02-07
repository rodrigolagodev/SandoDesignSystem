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
`;
