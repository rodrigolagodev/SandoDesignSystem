/**
 * Sando Skeleton Paragraph Component
 *
 * A skeleton placeholder for multiple lines of text content.
 * Renders configurable number of skeleton lines with the last line
 * having a different width for a more natural paragraph appearance.
 *
 * @element sando-skeleton-paragraph
 *
 * @cssprop --sando-skeleton-spacing-gap-xs - Extra small gap between lines
 * @cssprop --sando-skeleton-spacing-gap-sm - Small gap between lines
 * @cssprop --sando-skeleton-spacing-gap-md - Medium gap between lines
 * @cssprop --sando-skeleton-spacing-gap-lg - Large gap between lines
 * @cssprop --sando-skeleton-paragraph-lineSpacing-sm - Line spacing for sm size
 * @cssprop --sando-skeleton-paragraph-lineSpacing-md - Line spacing for md size
 * @cssprop --sando-skeleton-paragraph-lineSpacing-lg - Line spacing for lg size
 *
 * @example Basic usage
 * <sando-skeleton-paragraph></sando-skeleton-paragraph>
 *
 * @example Different line counts
 * <sando-skeleton-paragraph lines="5"></sando-skeleton-paragraph>
 * <sando-skeleton-paragraph lines="1"></sando-skeleton-paragraph>
 *
 * @example Custom last line width
 * <sando-skeleton-paragraph last-line-width="40%"></sando-skeleton-paragraph>
 *
 * @example Different sizes (controls line height and spacing)
 * <sando-skeleton-paragraph size="sm"></sando-skeleton-paragraph>
 * <sando-skeleton-paragraph size="md"></sando-skeleton-paragraph>
 * <sando-skeleton-paragraph size="lg"></sando-skeleton-paragraph>
 *
 * @example Different spacings (overrides size-based spacing)
 * <sando-skeleton-paragraph spacing="xs"></sando-skeleton-paragraph>
 * <sando-skeleton-paragraph spacing="lg"></sando-skeleton-paragraph>
 *
 * @example Different effects
 * <sando-skeleton-paragraph effect="pulse"></sando-skeleton-paragraph>
 * <sando-skeleton-paragraph effect="none"></sando-skeleton-paragraph>
 */

import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import '../skeleton/sando-skeleton.js';
import type {
  SkeletonParagraphSpacing,
  SkeletonParagraphSize,
  SkeletonParagraphWidth,
  SkeletonEffect
} from './sando-skeleton-paragraph.types.js';

/**
 * Default values for skeleton paragraph properties
 */
const DEFAULT_LINES = 3;
const DEFAULT_LAST_LINE_WIDTH = '60%';
const DEFAULT_SPACING: SkeletonParagraphSpacing = 'sm';
const DEFAULT_SIZE: SkeletonParagraphSize = 'md';
const DEFAULT_EFFECT: SkeletonEffect = 'shimmer';

@customElement('sando-skeleton-paragraph')
export class SandoSkeletonParagraph extends FlavorableMixin(LitElement) {
  /**
   * Size of text lines (controls line height)
   * @default 'md'
   */
  @property({ reflect: true })
  size: SkeletonParagraphSize = DEFAULT_SIZE;

  /**
   * Number of text lines to render
   * @default 3
   */
  @property({ type: Number })
  lines: number = DEFAULT_LINES;

  /**
   * Width of the last line (CSS value)
   * Creates a more natural paragraph appearance
   * @default '60%'
   */
  @property({ attribute: 'last-line-width' })
  lastLineWidth: string = DEFAULT_LAST_LINE_WIDTH;

  /**
   * Gap between lines
   * @default 'sm'
   */
  @property({ reflect: true })
  spacing: SkeletonParagraphSpacing = DEFAULT_SPACING;

  /**
   * Animation effect applied to all skeleton lines
   * @default 'shimmer'
   */
  @property({ reflect: true })
  effect: SkeletonEffect = DEFAULT_EFFECT;

  /**
   * Width of the paragraph container
   * - 'auto': Natural width (100% of parent by default)
   * - 'full': Explicit 100% width
   * - Custom string: Any valid CSS width (e.g., '300px', '20rem')
   * @default 'auto'
   */
  @property({ reflect: true })
  width: SkeletonParagraphWidth = 'auto';

  /**
   * Component styles
   */
  static styles = [
    resetStyles,
    tokenStyles,
    css`
      /* ============================================
         HOST
         ============================================ */

      :host {
        display: flex;
        flex-direction: column;
        /* Default gap based on size, can be overridden by spacing attribute */
        gap: var(--skeleton-paragraph-gap, var(--sando-skeleton-paragraph-lineSpacing-md));
      }

      /* ============================================
         SIZE VARIANTS - Line height and default spacing
         ============================================ */

      :host([size='sm']) {
        --skeleton-paragraph-line-height: var(--sando-skeleton-size-text-height-sm);
        --skeleton-paragraph-gap: var(--sando-skeleton-paragraph-lineSpacing-sm);
      }

      :host([size='md']) {
        --skeleton-paragraph-line-height: var(--sando-skeleton-size-text-height-md);
        --skeleton-paragraph-gap: var(--sando-skeleton-paragraph-lineSpacing-md);
      }

      :host([size='lg']) {
        --skeleton-paragraph-line-height: var(--sando-skeleton-size-text-height-lg);
        --skeleton-paragraph-gap: var(--sando-skeleton-paragraph-lineSpacing-lg);
      }

      /* ============================================
         SPACING VARIANTS (overrides size-based gap)
         ============================================ */

      :host([spacing='xs']) {
        gap: var(--sando-skeleton-spacing-gap-xs);
      }

      :host([spacing='sm']) {
        gap: var(--sando-skeleton-spacing-gap-sm);
      }

      :host([spacing='md']) {
        gap: var(--sando-skeleton-spacing-gap-md);
      }

      :host([spacing='lg']) {
        gap: var(--sando-skeleton-spacing-gap-lg);
      }

      /* ============================================
         WIDTH VARIANTS
         ============================================ */

      :host([width='full']) {
        width: 100%;
      }
    `
  ];

  /**
   * Update host width style when width property changes
   */
  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('width')) {
      if (this.width !== 'auto' && this.width !== 'full') {
        // Custom width value - apply inline style
        this.style.width = this.width;
      } else if (this.width === 'auto') {
        // Reset to natural width
        this.style.width = '';
      }
      // 'full' is handled by CSS attribute selector
    }
  }

  /**
   * Get line height based on size
   */
  private _getLineHeight(): string {
    return `var(--skeleton-paragraph-line-height, var(--sando-skeleton-size-text-height-md))`;
  }

  /**
   * Render the skeleton paragraph lines
   */
  render() {
    // Ensure lines is at least 1
    const lineCount = Math.max(1, this.lines);
    const lineArray = Array.from({ length: lineCount }, (_, i) => i);
    const lineHeight = this._getLineHeight();

    return html`
      ${lineArray.map((_, index) => {
        const isLast = index === lineCount - 1;
        const width = isLast ? this.lastLineWidth : '100%';

        return html`
          <sando-skeleton
            shape="text"
            effect=${this.effect}
            width=${width}
            height=${lineHeight}
          ></sando-skeleton>
        `;
      })}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton-paragraph': SandoSkeletonParagraph;
  }
}
