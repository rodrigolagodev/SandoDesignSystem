/**
 * Sando Skeleton Image Component
 *
 * A skeleton placeholder for media/image content with aspect ratio support.
 * Wraps sando-skeleton with configurable aspect ratio or fixed height.
 *
 * @element sando-skeleton-image
 *
 * @cssprop --sando-skeleton-color-background - Background color of skeleton
 * @cssprop --sando-skeleton-color-shimmer - Shimmer highlight color
 * @cssprop --sando-skeleton-animation-duration - Duration of animation cycle
 * @cssprop --sando-skeleton-animation-easing - Easing for animation
 *
 * @example Basic usage
 * <sando-skeleton-image></sando-skeleton-image>
 *
 * @example Aspect ratio variants
 * <sando-skeleton-image ratio="1/1"></sando-skeleton-image>
 * <sando-skeleton-image ratio="4/3"></sando-skeleton-image>
 * <sando-skeleton-image ratio="16/9"></sando-skeleton-image>
 * <sando-skeleton-image ratio="21/9"></sando-skeleton-image>
 *
 * @example Fixed height (overrides ratio)
 * <sando-skeleton-image height="200px"></sando-skeleton-image>
 * <sando-skeleton-image height="10rem"></sando-skeleton-image>
 *
 * @example Custom width
 * <sando-skeleton-image width="300px"></sando-skeleton-image>
 * <sando-skeleton-image width="50%"></sando-skeleton-image>
 *
 * @example Effect variants
 * <sando-skeleton-image effect="shimmer"></sando-skeleton-image>
 * <sando-skeleton-image effect="pulse"></sando-skeleton-image>
 * <sando-skeleton-image effect="none"></sando-skeleton-image>
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import '../skeleton/sando-skeleton.js';
import type { SkeletonImageRatio, SkeletonImageEffect } from './sando-skeleton-image.types.js';

/**
 * Default values for skeleton image properties
 */
const DEFAULT_RATIO: SkeletonImageRatio = '16/9';
const DEFAULT_WIDTH = '100%';
const DEFAULT_EFFECT: SkeletonImageEffect = 'shimmer';

@customElement('sando-skeleton-image')
export class SandoSkeletonImage extends FlavorableMixin(LitElement) {
  /**
   * Aspect ratio of the skeleton image
   * - 1/1: Square (thumbnails)
   * - 4/3: Standard photo
   * - 16/9: Widescreen (video thumbnails)
   * - 21/9: Ultra-wide cinematic
   * @default '16/9'
   */
  @property({ reflect: true })
  ratio: SkeletonImageRatio = DEFAULT_RATIO;

  /**
   * Fixed height (CSS value)
   * When provided, overrides the aspect ratio
   * @default undefined
   */
  @property({ type: String })
  height?: string;

  /**
   * Width of the skeleton (CSS value)
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
  effect: SkeletonImageEffect = DEFAULT_EFFECT;

  /**
   * Component styles
   */
  static styles = [
    resetStyles,
    tokenStyles,
    css`
      /* ============================================
         HOST
         ============================================ */

      :host {
        display: block;
      }

      /* ============================================
         IMAGE SKELETON CONTAINER
         ============================================ */

      .image-skeleton {
        width: 100%;
      }

      /* ============================================
         ASPECT RATIO VARIANTS
         Uses CSS aspect-ratio for modern browser support
         ============================================ */

      :host([ratio='1/1']) .image-skeleton {
        aspect-ratio: 1 / 1;
      }

      :host([ratio='4/3']) .image-skeleton {
        aspect-ratio: 4 / 3;
      }

      :host([ratio='16/9']) .image-skeleton {
        aspect-ratio: 16 / 9;
      }

      :host([ratio='21/9']) .image-skeleton {
        aspect-ratio: 21 / 9;
      }
    `
  ];

  /**
   * Render the skeleton image placeholder
   */
  render() {
    // If height is provided, use it directly; otherwise use aspect-ratio via CSS
    const useFixedHeight = !!this.height;

    return html`
      <sando-skeleton
        class="image-skeleton"
        shape="rounded"
        effect=${this.effect}
        width=${this.width}
        height=${useFixedHeight ? this.height : '100%'}
        style=${useFixedHeight ? '' : `aspect-ratio: ${this.ratio.replace('/', ' / ')}`}
      ></sando-skeleton>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton-image': SandoSkeletonImage;
  }
}
