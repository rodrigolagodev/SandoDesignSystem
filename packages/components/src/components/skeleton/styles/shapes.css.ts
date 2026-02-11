/**
 * Shape-specific styles for sando-skeleton component
 * Each shape has its own border-radius based on Recipe tokens
 */

import { css } from 'lit';

export const shapeStyles = css`
  /* ============================================
     SHAPE: TEXT
     Small border-radius for text line placeholders
     ============================================ */

  :host([shape='text']) .skeleton {
    border-radius: var(--sando-skeleton-borderRadius-text);
  }

  /* ============================================
     SHAPE: CIRCULAR
     50% border-radius for avatar placeholders
     ============================================ */

  :host([shape='circular']) .skeleton {
    border-radius: var(--sando-skeleton-borderRadius-circular);
  }

  /* ============================================
     SHAPE: RECTANGULAR
     No border-radius for sharp-edge containers
     ============================================ */

  :host([shape='rectangular']) .skeleton {
    border-radius: var(--sando-skeleton-borderRadius-rectangular);
  }

  /* ============================================
     SHAPE: ROUNDED
     Medium border-radius for card-like placeholders
     ============================================ */

  :host([shape='rounded']) .skeleton {
    border-radius: var(--sando-skeleton-borderRadius-rounded);
  }
`;
