/**
 * Radio Size Styles
 *
 * Contains styles for size variants:
 * - sm: Compact size for tight layouts
 * - md: Default size for most use cases
 * - lg: Larger touch target for mobile
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     SMALL SIZE (sm)
     ======================================== */
  :host([size='sm']) .radio-box {
    width: var(--sando-radio-size-sm-boxSize);
    height: var(--sando-radio-size-sm-boxSize);
  }

  :host([size='sm']) .radio-dot {
    width: var(--sando-radio-size-sm-dotSize);
    height: var(--sando-radio-size-sm-dotSize);
  }

  :host([size='sm']) .radio-container {
    gap: var(--sando-radio-size-sm-gap);
  }

  :host([size='sm']) .radio-label {
    font-size: var(--sando-radio-size-sm-labelFontSize);
  }

  :host([size='sm']) .radio-description {
    margin-left: calc(var(--sando-radio-size-sm-boxSize) + var(--sando-radio-size-sm-gap));
  }

  /* ========================================
     MEDIUM SIZE (md) - default
     ======================================== */
  :host([size='md']) .radio-box,
  .radio-box {
    width: var(--sando-radio-size-md-boxSize);
    height: var(--sando-radio-size-md-boxSize);
  }

  :host([size='md']) .radio-dot,
  .radio-dot {
    width: var(--sando-radio-size-md-dotSize);
    height: var(--sando-radio-size-md-dotSize);
  }

  :host([size='md']) .radio-container,
  .radio-container {
    gap: var(--sando-radio-size-md-gap);
  }

  :host([size='md']) .radio-label,
  .radio-label {
    font-size: var(--sando-radio-size-md-labelFontSize);
  }

  /* ========================================
     LARGE SIZE (lg)
     ======================================== */
  :host([size='lg']) .radio-box {
    width: var(--sando-radio-size-lg-boxSize);
    height: var(--sando-radio-size-lg-boxSize);
  }

  :host([size='lg']) .radio-dot {
    width: var(--sando-radio-size-lg-dotSize);
    height: var(--sando-radio-size-lg-dotSize);
  }

  :host([size='lg']) .radio-container {
    gap: var(--sando-radio-size-lg-gap);
  }

  :host([size='lg']) .radio-label {
    font-size: var(--sando-radio-size-lg-labelFontSize);
  }

  :host([size='lg']) .radio-description {
    margin-left: calc(var(--sando-radio-size-lg-boxSize) + var(--sando-radio-size-lg-gap));
  }
`;
