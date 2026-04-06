/**
 * Card Padding Styles
 *
 * Applies padding to header, body, and footer sections.
 * Media slot is intentionally excluded (flush to edges).
 */

import { css } from 'lit';

export const paddingStyles = css`
  /* none — media still flush, sections have no padding */
  .card--padding-none .card__header,
  .card--padding-none .card__body,
  .card--padding-none .card__footer {
    padding: 0;
  }

  /* sm */
  .card--padding-sm .card__header,
  .card--padding-sm .card__body,
  .card--padding-sm .card__footer {
    padding-inline: var(--sando-card-padding-sm);
  }

  .card--padding-sm .card__header {
    padding-top: var(--sando-card-padding-sm);
  }

  .card--padding-sm .card__footer {
    padding-bottom: var(--sando-card-padding-sm);
  }

  /* md (default) */
  .card--padding-md .card__header,
  .card--padding-md .card__body,
  .card--padding-md .card__footer {
    padding-inline: var(--sando-card-padding-md);
  }

  .card--padding-md .card__header {
    padding-top: var(--sando-card-padding-md);
  }

  .card--padding-md .card__footer {
    padding-bottom: var(--sando-card-padding-md);
  }

  /* lg */
  .card--padding-lg .card__header,
  .card--padding-lg .card__body,
  .card--padding-lg .card__footer {
    padding-inline: var(--sando-card-padding-lg);
  }

  .card--padding-lg .card__header {
    padding-top: var(--sando-card-padding-lg);
  }

  .card--padding-lg .card__footer {
    padding-bottom: var(--sando-card-padding-lg);
  }
`;
