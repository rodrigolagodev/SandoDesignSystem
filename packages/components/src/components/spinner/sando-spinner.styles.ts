/**
 * Styles for sando-spinner component
 * Uses Recipe tokens for all visual properties
 */

import { css } from 'lit';

export const spinnerStyles = css`
  /* ============================================
     KEYFRAMES
     ============================================ */

  @keyframes sando-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes sando-pulse-opacity {
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
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    line-height: 0;
  }

  /* ============================================
     SPINNER WRAPPER
     ============================================ */

  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--sando-spinner-size-md);
    height: var(--sando-spinner-size-md);
    color: var(--sando-spinner-color-default);
  }

  /* ============================================
     SVG CONTAINER
     ============================================ */

  .spinner__svg {
    width: 100%;
    height: 100%;
    animation: sando-spin var(--sando-spinner-animation-duration)
      var(--sando-spinner-animation-easing) infinite;
  }

  /* ============================================
     CIRCLE (Arc)
     ============================================ */

  .spinner__circle {
    stroke-width: var(--sando-spinner-stroke-md, 2);
    transform-origin: center;
  }

  /* ============================================
     SIZE VARIANTS
     ============================================ */

  :host([size='xs']) .spinner {
    width: var(--sando-spinner-size-xs);
    height: var(--sando-spinner-size-xs);
  }

  :host([size='xs']) .spinner__circle {
    stroke-width: var(--sando-spinner-stroke-xs, 2);
  }

  :host([size='sm']) .spinner {
    width: var(--sando-spinner-size-sm);
    height: var(--sando-spinner-size-sm);
  }

  :host([size='sm']) .spinner__circle {
    stroke-width: var(--sando-spinner-stroke-sm, 2);
  }

  :host([size='md']) .spinner {
    width: var(--sando-spinner-size-md);
    height: var(--sando-spinner-size-md);
  }

  :host([size='md']) .spinner__circle {
    stroke-width: var(--sando-spinner-stroke-md, 2);
  }

  :host([size='lg']) .spinner {
    width: var(--sando-spinner-size-lg);
    height: var(--sando-spinner-size-lg);
  }

  :host([size='lg']) .spinner__circle {
    stroke-width: var(--sando-spinner-stroke-lg, 2.5);
  }

  :host([size='xl']) .spinner {
    width: var(--sando-spinner-size-xl);
    height: var(--sando-spinner-size-xl);
  }

  :host([size='xl']) .spinner__circle {
    stroke-width: var(--sando-spinner-stroke-xl, 3);
  }

  /* ============================================
     COLOR VARIANTS
     ============================================ */

  :host([variant='default']) .spinner {
    color: var(--sando-spinner-color-default);
  }

  :host([variant='inverted']) .spinner {
    color: var(--sando-spinner-color-inverted);
  }

  /* ============================================
     REDUCED MOTION
     Stop rotation, use subtle opacity pulse instead
     ============================================ */

  @media (prefers-reduced-motion: reduce) {
    .spinner__svg {
      animation: sando-pulse-opacity 2s ease-in-out infinite;
    }
  }
`;
