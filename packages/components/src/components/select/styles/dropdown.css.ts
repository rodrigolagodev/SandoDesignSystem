/**
 * Select Dropdown Styles
 *
 * Contains styles for the dropdown/listbox:
 * - Positioning (absolute for fallback, fixed for popover)
 * - Box shadow
 * - Animation
 * - Scrolling
 * - Popover API support
 */

import { css } from 'lit';

export const dropdownStyles = css`
  /* ========================================
     DROPDOWN CONTAINER (Fallback mode)
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
    /* Animation - hidden until open */
    opacity: 0;
    visibility: hidden;
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

  /* Open state (fallback mode) */
  :host([open]) .select-dropdown:not([popover]) {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }

  /* Hidden attribute for closed state (fallback mode) */
  .select-dropdown[hidden] {
    display: none;
  }

  /* ========================================
     POPOVER API MODE
     When popover attribute is present, the dropdown
     renders in the browser's top layer and escapes
     overflow: hidden containers.
     ======================================== */

  /* Reset browser popover styles */
  .select-dropdown[popover] {
    /* Reset default popover styling */
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    /* Allow our styles to take over */
    overflow: visible;
    /* Position will be set via JS */
    inset: unset;
  }

  /* Closed state (handled by popover, but ensure hidden) */
  .select-dropdown[popover]:not(:popover-open) {
    display: none;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }

  /* Open state (popover mode) */
  .select-dropdown[popover]:popover-open {
    /* Visual styles */
    display: block;
    visibility: visible;
    background-color: var(--sando-select-dropdown-backgroundColor);
    border: var(--sando-select-dropdown-borderWidth) solid var(--sando-select-dropdown-borderColor);
    border-radius: var(--sando-select-dropdown-borderRadius);
    box-shadow: var(--sando-select-dropdown-boxShadow);
    padding-block: var(--sando-select-dropdown-paddingBlock);
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    /* Animation */
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
    transition-property: opacity, transform;
    transition-duration: var(--sando-select-transition-duration);
    transition-timing-function: var(--sando-select-transition-timing);
  }

  /* Top placement animation for popover */
  :host([placement='top']) .select-dropdown[popover]:popover-open {
    transform: translateY(0);
  }

  /* No backdrop for select dropdown */
  .select-dropdown::backdrop {
    background: transparent;
    pointer-events: none;
  }

  /* ========================================
     SHARED STYLES
     ======================================== */

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
