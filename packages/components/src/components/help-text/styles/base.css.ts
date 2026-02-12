/**
 * Base Help Text Styles
 *
 * Contains:
 * - Host display and layout
 * - Typography (fixed caption size - industry standard)
 * - Animation for smooth appearance
 * - Reduced motion support
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: block;
    margin-top: var(--sando-help-text-marginTop);
    font-family: var(--sando-help-text-fontFamily);
    font-size: var(--sando-help-text-fontSize);
    line-height: var(--sando-help-text-lineHeight);
  }

  /* Reserve space by default to prevent layout shift */
  :host([reserve-space='true']),
  :host(:not([reserve-space])) {
    min-height: var(--sando-help-text-minHeight);
  }

  :host([reserve-space='false']) {
    min-height: 0;
  }

  .help-text {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--sando-help-text-gap);
  }

  .content {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity var(--sando-help-text-animation-duration) var(--sando-help-text-animation-timing),
      transform var(--sando-help-text-animation-duration) var(--sando-help-text-animation-timing);
  }

  /* Hide content visually when empty but keep space reserved */
  :host(:empty) .content,
  .content.empty {
    opacity: 0;
    transform: translateY(-4px);
  }

  .icon {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* Respect user preferences for reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .content {
      transition: none;
    }
  }
`;
