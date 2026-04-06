/**
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
   * Get the height based on size using token
   */
  private _getHeight(): string {
    return `var(--sando-skeleton-size-button-height-${this.size})`;
  }

  /**
   * Get the width based on width prop
   */
  private _getWidth(): string {
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
