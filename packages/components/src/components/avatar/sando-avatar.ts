/**
 * Sando Avatar Component
 *
 * Displays a user's profile image, initials, or a generic person icon fallback.
 * Supports presence indicators, multiple sizes, shapes, and link behavior.
 *
 * ## Fallback chain
 * 1. `src` image (if provided and loads successfully)
 * 2. Initials extracted from `name` (up to 2 characters)
 * 3. Generic person icon SVG
 *
 * ## Rendering as link
 * When `href` is provided, the avatar renders as an `<a>` element with
 * proper focus ring and hover states.
 *
 * @element sando-avatar
 *
 * @cssprop --sando-avatar-size-xs-dimension - 24px width/height
 * @cssprop --sando-avatar-size-sm-dimension - 32px width/height
 * @cssprop --sando-avatar-size-md-dimension - 40px width/height (default)
 * @cssprop --sando-avatar-size-lg-dimension - 48px width/height
 * @cssprop --sando-avatar-size-xl-dimension - 64px width/height
 * @cssprop --sando-avatar-shape-circle - 50% border radius
 * @cssprop --sando-avatar-shape-rounded - Moderate border radius
 * @cssprop --sando-avatar-backgroundColor - Fallback background color
 * @cssprop --sando-avatar-textColor - Initials text color
 * @cssprop --sando-avatar-iconColor - Fallback icon color
 * @cssprop --sando-avatar-border-color - Subtle border color
 * @cssprop --sando-avatar-border-width - Border width
 * @cssprop --sando-avatar-interactive-focusOutlineColor - Focus ring color
 * @cssprop --sando-avatar-interactive-focusOutlineWidth - Focus ring width
 * @cssprop --sando-avatar-presence-online - Online indicator color (green)
 * @cssprop --sando-avatar-presence-offline - Offline indicator color (gray)
 * @cssprop --sando-avatar-presence-busy - Busy indicator color (red)
 * @cssprop --sando-avatar-presence-away - Away indicator color (amber)
 *
 * @example Image avatar
 * ```html
 * <sando-avatar src="/path/to/photo.jpg" name="Rodrigo García"></sando-avatar>
 * ```
 *
 * @example Initials fallback
 * ```html
 * <sando-avatar name="Rodrigo García"></sando-avatar>
 * ```
 *
 * @example With presence indicator
 * ```html
 * <sando-avatar name="Ana López" presence="online"></sando-avatar>
 * <sando-avatar name="Carlos Ruiz" presence="busy" presence-position="top-end"></sando-avatar>
 * ```
 *
 * @example As a link
 * ```html
 * <sando-avatar
 *   src="/photos/user.jpg"
 *   name="Rodrigo García"
 *   href="/profile/rodrigo"
 *   target="_blank"
 * ></sando-avatar>
 * ```
 *
 * @example Size variants
 * ```html
 * <sando-avatar size="xs" name="XS"></sando-avatar>
 * <sando-avatar size="sm" name="Small"></sando-avatar>
 * <sando-avatar size="md" name="Medium"></sando-avatar>
 * <sando-avatar size="lg" name="Large"></sando-avatar>
 * <sando-avatar size="xl" name="Extra Large"></sando-avatar>
 * ```
 *
 * @example Shape variants
 * ```html
 * <sando-avatar shape="circle" name="Circle"></sando-avatar>
 * <sando-avatar shape="rounded" name="Rounded"></sando-avatar>
 * ```
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import type {
  AvatarSize,
  AvatarShape,
  AvatarPresence,
  AvatarPresencePosition,
  AvatarTarget
} from './sando-avatar.types.js';
import { FlavorableMixin } from '../../mixins/index.js';
import '../icon/sando-icon.js';
import { resetStyles } from '../../styles/reset.css.js';
import { tokenStyles } from '../../styles/tokens.css.js';
import { baseStyles, sizeStyles, shapeStyles } from './styles/index.js';

/**
 * Human-readable presence label map for screen readers.
 */
const PRESENCE_LABELS: Record<Exclude<AvatarPresence, 'none'>, string> = {
  online: 'conectado',
  offline: 'desconectado',
  busy: 'ocupado',
  away: 'ausente'
};

@customElement('sando-avatar')
export class SandoAvatar extends FlavorableMixin(LitElement) {
  /**
   * Component styles — modular CSS in specificity order
   */
  static styles = [
    resetStyles, // Global CSS resets
    tokenStyles, // Design tokens (Ingredients, Flavors, Recipes)
    baseStyles, // Layout, typography, interactive states
    sizeStyles, // Size-based dimensions
    shapeStyles // Border radius shapes
  ];

  /**
   * URL of the avatar image.
   */
  @property({ type: String })
  src?: string;

  /**
   * Full name of the person.
   * Used to generate initials and as aria-label fallback.
   */
  @property({ type: String })
  name?: string;

  /**
   * Size of the avatar.
   * @default 'md'
   */
  @property({ reflect: true })
  size: AvatarSize = 'md';

  /**
   * Shape of the avatar.
   * @default 'circle'
   */
  @property({ reflect: true })
  shape: AvatarShape = 'circle';

  /**
   * Presence status indicator.
   * Shows a colored dot when not 'none'.
   * @default 'none'
   */
  @property({ reflect: true })
  presence: AvatarPresence = 'none';

  /**
   * Position of the presence indicator dot.
   * @default 'bottom-end'
   */
  @property({ reflect: true, attribute: 'presence-position' })
  presencePosition: AvatarPresencePosition = 'bottom-end';

  /**
   * URL to navigate to. When provided, renders the avatar as an <a> element.
   */
  @property({ type: String, reflect: true })
  href?: string;

  /**
   * Where to open the linked document.
   * Only relevant when href is provided.
   */
  @property({ reflect: true })
  target?: AvatarTarget;

  /**
   * Alt text for the image.
   * Falls back to `name` if not provided.
   */
  @property({ type: String })
  alt?: string;

  /**
   * Internal state: whether the image failed to load.
   * When true, falls back to initials or icon.
   */
  @state()
  private _imageError = false;

  /**
   * Extract up to 2 initials from a full name.
   *
   * Examples:
   * - "Rodrigo García" → "RG"
   * - "Rod" → "R"
   * - "Ana María López" → "AL"
   */
  private _getInitials(name: string): string {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return '';
    if (words.length === 1) return (words[0]?.[0] ?? '').toUpperCase();
    return ((words[0]?.[0] ?? '') + (words[words.length - 1]?.[0] ?? '')).toUpperCase();
  }

  /**
   * Build the aria-label for the avatar element.
   * Different when it's a link vs a static image.
   */
  private _getAriaLabel(): string {
    const personLabel = this.name ? `Avatar de ${this.name}` : 'Avatar de usuario';

    if (this.href) {
      return this.name ? `Ir al perfil de ${this.name}` : 'Ir al perfil';
    }

    return personLabel;
  }

  /**
   * Handle image load error — triggers fallback to initials/icon.
   */
  private _handleImageError() {
    this._imageError = true;
  }

  /**
   * Reset image error state when src changes.
   */
  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('src')) {
      this._imageError = false;
    }
  }

  /**
   * Render the avatar content based on fallback chain:
   * 1. src image (if available and not errored)
   * 2. Initials from name
   * 3. Generic person icon
   */
  private _renderContent() {
    // Show image if src is set and hasn't errored
    if (this.src && !this._imageError) {
      return html`
        <img
          class="avatar__image"
          src=${this.src}
          alt=${this.alt || this.name || ''}
          @error=${this._handleImageError}
          part="image"
        />
      `;
    }

    // Show initials if name is available
    if (this.name) {
      const initials = this._getInitials(this.name);
      if (initials) {
        return html`
          <span class="avatar__initials" aria-hidden="true" part="initials">${initials}</span>
        `;
      }
    }

    // Fallback: sando-icon component
    return html`
      <sando-icon
        class="avatar__icon"
        name="user-round"
        inherit-color
        decorative
        part="icon"
        custom-size="var(--_avatar-icon-size)"
      ></sando-icon>
    `;
  }

  /**
   * Render the presence indicator dot.
   * Returns nothing when presence is 'none'.
   */
  private _renderPresence() {
    if (this.presence === 'none') return nothing;

    const presenceLabel = PRESENCE_LABELS[this.presence];
    const positionClass = `avatar__presence--${this.presencePosition}`;
    const colorClass = `avatar__presence--${this.presence}`;

    return html`
      <span
        class="avatar__presence ${positionClass} ${colorClass}"
        part="presence"
        aria-hidden="true"
      ></span>
      <span class="sr-only">estado: ${presenceLabel}</span>
    `;
  }

  render() {
    const isInteractive = Boolean(this.href);

    const avatarClasses = classMap({
      avatar: true,
      'avatar--interactive': isInteractive
    });

    const ariaLabel = this._getAriaLabel();

    const innerContent = html` ${this._renderContent()} ${this._renderPresence()} `;

    // Render as <a> when href is provided
    if (isInteractive) {
      return html`
        <a
          class=${avatarClasses}
          href=${ifDefined(this.href)}
          target=${ifDefined(this.target)}
          rel=${this.target === '_blank' ? 'noopener noreferrer' : nothing}
          aria-label=${ariaLabel}
          part="avatar"
        >
          ${innerContent}
        </a>
      `;
    }

    // Render as static <div> with role="img"
    return html`
      <div class=${avatarClasses} role="img" aria-label=${ariaLabel} part="avatar">
        ${innerContent}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-avatar': SandoAvatar;
  }
}
