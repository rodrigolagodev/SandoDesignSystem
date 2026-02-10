/**
 * Textarea Size Styles
 *
 * Contains styles for size variants:
 * - sm: Compact size for tight layouts
 * - md: Default size for most use cases
 * - lg: Larger size for more prominent inputs
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     SMALL SIZE (sm)
     ======================================== */
  :host([size='sm']) .textarea-field {
    padding-block: var(--sando-textarea-size-sm-paddingBlock);
    padding-inline: var(--sando-textarea-size-sm-paddingInline);
    font-size: var(--sando-textarea-size-sm-fontSize);
    line-height: var(--sando-textarea-size-sm-lineHeight);
    min-height: var(--sando-textarea-size-sm-minHeight);
  }

  :host([size='sm']) .textarea-label {
    font-size: var(--sando-label-size-sm-fontSize);
    line-height: var(--sando-label-size-sm-lineHeight);
  }

  /* ========================================
     MEDIUM SIZE (md) - default
     ======================================== */
  :host([size='md']) .textarea-field,
  .textarea-field {
    padding-block: var(--sando-textarea-size-md-paddingBlock);
    padding-inline: var(--sando-textarea-size-md-paddingInline);
    font-size: var(--sando-textarea-size-md-fontSize);
    line-height: var(--sando-textarea-size-md-lineHeight);
    min-height: var(--sando-textarea-size-md-minHeight);
  }

  :host([size='md']) .textarea-label,
  .textarea-label {
    font-size: var(--sando-label-size-md-fontSize);
    line-height: var(--sando-label-size-md-lineHeight);
  }

  /* ========================================
     LARGE SIZE (lg)
     ======================================== */
  :host([size='lg']) .textarea-field {
    padding-block: var(--sando-textarea-size-lg-paddingBlock);
    padding-inline: var(--sando-textarea-size-lg-paddingInline);
    font-size: var(--sando-textarea-size-lg-fontSize);
    line-height: var(--sando-textarea-size-lg-lineHeight);
    min-height: var(--sando-textarea-size-lg-minHeight);
  }

  :host([size='lg']) .textarea-label {
    font-size: var(--sando-label-size-lg-fontSize);
    line-height: var(--sando-label-size-lg-lineHeight);
  }
`;
