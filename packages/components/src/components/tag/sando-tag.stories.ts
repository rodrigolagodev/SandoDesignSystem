import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import './sando-tag.ts';
import '../icon/sando-icon.ts';

/**
 * Tags are compact elements representing attributes, labels, or categories.
 * They support three distinct use cases with clear exclusivity rules:
 *
 * ## Use Cases (Mutually Exclusive)
 *
 * 1. **Removable** (highest priority) - Chip with X button for filters/multi-select
 *    - `removable=true` is **EXCLUSIVE**: ignores `clickable` and `href`
 *    - Only the X button is interactive, content is display-only
 *    - Custom icons (`slot="icon"`) are NOT rendered (X replaces them)
 *
 * 2. **Link** - Entire tag navigates to URL when `href` is set
 *    - Custom icons render normally
 *
 * 3. **Clickable** - Entire tag acts as button when `clickable=true`
 *    - Custom icons render normally
 *
 * 4. **Informative** (default) - Display-only badge, no interaction
 *    - Custom icons render normally
 *
 * ## Features
 * - **3 Variants**: solid, outline, soft
 * - **3 Sizes**: small, medium, large
 * - **Icon Support**: Custom icon slot (only for non-removable tags)
 *
 * ## Accessibility
 * - Removable tags have descriptive aria-label on X button
 * - Disabled state properly communicated to assistive technology
 * - Focus delegation for proper keyboard navigation
 * - Link tags include proper rel attributes for external links
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
    >
      ${args.content}
      ${!args.removable && args.icon && args.icon !== 'none'
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
      description: 'Shows a remove (X) button. EXCLUSIVE: ignores clickable/href, hides icon slot.',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    clickable: {
      control: 'boolean',
      description: 'Makes the entire tag clickable (button behavior). Ignored when removable=true.',
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
      description: 'URL to navigate to (renders as anchor). Ignored when removable=true.',
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
        'none',
        'star',
        'heart',
        'check',
        'x',
        'tag',
        'arrow-right',
        'external-link',
        'circle',
        'info',
        'alert-circle',
        'badge-check'
      ],
      description: 'Icon to display (only rendered when NOT removable)',
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
    icon: 'none'
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
 * Default solid tag - informative, display-only.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 * Try selecting an icon from the dropdown (only visible when NOT removable).
 */
export const Playground: Story = {
  args: {
    content: 'Customize me!',
    icon: 'star'
  }
};

// ============================================================================
// VARIANTS & SIZES
// ============================================================================

/**
 * All variant styles comparison: solid, outline, soft.
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
// INTERACTIVE MODES (Exclusivity Demonstration)
// ============================================================================

/**
 * Removable tag with X button - the EXCLUSIVE mode.
 *
 * When `removable=true`:
 * - Only the X button is clickable (emits `sando-remove` event)
 * - `clickable` and `href` props are IGNORED
 * - `slot="icon"` is NOT rendered (X replaces custom icons)
 *
 * Click the X button and check the browser console for the event log.
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
            @sando-remove="${(e: CustomEvent) => action('sando-remove: JavaScript')(e.detail)}"
          >
            JavaScript
          </sando-tag>
          <sando-tag
            removable
            variant="outline"
            size="${args.size}"
            flavor="${args.flavor}"
            @sando-remove="${(e: CustomEvent) => action('sando-remove: TypeScript')(e.detail)}"
          >
            TypeScript
          </sando-tag>
          <sando-tag
            removable
            variant="soft"
            size="${args.size}"
            flavor="${args.flavor}"
            @sando-remove="${(e: CustomEvent) => action('sando-remove: React')(e.detail)}"
          >
            React
          </sando-tag>
        </div>
      </div>
      <p style="font-size: 0.875rem; color: #6b7280; margin: 0;">
        Open browser console to see <code>sando-remove</code> events.
      </p>
    </div>
  `
};

/**
 * Clickable tags act as buttons - entire tag is interactive.
 * These tags have NO custom icons to demonstrate pure button behavior.
 */
export const Clickable: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-tag clickable variant="solid" @click="${action('Clicked: View Details')}">
        View Details
      </sando-tag>
      <sando-tag clickable variant="outline" @click="${action('Clicked: Edit')}"> Edit </sando-tag>
      <sando-tag clickable variant="soft" @click="${action('Clicked: Add')}"> Add </sando-tag>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Tags rendered as links navigate to URLs.
 * These tags have NO custom icons to demonstrate pure link behavior.
 */
export const AsLink: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-tag href="/category/design" variant="solid">Design</sando-tag>
      <sando-tag href="/category/development" variant="outline">Development</sando-tag>
      <sando-tag href="https://example.com" target="_blank" variant="soft">External Link</sando-tag>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Tags with custom icons using the `slot="icon"`.
 *
 * Custom icons work with:
 * - **Informative** tags (display-only, no interaction)
 * - **Clickable** tags (entire tag is a button)
 * - **Link** tags (entire tag is an anchor)
 *
 * **Note:** Icons are NOT rendered when `removable=true` (X button replaces them).
 */
export const WithIcon: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- Informative with icon -->
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Informative (display-only with icon)
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

      <!-- Clickable with icon -->
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Clickable (button with icon)
        </h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-tag clickable variant="solid" @click="${action('Clicked: Add Item')}">
            Add Item
            <sando-icon slot="icon" name="plus" size="xs"></sando-icon>
          </sando-tag>
          <sando-tag clickable variant="outline" @click="${action('Clicked: Settings')}">
            Settings
            <sando-icon slot="icon" name="settings" size="xs"></sando-icon>
          </sando-tag>
        </div>
      </div>

      <!-- Link with icon -->
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Link (anchor with icon)
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
    const handleRemove = (tagName: string) => (e: CustomEvent) => {
      action(`Filter removed: ${tagName}`)(e.detail);
      // In a real app, you would update state here
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
