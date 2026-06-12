/**
 * @deprecated Will be removed in the next major. Compose `<sando-skeleton>` and
 * `<sando-skeleton-paragraph>` instead. See Storybook → Components → Skeleton → Patterns
 * for direct replacements. Tracked in #126.
 *
 * Sando Skeleton Stack Component
 *
 * A vertical layout helper for composing skeleton placeholders.
 * Use this to arrange skeleton elements in a column with configurable
 * gap and horizontal alignment.
 *
 * @element sando-skeleton-stack
 *
 * @slot - Default slot for skeleton child elements
 *
 * @cssprop --sando-skeleton-spacing-gap-xs - Extra small gap between items
 * @cssprop --sando-skeleton-spacing-gap-sm - Small gap between items
 * @cssprop --sando-skeleton-spacing-gap-md - Medium gap between items
 * @cssprop --sando-skeleton-spacing-gap-lg - Large gap between items
 *
 * @example Basic usage
 * <sando-skeleton-stack>
 *   <sando-skeleton-text></sando-skeleton-text>
 *   <sando-skeleton-text width="80%"></sando-skeleton-text>
 *   <sando-skeleton-text width="60%"></sando-skeleton-text>
 * </sando-skeleton-stack>
 *
 * @example Different gaps
 * <sando-skeleton-stack gap="lg">
 *   <sando-skeleton-text></sando-skeleton-text>
 *   <sando-skeleton-text></sando-skeleton-text>
 * </sando-skeleton-stack>
 *
 * @example Different alignments
 * <sando-skeleton-stack align="center">
 *   <sando-skeleton-avatar></sando-skeleton-avatar>
 *   <sando-skeleton-text width="50%"></sando-skeleton-text>
 * </sando-skeleton-stack>
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import type { SkeletonStackGap, SkeletonStackAlign } from './sando-skeleton-stack.types.js';

/**
 * Default values for skeleton stack properties
 */
const DEFAULT_GAP: SkeletonStackGap = 'md';
const DEFAULT_ALIGN: SkeletonStackAlign = 'stretch';

@customElement('sando-skeleton-stack')
export class SandoSkeletonStack extends FlavorableMixin(LitElement) {
  private static _deprecationWarned = false;

  connectedCallback() {
    super.connectedCallback();
    if (!SandoSkeletonStack._deprecationWarned) {
      console.warn(
        '[sando] <sando-skeleton-stack> is deprecated and will be removed in the next major. Compose <sando-skeleton> and <sando-skeleton-paragraph> instead. See Storybook → Skeleton → Patterns.'
      );
      SandoSkeletonStack._deprecationWarned = true;
    }
  }

  /**
   * Gap between child skeleton elements
   * @default 'md'
   */
  @property({ reflect: true })
  gap: SkeletonStackGap = DEFAULT_GAP;

  /**
   * Horizontal alignment of child elements
   * @default 'stretch'
   */
  @property({ reflect: true })
  align: SkeletonStackAlign = DEFAULT_ALIGN;

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
        align-items: var(--_align, stretch);
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
   * Render the skeleton stack layout
   */
  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton-stack': SandoSkeletonStack;
  }
}
