/**
 * Tag State Styles
 *
 * Contains styles for component states:
 * - Disabled: Non-interactive, dimmed appearance
 * - Focus: Visible focus indicators
 */

import { css } from 'lit';

export const stateStyles = css`
  /* ========================================
     DISABLED STATE
     ======================================== */
  :host([disabled]) .tag {
    cursor: not-allowed;
    pointer-events: none;
  }

  :host([disabled]) .tag__remove {
    cursor: not-allowed;
    pointer-events: none;
  }
`;
