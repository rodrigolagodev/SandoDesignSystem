/**
 * Tooltip Placement Styles
 *
 * Defines:
 * - Per-placement transform for enter animation (initial offset → 0)
 * - Per-placement arrow direction and position
 *
 * The actual top/left coordinates are set via JavaScript (_positionTooltip).
 * CSS here only controls the ARROW direction and the initial ANIMATION offset.
 */

import { css } from 'lit';

export const placementStyles = css`
  /* ========================================
     TOP placement
     Bubble appears above trigger.
     Arrow points DOWN toward trigger.
     Initial state: slides from slightly below.
     ======================================== */
  :host([placement='top']) .tooltip-bubble:not([popover]),
  :host([placement='top']) .tooltip-bubble[popover]:not(:popover-open) {
    transform: translateY(4px);
  }

  :host([placement='top']) .tooltip-bubble.is-open:not([popover]),
  :host([placement='top']) .tooltip-bubble[popover]:popover-open {
    transform: translateY(0);
  }

  /* Arrow: points down */
  :host([placement='top']) .tooltip-bubble::before {
    border-left: var(--sando-tooltip-arrow-size) solid transparent;
    border-right: var(--sando-tooltip-arrow-size) solid transparent;
    border-top: var(--sando-tooltip-arrow-size) solid var(--sando-tooltip-backgroundColor);
    bottom: calc(-1 * var(--sando-tooltip-arrow-size));
    left: 50%;
    transform: translateX(-50%);
  }

  /* ========================================
     BOTTOM placement
     Bubble appears below trigger.
     Arrow points UP toward trigger.
     Initial state: slides from slightly above.
     ======================================== */
  :host([placement='bottom']) .tooltip-bubble:not([popover]),
  :host([placement='bottom']) .tooltip-bubble[popover]:not(:popover-open) {
    transform: translateY(-4px);
  }

  :host([placement='bottom']) .tooltip-bubble.is-open:not([popover]),
  :host([placement='bottom']) .tooltip-bubble[popover]:popover-open {
    transform: translateY(0);
  }

  /* Arrow: points up */
  :host([placement='bottom']) .tooltip-bubble::before {
    border-left: var(--sando-tooltip-arrow-size) solid transparent;
    border-right: var(--sando-tooltip-arrow-size) solid transparent;
    border-bottom: var(--sando-tooltip-arrow-size) solid var(--sando-tooltip-backgroundColor);
    top: calc(-1 * var(--sando-tooltip-arrow-size));
    left: 50%;
    transform: translateX(-50%);
  }

  /* ========================================
     RIGHT placement
     Bubble appears to the right of trigger.
     Arrow points LEFT toward trigger.
     Initial state: slides from slightly left.
     ======================================== */
  :host([placement='right']) .tooltip-bubble:not([popover]),
  :host([placement='right']) .tooltip-bubble[popover]:not(:popover-open) {
    transform: translateX(-4px);
  }

  :host([placement='right']) .tooltip-bubble.is-open:not([popover]),
  :host([placement='right']) .tooltip-bubble[popover]:popover-open {
    transform: translateX(0);
  }

  /* Arrow: points left */
  :host([placement='right']) .tooltip-bubble::before {
    border-top: var(--sando-tooltip-arrow-size) solid transparent;
    border-bottom: var(--sando-tooltip-arrow-size) solid transparent;
    border-right: var(--sando-tooltip-arrow-size) solid var(--sando-tooltip-backgroundColor);
    left: calc(-1 * var(--sando-tooltip-arrow-size));
    top: 50%;
    transform: translateY(-50%);
  }

  /* ========================================
     LEFT placement
     Bubble appears to the left of trigger.
     Arrow points RIGHT toward trigger.
     Initial state: slides from slightly right.
     ======================================== */
  :host([placement='left']) .tooltip-bubble:not([popover]),
  :host([placement='left']) .tooltip-bubble[popover]:not(:popover-open) {
    transform: translateX(4px);
  }

  :host([placement='left']) .tooltip-bubble.is-open:not([popover]),
  :host([placement='left']) .tooltip-bubble[popover]:popover-open {
    transform: translateX(0);
  }

  /* Arrow: points right */
  :host([placement='left']) .tooltip-bubble::before {
    border-top: var(--sando-tooltip-arrow-size) solid transparent;
    border-bottom: var(--sando-tooltip-arrow-size) solid transparent;
    border-left: var(--sando-tooltip-arrow-size) solid var(--sando-tooltip-backgroundColor);
    right: calc(-1 * var(--sando-tooltip-arrow-size));
    top: 50%;
    transform: translateY(-50%);
  }

  /* ========================================
     TOP-START placement
     Bubble above, ends at trigger center.
     Arrow at bottom-RIGHT edge (points to trigger center).
     ======================================== */
  :host([placement='top-start']) .tooltip-bubble:not([popover]),
  :host([placement='top-start']) .tooltip-bubble[popover]:not(:popover-open) {
    transform: translateY(4px);
  }

  :host([placement='top-start']) .tooltip-bubble.is-open:not([popover]),
  :host([placement='top-start']) .tooltip-bubble[popover]:popover-open {
    transform: translateY(0);
  }

  /* Arrow at bottom-right inner corner */
  :host([placement='top-start']) .tooltip-bubble::before {
    border-left: var(--sando-tooltip-arrow-size) solid transparent;
    border-right: var(--sando-tooltip-arrow-size) solid transparent;
    border-top: var(--sando-tooltip-arrow-size) solid var(--sando-tooltip-backgroundColor);
    bottom: calc(-1 * var(--sando-tooltip-arrow-size));
    right: calc(var(--sando-tooltip-arrow-size) * 2);
    transform: none;
  }

  /* ========================================
     TOP-END placement
     Bubble above, starts at trigger center.
     Arrow at bottom-LEFT edge (points to trigger center).
     ======================================== */
  :host([placement='top-end']) .tooltip-bubble:not([popover]),
  :host([placement='top-end']) .tooltip-bubble[popover]:not(:popover-open) {
    transform: translateY(4px);
  }

  :host([placement='top-end']) .tooltip-bubble.is-open:not([popover]),
  :host([placement='top-end']) .tooltip-bubble[popover]:popover-open {
    transform: translateY(0);
  }

  /* Arrow at bottom-left inner corner */
  :host([placement='top-end']) .tooltip-bubble::before {
    border-left: var(--sando-tooltip-arrow-size) solid transparent;
    border-right: var(--sando-tooltip-arrow-size) solid transparent;
    border-top: var(--sando-tooltip-arrow-size) solid var(--sando-tooltip-backgroundColor);
    bottom: calc(-1 * var(--sando-tooltip-arrow-size));
    left: calc(var(--sando-tooltip-arrow-size) * 2);
    transform: none;
  }

  /* ========================================
     BOTTOM-START placement
     Bubble below, ends at trigger center.
     Arrow at top-RIGHT edge (points to trigger center).
     ======================================== */
  :host([placement='bottom-start']) .tooltip-bubble:not([popover]),
  :host([placement='bottom-start']) .tooltip-bubble[popover]:not(:popover-open) {
    transform: translateY(-4px);
  }

  :host([placement='bottom-start']) .tooltip-bubble.is-open:not([popover]),
  :host([placement='bottom-start']) .tooltip-bubble[popover]:popover-open {
    transform: translateY(0);
  }

  /* Arrow at top-right inner corner */
  :host([placement='bottom-start']) .tooltip-bubble::before {
    border-left: var(--sando-tooltip-arrow-size) solid transparent;
    border-right: var(--sando-tooltip-arrow-size) solid transparent;
    border-bottom: var(--sando-tooltip-arrow-size) solid var(--sando-tooltip-backgroundColor);
    top: calc(-1 * var(--sando-tooltip-arrow-size));
    right: calc(var(--sando-tooltip-arrow-size) * 2);
    transform: none;
  }

  /* ========================================
     BOTTOM-END placement
     Bubble below, starts at trigger center.
     Arrow at top-LEFT edge (points to trigger center).
     ======================================== */
  :host([placement='bottom-end']) .tooltip-bubble:not([popover]),
  :host([placement='bottom-end']) .tooltip-bubble[popover]:not(:popover-open) {
    transform: translateY(-4px);
  }

  :host([placement='bottom-end']) .tooltip-bubble.is-open:not([popover]),
  :host([placement='bottom-end']) .tooltip-bubble[popover]:popover-open {
    transform: translateY(0);
  }

  /* Arrow at top-left inner corner */
  :host([placement='bottom-end']) .tooltip-bubble::before {
    border-left: var(--sando-tooltip-arrow-size) solid transparent;
    border-right: var(--sando-tooltip-arrow-size) solid transparent;
    border-bottom: var(--sando-tooltip-arrow-size) solid var(--sando-tooltip-backgroundColor);
    top: calc(-1 * var(--sando-tooltip-arrow-size));
    left: calc(var(--sando-tooltip-arrow-size) * 2);
    transform: none;
  }

  /* ========================================
     DEFAULT PLACEMENT FALLBACK (top)
     When no placement attribute is set,
     default to top behavior.
     ======================================== */
  :host(:not([placement])) .tooltip-bubble:not([popover]),
  :host([placement='top']) .tooltip-bubble:not([popover]) {
    transform: translateY(4px);
  }
`;
