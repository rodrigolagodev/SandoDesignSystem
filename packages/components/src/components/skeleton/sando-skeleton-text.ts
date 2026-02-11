/**
 * Sando Skeleton Text Component
 *
 * A semantic skeleton for single lines of text. Wraps the base skeleton
 * component with text-specific sizing presets using design tokens.
 *
 * Features:
 * - Token-based heights via --sando-skeleton-size-text-height-{size}
 * - FlavorableMixin for theming support
 * - Width as 'auto' | 'full' | custom CSS value
 *
 * @element sando-skeleton-text
 *
 * @example Basic usage
 * <sando-skeleton-text></sando-skeleton-text>
 *
 * @example Size variants (uses tokens)
 * <sando-skeleton-text size="sm"></sando-skeleton-text>
 * <sando-skeleton-text size="md"></sando-skeleton-text>
 * <sando-skeleton-text size="lg"></sando-skeleton-text>
 *
 * @example Width options
 * <sando-skeleton-text width="auto"></sando-skeleton-text>
 * <sando-skeleton-text width="full"></sando-skeleton-text>
 * <sando-skeleton-text width="80%"></sando-skeleton-text>
 * <sando-skeleton-text width="200px"></sando-skeleton-text>
 *
 * @example Different effects
 * <sando-skeleton-text effect="shimmer"></sando-skeleton-text>
 * <sando-skeleton-text effect="pulse"></sando-skeleton-text>
 * <sando-skeleton-text effect="none"></sando-skeleton-text>
 *
 * @example With flavor (theming)
 * <sando-skeleton-text flavor="strawberry"></sando-skeleton-text>
 */

import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import './sando-skeleton.js';
import type {
  SkeletonTextSize,
  SkeletonTextWidth,
  SkeletonEffect
} from './sando-skeleton-text.types.js';

/**
 * @element sando-skeleton-text
 *
 * @prop {SkeletonTextSize} size - Size variant (sm, md, lg). Uses tokens for height.
 * @prop {SkeletonTextWidth} width - Width: 'auto' | 'full' | custom CSS value.
 * @prop {SkeletonEffect} effect - Animation effect (shimmer, pulse, none).
 *
 * @cssprop --sando-skeleton-size-text-height-sm - Height for size="sm"
 * @cssprop --sando-skeleton-size-text-height-md - Height for size="md"
 * @cssprop --sando-skeleton-size-text-height-lg - Height for size="lg"
 */
@customElement('sando-skeleton-text')
export class SandoSkeletonText extends FlavorableMixin(LitElement) {
  static styles = [
    resetStyles,
    tokenStyles,
    css`
      :host {
        display: inline-block;
      }

      :host([width='full']) {
        display: block;
      }
    `
  ];

  /**
   * Size of the text skeleton (maps to height via tokens)
   * Uses design tokens: --sando-skeleton-size-text-height-{size}
   * @default 'md'
   */
  @property({ reflect: true })
  size: SkeletonTextSize = 'md';

  /**
   * Width of the skeleton
   * - 'auto': Fills container width (100%), inline-block display
   * - 'full': Full width, block display
   * - string: Custom CSS value (e.g., '80%', '200px')
   * @default 'auto'
   */
  @property({ reflect: true })
  width: SkeletonTextWidth = 'auto';

  /**
   * Animation effect applied to the skeleton
   * - shimmer: Moving gradient effect
   * - pulse: Opacity animation
   * - none: No animation (respects prefers-reduced-motion)
   * @default 'shimmer'
   */
  @property({ reflect: true })
  effect: SkeletonEffect = 'shimmer';

  /**
   * Get the height using design tokens based on size
   */
  private _getHeight(): string {
    return `var(--sando-skeleton-size-text-height-${this.size})`;
  }

  /**
   * Updates the host element's width based on the width property.
   * - 'auto': 100% width, inline-block display (fills container, flows inline)
   * - 'full': 100% width, block display (fills container, block level)
   * - custom: specific width, inline-block display
   */
  private _updateHostWidth(): void {
    if (this.width === 'auto' || this.width === 'full') {
      this.style.width = '100%';
    } else {
      this.style.width = this.width;
    }
  }

  /**
   * Called when the element is added to the DOM.
   * Sets the initial host width.
   */
  override connectedCallback(): void {
    super.connectedCallback();
    this._updateHostWidth();
  }

  /**
   * Called after properties change and the component updates.
   * Updates host width when the width property changes.
   */
  override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('width')) {
      this._updateHostWidth();
    }
  }

  /**
   * Render the skeleton text using the base skeleton component.
   * The inner skeleton always fills its host container (100%).
   * Actual width is controlled via inline style on :host.
   */
  render() {
    return html`
      <sando-skeleton
        shape="text"
        effect=${this.effect}
        width="100%"
        height=${this._getHeight()}
      ></sando-skeleton>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton-text': SandoSkeletonText;
  }
}
