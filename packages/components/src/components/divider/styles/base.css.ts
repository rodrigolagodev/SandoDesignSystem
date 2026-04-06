/**
 * Base Divider Styles
 *
 * Contains:
 * - Host display and layout
 * - Divider line rendering (via border)
 * - Label (centered text) pattern
 *
 * Note: All color/spacing values come exclusively from Recipe tokens.
 * Reset styles (box-sizing, margin, padding) are handled by resetStyles.
 */

import { css } from 'lit';

export const baseStyles = css`
  /* ============================================
     HOST — horizontal (default)
     ============================================ */
  :host {
    display: block;
  }

  :host([orientation='vertical']) {
    display: inline-flex;
    align-self: stretch;
  }

  /* ============================================
     HR — bare horizontal separator
     ============================================ */
  hr.divider {
    /* Reset browser hr defaults */
    all: unset;
    display: block;

    /* Line */
    border-block-start-width: var(--sando-divider-weight-medium);
    border-block-start-style: solid;
    border-block-start-color: var(--sando-divider-color);

    /* Spacing */
    margin-block: var(--sando-divider-spacing-md);

    width: 100%;
  }

  /* ============================================
     DIV.divider — horizontal WITH label
     ============================================ */
  div.divider {
    display: flex;
    align-items: center;
    gap: var(--sando-divider-label-gap, var(--sando-space-stack-muted));

    /* Spacing */
    margin-block: var(--sando-divider-spacing-md);

    width: 100%;
  }

  div.divider::before,
  div.divider::after {
    content: '';
    flex: 1;
    border-block-start-width: var(--sando-divider-weight-medium);
    border-block-start-style: solid;
    border-block-start-color: var(--sando-divider-color);
  }

  .divider__label {
    color: var(--sando-divider-color);
    white-space: nowrap;
    font-size: inherit;
    line-height: inherit;
  }

  /* ============================================
     DIV.divider--vertical — vertical separator
     ============================================ */
  div.divider--vertical {
    display: inline-block;
    align-self: stretch;

    /* Line */
    border-inline-start-width: var(--sando-divider-weight-medium);
    border-inline-start-style: solid;
    border-inline-start-color: var(--sando-divider-color);

    /* Spacing */
    margin-inline: var(--sando-divider-spacing-md);

    height: 100%;
  }

  /* ============================================
     WEIGHT modifiers
     ============================================ */
  :host([weight='thin']) hr.divider,
  :host([weight='thin']) div.divider::before,
  :host([weight='thin']) div.divider::after {
    border-block-start-width: var(--sando-divider-weight-thin);
  }

  :host([weight='thick']) hr.divider,
  :host([weight='thick']) div.divider::before,
  :host([weight='thick']) div.divider::after {
    border-block-start-width: var(--sando-divider-weight-thick);
  }

  :host([weight='thin']) div.divider--vertical {
    border-inline-start-width: var(--sando-divider-weight-thin);
  }

  :host([weight='thick']) div.divider--vertical {
    border-inline-start-width: var(--sando-divider-weight-thick);
  }

  /* ============================================
     VARIANT modifiers (line style)
     ============================================ */
  :host([variant='dashed']) hr.divider,
  :host([variant='dashed']) div.divider::before,
  :host([variant='dashed']) div.divider::after {
    border-block-start-style: dashed;
  }

  :host([variant='dotted']) hr.divider,
  :host([variant='dotted']) div.divider::before,
  :host([variant='dotted']) div.divider::after {
    border-block-start-style: dotted;
  }

  :host([variant='dashed']) div.divider--vertical {
    border-inline-start-style: dashed;
  }

  :host([variant='dotted']) div.divider--vertical {
    border-inline-start-style: dotted;
  }

  /* ============================================
     SPACING modifiers
     ============================================ */
  :host([spacing='sm']) hr.divider,
  :host([spacing='sm']) div.divider {
    margin-block: var(--sando-divider-spacing-sm);
  }

  :host([spacing='lg']) hr.divider,
  :host([spacing='lg']) div.divider {
    margin-block: var(--sando-divider-spacing-lg);
  }

  :host([spacing='sm']) div.divider--vertical {
    margin-inline: var(--sando-divider-spacing-sm);
  }

  :host([spacing='md']) div.divider--vertical {
    margin-inline: var(--sando-divider-spacing-md);
  }

  :host([spacing='lg']) div.divider--vertical {
    margin-inline: var(--sando-divider-spacing-lg);
  }
`;
