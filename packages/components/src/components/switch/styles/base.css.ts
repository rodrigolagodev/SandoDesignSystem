/**
 * Base Switch Styles
 *
 * Contains:
 * - Layout (flexbox, alignment)
 * - Typography
 * - Base appearance (border radius, cursor, transitions)
 * - Focus states
 *
 * Note: CSS reset and reduced motion are handled by resetStyles
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: inline-block;
    font-family: var(--sando-switch-label-fontFamily);
    line-height: var(--sando-switch-label-lineHeight);
    /* Remove native browser focus ring from host - we show custom focus on .switch-track */
    outline: none;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  .switch-wrapper {
    display: inline-flex;
    flex-direction: column;
  }

  .switch-container {
    display: inline-flex;
    /*
     * Alignment fix: Use flex-start so the switch track aligns to the top
     * of multi-line label text instead of vertically centering with all lines.
     * The switch-track has margin-top to visually center with the first line.
     */
    align-items: flex-start;
    cursor: pointer;
    position: relative;
  }

  /* Hidden native input - visually hidden but accessible */
  .native-input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
    /* Keep it in the DOM flow for focus */
    opacity: 0;
    pointer-events: none;
  }

  /* Custom switch track (the pill-shaped container) */
  .switch-track {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    border-width: var(--sando-switch-borderWidth);
    border-style: solid;
    border-radius: var(--sando-switch-borderRadius);
    transition-property: background-color, border-color, outline-color;
    transition-duration: var(--sando-switch-transition-duration);
    transition-timing-function: var(--sando-switch-transition-timing);
    position: relative;
    /* Prepare for focus outline */
    outline: var(--sando-switch-focusOutlineWidth) solid transparent;
    outline-offset: var(--sando-switch-focusOutlineOffset);
    /*
     * Vertical alignment fix: When container uses align-items: flex-start,
     * we need margin-top to visually center the track with the first line of text.
     * Formula: (lineHeight - 1em) / 2 approximates centering with x-height.
     * Using 0.125em works well for typical line-heights (1.4-1.6).
     */
    margin-top: 0.125em;
  }

  /* Focus visible on the track - uses JS-managed .focused class for reliability across Shadow DOM */
  .switch-track.focused {
    outline-color: var(--sando-switch-focusOutlineColor);
    outline-width: var(--sando-switch-focusOutlineWidth);
    outline-style: solid;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .switch-track.focused {
      outline-width: calc(var(--sando-switch-focusOutlineWidth) * 2);
      outline-offset: calc(var(--sando-switch-focusOutlineOffset) * 1.5);
    }
  }

  /* Switch thumb (the circular sliding element) */
  .switch-thumb {
    position: absolute;
    border-radius: 50%;
    /* Vertical centering - size styles only control horizontal position */
    top: 50%;
    transform: translateY(-50%);
    transition-property: transform, background-color;
    transition-duration: var(--sando-switch-transition-duration);
    transition-timing-function: var(--sando-switch-transition-timing);
    box-shadow: var(--sando-switch-solid-thumb-shadow);
  }

  /* Label text */
  .switch-label {
    font-weight: var(--sando-switch-label-fontWeight);
    color: var(--sando-switch-label-textColor-default);
    user-select: none;
    text-wrap: balance; /* Prevents orphan wrapping of required indicator */
  }

  /* Required indicator */
  .switch-label[data-required]::after {
    content: '*';
    color: var(--sando-switch-helperText-textColor-error);
    margin-inline-start: var(--sando-switch-requiredIndicator-marginInlineStart);
  }

  /* Helper/error text container - positions sando-help-text */
  .switch-description {
    margin-left: calc(var(--sando-switch-size-md-trackWidth) + var(--sando-switch-size-md-gap));
  }
`;
