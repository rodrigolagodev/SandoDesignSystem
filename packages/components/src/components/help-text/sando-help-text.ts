/**
 * Sando Help Text Component
 *
 * An internal component used by form components (input, textarea, select, checkbox,
 * radio, switch) to display helper, error, success, or warning messages.
 *
 * PRIMARY PURPOSE: Prevent layout shift when error messages appear by reserving
 * vertical space even when no message is displayed.
 *
 * Typography: Uses fixed caption size regardless of parent component size
 * (industry standard per Carbon, MUI, Chakra, etc.)
 *
 * @element sando-help-text
 * @internal This component is primarily used internally by other form components
 *
 * @slot - Help text content (text message)
 *
 * @cssprop --sando-help-text-variant-default-textColor - Default text color
 * @cssprop --sando-help-text-variant-error-textColor - Error text color
 * @cssprop --sando-help-text-variant-success-textColor - Success text color
 * @cssprop --sando-help-text-variant-warning-textColor - Warning text color
 * @cssprop --sando-help-text-minHeight - Reserved space height
 * @cssprop --sando-help-text-animation-duration - Transition duration
 *
 * @example Basic usage
 * <sando-help-text>Enter your email address</sando-help-text>
 *
 * @example Error state
 * <sando-help-text variant="error" show-icon>
 *   This field is required
 * </sando-help-text>
 *
 * @example Success state
 * <sando-help-text variant="success" show-icon>
 *   Email address is valid
 * </sando-help-text>
 *
 * @example Without reserved space
 * <sando-help-text reserve-space="false">
 *   Optional helper text
 * </sando-help-text>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import type { HelpTextVariant } from './sando-help-text.types.js';
import type { IconName } from '../icon/icon-manifest.js';

import { FlavorableMixin } from '../../mixins/index.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, variantStyles } from './styles/index.js';

// Import sando-icon component
import '../icon/sando-icon.js';

/**
 * Icon names mapping for each variant
 * Using Lucide icons via sando-icon component
 */
const VARIANT_ICONS: Record<HelpTextVariant, IconName> = {
  default: 'info',
  error: 'circle-alert',
  success: 'circle-check',
  warning: 'triangle-alert'
} as const;

@customElement('sando-help-text')
export class SandoHelpText extends FlavorableMixin(LitElement) {
  /**
   * Visual variant determining color and icon style
   * @default 'default'
   */
  @property({ reflect: true })
  variant: HelpTextVariant = 'default';

  /**
   * Whether to show an icon based on variant
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-icon' })
  showIcon = false;

  /**
   * Whether to reserve vertical space to prevent layout shift
   * CRITICAL: This is the primary purpose of this component
   * @default true
   */
  @property({ reflect: true, attribute: 'reserve-space' })
  reserveSpace: 'true' | 'false' = 'true';

  /**
   * Track if slot has content for animation purposes
   */
  @state()
  private _hasContent = false;

  /**
   * Component styles - modular CSS imports
   * Order matters for specificity
   */
  static styles = [
    resetStyles, // Universal CSS reset (box-sizing, font inheritance)
    tokenStyles, // Design tokens (Ingredients, Flavors, Recipes)
    baseStyles, // Layout, typography, animation
    variantStyles // Default, error, success, warning colors
  ];

  /**
   * Handle slot change to detect if content exists
   */
  private _handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const assignedNodes = slot.assignedNodes({ flatten: true });
    // Check if any node has content (text or elements)
    this._hasContent = assignedNodes.some((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent?.trim() !== '';
      }
      return node.nodeType === Node.ELEMENT_NODE;
    });
  }

  /**
   * Get the appropriate ARIA role based on variant
   * - error: role="alert" (assertive announcement)
   * - others: role="status" (polite announcement)
   */
  private _getRole(): 'alert' | 'status' {
    return this.variant === 'error' ? 'alert' : 'status';
  }

  /**
   * Get the appropriate aria-live value based on variant
   * - error: assertive (immediate announcement)
   * - others: polite (wait for pause in speech)
   */
  private _getAriaLive(): 'assertive' | 'polite' {
    return this.variant === 'error' ? 'assertive' : 'polite';
  }

  /**
   * Render the appropriate icon for the current variant
   * Uses sando-icon component for consistent iconography
   */
  private _renderIcon() {
    if (!this.showIcon) return nothing;

    const iconName = VARIANT_ICONS[this.variant];

    return html`
      <span class="icon">
        <sando-icon name=${iconName} size="sm" inherit-color decorative></sando-icon>
      </span>
    `;
  }

  render() {
    const contentClasses = {
      content: true,
      empty: !this._hasContent
    };

    return html`
      <div class="help-text" role=${this._getRole()} aria-live=${this._getAriaLive()}>
        ${this._renderIcon()}
        <span class=${classMap(contentClasses)}>
          <slot @slotchange=${this._handleSlotChange}></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-help-text': SandoHelpText;
  }
}
