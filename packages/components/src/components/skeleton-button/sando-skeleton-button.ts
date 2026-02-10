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
 * @cssprop --sando-skeleton-size-button-width-sm - Default width for small size (64px)
 * @cssprop --sando-skeleton-size-button-width-md - Default width for medium size (96px)
 * @cssprop --sando-skeleton-size-button-width-lg - Default width for large size (128px)
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
import '../skeleton/sando-skeleton.js';
import type { SkeletonEffect } from '../skeleton/sando-skeleton.types.js';
import type { SkeletonButtonSize, SkeletonButtonWidth } from './sando-skeleton-button.types.js';

@customElement('sando-skeleton-button')
export class SandoSkeletonButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    :host([width='full']) {
      display: block;
      width: 100%;
    }
  `;

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
      return `var(--sando-skeleton-size-button-width-${this.size})`;
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
