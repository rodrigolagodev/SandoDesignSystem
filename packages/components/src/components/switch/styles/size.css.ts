/**
 * Switch Size Styles
 *
 * Contains styles for size variants:
 * - sm: Compact size for tight layouts
 * - md: Default size for most use cases
 * - lg: Larger touch target for mobile
 */

import { css } from 'lit';

export const sizeStyles = css`
  /* ========================================
     SMALL SIZE (sm)
     ======================================== */
  :host([size='sm']) .switch-track {
    width: var(--sando-switch-size-sm-trackWidth);
    height: var(--sando-switch-size-sm-trackHeight);
  }

  :host([size='sm']) .switch-thumb {
    width: var(--sando-switch-size-sm-thumbSize);
    height: var(--sando-switch-size-sm-thumbSize);
    left: var(--sando-switch-size-sm-thumbOffset);
    /* Vertical centering handled by base.css.ts (top: 50% + translateY(-50%)) */
  }

  :host([size='sm'][checked]) .switch-thumb {
    transform: translateY(-50%)
      translateX(
        calc(
          var(--sando-switch-size-sm-trackWidth) - var(--sando-switch-size-sm-thumbSize) - var(
              --sando-switch-size-sm-thumbOffset
            ) *
            2 - var(--sando-switch-borderWidth) * 2
        )
      );
  }

  :host([size='sm']) .switch-container {
    gap: var(--sando-switch-size-sm-gap);
  }

  :host([size='sm']) .switch-label {
    font-size: var(--sando-switch-size-sm-labelFontSize);
  }

  :host([size='sm']) .switch-description {
    margin-left: calc(var(--sando-switch-size-sm-trackWidth) + var(--sando-switch-size-sm-gap));
  }

  /* ========================================
     MEDIUM SIZE (md) - default
     ======================================== */
  :host([size='md']) .switch-track,
  .switch-track {
    width: var(--sando-switch-size-md-trackWidth);
    height: var(--sando-switch-size-md-trackHeight);
  }

  :host([size='md']) .switch-thumb,
  .switch-thumb {
    width: var(--sando-switch-size-md-thumbSize);
    height: var(--sando-switch-size-md-thumbSize);
    left: var(--sando-switch-size-md-thumbOffset);
    /* Vertical centering handled by base.css.ts (top: 50% + translateY(-50%)) */
  }

  :host([size='md'][checked]) .switch-thumb,
  :host([checked]) .switch-thumb {
    transform: translateY(-50%)
      translateX(
        calc(
          var(--sando-switch-size-md-trackWidth) - var(--sando-switch-size-md-thumbSize) - var(
              --sando-switch-size-md-thumbOffset
            ) *
            2 - var(--sando-switch-borderWidth) * 2
        )
      );
  }

  :host([size='md']) .switch-container,
  .switch-container {
    gap: var(--sando-switch-size-md-gap);
  }

  :host([size='md']) .switch-label,
  .switch-label {
    font-size: var(--sando-switch-size-md-labelFontSize);
  }

  /* ========================================
     LARGE SIZE (lg)
     ======================================== */
  :host([size='lg']) .switch-track {
    width: var(--sando-switch-size-lg-trackWidth);
    height: var(--sando-switch-size-lg-trackHeight);
  }

  :host([size='lg']) .switch-thumb {
    width: var(--sando-switch-size-lg-thumbSize);
    height: var(--sando-switch-size-lg-thumbSize);
    left: var(--sando-switch-size-lg-thumbOffset);
    /* Vertical centering handled by base.css.ts (top: 50% + translateY(-50%)) */
  }

  :host([size='lg'][checked]) .switch-thumb {
    transform: translateY(-50%)
      translateX(
        calc(
          var(--sando-switch-size-lg-trackWidth) - var(--sando-switch-size-lg-thumbSize) - var(
              --sando-switch-size-lg-thumbOffset
            ) *
            2 - var(--sando-switch-borderWidth) * 2
        )
      );
  }

  :host([size='lg']) .switch-container {
    gap: var(--sando-switch-size-lg-gap);
  }

  :host([size='lg']) .switch-label {
    font-size: var(--sando-switch-size-lg-labelFontSize);
  }

  :host([size='lg']) .switch-description {
    margin-left: calc(var(--sando-switch-size-lg-trackWidth) + var(--sando-switch-size-lg-gap));
  }
`;
