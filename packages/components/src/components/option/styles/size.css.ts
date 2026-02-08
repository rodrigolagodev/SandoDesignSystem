/**
 * Option Size Styles
 *
 * Contains styles for size variants:
 * - sm: Compact size for tight spaces
 * - md: Default size for most use cases
 * - lg: Large size for emphasis
 *
 * Size is inherited from parent sando-select
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     SMALL SIZE (sm)
     ======================================== */
  :host([size='sm']) .option {
    padding-inline: var(--sando-select-option-size-sm-paddingInline);
    padding-block: var(--sando-select-option-size-sm-paddingBlock);
    min-height: var(--sando-select-option-size-sm-minHeight);
    font-size: var(--sando-select-option-size-sm-fontSize);
    gap: var(--sando-select-option-size-sm-gap);
  }

  /* ========================================
     MEDIUM SIZE (md) - default
     ======================================== */
  .option {
    padding-inline: var(--sando-select-option-size-md-paddingInline);
    padding-block: var(--sando-select-option-size-md-paddingBlock);
    min-height: var(--sando-select-option-size-md-minHeight);
    font-size: var(--sando-select-option-size-md-fontSize);
    gap: var(--sando-select-option-size-md-gap);
  }

  /* ========================================
     LARGE SIZE (lg)
     ======================================== */
  :host([size='lg']) .option {
    padding-inline: var(--sando-select-option-size-lg-paddingInline);
    padding-block: var(--sando-select-option-size-lg-paddingBlock);
    min-height: var(--sando-select-option-size-lg-minHeight);
    font-size: var(--sando-select-option-size-lg-fontSize);
    gap: var(--sando-select-option-size-lg-gap);
  }
`;
