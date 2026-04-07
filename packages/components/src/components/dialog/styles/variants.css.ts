/**
 * Dialog Variant Styles
 *
 * Defines CSS custom property overrides for each size variant
 * and each surface variant (elevated / outlined).
 * Uses :host attribute selectors to set local CSS vars.
 */

import { css } from 'lit';

export const variantStyles = css`
  /* ========================================
     DEFAULT: md size + elevated surface
     ======================================== */
  :host {
    --_dialog-width: var(--sando-dialog-size-md-width);
    --_dialog-backgroundColor: var(--sando-dialog-elevated-backgroundColor);
    --_dialog-borderColor: var(--sando-dialog-elevated-borderColor);
    --_dialog-borderWidth: var(--sando-dialog-elevated-borderWidth);
    --_dialog-boxShadow: var(--sando-dialog-elevated-boxShadow);
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

  /* ========================================
     SURFACE VARIANT: elevated (explicit)
     ======================================== */
  :host([variant='elevated']) {
    --_dialog-backgroundColor: var(--sando-dialog-elevated-backgroundColor);
    --_dialog-borderColor: var(--sando-dialog-elevated-borderColor);
    --_dialog-borderWidth: var(--sando-dialog-elevated-borderWidth);
    --_dialog-boxShadow: var(--sando-dialog-elevated-boxShadow);
  }

  /* ========================================
     SURFACE VARIANT: outlined
     ======================================== */
  :host([variant='outlined']) {
    --_dialog-backgroundColor: var(--sando-dialog-outlined-backgroundColor);
    --_dialog-borderColor: var(--sando-dialog-outlined-borderColor);
    --_dialog-borderWidth: var(--sando-dialog-outlined-borderWidth);
    --_dialog-boxShadow: var(--sando-dialog-outlined-boxShadow);
  }
`;
