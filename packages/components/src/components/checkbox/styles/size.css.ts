/**
 * Checkbox Size Styles
 *
 * Contains styles for size variants:
 * - Small: Compact size for tight layouts
 * - Medium: Default size for most use cases
 * - Large: Larger touch target for mobile
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     SMALL SIZE
     ======================================== */
  :host([size='small']) .checkbox-box {
    width: var(--sando-checkbox-size-small-boxSize);
    height: var(--sando-checkbox-size-small-boxSize);
  }

  :host([size='small']) .checkbox-container {
    gap: var(--sando-checkbox-size-small-gap);
  }

  :host([size='small']) .checkbox-label {
    font-size: var(--sando-checkbox-size-small-labelFontSize);
  }

  :host([size='small']) .checkbox-icon svg {
    stroke-width: var(--sando-checkbox-size-small-checkmarkStrokeWidth);
  }

  :host([size='small']) .checkbox-description {
    margin-left: calc(
      var(--sando-checkbox-size-small-boxSize) + var(--sando-checkbox-size-small-gap)
    );
  }

  /* ========================================
     MEDIUM SIZE (default)
     ======================================== */
  :host([size='medium']) .checkbox-box,
  .checkbox-box {
    width: var(--sando-checkbox-size-medium-boxSize);
    height: var(--sando-checkbox-size-medium-boxSize);
  }

  :host([size='medium']) .checkbox-container,
  .checkbox-container {
    gap: var(--sando-checkbox-size-medium-gap);
  }

  :host([size='medium']) .checkbox-label,
  .checkbox-label {
    font-size: var(--sando-checkbox-size-medium-labelFontSize);
  }

  :host([size='medium']) .checkbox-icon svg,
  .checkbox-icon svg {
    stroke-width: var(--sando-checkbox-size-medium-checkmarkStrokeWidth);
  }

  /* ========================================
     LARGE SIZE
     ======================================== */
  :host([size='large']) .checkbox-box {
    width: var(--sando-checkbox-size-large-boxSize);
    height: var(--sando-checkbox-size-large-boxSize);
  }

  :host([size='large']) .checkbox-container {
    gap: var(--sando-checkbox-size-large-gap);
  }

  :host([size='large']) .checkbox-label {
    font-size: var(--sando-checkbox-size-large-labelFontSize);
  }

  :host([size='large']) .checkbox-icon svg {
    stroke-width: var(--sando-checkbox-size-large-checkmarkStrokeWidth);
  }

  :host([size='large']) .checkbox-description {
    margin-left: calc(
      var(--sando-checkbox-size-large-boxSize) + var(--sando-checkbox-size-large-gap)
    );
  }
`;
