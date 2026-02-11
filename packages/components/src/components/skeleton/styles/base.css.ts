/**
 * Base styles for sando-skeleton component
 * Includes host styles and keyframe animations
 */

import { css } from 'lit';

export const baseStyles = css`
  /* ============================================
     KEYFRAMES
     ============================================ */

  @keyframes sando-shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes sando-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }

  /* ============================================
     HOST
     ============================================ */

  :host {
    display: block;
    line-height: 0;
  }

  /* ============================================
     SKELETON CONTAINER
     ============================================ */

  .skeleton {
    position: relative;
    display: block;
    overflow: hidden;
    background-color: var(--sando-skeleton-color-background);
    width: var(--skeleton-width, 100%);
    height: var(--skeleton-height, 1em);
  }

  /* ============================================
     SHIMMER INDICATOR
     ============================================ */

  .skeleton__shimmer {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      var(--sando-skeleton-color-shimmer),
      transparent
    );
    animation: sando-shimmer var(--sando-skeleton-animation-duration) infinite;
    animation-timing-function: var(--sando-skeleton-animation-easing);
    animation-delay: var(--skeleton-animation-delay, 0ms);
  }

  /* ============================================
     PULSE ANIMATION
     ============================================ */

  :host([effect='pulse']) .skeleton {
    animation: sando-pulse var(--sando-skeleton-animation-duration) infinite;
    animation-timing-function: var(--sando-skeleton-animation-easing);
    animation-delay: var(--skeleton-animation-delay, 0ms);
  }

  /* ============================================
     NO ANIMATION
     ============================================ */

  :host([effect='none']) .skeleton__shimmer {
    display: none;
  }

  :host([effect='none']) .skeleton {
    animation: none;
  }

  /* ============================================
     REDUCED MOTION
     Automatically switch to static/none effect
     ============================================ */

  @media (prefers-reduced-motion: reduce) {
    .skeleton__shimmer {
      display: none;
    }

    .skeleton {
      animation: none;
    }
  }
`;
