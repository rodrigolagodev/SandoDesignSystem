/**
 * Multi-Select Styles
 *
 * Contains styles for multiple selection mode:
 * - Tags container layout
 * - Overflow indicator
 *
 * NOTE: Individual tag styling is handled by the sando-tag component.
 * The select component now uses <sando-tag removable> for multi-select tags.
 */

import { css } from 'lit';

export const multiselectStyles = css`
  /* ========================================
     TAGS CONTAINER
     ======================================== */
  .select-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sando-select-multiSelect-tagGap);
    flex: 1;
    min-width: 0;
    align-items: center;
  }

  /* ========================================
     OVERFLOW INDICATOR (+N more)
     ======================================== */
  .select-overflow {
    font-size: var(--sando-select-multiSelect-tagFontSize);
    color: var(--sando-select-outlined-textColor-placeholder);
    white-space: nowrap;
  }
`;
