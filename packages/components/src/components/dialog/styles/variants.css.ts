/**
 * Dialog Variant Styles
 *
 * Defines CSS custom property overrides for each size variant.
 * Uses :host attribute selectors to set local --_dialog-width.
 */

import { css } from 'lit';

export const variantStyles = css`
  /* ========================================
     DEFAULT: md
     ======================================== */
  :host {
    --_dialog-width: var(--sando-dialog-size-md-width);
  }

  /* ========================================
     SIZE: sm
     ======================================== */
  :host([size='sm']) {
    --_dialog-width: var(--sando-dialog-size-sm-width);
  }

  /* ========================================
     SIZE: md (explicit)
     ======================================== */
  :host([size='md']) {
    --_dialog-width: var(--sando-dialog-size-md-width);
  }

  /* ========================================
     SIZE: lg
     ======================================== */
  :host([size='lg']) {
    --_dialog-width: var(--sando-dialog-size-lg-width);
  }

  /* ========================================
     SIZE: full
     ======================================== */
  :host([size='full']) {
    --_dialog-width: var(--sando-dialog-size-full-width);
  }
`;
