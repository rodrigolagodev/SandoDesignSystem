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

  /* Media column: fixed width, fills full card height via align-items:stretch on parent.
   * aspect-ratio is reset so the media fills height rather than enforcing a ratio.
   * overflow:hidden is already set on .card so corners are clipped automatically. */
  .card--horizontal .card__media {
    flex-shrink: 0;
    align-self: stretch;
  }

  /* Slotted images/videos fill the media column fully in horizontal mode */
  .card--horizontal .card__media ::slotted(*) {
    block-size: 100%;
    inline-size: 100%;
    aspect-ratio: unset;
    object-fit: cover;
  }

  /* Content wrapper: becomes the right-hand flex column.
   * Overrides the vertical-mode display:contents so it participates in the row layout.
   * flex:1 + min-width:0 make it grow to fill remaining space and handle text overflow. */
  .card--horizontal .card__content {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  /* Body absorbs leftover vertical space inside the content column.
   * This prevents an empty gap below the header when body content is short,
   * and pushes the footer to the bottom of the card. */
  .card--horizontal .card__body {
    flex: 1;
  }
`;
