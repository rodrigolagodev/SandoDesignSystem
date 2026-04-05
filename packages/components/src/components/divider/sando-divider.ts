/**
 * Sando Divider Component
 *
 * A visual separator that divides content sections.
 *
 * ## Semantic HTML
 *
 * The element rendered depends on the configuration:
 * - Horizontal without label → `<hr>` (native `role="separator"`)
 * - Horizontal with label → `<div role="separator" aria-label>` with pseudo-element lines
 * - Vertical → `<div role="separator" aria-orientation="vertical">`
 *
 * ## Orientations
 *
 * - `horizontal` (default) — spans the full width of its container
 * - `vertical` — spans the full height of its parent (parent must have a defined height)
 *
 * ## Visual Variants
 *
 * | `variant`  | Description       |
 * |------------|-------------------|
 * | `solid`    | Continuous line   |
 * | `dashed`   | Dashed line       |
 * | `dotted`   | Dotted line       |
 *
 * ## Weight
 *
 * | `weight`   | Token used                      |
 * |------------|---------------------------------|
 * | `thin`     | `--sando-divider-weight-thin`   |
 * | `medium`   | `--sando-divider-weight-medium` |
 * | `thick`    | `--sando-divider-weight-thick`  |
 *
 * ## Spacing
 *
 * | `spacing`  | Token used                      |
 * |------------|---------------------------------|
 * | `sm`       | `--sando-divider-spacing-sm`    |
 * | `md`       | `--sando-divider-spacing-md`    |
 * | `lg`       | `--sando-divider-spacing-lg`    |
 *
 * Spacing is applied as `margin-block` for horizontal and
 * `margin-inline` for vertical using CSS logical properties.
 *
 * ## Label Pattern
 *
 * When `label` is provided, the divider renders a text label centered
 * between two lines (decorative pattern). The label sets `aria-label`
 * on the separator element so screen readers announce it.
 *
 * @element sando-divider
 *
 * @cssprop --sando-divider-color - Line color
 * @cssprop --sando-divider-weight-thin - Thin line thickness (1px)
 * @cssprop --sando-divider-weight-medium - Medium line thickness (2px)
 * @cssprop --sando-divider-weight-thick - Thick line thickness (4px)
 * @cssprop --sando-divider-spacing-sm - Small block/inline margin
 * @cssprop --sando-divider-spacing-md - Medium block/inline margin
 * @cssprop --sando-divider-spacing-lg - Large block/inline margin
 *
 * @example Horizontal divider (default)
 * ```html
 * <sando-divider></sando-divider>
 * ```
 *
 * @example With weight and variant
 * ```html
 * <sando-divider weight="thick" variant="dashed"></sando-divider>
 * ```
 *
 * @example With label
 * ```html
 * <sando-divider label="OR"></sando-divider>
 * ```
 *
 * @example Vertical
 * ```html
 * <div style="display: flex; height: 2rem;">
 *   <span>Left</span>
 *   <sando-divider orientation="vertical"></sando-divider>
 *   <span>Right</span>
 * </div>
 * ```
 *
 * @example With spacing
 * ```html
 * <sando-divider spacing="lg"></sando-divider>
 * ```
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
  DividerOrientation,
  DividerWeight,
  DividerVariant,
  DividerSpacing
} from './sando-divider.types.js';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles } from './styles/index.js';

@customElement('sando-divider')
export class SandoDivider extends FlavorableMixin(LitElement) {
  /**
   * Component styles — reset → tokens → component styles.
   */
  static styles = [
    resetStyles, // Global CSS reset (box-sizing, margins, etc.)
    tokenStyles, // Design tokens (Ingredients, Flavors, Recipes)
    baseStyles // Divider layout + weight + variant + spacing
  ];

  /**
   * Orientation of the divider.
   * - `horizontal`: spans full width (default)
   * - `vertical`: spans full height of parent (parent needs a height)
   * @default 'horizontal'
   */
  @property({ reflect: true })
  orientation: DividerOrientation = 'horizontal';

  /**
   * Visual weight (thickness) of the divider line.
   * @default 'medium'
   */
  @property({ reflect: true })
  weight: DividerWeight = 'medium';

  /**
   * Visual style of the divider line.
   * @default 'solid'
   */
  @property({ reflect: true })
  variant: DividerVariant = 'solid';

  /**
   * Spacing (margin) applied around the divider.
   * Uses `margin-block` (horizontal) or `margin-inline` (vertical).
   * @default 'md'
   */
  @property({ reflect: true })
  spacing: DividerSpacing = 'md';

  /**
   * Optional text label rendered centered within the divider.
   * When set, the component uses `role="separator"` with `aria-label`
   * instead of a bare `<hr>`.
   */
  @property({ type: String })
  label?: string;

  // ─── Private render helpers ────────────────────────────────────────────────

  /**
   * Renders a bare horizontal separator using a native `<hr>`.
   * `<hr>` has implicit `role="separator"` — no extra ARIA needed.
   */
  private _renderHorizontalBare() {
    return html`<hr class="divider" part="divider" />`;
  }

  /**
   * Renders a horizontal separator with a centered label.
   * Uses `role="separator"` and `aria-label` for screen readers.
   */
  private _renderHorizontalWithLabel(label: string) {
    return html`
      <div class="divider" part="divider" role="separator" aria-label=${label}>
        <span class="divider__label" part="label">${label}</span>
      </div>
    `;
  }

  /**
   * Renders a vertical separator using a `<div>` with explicit ARIA.
   */
  private _renderVertical() {
    return html`
      <div
        class="divider divider--vertical"
        part="divider"
        role="separator"
        aria-orientation="vertical"
      ></div>
    `;
  }

  // ─── Main render ───────────────────────────────────────────────────────────

  render() {
    if (this.orientation === 'vertical') {
      return this._renderVertical();
    }

    if (this.label) {
      return this._renderHorizontalWithLabel(this.label);
    }

    return this._renderHorizontalBare();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-divider': SandoDivider;
  }
}
