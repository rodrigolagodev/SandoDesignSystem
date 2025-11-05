/**
 * Button Status Styles
 *
 * Contains semantic status variants:
 * - Success: For positive/confirmation actions
 * - Destructive: For dangerous/destructive actions
 *
 * Each status works with all three variants (solid, outline, ghost)
 */

import { css } from 'lit';

export const statusStyles = css`
  /* ========================================
     SUCCESS STATUS - SOLID VARIANT
     ======================================== */
  :host([variant='solid'][status='success']) button,
  :host([variant='solid'][status='success']) a {
    background-color: var(--sando-button-status-success-backgroundColor);
    color: var(--sando-button-status-success-textColor);
  }

  :host([variant='solid'][status='success']) button:hover,
  :host([variant='solid'][status='success']) a:hover {
    background-color: var(--sando-button-status-success-backgroundColorHover);
  }

  /* ========================================
     SUCCESS STATUS - OUTLINE VARIANT
     ======================================== */
  :host([variant='outline'][status='success']) button,
  :host([variant='outline'][status='success']) a {
    color: var(--sando-button-status-success-backgroundColor);
    border-color: var(--sando-button-status-success-borderColor);
  }

  :host([variant='outline'][status='success']) button:hover,
  :host([variant='outline'][status='success']) a:hover {
    background-color: var(--sando-button-status-success-backgroundColor);
    color: var(--sando-button-status-success-textColor);
  }

  /* ========================================
     SUCCESS STATUS - GHOST VARIANT
     ======================================== */
  :host([variant='ghost'][status='success']) button,
  :host([variant='ghost'][status='success']) a {
    color: var(--sando-button-status-success-backgroundColor);
  }

  :host([variant='ghost'][status='success']) button:hover,
  :host([variant='ghost'][status='success']) a:hover {
    background-color: var(--sando-button-status-success-backgroundColor);
    color: var(--sando-button-status-success-textColor);
  }

  /* ========================================
     DESTRUCTIVE STATUS - SOLID VARIANT
     ======================================== */
  :host([variant='solid'][status='destructive']) button,
  :host([variant='solid'][status='destructive']) a {
    background-color: var(--sando-button-status-destructive-backgroundColor);
    color: var(--sando-button-status-destructive-textColor);
  }

  :host([variant='solid'][status='destructive']) button:hover,
  :host([variant='solid'][status='destructive']) a:hover {
    background-color: var(--sando-button-status-destructive-backgroundColorHover);
  }

  /* ========================================
     DESTRUCTIVE STATUS - OUTLINE VARIANT
     ======================================== */
  :host([variant='outline'][status='destructive']) button,
  :host([variant='outline'][status='destructive']) a {
    color: var(--sando-button-status-destructive-backgroundColor);
    border-color: var(--sando-button-status-destructive-borderColor);
  }

  :host([variant='outline'][status='destructive']) button:hover,
  :host([variant='outline'][status='destructive']) a:hover {
    background-color: var(--sando-button-status-destructive-backgroundColor);
    color: var(--sando-button-status-destructive-textColor);
  }

  /* ========================================
     DESTRUCTIVE STATUS - GHOST VARIANT
     ======================================== */
  :host([variant='ghost'][status='destructive']) button,
  :host([variant='ghost'][status='destructive']) a {
    color: var(--sando-button-status-destructive-backgroundColor);
  }

  :host([variant='ghost'][status='destructive']) button:hover,
  :host([variant='ghost'][status='destructive']) a:hover {
    background-color: var(--sando-button-status-destructive-backgroundColor);
    color: var(--sando-button-status-destructive-textColor);
  }
`;
