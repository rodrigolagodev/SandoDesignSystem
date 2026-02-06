/**
 * Select Size Styles
 *
 * Contains styles for size variants:
 * - sm: Compact size for tight spaces
 * - md: Default size for most use cases
 * - lg: Large size for emphasis
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     SMALL SIZE (sm)
     ======================================== */
  :host([size='sm']) .select-trigger {
    padding-inline: var(--sando-select-size-sm-paddingInline);
    padding-block: var(--sando-select-size-sm-paddingBlock);
    min-height: var(--sando-select-size-sm-minHeight);
    font-size: var(--sando-select-size-sm-fontSize);
    gap: var(--sando-select-size-sm-gap);
  }

  :host([size='sm']) .select-caret,
  :host([size='sm']) .select-clear,
  :host([size='sm']) .select-prefix {
    width: 1em;
    height: 1em;
  }

  /* ========================================
     MEDIUM SIZE (md) - default
     ======================================== */
  .select-trigger {
    padding-inline: var(--sando-select-size-md-paddingInline);
    padding-block: var(--sando-select-size-md-paddingBlock);
    min-height: var(--sando-select-size-md-minHeight);
    font-size: var(--sando-select-size-md-fontSize);
    gap: var(--sando-select-size-md-gap);
  }

  /* ========================================
     LARGE SIZE (lg)
     ======================================== */
  :host([size='lg']) .select-trigger {
    padding-inline: var(--sando-select-size-lg-paddingInline);
    padding-block: var(--sando-select-size-lg-paddingBlock);
    min-height: var(--sando-select-size-lg-minHeight);
    font-size: var(--sando-select-size-lg-fontSize);
    gap: var(--sando-select-size-lg-gap);
  }

  :host([size='lg']) .select-caret,
  :host([size='lg']) .select-clear,
  :host([size='lg']) .select-prefix {
    width: 1.5em;
    height: 1.5em;
  }

  /* ========================================
     MULTI-SELECT PADDING OVERRIDES
     Reduces vertical padding when tags are displayed
     ======================================== */

  /* Small multi-select */
  :host([size='sm'][multiple]) .select-trigger {
    padding-block: var(--sando-select-multiSelect-size-sm-paddingBlock);
  }

  /* Medium multi-select (default size) */
  :host([multiple]:not([size])) .select-trigger,
  :host([size='md'][multiple]) .select-trigger {
    padding-block: var(--sando-select-multiSelect-size-md-paddingBlock);
  }

  /* Large multi-select */
  :host([size='lg'][multiple]) .select-trigger {
    padding-block: var(--sando-select-multiSelect-size-lg-paddingBlock);
  }
`;
