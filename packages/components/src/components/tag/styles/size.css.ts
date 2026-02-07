/**
 * Tag Size Styles
 *
 * Contains styles for the three size variants:
 * - sm: Compact tags for dense layouts
 * - md: Default size for most use cases
 * - lg: Larger tags for emphasis or touch targets
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     SMALL SIZE (sm)
     ======================================== */
  :host([size='sm']) .tag {
    padding-inline: var(--sando-tag-size-sm-paddingInline);
    padding-block: var(--sando-tag-size-sm-paddingBlock);
    font-size: var(--sando-tag-size-sm-fontSize);
    min-height: var(--sando-tag-size-sm-minHeight);
  }

  /* Icon sizes for sm - use custom-size for sando-icon */
  :host([size='sm']) .tag__default-icon,
  :host([size='sm']) .tag__remove-icon {
    --icon-size: var(--sando-tag-size-sm-iconSize);
  }

  :host([size='sm']) ::slotted([slot='icon']) {
    width: var(--sando-tag-size-sm-iconSize);
    height: var(--sando-tag-size-sm-iconSize);
  }

  :host([size='sm']) .tag__action,
  :host([size='sm']) .tag__icon {
    width: var(--sando-tag-size-sm-iconSize);
    height: var(--sando-tag-size-sm-iconSize);
  }

  /* ========================================
     MEDIUM SIZE (md) - Default
     ======================================== */
  :host([size='md']) .tag,
  :host(:not([size])) .tag {
    padding-inline: var(--sando-tag-size-md-paddingInline);
    padding-block: var(--sando-tag-size-md-paddingBlock);
    font-size: var(--sando-tag-size-md-fontSize);
    min-height: var(--sando-tag-size-md-minHeight);
  }

  /* Icon sizes for md (default) - use custom-size for sando-icon */
  :host([size='md']) .tag__default-icon,
  :host([size='md']) .tag__remove-icon,
  :host(:not([size])) .tag__default-icon,
  :host(:not([size])) .tag__remove-icon {
    --icon-size: var(--sando-tag-size-md-iconSize);
  }

  :host([size='md']) ::slotted([slot='icon']),
  :host(:not([size])) ::slotted([slot='icon']) {
    width: var(--sando-tag-size-md-iconSize);
    height: var(--sando-tag-size-md-iconSize);
  }

  :host([size='md']) .tag__action,
  :host([size='md']) .tag__icon,
  :host(:not([size])) .tag__action,
  :host(:not([size])) .tag__icon {
    width: var(--sando-tag-size-md-iconSize);
    height: var(--sando-tag-size-md-iconSize);
  }

  /* ========================================
     LARGE SIZE (lg)
     ======================================== */
  :host([size='lg']) .tag {
    padding-inline: var(--sando-tag-size-lg-paddingInline);
    padding-block: var(--sando-tag-size-lg-paddingBlock);
    font-size: var(--sando-tag-size-lg-fontSize);
    min-height: var(--sando-tag-size-lg-minHeight);
  }

  /* Icon sizes for lg - use custom-size for sando-icon */
  :host([size='lg']) .tag__default-icon,
  :host([size='lg']) .tag__remove-icon {
    --icon-size: var(--sando-tag-size-lg-iconSize);
  }

  :host([size='lg']) ::slotted([slot='icon']) {
    width: var(--sando-tag-size-lg-iconSize);
    height: var(--sando-tag-size-lg-iconSize);
  }

  :host([size='lg']) .tag__action,
  :host([size='lg']) .tag__icon {
    width: var(--sando-tag-size-lg-iconSize);
    height: var(--sando-tag-size-lg-iconSize);
  }

  /* ========================================
     COMPACT MODE
     Reduces vertical padding for tight spaces
     Removes min-height constraint
     Works with all sizes
     ======================================== */
  :host([compact][size='sm']) .tag {
    padding-block: var(--sando-tag-compact-sm-paddingBlock);
    min-height: auto;
  }

  :host([compact][size='md']) .tag,
  :host([compact]:not([size])) .tag {
    padding-block: var(--sando-tag-compact-md-paddingBlock);
    min-height: auto;
  }

  :host([compact][size='lg']) .tag {
    padding-block: var(--sando-tag-compact-lg-paddingBlock);
    min-height: auto;
  }
`;
