import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import './sando-tag.ts';
import '../icon/sando-icon.ts';

/**
 * Tags are compact elements representing attributes, labels, or categories.
 * They feature a **mandatory icon** (default: circle-chevron-right) with specialized click behavior.
 *
 * ## Key Concept: Icon-Based Interaction
 *
 * Unlike traditional tags where the entire element is clickable, Sando Tags have a
 * **split interaction model** inspired by Strapi's Tag pattern:
 *
 * - **Content area**: Always display-only (not clickable)
 * - **Icon area**: Interactive element (button, link, or remove button)
 *
 * ## Interaction Modes (Mutually Exclusive)
 *
 * 1. **Removable** (highest priority) - X button replaces the icon
 *    - `removable=true` is **EXCLUSIVE**: ignores `clickable` and `href`
 *    - Only the X button is interactive → emits `sando-remove`
 *
 * 2. **Link** - Icon area is an anchor `<a>`
 *    - ONLY the icon navigates to the URL
 *    - Content is NOT clickable
 *
 * 3. **Clickable** - Icon area is a button
 *    - ONLY the icon is clickable → emits `sando-action`
 *    - Content is NOT clickable
 *
 * 4. **Informative** (default) - Display-only
 *    - Icon is visible but NOT interactive
 *    - No click events
 *
 * ## Features
 * - **Mandatory Icon**: Always shows an icon (default: circle-chevron-right)
 * - **Custom Icons**: Override default via `slot="icon"`
 * - **3 Variants**: solid, outline, soft
 * - **3 Sizes**: small, medium, large
 *
 * ## Accessibility
 * - Action buttons/links have descriptive aria-labels
 * - Disabled state properly communicated
 * - Focus management for keyboard navigation
 */
const meta: Meta = {
  title: 'Components/Tag',
  component: 'sando-tag',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-tag
      flavor="${args.flavor || 'original'}"
      variant="${args.variant}"
      size="${args.size}"
      ?removable="${args.removable}"
      ?clickable="${args.clickable}"
      ?disabled="${args.disabled}"
      href="${args.href || ''}"
      target="${args.target || ''}"
      @sando-remove="${action('sando-remove')}"
      @sando-action="${action('sando-action')}"
    >
      ${args.content}
      ${!args.removable && args.icon && args.icon !== 'circle-chevron-right'
        ? html`<sando-icon slot="icon" name="${args.icon}" size="xs"></sando-icon>`
        : ''}
    </sando-tag>
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
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft'],
      description: 'Visual style variant of the tag',
      table: {
        category: 'Appearance',
        type: { summary: "'solid' | 'outline' | 'soft'" },
        defaultValue: { summary: 'solid' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the tag',
      table: {
        category: 'Appearance',
        type: { summary: "'small' | 'medium' | 'large'" },
        defaultValue: { summary: 'medium' }
      }
    },
    removable: {
      control: 'boolean',
      description: 'Shows X button (replaces icon). EXCLUSIVE: ignores clickable/href.',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    clickable: {
      control: 'boolean',
      description: 'Makes only the icon area clickable. Ignored when removable=true.',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the tag interaction',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    href: {
      control: 'text',
      description: 'URL for icon navigation. Ignored when removable=true.',
      table: {
        category: 'Link',
        type: { summary: 'string' }
      }
    },
    target: {
      control: 'select',
      options: ['', '_self', '_blank', '_parent', '_top'],
      description: 'Link target (when href is set)',
      table: {
        category: 'Link',
        type: { summary: "'_self' | '_blank' | '_parent' | '_top'" }
      }
    },
    content: {
      control: 'text',
      description: 'Tag text content (default slot)',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    icon: {
      control: 'select',
      options: [
        'circle-chevron-right',
        'none',
        'star',
        'heart',
        'check',
        'x',
        'tag',
        'arrow-right',
        'chevron-right',
        'external-link',
        'circle',
        'info',
        'alert-circle',
        'badge-check'
      ],
      description:
        'Custom icon (overrides default circle-chevron-right). NOT shown when removable.',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      },
      if: { arg: 'removable', eq: false }
    }
  },
  args: {
    flavor: 'original',
    variant: 'solid',
    size: 'medium',
    removable: false,
    clickable: false,
    disabled: false,
    content: 'Hello World',
    icon: 'circle-chevron-right'
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
 * Default tag with mandatory icon (circle-chevron-right).
 * The icon is always visible but not interactive in informative mode.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 * Notice the icon is always present (default: circle-chevron-right).
 */
export const Playground: Story = {
  args: {
    content: 'Customize me!',
    icon: 'circle-chevron-right' // Uses default circle-chevron-right
  }
};

// ============================================================================
// VARIANTS & SIZES
// ============================================================================

/**
 * All variant styles comparison: solid, outline, soft.
 * Note: All tags show the default chevron-right icon.
 */
export const Variants: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-tag variant="solid">Solid</sando-tag>
      <sando-tag variant="outline">Outline</sando-tag>
      <sando-tag variant="soft">Soft</sando-tag>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All size options comparison: small, medium, large.
 */
export const Sizes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-tag size="small">Small</sando-tag>
      <sando-tag size="medium">Medium</sando-tag>
      <sando-tag size="large">Large</sando-tag>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// INTERACTION MODES
// ============================================================================

/**
 * **Mandatory Icon Demo**: Tags ALWAYS show an icon.
 *
 * - Default: circle-chevron-right icon
 * - Custom: use `slot="icon"` to override
 *
 * The icon is visible but NOT interactive in informative mode.
 */
export const MandatoryIcon: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Default Icon (circle-chevron-right)
        </h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-tag variant="solid">New</sando-tag>
          <sando-tag variant="outline">Featured</sando-tag>
          <sando-tag variant="soft">Popular</sando-tag>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Custom Icons (via slot)
        </h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-tag variant="solid">
            Star
            <sando-icon slot="icon" name="star" size="xs"></sando-icon>
          </sando-tag>
          <sando-tag variant="outline">
            Heart
            <sando-icon slot="icon" name="heart" size="xs"></sando-icon>
          </sando-tag>
          <sando-tag variant="soft">
            Check
            <sando-icon slot="icon" name="check" size="xs"></sando-icon>
          </sando-tag>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Removable tag with X button - the EXCLUSIVE mode.
 *
 * When `removable=true`:
 * - X button REPLACES the icon
 * - Only the X button is clickable (emits `sando-remove` event)
 * - `clickable`, `href`, and `slot="icon"` are IGNORED
 *
 * Click the X button and check the Actions panel.
 */
export const Removable: Story = {
  args: {
    content: 'JavaScript',
    removable: true
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Removable Tags (click X to remove)
        </h4>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
          <sando-tag
            removable
            variant="solid"
            size="${args.size}"
            flavor="${args.flavor}"
            @sando-remove="${action('sando-remove: JavaScript')}"
          >
            JavaScript
          </sando-tag>
          <sando-tag
            removable
            variant="outline"
            size="${args.size}"
            flavor="${args.flavor}"
            @sando-remove="${action('sando-remove: TypeScript')}"
          >
            TypeScript
          </sando-tag>
          <sando-tag
            removable
            variant="soft"
            size="${args.size}"
            flavor="${args.flavor}"
            @sando-remove="${action('sando-remove: React')}"
          >
            React
          </sando-tag>
        </div>
      </div>
      <p style="font-size: 0.875rem; color: #6b7280; margin: 0;">
        Open the <strong>Actions</strong> panel to see <code>sando-remove</code> events.
      </p>
    </div>
  `
};

/**
 * **Clickable tags**: Only the ICON AREA is interactive.
 *
 * Unlike traditional tags where the entire element is clickable,
 * only the icon button triggers the `sando-action` event.
 * The content area is display-only.
 */
export const Clickable: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Clickable Tags (only icon area is interactive)
        </h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-tag clickable variant="solid" @sando-action="${action('Action: View Details')}">
            View Details
          </sando-tag>
          <sando-tag clickable variant="outline" @sando-action="${action('Action: Edit')}">
            Edit
          </sando-tag>
          <sando-tag clickable variant="soft" @sando-action="${action('Action: Add')}">
            Add
          </sando-tag>
        </div>
      </div>
      <p style="font-size: 0.875rem; color: #6b7280; margin: 0;">
        <strong>Try it:</strong> Click the text (nothing happens) vs. click the icon (triggers
        action).
      </p>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * **Link tags**: Only the ICON AREA navigates.
 *
 * The icon is wrapped in an anchor `<a>` element.
 * Only clicking the icon navigates to the URL.
 */
export const AsLink: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Link Tags (only icon area navigates)
        </h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-tag href="/category/design" variant="solid">Design</sando-tag>
          <sando-tag href="/category/development" variant="outline">Development</sando-tag>
          <sando-tag href="https://example.com" target="_blank" variant="soft">
            External Link
            <sando-icon slot="icon" name="external-link" size="xs"></sando-icon>
          </sando-tag>
        </div>
      </div>
      <p style="font-size: 0.875rem; color: #6b7280; margin: 0;">
        <strong>Try it:</strong> Click the text (nothing happens) vs. click the icon (navigates).
      </p>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Tags with custom icons using the `slot="icon"`.
 *
 * Custom icons work with all modes EXCEPT removable (X replaces custom icons).
 */
export const WithCustomIcon: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- Informative with custom icon -->
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Informative (icon visible, not interactive)
        </h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-tag variant="solid">
            New
            <sando-icon slot="icon" name="star" size="xs"></sando-icon>
          </sando-tag>
          <sando-tag variant="outline">
            Featured
            <sando-icon slot="icon" name="circle" size="xs"></sando-icon>
          </sando-tag>
          <sando-tag variant="soft">
            Verified
            <sando-icon slot="icon" name="check" size="xs"></sando-icon>
          </sando-tag>
        </div>
      </div>

      <!-- Clickable with custom icon -->
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Clickable (only icon button triggers action)
        </h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-tag clickable variant="solid" @sando-action="${action('Action: Add Item')}">
            Add Item
            <sando-icon slot="icon" name="plus" size="xs"></sando-icon>
          </sando-tag>
          <sando-tag clickable variant="outline" @sando-action="${action('Action: Settings')}">
            Settings
            <sando-icon slot="icon" name="settings" size="xs"></sando-icon>
          </sando-tag>
        </div>
      </div>

      <!-- Link with custom icon -->
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Link (only icon anchor navigates)
        </h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-tag href="/docs" variant="solid">
            Documentation
            <sando-icon slot="icon" name="file-text" size="xs"></sando-icon>
          </sando-tag>
          <sando-tag href="https://github.com" target="_blank" variant="outline">
            GitHub
            <sando-icon slot="icon" name="external-link" size="xs"></sando-icon>
          </sando-tag>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// STATES
// ============================================================================

/**
 * Disabled state variations across all variants and interaction modes.
 */
export const Disabled: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Disabled Variants
        </h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-tag disabled variant="solid">Solid Disabled</sando-tag>
          <sando-tag disabled variant="outline">Outline Disabled</sando-tag>
          <sando-tag disabled variant="soft">Soft Disabled</sando-tag>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Disabled Interactive Modes
        </h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-tag disabled removable>Removable Disabled</sando-tag>
          <sando-tag disabled clickable>Clickable Disabled</sando-tag>
          <sando-tag disabled href="/link">Link Disabled</sando-tag>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// REAL-WORLD EXAMPLE
// ============================================================================

/**
 * Real-world example: Active filter tags in a search context.
 *
 * This demonstrates the proper use of removable tags for filtering:
 * - Each filter is a removable tag
 * - Clicking X removes the filter
 * - Tags use small size for compact filter bars
 */
export const InContext: Story = {
  tags: DOCS_ONLY,
  render: () => {
    const handleRemove = (tagName: string) => () => {
      action(`Filter removed: ${tagName}`)();
    };

    return html`
      <div
        style="max-width: 600px; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #fafafa;"
      >
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">
            Search Results
          </label>
          <input
            type="text"
            placeholder="Search products..."
            value="wireless headphones"
            style="width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.875rem;"
          />
        </div>

        <div style="margin-bottom: 1rem;">
          <span style="font-size: 0.75rem; color: #6b7280; margin-right: 0.5rem;"
            >Active Filters:</span
          >
          <div style="display: inline-flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
            <sando-tag
              removable
              size="small"
              variant="soft"
              @sando-remove="${handleRemove('Electronics')}"
            >
              Electronics
            </sando-tag>
            <sando-tag
              removable
              size="small"
              variant="soft"
              @sando-remove="${handleRemove('Price: $50-$200')}"
            >
              Price: $50-$200
            </sando-tag>
            <sando-tag
              removable
              size="small"
              variant="soft"
              @sando-remove="${handleRemove('In Stock')}"
            >
              In Stock
            </sando-tag>
            <sando-tag
              removable
              size="small"
              variant="soft"
              @sando-remove="${handleRemove('Free Shipping')}"
            >
              Free Shipping
            </sando-tag>
          </div>
        </div>

        <div style="padding-top: 1rem; border-top: 1px solid #e5e7eb;">
          <span style="font-size: 0.875rem; color: #374151;">Showing 24 results</span>
        </div>
      </div>
    `;
  },
  parameters: { controls: { disable: true } }
};

/**
 * Comparison: Old vs New behavior.
 *
 * This story demonstrates how the new split-interaction model differs from
 * traditional tag components where the entire element is clickable.
 */
export const InteractionComparison: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div
        style="padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 8px; background: #f9fafb;"
      >
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; color: #374151;">
          🆕 Sando Tag Behavior (Split Interaction)
        </h4>
        <p style="font-size: 0.875rem; color: #6b7280; margin: 0 0 1rem 0;">
          Only the <strong>icon area</strong> is interactive. The text content is display-only.
        </p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-tag clickable @sando-action="${action('Icon clicked')}"
            >Click the icon →</sando-tag
          >
          <sando-tag href="#demo">Navigate via icon →</sando-tag>
          <sando-tag removable @sando-remove="${action('X clicked')}">Remove via X</sando-tag>
        </div>
      </div>

      <div style="padding: 1rem; background: #fef3c7; border-radius: 8px;">
        <p style="margin: 0; font-size: 0.875rem; color: #92400e;">
          <strong>💡 Why this pattern?</strong> Inspired by Strapi's Tag component, this approach
          provides clearer affordance for the interactive element and prevents accidental clicks on
          the content area.
        </p>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
