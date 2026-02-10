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
import '../skeleton/sando-skeleton-text.js';
import '../skeleton-paragraph/sando-skeleton-paragraph.js';

/**
 * Default values for skeleton article properties
 */
const DEFAULT_SHOW_META = true;
const DEFAULT_PARAGRAPHS = 3;
const DEFAULT_TITLE_WIDTH = '70%';

@customElement('sando-skeleton-article')
export class SandoSkeletonArticle extends FlavorableMixin(LitElement) {
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
   * Render title section
   */
  private _renderTitle() {
    return html` <sando-skeleton-text size="lg" width=${this.titleWidth}></sando-skeleton-text> `;
  }

  /**
   * Render optional meta section (date + author)
   */
  private _renderMeta() {
    if (!this.showMeta) return nothing;

    return html`
      <sando-skeleton-row gap="sm">
        <sando-skeleton-text size="sm" width="80px"></sando-skeleton-text>
        <sando-skeleton-text size="sm" width="120px"></sando-skeleton-text>
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
        <sando-skeleton-paragraph lines="4" last-line-width="70%"></sando-skeleton-paragraph>
      `);
    }
    return paragraphBlocks;
  }

  /**
   * Render the skeleton article
   */
  render() {
    return html`
      <sando-skeleton-composer>
        <sando-skeleton-stack gap="md">
          ${this._renderTitle()} ${this._renderMeta()} ${this._renderParagraphs()}
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
