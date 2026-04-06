/**
 * Base Avatar Styles
 *
 * Contains:
 * - Host display and layout
 * - Inner container (relative positioning for presence dot)
 * - Image, initials, and fallback icon base styles
 * - Interactive states (hover, focus, active) when avatar is a link
 * - Presence indicator base styles
 * - Reduced motion support
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: inline-block;
    vertical-align: middle;
    line-height: 0;
  }

  /* ========================================
     AVATAR CONTAINER
     Relative positioning anchor for presence dot.
     overflow: hidden is intentionally NOT set here —
     it lives on the content children so the presence
     dot can protrude outside the avatar boundary.
     ======================================== */
  .avatar {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    /* Typography */
    font-family: var(--sando-avatar-fontFamily);
    font-weight: var(--sando-avatar-fontWeight);
    line-height: var(--sando-avatar-lineHeight);

    /* Appearance */
    background-color: var(--sando-avatar-backgroundColor);
    color: var(--sando-avatar-textColor);
    border: var(--sando-avatar-border-width) solid var(--sando-avatar-border-color);

    /* Transitions */
    transition-property: opacity, transform, background-color;
    transition-duration: var(--sando-avatar-transition-duration);
    transition-timing-function: var(--sando-avatar-transition-timing);

    /* Prevent text selection */
    user-select: none;
  }

  /* ========================================
     IMAGE
     overflow: hidden + border-radius here (not on .avatar)
     so the presence dot can protrude outside.
     ======================================== */
  .avatar__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: inherit;
    overflow: hidden;
  }

  /* ========================================
     INITIALS
     overflow: hidden + border-radius here (not on .avatar)
     ======================================== */
  .avatar__initials {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-transform: uppercase;
    color: var(--sando-avatar-textColor);
    border-radius: inherit;
    overflow: hidden;
  }

  /* ========================================
     FALLBACK ICON
     overflow: hidden + border-radius here (not on .avatar)
     ======================================== */
  .avatar__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sando-avatar-iconColor);
    border-radius: inherit;
    overflow: hidden;
  }

  /* ========================================
     INTERACTIVE (when rendered as <a>)
     ======================================== */
  .avatar--interactive {
    cursor: pointer;
    text-decoration: none;
  }

  .avatar--interactive:hover .avatar__image,
  .avatar--interactive:hover .avatar__initials,
  .avatar--interactive:hover .avatar__icon {
    opacity: var(--sando-avatar-interactive-opacity-hover, 0.85);
  }

  .avatar--interactive:hover {
    background-color: var(--sando-avatar-interactive-backgroundColor-hover);
  }

  .avatar--interactive:active {
    transform: scale(var(--sando-avatar-interactive-transform-active));
  }

  .avatar--interactive:focus-visible {
    outline: var(--sando-avatar-interactive-focusOutlineWidth) solid
      var(--sando-avatar-interactive-focusOutlineColor);
    outline-offset: 0;
  }

  /* Remove default link styles */
  .avatar--interactive:visited {
    color: inherit;
  }

  /* ========================================
     PRESENCE INDICATOR
     ======================================== */
  .avatar__presence {
    position: absolute;
    border-radius: 50%;
    border: var(--sando-avatar-presence-borderWidth) solid var(--sando-avatar-presence-borderColor);
    width: var(--_presence-dot-size);
    height: var(--_presence-dot-size);
  }

  /* Presence positions — translate(±50%, ±50%) centers the dot over the
     avatar corner so exactly half protrudes outside on every size/shape. */
  .avatar__presence--top-start {
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }

  .avatar__presence--top-end {
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
  }

  .avatar__presence--bottom-start {
    bottom: 0;
    left: 0;
    transform: translate(-50%, 50%);
  }

  .avatar__presence--bottom-end {
    bottom: 0;
    right: 0;
    transform: translate(50%, 50%);
  }

  /* Presence colors */
  .avatar__presence--online {
    background-color: var(--sando-avatar-presence-online);
  }

  .avatar__presence--offline {
    background-color: var(--sando-avatar-presence-offline);
  }

  .avatar__presence--busy {
    background-color: var(--sando-avatar-presence-busy);
  }

  .avatar__presence--away {
    background-color: var(--sando-avatar-presence-away);
  }

  /* Screen reader text for presence */
  .sr-only {
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
     REDUCED MOTION
     ======================================== */
  @media (prefers-reduced-motion: reduce) {
    .avatar {
      transition-duration: 0.01ms !important;
    }

    .avatar--interactive:active {
      transform: none;
    }
  }
`;
