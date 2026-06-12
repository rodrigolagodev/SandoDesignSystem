/**
 * @deprecated Will be removed in the next major. Compose `<sando-skeleton>` and
 * `<sando-skeleton-paragraph>` instead. See Storybook → Components → Skeleton → Patterns
 * for direct replacements. Tracked in #126.
 *
 * Sando Skeleton Profile Component
 *
 * A preset skeleton for user profile card layouts with centered avatar,
 * name, and optional bio lines. Perfect for profile cards, user previews,
 * and account sections.
 *
 * @element sando-skeleton-profile
 *
 * @example Basic usage (avatar + name + bio)
 * <sando-skeleton-profile></sando-skeleton-profile>
 *
 * @example Without bio
 * <sando-skeleton-profile show-bio="false"></sando-skeleton-profile>
 *
 * @example Custom avatar size
 * <sando-skeleton-profile avatar-size="lg"></sando-skeleton-profile>
 *
 * @example Custom bio lines
 * <sando-skeleton-profile bio-lines="3"></sando-skeleton-profile>
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';

// Import skeleton components
import '../skeleton-composer/sando-skeleton-composer.js';
import '../skeleton-stack/sando-skeleton-stack.js';
import '../skeleton-avatar/sando-skeleton-avatar.js';
import '../skeleton/sando-skeleton-text.js';

import type { SkeletonProfileAvatarSize } from './sando-skeleton-profile.types.js';
import type { SkeletonEffect } from '../skeleton/sando-skeleton.types.js';

/**
 * Default values for skeleton profile properties
 */
const DEFAULT_AVATAR_SIZE: SkeletonProfileAvatarSize = 'xl';
const DEFAULT_SHOW_BIO = true;
const DEFAULT_BIO_LINES = 2;

@customElement('sando-skeleton-profile')
export class SandoSkeletonProfile extends FlavorableMixin(LitElement) {
  private static _deprecationWarned = false;

  connectedCallback() {
    super.connectedCallback();
    if (!SandoSkeletonProfile._deprecationWarned) {
      console.warn(
        '[sando] <sando-skeleton-profile> is deprecated and will be removed in the next major. Compose <sando-skeleton> and <sando-skeleton-paragraph> instead. See Storybook → Skeleton → Patterns.'
      );
      SandoSkeletonProfile._deprecationWarned = true;
    }
  }

  /**
   * Size of the avatar skeleton
   * @default 'xl'
   */
  @property({ attribute: 'avatar-size' })
  avatarSize: SkeletonProfileAvatarSize = DEFAULT_AVATAR_SIZE;

  /**
   * Show bio lines below name
   * @default true
   */
  @property({ type: Boolean, attribute: 'show-bio' })
  showBio: boolean = DEFAULT_SHOW_BIO;

  /**
   * Number of bio lines to display
   * @default 2
   */
  @property({ type: Number, attribute: 'bio-lines' })
  bioLines: number = DEFAULT_BIO_LINES;

  /**
   * Animation effect applied to all inner skeleton elements
   * @default 'shimmer'
   */
  @property({ reflect: true })
  effect: SkeletonEffect = 'shimmer';

  /**
   * Component styles
   */
  static styles = [
    resetStyles,
    tokenStyles,
    css`
      :host {
        display: block;
      }

      .profile-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .bio-container {
        width: 100%;
        max-width: var(--sando-skeleton-profile-max-width, 280px);
      }
    `
  ];

  /**
   * Render avatar section
   */
  private _renderAvatar() {
    return html`
      <sando-skeleton-avatar size=${this.avatarSize} effect=${this.effect}></sando-skeleton-avatar>
    `;
  }

  /**
   * Render name section (centered)
   */
  private _renderName() {
    return html` <sando-skeleton-text width="60%" effect=${this.effect}></sando-skeleton-text> `;
  }

  /**
   * Render optional bio lines (centered)
   */
  private _renderBio() {
    if (!this.showBio) return nothing;

    const bioLinesHtml = [];
    for (let i = 0; i < this.bioLines; i++) {
      // Vary width for natural look
      const width = i === this.bioLines - 1 ? '70%' : '90%';
      bioLinesHtml.push(html`
        <sando-skeleton-text size="sm" width=${width} effect=${this.effect}></sando-skeleton-text>
      `);
    }

    return html`
      <div class="bio-container">
        <sando-skeleton-stack gap="xs"> ${bioLinesHtml} </sando-skeleton-stack>
      </div>
    `;
  }

  /**
   * Render the skeleton profile
   */
  render() {
    return html`
      <sando-skeleton-composer>
        <div class="profile-container">
          <sando-skeleton-stack gap="md">
            ${this._renderAvatar()} ${this._renderName()} ${this._renderBio()}
          </sando-skeleton-stack>
        </div>
      </sando-skeleton-composer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton-profile': SandoSkeletonProfile;
  }
}
