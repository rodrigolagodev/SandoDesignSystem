/**
 * Dialog Variant Styles
 *
 * Defines CSS custom property overrides for each surface variant
 * (elevated / outlined).
 * Uses :host attribute selectors to set local CSS vars.
 */

import { css } from 'lit';

export const variantStyles = css`
  /* ========================================
     DEFAULT: elevated surface
     ======================================== */
  :host {
    --sando-dialog-width: var(--sando-dialog-width, clamp(320px, 90vw, 560px));
    --_dialog-backgroundColor: var(--sando-dialog-elevated-backgroundColor);
    --_dialog-borderColor: var(--sando-dialog-elevated-borderColor);
    --_dialog-borderWidth: var(--sando-dialog-elevated-borderWidth);
    --_dialog-boxShadow: var(--sando-dialog-elevated-boxShadow);
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
