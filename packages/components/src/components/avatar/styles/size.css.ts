/**
 * Avatar Size Styles
 *
 * Controls avatar dimensions, font size, icon size, and presence dot size
 * for each of the five size variants: xs, sm, md (default), lg, xl.
 *
 * Uses CSS custom properties scoped to :host for each size,
 * and internal --_avatar-* vars for derived sizing within the component.
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     EXTRA SMALL (xs) — 24px
     ======================================== */
  :host([size='xs']) .avatar {
    width: var(--sando-avatar-size-xs-dimension);
    height: var(--sando-avatar-size-xs-dimension);
    font-size: var(--sando-avatar-size-xs-fontSize);
    --_avatar-icon-size: var(--sando-avatar-size-xs-iconSize);
    --_presence-dot-size: var(--sando-avatar-size-xs-presenceDot);
  }

  /* ========================================
     SMALL (sm) — 32px
     ======================================== */
  :host([size='sm']) .avatar {
    width: var(--sando-avatar-size-sm-dimension);
    height: var(--sando-avatar-size-sm-dimension);
    font-size: var(--sando-avatar-size-sm-fontSize);
    --_avatar-icon-size: var(--sando-avatar-size-sm-iconSize);
    --_presence-dot-size: var(--sando-avatar-size-sm-presenceDot);
  }

  /* ========================================
     MEDIUM (md) — 40px — Default
     ======================================== */
  :host([size='md']) .avatar,
  :host(:not([size])) .avatar {
    width: var(--sando-avatar-size-md-dimension);
    height: var(--sando-avatar-size-md-dimension);
    font-size: var(--sando-avatar-size-md-fontSize);
    --_avatar-icon-size: var(--sando-avatar-size-md-iconSize);
    --_presence-dot-size: var(--sando-avatar-size-md-presenceDot);
  }

  /* ========================================
     LARGE (lg) — 48px
     ======================================== */
  :host([size='lg']) .avatar {
    width: var(--sando-avatar-size-lg-dimension);
    height: var(--sando-avatar-size-lg-dimension);
    font-size: var(--sando-avatar-size-lg-fontSize);
    --_avatar-icon-size: var(--sando-avatar-size-lg-iconSize);
    --_presence-dot-size: var(--sando-avatar-size-lg-presenceDot);
  }

  /* ========================================
     EXTRA LARGE (xl) — 64px
     ======================================== */
  :host([size='xl']) .avatar {
    width: var(--sando-avatar-size-xl-dimension);
    height: var(--sando-avatar-size-xl-dimension);
    font-size: var(--sando-avatar-size-xl-fontSize);
    --_avatar-icon-size: var(--sando-avatar-size-xl-iconSize);
    --_presence-dot-size: var(--sando-avatar-size-xl-presenceDot);
  }
`;
