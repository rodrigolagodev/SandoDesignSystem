import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-card.js';
import '../button/sando-button.ts';

/**
 * The Card component is a versatile surface container that groups related
 * content and actions. It supports three visual variants, configurable
 * padding/radius/orientation, interactive modes (clickable or link), and
 * a skeleton loading state.
 *
 * ## Architecture: Pseudo-Interactive Surface (CA-LP-PIS)
 * The card host is **always** a `<div>` — never `<button>` or `<a>`.
 * When `clickable` or `href` is set, an internal `.card__surface-action`
 * overlay element handles interaction, keeping slotted content valid HTML.
 *
 * ## Slots
 * - **(default)** — Free-form body content
 * - **media** — Image/video, flush to card edges
 * - **header** — Full header override (takes precedence over `heading` prop)
 * - **header-action** — Top-right area (badge, icon), only when `header` slot is NOT used
 * - **footer** — CTA / action buttons area
 *
 * ## Accessibility
 * - `disabled` uses `aria-disabled="true"` (not native `disabled`) so the element
 *   remains discoverable by screen readers
 * - `loading` sets `aria-busy="true"` and removes the card from tab order
 * - Clickable cards use a `<button>` overlay; link cards use `<a>`
 * - The surface-action is labelled via `aria-labelledby` pointing to the heading,
 *   or an explicit `aria-label` when the heading prop is absent
 */
const meta: Meta = {
  title: 'Components/Card',
  component: 'sando-card',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-card
      flavor="${args.flavor || 'original'}"
      variant="${args.variant}"
      padding="${args.padding}"
      radius="${args.radius}"
      orientation="${args.orientation}"
      heading="${args.heading || ''}"
      heading-level="${args.headingLevel}"
      ?full-width="${args.fullWidth}"
      ?clickable="${args.clickable}"
      ?hoverable="${args.hoverable}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
      href="${args.href || ''}"
      target="${args.target || ''}"
      rel="${args.rel || ''}"
      aria-label="${args.ariaLabel || ''}"
    >
      ${args.body
        ? html`<p>${args.body}</p>`
        : html`<p>This card groups related content and surfaces a clear call to action.</p>`}
    </sando-card>
  `,
  argTypes: {
    // ── Appearance ──────────────────────────────────────────────────────
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Visual style variant of the card surface',
      table: {
        category: 'Appearance',
        type: { summary: "'elevated' | 'outlined' | 'filled'" },
        defaultValue: { summary: 'elevated' }
      }
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description:
        'Internal padding applied to header, body, and footer sections (media is always flush)',
      table: {
        category: 'Appearance',
        type: { summary: "'none' | 'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' }
      }
    },
    radius: {
      control: 'select',
      options: ['none', 'default', 'full'],
      description: 'Border radius of the card container',
      table: {
        category: 'Appearance',
        type: { summary: "'none' | 'default' | 'full'" },
        defaultValue: { summary: 'default' }
      }
    },
    // ── Layout ───────────────────────────────────────────────────────────
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout direction — vertical stacks media on top, horizontal places it left',
      table: {
        category: 'Layout',
        type: { summary: "'vertical' | 'horizontal'" },
        defaultValue: { summary: 'vertical' }
      }
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch the card to 100% width of its container',
      table: {
        category: 'Layout',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    // ── Interaction ──────────────────────────────────────────────────────
    clickable: {
      control: 'boolean',
      description:
        'Makes the card clickable — fires `sando-card-click` on activation. Ignored when `href` is also set.',
      table: {
        category: 'Interaction',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    hoverable: {
      control: 'boolean',
      description:
        'Applies hover styles without making the card interactive (ignored when `clickable` or `href` is set)',
      table: {
        category: 'Interaction',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    href: {
      control: 'text',
      description:
        'URL to navigate to. When set, the overlay renders as `<a>` and takes precedence over `clickable`.',
      table: {
        category: 'Interaction',
        type: { summary: 'string' }
      }
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Where to open the linked document (only relevant when `href` is set)',
      table: {
        category: 'Interaction',
        type: { summary: "'_self' | '_blank' | '_parent' | '_top'" },
        defaultValue: { summary: '_self' }
      }
    },
    rel: {
      control: 'text',
      description:
        'Relationship between the current and linked document. Auto-set to `noopener noreferrer` when `target="_blank"`.',
      table: {
        category: 'Interaction',
        type: { summary: 'string' }
      }
    },
    // ── State ─────────────────────────────────────────────────────────────
    disabled: {
      control: 'boolean',
      description:
        'Disables card interaction (uses `aria-disabled`, NOT native disabled — footer buttons remain usable)',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    loading: {
      control: 'boolean',
      description:
        'Replaces card content with a skeleton loading state and sets `aria-busy="true"`',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    // ── Content ──────────────────────────────────────────────────────────
    heading: {
      control: 'text',
      description:
        'Auto-generated heading text rendered as `<hN>` inside the card header. Ignored when the `header` slot is used.',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    headingLevel: {
      control: 'select',
      options: [2, 3, 4, 5, 6],
      description: 'Semantic heading level for the auto-generated heading element',
      table: {
        category: 'Content',
        type: { summary: '2 | 3 | 4 | 5 | 6' },
        defaultValue: { summary: '3' }
      }
    },
    body: {
      control: 'text',
      description: 'Body paragraph text (slot content for the Playground)',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    // ── Accessibility ─────────────────────────────────────────────────────
    ariaLabel: {
      control: 'text',
      description:
        'Accessible label for the surface-action overlay. Overrides `aria-labelledby` when set. Required for clickable/link cards without a heading.',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' }
      }
    },
    // ── Theming ───────────────────────────────────────────────────────────
    flavor: {
      control: 'select',
      options: ['original', 'strawberry', 'tonkatsu', 'kiwi', 'egg-salad'],
      description: 'Design system flavor/theme',
      table: {
        category: 'Theming',
        type: { summary: 'string' },
        defaultValue: { summary: 'original' }
      }
    }
  },
  args: {
    flavor: 'original',
    variant: 'elevated',
    padding: 'md',
    radius: 'default',
    orientation: 'vertical',
    clickable: false,
    hoverable: false,
    disabled: false,
    loading: false,
    fullWidth: false,
    heading: 'Card Title',
    headingLevel: 3,
    body: 'This card groups related content and surfaces a clear call to action.'
  }
};

export default meta;
type Story = StoryObj;

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default card with elevated variant, md padding, and body text.
 * Use the **Controls** panel to explore every prop interactively.
 */
export const Default: Story = {};

/**
 * Interactive playground — every prop is wired to the controls panel.
 * Adjust variant, padding, radius, interaction mode, and more.
 */
export const Playground: Story = {
  args: {
    heading: 'Customize me!',
    body: 'Use the controls panel on the right to explore every card prop.'
  }
};

/**
 * Clickable card — the entire surface activates on click, Enter, or Space.
 * Opens the **Actions** panel to see the `sando-card-click` custom event.
 *
 * > Note: the card host is always a `<div>`. The interactive overlay is an
 * > internal `<button class="card__surface-action">` (CA-LP-PIS pattern).
 */
export const Clickable: Story = {
  args: {
    heading: 'Clickable Card',
    clickable: true,
    body: 'Click anywhere on this card to fire the sando-card-click event.'
  },
  render: (args) => html`
    <sando-card
      flavor="${args.flavor || 'original'}"
      variant="${args.variant}"
      padding="${args.padding}"
      radius="${args.radius}"
      heading="${args.heading || ''}"
      ?clickable="${args.clickable}"
      ?disabled="${args.disabled}"
      style="max-width: 320px;"
    >
      <p>${args.body}</p>
    </sando-card>
  `
};

/**
 * Link card — the surface renders as an `<a>` element and navigates to `href`.
 * `target="_blank"` is set with automatic `rel="noopener noreferrer"`.
 */
export const LinkCard: Story = {
  args: {
    heading: 'Visit Example',
    href: 'https://example.com',
    target: '_blank',
    body: 'Click anywhere on this card to navigate to the linked URL in a new tab.'
  },
  render: (args) => html`
    <sando-card
      flavor="${args.flavor || 'original'}"
      variant="${args.variant}"
      padding="${args.padding}"
      radius="${args.radius}"
      heading="${args.heading || ''}"
      href="${args.href || ''}"
      target="${args.target || ''}"
      style="max-width: 320px;"
    >
      <p>${args.body}</p>
    </sando-card>
  `
};

/**
 * Loading state — all card content is replaced with a `<sando-skeleton-card>`
 * and `aria-busy="true"` is applied to the host element.
 */
export const Loading: Story = {
  args: {
    loading: true,
    heading: 'Loading Card'
  },
  render: (args) => html`
    <sando-card
      flavor="${args.flavor || 'original'}"
      variant="${args.variant}"
      padding="${args.padding}"
      radius="${args.radius}"
      ?loading="${args.loading}"
      style="max-width: 320px;"
    ></sando-card>
  `
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in autodocs / MDX)
// ============================================================================

/**
 * All three visual variants side by side: elevated, outlined, and filled.
 */
export const AllVariants: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: flex-start;">
      <sando-card variant="elevated" heading="Elevated" style="max-width: 260px; flex: 1;">
        <p>Drop shadow creates visual separation from the background surface.</p>
      </sando-card>
      <sando-card variant="outlined" heading="Outlined" style="max-width: 260px; flex: 1;">
        <p>Border defines the card boundary without adding shadow depth.</p>
      </sando-card>
      <sando-card variant="filled" heading="Filled" style="max-width: 260px; flex: 1;">
        <p>Tinted background distinguishes the card with a subtle fill.</p>
      </sando-card>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All padding levels: none, sm, md, lg.
 */
export const AllPadding: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: flex-start;">
      ${(['none', 'sm', 'md', 'lg'] as const).map(
        (p) => html`
          <sando-card
            variant="outlined"
            padding="${p}"
            heading="${p === 'none' ? 'none' : p}"
            style="max-width: 200px; flex: 1;"
          >
            <p style="font-size: 0.875rem; color: var(--sando-color-text-muted);">padding="${p}"</p>
          </sando-card>
        `
      )}
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All radius values: none, default, full.
 */
export const AllRadius: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: flex-start;">
      <sando-card
        variant="outlined"
        radius="none"
        heading="None"
        style="max-width: 220px; flex: 1;"
      >
        <p style="font-size: 0.875rem; color: var(--sando-color-text-muted);">
          radius="none" — sharp corners
        </p>
      </sando-card>
      <sando-card
        variant="outlined"
        radius="default"
        heading="Default"
        style="max-width: 220px; flex: 1;"
      >
        <p style="font-size: 0.875rem; color: var(--sando-color-text-muted);">
          radius="default" — standard rounding
        </p>
      </sando-card>
      <sando-card
        variant="outlined"
        radius="full"
        heading="Full"
        style="max-width: 220px; flex: 1;"
      >
        <p style="font-size: 0.875rem; color: var(--sando-color-text-muted);">
          radius="full" — pill / fully rounded
        </p>
      </sando-card>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Vertical vs horizontal orientation, both with a media slot image.
 */
export const Orientation: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 640px;">
      <div>
        <p
          style="font-size: 0.875rem; font-weight: 600; margin: 0 0 0.75rem 0; color: var(--sando-color-text-muted);"
        >
          orientation="vertical" (default)
        </p>
        <sando-card variant="outlined" orientation="vertical" heading="Vertical Layout">
          <img
            slot="media"
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=300&fit=crop"
            alt="Mountain landscape"
            style="width: 100%; display: block;"
          />
          <p>Media stacks on top; content flows below in a natural column layout.</p>
        </sando-card>
      </div>
      <div>
        <p
          style="font-size: 0.875rem; font-weight: 600; margin: 0 0 0.75rem 0; color: var(--sando-color-text-muted);"
        >
          orientation="horizontal"
        </p>
        <sando-card variant="outlined" orientation="horizontal" heading="Horizontal Layout">
          <img
            slot="media"
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
            alt="Mountain landscape"
            style="width: 100%; height: 100%; object-fit: cover; display: block;"
          />
          <p>Media sits on the left; content is placed to its right — ideal for list items.</p>
        </sando-card>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Card with media slot, body content, and a footer action button.
 */
export const WithMedia: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-card variant="elevated" heading="Mountain Escape" style="max-width: 360px;">
      <img
        slot="media"
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=720&h=400&fit=crop"
        alt="Scenic mountain landscape at golden hour"
        style="width: 100%; display: block;"
      />
      <p>Discover breathtaking alpine scenery with guided tours and comfortable lodges.</p>
      <sando-button slot="footer" variant="solid">Book Now</sando-button>
    </sando-card>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Heading prop at every semantic level (h2–h6).
 */
export const WithHeading: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 420px;">
      ${([2, 3, 4, 5, 6] as const).map(
        (level) => html`
          <sando-card variant="outlined" heading="Heading at h${level}" heading-level="${level}">
            <p style="font-size: 0.875rem; color: var(--sando-color-text-muted);">
              heading-level="${level}" — renders as &lt;h${level}&gt;
            </p>
          </sando-card>
        `
      )}
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Custom header slot — overrides the `heading` prop completely.
 * Use this for rich headers: avatars, user info, metadata rows, etc.
 */
export const WithHeaderSlot: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-card variant="elevated" style="max-width: 360px;">
      <div
        slot="header"
        style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.25rem;"
      >
        <div
          style="width: 40px; height: 40px; border-radius: 50%; background: var(--sando-color-background-overlay); display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--sando-color-text-on-solid); flex-shrink: 0;"
        >
          RG
        </div>
        <div>
          <p
            style="margin: 0; font-weight: 600; color: var(--sando-color-text-heading); line-height: 1.2;"
          >
            Rodrigo González
          </p>
          <p style="margin: 0; font-size: 0.75rem; color: var(--sando-color-text-muted);">
            Senior Designer · 2h ago
          </p>
        </div>
      </div>
      <p>
        Using the <code>header</code> slot lets you render any custom header structure — avatars,
        timestamps, user meta — with full layout control.
      </p>
    </sando-card>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * `header-action` slot — renders a badge or icon button in the top-right area.
 * Only available when the `header` slot is NOT used.
 */
export const WithHeaderAction: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-card variant="elevated" heading="Article Title" style="max-width: 360px;">
      <span
        slot="header-action"
        style="display: inline-flex; align-items: center; padding: 0.25rem 0.625rem; border-radius: 9999px; background: var(--sando-color-status-success-subtle, #dcfce7); color: var(--sando-color-status-success-emphasis, #166534); font-size: 0.75rem; font-weight: 600;"
      >
        ● Published
      </span>
      <p>
        The header-action slot occupies the top-right area of the card header, perfect for status
        badges, icon buttons, or contextual menus.
      </p>
    </sando-card>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Card with a footer containing CTA buttons.
 */
export const WithFooter: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-card variant="elevated" heading="Save Changes?" style="max-width: 360px;">
      <p>Your unsaved changes will be lost if you navigate away from this page without saving.</p>
      <div slot="footer" style="display: flex; gap: 0.75rem;">
        <sando-button variant="solid">Save</sando-button>
        <sando-button variant="ghost">Discard</sando-button>
      </div>
    </sando-card>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Disabled clickable card — interaction is blocked via `aria-disabled="true"`.
 * Note: footer buttons remain independently clickable (they sit above the overlay via z-index).
 */
export const Disabled: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: flex-start;">
      <sando-card
        variant="outlined"
        heading="Clickable (enabled)"
        clickable
        style="max-width: 280px; flex: 1;"
      >
        <p>This card is interactive. Click anywhere to trigger the event.</p>
      </sando-card>
      <sando-card
        variant="outlined"
        heading="Clickable (disabled)"
        clickable
        disabled
        style="max-width: 280px; flex: 1;"
      >
        <p>
          Interaction is blocked. The card is still discoverable by screen readers via
          <code>aria-disabled="true"</code>.
        </p>
        <sando-button slot="footer" variant="outline">Footer button (still works)</sando-button>
      </sando-card>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Hoverable card — shows hover styles without being interactive.
 * Automatically superseded when `clickable` or `href` is also set.
 */
export const Hoverable: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: flex-start;">
      <sando-card variant="elevated" heading="Normal Card" style="max-width: 280px; flex: 1;">
        <p>Static card — no hover effects applied.</p>
      </sando-card>
      <sando-card
        variant="elevated"
        heading="Hoverable Card"
        hoverable
        style="max-width: 280px; flex: 1;"
      >
        <p>Hover over this card to see the lift effect. It is not interactive — no event fires.</p>
      </sando-card>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Full-width card stretches to fill its container.
 */
export const FullWidth: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div
      style="max-width: 600px; border: 2px dashed var(--sando-color-border-muted); padding: 1rem;"
    >
      <p style="font-size: 0.75rem; color: var(--sando-color-text-muted); margin: 0 0 1rem 0;">
        Container (600px max-width)
      </p>
      <sando-card variant="outlined" heading="Full Width Card" full-width>
        <p>This card stretches to 100% of its parent container width.</p>
      </sando-card>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * The card component rendered across all available design system flavors.
 */
export const AllFlavors: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.5rem;"
    >
      ${(['original', 'strawberry', 'tonkatsu', 'kiwi', 'egg-salad'] as const).map(
        (flavor) => html`
          <div flavor="${flavor}">
            <sando-card variant="elevated" heading="${flavor}" style="width: 100%;">
              <p style="font-size: 0.875rem;">flavor="${flavor}" applied to ancestor element.</p>
              <sando-button slot="footer" variant="solid">Action</sando-button>
            </sando-card>
          </div>
        `
      )}
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Real-world composed card — article layout with media, heading, body, and footer CTAs.
 * Demonstrates the full slot composition in a realistic scenario.
 */
export const ComposedCard: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-card
      variant="elevated"
      heading="Designing for Accessibility First"
      heading-level="2"
      hoverable
      style="max-width: 400px;"
    >
      <img
        slot="media"
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=420&fit=crop"
        alt="Laptop on a wooden desk with code on screen"
        style="width: 100%; display: block;"
      />
      <span
        slot="header-action"
        style="display: inline-flex; align-items: center; padding: 0.2rem 0.5rem; border-radius: 9999px; background: var(--sando-color-background-overlay); color: var(--sando-color-text-muted); font-size: 0.75rem;"
      >
        5 min read
      </span>
      <p>
        Learn how to incorporate WCAG 2.1 AA guidelines from the very first line of code — not as an
        afterthought. We cover focus management, contrast ratios, and keyboard navigation patterns.
      </p>
      <div slot="footer" style="display: flex; gap: 0.75rem; align-items: center;">
        <sando-button variant="solid">Read Article</sando-button>
        <sando-button variant="ghost">Save</sando-button>
      </div>
    </sando-card>
  `,
  parameters: { controls: { disable: true } }
};
