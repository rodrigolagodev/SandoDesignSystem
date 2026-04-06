/**
 * Sando Skeleton Article Component
 *
 * A preset skeleton for blog post or article layouts that composes skeleton
 * primitives and layout helpers. Provides a ready-to-use article loading
 * placeholder with title, meta info, and multiple paragraphs.
 *
 * @element sando-skeleton-article
 *
 * @example Basic usage (title + meta + 3 paragraphs)
 * <sando-skeleton-article></sando-skeleton-article>
 *
 * @example Without meta line
 * <sando-skeleton-article show-meta="false"></sando-skeleton-article>
 *
 * @example Custom paragraph count
 * <sando-skeleton-article paragraphs="5"></sando-skeleton-article>
 *
 * @example Custom title width
 * <sando-skeleton-article title-width="80%"></sando-skeleton-article>
 *
 * @example Size variants (controls paragraph line height and spacing)
 * <sando-skeleton-article size="sm"></sando-skeleton-article>
 * <sando-skeleton-article size="md"></sando-skeleton-article>
 * <sando-skeleton-article size="lg"></sando-skeleton-article>
 *
 * @example With hero image
 * <sando-skeleton-article show-hero-image></sando-skeleton-article>
 *
 * @example Pulse effect with hero image
 * <sando-skeleton-article show-hero-image effect="pulse"></sando-skeleton-article>
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import type { SkeletonArticleSize } from './sando-skeleton-article.types.js';
import type { SkeletonEffect } from '../skeleton/sando-skeleton.types.js';

// Import skeleton components
import '../skeleton-composer/sando-skeleton-composer.js';
import '../skeleton-stack/sando-skeleton-stack.js';
import '../skeleton-row/sando-skeleton-row.js';
import '../skeleton/sando-skeleton.js';
import '../skeleton-paragraph/sando-skeleton-paragraph.js';
import '../skeleton-image/sando-skeleton-image.js';

/**
 * Default values for skeleton article properties
 */
const DEFAULT_SHOW_META = true;
const DEFAULT_PARAGRAPHS = 3;
const DEFAULT_TITLE_WIDTH = '70%';
const DEFAULT_SIZE: SkeletonArticleSize = 'md';

/**
 * Size mapping for title skeleton heights using design tokens
 * Title should be larger than paragraph text at each size
 * Uses heading font size tokens from the design system
 */
const TITLE_HEIGHT_TOKEN_MAP: Record<SkeletonArticleSize, string> = {
  sm: 'var(--sando-font-size-heading-200)', // Smaller heading for compact articles
  md: 'var(--sando-font-size-heading-100)', // Standard heading
  lg: 'var(--sando-font-size-heading-100)' // Large heading for feature articles
};

/**
 * Size mapping for meta skeleton heights (author/date) using design tokens
 * Meta should be smaller than paragraph text
 * Uses skeleton text height tokens which reference font size tokens
 */
const META_HEIGHT_TOKEN_MAP: Record<SkeletonArticleSize, string> = {
  sm: 'var(--sando-skeleton-size-text-height-sm)', // Caption-like for compact
  md: 'var(--sando-skeleton-size-text-height-sm)', // Small text for standard
  lg: 'var(--sando-skeleton-size-text-height-md)' // Body-like for large
};

/**
 * Width mappings for meta elements based on size using space tokens
 * Uses space tokens to maintain consistency with the design system
 */
const META_WIDTH_TOKEN_MAP: Record<SkeletonArticleSize, { date: string; author: string }> = {
  sm: { date: 'var(--sando-space-16)', author: 'var(--sando-space-24)' }, // 4rem / 6rem
  md: { date: 'var(--sando-space-20)', author: 'var(--sando-space-32)' }, // 5rem / 8rem
  lg: { date: 'var(--sando-space-24)', author: 'var(--sando-space-40)' } // 6rem / 10rem
};

@customElement('sando-skeleton-article')
export class SandoSkeletonArticle extends FlavorableMixin(LitElement) {
  /**
   * Size of the paragraph text lines
   * Controls line height and spacing between lines
   * @default 'md'
   */
  @property({ reflect: true })
  size: SkeletonArticleSize = DEFAULT_SIZE;

  /**
   * Show date/author meta line below title
   * @default true
   */
  @property({ type: Boolean, attribute: 'show-meta' })
  showMeta: boolean = DEFAULT_SHOW_META;

  /**
   * Number of paragraph blocks to display
   * @default 3
   */
  @property({ type: Number })
  paragraphs: number = DEFAULT_PARAGRAPHS;

  /**
   * Width of the title skeleton (CSS value)
   * @default '70%'
   */
  @property({ attribute: 'title-width' })
  titleWidth: string = DEFAULT_TITLE_WIDTH;

  /**
   * Width of the article container
   * - 'auto': Natural width based on content/container
   * - 'full': 100% of container width
   * - Custom string: Any valid CSS width (e.g., '600px', '40rem')
   * @default 'auto'
   */
  @property({ reflect: true })
  width: 'auto' | 'full' | string = 'auto';

  /**
   * Animation effect applied to all inner skeleton elements
   * @default 'shimmer'
   */
  @property({ reflect: true })
  effect: SkeletonEffect = 'shimmer';

  /**
   * Show hero image at the top of the article skeleton
   * @default false
   */
  @property({ type: Boolean, attribute: 'show-hero-image' })
  showHeroImage: boolean = false;

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
    `
  ];

  /**
   * Get title height based on current size using design tokens
   */
  private _getTitleHeight(): string {
    return TITLE_HEIGHT_TOKEN_MAP[this.size] ?? TITLE_HEIGHT_TOKEN_MAP.md;
  }

  /**
   * Get meta height based on current size using design tokens
   */
  private _getMetaHeight(): string {
    return META_HEIGHT_TOKEN_MAP[this.size] ?? META_HEIGHT_TOKEN_MAP.md;
  }

  /**
   * Get meta widths based on current size using design tokens
   */
  private _getMetaWidths(): { date: string; author: string } {
    return META_WIDTH_TOKEN_MAP[this.size] ?? META_WIDTH_TOKEN_MAP.md;
  }

  /**
   * Render optional hero image section
   */
  private _renderHeroImage() {
    if (!this.showHeroImage) return nothing;
    return html`<sando-skeleton-image ratio="16/9" effect=${this.effect}></sando-skeleton-image>`;
  }

  /**
   * Render title section
   */
  private _renderTitle() {
    return html`
      <sando-skeleton
        shape="text"
        width=${this.titleWidth}
        height=${this._getTitleHeight()}
        effect=${this.effect}
      ></sando-skeleton>
    `;
  }

  /**
   * Render optional meta section (date + author)
   */
  private _renderMeta() {
    if (!this.showMeta) return nothing;

    const metaHeight = this._getMetaHeight();
    const metaWidths = this._getMetaWidths();

    return html`
      <sando-skeleton-row gap="sm">
        <sando-skeleton
          shape="text"
          width=${metaWidths.date}
          height=${metaHeight}
          effect=${this.effect}
        ></sando-skeleton>
        <sando-skeleton
          shape="text"
          width=${metaWidths.author}
          height=${metaHeight}
          effect=${this.effect}
        ></sando-skeleton>
      </sando-skeleton-row>
    `;
  }

  /**
   * Render paragraph blocks
   */
  private _renderParagraphs() {
    const paragraphBlocks = [];
    for (let i = 0; i < this.paragraphs; i++) {
      paragraphBlocks.push(html`
        <sando-skeleton-paragraph
          size=${this.size}
          lines="4"
          last-line-width="70%"
          effect=${this.effect}
        ></sando-skeleton-paragraph>
      `);
    }
    return paragraphBlocks;
  }

  /**
   * Render the skeleton article
   */
  render() {
    const customWidth = this.width !== 'auto' && this.width !== 'full' ? this.width : null;

    return html`
      <sando-skeleton-composer style=${customWidth ? `width: ${customWidth}` : nothing}>
        <sando-skeleton-stack gap="md">
          ${this._renderHeroImage()} ${this._renderTitle()} ${this._renderMeta()}
          ${this._renderParagraphs()}
        </sando-skeleton-stack>
      </sando-skeleton-composer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton-article': SandoSkeletonArticle;
  }
}
