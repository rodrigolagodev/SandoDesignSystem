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
 *
 * @example Size variants (controls text line height)
 * <sando-skeleton-comment size="sm"></sando-skeleton-comment>
 * <sando-skeleton-comment size="md"></sando-skeleton-comment>
 * <sando-skeleton-comment size="lg"></sando-skeleton-comment>
 *
 * @example Width options
 * <sando-skeleton-comment width="full"></sando-skeleton-comment>
 * <sando-skeleton-comment width="400px"></sando-skeleton-comment>
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

import type {
  SkeletonCommentAvatarSize,
  SkeletonCommentSize,
  SkeletonCommentWidth
} from './sando-skeleton-comment.types.js';

/**
 * Default values for skeleton comment properties
 */
const DEFAULT_AVATAR_SIZE: SkeletonCommentAvatarSize = 'sm';
const DEFAULT_LINES = 2;
const DEFAULT_SHOW_TIMESTAMP = true;
const DEFAULT_SIZE: SkeletonCommentSize = 'md';
const DEFAULT_WIDTH: SkeletonCommentWidth = 'auto';

/**
 * Author name width as percentage of content area.
 * Scales proportionally with container width.
 */
const AUTHOR_WIDTH = '25%';

/**
 * Timestamp width as percentage of content area.
 * Scales proportionally with container width.
 */
const TIMESTAMP_WIDTH = '15%';

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
   * Size of the text skeletons (controls line height)
   * @default 'md'
   */
  @property({ reflect: true })
  size: SkeletonCommentSize = DEFAULT_SIZE;

  /**
   * Width of the comment container
   * - 'auto': Natural width based on container
   * - 'full': 100% of container width
   * - Custom string: Any valid CSS width
   * @default 'auto'
   */
  @property({ reflect: true })
  width: SkeletonCommentWidth = DEFAULT_WIDTH;

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

      :host([width='full']) {
        width: 100%;
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
        <sando-skeleton-text size="${this.size}" width="${AUTHOR_WIDTH}"></sando-skeleton-text>
        ${this.showTimestamp
          ? html`<sando-skeleton-text size="sm" width="${TIMESTAMP_WIDTH}"></sando-skeleton-text>`
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
      const width = i === this.lines - 1 ? '70%' : 'full';
      commentLines.push(
        html`<sando-skeleton-text size="${this.size}" width="${width}"></sando-skeleton-text>`
      );
    }
    return html`<sando-skeleton-stack gap="xs">${commentLines}</sando-skeleton-stack>`;
  }

  /**
   * Render the skeleton comment
   */
  render() {
    const customWidth = this.width !== 'auto' && this.width !== 'full' ? this.width : null;

    return html`
      <sando-skeleton-composer style=${customWidth ? `width: ${customWidth}` : nothing}>
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
