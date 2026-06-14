/**
 * Alert Base Styles
 *
 * Contains:
 * - Host display and visibility management
 * - Alert container layout
 * - Icon wrapper and SVG sizing
 * - Content area (title + description)
 * - Actions slot
 * - Close button
 * - Enter/exit animations
 * - Reduced motion support
 */

import { css } from 'lit';

export const baseStyles = css`
  /* ========================================
     HOST
     ======================================== */
  :host {
    display: block;
  }

  :host([open='false']),
  :host(:not([open])) {
    display: none;
  }

  /* Open state — host is visible */
  :host([open]) {
    display: block;
  }

  /* ========================================
     CONTAINER
     ======================================== */
  .alert-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: var(--sando-alert-gap);
    padding-block: var(--sando-alert-paddingBlock);
    padding-inline: var(--sando-alert-paddingInline);
    border-radius: var(--sando-alert-borderRadius);
    border-width: var(--sando-alert-borderWidth);
    border-style: solid;
    background-color: var(--_alert-bg);
    border-color: var(--_alert-border);
    position: relative;

    /* Entry animation */
    animation: alert-enter var(--sando-alert-transition-duration)
      var(--sando-alert-transition-timing) both;
  }

  /* ========================================
     ICON WRAPPER
     ======================================== */
  .alert-icon-wrapper {
    display: flex;
    align-items: flex-start;
    flex-shrink: 0;
    color: var(--_alert-icon-color);
    padding-block-start: 0.125em; /* micro-alignment with text */
  }

  .alert-icon-wrapper ::slotted(*),
  .alert-icon-wrapper svg {
    width: var(--sando-alert-iconSize);
    height: var(--sando-alert-iconSize);
    flex-shrink: 0;
  }

  /* ========================================
     CONTENT
     ======================================== */
  .alert-content {
    flex: 1;
    min-width: 0;
    font-family: var(--sando-alert-fontFamily);
    line-height: var(--sando-alert-lineHeight);
  }

  .alert-title {
    display: block;
    font-size: var(--sando-alert-titleFontSize);
    font-weight: var(--sando-alert-titleFontWeight);
    color: var(--_alert-title-color);
    margin: var(--sando-alert-titleMarginBottom);
  }

  .alert-description {
    font-size: var(--sando-alert-textFontSize);
    font-weight: var(--sando-alert-textFontWeight);
    color: var(--_alert-text-color);
  }

  /* ========================================
     ACTIONS SLOT
     ======================================== */
  .alert-actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sando-alert-actionsGap);
    margin-block-start: var(--sando-alert-actionsMarginTop);
  }

  /* ========================================
     CLOSE BUTTON
     ======================================== */
  .alert-close {
    /* Reset button styles */
    appearance: none;
    -webkit-appearance: none;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--_alert-icon-color);
    opacity: 0.7;
    border-radius: calc(var(--sando-alert-borderRadius) / 2);
    width: var(--sando-alert-iconSize);
    height: var(--sando-alert-iconSize);
    transition: opacity var(--sando-alert-transition-duration) var(--sando-alert-transition-timing);

    /* Align with icon on the top side */
    align-self: flex-start;
    margin-inline-start: auto;
  }

  .alert-close:hover {
    opacity: 1;
  }

  .alert-close:focus-visible {
    outline: var(--sando-alert-focusOutlineWidth) solid var(--sando-alert-focusOutlineColor);
    outline-offset: var(--sando-alert-focusOutlineOffset);
    opacity: 1;
  }

  /* ========================================
     ENTER ANIMATION
     ======================================== */
  @keyframes alert-enter {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes alert-exit {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-4px);
    }
  }

  /* Exit animation class applied programmatically */
  .alert-container.is-exiting {
    animation: alert-exit var(--sando-alert-transition-duration)
      var(--sando-alert-transition-timing) both;
  }

  /* ========================================
     REDUCED MOTION
     ======================================== */
  @media (prefers-reduced-motion: reduce) {
    .alert-container,
    .alert-container.is-exiting {
      animation-duration: 0.01ms !important;
    }
  }
`;
