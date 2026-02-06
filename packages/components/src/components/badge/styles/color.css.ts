/**
 * Badge Color Styles
 *
 * Contains styles for all 6 semantic colors across 4 visual variants:
 * - Colors: neutral, primary, success, warning, danger, info
 * - Variants: solid, soft, outline, surface
 *
 * Each combination uses Recipe tokens:
 * --sando-badge-{color}-{variant}-{property}
 */

import { css } from 'lit';

export const colorStyles = css`
  /* ========================================
     NEUTRAL COLOR
     ======================================== */

  /* Neutral Solid */
  :host([color='neutral'][variant='solid']) .badge,
  :host(:not([color])[variant='solid']) .badge,
  :host([color='neutral']:not([variant])) .badge,
  :host(:not([color]):not([variant])) .badge {
    background-color: var(--sando-badge-neutral-solid-backgroundColor);
    color: var(--sando-badge-neutral-solid-textColor);
    border-color: var(--sando-badge-neutral-solid-borderColor);
  }

  /* Neutral Soft */
  :host([color='neutral'][variant='soft']) .badge,
  :host(:not([color])[variant='soft']) .badge {
    background-color: var(--sando-badge-neutral-soft-backgroundColor);
    color: var(--sando-badge-neutral-soft-textColor);
    border-color: var(--sando-badge-neutral-soft-borderColor);
  }

  /* Neutral Outline */
  :host([color='neutral'][variant='outline']) .badge,
  :host(:not([color])[variant='outline']) .badge {
    background-color: var(--sando-badge-neutral-outline-backgroundColor);
    color: var(--sando-badge-neutral-outline-textColor);
    border-color: var(--sando-badge-neutral-outline-borderColor);
  }

  /* Neutral Surface */
  :host([color='neutral'][variant='surface']) .badge,
  :host(:not([color])[variant='surface']) .badge {
    background-color: var(--sando-badge-neutral-surface-backgroundColor);
    color: var(--sando-badge-neutral-surface-textColor);
    border-color: var(--sando-badge-neutral-surface-borderColor);
  }

  /* ========================================
     PRIMARY COLOR
     ======================================== */

  /* Primary Solid */
  :host([color='primary'][variant='solid']) .badge,
  :host([color='primary']:not([variant])) .badge {
    background-color: var(--sando-badge-primary-solid-backgroundColor);
    color: var(--sando-badge-primary-solid-textColor);
    border-color: var(--sando-badge-primary-solid-borderColor);
  }

  /* Primary Soft */
  :host([color='primary'][variant='soft']) .badge {
    background-color: var(--sando-badge-primary-soft-backgroundColor);
    color: var(--sando-badge-primary-soft-textColor);
    border-color: var(--sando-badge-primary-soft-borderColor);
  }

  /* Primary Outline */
  :host([color='primary'][variant='outline']) .badge {
    background-color: var(--sando-badge-primary-outline-backgroundColor);
    color: var(--sando-badge-primary-outline-textColor);
    border-color: var(--sando-badge-primary-outline-borderColor);
  }

  /* Primary Surface */
  :host([color='primary'][variant='surface']) .badge {
    background-color: var(--sando-badge-primary-surface-backgroundColor);
    color: var(--sando-badge-primary-surface-textColor);
    border-color: var(--sando-badge-primary-surface-borderColor);
  }

  /* ========================================
     SUCCESS COLOR
     ======================================== */

  /* Success Solid */
  :host([color='success'][variant='solid']) .badge,
  :host([color='success']:not([variant])) .badge {
    background-color: var(--sando-badge-success-solid-backgroundColor);
    color: var(--sando-badge-success-solid-textColor);
    border-color: var(--sando-badge-success-solid-borderColor);
  }

  /* Success Soft */
  :host([color='success'][variant='soft']) .badge {
    background-color: var(--sando-badge-success-soft-backgroundColor);
    color: var(--sando-badge-success-soft-textColor);
    border-color: var(--sando-badge-success-soft-borderColor);
  }

  /* Success Outline */
  :host([color='success'][variant='outline']) .badge {
    background-color: var(--sando-badge-success-outline-backgroundColor);
    color: var(--sando-badge-success-outline-textColor);
    border-color: var(--sando-badge-success-outline-borderColor);
  }

  /* Success Surface */
  :host([color='success'][variant='surface']) .badge {
    background-color: var(--sando-badge-success-surface-backgroundColor);
    color: var(--sando-badge-success-surface-textColor);
    border-color: var(--sando-badge-success-surface-borderColor);
  }

  /* ========================================
     WARNING COLOR
     ======================================== */

  /* Warning Solid */
  :host([color='warning'][variant='solid']) .badge,
  :host([color='warning']:not([variant])) .badge {
    background-color: var(--sando-badge-warning-solid-backgroundColor);
    color: var(--sando-badge-warning-solid-textColor);
    border-color: var(--sando-badge-warning-solid-borderColor);
  }

  /* Warning Soft */
  :host([color='warning'][variant='soft']) .badge {
    background-color: var(--sando-badge-warning-soft-backgroundColor);
    color: var(--sando-badge-warning-soft-textColor);
    border-color: var(--sando-badge-warning-soft-borderColor);
  }

  /* Warning Outline */
  :host([color='warning'][variant='outline']) .badge {
    background-color: var(--sando-badge-warning-outline-backgroundColor);
    color: var(--sando-badge-warning-outline-textColor);
    border-color: var(--sando-badge-warning-outline-borderColor);
  }

  /* Warning Surface */
  :host([color='warning'][variant='surface']) .badge {
    background-color: var(--sando-badge-warning-surface-backgroundColor);
    color: var(--sando-badge-warning-surface-textColor);
    border-color: var(--sando-badge-warning-surface-borderColor);
  }

  /* ========================================
     DANGER COLOR
     ======================================== */

  /* Danger Solid */
  :host([color='danger'][variant='solid']) .badge,
  :host([color='danger']:not([variant])) .badge {
    background-color: var(--sando-badge-danger-solid-backgroundColor);
    color: var(--sando-badge-danger-solid-textColor);
    border-color: var(--sando-badge-danger-solid-borderColor);
  }

  /* Danger Soft */
  :host([color='danger'][variant='soft']) .badge {
    background-color: var(--sando-badge-danger-soft-backgroundColor);
    color: var(--sando-badge-danger-soft-textColor);
    border-color: var(--sando-badge-danger-soft-borderColor);
  }

  /* Danger Outline */
  :host([color='danger'][variant='outline']) .badge {
    background-color: var(--sando-badge-danger-outline-backgroundColor);
    color: var(--sando-badge-danger-outline-textColor);
    border-color: var(--sando-badge-danger-outline-borderColor);
  }

  /* Danger Surface */
  :host([color='danger'][variant='surface']) .badge {
    background-color: var(--sando-badge-danger-surface-backgroundColor);
    color: var(--sando-badge-danger-surface-textColor);
    border-color: var(--sando-badge-danger-surface-borderColor);
  }

  /* ========================================
     INFO COLOR
     ======================================== */

  /* Info Solid */
  :host([color='info'][variant='solid']) .badge,
  :host([color='info']:not([variant])) .badge {
    background-color: var(--sando-badge-info-solid-backgroundColor);
    color: var(--sando-badge-info-solid-textColor);
    border-color: var(--sando-badge-info-solid-borderColor);
  }

  /* Info Soft */
  :host([color='info'][variant='soft']) .badge {
    background-color: var(--sando-badge-info-soft-backgroundColor);
    color: var(--sando-badge-info-soft-textColor);
    border-color: var(--sando-badge-info-soft-borderColor);
  }

  /* Info Outline */
  :host([color='info'][variant='outline']) .badge {
    background-color: var(--sando-badge-info-outline-backgroundColor);
    color: var(--sando-badge-info-outline-textColor);
    border-color: var(--sando-badge-info-outline-borderColor);
  }

  /* Info Surface */
  :host([color='info'][variant='surface']) .badge {
    background-color: var(--sando-badge-info-surface-backgroundColor);
    color: var(--sando-badge-info-surface-textColor);
    border-color: var(--sando-badge-info-surface-borderColor);
  }
`;
