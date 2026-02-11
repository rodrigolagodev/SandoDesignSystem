/**
 * Sando Skeleton Component
 *
 * An accessible loading placeholder with configurable shape and animation effect.
 * Used for content loading states to reduce perceived wait time.
 *
 * @element sando-skeleton
 *
 * @cssprop --sando-skeleton-color-background - Background color of skeleton
 * @cssprop --sando-skeleton-color-shimmer - Shimmer highlight color
 * @cssprop --sando-skeleton-animation-duration - Duration of animation cycle
 * @cssprop --sando-skeleton-animation-easing - Easing for animation
 * @cssprop --sando-skeleton-borderRadius-text - Border radius for text shape
 * @cssprop --sando-skeleton-borderRadius-circular - Border radius for circular shape
 * @cssprop --sando-skeleton-borderRadius-rectangular - Border radius for rectangular shape
 * @cssprop --sando-skeleton-borderRadius-rounded - Border radius for rounded shape
 *
 * @example Basic usage
 * <sando-skeleton></sando-skeleton>
 *
 * @example Shape variants
 * <sando-skeleton shape="text"></sando-skeleton>
 * <sando-skeleton shape="circular" width="40px" height="40px"></sando-skeleton>
 * <sando-skeleton shape="rectangular" width="200px" height="150px"></sando-skeleton>
 * <sando-skeleton shape="rounded" width="100%" height="80px"></sando-skeleton>
 *
 * @example Effect variants
 * <sando-skeleton effect="shimmer"></sando-skeleton>
 * <sando-skeleton effect="pulse"></sando-skeleton>
 * <sando-skeleton effect="none"></sando-skeleton>
 *
 * @example Custom dimensions
 * <sando-skeleton width="200px" height="24px"></sando-skeleton>
 * <sando-skeleton width="50%" height="1.5em"></sando-skeleton>
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, shapeStyles } from './styles/index.js';
import type { SkeletonShape, SkeletonEffect } from './sando-skeleton.types.js';

/**
 * Default values for skeleton properties
 */
const DEFAULT_SHAPE: SkeletonShape = 'text';
const DEFAULT_EFFECT: SkeletonEffect = 'shimmer';
const DEFAULT_WIDTH = '100%';
const DEFAULT_HEIGHT = '1em';

@customElement('sando-skeleton')
export class SandoSkeleton extends FlavorableMixin(LitElement) {
  /**
   * Shape of the skeleton
   * - text: Small border-radius, for text placeholders
   * - circular: 50% border-radius, for avatars
   * - rectangular: No border-radius, for sharp containers
   * - rounded: Medium border-radius, for cards
   * @default 'text'
   */
  @property({ reflect: true })
  shape: SkeletonShape = DEFAULT_SHAPE;

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
   * CSS width value
   * @default '100%'
   */
  @property({ type: String })
  width: string = DEFAULT_WIDTH;

  /**
   * CSS height value
   * @default '1em'
   */
  @property({ type: String })
  height: string = DEFAULT_HEIGHT;

  /**
   * Component styles
   */
  static styles = [resetStyles, tokenStyles, baseStyles, shapeStyles];

  /**
   * Get computed styles for skeleton dimensions
   */
  private get _skeletonStyles() {
    return {
      '--skeleton-width': this.width,
      '--skeleton-height': this.height
    };
  }

  /**
   * Render the skeleton placeholder
   */
  render() {
    const showShimmer = this.effect === 'shimmer';

    return html`
      <div
        class="skeleton"
        style=${styleMap(this._skeletonStyles)}
        part="skeleton"
        role="presentation"
        aria-hidden="true"
      >
        ${showShimmer ? html`<div class="skeleton__shimmer" part="shimmer"></div>` : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton': SandoSkeleton;
  }
}
