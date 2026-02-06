import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-badge.js';
import '../icon/sando-icon.js';

/**
 * Badges are purely informative labels for displaying states, categories, and quick visual tags.
 * Unlike interactive components, badges are **completely non-interactive** (no clicks, no hover states).
 *
 * ## Use Cases
 *
 * - **Status indicators**: "Active", "Pending", "Completed"
 * - **Labels**: "New", "Beta", "Deprecated"
 * - **Categories**: "Design", "Development", "Testing"
 *
 * ## Semantic Icons
 *
 * Badge automatically displays semantic icons for status colors. Icons appear on the **LEFT** side.
 *
 * | Color     | Icon           | Meaning                    |
 * |-----------|----------------|----------------------------|
 * | `success` | check          | Completed, valid, active   |
 * | `warning` | triangle-alert | Attention, caution         |
 * | `danger`  | circle-alert   | Error, critical            |
 * | `info`    | info           | Information, note          |
 * | `neutral` | (none)         | No semantic icon           |
 * | `primary` | (none)         | No semantic icon           |
 *
 * Use `icon` prop to override default icon, or `no-icon` to hide icons completely.
 *
 * ## Key Differences from Tag
 *
 * | Feature | Badge | Tag |
 * |---------|-------|-----|
 * | Interactivity | None | Clickable, removable |
 * | Use case | Status/labels | Actions/filters |
 * | Icon position | LEFT (automatic) | RIGHT (user-provided) |
 *
 * ## Accessibility
 *
 * - Uses `role="status"` for screen reader announcements
 * - Colors have sufficient contrast ratios
 * - Content is readable at all sizes
 * - Semantic icons reinforce color meaning for colorblind users
 */
const meta: Meta = {
  title: 'Components/Badge',
  component: 'sando-badge',
  tags: ['autodocs'],
  render: (args) => html`
    <sando-badge
      flavor="${args.flavor || 'original'}"
      color="${args.color}"
      variant="${args.variant}"
      size="${args.size}"
      ?compact="${args.compact}"
      icon="${args.icon || ''}"
      ?no-icon="${args.noIcon}"
    >
      ${args.label}
    </sando-badge>
  `,
  argTypes: {
    flavor: {
      control: 'select',
      options: ['original', 'strawberry', 'tonkatsu', 'kiwi', 'egg-salad'],
      description: 'Design system flavor/theme',
      table: {
        category: 'Theming',
        type: { summary: 'string' },
        defaultValue: { summary: 'original' }
      }
    },
    color: {
      control: 'select',
      options: ['neutral', 'primary', 'success', 'warning', 'danger', 'info'],
      description: 'Semantic color of the badge',
      table: {
        category: 'Appearance',
        type: { summary: "'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'" },
        defaultValue: { summary: 'neutral' }
      }
    },
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline', 'surface'],
      description: 'Visual style variant',
      table: {
        category: 'Appearance',
        type: { summary: "'solid' | 'soft' | 'outline' | 'surface'" },
        defaultValue: { summary: 'solid' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' }
      }
    },
    compact: {
      control: 'boolean',
      description: 'Reduces padding for tight spaces',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    icon: {
      control: 'text',
      description:
        'Custom icon name to override the default semantic icon. Use Lucide icon names (e.g., "star", "heart", "zap").',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    noIcon: {
      control: 'boolean',
      description: 'Hides the icon completely, even for semantic colors with default icons',
      table: {
        category: 'Content',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    label: {
      control: 'text',
      description: 'Badge text content',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    }
  },
  args: {
    flavor: 'original',
    color: 'neutral',
    variant: 'solid',
    size: 'md',
    compact: false,
    icon: '',
    noIcon: false,
    label: 'Badge'
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
 * Default badge with neutral color and solid variant.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 */
export const Playground: Story = {
  args: {
    label: 'Customize me!'
  }
};

// ============================================================================
// COLORS
// ============================================================================

/**
 * All semantic colors available for badges.
 * Each color conveys a different meaning/context.
 */
export const Colors: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <sando-badge color="neutral">Neutral</sando-badge>
      <sando-badge color="primary">Primary</sando-badge>
      <sando-badge color="success">Success</sando-badge>
      <sando-badge color="warning">Warning</sando-badge>
      <sando-badge color="danger">Danger</sando-badge>
      <sando-badge color="info">Info</sando-badge>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// VARIANTS
// ============================================================================

/**
 * All visual variants for badges.
 * Each variant provides different levels of visual emphasis.
 */
export const Variants: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Solid (High Emphasis)
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="neutral" variant="solid">Neutral</sando-badge>
          <sando-badge color="primary" variant="solid">Primary</sando-badge>
          <sando-badge color="success" variant="solid">Success</sando-badge>
          <sando-badge color="warning" variant="solid">Warning</sando-badge>
          <sando-badge color="danger" variant="solid">Danger</sando-badge>
          <sando-badge color="info" variant="solid">Info</sando-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Soft (Medium Emphasis)
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="neutral" variant="soft">Neutral</sando-badge>
          <sando-badge color="primary" variant="soft">Primary</sando-badge>
          <sando-badge color="success" variant="soft">Success</sando-badge>
          <sando-badge color="warning" variant="soft">Warning</sando-badge>
          <sando-badge color="danger" variant="soft">Danger</sando-badge>
          <sando-badge color="info" variant="soft">Info</sando-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Outline (Low Emphasis)
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="neutral" variant="outline">Neutral</sando-badge>
          <sando-badge color="primary" variant="outline">Primary</sando-badge>
          <sando-badge color="success" variant="outline">Success</sando-badge>
          <sando-badge color="warning" variant="outline">Warning</sando-badge>
          <sando-badge color="danger" variant="outline">Danger</sando-badge>
          <sando-badge color="info" variant="outline">Info</sando-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Surface (Raised Background)
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="neutral" variant="surface">Neutral</sando-badge>
          <sando-badge color="primary" variant="surface">Primary</sando-badge>
          <sando-badge color="success" variant="surface">Success</sando-badge>
          <sando-badge color="warning" variant="surface">Warning</sando-badge>
          <sando-badge color="danger" variant="surface">Danger</sando-badge>
          <sando-badge color="info" variant="surface">Info</sando-badge>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// SIZES
// ============================================================================

/**
 * All size options for badges.
 * Choose based on context and hierarchy needs.
 */
export const Sizes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-badge size="sm">Small</sando-badge>
      <sando-badge size="md">Medium</sando-badge>
      <sando-badge size="lg">Large</sando-badge>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// COMPACT MODE
// ============================================================================

/**
 * Compact mode reduces vertical padding for tight spaces.
 * Works with all size variants.
 */
export const Compact: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Normal vs Compact
        </h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
            <sando-badge size="md">Normal</sando-badge>
            <span style="font-size: 0.75rem; color: #a3a3a3;">Default padding</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
            <sando-badge size="md" compact>Compact</sando-badge>
            <span style="font-size: 0.75rem; color: #a3a3a3;">Reduced padding</span>
          </div>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Compact Sizes Comparison
        </h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-badge size="sm" compact>Small Compact</sando-badge>
          <sando-badge size="md" compact>Medium Compact</sando-badge>
          <sando-badge size="lg" compact>Large Compact</sando-badge>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// SEMANTIC ICONS (NEW FEATURE)
// ============================================================================

/**
 * Semantic colors automatically display icons for better accessibility.
 * Icons appear on the LEFT side of the badge text.
 *
 * - **success**: check icon
 * - **warning**: triangle-alert icon
 * - **danger**: circle-alert icon
 * - **info**: info icon
 */
export const WithIcons: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Semantic Colors with Default Icons
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="success">Active</sando-badge>
          <sando-badge color="warning">Pending</sando-badge>
          <sando-badge color="danger">Error</sando-badge>
          <sando-badge color="info">New</sando-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Non-Semantic Colors (No Default Icon)
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="neutral">Neutral</sando-badge>
          <sando-badge color="primary">Primary</sando-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          All Variants with Icons
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="success" variant="solid">Solid</sando-badge>
          <sando-badge color="success" variant="soft">Soft</sando-badge>
          <sando-badge color="success" variant="outline">Outline</sando-badge>
          <sando-badge color="success" variant="surface">Surface</sando-badge>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Use the `icon` prop to override the default semantic icon with a custom one.
 * You can also add icons to non-semantic colors this way.
 */
export const CustomIcon: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Override Default Icon
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
          <sando-badge color="success">Default (check)</sando-badge>
          <span style="color: #a3a3a3;">→</span>
          <sando-badge color="success" icon="thumbs-up">Custom (thumbs-up)</sando-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Add Icons to Non-Semantic Colors
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="neutral" icon="star">Featured</sando-badge>
          <sando-badge color="primary" icon="crown">Premium</sando-badge>
          <sando-badge color="neutral" icon="zap">Fast</sando-badge>
          <sando-badge color="primary" icon="heart">Favorite</sando-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Creative Status Examples
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="success" icon="rocket">Launched</sando-badge>
          <sando-badge color="warning" icon="hourglass">In Progress</sando-badge>
          <sando-badge color="danger" icon="ban">Blocked</sando-badge>
          <sando-badge color="info" icon="lightbulb">Idea</sando-badge>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Use the `no-icon` attribute to hide icons completely, even for semantic colors
 * that would normally display default icons.
 */
export const NoIcon: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          With Icon vs Without Icon
        </h4>
        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
          <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
            <sando-badge color="success">Active</sando-badge>
            <span style="font-size: 0.75rem; color: #a3a3a3;">Default (with icon)</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
            <sando-badge color="success" no-icon>Active</sando-badge>
            <span style="font-size: 0.75rem; color: #a3a3a3;">With no-icon</span>
          </div>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          All Semantic Colors - Text Only
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="success" no-icon>Success</sando-badge>
          <sando-badge color="warning" no-icon>Warning</sando-badge>
          <sando-badge color="danger" no-icon>Danger</sando-badge>
          <sando-badge color="info" no-icon>Info</sando-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          When to Use no-icon
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="success" no-icon size="sm" compact>3</sando-badge>
          <sando-badge color="danger" no-icon size="sm" compact>!</sando-badge>
          <sando-badge color="info" no-icon size="sm" compact>NEW</sando-badge>
        </div>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem; color: #6b7280;">
          Useful for compact indicators or when the text is self-explanatory.
        </p>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Visual comparison showing how Badge and Tag handle icons differently.
 * Badge icons appear on the LEFT, Tag icons on the RIGHT.
 */
export const IconComparison: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Badge: Icon on LEFT (Automatic for Semantic Colors)
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="success">Active</sando-badge>
          <sando-badge color="warning">Pending</sando-badge>
          <sando-badge color="danger">Error</sando-badge>
          <sando-badge color="info">New</sando-badge>
        </div>
        <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem; color: #6b7280;">
          Badge is purely informational. Icons reinforce the semantic meaning.
        </p>
      </div>

      <div
        style="padding: 1rem; background: #f5f5f4; border-radius: 8px; border: 1px dashed #d6d3d1;"
      >
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">Key Differences</h4>
        <table style="font-size: 0.875rem; width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb; font-weight: 500;">
              Feature
            </td>
            <td style="padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb;">Badge</td>
            <td style="padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb;">Tag</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb; font-weight: 500;">
              Icon Position
            </td>
            <td style="padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb;">LEFT (leading)</td>
            <td style="padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb;">RIGHT (trailing)</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb; font-weight: 500;">
              Icon Source
            </td>
            <td style="padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb;">
              Automatic (semantic)
            </td>
            <td style="padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb;">User-provided</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem 0; font-weight: 500;">Interactivity</td>
            <td style="padding: 0.5rem 0;">None</td>
            <td style="padding: 0.5rem 0;">Clickable, removable</td>
          </tr>
        </table>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Which to Choose?
        </h4>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 500; color: #374151;">
              Use Badge for:
            </p>
            <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.75rem; color: #6b7280;">
              <li>Status indicators</li>
              <li>Labels and categories</li>
              <li>Read-only information</li>
            </ul>
          </div>
          <div>
            <p style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 500; color: #374151;">
              Use Tag for:
            </p>
            <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.75rem; color: #6b7280;">
              <li>Filters and selections</li>
              <li>Removable items</li>
              <li>Interactive actions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// WITH SLOTTED ICONS (LEGACY)
// ============================================================================

/**
 * Legacy approach: Badges can include slotted icons for additional context.
 * **Prefer using the `icon` prop instead** for automatic icon handling.
 *
 * @deprecated Use `icon` prop or semantic colors instead of slotted icons.
 */
export const WithSlottedIcon: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Status with Icons
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="success" variant="solid">
            <sando-icon name="check" size="xs"></sando-icon>
            Active
          </sando-badge>
          <sando-badge color="warning" variant="solid">
            <sando-icon name="clock" size="xs"></sando-icon>
            Pending
          </sando-badge>
          <sando-badge color="danger" variant="solid">
            <sando-icon name="x" size="xs"></sando-icon>
            Error
          </sando-badge>
          <sando-badge color="info" variant="solid">
            <sando-icon name="info" size="xs"></sando-icon>
            Info
          </sando-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Categories with Icons
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="primary" variant="soft">
            <sando-icon name="palette" size="xs"></sando-icon>
            Design
          </sando-badge>
          <sando-badge color="primary" variant="soft">
            <sando-icon name="code" size="xs"></sando-icon>
            Development
          </sando-badge>
          <sando-badge color="primary" variant="soft">
            <sando-icon name="test-tube-2" size="xs"></sando-icon>
            Testing
          </sando-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Labels with Icons
        </h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="info" variant="outline">
            <sando-icon name="sparkles" size="xs"></sando-icon>
            New
          </sando-badge>
          <sando-badge color="warning" variant="outline">
            <sando-icon name="flask-conical" size="xs"></sando-icon>
            Beta
          </sando-badge>
          <sando-badge color="danger" variant="outline">
            <sando-icon name="archive" size="xs"></sando-icon>
            Deprecated
          </sando-badge>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// ALL COMBINATIONS
// ============================================================================

/**
 * Complete matrix showing all 24 color × variant combinations.
 * Useful for visual testing and design review.
 */
export const AllCombinations: Story = {
  tags: DOCS_ONLY,
  render: () => {
    const colors = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const;
    const variants = ['solid', 'soft', 'outline', 'surface'] as const;

    return html`
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        ${variants.map(
          (variant) => html`
            <div>
              <h4
                style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c; text-transform: capitalize;"
              >
                ${variant}
              </h4>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${colors.map(
                  (color) => html`
                    <sando-badge color="${color}" variant="${variant}"
                      >${color.charAt(0).toUpperCase() + color.slice(1)}</sando-badge
                    >
                  `
                )}
              </div>
            </div>
          `
        )}
      </div>
    `;
  },
  parameters: { controls: { disable: true } }
};

// ============================================================================
// USE CASES
// ============================================================================

/**
 * Real-world examples showing common badge use cases.
 */
export const UseCases: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Status Indicators -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: #374151;">Status Indicators</h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="success" variant="solid">Active</sando-badge>
          <sando-badge color="warning" variant="solid">Pending</sando-badge>
          <sando-badge color="success" variant="soft">Completed</sando-badge>
          <sando-badge color="danger" variant="solid">Expired</sando-badge>
          <sando-badge color="neutral" variant="soft">Draft</sando-badge>
        </div>
      </div>

      <!-- Labels -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: #374151;">Labels</h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="info" variant="solid">New</sando-badge>
          <sando-badge color="warning" variant="outline">Beta</sando-badge>
          <sando-badge color="danger" variant="outline">Deprecated</sando-badge>
          <sando-badge color="primary" variant="solid">Pro</sando-badge>
          <sando-badge color="success" variant="outline">Featured</sando-badge>
        </div>
      </div>

      <!-- Categories -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: #374151;">Categories</h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="primary" variant="soft">Design</sando-badge>
          <sando-badge color="primary" variant="soft">Development</sando-badge>
          <sando-badge color="primary" variant="soft">Testing</sando-badge>
          <sando-badge color="primary" variant="soft">Documentation</sando-badge>
          <sando-badge color="primary" variant="soft">Research</sando-badge>
        </div>
      </div>

      <!-- Priority Levels -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: #374151;">Priority Levels</h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="danger" variant="solid">Critical</sando-badge>
          <sando-badge color="warning" variant="solid">High</sando-badge>
          <sando-badge color="info" variant="solid">Medium</sando-badge>
          <sando-badge color="neutral" variant="solid">Low</sando-badge>
        </div>
      </div>

      <!-- User Roles -->
      <div>
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: #374151;">User Roles</h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <sando-badge color="primary" variant="solid">Admin</sando-badge>
          <sando-badge color="success" variant="soft">Editor</sando-badge>
          <sando-badge color="neutral" variant="soft">Viewer</sando-badge>
          <sando-badge color="warning" variant="outline">Guest</sando-badge>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// IN CONTEXT
// ============================================================================

/**
 * Badges in real UI contexts: cards, lists, and tables.
 */
export const InContext: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
      <!-- Card Example -->
      <div
        style="padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #fafafa;"
      >
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <h3 style="margin: 0; font-size: 1rem; font-weight: 600;">Project Alpha</h3>
              <sando-badge color="success" size="sm" compact>Active</sando-badge>
              <sando-badge color="info" size="sm" compact variant="outline">v2.0</sando-badge>
            </div>
            <p style="margin: 0; font-size: 0.875rem; color: #6b7280;">
              Main project dashboard with real-time analytics.
            </p>
          </div>
        </div>
        <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
          <sando-badge color="primary" variant="soft" size="sm">React</sando-badge>
          <sando-badge color="primary" variant="soft" size="sm">TypeScript</sando-badge>
          <sando-badge color="primary" variant="soft" size="sm">GraphQL</sando-badge>
        </div>
      </div>

      <!-- List Example -->
      <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div
          style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #e5e7eb;"
        >
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 0.875rem; font-weight: 500;">Invoice #1234</span>
            <sando-badge color="success" size="sm">Paid</sando-badge>
          </div>
          <span style="font-size: 0.875rem; color: #6b7280;">$1,250.00</span>
        </div>
        <div
          style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #e5e7eb;"
        >
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 0.875rem; font-weight: 500;">Invoice #1235</span>
            <sando-badge color="warning" size="sm">Pending</sando-badge>
          </div>
          <span style="font-size: 0.875rem; color: #6b7280;">$890.00</span>
        </div>
        <div
          style="display: flex; justify-content: space-between; align-items: center; padding: 1rem;"
        >
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 0.875rem; font-weight: 500;">Invoice #1236</span>
            <sando-badge color="danger" size="sm">Overdue</sando-badge>
          </div>
          <span style="font-size: 0.875rem; color: #6b7280;">$2,100.00</span>
        </div>
      </div>

      <!-- Notification Example -->
      <div
        style="display: flex; align-items: flex-start; gap: 0.75rem; padding: 1rem; background: #fef3c7; border-radius: 8px;"
      >
        <sando-badge color="warning" variant="solid" size="sm" compact>
          <sando-icon name="alert-triangle" size="xs"></sando-icon>
        </sando-badge>
        <div>
          <p style="margin: 0; font-size: 0.875rem; font-weight: 500; color: #92400e;">
            Your trial ends in 3 days
          </p>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.75rem; color: #a16207;">
            Upgrade to Pro to continue using all features.
          </p>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
