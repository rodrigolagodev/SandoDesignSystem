/**
 * Select Size Styles
 *
 * Contains styles for size variants:
 * - small: Compact size for tight spaces
 * - medium: Default size for most use cases
 * - large: Large size for emphasis
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     SMALL SIZE
     ======================================== */
  :host([size='small']) .select-trigger {
    padding-inline: var(--sando-select-size-small-paddingInline);
    padding-block: var(--sando-select-size-small-paddingBlock);
    min-height: var(--sando-select-size-small-minHeight);
    font-size: var(--sando-select-size-small-fontSize);
    gap: var(--sando-select-size-small-gap);
  }

  :host([size='small']) .select-caret,
  :host([size='small']) .select-clear {
    width: 1em;
    height: 1em;
  }

  /* ========================================
     MEDIUM SIZE (default)
     ======================================== */
  .select-trigger {
    padding-inline: var(--sando-select-size-medium-paddingInline);
    padding-block: var(--sando-select-size-medium-paddingBlock);
    min-height: var(--sando-select-size-medium-minHeight);
    font-size: var(--sando-select-size-medium-fontSize);
    gap: var(--sando-select-size-medium-gap);
  }

  /* ========================================
     LARGE SIZE
     ======================================== */
  :host([size='large']) .select-trigger {
    padding-inline: var(--sando-select-size-large-paddingInline);
    padding-block: var(--sando-select-size-large-paddingBlock);
    min-height: var(--sando-select-size-large-minHeight);
    font-size: var(--sando-select-size-large-fontSize);
    gap: var(--sando-select-size-large-gap);
  }

  :host([size='large']) .select-caret,
  :host([size='large']) .select-clear {
    width: 1.5em;
    height: 1.5em;
  }
`;
