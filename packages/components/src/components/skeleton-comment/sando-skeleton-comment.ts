/**
 * Sando Skeleton Comment Component
 *
 * A preset skeleton for comment or review layouts with avatar on the side,
 * author name, optional timestamp, and comment text lines.
 *
 * @element sando-skeleton-comment
 *
 * @example Basic usage (avatar + author + 2 lines)
 * <sando-skeleton-comment></sando-skeleton-comment>
 *
 * @example Without timestamp
 * <sando-skeleton-comment show-timestamp="false"></sando-skeleton-comment>
 *
 * @example Custom line count
 * <sando-skeleton-comment lines="4"></sando-skeleton-comment>
 *
 * @example Small avatar for compact comments
 * <sando-skeleton-comment avatar-size="xs"></sando-skeleton-comment>
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';

// Import skeleton components
import '../skeleton-composer/sando-skeleton-composer.js';
import '../skeleton-stack/sando-skeleton-stack.js';
import '../skeleton-row/sando-skeleton-row.js';
import '../skeleton-avatar/sando-skeleton-avatar.js';
import '../skeleton/sando-skeleton-text.js';

import type { SkeletonCommentAvatarSize } from './sando-skeleton-comment.types.js';

/**
 * Default values for skeleton comment properties
 */
const DEFAULT_AVATAR_SIZE: SkeletonCommentAvatarSize = 'sm';
const DEFAULT_LINES = 2;
const DEFAULT_SHOW_TIMESTAMP = true;

@customElement('sando-skeleton-comment')
export class SandoSkeletonComment extends FlavorableMixin(LitElement) {
  /**
   * Size of the avatar skeleton
   * @default 'sm'
   */
  @property({ attribute: 'avatar-size' })
  avatarSize: SkeletonCommentAvatarSize = DEFAULT_AVATAR_SIZE;

  /**
   * Number of comment text lines to display
   * @default 2
   */
  @property({ type: Number })
  lines: number = DEFAULT_LINES;

  /**
   * Show timestamp next to author name
   * @default true
   */
  @property({ type: Boolean, attribute: 'show-timestamp' })
  showTimestamp: boolean = DEFAULT_SHOW_TIMESTAMP;

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

      .comment-content {
        flex: 1;
        min-width: 0;
      }
    `
  ];

  /**
   * Render header row (author + optional timestamp)
   */
  private _renderHeader() {
    return html`
      <sando-skeleton-row gap="sm" align="center">
        <sando-skeleton-text width="100px"></sando-skeleton-text>
        ${this.showTimestamp
          ? html`<sando-skeleton-text size="sm" width="60px"></sando-skeleton-text>`
          : nothing}
      </sando-skeleton-row>
    `;
  }

  /**
   * Render comment text lines
   */
  private _renderCommentLines() {
    const commentLines = [];
    for (let i = 0; i < this.lines; i++) {
      // Last line is shorter for natural look
      const width = i === this.lines - 1 ? '70%' : '100%';
      commentLines.push(html` <sando-skeleton-text width=${width}></sando-skeleton-text> `);
    }
    return html` <sando-skeleton-stack gap="xs"> ${commentLines} </sando-skeleton-stack> `;
  }

  /**
   * Render the skeleton comment
   */
  render() {
    return html`
      <sando-skeleton-composer>
        <sando-skeleton-row gap="md" align="start">
          <sando-skeleton-avatar size=${this.avatarSize}></sando-skeleton-avatar>
          <div class="comment-content">
            <sando-skeleton-stack gap="sm">
              ${this._renderHeader()} ${this._renderCommentLines()}
            </sando-skeleton-stack>
          </div>
        </sando-skeleton-row>
      </sando-skeleton-composer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton-comment': SandoSkeletonComment;
  }
}
