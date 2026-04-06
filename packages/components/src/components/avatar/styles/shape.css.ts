/**
 * Avatar Shape Styles
 *
 * Controls border-radius for each shape variant:
 * - circle: Fully circular (50%)
 * - rounded: Moderate rounding (border-radius-emphasis token)
 */

import { css } from 'lit';

export const shapeStyles = css`
  /* ========================================
     CIRCLE — default
     Fully circular avatar
     ======================================== */
  :host([shape='circle']) .avatar,
  :host(:not([shape])) .avatar {
    border-radius: var(--sando-avatar-shape-circle);
  }

  /* Presence dot corners must also be rounded
     (already 50% from base, this ensures consistency) */
  :host([shape='circle']) .avatar__presence,
  :host(:not([shape])) .avatar__presence {
    border-radius: 50%;
  }

  /* ----------------------------------------
     CIRCLE — presence dot positioning
     The visual border of a circle is inset from the bounding-box corners
     by r*(1 - cos(45°)) ≈ 14.64% of the avatar size.
     Overriding top/right/bottom/left to 15% compensates for this curvature
     so the dot sits on the circle's edge regardless of avatar size.
     transform: translate(±50%, ±50%) still centers the dot on that point.
     ---------------------------------------- */
  :host([shape='circle']) .avatar__presence--top-start,
  :host(:not([shape])) .avatar__presence--top-start {
    top: 15%;
    left: 15%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
  }

  :host([shape='circle']) .avatar__presence--top-end,
  :host(:not([shape])) .avatar__presence--top-end {
    top: 15%;
    right: 15%;
    left: auto;
    bottom: auto;
    transform: translate(50%, -50%);
  }

  :host([shape='circle']) .avatar__presence--bottom-start,
  :host(:not([shape])) .avatar__presence--bottom-start {
    bottom: 15%;
    left: 15%;
    top: auto;
    right: auto;
    transform: translate(-50%, 50%);
  }

  :host([shape='circle']) .avatar__presence--bottom-end,
  :host(:not([shape])) .avatar__presence--bottom-end {
    bottom: 15%;
    right: 15%;
    top: auto;
    left: auto;
    transform: translate(50%, 50%);
  }

  /* ========================================
     ROUNDED
     Moderate border radius (emphasis token)
     ======================================== */
  :host([shape='rounded']) .avatar {
    border-radius: var(--sando-avatar-shape-rounded);
  }

  :host([shape='rounded']) .avatar__presence {
    border-radius: 50%;
  }
`;
