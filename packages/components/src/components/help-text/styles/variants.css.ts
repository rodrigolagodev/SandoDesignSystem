/**
 * Variant Styles for Help Text
 *
 * Contains color styles for each variant:
 * - default: Neutral/muted text
 * - error: Destructive/error state
 * - success: Success state
 * - warning: Warning/caution state
 */

import { css } from 'lit';

export const variantStyles = css`
  /* Default variant - neutral helper text */
  :host([variant='default']),
  :host(:not([variant])) {
    color: var(--sando-help-text-variant-default-textColor);
  }

  :host([variant='default']) .icon,
  :host(:not([variant])) .icon {
    color: var(--sando-help-text-variant-default-iconColor);
  }

  /* Error variant - validation errors */
  :host([variant='error']) {
    color: var(--sando-help-text-variant-error-textColor);
  }

  :host([variant='error']) .icon {
    color: var(--sando-help-text-variant-error-iconColor);
  }

  /* Success variant - positive feedback */
  :host([variant='success']) {
    color: var(--sando-help-text-variant-success-textColor);
  }

  :host([variant='success']) .icon {
    color: var(--sando-help-text-variant-success-iconColor);
  }

  /* Warning variant - caution messages */
  :host([variant='warning']) {
    color: var(--sando-help-text-variant-warning-textColor);
  }

  :host([variant='warning']) .icon {
    color: var(--sando-help-text-variant-warning-iconColor);
  }
`;
