/**
 * Alert Variant Styles
 *
 * Defines CSS custom property overrides for each combination of
 * appearance × status. Uses :host attribute selectors to set
 * local vars that the base styles consume.
 *
 * Pattern: --_alert-{property} (local vars, scoped to this component)
 */

import { css } from 'lit';

export const variantStyles = css`
  /* ========================================
     DEFAULT: outline + info
     ======================================== */
  :host {
    --_alert-bg: var(--sando-alert-outline-info-backgroundColor);
    --_alert-border: var(--sando-alert-outline-info-borderColor);
    --_alert-icon-color: var(--sando-alert-outline-info-iconColor);
    --_alert-title-color: var(--sando-alert-outline-info-titleColor);
    --_alert-text-color: var(--sando-alert-outline-info-textColor);
  }

  /* ========================================
     OUTLINE × SUCCESS
     ======================================== */
  :host([appearance='outline'][status='success']) {
    --_alert-bg: var(--sando-alert-outline-success-backgroundColor);
    --_alert-border: var(--sando-alert-outline-success-borderColor);
    --_alert-icon-color: var(--sando-alert-outline-success-iconColor);
    --_alert-title-color: var(--sando-alert-outline-success-titleColor);
    --_alert-text-color: var(--sando-alert-outline-success-textColor);
  }

  /* ========================================
     OUTLINE × WARNING
     ======================================== */
  :host([appearance='outline'][status='warning']) {
    --_alert-bg: var(--sando-alert-outline-warning-backgroundColor);
    --_alert-border: var(--sando-alert-outline-warning-borderColor);
    --_alert-icon-color: var(--sando-alert-outline-warning-iconColor);
    --_alert-title-color: var(--sando-alert-outline-warning-titleColor);
    --_alert-text-color: var(--sando-alert-outline-warning-textColor);
  }

  /* ========================================
     OUTLINE × DESTRUCTIVE
     ======================================== */
  :host([appearance='outline'][status='destructive']) {
    --_alert-bg: var(--sando-alert-outline-destructive-backgroundColor);
    --_alert-border: var(--sando-alert-outline-destructive-borderColor);
    --_alert-icon-color: var(--sando-alert-outline-destructive-iconColor);
    --_alert-title-color: var(--sando-alert-outline-destructive-titleColor);
    --_alert-text-color: var(--sando-alert-outline-destructive-textColor);
  }

  /* ========================================
     SOLID × INFO
     ======================================== */
  :host([appearance='solid'][status='info']),
  :host([appearance='solid']:not([status])) {
    --_alert-bg: var(--sando-alert-solid-info-backgroundColor);
    --_alert-border: var(--sando-alert-solid-info-borderColor);
    --_alert-icon-color: var(--sando-alert-solid-info-iconColor);
    --_alert-title-color: var(--sando-alert-solid-info-titleColor);
    --_alert-text-color: var(--sando-alert-solid-info-textColor);
  }

  /* ========================================
     SOLID × SUCCESS
     ======================================== */
  :host([appearance='solid'][status='success']) {
    --_alert-bg: var(--sando-alert-solid-success-backgroundColor);
    --_alert-border: var(--sando-alert-solid-success-borderColor);
    --_alert-icon-color: var(--sando-alert-solid-success-iconColor);
    --_alert-title-color: var(--sando-alert-solid-success-titleColor);
    --_alert-text-color: var(--sando-alert-solid-success-textColor);
  }

  /* ========================================
     SOLID × WARNING
     ======================================== */
  :host([appearance='solid'][status='warning']) {
    --_alert-bg: var(--sando-alert-solid-warning-backgroundColor);
    --_alert-border: var(--sando-alert-solid-warning-borderColor);
    --_alert-icon-color: var(--sando-alert-solid-warning-iconColor);
    --_alert-title-color: var(--sando-alert-solid-warning-titleColor);
    --_alert-text-color: var(--sando-alert-solid-warning-textColor);
  }

  /* ========================================
     SOLID × DESTRUCTIVE
     ======================================== */
  :host([appearance='solid'][status='destructive']) {
    --_alert-bg: var(--sando-alert-solid-destructive-backgroundColor);
    --_alert-border: var(--sando-alert-solid-destructive-borderColor);
    --_alert-icon-color: var(--sando-alert-solid-destructive-iconColor);
    --_alert-title-color: var(--sando-alert-solid-destructive-titleColor);
    --_alert-text-color: var(--sando-alert-solid-destructive-textColor);
  }
`;
