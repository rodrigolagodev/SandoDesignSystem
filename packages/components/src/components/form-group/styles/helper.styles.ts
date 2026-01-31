/**
 * Helper Text and Error Styles for Form Group
 *
 * Contains:
 * - Helper text styling
 * - Error message styling
 * - High contrast mode support
 * - Reduced motion support
 */

import { css } from 'lit';

export const helperStyles = css`
  /* Helper text styles */
  .form-group__helper-text {
    margin-top: var(--sando-form-group-helperText-marginTop);
    color: var(--sando-form-group-helperText-textColor);
    font-size: var(--sando-form-group-helperText-fontSize);
    line-height: var(--sando-form-group-helperText-lineHeight);
  }

  /* Error text styles */
  .form-group__error {
    margin-top: var(--sando-form-group-error-marginTop);
    color: var(--sando-form-group-error-textColor);
    font-size: var(--sando-form-group-error-fontSize);
    line-height: var(--sando-form-group-error-lineHeight);
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .form-group__error {
      font-weight: 700;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .form-group__error {
      animation: none;
    }
  }
`;
