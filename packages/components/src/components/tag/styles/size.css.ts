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

  /* Icon sizes for small - use custom-size for sando-icon */
  :host([size='small']) .tag__default-icon,
  :host([size='small']) .tag__remove-icon {
    --icon-size: var(--sando-tag-size-small-iconSize);
  }

  :host([size='small']) ::slotted([slot='icon']) {
    width: var(--sando-tag-size-small-iconSize);
    height: var(--sando-tag-size-small-iconSize);
  }

  :host([size='small']) .tag__action,
  :host([size='small']) .tag__icon {
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

  /* Icon sizes for medium (default) - use custom-size for sando-icon */
  :host([size='medium']) .tag__default-icon,
  :host([size='medium']) .tag__remove-icon,
  :host(:not([size])) .tag__default-icon,
  :host(:not([size])) .tag__remove-icon {
    --icon-size: var(--sando-tag-size-medium-iconSize);
  }

  :host([size='medium']) ::slotted([slot='icon']),
  :host(:not([size])) ::slotted([slot='icon']) {
    width: var(--sando-tag-size-medium-iconSize);
    height: var(--sando-tag-size-medium-iconSize);
  }

  :host([size='medium']) .tag__action,
  :host([size='medium']) .tag__icon,
  :host(:not([size])) .tag__action,
  :host(:not([size])) .tag__icon {
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

  /* Icon sizes for large - use custom-size for sando-icon */
  :host([size='large']) .tag__default-icon,
  :host([size='large']) .tag__remove-icon {
    --icon-size: var(--sando-tag-size-large-iconSize);
  }

  :host([size='large']) ::slotted([slot='icon']) {
    width: var(--sando-tag-size-large-iconSize);
    height: var(--sando-tag-size-large-iconSize);
  }

  :host([size='large']) .tag__action,
  :host([size='large']) .tag__icon {
    width: var(--sando-tag-size-large-iconSize);
    height: var(--sando-tag-size-large-iconSize);
  }
`;
