/**
 * Sando Skeleton Text Component
 *
 * A semantic skeleton for single lines of text. Wraps the base skeleton
 * component with text-specific sizing presets.
 *
 * @element sando-skeleton-text
 *
 * @example Basic usage
 * <sando-skeleton-text></sando-skeleton-text>
 *
 * @example Size variants
 * <sando-skeleton-text size="sm"></sando-skeleton-text>
 * <sando-skeleton-text size="md"></sando-skeleton-text>
 * <sando-skeleton-text size="lg"></sando-skeleton-text>
 *
 * @example Custom width
 * <sando-skeleton-text width="80%"></sando-skeleton-text>
 * <sando-skeleton-text width="200px"></sando-skeleton-text>
 *
 * @example Different effects
 * <sando-skeleton-text effect="shimmer"></sando-skeleton-text>
 * <sando-skeleton-text effect="pulse"></sando-skeleton-text>
 * <sando-skeleton-text effect="none"></sando-skeleton-text>
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './sando-skeleton.js';
import type { SkeletonTextSize, SkeletonEffect } from './sando-skeleton-text.types.js';

/**
 * Height mapping for each size variant
 */
const SIZE_HEIGHT_MAP: Record<SkeletonTextSize, string> = {
  sm: '0.875em',
  md: '1em',
  lg: '1.25em'
};

/**
 * Default values
 */
const DEFAULT_SIZE: SkeletonTextSize = 'md';
const DEFAULT_WIDTH = '100%';
const DEFAULT_EFFECT: SkeletonEffect = 'shimmer';

@customElement('sando-skeleton-text')
export class SandoSkeletonText extends LitElement {
  /**
   * Size of the text skeleton (maps to height)
   * - sm: 0.875em
   * - md: 1em
   * - lg: 1.25em
   * @default 'md'
   */
  @property({ reflect: true })
  size: SkeletonTextSize = DEFAULT_SIZE;

  /**
   * CSS width value
   * @default '100%'
   */
  @property({ type: String })
  width: string = DEFAULT_WIDTH;

  /**
   * Animation effect applied to the skeleton
   * - shimmer: Moving gradient effect
   * - pulse: Opacity animation
   * - none: No animation (respects prefers-reduced-motion)
   * @default 'shimmer'
   */
  @property({ reflect: true })
  effect: SkeletonEffect = DEFAULT_EFFECT;

  /**
   * Component styles - minimal since we delegate to base skeleton
   */
  static styles = css`
    :host {
      display: block;
    }
  `;

  /**
   * Get the height for the current size
   */
  private _getHeight(): string {
    return SIZE_HEIGHT_MAP[this.size] ?? SIZE_HEIGHT_MAP.md;
  }

  /**
   * Render the skeleton text using the base skeleton component
   */
  render() {
    return html`
      <sando-skeleton
        shape="text"
        effect=${this.effect}
        width=${this.width}
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
