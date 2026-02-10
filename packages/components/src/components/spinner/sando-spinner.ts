/**
 * Sando Spinner Component
 *
 * An accessible loading spinner using inline SVG with configurable arc.
 * Displays a rotating arc that indicates a loading state.
 *
 * @element sando-spinner
 *
 * @cssprop --sando-spinner-size-xs - Extra small size (12px)
 * @cssprop --sando-spinner-size-sm - Small size (16px)
 * @cssprop --sando-spinner-size-md - Medium size (24px, default)
 * @cssprop --sando-spinner-size-lg - Large size (32px)
 * @cssprop --sando-spinner-size-xl - Extra large size (48px)
 * @cssprop --sando-spinner-color-default - Default spinner color
 * @cssprop --sando-spinner-color-inverted - Inverted color for dark backgrounds
 * @cssprop --sando-spinner-animation-duration - Rotation duration (700ms)
 * @cssprop --sando-spinner-animation-easing - Easing function (linear)
 * @cssprop --sando-spinner-stroke-xs - Stroke width for xs size
 * @cssprop --sando-spinner-stroke-sm - Stroke width for sm size
 * @cssprop --sando-spinner-stroke-md - Stroke width for md size (default)
 * @cssprop --sando-spinner-stroke-lg - Stroke width for lg size
 * @cssprop --sando-spinner-stroke-xl - Stroke width for xl size
 *
 * @example Basic usage
 * <sando-spinner></sando-spinner>
 *
 * @example Size variants
 * <sando-spinner size="xs"></sando-spinner>
 * <sando-spinner size="sm"></sando-spinner>
 * <sando-spinner size="md"></sando-spinner>
 * <sando-spinner size="lg"></sando-spinner>
 * <sando-spinner size="xl"></sando-spinner>
 *
 * @example Color variants
 * <sando-spinner variant="default"></sando-spinner>
 * <div style="background: #333; padding: 1rem;">
 *   <sando-spinner variant="inverted"></sando-spinner>
 * </div>
 *
 * @example With custom arc percentage
 * <sando-spinner arc="0.25"></sando-spinner>
 * <sando-spinner arc="0.5"></sando-spinner>
 * <sando-spinner arc="0.75"></sando-spinner>
 * <sando-spinner arc="1"></sando-spinner>
 *
 * @example With custom label
 * <sando-spinner label="Loading user data"></sando-spinner>
 *
 * @example In a button
 * <button disabled>
 *   <sando-spinner size="xs" variant="inverted"></sando-spinner>
 *   Loading...
 * </button>
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { spinnerStyles } from './sando-spinner.styles.js';
import type { SpinnerSize, SpinnerVariant } from './sando-spinner.types.js';
import {
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  DEFAULT_LABEL,
  DEFAULT_ARC,
  MIN_ARC,
  MAX_ARC,
  SVG_VIEWBOX,
  CIRCLE_CENTER,
  CIRCLE_RADIUS,
  CIRCUMFERENCE
} from './sando-spinner.constants.js';
import { SPINNER_ROLE } from './sando-spinner.a11y.js';

@customElement('sando-spinner')
export class SandoSpinner extends FlavorableMixin(LitElement) {
  /**
   * Size of the spinner
   * @default 'md'
   */
  @property({ reflect: true })
  size: SpinnerSize = DEFAULT_SIZE;

  /**
   * Color variant of the spinner
   * @default 'default'
   */
  @property({ reflect: true })
  variant: SpinnerVariant = DEFAULT_VARIANT;

  /**
   * Accessible label for screen readers
   * @default 'Loading'
   */
  @property({ type: String })
  label: string = DEFAULT_LABEL;

  /**
   * Arc percentage (0.1 to 1.0)
   * Controls how much of the circle is visible
   * @default 0.75 (75% of circle visible)
   */
  @property({ type: Number, reflect: true })
  arc: number = DEFAULT_ARC;

  /**
   * Component styles
   */
  static styles = [resetStyles, tokenStyles, spinnerStyles];

  /**
   * Get the clamped arc value (between MIN_ARC and MAX_ARC)
   */
  private get _clampedArc(): number {
    return Math.max(MIN_ARC, Math.min(MAX_ARC, this.arc));
  }

  /**
   * Calculate stroke-dasharray values based on arc percentage
   */
  private get _strokeDasharray(): string {
    const arcLength = CIRCUMFERENCE * this._clampedArc;
    const gapLength = CIRCUMFERENCE * (1 - this._clampedArc);
    return `${arcLength} ${gapLength}`;
  }

  /**
   * Render the spinning SVG arc
   */
  render() {
    return html`
      <span class="spinner" role="${SPINNER_ROLE}" aria-label="${this.label}" part="spinner">
        <svg
          class="spinner__svg"
          viewBox="${SVG_VIEWBOX}"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle
            class="spinner__circle"
            cx="${CIRCLE_CENTER}"
            cy="${CIRCLE_CENTER}"
            r="${CIRCLE_RADIUS}"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-dasharray="${this._strokeDasharray}"
          />
        </svg>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-spinner': SandoSpinner;
  }
}
