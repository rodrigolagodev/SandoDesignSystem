/**
 * Base Card Styles
 *
 * Contains:
 * - Host element (block display, position, overflow)
 * - .card container layout and base appearance
 * - Section wrappers (media, header, body, footer)
 * - Heading styles
 * - Interactive surface overlay (.card__surface-action)
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: block;
    position: relative;
  }

  :host([full-width]) {
    width: 100%;
  }

  /* Card container — always a <div>, never interactive itself */
  .card {
    position: relative; /* Required for overlay positioning */
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--sando-card-backgroundColor);
    transition-property: box-shadow, transform, opacity, border-color;
    transition-duration: var(--sando-card-transition-duration);
    transition-timing-function: var(--sando-card-transition-timing);
  }

  /* ----------------------------------------
   * Sections
   * ---------------------------------------- */

  /* Media slot — flush to card edges, no padding, never hidden by overflow */
  .card__media {
    flex-shrink: 0;
    overflow: hidden;
  }

  .card__media:empty,
  .card__media[hidden] {
    display: none;
  }

  /* Slotted media fills the container naturally */
  .card__media ::slotted(*) {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: var(--sando-card-media-aspectRatio);
    object-fit: cover;
  }

  /* Content wrapper — groups header + body + footer.
   * In vertical mode: transparent passthrough (no flex needed, card column handles it).
   * In horizontal mode: becomes the right-hand flex column (see orientation.css.ts). */
  .card__content {
    display: contents;
  }

  /* Header section */
  .card__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--sando-card-section-gap);
  }

  .card__header:empty,
  .card__header[hidden] {
    display: none;
  }

  .card__header-content {
    flex: 1;
    min-width: 0;
  }

  .card__header-action {
    flex-shrink: 0;
  }

  .card__header-action:empty,
  .card__header-action[hidden] {
    display: none;
  }

  /* Heading */
  .card__heading {
    margin: 0;
    font-size: var(--sando-card-heading-fontSize);
    font-weight: var(--sando-card-heading-fontWeight);
    color: var(--sando-card-heading-color);
    /* NOTE: No recipe token for heading line-height exists in card.json.
     * Using DLD §2.4 subheading rule (1.3) until --sando-card-heading-lineHeight
     * is added to the recipe. */
    line-height: 1.3;
  }

  /* Body section (default slot) */
  .card__body {
    flex: 1;
  }

  .card__body:empty,
  .card__body[hidden] {
    display: none;
  }

  /* Footer section — above the surface-action overlay */
  .card__footer {
    position: relative;
    z-index: 2; /* Sits above .card__surface-action (z-index: 1) */
    display: flex;
    align-items: center;
    gap: var(--sando-card-footer-gap);
    padding-top: var(--sando-card-footer-paddingTop);
    margin-top: auto;
  }

  .card__footer:empty,
  .card__footer[hidden] {
    display: none;
  }

  /* ----------------------------------------
   * Pseudo-Interactive Surface (CA-LP-PIS)
   * IMPORTANT: Host is ALWAYS <div>. Interactive
   * behaviour is provided by this overlay, which
   * expands to cover the full card via inset: 0.
   * ---------------------------------------- */
  .card__surface-action {
    /* Overlay positioning */
    position: absolute;
    inset: 0;
    z-index: 1;

    /* Reset button/anchor visuals */
    appearance: none;
    -webkit-appearance: none;
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    text-decoration: none;
    color: inherit;

    /* Interactive affordances */
    cursor: pointer;
    border-radius: inherit;

    /* Accessible click target */
    display: block;
    width: 100%;
    height: 100%;
  }

  /* Focus ring on the overlay element */
  .card__surface-action:focus-visible {
    outline: var(--sando-card-focusOutlineWidth) solid var(--sando-card-focusOutlineColor);
    outline-offset: 0;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .card {
      transition-duration: 0ms !important;
    }
  }
`;
