/**
 * Tag Variant Styles
 *
 * Contains styles for the three visual variants:
 * - Solid: Filled background (default, high emphasis)
 * - Outline: Border with transparent background (medium emphasis)
 * - Soft: Muted background color (low emphasis)
 */

import { css } from 'lit';

export const variantStyles = css`
  /* ========================================
     SOLID VARIANT
     ======================================== */
  :host([variant='solid']) .tag {
    background-color: var(--sando-tag-solid-backgroundColor-default);
    color: var(--sando-tag-solid-textColor-default);
    /**
     * Apply subtle opacity to border using color-mix.
     * 
     * Note: Using calc(opacity-token * 100%) to convert the unitless opacity 
     * value (0.8) to a percentage (80%) for color-mix.
     * 
     * @token --sando-opacity-800 = 0.8 → 80% of border color mixed with transparent
     */
    border-color: color-mix(
      in srgb,
      var(--sando-tag-solid-borderColor-default) calc(var(--sando-opacity-800) * 100%),
      transparent
    );
  }

  :host([variant='solid']) .tag--clickable:hover {
    background-color: var(--sando-tag-solid-backgroundColor-hover);
  }

  :host([variant='solid']) .tag--clickable:active {
    background-color: var(--sando-tag-solid-backgroundColor-active);
  }

  :host([variant='solid'][disabled]) .tag {
    background-color: var(--sando-tag-solid-backgroundColor-disabled);
    color: var(--sando-tag-solid-textColor-disabled);
  }

  /* Solid variant remove button icon color */
  :host([variant='solid']) .tag__remove-icon {
    color: var(--sando-tag-removeButton-iconColor-onSolid);
  }

  /* ========================================
     OUTLINE VARIANT
     ======================================== */
  :host([variant='outline']) .tag {
    background-color: var(--sando-tag-outline-backgroundColor-default);
    color: var(--sando-tag-outline-textColor-default);
    border-color: var(--sando-tag-outline-borderColor-default);
  }

  :host([variant='outline']) .tag--clickable:hover {
    background-color: var(--sando-tag-outline-backgroundColor-hover);
    border-color: var(--sando-tag-outline-borderColor-hover);
  }

  :host([variant='outline']) .tag--clickable:active {
    background-color: var(--sando-tag-outline-backgroundColor-active);
    border-color: var(--sando-tag-outline-borderColor-active);
  }

  :host([variant='outline'][disabled]) .tag {
    background-color: var(--sando-tag-outline-backgroundColor-disabled);
    color: var(--sando-tag-outline-textColor-disabled);
    border-color: var(--sando-tag-outline-borderColor-disabled);
  }

  /* Outline variant remove button icon color */
  :host([variant='outline']) .tag__remove-icon {
    color: var(--sando-tag-removeButton-iconColor-default);
  }

  /* ========================================
     SOFT VARIANT
     ======================================== */
  :host([variant='soft']) .tag {
    background-color: var(--sando-tag-soft-backgroundColor-default);
    color: var(--sando-tag-soft-textColor-default);
    border-color: var(--sando-tag-soft-borderColor-default);
  }

  :host([variant='soft']) .tag--clickable:hover {
    background-color: var(--sando-tag-soft-backgroundColor-hover);
  }

  :host([variant='soft']) .tag--clickable:active {
    background-color: var(--sando-tag-soft-backgroundColor-active);
  }

  :host([variant='soft'][disabled]) .tag {
    background-color: var(--sando-tag-soft-backgroundColor-disabled);
    color: var(--sando-tag-soft-textColor-disabled);
  }

  /* Soft variant remove button icon color */
  :host([variant='soft']) .tag__remove-icon {
    color: var(--sando-tag-removeButton-iconColor-default);
  }
`;
