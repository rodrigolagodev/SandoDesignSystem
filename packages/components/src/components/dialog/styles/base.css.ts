/**
 * Dialog Base Styles
 *
 * Contains:
 * - Host display and visibility management
 * - Backdrop overlay
 * - Panel surface (fixed, centered)
 * - Header zone (title + description + close button in flex row)
 * - Body scrollable area
 * - Footer / actions zone
 * - Enter/exit animations (panel + backdrop)
 * - Reduced motion support
 */

import { css } from 'lit';

export const baseStyles = css`
  /* ========================================
     HOST
     ======================================== */
  :host {
    display: contents;
  }

  /* ========================================
     POPOVER WRAPPER
     When Popover API is supported, this element
     enters the browser top layer via showPopover(),
     escaping all stacking contexts and overflow containers.
     ======================================== */
  .dialog-popover {
    /* Reset all browser popover defaults */
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    overflow: visible;
    inset: unset;
    max-width: none;
    max-height: none;
    outline: none;
    box-shadow: none;
    /* Cover the full viewport */
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    /* Wrapper itself is not interactive — children opt-in */
    pointer-events: none;
  }

  /* Non-popover fallback: same full-screen coverage */
  .dialog-popover:not([popover]) {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  /* Fallback hide when popover not supported */
  :host(:not([open])) .dialog-popover:not([popover]) {
    display: none;
  }

  /* Closed state — popover not open */
  .dialog-popover[popover]:not(:popover-open) {
    display: none;
  }

  /* Open state — restore block display, keep pointer-events none on wrapper */
  .dialog-popover[popover]:popover-open {
    display: block;
    pointer-events: none;
  }

  /* Reset browser ::backdrop on the popover wrapper — we render our own div */
  .dialog-popover::backdrop {
    background: transparent;
    pointer-events: none;
  }

  /* ========================================
     BACKDROP
     ======================================== */
  [part='backdrop'] {
    position: fixed;
    inset: 0;
    background-color: var(--sando-dialog-backdrop-backgroundColor);
    opacity: var(--sando-dialog-backdrop-opacity);
    z-index: calc(var(--sando-dialog-zIndex) - 1);
    cursor: pointer;
    pointer-events: auto;

    /* Entry animation */
    animation: backdropIn var(--sando-dialog-animation-duration-enter)
      var(--sando-dialog-animation-easing-enter) both;
  }

  :host([type='alert']) [part='backdrop'] {
    cursor: default;
  }

  /* ========================================
     PANEL
     ======================================== */
  [part='panel'] {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: var(--sando-dialog-zIndex);
    pointer-events: auto;

    display: flex;
    flex-direction: column;
    max-height: var(--sando-dialog-maxHeight);
    width: var(--sando-dialog-width);

    background-color: var(--_dialog-backgroundColor);
    border: var(--_dialog-borderWidth) solid var(--_dialog-borderColor);
    border-radius: var(--sando-dialog-borderRadius);
    box-shadow: var(--_dialog-boxShadow);
    outline: none;

    /* Panel owns typography so body slot content inherits dialog font */
    font-family: var(--sando-dialog-fontFamily);

    /* Entry animation */
    animation: dialogIn var(--sando-dialog-animation-duration-enter)
      var(--sando-dialog-animation-easing-enter) both;
  }

  /* ========================================
     HEADER
     ======================================== */
  [part='header'] {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-block: var(--sando-dialog-header-paddingBlock);
    padding-inline: var(--sando-dialog-header-paddingInline);
    /* Reserve space so title doesn't run under the close button */
    padding-inline-end: calc(
      var(--sando-dialog-header-paddingInline) + var(--sando-dialog-closeButton-size) +
        var(--sando-dialog-header-paddingInline)
    );
    flex-shrink: 0;
  }

  :host([no-header]) [part='header'] {
    /* Visually hide but keep for a11y (title used by aria-labelledby) */
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

  /* ========================================
     TITLE + DESCRIPTION
     ======================================== */
  .dialog-title-group {
    flex: 1;
    min-width: 0;
  }

  [part='title'] {
    font-family: var(--sando-dialog-header-titleFontFamily);
    font-size: var(--sando-dialog-header-titleFontSize);
    font-weight: var(--sando-dialog-header-titleFontWeight);
    line-height: var(--sando-dialog-header-titleLineHeight);
    color: var(--sando-dialog-header-titleColor);
  }

  [part='description'] {
    font-size: var(--sando-dialog-header-descriptionFontSize);
    color: var(--sando-dialog-header-descriptionColor);
    margin-block-start: 0.25em;
  }

  /* ========================================
     CLOSE BUTTON
     Inline-flex element inside [part='header'] flex row — sits at the end.
     ======================================== */
  [part='close-button'] {
    /* Reset */
    appearance: none;
    -webkit-appearance: none;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;

    /* Size */
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--sando-dialog-closeButton-size);
    height: var(--sando-dialog-closeButton-size);

    /* Absolute positioning — top-inline-end corner of panel */
    position: absolute;
    inset-block-start: var(--sando-dialog-closeButton-insetBlockStart);
    inset-inline-end: var(--sando-dialog-closeButton-insetInlineEnd);

    /* Visual */
    color: var(--sando-dialog-header-titleColor);
    background-color: var(--sando-dialog-closeButton-backgroundColor);
    border-radius: var(--sando-dialog-borderRadius);
    transition:
      background-color var(--sando-dialog-animation-duration-exit)
        var(--sando-dialog-animation-easing-exit),
      color var(--sando-dialog-animation-duration-exit) var(--sando-dialog-animation-easing-exit);
  }

  [part='close-button']:hover {
    background-color: var(--sando-dialog-closeButton-backgroundColorHover);
  }

  [part='close-button']:focus-visible {
    outline: var(--sando-dialog-focusRing-width) solid var(--sando-dialog-focusRing-color);
    outline-offset: var(--sando-dialog-focusRing-offset);
    background-color: var(--sando-dialog-closeButton-backgroundColorHover);
  }

  /* ========================================
     BODY
     ======================================== */
  [part='body'] {
    flex: 1;
    overflow-y: auto;
    padding-block-start: 0;
    padding-block-end: var(--sando-dialog-body-paddingBlock);
    padding-inline: var(--sando-dialog-body-paddingInline);
    color: var(--sando-dialog-body-textColor);
    font-size: var(--sando-dialog-body-fontSize);
    line-height: var(--sando-dialog-body-lineHeight);
  }

  /* Reset browser margins on slotted content (e.g. <p> margin-block) */
  [part='body'] ::slotted(*) {
    margin: 0;
  }

  /* When no-header: body recovers its top padding (header is hidden) */
  :host([no-header]) [part='body'] {
    padding-block-start: var(--sando-dialog-body-paddingBlock);
  }

  /* ========================================
     FOOTER — built-in buttons (flex row, space-between)
     ======================================== */
  [part='footer'] {
    padding-block: var(--sando-dialog-footer-paddingBlock);
    padding-inline: var(--sando-dialog-footer-paddingInline);
    flex-shrink: 0;
    background-color: var(--sando-dialog-footer-backgroundColor);
    border-top: var(--sando-dialog-footer-dividerWidth) solid
      var(--sando-dialog-footer-dividerColor);
    border-bottom-left-radius: var(--sando-dialog-borderRadius);
    border-bottom-right-radius: var(--sando-dialog-borderRadius);
    overflow: hidden;
  }

  /* Footer built-in: flex row, espacio entre botones */
  [part='footer']:not(.footer--slot-only):not(.footer-hidden) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--sando-dialog-footer-gap);
  }

  /* Single button: ocupa todo el ancho */
  [part='footer'].footer--single sando-button {
    flex: 1;
    width: 100%;
  }

  /* Slot-only footer: restore normal padding/gap layout */
  [part='footer'].footer--slot-only {
    gap: var(--sando-dialog-footer-gap);
    padding-block: var(--sando-dialog-footer-paddingBlock);
    padding-inline: var(--sando-dialog-footer-paddingInline);
    justify-content: flex-end;
    flex-wrap: wrap;
    align-items: center;
  }

  .footer-hidden {
    display: none;
  }

  /* ========================================
     EXIT STATE
     ======================================== */
  :host([data-exiting]) [part='panel'] {
    animation: dialogOut var(--sando-dialog-animation-duration-exit)
      var(--sando-dialog-animation-easing-exit) both;
  }

  :host([data-exiting]) [part='backdrop'] {
    animation: backdropOut var(--sando-dialog-animation-duration-exit)
      var(--sando-dialog-animation-easing-exit) both;
  }

  /* ========================================
     ANIMATIONS
     ======================================== */
  @keyframes dialogIn {
    from {
      opacity: 0;
      transform: translate(-50%, calc(-50% - 8px)) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes dialogOut {
    from {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    to {
      opacity: 0;
      transform: translate(-50%, calc(-50% - 8px)) scale(0.97);
    }
  }

  @keyframes backdropIn {
    from {
      opacity: 0;
    }
    to {
      opacity: var(--sando-dialog-backdrop-opacity);
    }
  }

  @keyframes backdropOut {
    from {
      opacity: var(--sando-dialog-backdrop-opacity);
    }
    to {
      opacity: 0;
    }
  }

  /* ========================================
     MOBILE — BOTTOM SHEET
     En viewports < 640px el dialog se transforma
     automáticamente en un bottom sheet.
     ======================================== */
  @media (max-width: 639px) {
    [part='panel'] {
      /* Reposition: bottom of viewport, full width */
      top: auto;
      left: 0;
      right: 0;
      bottom: 0;
      transform: none;
      width: 100%;
      max-width: 100%;
      max-height: 85vh;

      /* Rounded top corners only */
      border-radius: var(--sando-dialog-borderRadius) var(--sando-dialog-borderRadius) 0 0;
    }

    /* Override animations for bottom sheet */
    [part='panel'] {
      animation: sheetIn var(--sando-dialog-animation-duration-enter)
        var(--sando-dialog-animation-easing-enter) both;
    }

    :host([data-exiting]) [part='panel'] {
      animation: sheetOut var(--sando-dialog-animation-duration-exit)
        var(--sando-dialog-animation-easing-exit) both;
    }

    @keyframes sheetIn {
      from {
        opacity: 0;
        transform: translateY(100%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes sheetOut {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(100%);
      }
    }
  }

  /* ========================================
     REDUCED MOTION
     ======================================== */
  @media (prefers-reduced-motion: reduce) {
    [part='panel'],
    [part='backdrop'] {
      animation: none !important;
    }
  }
`;
