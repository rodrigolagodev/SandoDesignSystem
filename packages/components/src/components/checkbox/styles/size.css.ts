/**
 * Checkbox Size Styles
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
  :host([size='sm']) .checkbox-box {
    width: var(--sando-checkbox-size-sm-boxSize);
    height: var(--sando-checkbox-size-sm-boxSize);
  }

  :host([size='sm']) .checkbox-container {
    gap: var(--sando-checkbox-size-sm-gap);
  }

  :host([size='sm']) .checkbox-label {
    font-size: var(--sando-checkbox-size-sm-labelFontSize);
  }

  :host([size='sm']) .checkbox-icon svg {
    stroke-width: var(--sando-checkbox-size-sm-checkmarkStrokeWidth);
  }

  :host([size='sm']) .checkbox-description {
    margin-left: calc(var(--sando-checkbox-size-sm-boxSize) + var(--sando-checkbox-size-sm-gap));
  }

  /* ========================================
     MEDIUM SIZE (md) - default
     ======================================== */
  :host([size='md']) .checkbox-box,
  .checkbox-box {
    width: var(--sando-checkbox-size-md-boxSize);
    height: var(--sando-checkbox-size-md-boxSize);
  }

  :host([size='md']) .checkbox-container,
  .checkbox-container {
    gap: var(--sando-checkbox-size-md-gap);
  }

  :host([size='md']) .checkbox-label,
  .checkbox-label {
    font-size: var(--sando-checkbox-size-md-labelFontSize);
  }

  :host([size='md']) .checkbox-icon svg,
  .checkbox-icon svg {
    stroke-width: var(--sando-checkbox-size-md-checkmarkStrokeWidth);
  }

  /* ========================================
     LARGE SIZE (lg)
     ======================================== */
  :host([size='lg']) .checkbox-box {
    width: var(--sando-checkbox-size-lg-boxSize);
    height: var(--sando-checkbox-size-lg-boxSize);
  }

  :host([size='lg']) .checkbox-container {
    gap: var(--sando-checkbox-size-lg-gap);
  }

  :host([size='lg']) .checkbox-label {
    font-size: var(--sando-checkbox-size-lg-labelFontSize);
  }

  :host([size='lg']) .checkbox-icon svg {
    stroke-width: var(--sando-checkbox-size-lg-checkmarkStrokeWidth);
  }

  :host([size='lg']) .checkbox-description {
    margin-left: calc(var(--sando-checkbox-size-lg-boxSize) + var(--sando-checkbox-size-lg-gap));
  }
`;
