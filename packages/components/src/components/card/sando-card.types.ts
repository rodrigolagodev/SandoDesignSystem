/**
 * Sando Card — TypeScript Type Definitions
 */

/**
 * Visual style variant of the card.
 * - `elevated` — drop shadow, raised surface (default)
 * - `outlined` — border separation, no shadow
 * - `filled` — tinted background, no shadow, no border
 */
export type CardVariant = 'elevated' | 'outlined' | 'filled';

/**
 * Internal padding of the card sections (header, body, footer).
 * The media slot is always flush to card edges regardless of padding.
 */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

/**
 * Border radius of the card container.
 * - `none` — no rounding
 * - `default` — standard radius from design tokens
 * - `full` — pill/fully rounded edges
 */
export type CardRadius = 'none' | 'default' | 'full';

/**
 * Layout direction of the card.
 * - `vertical` — stacked (media top, content below) — default
 * - `horizontal` — side-by-side (media left, content right)
 */
export type CardOrientation = 'vertical' | 'horizontal';

/**
 * Semantic heading level for the auto-generated heading element.
 * Only applies when the `heading` property is set.
 * @default 3
 */
export type HeadingLevel = 2 | 3 | 4 | 5 | 6;

/**
 * Event detail payload for `sando-card-click`.
 */
export interface CardClickEventDetail {
  /** The original DOM event that triggered the card activation. */
  originalEvent: Event;
}

/**
 * Custom event fired when a `clickable` card is activated.
 */
export type CardClickEvent = CustomEvent<CardClickEventDetail>;

/**
 * Public props interface for `sando-card`.
 */
export interface SandoCardProps {
  /** Visual style variant. @default 'elevated' */
  variant?: CardVariant;
  /** Internal padding for header, body, footer sections. @default 'md' */
  padding?: CardPadding;
  /** Border radius. @default 'default' */
  radius?: CardRadius;
  /** Layout direction. @default 'vertical' */
  orientation?: CardOrientation;
  /** Stretch card to 100% of its container width. @default false */
  fullWidth?: boolean;
  /** URL to navigate to. When set, card overlay renders as `<a>`. */
  href?: string;
  /** Where to open the linked document. */
  target?: '_self' | '_blank' | '_parent' | '_top';
  /** Relationship between current and linked document. */
  rel?: string;
  /** When true, card is clickable and fires `sando-card-click`. @default false */
  clickable?: boolean;
  /** When true, card shows hover styles without being interactive. @default false */
  hoverable?: boolean;
  /** When true, card interaction is blocked. @default false */
  disabled?: boolean;
  /** When true, replaces card content with skeleton loading state. @default false */
  loading?: boolean;
  /** Auto-generated heading text. Renders as `<hN>` with unique id. */
  heading?: string;
  /** Heading element level. @default 3 */
  headingLevel?: HeadingLevel;
  /** Accessible label applied to the surface-action overlay. */
  ariaLabel?: string | null;
}
