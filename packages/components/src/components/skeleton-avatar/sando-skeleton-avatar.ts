/**
 * @deprecated Will be removed in the next major. Compose `<sando-skeleton>` and
 * `<sando-skeleton-paragraph>` instead. See Storybook → Components → Skeleton → Patterns
 * for direct replacements. Tracked in #126.
 *
 * Sando Skeleton Avatar Component
 *
 * A circular skeleton placeholder for avatar loading states.
 * Wraps sando-skeleton with predefined circular shape and size tokens.
 *
 * @element sando-skeleton-avatar
 *
 * @cssprop --sando-skeleton-size-avatar-xs - Extra small avatar dimension (24px)
 * @cssprop --sando-skeleton-size-avatar-sm - Small avatar dimension (32px)
 * @cssprop --sando-skeleton-size-avatar-md - Medium avatar dimension (40px)
 * @cssprop --sando-skeleton-size-avatar-lg - Large avatar dimension (48px)
 * @cssprop --sando-skeleton-size-avatar-xl - Extra large avatar dimension (64px)
 *
 * @example Basic usage
 * <sando-skeleton-avatar></sando-skeleton-avatar>
 *
 * @example Size variants
 * <sando-skeleton-avatar size="xs"></sando-skeleton-avatar>
 * <sando-skeleton-avatar size="sm"></sando-skeleton-avatar>
 * <sando-skeleton-avatar size="md"></sando-skeleton-avatar>
 * <sando-skeleton-avatar size="lg"></sando-skeleton-avatar>
 * <sando-skeleton-avatar size="xl"></sando-skeleton-avatar>
 *
 * @example Shape variants
 * <sando-skeleton-avatar shape="circle"></sando-skeleton-avatar>
 * <sando-skeleton-avatar shape="rounded"></sando-skeleton-avatar>
 *
 * @example Effect variants
 * <sando-skeleton-avatar effect="shimmer"></sando-skeleton-avatar>
 * <sando-skeleton-avatar effect="pulse"></sando-skeleton-avatar>
 * <sando-skeleton-avatar effect="none"></sando-skeleton-avatar>
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import '../skeleton/sando-skeleton.js';
import type {
  SkeletonAvatarSize,
  SkeletonAvatarEffect,
  SkeletonAvatarShape
} from './sando-skeleton-avatar.types.js';

/**
 * Default values for skeleton avatar properties
 */
const DEFAULT_SIZE: SkeletonAvatarSize = 'md';
const DEFAULT_EFFECT: SkeletonAvatarEffect = 'shimmer';

@customElement('sando-skeleton-avatar')
export class SandoSkeletonAvatar extends FlavorableMixin(LitElement) {
  private static _deprecationWarned = false;

  connectedCallback() {
    super.connectedCallback();
    if (!SandoSkeletonAvatar._deprecationWarned) {
      console.warn(
        '[sando] <sando-skeleton-avatar> is deprecated and will be removed in the next major. Compose <sando-skeleton> and <sando-skeleton-paragraph> instead. See Storybook → Skeleton → Patterns.'
      );
      SandoSkeletonAvatar._deprecationWarned = true;
    }
  }

  /**
   * Size of the avatar skeleton
   * Maps to predefined token-based dimensions:
   * - xs: 24px
   * - sm: 32px
   * - md: 40px (default)
   * - lg: 48px
   * - xl: 64px
   * @default 'md'
   */
  @property({ reflect: true })
  size: SkeletonAvatarSize = DEFAULT_SIZE;

  /**
   * Animation effect applied to the skeleton
   * - shimmer: Moving gradient effect
   * - pulse: Opacity animation
   * - none: No animation (respects prefers-reduced-motion)
   * @default 'shimmer'
   */
  @property({ reflect: true })
  effect: SkeletonAvatarEffect = DEFAULT_EFFECT;

  /**
   * Shape of the avatar skeleton
   * - circle: Fully circular — matches sando-avatar shape="circle" (default)
   * - rounded: Rounded rectangle — matches sando-avatar shape="rounded"
   * @default 'circle'
   */
  @property({ reflect: true })
  shape: SkeletonAvatarShape = 'circle';

  /**
   * Component styles
   */
  static styles = [
    resetStyles,
    tokenStyles,
    css`
      :host {
        display: inline-block;
      }
    `
  ];

  /**
   * Get the dimension from Recipe tokens based on size
   */
  private _getSize(): string {
    return `var(--sando-skeleton-size-avatar-${this.size})`;
  }

  /**
   * Render the circular skeleton avatar
   */
  render() {
    const dimension = this._getSize();
    const primitiveShape = this.shape === 'rounded' ? 'rounded' : 'circular';

    return html`
      <sando-skeleton
        shape=${primitiveShape}
        effect=${this.effect}
        width=${dimension}
        height=${dimension}
        aria-hidden="true"
      ></sando-skeleton>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton-avatar': SandoSkeletonAvatar;
  }
}
