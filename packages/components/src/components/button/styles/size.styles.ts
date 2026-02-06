/**
 * Button Size Styles
 *
 * Contains styles for the three size variants:
 * - sm: Small size for compact UIs
 * - md: Medium size (default, WCAG compliant)
 * - lg: Large size for prominent actions
 *
 * Also includes icon-only mode (square aspect ratio)
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     SMALL SIZE
     ======================================== */
  :host([size='sm']) button,
  :host([size='sm']) a {
    padding: var(--sando-button-size-sm-paddingBlock) var(--sando-button-size-sm-paddingInline);
    font-size: var(--sando-button-size-sm-fontSize);
    min-height: var(--sando-button-size-sm-minHeight);
  }

  /* ========================================
     MEDIUM SIZE (Default)
     ======================================== */
  :host([size='md']) button,
  :host([size='md']) a {
    padding: var(--sando-button-size-md-paddingBlock) var(--sando-button-size-md-paddingInline);
    font-size: var(--sando-button-size-md-fontSize);
    min-height: var(--sando-button-size-md-minHeight);
  }

  /* ========================================
     LARGE SIZE
     ======================================== */
  :host([size='lg']) button,
  :host([size='lg']) a {
    padding: var(--sando-button-size-lg-paddingBlock) var(--sando-button-size-lg-paddingInline);
    font-size: var(--sando-button-size-lg-fontSize);
    min-height: var(--sando-button-size-lg-minHeight);
  }

  /* ========================================
     ICON-ONLY MODE
     Square buttons with 1:1 aspect ratio
     ======================================== */
  :host([icon-only][size='sm']) button,
  :host([icon-only][size='sm']) a {
    padding: var(--sando-button-size-sm-paddingBlock);
    aspect-ratio: 1;
  }

  :host([icon-only][size='md']) button,
  :host([icon-only][size='md']) a {
    padding: var(--sando-button-size-md-paddingBlock);
    aspect-ratio: 1;
  }

  :host([icon-only][size='lg']) button,
  :host([icon-only][size='lg']) a {
    padding: var(--sando-button-size-lg-paddingBlock);
    aspect-ratio: 1;
  }
`;
