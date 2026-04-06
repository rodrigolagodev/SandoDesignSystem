import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-avatar.js';

/**
 * # Avatar Component
 *
 * Displays a user's profile image, initials, or a generic person icon fallback.
 * Supports presence indicators, multiple sizes, shapes, and optional link behavior.
 *
 * ## Fallback chain
 *
 * The avatar resolves its content in this order:
 * 1. **Image** — renders `<img>` when `src` is provided and loads successfully
 * 2. **Initials** — extracts up to 2 characters from `name` (e.g. "Rodrigo García" → "RG")
 * 3. **Icon** — generic person SVG when neither `src` nor `name` is available
 *
 * ## Rendering as link
 *
 * When `href` is provided, the avatar renders as an `<a>` element with a visible
 * focus ring and hover opacity. Use `target="_blank"` with caution — it automatically
 * adds `rel="noopener noreferrer"`.
 *
 * ## Accessibility
 *
 * - Static avatars render with `role="img"` and a descriptive `aria-label`
 * - Interactive avatars render as `<a>` with `aria-label="Go to [name]'s profile"`
 * - Presence indicators include a visually hidden `<span>` for screen readers
 * - Image `alt` falls back to `name` if not explicitly provided
 */
const meta: Meta = {
  title: 'Components/Avatar',
  component: 'sando-avatar',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-avatar
      src="${args.src || ''}"
      name="${args.name || ''}"
      size="${args.size}"
      shape="${args.shape}"
      presence="${args.presence}"
      presence-position="${args.presencePosition}"
      href="${args.href || ''}"
      target="${args.target || ''}"
      alt="${args.alt || ''}"
    ></sando-avatar>
  `,
  argTypes: {
    src: {
      control: 'text',
      description: 'URL of the avatar image. When omitted, falls back to initials or icon.',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    name: {
      control: 'text',
      description:
        'Full name of the person. Used to generate initials (up to 2 chars) and as `aria-label` fallback.',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image. Falls back to `name` when not provided.',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar (xs=24px, sm=32px, md=40px, lg=48px, xl=64px)',
      table: {
        category: 'Appearance',
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: 'md' }
      }
    },
    shape: {
      control: 'select',
      options: ['circle', 'rounded'],
      description: 'Border radius shape of the avatar.',
      table: {
        category: 'Appearance',
        type: { summary: "'circle' | 'rounded'" },
        defaultValue: { summary: 'circle' }
      }
    },
    presence: {
      control: 'select',
      options: ['none', 'online', 'offline', 'busy', 'away'],
      description: 'Presence status indicator. Use `none` to hide the dot.',
      table: {
        category: 'Presence',
        type: { summary: "'online' | 'offline' | 'busy' | 'away' | 'none'" },
        defaultValue: { summary: 'none' }
      }
    },
    presencePosition: {
      control: 'select',
      options: ['top-start', 'top-end', 'bottom-start', 'bottom-end'],
      description: 'Position of the presence indicator dot relative to the avatar.',
      table: {
        category: 'Presence',
        type: { summary: "'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'" },
        defaultValue: { summary: 'bottom-end' }
      }
    },
    href: {
      control: 'text',
      description:
        'URL to navigate to. When provided, renders the entire avatar as an `<a>` element.',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Where to open the linked document. Only used when `href` is provided.',
      table: {
        category: 'Behavior',
        type: { summary: "'_self' | '_blank' | '_parent' | '_top'" },
        defaultValue: { summary: '_self' }
      }
    }
  },
  args: {
    src: '',
    name: '',
    alt: '',
    size: 'md',
    shape: 'circle',
    presence: 'none',
    presencePosition: 'bottom-end',
    href: '',
    target: '_self'
  }
};

export default meta;
type Story = StoryObj;

// Tag constant for documentation-only stories (hidden from sidebar, shown in autodocs)
const DOCS_ONLY = { tags: ['!dev'] };

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default avatar with no props — shows the generic person icon fallback.
 * This is the zero-state of the component.
 */
export const Default: Story = {
  args: {
    src: '',
    name: '',
    size: 'md',
    shape: 'circle',
    presence: 'none'
  }
};

/**
 * Interactive playground — use the Controls panel to explore all props.
 */
export const Playground: Story = {
  name: 'Playground ↗',
  args: {
    src: 'https://i.pravatar.cc/150?img=3',
    name: 'Rodrigo García',
    size: 'md',
    shape: 'circle',
    presence: 'online',
    presencePosition: 'bottom-end'
  }
};

/**
 * Avatar with a real image loaded from a URL.
 * When the image fails to load, it falls back to initials or icon.
 */
export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    name: 'Ana López',
    size: 'md',
    shape: 'circle'
  }
};

/**
 * Avatar displaying initials when no `src` is provided.
 * Extracts the first letter of the first and last word in `name`.
 */
export const WithInitials: Story = {
  args: {
    name: 'Rodrigo García',
    size: 'md',
    shape: 'circle'
  }
};

/**
 * Clickable avatar that renders as an `<a>` element.
 * Gets a visible focus ring and hover opacity for interactive states.
 */
export const Clickable: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=5',
    name: 'Carlos Ruiz',
    href: '#profile',
    size: 'md',
    shape: 'circle'
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, shown in autodocs)
// ============================================================================

/**
 * All 5 size variants side by side.
 * - xs: 24px — compact inline indicators
 * - sm: 32px — tight spaces (comments, tables)
 * - md: 40px — default, most common use
 * - lg: 48px — profile cards, prominent displays
 * - xl: 64px — hero sections, settings pages
 */
export const Sizes: Story = {
  ...DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1.5rem; align-items: flex-end;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-avatar size="xs" name="XS"></sando-avatar>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">xs (24px)</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-avatar size="sm" name="SM"></sando-avatar>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">sm (32px)</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-avatar size="md" name="MD"></sando-avatar>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">md (40px)</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-avatar size="lg" name="LG"></sando-avatar>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">lg (48px)</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-avatar size="xl" name="XL"></sando-avatar>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">xl (64px)</span>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Circle vs rounded shapes — shown with initials and image variants.
 * Use `circle` for user profiles, `rounded` for teams or bots.
 */
export const Shapes: Story = {
  ...DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 3rem; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <sando-avatar shape="circle" name="Rodrigo García" size="lg"></sando-avatar>
          <sando-avatar
            shape="circle"
            src="https://i.pravatar.cc/150?img=2"
            name="Ana López"
            size="lg"
          ></sando-avatar>
        </div>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">circle</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <sando-avatar shape="rounded" name="Rodrigo García" size="lg"></sando-avatar>
          <sando-avatar
            shape="rounded"
            src="https://i.pravatar.cc/150?img=2"
            name="Ana López"
            size="lg"
          ></sando-avatar>
        </div>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">rounded</span>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All four presence status values plus the default `none` state.
 *
 * | Status  | Color | Meaning           |
 * |---------|-------|-------------------|
 * | online  | Green | Available         |
 * | away    | Amber | Temporarily away  |
 * | busy    | Red   | Do not disturb    |
 * | offline | Gray  | Disconnected      |
 */
export const WithPresence: Story = {
  ...DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: flex-end;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-avatar name="Ana López" presence="online" size="lg"></sando-avatar>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">online</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-avatar name="Carlos Ruiz" presence="away" size="lg"></sando-avatar>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">away</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-avatar name="María Torres" presence="busy" size="lg"></sando-avatar>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">busy</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-avatar name="Pedro Gómez" presence="offline" size="lg"></sando-avatar>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">offline</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-avatar name="Laura Fernández" presence="none" size="lg"></sando-avatar>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">none</span>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All four positions for the presence indicator dot.
 * Default is `bottom-end` (bottom-right in LTR layouts).
 */
export const PresencePositions: Story = {
  ...DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: flex-end;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-avatar
          name="Ana López"
          presence="online"
          presence-position="top-start"
          size="xl"
        ></sando-avatar>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">top-start</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-avatar
          name="Carlos Ruiz"
          presence="online"
          presence-position="top-end"
          size="xl"
        ></sando-avatar>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">top-end</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-avatar
          name="María Torres"
          presence="online"
          presence-position="bottom-start"
          size="xl"
        ></sando-avatar>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);"
          >bottom-start</span
        >
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-avatar
          name="Pedro Gómez"
          presence="online"
          presence-position="bottom-end"
          size="xl"
        ></sando-avatar>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">
          bottom-end (default)
        </span>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * The complete fallback chain — from image to initials to icon.
 *
 * 1. **Image** — `src` provided, renders `<img>` tag
 * 2. **Initials** — `src` omitted, `name` provided, renders up to 2 initials
 * 3. **Icon** — neither `src` nor `name`, renders generic person SVG
 */
export const FallbackChain: Story = {
  ...DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 3rem; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
        <sando-avatar
          src="https://i.pravatar.cc/150?img=7"
          name="Rodrigo García"
          size="xl"
        ></sando-avatar>
        <div style="text-align: center;">
          <span
            style="display: block; font-size: 0.875rem; font-weight: 500; color: var(--sando-color-text-body);"
          >
            Image
          </span>
          <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">
            src + name
          </span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
        <sando-avatar name="Rodrigo García" size="xl"></sando-avatar>
        <div style="text-align: center;">
          <span
            style="display: block; font-size: 0.875rem; font-weight: 500; color: var(--sando-color-text-body);"
          >
            Initials
          </span>
          <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">
            name only (no src)
          </span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
        <sando-avatar size="xl"></sando-avatar>
        <div style="text-align: center;">
          <span
            style="display: block; font-size: 0.875rem; font-weight: 500; color: var(--sando-color-text-body);"
          >
            Icon
          </span>
          <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">
            no src, no name
          </span>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Avatar as an interactive `<a>` element.
 * When `href` is set, the component renders as an anchor with focus ring and hover states.
 * `target="_blank"` automatically adds `rel="noopener noreferrer"`.
 */
export const AsLink: Story = {
  ...DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
        <sando-avatar
          src="https://i.pravatar.cc/150?img=10"
          name="Ana López"
          href="#ana-profile"
          size="lg"
        ></sando-avatar>
        <div style="text-align: center;">
          <span
            style="display: block; font-size: 0.875rem; font-weight: 500; color: var(--sando-color-text-body);"
          >
            Same tab
          </span>
          <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">
            href + target="_self"
          </span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
        <sando-avatar
          src="https://i.pravatar.cc/150?img=11"
          name="Carlos Ruiz"
          href="https://example.com/profile"
          target="_blank"
          size="lg"
        ></sando-avatar>
        <div style="text-align: center;">
          <span
            style="display: block; font-size: 0.875rem; font-weight: 500; color: var(--sando-color-text-body);"
          >
            New tab
          </span>
          <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">
            href + target="_blank"
          </span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
        <sando-avatar name="Guest" href="#profile" size="lg" presence="online"></sando-avatar>
        <div style="text-align: center;">
          <span
            style="display: block; font-size: 0.875rem; font-weight: 500; color: var(--sando-color-text-body);"
          >
            Link + presence
          </span>
          <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">
            href + presence="online"
          </span>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Real-world usage — an avatar group list as seen in user lists, comment threads,
 * or team member cards.
 */
export const InContext: Story = {
  ...DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 480px;">
      <!-- Team member list -->
      <div
        style="padding: 1.25rem; background: var(--sando-color-background-surface); border: 1px solid var(--sando-color-border-default); border-radius: 0.75rem;"
      >
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Team Members
        </h4>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <sando-avatar
              src="https://i.pravatar.cc/150?img=1"
              name="Ana López"
              size="sm"
              presence="online"
            ></sando-avatar>
            <div>
              <p
                style="margin: 0; font-size: 0.875rem; font-weight: 500; color: var(--sando-color-text-body);"
              >
                Ana López
              </p>
              <p style="margin: 0; font-size: 0.75rem; color: var(--sando-color-text-caption);">
                Product Designer
              </p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <sando-avatar
              src="https://i.pravatar.cc/150?img=8"
              name="Carlos Ruiz"
              size="sm"
              presence="busy"
            ></sando-avatar>
            <div>
              <p
                style="margin: 0; font-size: 0.875rem; font-weight: 500; color: var(--sando-color-text-body);"
              >
                Carlos Ruiz
              </p>
              <p style="margin: 0; font-size: 0.75rem; color: var(--sando-color-text-caption);">
                Frontend Engineer
              </p>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <sando-avatar name="María Torres" size="sm" presence="away"></sando-avatar>
            <div>
              <p
                style="margin: 0; font-size: 0.875rem; font-weight: 500; color: var(--sando-color-text-body);"
              >
                María Torres
              </p>
              <p style="margin: 0; font-size: 0.75rem; color: var(--sando-color-text-caption);">
                Engineering Manager
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stacked avatar group -->
      <div
        style="padding: 1.25rem; background: var(--sando-color-background-surface); border: 1px solid var(--sando-color-border-default); border-radius: 0.75rem;"
      >
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Collaborators
        </h4>
        <div style="display: flex; align-items: center;">
          <sando-avatar
            src="https://i.pravatar.cc/150?img=1"
            name="Ana López"
            size="md"
            style="margin-right: -0.75rem; z-index: 4;"
          ></sando-avatar>
          <sando-avatar
            src="https://i.pravatar.cc/150?img=8"
            name="Carlos Ruiz"
            size="md"
            style="margin-right: -0.75rem; z-index: 3;"
          ></sando-avatar>
          <sando-avatar
            name="María Torres"
            size="md"
            style="margin-right: -0.75rem; z-index: 2;"
          ></sando-avatar>
          <sando-avatar size="md" style="z-index: 1;"></sando-avatar>
          <span
            style="margin-left: 1.25rem; font-size: 0.875rem; color: var(--sando-color-text-caption);"
          >
            +12 more
          </span>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
