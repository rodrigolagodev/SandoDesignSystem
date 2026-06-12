/**
 * @deprecated Will be removed in the next major. Compose `<sando-skeleton>` and
 * `<sando-skeleton-paragraph>` instead. See Storybook → Components → Skeleton → Patterns
 * for direct replacements. Tracked in #126.
 *
 * Sando Skeleton Button Component
 *
 * A skeleton placeholder for button loading states.
 * Uses rounded shape to match button appearance.
 *
 * @element sando-skeleton-button
 *
 * @cssprop --sando-skeleton-size-button-height-sm - Height for small size (32px)
 * @cssprop --sando-skeleton-size-button-height-md - Height for medium size (40px)
 * @cssprop --sando-skeleton-size-button-height-lg - Height for large size (48px)
 *
 * @example Basic usage
 * <sando-skeleton-button></sando-skeleton-button>
 *
 * @example Size variants
 * <sando-skeleton-button size="sm"></sando-skeleton-button>
 * <sando-skeleton-button size="md"></sando-skeleton-button>
 * <sando-skeleton-button size="lg"></sando-skeleton-button>
 *
 * @example Full width
 * <sando-skeleton-button width="full"></sando-skeleton-button>
 *
 * @example Custom width
 * <sando-skeleton-button width="200px"></sando-skeleton-button>
 *
 * @example Icon-only button (square)
 * <sando-skeleton-button icon-only></sando-skeleton-button>
 * <sando-skeleton-button size="lg" icon-only></sando-skeleton-button>
 *
 * @example Button group placeholder
 * <div style="display: flex; gap: 8px;">
 *   <sando-skeleton-button size="md"></sando-skeleton-button>
 *   <sando-skeleton-button size="md"></sando-skeleton-button>
 * </div>
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import '../skeleton/sando-skeleton.js';
import type { SkeletonEffect } from '../skeleton/sando-skeleton.types.js';
import type { SkeletonButtonSize, SkeletonButtonWidth } from './sando-skeleton-button.types.js';

@customElement('sando-skeleton-button')
export class SandoSkeletonButton extends FlavorableMixin(LitElement) {
  private static _deprecationWarned = false;

  connectedCallback() {
    super.connectedCallback();
    if (!SandoSkeletonButton._deprecationWarned) {
      console.warn(
        '[sando] <sando-skeleton-button> is deprecated and will be removed in the next major. Compose <sando-skeleton> and <sando-skeleton-paragraph> instead. See Storybook → Skeleton → Patterns.'
      );
      SandoSkeletonButton._deprecationWarned = true;
    }
  }

  static styles = [
    resetStyles,
    tokenStyles,
    css`
      :host {
        display: inline-block;
      }

      :host([width='full']) {
        display: block;
        width: 100%;
      }
    `
  ];

  /**
   * Size of the skeleton button
   * Controls height and default width
   * @default 'md'
   */
  @property({ reflect: true })
  size: SkeletonButtonSize = 'md';

  /**
   * Width behavior of the skeleton button
   * - 'auto': Token-defined widths
   * - 'full': Full container width
   * - Custom string: Any valid CSS width
   * @default 'auto'
   */
  @property({ reflect: true })
  width: SkeletonButtonWidth = 'auto';

  /**
   * Animation effect applied to the skeleton
   * @default 'shimmer'
   */
  @property({ reflect: true })
  effect: SkeletonEffect = 'shimmer';

  /**
   * When true, renders the skeleton as a square (width = height).
   * Use this to match icon-only button variants.
   * @default false
   */
  @property({ type: Boolean, attribute: 'icon-only' })
  iconOnly: boolean = false;

  /**
   * Get the height based on size using token
   */
  private _getHeight(): string {
    return `var(--sando-skeleton-size-button-height-${this.size})`;
  }

  /**
   * Get the width based on width prop
   */
  private _getWidth(): string {
    if (this.iconOnly) {
      return this._getHeight(); // square: same as height
    }
    if (this.width === 'full') {
      return '100%';
    }
    if (this.width === 'auto') {
      const widthTokens: Record<SkeletonButtonSize, string> = {
        sm: 'var(--sando-space-16)', // 4rem
        md: 'var(--sando-space-24)', // 6rem
        lg: 'var(--sando-space-32)' // 8rem
      };
      return widthTokens[this.size];
    }
    return this.width;
  }

  render() {
    return html`
      <sando-skeleton
        shape="rounded"
        effect=${this.effect}
        width=${this._getWidth()}
        height=${this._getHeight()}
      ></sando-skeleton>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton-button': SandoSkeletonButton;
  }
}
