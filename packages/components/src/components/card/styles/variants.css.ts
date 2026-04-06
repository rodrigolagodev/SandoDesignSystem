/**
 * Card Variant Styles
 *
 * Contains:
 * - .card--elevated: shadow-based depth + subtle border (belt-and-suspenders)
 * - .card--outlined: border-based separation, no shadow
 * - .card--filled: tinted background
 *
 * DLD §8.2:
 * - Elevated: Level 1 shadow + optional barely-there 1px border.
 *   Both tokens exist: --sando-card-elevated-boxShadow-default and
 *   --sando-card-elevated-borderColor / --sando-card-elevated-borderWidth.
 * - Outlined: 1px border only (no shadow).
 * - Filled: background only (no border, no shadow).
 */

import { css } from 'lit';

export const variantStyles = css`
  /* ----------------------------------------
   * Elevated
   * DLD: shadow + barely-there 1px border
   * ---------------------------------------- */
  .card--elevated {
    box-shadow: var(--sando-card-elevated-boxShadow-default);
    border: var(--sando-card-elevated-borderWidth) solid var(--sando-card-elevated-borderColor);
  }

  /* ----------------------------------------
   * Outlined
   * DLD: border only, no shadow
   * ---------------------------------------- */
  .card--outlined {
    border: var(--sando-card-outlined-borderWidth) solid
      var(--sando-card-outlined-borderColor-default);
  }

  /* ----------------------------------------
   * Filled
   * DLD: tinted background, no border, no shadow
   * ---------------------------------------- */
  .card--filled {
    background-color: var(--sando-card-filled-backgroundColor);
  }
`;
