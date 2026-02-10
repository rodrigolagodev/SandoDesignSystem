/**
 * Base Label Styles
 *
 * Contains:
 * - Host display and layout
 * - Typography (font family, line height)
 * - Label element cursor and display
 * - Helper text base styling
 * - Tooltip icon positioning
 *
 * Note: Reset styles (box-sizing, margin, padding) are handled by resetStyles.
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: inline-flex;
    flex-direction: column;
    gap: var(--sando-label-gap);
  }

  :host([sr-only]) {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .label {
    display: inline-flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: var(--sando-label-gap);
    cursor: default;

    /* Typography */
    font-family: var(--sando-label-fontFamily);
    color: var(--sando-label-textColor-default);
    text-wrap: balance; /* Prevents orphan wrapping of required indicator */

    /* Transition for theming */
    transition-property: color;
    transition-duration: var(--sando-transition-duration-fast, 150ms);
    transition-timing-function: var(--sando-transition-timing-default, ease);
  }

  /* Required indicator via ::after pseudo-element */
  .label[data-required]::after {
    content: '*';
    color: var(--sando-label-required-textColor);
    margin-inline-start: var(--sando-label-required-marginInlineStart);
  }

  .label__text {
    display: inline-flex;
    align-items: center;
    gap: var(--sando-label-gap);
  }

  .label__optional {
    color: var(--sando-label-optional-textColor);
    margin-inline-start: var(--sando-label-optional-marginInlineStart);
    font-weight: var(--sando-label-fontWeight-normal);
  }

  .label__tooltip {
    display: inline-flex;
    align-items: center;
    margin-inline-start: var(--sando-label-tooltip-marginInlineStart);
    color: var(--sando-label-tooltip-iconColor);
    cursor: help;
  }

  .label__helper-text {
    display: block;
    margin-top: var(--sando-label-helperText-marginTop);
    font-size: var(--sando-label-helperText-fontSize);
    line-height: var(--sando-label-helperText-lineHeight);
    color: var(--sando-label-helperText-textColor);
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .label {
      transition-duration: 0.01ms !important;
    }
  }
`;
