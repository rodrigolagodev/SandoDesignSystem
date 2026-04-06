/**
 * State Styles for Radio Group
 *
 * Contains:
 * - Disabled state styling
 * - Error state styling
 * - High contrast mode support
 */

import { css } from 'lit';

export const stateStyles = css`
  /* Disabled state */
  :host([disabled]) {
    pointer-events: none;
  }

  :host([disabled]) .radio-group-label {
    color: var(--sando-radio-group-label-textColor-disabled);
  }

  /* Error state - label color */
  :host([error]) .radio-group-label {
    color: var(--sando-radio-group-label-textColor-error);
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .error-text {
      font-weight: var(--sando-radio-group-label-fontWeight);
    }
  }

  /* Reduced motion is handled globally by resetStyles */
`;
