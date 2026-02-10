/**
 * Sando Skeleton Card Component
 *
 * A preset skeleton for card layouts that composes skeleton primitives
 * and layout helpers. Provides a ready-to-use card loading placeholder
 * with configurable sections.
 *
 * @element sando-skeleton-card
 *
 * @example Basic usage (header + paragraph)
 * <sando-skeleton-card></sando-skeleton-card>
 *
 * @example With image
 * <sando-skeleton-card show-image></sando-skeleton-card>
 *
 * @example With actions
 * <sando-skeleton-card show-actions></sando-skeleton-card>
 *
 * @example Full card (all sections)
 * <sando-skeleton-card show-image show-actions></sando-skeleton-card>
 *
 * @example Minimal (no avatar)
 * <sando-skeleton-card show-avatar="false"></sando-skeleton-card>
 *
 * @example Custom lines and image ratio
 * <sando-skeleton-card lines="5" image-ratio="4/3" show-image></sando-skeleton-card>
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
import '../skeleton-image/sando-skeleton-image.js';
import '../skeleton-paragraph/sando-skeleton-paragraph.js';
import '../skeleton-button/sando-skeleton-button.js';

import type { SkeletonCardImageRatio } from './sando-skeleton-card.types.js';

/**
 * Default values for skeleton card properties
 */
const DEFAULT_SHOW_AVATAR = true;
const DEFAULT_SHOW_IMAGE = false;
const DEFAULT_SHOW_ACTIONS = false;
const DEFAULT_LINES = 3;
const DEFAULT_IMAGE_RATIO: SkeletonCardImageRatio = '16/9';

@customElement('sando-skeleton-card')
export class SandoSkeletonCard extends FlavorableMixin(LitElement) {
  /**
   * Show avatar in header section
   * @default true
   */
  @property({ type: Boolean, attribute: 'show-avatar' })
  showAvatar: boolean = DEFAULT_SHOW_AVATAR;

  /**
   * Show image area
   * @default false
   */
  @property({ type: Boolean, attribute: 'show-image' })
  showImage: boolean = DEFAULT_SHOW_IMAGE;

  /**
   * Show action buttons at the bottom
   * @default false
   */
  @property({ type: Boolean, attribute: 'show-actions' })
  showActions: boolean = DEFAULT_SHOW_ACTIONS;

  /**
   * Number of paragraph lines
   * @default 3
   */
  @property({ type: Number })
  lines: number = DEFAULT_LINES;

  /**
   * Image aspect ratio when showImage is true
   * @default '16/9'
   */
  @property({ attribute: 'image-ratio' })
  imageRatio: SkeletonCardImageRatio = DEFAULT_IMAGE_RATIO;

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
    `
  ];

  /**
   * Render header section with optional avatar and text lines
   */
  private _renderHeader() {
    return html`
      <sando-skeleton-row gap="md" align="center">
        ${this.showAvatar
          ? html`<sando-skeleton-avatar size="md"></sando-skeleton-avatar>`
          : nothing}
        <sando-skeleton-stack gap="xs" style="flex: 1;">
          <sando-skeleton-text width="60%"></sando-skeleton-text>
          <sando-skeleton-text width="40%" size="sm"></sando-skeleton-text>
        </sando-skeleton-stack>
      </sando-skeleton-row>
    `;
  }

  /**
   * Render optional image section
   */
  private _renderImage() {
    if (!this.showImage) return nothing;

    return html` <sando-skeleton-image ratio=${this.imageRatio}></sando-skeleton-image> `;
  }

  /**
   * Render paragraph section
   */
  private _renderParagraph() {
    return html`
      <sando-skeleton-paragraph
        lines=${this.lines}
        last-line-width="70%"
      ></sando-skeleton-paragraph>
    `;
  }

  /**
   * Render optional actions section
   */
  private _renderActions() {
    if (!this.showActions) return nothing;

    return html`
      <sando-skeleton-row gap="sm">
        <sando-skeleton-button size="sm"></sando-skeleton-button>
        <sando-skeleton-button size="sm"></sando-skeleton-button>
      </sando-skeleton-row>
    `;
  }

  /**
   * Render the skeleton card
   */
  render() {
    return html`
      <sando-skeleton-composer>
        <sando-skeleton-stack gap="md">
          ${this._renderHeader()} ${this._renderImage()} ${this._renderParagraph()}
          ${this._renderActions()}
        </sando-skeleton-stack>
      </sando-skeleton-composer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton-card': SandoSkeletonCard;
  }
}
