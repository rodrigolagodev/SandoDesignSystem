/**
 * Card Orientation Styles
 *
 * Controls layout direction:
 * - vertical (default): stacked — media on top, content below
 * - horizontal: side-by-side — media on left, content on right
 */

import { css } from 'lit';

export const orientationStyles = css`
  /* Default: vertical (flex-direction already set to column in base) */
  .card--vertical {
    flex-direction: column;
  }

  /* Horizontal layout — media on left, content on right */
  .card--horizontal {
    flex-direction: row;
    align-items: stretch;
  }

  /* Media takes natural width in horizontal mode */
  .card--horizontal .card__media {
    flex-shrink: 0;
    /* Override the column-specific media aspect-ratio so it fills the height naturally */
    align-self: stretch;
  }

  .card--horizontal .card__media ::slotted(*) {
    height: 100%;
    width: auto;
    aspect-ratio: unset;
    object-fit: cover;
  }

  /* In horizontal mode, content section fills available width */
  .card--horizontal .card__content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
`;
