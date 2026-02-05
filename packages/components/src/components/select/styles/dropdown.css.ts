/**
 * Select Dropdown Styles
 *
 * Contains styles for the dropdown/listbox:
 * - Positioning
 * - Box shadow
 * - Animation
 * - Scrolling
 */

import { css } from 'lit';

export const dropdownStyles = css`
  /* ========================================
     DROPDOWN CONTAINER
     ======================================== */
  .select-dropdown {
    position: absolute;
    left: 0;
    right: 0;
    z-index: var(--sando-select-zIndex-dropdown, 100);
    margin-top: 4px;
    background-color: var(--sando-select-dropdown-backgroundColor);
    border: var(--sando-select-dropdown-borderWidth) solid var(--sando-select-dropdown-borderColor);
    border-radius: var(--sando-select-dropdown-borderRadius);
    box-shadow: var(--sando-select-dropdown-boxShadow);
    padding-block: var(--sando-select-dropdown-paddingBlock);
    max-height: var(--sando-select-dropdown-maxHeight);
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    /* Animation */
    opacity: 0;
    transform: translateY(-8px);
    pointer-events: none;
    transition-property: opacity, transform;
    transition-duration: var(--sando-select-transition-duration);
    transition-timing-function: var(--sando-select-transition-timing);
  }

  /* Bottom placement (default) */
  .select-dropdown {
    top: 100%;
    bottom: auto;
  }

  /* Top placement */
  :host([placement='top']) .select-dropdown {
    top: auto;
    bottom: 100%;
    margin-top: 0;
    margin-bottom: 4px;
    transform: translateY(8px);
  }

  /* Open state */
  :host([open]) .select-dropdown {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  /* Hidden attribute for closed state */
  .select-dropdown[hidden] {
    display: none;
  }

  /* Scroll sentinel for infinite scroll */
  .scroll-sentinel {
    height: 1px;
    visibility: hidden;
  }

  /* Scrollbar styling */
  .select-dropdown::-webkit-scrollbar {
    width: 8px;
  }

  .select-dropdown::-webkit-scrollbar-track {
    background: transparent;
  }

  .select-dropdown::-webkit-scrollbar-thumb {
    background-color: var(--sando-select-dropdown-borderColor);
    border-radius: 4px;
    border: 2px solid var(--sando-select-dropdown-backgroundColor);
  }

  .select-dropdown::-webkit-scrollbar-thumb:hover {
    background-color: var(--sando-select-outlined-borderColor-hover);
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .select-dropdown {
      transition-duration: 0.01ms !important;
    }
  }
`;
