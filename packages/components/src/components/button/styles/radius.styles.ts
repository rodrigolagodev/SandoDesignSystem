/**
 * Button Radius Styles
 *
 * Contains border-radius variants:
 * - None: Sharp corners (0px)
 * - Default: Standard rounded corners (from tokens)
 * - Full: Fully rounded/circular (9999px)
 */

import { css } from 'lit';

export const radiusStyles = css`
  /* ========================================
     NONE - Sharp corners
     ======================================== */
  :host([radius='none']) button,
  :host([radius='none']) a {
    border-radius: var(--sando-button-radius-none);
  }

  /* ========================================
     DEFAULT - Standard rounded
     Uses token value (handled by base styles)
     ======================================== */
  /* No styles needed - default is set in base.styles.ts */

  /* ========================================
     FULL - Fully rounded/circular
     Perfect for icon-only buttons
     ======================================== */
  :host([radius='full']) button,
  :host([radius='full']) a {
    border-radius: var(--sando-button-radius-full);
  }
`;
