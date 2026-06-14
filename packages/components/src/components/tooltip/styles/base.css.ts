/**
 * Tooltip Base Styles
 *
 * Contains:
 * - Host display styles
 * - Trigger wrapper
 * - Tooltip bubble (shared across placements)
 * - Transitions and animation states
 * - Arrow pseudo-element base
 * - Reduced motion support
 */

import { css } from 'lit';

export const baseStyles = css`
  /* ========================================
     HOST
     display: contents so the wrapper doesn't
     break flex/grid layout of the parent.
     ======================================== */
  :host {
    display: contents;
  }

  /* ========================================
     TRIGGER WRAPPER
     Inline-block wrapper that anchors the
     absolutely-positioned fallback bubble.
     ======================================== */
  .tooltip-trigger-wrapper {
    display: contents;
  }

  /* ========================================
     TOOLTIP BUBBLE — shared visual styles
     ======================================== */
  .tooltip-bubble {
    position: absolute; /* Fallback (no Popover API) */
    z-index: var(--sando-tooltip-zIndex);
    max-width: var(--sando-tooltip-maxWidth);
    background-color: var(--sando-tooltip-backgroundColor);
    color: var(--sando-tooltip-textColor);
    border-radius: var(--sando-tooltip-borderRadius);
    padding-block: var(--sando-tooltip-paddingBlock);
    padding-inline: var(--sando-tooltip-paddingInline);
    box-shadow: var(--sando-tooltip-boxShadow);
    font-family: var(--sando-tooltip-fontFamily);
    font-size: var(--sando-tooltip-fontSize);
    font-weight: var(--sando-tooltip-fontWeight);
    line-height: var(--sando-tooltip-lineHeight);
    pointer-events: none; /* Never capture mouse — WCAG 1.4.13 requires hover entry */
    white-space: normal;
    word-break: break-word;

    /* Hidden state by default (fallback mode) */
    opacity: 0;
    visibility: hidden;

    /* Transition for opacity/transform */
    transition-property: opacity, transform, visibility;
    transition-duration: var(--sando-tooltip-transition-duration);
    transition-timing-function: var(--sando-tooltip-transition-timing);
  }

  /* Bubble must accept mouse events when open (WCAG 1.4.13) */
  .tooltip-bubble.is-open {
    pointer-events: auto;
  }

  /* ========================================
     POPOVER API MODE
     When popover="manual" is set, the bubble
     renders in the top layer.
     ======================================== */

  /* Reset browser-default popover styles only — do NOT zero out padding/background */
  .tooltip-bubble[popover] {
    margin: 0;
    border: none;
    overflow: visible;
    inset: unset;
  }

  /* Closed: completely hide (popover not open) */
  .tooltip-bubble[popover]:not(:popover-open) {
    display: none;
  }

  /* Open state — popover mode; visual styles come from base .tooltip-bubble */
  .tooltip-bubble[popover]:popover-open {
    display: block;
    opacity: 1;
    visibility: visible;
    pointer-events: auto; /* Allow mouse to enter bubble (WCAG 1.4.13) */
    transition-property: opacity, transform, visibility;
    transition-duration: var(--sando-tooltip-transition-duration);
    transition-timing-function: var(--sando-tooltip-transition-timing);
  }

  /* No backdrop */
  .tooltip-bubble::backdrop {
    background: transparent;
    pointer-events: none;
  }

  /* ========================================
     ARROW BASE
     Shared triangle styles — placement
     variants override position + direction.
     ======================================== */
  .tooltip-bubble::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
  }

  /* ========================================
     FALLBACK OPEN STATE (no Popover API)
     ======================================== */
  .tooltip-bubble.is-open:not([popover]) {
    opacity: 1;
    visibility: visible;
  }

  /* ========================================
     REDUCED MOTION
     ======================================== */
  @media (prefers-reduced-motion: reduce) {
    .tooltip-bubble {
      transition-duration: 0.01ms !important;
    }
  }
`;
