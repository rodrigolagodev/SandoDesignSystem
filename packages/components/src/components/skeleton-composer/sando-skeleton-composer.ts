/**
 * @deprecated Will be removed in the next major. Compose `<sando-skeleton>` and
 * `<sando-skeleton-paragraph>` instead. See Storybook → Components → Skeleton → Patterns
 * for direct replacements. Tracked in #126.
 *
 * Sando Skeleton Composer Component
 *
 * A container component that can apply staggered animation delays to child
 * skeleton elements for a wave effect.
 *
 * @element sando-skeleton-composer
 *
 * @slot - Default slot for skeleton child elements
 *
 * @example Basic usage (no special behavior)
 * <sando-skeleton-composer>
 *   <sando-skeleton-text></sando-skeleton-text>
 *   <sando-skeleton-text width="80%"></sando-skeleton-text>
 *   <sando-skeleton-text width="60%"></sando-skeleton-text>
 * </sando-skeleton-composer>
 *
 * @example Staggered wave effect
 * <sando-skeleton-composer stagger="50ms">
 *   <sando-skeleton-text></sando-skeleton-text>
 *   <sando-skeleton-text></sando-skeleton-text>
 *   <sando-skeleton-text></sando-skeleton-text>
 * </sando-skeleton-composer>
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';

/**
 * Selector for all skeleton components that support stagger
 */
const SKELETON_SELECTOR = [
  'sando-skeleton',
  'sando-skeleton-text',
  'sando-skeleton-paragraph',
  'sando-skeleton-avatar',
  'sando-skeleton-image',
  'sando-skeleton-button'
].join(', ');

@customElement('sando-skeleton-composer')
export class SandoSkeletonComposer extends FlavorableMixin(LitElement) {
  private static _deprecationWarned = false;

  /**
   * Delay between each skeleton's animation start.
   * Creates a wave effect (e.g., '50ms', '100ms').
   * When not set, skeletons animate independently (browser default).
   */
  @property({ type: String })
  stagger?: string;

  /**
   * MutationObserver to watch for new skeleton children
   */
  private _observer?: MutationObserver;

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
   * Setup stagger delays and observer when connected
   */
  connectedCallback() {
    super.connectedCallback();
    if (!SandoSkeletonComposer._deprecationWarned) {
      console.warn(
        '[sando] <sando-skeleton-composer> is deprecated and will be removed in the next major. Compose <sando-skeleton> and <sando-skeleton-paragraph> instead. See Storybook → Skeleton → Patterns.'
      );
      SandoSkeletonComposer._deprecationWarned = true;
    }
    this._applyStagger();

    // Watch for dynamically added skeleton children
    this._observer = new MutationObserver(() => this._applyStagger());
    this._observer.observe(this, { childList: true, subtree: true });
  }

  /**
   * Cleanup observer when disconnected
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer?.disconnect();
  }

  /**
   * Re-apply stagger when property changes
   */
  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('stagger')) {
      this._applyStagger();
    }
  }

  /**
   * Apply staggered animation delays to child skeletons.
   * Each skeleton gets an incremental delay (0ms, 50ms, 100ms, etc.)
   */
  private _applyStagger() {
    const skeletons = this.querySelectorAll(SKELETON_SELECTOR);

    if (!this.stagger) {
      // No stagger - remove any previously set delays
      skeletons.forEach((skeleton) => {
        (skeleton as HTMLElement).style.removeProperty('--skeleton-animation-delay');
      });
      return;
    }

    const staggerMs = this._parseTime(this.stagger);

    skeletons.forEach((skeleton, index) => {
      (skeleton as HTMLElement).style.setProperty(
        '--skeleton-animation-delay',
        `${index * staggerMs}ms`
      );
    });
  }

  /**
   * Parse CSS time value to milliseconds
   * @param time - CSS time string (e.g., '50ms', '0.1s', '100')
   * @returns Time in milliseconds
   */
  private _parseTime(time: string): number {
    const match = time.match(/^(\d+(?:\.\d+)?)(ms|s)?$/);
    if (!match) return 0;

    const value = parseFloat(match[1]);
    const unit = match[2] || 'ms';

    return unit === 's' ? value * 1000 : value;
  }

  /**
   * Render slot for skeleton children
   */
  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-skeleton-composer': SandoSkeletonComposer;
  }
}
