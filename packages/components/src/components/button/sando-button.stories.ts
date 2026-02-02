import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-button.ts';
import '../icon/sando-icon.ts';

/**
 * The Button component triggers actions and events.
 * Renders as `<button>` by default, or `<a>` when `href` is provided.
 *
 * ## Features
 * - **4 Variants**: solid, outline, ghost, text
 * - **4 Sizes**: xs, small, medium, large
 * - **3 Border Radius**: none, default, full (pill/circular)
 * - **Status States**: default, success, destructive
 * - **Interactive States**: hover, active, disabled, loading
 * - **Icon Support**: Start/end icon slots, icon-only mode
 * - **Active/Toggle State**: Persistent pressed state for filters
 * - **Link Mode**: Renders as `<a>` when href is provided
 * - **Accessibility**: ARIA support, keyboard navigation
 *
 * ## Accessibility
 * - Use `aria-label` for icon-only buttons
 * - `aria-pressed` is set automatically when `active` is true
 * - `aria-busy` is set during loading state
 * - Full keyboard navigation support
 */
const meta: Meta = {
  title: 'Components/Button',
  component: 'sando-button',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-button
      flavor="${args.flavor || 'original'}"
      variant="${args.variant}"
      size="${args.size}"
      status="${args.status}"
      radius="${args.radius}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
      ?full-width="${args.fullWidth}"
      ?icon-only="${args.iconOnly}"
      ?active="${args.active}"
      type="${args.type}"
      href="${args.href || ''}"
      target="${args.target || '_self'}"
      aria-label="${args.ariaLabel || ''}"
    >
      ${args.iconStart && args.iconStart !== 'None'
        ? html`<sando-icon slot="icon-start" name="${args.iconStart}" size="small"></sando-icon>`
        : ''}
      ${args.iconOnly ? '' : args.label}
      ${args.iconEnd && args.iconEnd !== 'None'
        ? html`<sando-icon slot="icon-end" name="${args.iconEnd}" size="small"></sando-icon>`
        : ''}
    </sando-button>
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
      options: ['solid', 'outline', 'ghost', 'text'],
      description: 'Visual style variant',
      table: {
        category: 'Appearance',
        type: { summary: "'solid' | 'outline' | 'ghost' | 'text'" },
        defaultValue: { summary: 'solid' }
      }
    },
    size: {
      control: 'select',
      options: ['xs', 'small', 'medium', 'large'],
      description: 'Button size (medium meets WCAG touch target)',
      table: {
        category: 'Appearance',
        type: { summary: "'xs' | 'small' | 'medium' | 'large'" },
        defaultValue: { summary: 'medium' }
      }
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'destructive'],
      description: 'Semantic status for success/error states',
      table: {
        category: 'Appearance',
        type: { summary: "'default' | 'success' | 'destructive'" },
        defaultValue: { summary: 'default' }
      }
    },
    radius: {
      control: 'select',
      options: ['none', 'default', 'full'],
      description: 'Border radius variant',
      table: {
        category: 'Appearance',
        type: { summary: "'none' | 'default' | 'full'" },
        defaultValue: { summary: 'default' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading state',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    active: {
      control: 'boolean',
      description: 'Active/pressed state for toggles',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expands to full container width',
      table: {
        category: 'Layout',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    iconOnly: {
      control: 'boolean',
      description: 'Icon-only mode (square button)',
      table: {
        category: 'Layout',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type',
      table: {
        category: 'HTML',
        type: { summary: "'button' | 'submit' | 'reset'" },
        defaultValue: { summary: 'button' }
      }
    },
    href: {
      control: 'text',
      description: 'URL (renders as <a> instead of <button>)',
      table: {
        category: 'Link',
        type: { summary: 'string' }
      }
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Link target (when href is set)',
      table: {
        category: 'Link',
        type: { summary: "'_self' | '_blank' | '_parent' | '_top'" },
        defaultValue: { summary: '_self' }
      }
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label (required for icon-only)',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' }
      }
    },
    label: {
      control: 'text',
      description: 'Button text content',
      table: {
        category: 'Content'
      }
    },
    iconStart: {
      control: 'select',
      options: [
        'None',
        'star',
        'heart',
        'check',
        'x',
        'search',
        'settings',
        'download',
        'upload',
        'plus',
        'minus',
        'trash-2',
        'edit',
        'user',
        'home'
      ],
      description: 'Icon at start (Lucide icon name)',
      table: {
        category: 'Content'
      }
    },
    iconEnd: {
      control: 'select',
      options: [
        'None',
        'arrow-right',
        'arrow-left',
        'chevron-right',
        'chevron-left',
        'external-link',
        'star',
        'heart',
        'check'
      ],
      description: 'Icon at end (Lucide icon name)',
      table: {
        category: 'Content'
      }
    }
  },
  args: {
    flavor: 'original',
    variant: 'solid',
    size: 'medium',
    status: 'default',
    radius: 'default',
    disabled: false,
    loading: false,
    active: false,
    fullWidth: false,
    iconOnly: false,
    type: 'button',
    label: 'Button',
    iconStart: 'None',
    iconEnd: 'None'
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
 * Default button with solid variant and medium size.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize.
 */
export const Playground: Story = {
  args: {
    label: 'Customize me!'
  }
};

/**
 * Button as a link with external URL.
 */
export const AsLink: Story = {
  args: {
    label: 'Visit Site',
    href: 'https://example.com',
    target: '_blank',
    iconEnd: 'external-link'
  }
};

/**
 * Icon-only button (requires aria-label for accessibility).
 */
export const IconOnly: Story = {
  args: {
    iconOnly: true,
    iconStart: 'heart',
    ariaLabel: 'Like',
    label: ''
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * All variant styles comparison.
 */
export const AllVariants: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-button variant="solid">Solid</sando-button>
      <sando-button variant="outline">Outline</sando-button>
      <sando-button variant="ghost">Ghost</sando-button>
      <sando-button variant="text">Text</sando-button>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All size options comparison.
 */
export const AllSizes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-button size="xs">Extra Small</sando-button>
      <sando-button size="small">Small</sando-button>
      <sando-button size="medium">Medium (WCAG)</sando-button>
      <sando-button size="large">Large</sando-button>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All status states comparison.
 */
export const AllStatus: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-button status="default">Default</sando-button>
      <sando-button status="success">
        <sando-icon slot="icon-start" name="check" size="small"></sando-icon>
        Success
      </sando-button>
      <sando-button status="destructive">
        <sando-icon slot="icon-start" name="trash-2" size="small"></sando-icon>
        Destructive
      </sando-button>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Interactive states: disabled and loading.
 */
export const AllStates: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-button>Default</sando-button>
      <sando-button disabled>Disabled</sando-button>
      <sando-button loading>Loading</sando-button>
      <sando-button active>Active</sando-button>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All radius variants comparison.
 */
export const AllRadius: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-button radius="none">None</sando-button>
      <sando-button radius="default">Default</sando-button>
      <sando-button radius="full">Full (Pill)</sando-button>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Buttons with icons.
 */
export const WithIcons: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-button>
        <sando-icon slot="icon-start" name="star" size="small"></sando-icon>
        Favorite
      </sando-button>
      <sando-button variant="outline">
        <sando-icon slot="icon-start" name="download" size="small"></sando-icon>
        Download
      </sando-button>
      <sando-button variant="ghost">
        Settings
        <sando-icon slot="icon-end" name="settings" size="small"></sando-icon>
      </sando-button>
      <sando-button>
        <sando-icon slot="icon-start" name="upload" size="small"></sando-icon>
        Upload
        <sando-icon slot="icon-end" name="arrow-right" size="small"></sando-icon>
      </sando-button>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Icon-only buttons in different sizes and variants.
 */
export const IconOnlyVariants: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">Sizes</h4>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <sando-button icon-only size="xs" aria-label="Star">
            <sando-icon slot="icon-start" name="star" size="xs"></sando-icon>
          </sando-button>
          <sando-button icon-only size="small" aria-label="Star">
            <sando-icon slot="icon-start" name="star" size="small"></sando-icon>
          </sando-button>
          <sando-button icon-only size="medium" aria-label="Star">
            <sando-icon slot="icon-start" name="star" size="small"></sando-icon>
          </sando-button>
          <sando-button icon-only size="large" aria-label="Star">
            <sando-icon slot="icon-start" name="star" size="medium"></sando-icon>
          </sando-button>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">Variants</h4>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <sando-button icon-only variant="solid" aria-label="Heart">
            <sando-icon slot="icon-start" name="heart" size="small"></sando-icon>
          </sando-button>
          <sando-button icon-only variant="outline" aria-label="Trash">
            <sando-icon slot="icon-start" name="trash-2" size="small"></sando-icon>
          </sando-button>
          <sando-button icon-only variant="ghost" aria-label="Edit">
            <sando-icon slot="icon-start" name="edit" size="small"></sando-icon>
          </sando-button>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Circular (radius="full")
        </h4>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <sando-button icon-only radius="full" aria-label="Add">
            <sando-icon slot="icon-start" name="plus" size="small"></sando-icon>
          </sando-button>
          <sando-button icon-only radius="full" status="success" aria-label="Check">
            <sando-icon slot="icon-start" name="check" size="small"></sando-icon>
          </sando-button>
          <sando-button icon-only radius="full" status="destructive" aria-label="Close">
            <sando-icon slot="icon-start" name="x" size="small"></sando-icon>
          </sando-button>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Full-width button layout.
 */
export const FullWidth: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <sando-button full-width>Full Width Solid</sando-button>
      <sando-button full-width variant="outline">Full Width Outline</sando-button>
      <sando-button full-width variant="ghost">Full Width Ghost</sando-button>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Active state for filters and toggles.
 */
export const ActiveState: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">
          Normal vs Active
        </h4>
        <div style="display: flex; gap: 1rem;">
          <sando-button variant="outline">Normal</sando-button>
          <sando-button variant="outline" active>Active</sando-button>
        </div>
      </div>
      <div>
        <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: #78716c;">Filter Example</h4>
        <div style="display: flex; gap: 0.5rem;">
          <sando-button variant="outline" size="small" active>All</sando-button>
          <sando-button variant="outline" size="small">Active</sando-button>
          <sando-button variant="outline" size="small">Completed</sando-button>
          <sando-button variant="outline" size="small">Archived</sando-button>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Button rendered as links.
 */
export const AsLinks: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-button href="https://example.com" target="_blank">
        External Link
        <sando-icon slot="icon-end" name="external-link" size="small"></sando-icon>
      </sando-button>
      <sando-button variant="outline" href="/">
        <sando-icon slot="icon-start" name="home" size="small"></sando-icon>
        Home
      </sando-button>
      <sando-button variant="ghost" href="/docs">Documentation</sando-button>
      <sando-button variant="text" href="/learn">Learn More</sando-button>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Complete showcase of all button features.
 */
export const AllExamples: Story = {
  tags: DOCS_ONLY,
  args: {
    flavor: 'original'
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Variants -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Variants</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button flavor="${args.flavor}" variant="solid">Solid</sando-button>
          <sando-button flavor="${args.flavor}" variant="outline">Outline</sando-button>
          <sando-button flavor="${args.flavor}" variant="ghost">Ghost</sando-button>
          <sando-button flavor="${args.flavor}" variant="text">Text</sando-button>
        </div>
      </section>

      <!-- Sizes -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Sizes</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-button flavor="${args.flavor}" size="xs">Extra Small</sando-button>
          <sando-button flavor="${args.flavor}" size="small">Small</sando-button>
          <sando-button flavor="${args.flavor}" size="medium">Medium</sando-button>
          <sando-button flavor="${args.flavor}" size="large">Large</sando-button>
        </div>
      </section>

      <!-- Status -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Status</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button flavor="${args.flavor}" status="default">Default</sando-button>
          <sando-button flavor="${args.flavor}" status="success">Success</sando-button>
          <sando-button flavor="${args.flavor}" status="destructive">Destructive</sando-button>
        </div>
      </section>

      <!-- With Icons -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">With Icons</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button flavor="${args.flavor}">
            <sando-icon slot="icon-start" name="star" size="small"></sando-icon>
            Favorite
          </sando-button>
          <sando-button flavor="${args.flavor}" variant="outline">
            <sando-icon slot="icon-start" name="download" size="small"></sando-icon>
            Download
          </sando-button>
          <sando-button flavor="${args.flavor}" variant="ghost">
            Settings
            <sando-icon slot="icon-end" name="settings" size="small"></sando-icon>
          </sando-button>
        </div>
      </section>

      <!-- Icon-only -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Icon-only</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-button flavor="${args.flavor}" icon-only aria-label="Like">
            <sando-icon slot="icon-start" name="heart" size="small"></sando-icon>
          </sando-button>
          <sando-button flavor="${args.flavor}" icon-only variant="outline" aria-label="Delete">
            <sando-icon slot="icon-start" name="trash-2" size="small"></sando-icon>
          </sando-button>
          <sando-button flavor="${args.flavor}" icon-only variant="ghost" aria-label="Edit">
            <sando-icon slot="icon-start" name="edit" size="small"></sando-icon>
          </sando-button>
          <sando-button
            flavor="${args.flavor}"
            icon-only
            radius="full"
            status="success"
            aria-label="Confirm"
          >
            <sando-icon slot="icon-start" name="check" size="small"></sando-icon>
          </sando-button>
          <sando-button
            flavor="${args.flavor}"
            icon-only
            radius="full"
            status="destructive"
            aria-label="Cancel"
          >
            <sando-icon slot="icon-start" name="x" size="small"></sando-icon>
          </sando-button>
        </div>
      </section>

      <!-- States -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">States</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button flavor="${args.flavor}">Default</sando-button>
          <sando-button flavor="${args.flavor}" disabled>Disabled</sando-button>
          <sando-button flavor="${args.flavor}" loading>Loading</sando-button>
          <sando-button flavor="${args.flavor}" active>Active</sando-button>
        </div>
      </section>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Color mode comparison: light, dark, high-contrast.
 */
export const ColorModes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Light Mode -->
      <div style="padding: 2rem; background: #ffffff; border-radius: 8px;">
        <h4 style="margin: 0 0 1rem 0; color: #1c1917;">Light Mode</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button variant="solid">Solid</sando-button>
          <sando-button variant="outline">Outline</sando-button>
          <sando-button variant="ghost">Ghost</sando-button>
          <sando-button status="success">Success</sando-button>
          <sando-button status="destructive">Destructive</sando-button>
        </div>
      </div>

      <!-- Dark Mode -->
      <div style="padding: 2rem; background: #0a0a0a; border-radius: 8px;">
        <h4 style="margin: 0 0 1rem 0; color: #fafaf9;">Dark Mode (flavor-mode="dark")</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button flavor-mode="dark" variant="solid">Solid</sando-button>
          <sando-button flavor-mode="dark" variant="outline">Outline</sando-button>
          <sando-button flavor-mode="dark" variant="ghost">Ghost</sando-button>
          <sando-button flavor-mode="dark" status="success">Success</sando-button>
          <sando-button flavor-mode="dark" status="destructive">Destructive</sando-button>
        </div>
      </div>

      <!-- High Contrast -->
      <div style="padding: 2rem; background: #ffffff; border: 2px solid #000; border-radius: 8px;">
        <h4 style="margin: 0 0 1rem 0; color: #000;">
          High Contrast (flavor-mode="high-contrast")
        </h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button flavor-mode="high-contrast" variant="solid">Solid</sando-button>
          <sando-button flavor-mode="high-contrast" variant="outline">Outline</sando-button>
          <sando-button flavor-mode="high-contrast" variant="ghost">Ghost</sando-button>
          <sando-button flavor-mode="high-contrast" status="success">Success</sando-button>
          <sando-button flavor-mode="high-contrast" status="destructive">Destructive</sando-button>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
