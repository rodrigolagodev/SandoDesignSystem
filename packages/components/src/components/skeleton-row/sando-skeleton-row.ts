/**
 * Sando Skeleton Row Component
 *
 * A horizontal layout helper for composing skeleton placeholders.
 * Use this to arrange skeleton elements side by side with configurable
 * gap and vertical alignment.
 *
 * @element sando-skeleton-row
 *
 * @slot - Default slot for skeleton child elements
 *
 * @cssprop --sando-skeleton-spacing-gap-xs - Extra small gap between items
 * @cssprop --sando-skeleton-spacing-gap-sm - Small gap between items
 * @cssprop --sando-skeleton-spacing-gap-md - Medium gap between items
 * @cssprop --sando-skeleton-spacing-gap-lg - Large gap between items
 *
 * @example Basic usage
 * <sando-skeleton-row>
 *   <sando-skeleton-avatar size="md"></sando-skeleton-avatar>
 *   <sando-skeleton-paragraph></sando-skeleton-paragraph>
 * </sando-skeleton-row>
 *
 * @example Different gaps
 * <sando-skeleton-row gap="lg">
 *   <sando-skeleton shape="circular" width="40px" height="40px"></sando-skeleton>
 *   <sando-skeleton-text></sando-skeleton-text>
 * </sando-skeleton-row>
 *
 * @example Different alignments
 * <sando-skeleton-row align="start">
 *   <sando-skeleton-avatar></sando-skeleton-avatar>
 *   <sando-skeleton-paragraph lines="3"></sando-skeleton-paragraph>
 * </sando-skeleton-row>
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import type { SkeletonRowGap, SkeletonRowAlign } from './sando-skeleton-row.types.js';

/**
 * Default values for skeleton row properties
 */
const DEFAULT_GAP: SkeletonRowGap = 'md';
const DEFAULT_ALIGN: SkeletonRowAlign = 'center';

@customElement('sando-skeleton-row')
export class SandoSkeletonRow extends FlavorableMixin(LitElement) {
  /**
   * Gap between child skeleton elements
   * @default 'md'
   */
  @property({ reflect: true })
  gap: SkeletonRowGap = DEFAULT_GAP;

  /**
   * Vertical alignment of child elements
   * @default 'center'
   */
  @property({ reflect: true })
  align: SkeletonRowAlign = DEFAULT_ALIGN;

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
        flex-direction: row;
        align-items: var(--_align, center);
        gap: var(--sando-skeleton-spacing-gap-md);
      }

      /* ============================================
         GAP VARIANTS
         ============================================ */

      :host([gap='xs']) {
        gap: var(--sando-skeleton-spacing-gap-xs);
      }

      :host([gap='sm']) {
        gap: var(--sando-skeleton-spacing-gap-sm);
      }

      :host([gap='md']) {
        gap: var(--sando-skeleton-spacing-gap-md);
      }

      :host([gap='lg']) {
        gap: var(--sando-skeleton-spacing-gap-lg);
      }

      /* ============================================
         ALIGNMENT VARIANTS
         ============================================ */

      :host([align='start']) {
        --_align: flex-start;
      }

      :host([align='center']) {
        --_align: center;
      }

      :host([align='end']) {
        --_align: flex-end;
      }

      :host([align='stretch']) {
        --_align: stretch;
      }
    `
  ];

  /**
   * Render the skeleton row layout
   */
  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton-row': SandoSkeletonRow;
  }
}
