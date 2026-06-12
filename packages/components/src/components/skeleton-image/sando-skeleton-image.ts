/**
 * @deprecated Will be removed in the next major. Compose `<sando-skeleton>` and
 * `<sando-skeleton-paragraph>` instead. See Storybook → Components → Skeleton → Patterns
 * for direct replacements. Tracked in #126.
 *
 * Sando Skeleton Image Component
 *
 * A skeleton placeholder for media/image content with aspect ratio support.
 * Renders the skeleton visual directly (no inner sando-skeleton) so it can
 * own its own sizing via aspect-ratio or fixed height on the host.
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
import type { SkeletonImageRatio, SkeletonImageEffect } from './sando-skeleton-image.types.js';

/**
 * Default values for skeleton image properties
 */
const DEFAULT_RATIO: SkeletonImageRatio = '16/9';
const DEFAULT_WIDTH = '100%';
const DEFAULT_EFFECT: SkeletonImageEffect = 'shimmer';

/**
 * Maps ratio prop values to literal CSS aspect-ratio values.
 * These are fixed primitives — they don't vary by flavor.
 */
const RATIO_VALUE_MAP: Record<SkeletonImageRatio, string> = {
  '1/1': '1 / 1',
  '4/3': '4 / 3',
  '16/9': '16 / 9',
  '21/9': '21 / 9'
};

@customElement('sando-skeleton-image')
export class SandoSkeletonImage extends FlavorableMixin(LitElement) {
  private static _deprecationWarned = false;

  connectedCallback() {
    super.connectedCallback();
    if (!SandoSkeletonImage._deprecationWarned) {
      console.warn(
        '[sando] <sando-skeleton-image> is deprecated and will be removed in the next major. Compose <sando-skeleton> and <sando-skeleton-paragraph> instead. See Storybook → Skeleton → Patterns.'
      );
      SandoSkeletonImage._deprecationWarned = true;
    }
  }

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
         KEYFRAMES — same as sando-skeleton base
         ============================================ */

      @keyframes sando-shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(100%);
        }
      }

      @keyframes sando-pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.6;
        }
      }

      /* ============================================
         HOST — sizing is applied via _applySizing()
         ============================================ */

      :host {
        display: block;
      }

      /* ============================================
         SKELETON SURFACE
         ============================================ */

      .skeleton {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        background-color: var(--sando-skeleton-color-background);
        border-radius: var(--sando-skeleton-borderRadius-rounded);
      }

      /* ============================================
         SHIMMER
         ============================================ */

      .skeleton__shimmer {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          transparent,
          var(--sando-skeleton-color-shimmer),
          transparent
        );
        animation: sando-shimmer var(--sando-skeleton-animation-duration) infinite;
        animation-timing-function: var(--sando-skeleton-animation-easing);
      }

      /* ============================================
         PULSE
         ============================================ */

      :host([effect='pulse']) .skeleton {
        animation: sando-pulse var(--sando-skeleton-animation-duration) infinite;
        animation-timing-function: var(--sando-skeleton-animation-easing);
      }

      /* ============================================
         NO ANIMATION
         ============================================ */

      :host([effect='none']) .skeleton__shimmer {
        display: none;
      }

      :host([effect='none']) .skeleton {
        animation: none;
      }

      /* ============================================
         REDUCED MOTION
         ============================================ */

      @media (prefers-reduced-motion: reduce) {
        .skeleton__shimmer {
          display: none;
        }
        .skeleton {
          animation: none;
        }
      }
    `
  ];

  /**
   * Apply sizing to the host element.
   * Uses setProperty/removeProperty so CSS vars and non-standard
   * values are accepted by the browser.
   */
  private _applySizing() {
    this.style.width = this.width;
    if (this.height) {
      this.style.height = this.height;
      this.style.removeProperty('aspect-ratio');
    } else {
      this.style.removeProperty('height');
      this.style.setProperty('aspect-ratio', RATIO_VALUE_MAP[this.ratio]);
    }
  }

  override firstUpdated() {
    this._applySizing();
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    const sizingChanged =
      changedProperties.has('width') ||
      changedProperties.has('height') ||
      changedProperties.has('ratio');
    if (sizingChanged) this._applySizing();
  }

  render() {
    const showShimmer = this.effect === 'shimmer';
    return html`
      <div class="skeleton" part="skeleton" role="presentation" aria-hidden="true">
        ${showShimmer ? html`<div class="skeleton__shimmer" part="shimmer"></div>` : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton-image': SandoSkeletonImage;
  }
}
