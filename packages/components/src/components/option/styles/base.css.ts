/**
 * Base Option Styles
 *
 * Contains:
 * - Layout (flexbox, alignment)
 * - Typography
 * - Base appearance (cursor, transitions)
 *
 * Note: CSS reset (box-sizing, reduced-motion) handled by resetStyles
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: block;
    font-family: var(--sando-select-fontFamily);
    line-height: var(--sando-select-lineHeight);
  }

  .option {
    display: flex;
    align-items: center;
    gap: var(--sando-select-option-gap);
    padding-inline: var(--sando-select-option-paddingInline);
    padding-block: var(--sando-select-option-paddingBlock);
    min-height: var(--sando-select-option-minHeight);
    font-size: var(--sando-select-option-fontSize);
    cursor: pointer;
    user-select: none;
    transition-property: background-color, color;
    transition-duration: var(--sando-select-transition-duration);
    transition-timing-function: var(--sando-select-transition-timing);
  }

  /* Content layout */
  .option-prefix {
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

  .option-suffix {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
`;
