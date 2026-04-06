/**
 * Card Variant Styles
 *
 * Contains:
 * - .card--elevated: shadow-based depth
 * - .card--outlined: border-based separation
 * - .card--filled: tinted background
 */

import { css } from 'lit';

export const variantStyles = css`
  /* ----------------------------------------
   * Elevated
   * ---------------------------------------- */
  .card--elevated {
    box-shadow: var(--sando-card-elevated-boxShadow-default);
  }

  /* ----------------------------------------
   * Outlined
   * ---------------------------------------- */
  .card--outlined {
    border: var(--sando-card-outlined-borderWidth) solid
      var(--sando-card-outlined-borderColor-default);
  }

  /* ----------------------------------------
   * Filled
   * ---------------------------------------- */
  .card--filled {
    background-color: var(--sando-card-filled-backgroundColor);
  }
`;
