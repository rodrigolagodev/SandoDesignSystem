/**
 * Size Styles for Help Text
 *
 * Contains typography and spacing for each size:
 * - sm: Small size for compact inputs
 * - md: Medium size (default)
 * - lg: Large size for larger inputs
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* Small size */
  :host([size='sm']) {
    font-size: var(--sando-help-text-size-sm-fontSize);
    line-height: var(--sando-help-text-size-sm-lineHeight);
  }

  :host([size='sm'][reserve-space='true']),
  :host([size='sm']:not([reserve-space])) {
    min-height: var(--sando-help-text-size-sm-minHeight);
  }

  /* Medium size (default) */
  :host([size='md']),
  :host(:not([size])) {
    font-size: var(--sando-help-text-size-md-fontSize);
    line-height: var(--sando-help-text-size-md-lineHeight);
  }

  :host([size='md'][reserve-space='true']),
  :host([size='md']:not([reserve-space])),
  :host(:not([size])[reserve-space='true']),
  :host(:not([size]):not([reserve-space])) {
    min-height: var(--sando-help-text-size-md-minHeight);
  }

  /* Large size */
  :host([size='lg']) {
    font-size: var(--sando-help-text-size-lg-fontSize);
    line-height: var(--sando-help-text-size-lg-lineHeight);
  }

  :host([size='lg'][reserve-space='true']),
  :host([size='lg']:not([reserve-space])) {
    min-height: var(--sando-help-text-size-lg-minHeight);
  }
`;
