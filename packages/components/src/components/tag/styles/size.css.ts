/**
 * Tag Size Styles
 *
 * Contains styles for the three size variants:
 * - Small: Compact tags for dense layouts
 * - Medium: Default size for most use cases
 * - Large: Larger tags for emphasis or touch targets
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     SMALL SIZE
     ======================================== */
  :host([size='small']) .tag {
    padding-inline: var(--sando-tag-size-small-paddingInline);
    padding-block: var(--sando-tag-size-small-paddingBlock);
    font-size: var(--sando-tag-size-small-fontSize);
    min-height: var(--sando-tag-size-small-minHeight);
  }

  :host([size='small']) .tag__remove {
    width: var(--sando-tag-size-small-iconSize);
    height: var(--sando-tag-size-small-iconSize);
  }

  /* ========================================
     MEDIUM SIZE (Default)
     ======================================== */
  :host([size='medium']) .tag,
  :host(:not([size])) .tag {
    padding-inline: var(--sando-tag-size-medium-paddingInline);
    padding-block: var(--sando-tag-size-medium-paddingBlock);
    font-size: var(--sando-tag-size-medium-fontSize);
    min-height: var(--sando-tag-size-medium-minHeight);
  }

  :host([size='medium']) .tag__remove,
  :host(:not([size])) .tag__remove {
    width: var(--sando-tag-size-medium-iconSize);
    height: var(--sando-tag-size-medium-iconSize);
  }

  /* ========================================
     LARGE SIZE
     ======================================== */
  :host([size='large']) .tag {
    padding-inline: var(--sando-tag-size-large-paddingInline);
    padding-block: var(--sando-tag-size-large-paddingBlock);
    font-size: var(--sando-tag-size-large-fontSize);
    min-height: var(--sando-tag-size-large-minHeight);
  }

  :host([size='large']) .tag__remove {
    width: var(--sando-tag-size-large-iconSize);
    height: var(--sando-tag-size-large-iconSize);
  }
`;
