/**
 * Base Option Group Styles
 *
 * Contains:
 * - CSS reset and host styles
 * - Layout (flexbox, alignment)
 * - Typography for label
 * - Divider styling
 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: block;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  .option-group {
    display: flex;
    flex-direction: column;
  }

  /* Divider above group (not first child) */
  :host(:not(:first-child)) .option-group::before {
    content: '';
    display: block;
    height: var(--sando-select-optionGroup-dividerWidth, 1px);
    background-color: var(--sando-select-optionGroup-dividerColor);
    margin-top: var(--sando-select-optionGroup-marginTop);
    margin-bottom: var(--sando-select-optionGroup-marginTop);
  }

  .option-group-label {
    font-size: var(--sando-select-optionGroup-labelFontSize);
    font-weight: var(--sando-select-optionGroup-labelFontWeight);
    color: var(--sando-select-optionGroup-labelColor);
    padding-inline: var(--sando-select-optionGroup-labelPaddingInline);
    padding-block: var(--sando-select-optionGroup-labelPaddingBlock);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    user-select: none;
  }

  .option-group-options {
    display: flex;
    flex-direction: column;
  }

  /* Disabled state styling */
  :host([disabled]) .option-group-label {
    opacity: 0.5;
  }
`;
