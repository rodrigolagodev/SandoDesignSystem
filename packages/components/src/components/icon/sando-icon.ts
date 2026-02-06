/**
 * Sando Icon Component
 *
 * A fully accessible SVG icon component built with Lit following industry standards.
 * Uses Lucide Icons library (1,637 icons) with tree-shaking via Vite ?raw imports.
 * Icons scale with font sizes for visual harmony with typography.
 *
 * @element sando-icon
 *
 * @fires icon-load - Fired when the icon SVG loads successfully
 * @fires icon-error - Fired when the icon SVG fails to load
 *
 * @cssprop --sando-icon-size-xs - Extra small icon size (12px - matches font.size.100)
 * @cssprop --sando-icon-size-small - Small icon size (14px - matches font.size.200)
 * @cssprop --sando-icon-size-medium - Medium icon size (18px - matches font.size.400)
 * @cssprop --sando-icon-size-large - Large icon size (24px - matches font.size.600)
 * @cssprop --sando-icon-size-xl - Extra large icon size (32px - matches font.size.700)
 * @cssprop --sando-icon-color-default - Default icon color
 * @cssprop --sando-icon-color-muted - Muted icon color
 * @cssprop --sando-icon-color-emphasis - Emphasized icon color
 * @cssprop --sando-icon-color-brand - Brand colored icon
 * @cssprop --sando-icon-color-onSolid - Icon color on solid backgrounds
 *
 * @example Basic usage
 * <sando-icon name="star"></sando-icon>
 * <sando-icon name="heart" size="large"></sando-icon>
 * <sando-icon name="settings" color="brand"></sando-icon>
 *
 * @example Size variants (scale with font sizes)
 * <sando-icon name="star" size="xs"></sando-icon>      <!-- 12px -->
 * <sando-icon name="star" size="small"></sando-icon>   <!-- 14px -->
 * <sando-icon name="star" size="medium"></sando-icon>  <!-- 18px -->
 * <sando-icon name="star" size="large"></sando-icon>   <!-- 24px -->
 * <sando-icon name="star" size="xl"></sando-icon>      <!-- 32px -->
 *
 * @example Color variants
 * <sando-icon name="alert-circle" color="default"></sando-icon>
 * <sando-icon name="info" color="muted"></sando-icon>
 * <sando-icon name="check" color="emphasis"></sando-icon>
 * <sando-icon name="star" color="brand"></sando-icon>
 *
 * @example Custom colors and sizes
 * <sando-icon name="star" custom-color="#ff0000"></sando-icon>
 * <sando-icon name="heart" custom-size="3rem"></sando-icon>
 *
 * @example Transformations
 * <sando-icon name="arrow-right" rotate="90"></sando-icon>
 * <sando-icon name="chevron-right" flip-horizontal></sando-icon>
 * <sando-icon name="arrow-down" flip-vertical></sando-icon>
 *
 * @example Accessibility
 * <!-- Decorative icon (hidden from screen readers) -->
 * <sando-icon name="star" decorative></sando-icon>
 *
 * <!-- Semantic icon (requires aria-label) -->
 * <sando-icon name="trash" aria-label="Delete item"></sando-icon>
 *
 * @example Inherit color from parent
 * <p style="color: red;">
 *   This text is red <sando-icon name="star" inherit-color></sando-icon>
 * </p>
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { classMap } from 'lit/directives/class-map.js';
import type { IconName } from './icon-manifest';
import { loadIconSvg, isValidIconName } from './icon-manifest';
import type { IconSize, IconColor } from './sando-icon.types';
import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';

@customElement('sando-icon')
export class SandoIcon extends FlavorableMixin(LitElement) {
  /**
   * Name of the icon to display
   * Must be a valid Lucide icon name
   * @required
   */
  @property({ reflect: true })
  name!: IconName;

  /**
   * Size of the icon
   * Icons scale with font sizes for visual harmony
   * @default 'medium'
   */
  @property({ reflect: true })
  size: IconSize = 'medium';

  /**
   * Color variant of the icon
   * @default 'default'
   */
  @property({ reflect: true })
  color: IconColor = 'default';

  /**
   * Custom color override (CSS color value)
   */
  @property({ reflect: true, attribute: 'custom-color' })
  customColor?: string;

  /**
   * Custom size override (CSS dimension value)
   */
  @property({ reflect: true, attribute: 'custom-size' })
  customSize?: string;

  /**
   * Whether to flip the icon horizontally
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'flip-horizontal' })
  flipHorizontal = false;

  /**
   * Whether to flip the icon vertically
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'flip-vertical' })
  flipVertical = false;

  /**
   * Rotation angle in degrees (0, 90, 180, 270)
   * @default 0
   */
  @property({ type: Number, reflect: true })
  rotate: 0 | 90 | 180 | 270 = 0;

  /**
   * Accessible label for screen readers
   * Required if the icon has semantic meaning
   */
  @property({ reflect: true, attribute: 'aria-label' })
  ariaLabel: string | null = null;

  /**
   * Whether the icon is purely decorative (hidden from screen readers)
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  decorative = false;

  // Note: `flavor` property comes from FlavorableMixin
  // Inherited from ancestor or explicitly set via attribute
  // See: src/mixins/flavorable.ts

  /**
   * Stroke width for the SVG
   * @default 2
   */
  @property({ type: Number, reflect: true, attribute: 'stroke-width' })
  strokeWidth = 2;

  /**
   * Whether to inherit color from parent text color
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'inherit-color' })
  inheritColor = false;

  /**
   * Internal state: SVG content
   */
  @state()
  private svgContent = '';

  /**
   * Internal state: loading status
   */
  @state()
  private isLoading = false;

  /**
   * Internal state: error message
   */
  @state()
  private error: string | null = null;

  /**
   * Component styles
   */
  static styles = [
    resetStyles,
    tokenStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        line-height: 0;
      }

      .icon-wrapper {
        display: flex;
        width: var(--icon-size, var(--sando-icon-size-medium));
        height: var(--icon-size, var(--sando-icon-size-medium));
        color: var(--icon-color, var(--sando-icon-color-default));
      }

      /* Size variants */
      :host([size='xs']) .icon-wrapper {
        width: var(--icon-size, var(--sando-icon-size-xs));
        height: var(--icon-size, var(--sando-icon-size-xs));
      }

      :host([size='small']) .icon-wrapper {
        width: var(--icon-size, var(--sando-icon-size-small));
        height: var(--icon-size, var(--sando-icon-size-small));
      }

      :host([size='medium']) .icon-wrapper {
        width: var(--icon-size, var(--sando-icon-size-medium));
        height: var(--icon-size, var(--sando-icon-size-medium));
      }

      :host([size='large']) .icon-wrapper {
        width: var(--icon-size, var(--sando-icon-size-large));
        height: var(--icon-size, var(--sando-icon-size-large));
      }

      :host([size='xl']) .icon-wrapper {
        width: var(--icon-size, var(--sando-icon-size-xl));
        height: var(--icon-size, var(--sando-icon-size-xl));
      }

      /* Color variants */
      :host([color='default']) .icon-wrapper {
        color: var(--icon-color, var(--sando-icon-color-default));
      }

      :host([color='muted']) .icon-wrapper {
        color: var(--icon-color, var(--sando-icon-color-muted));
      }

      :host([color='emphasis']) .icon-wrapper {
        color: var(--icon-color, var(--sando-icon-color-emphasis));
      }

      :host([color='brand']) .icon-wrapper {
        color: var(--icon-color, var(--sando-icon-color-brand));
      }

      :host([color='onSolid']) .icon-wrapper {
        color: var(--icon-color, var(--sando-icon-color-onSolid));
      }

      /* Inherit color from parent */
      :host([inherit-color]) .icon-wrapper {
        color: currentColor;
      }

      /* Transformations */
      :host([flip-horizontal]) .icon-wrapper {
        transform: scaleX(-1);
      }

      :host([flip-vertical]) .icon-wrapper {
        transform: scaleY(-1);
      }

      :host([flip-horizontal][flip-vertical]) .icon-wrapper {
        transform: scale(-1);
      }

      :host([rotate='90']) .icon-wrapper {
        transform: rotate(90deg);
      }

      :host([rotate='180']) .icon-wrapper {
        transform: rotate(180deg);
      }

      :host([rotate='270']) .icon-wrapper {
        transform: rotate(270deg);
      }

      /* Combined transforms */
      :host([rotate='90'][flip-horizontal]) .icon-wrapper {
        transform: rotate(90deg) scaleX(-1);
      }

      :host([rotate='90'][flip-vertical]) .icon-wrapper {
        transform: rotate(90deg) scaleY(-1);
      }

      :host([rotate='180'][flip-horizontal]) .icon-wrapper {
        transform: rotate(180deg) scaleX(-1);
      }

      :host([rotate='180'][flip-vertical]) .icon-wrapper {
        transform: rotate(180deg) scaleY(-1);
      }

      :host([rotate='270'][flip-horizontal]) .icon-wrapper {
        transform: rotate(270deg) scaleX(-1);
      }

      :host([rotate='270'][flip-vertical]) .icon-wrapper {
        transform: rotate(270deg) scaleY(-1);
      }

      /* SVG styling */
      .icon-wrapper ::slotted(svg),
      .icon-wrapper svg {
        width: 100%;
        height: 100%;
        stroke: currentColor;
        fill: none;
      }

      /* Error state */
      .error {
        color: var(--sando-color-text-caption);
        font-size: 0.75rem;
      }

      /* Loading state */
      .loading {
        opacity: 0.5;
      }
    `
  ];

  /**
   * Load icon SVG when component connects to DOM
   */
  connectedCallback() {
    super.connectedCallback();
    this.loadIcon();
  }

  /**
   * Reload icon if name changes
   */
  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('name')) {
      this.loadIcon();
    }

    // Update CSS custom properties for custom size/color
    if (changedProperties.has('customSize')) {
      this.style.setProperty('--icon-size', this.customSize || '');
    }
    if (changedProperties.has('customColor')) {
      this.style.setProperty('--icon-color', this.customColor || '');
    }
  }

  /**
   * Load icon SVG from manifest
   */
  private async loadIcon() {
    if (!this.name) {
      this.error = 'Icon name is required';
      return;
    }

    // Validate icon name
    if (!isValidIconName(this.name)) {
      this.error = `Invalid icon name: "${this.name}"`;
      this.dispatchEvent(
        new CustomEvent('icon-error', {
          detail: { iconName: this.name, error: this.error },
          bubbles: true,
          composed: true
        })
      );
      return;
    }

    this.isLoading = true;
    this.error = null;

    try {
      // Load SVG content
      let svg = await loadIconSvg(this.name);

      // Apply stroke-width if different from default (2)
      if (this.strokeWidth !== 2) {
        svg = svg.replace(/stroke-width="2"/, `stroke-width="${this.strokeWidth}"`);
      }

      this.svgContent = svg;
      this.isLoading = false;

      // Dispatch success event
      this.dispatchEvent(
        new CustomEvent('icon-load', {
          detail: { iconName: this.name, success: true },
          bubbles: true,
          composed: true
        })
      );
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to load icon';
      this.isLoading = false;

      // Dispatch error event
      this.dispatchEvent(
        new CustomEvent('icon-error', {
          detail: { iconName: this.name, error: this.error },
          bubbles: true,
          composed: true
        })
      );
    }
  }

  render() {
    const classes = {
      'icon-wrapper': true,
      loading: this.isLoading
    };

    // Error state
    if (this.error) {
      return html`<span class="error" role="alert">${this.error}</span>`;
    }

    // Loading or empty state
    if (this.isLoading || !this.svgContent) {
      return html`<span class=${classMap(classes)}></span>`;
    }

    // Render icon
    return html`
      <span
        class=${classMap(classes)}
        role=${this.decorative ? 'presentation' : 'img'}
        aria-label=${this.ariaLabel || (this.decorative ? '' : this.name)}
        aria-hidden=${this.decorative ? 'true' : 'false'}
      >
        ${unsafeHTML(this.svgContent)}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-icon': SandoIcon;
  }
}
