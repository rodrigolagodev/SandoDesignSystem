/**
 * Sando Skeleton Composer Component
 *
 * An orchestrator component that synchronizes animations across all child skeleton
 * elements. Controls timing coordination for cohesive loading states.
 *
 * @element sando-skeleton-composer
 *
 * @slot - Default slot for skeleton child elements
 *
 * @example Synchronized animations (default)
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
 *
 * @example Independent animations (browser default)
 * <sando-skeleton-composer sync="false">
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
 * Selector for all skeleton components that support animation synchronization
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
  /**
   * Synchronize all child skeleton animations
   * When true, all skeletons animate at exactly the same time
   * When false with no stagger, animations run independently
   * @default true
   */
  @property({ type: Boolean, reflect: true })
  sync = true;

  /**
   * Delay between each skeleton's animation start
   * Creates a wave effect (e.g., '50ms', '100ms')
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
   * Setup animation sync and observer when connected
   */
  connectedCallback() {
    super.connectedCallback();
    this._syncAnimations();

    // Watch for dynamically added skeleton children
    this._observer = new MutationObserver(() => this._syncAnimations());
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
   * Re-sync animations when sync or stagger properties change
   */
  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('sync') || changedProperties.has('stagger')) {
      this._syncAnimations();
    }
  }

  /**
   * Synchronize animation timing across all child skeletons
   */
  private _syncAnimations() {
    const skeletons = this.querySelectorAll(SKELETON_SELECTOR);

    // If not syncing and no stagger, reset to independent animations
    if (!this.sync && !this.stagger) {
      skeletons.forEach((skeleton) => {
        (skeleton as HTMLElement).style.removeProperty('--skeleton-animation-delay');
      });
      return;
    }

    const staggerMs = this.stagger ? this._parseTime(this.stagger) : 0;

    skeletons.forEach((skeleton, index) => {
      if (this.stagger) {
        // Apply staggered delay - each skeleton starts after the previous
        const delay = index * staggerMs;
        (skeleton as HTMLElement).style.setProperty('--skeleton-animation-delay', `${delay}ms`);
      } else if (this.sync) {
        // Sync: all animations start at the same time (delay = 0)
        (skeleton as HTMLElement).style.setProperty('--skeleton-animation-delay', '0ms');
      }
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
