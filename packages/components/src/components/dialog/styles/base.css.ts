/**
 * Dialog Base Styles
 *
 * Contains:
 * - Host display and visibility management
 * - Backdrop overlay
 * - Panel surface (fixed, centered)
 * - Header zone (title + description — close button is now a panel sibling)
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

  :host(:not([open])),
  :host([open='false']) {
    display: none;
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

    display: flex;
    flex-direction: column;
    max-height: var(--sando-dialog-maxHeight);
    width: var(--_dialog-width);

    background-color: var(--_dialog-backgroundColor);
    border: var(--_dialog-borderWidth) solid var(--_dialog-borderColor);
    border-radius: var(--sando-dialog-borderRadius);
    box-shadow: var(--_dialog-boxShadow);
    outline: none;

    /* Entry animation */
    animation: dialogIn var(--sando-dialog-animation-duration-enter)
      var(--sando-dialog-animation-easing-enter) both;
  }

  /* ========================================
     HEADER
     ======================================== */
  [part='header'] {
    display: flex;
    flex-direction: column;
    padding-block: var(--sando-dialog-header-paddingBlock);
    padding-inline: var(--sando-dialog-header-paddingInline);
    /* Reserve inline-end space so title text doesn't run under the close button */
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
     Absolutely positioned relative to [part='panel'] (position: fixed
     also creates a containing block for absolutely-positioned children).
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
    inset-block-start: var(--sando-dialog-header-paddingBlock);
    inset-inline-end: var(--sando-dialog-header-paddingInline);

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
    padding-block: var(--sando-dialog-body-paddingBlock);
    padding-inline: var(--sando-dialog-body-paddingInline);
    color: var(--sando-dialog-body-textColor);
    font-size: var(--sando-dialog-body-fontSize);
    line-height: var(--sando-dialog-body-lineHeight);
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
  [part='footer'] sando-button:only-child {
    flex: 1;
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
`;
