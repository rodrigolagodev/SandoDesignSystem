/**
 * Universal CSS Reset for Shadow DOM Components
 *
 * Provides consistent baseline styles inside Shadow DOM.
 * Import alongside tokenStyles in every component.
 *
 * IMPORTANT: This reset is specifically designed for Web Components.
 * It handles Shadow DOM encapsulation and cross-browser consistency.
 *
 * @example
 * ```ts
 * import { resetStyles } from '../../styles/reset.css.js';
 * import { tokenStyles } from '../../styles/tokens.css.js';
 *
 * static styles = [resetStyles, tokenStyles, componentStyles];
 * ```
 */
import { css } from 'lit';

export const resetStyles = css`
  /* ============================================
     1. BOX MODEL RESET
     Ensures padding/border are included in size
     ============================================ */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* ============================================
     2. HOST DEFAULTS
     Common :host defaults for all components
     ============================================ */
  :host {
    /* Font inheritance from light DOM */
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
  }

  :host([hidden]) {
    display: none !important;
  }

  /* ============================================
     3. INTERACTIVE ELEMENTS RESET
     Buttons, inputs, selects, textareas
     
     NOTE: If a component uses 'all: unset' on button/input elements,
     these styles will be overridden. For complete reset of native
     elements, import 'interactiveReset' from 'styles/shared/base.styles.ts'
     ============================================ */
  button,
  input,
  select,
  textarea {
    /* Inherit font from parent */
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;

    /* Remove default margin */
    margin: 0;

    /* Box sizing */
    box-sizing: border-box;
  }

  button {
    /* Remove default button styles */
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    /* Inherit text styles */
    text-align: inherit;
  }

  /* ============================================
     4. TYPOGRAPHY RESET
     ============================================ */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  /* ============================================
     5. MEDIA RESET
     ============================================ */
  img,
  svg,
  video,
  canvas {
    display: block;
    max-width: 100%;
  }

  /* ============================================
     6. ACCESSIBILITY
     ============================================ */
  /* Respect user preferences for reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
