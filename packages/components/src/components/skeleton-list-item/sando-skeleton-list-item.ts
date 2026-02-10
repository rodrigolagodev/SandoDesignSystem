/**
 * Sando Skeleton List Item Component
 *
 * A preset skeleton for list item layouts. Provides a common pattern
 * for loading states in list views with optional avatar, text lines,
 * and action button placeholders.
 *
 * @element sando-skeleton-list-item
 *
 * @example Basic usage (2 lines, avatar, no action)
 * <sando-skeleton-list-item></sando-skeleton-list-item>
 *
 * @example With action button
 * <sando-skeleton-list-item show-action></sando-skeleton-list-item>
 *
 * @example Single line
 * <sando-skeleton-list-item lines="1"></sando-skeleton-list-item>
 *
 * @example Three lines
 * <sando-skeleton-list-item lines="3"></sando-skeleton-list-item>
 *
 * @example No avatar
 * <sando-skeleton-list-item show-avatar="false"></sando-skeleton-list-item>
 *
 * @example Different avatar sizes
 * <sando-skeleton-list-item avatar-size="sm"></sando-skeleton-list-item>
 * <sando-skeleton-list-item avatar-size="lg"></sando-skeleton-list-item>
 *
 * @example List of items
 * <sando-skeleton-composer>
 *   <sando-skeleton-list-item></sando-skeleton-list-item>
 *   <sando-skeleton-list-item></sando-skeleton-list-item>
 *   <sando-skeleton-list-item></sando-skeleton-list-item>
 * </sando-skeleton-composer>
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';

import '../skeleton-composer/sando-skeleton-composer.js';
import '../skeleton-row/sando-skeleton-row.js';
import '../skeleton-stack/sando-skeleton-stack.js';
import '../skeleton-avatar/sando-skeleton-avatar.js';
import '../skeleton/sando-skeleton-text.js';
import '../skeleton-button/sando-skeleton-button.js';

import type { SkeletonListItemAvatarSize } from './sando-skeleton-list-item.types.js';

/**
 * Default values for skeleton list item properties
 */
const DEFAULT_SHOW_AVATAR = true;
const DEFAULT_SHOW_ACTION = false;
const DEFAULT_LINES = 2;
const DEFAULT_AVATAR_SIZE: SkeletonListItemAvatarSize = 'md';

@customElement('sando-skeleton-list-item')
export class SandoSkeletonListItem extends FlavorableMixin(LitElement) {
  /**
   * Show avatar/icon placeholder on the left
   * @default true
   */
  @property({ type: Boolean, attribute: 'show-avatar' })
  showAvatar: boolean = DEFAULT_SHOW_AVATAR;

  /**
   * Show action button placeholder on the right
   * @default false
   */
  @property({ type: Boolean, attribute: 'show-action' })
  showAction: boolean = DEFAULT_SHOW_ACTION;

  /**
   * Number of text lines to display (clamped to 1-3)
   * @default 2
   */
  @property({ type: Number })
  lines: number = DEFAULT_LINES;

  /**
   * Size of the avatar placeholder
   * @default 'md'
   */
  @property({ attribute: 'avatar-size' })
  avatarSize: SkeletonListItemAvatarSize = DEFAULT_AVATAR_SIZE;

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

      .content {
        flex: 1;
        min-width: 0;
      }
    `
  ];

  /**
   * Render the skeleton list item layout
   */
  render() {
    // Clamp lines to 1-3 range
    const lineCount = Math.min(Math.max(1, this.lines), 3);

    return html`
      <sando-skeleton-composer>
        <sando-skeleton-row gap="md" align="center">
          ${this.showAvatar
            ? html`<sando-skeleton-avatar size=${this.avatarSize}></sando-skeleton-avatar>`
            : nothing}

          <sando-skeleton-stack gap="xs" class="content">
            <sando-skeleton-text width="70%"></sando-skeleton-text>
            ${lineCount >= 2
              ? html`<sando-skeleton-text width="50%" size="sm"></sando-skeleton-text>`
              : nothing}
            ${lineCount >= 3
              ? html`<sando-skeleton-text width="40%" size="sm"></sando-skeleton-text>`
              : nothing}
          </sando-skeleton-stack>

          ${this.showAction
            ? html`<sando-skeleton-button size="sm"></sando-skeleton-button>`
            : nothing}
        </sando-skeleton-row>
      </sando-skeleton-composer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton-list-item': SandoSkeletonListItem;
  }
}
