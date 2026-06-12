/**
 * @deprecated Will be removed in the next major. Compose `<sando-skeleton>` and
 * `<sando-skeleton-paragraph>` instead. See Storybook → Components → Skeleton → Patterns
 * for direct replacements. Tracked in #126.
 *
 * Sando Skeleton Media Card Component
 *
 * A preset skeleton for media content cards (video, podcast, etc.) with
 * large image/thumbnail, title, description, and action buttons.
 *
 * @element sando-skeleton-media-card
 *
 * @example Basic usage (image + title + description + actions)
 * <sando-skeleton-media-card></sando-skeleton-media-card>
 *
 * @example Without actions
 * <sando-skeleton-media-card show-actions="false"></sando-skeleton-media-card>
 *
 * @example Without description
 * <sando-skeleton-media-card show-description="false"></sando-skeleton-media-card>
 *
 * @example Square image for podcasts/albums
 * <sando-skeleton-media-card image-ratio="1/1"></sando-skeleton-media-card>
 *
 * @example Custom description lines
 * <sando-skeleton-media-card description-lines="3"></sando-skeleton-media-card>
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
import '../skeleton-image/sando-skeleton-image.js';
import '../skeleton/sando-skeleton-text.js';
import '../skeleton-button/sando-skeleton-button.js';

import type {
  SkeletonMediaCardImageRatio,
  SkeletonMediaCardWidth
} from './sando-skeleton-media-card.types.js';
import type { SkeletonEffect } from '../skeleton/sando-skeleton.types.js';

/**
 * Default values for skeleton media card properties
 */
const DEFAULT_IMAGE_RATIO: SkeletonMediaCardImageRatio = '16/9';
const DEFAULT_SHOW_DESCRIPTION = true;
const DEFAULT_DESCRIPTION_LINES = 2;
const DEFAULT_SHOW_ACTIONS = true;

@customElement('sando-skeleton-media-card')
export class SandoSkeletonMediaCard extends FlavorableMixin(LitElement) {
  private static _deprecationWarned = false;

  connectedCallback() {
    super.connectedCallback();
    if (!SandoSkeletonMediaCard._deprecationWarned) {
      console.warn(
        '[sando] <sando-skeleton-media-card> is deprecated and will be removed in the next major. Compose <sando-skeleton> and <sando-skeleton-paragraph> instead. See Storybook → Skeleton → Patterns.'
      );
      SandoSkeletonMediaCard._deprecationWarned = true;
    }
  }

  /**
   * Aspect ratio of the image/thumbnail skeleton
   * @default '16/9'
   */
  @property({ attribute: 'image-ratio' })
  imageRatio: SkeletonMediaCardImageRatio = DEFAULT_IMAGE_RATIO;

  /**
   * Show description lines below title
   * @default true
   */
  @property({ type: Boolean, attribute: 'show-description' })
  showDescription: boolean = DEFAULT_SHOW_DESCRIPTION;

  /**
   * Number of description lines to display
   * @default 2
   */
  @property({ type: Number, attribute: 'description-lines' })
  descriptionLines: number = DEFAULT_DESCRIPTION_LINES;

  /**
   * Show action buttons at the bottom
   * @default true
   */
  @property({ type: Boolean, attribute: 'show-actions' })
  showActions: boolean = DEFAULT_SHOW_ACTIONS;

  /**
   * Animation effect applied to all inner skeleton elements
   * @default 'shimmer'
   */
  @property({ reflect: true })
  effect: SkeletonEffect = 'shimmer';

  /**
   * Width of the media card
   * - 'auto': Natural width based on content/container
   * - 'full': 100% of container width
   * - Custom string: Any valid CSS width (e.g., '300px', '20rem')
   * @default 'auto'
   */
  @property({ reflect: true })
  width: SkeletonMediaCardWidth = 'auto';

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
        display: block;
        width: 100%;
      }
    `
  ];

  /**
   * Render image/thumbnail section
   */
  private _renderImage() {
    return html`
      <sando-skeleton-image ratio=${this.imageRatio} effect=${this.effect}></sando-skeleton-image>
    `;
  }

  /**
   * Render title section
   */
  private _renderTitle() {
    return html`
      <sando-skeleton-text size="lg" width="85%" effect=${this.effect}></sando-skeleton-text>
    `;
  }

  /**
   * Render optional description lines
   */
  private _renderDescription() {
    if (!this.showDescription) return nothing;

    const descriptionLinesHtml = [];
    for (let i = 0; i < this.descriptionLines; i++) {
      // Last line is shorter for natural look
      const width = i === this.descriptionLines - 1 ? '60%' : '100%';
      descriptionLinesHtml.push(html`
        <sando-skeleton-text size="sm" width=${width} effect=${this.effect}></sando-skeleton-text>
      `);
    }

    return html` <sando-skeleton-stack gap="xs"> ${descriptionLinesHtml} </sando-skeleton-stack> `;
  }

  /**
   * Render optional action buttons
   */
  private _renderActions() {
    if (!this.showActions) return nothing;

    return html`
      <sando-skeleton-row gap="sm">
        <sando-skeleton-button size="sm" effect=${this.effect}></sando-skeleton-button>
        <sando-skeleton-button size="sm" effect=${this.effect}></sando-skeleton-button>
      </sando-skeleton-row>
    `;
  }

  /**
   * Render the skeleton media card
   */
  render() {
    const customWidth = this.width !== 'auto' && this.width !== 'full' ? this.width : null;
    return html`
      <sando-skeleton-composer style=${customWidth ? `width: ${customWidth}` : nothing}>
        <sando-skeleton-stack gap="md">
          ${this._renderImage()} ${this._renderTitle()} ${this._renderDescription()}
          ${this._renderActions()}
        </sando-skeleton-stack>
      </sando-skeleton-composer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton-media-card': SandoSkeletonMediaCard;
  }
}
