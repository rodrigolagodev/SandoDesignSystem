/**
 * Card Border Radius Styles
 *
 * Controls corner rounding for the card container.
 * Media slot clips to the card corners via overflow: hidden on .card.
 */

import { css } from 'lit';

export const radiusStyles = css`
  .card--radius-none {
    border-radius: var(--sando-card-borderRadius-none);
  }

  .card--radius-default {
    border-radius: var(--sando-card-borderRadius-default);
  }

  .card--radius-full {
    border-radius: var(--sando-card-borderRadius-full);
  }
`;
