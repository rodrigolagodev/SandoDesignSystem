/**
 * Base Option Styles
 *
 * Contains:
 * - Layout (flexbox, alignment)
 * - Base appearance (cursor, transitions)
 *
 * Note: Size-specific properties (padding, fontSize, gap, minHeight)
 * are handled by size.css.ts
 * Note: CSS reset (box-sizing, reduced-motion) handled by resetStyles
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: block;
    font-family: var(--sando-option-fontFamily);
    line-height: var(--sando-option-lineHeight);
  }

  .option {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    border-radius: var(--sando-option-borderRadius);
    transition-property: background-color, color;
    transition-duration: var(--sando-select-transition-duration);
    transition-timing-function: var(--sando-select-transition-timing);
  }

  /* Content layout - prefix/suffix wrappers */
  .option-prefix,
  .option-suffix {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .option-content {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Hidden slot - used when slot has no content */
  .hidden-slot {
    display: none;
  }
`;
