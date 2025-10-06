import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-button.ts';

/**
 * The Button component is used to trigger actions and events.
 * Can render as `<button>` or `<a>` based on whether `href` is provided.
 *
 * ## Features
 * - **3 Variants**: solid, outline, ghost
 * - **3 Sizes**: small, medium, large
 * - **3 Border Radius**: none, default, full (circular)
 * - **Status States**: default, success, destructive
 * - **Interactive States**: hover, active, disabled, loading
 * - **Icon-only Mode**: Square buttons perfect for icon-only actions
 * - **Active/Toggle State**: Persistent pressed state for filters and toggles
 * - **Accessibility**: Full ARIA support (aria-label, aria-pressed, aria-busy)
 * - **Customizable**: Slots for icons and content
 * - **Semantic HTML**: Renders as `<button>` by default, `<a>` when href is provided
 *
 * ## Design Tokens
 * This component uses design tokens from the `recipes/button` layer.
 * All colors, spacing, and typography are themeable via CSS custom properties.
 * Tokens follow the 3-layer architecture: Recipes → Flavors → Ingredients.
 *
 * ## Accessibility
 * - Use `aria-label` for icon-only buttons to provide context
 * - `aria-pressed` automatically set when `active` prop is true
 * - `aria-busy` set during loading state
 * - Full keyboard navigation support
 */
const meta: Meta = {
  title: 'Components/Button/Overview',
  tags: ['autodocs'],
  render: (args) => html`
    <sando-button
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
      ${args.iconStart && args.iconStart !== 'None' ? html`<span slot="icon-start">${args.iconStart}</span>` : ''}
      ${args.iconOnly ? '' : args.label}
      ${args.iconEnd && args.iconEnd !== 'None' ? html`<span slot="icon-end">${args.iconEnd}</span>` : ''}
    </sando-button>
  `,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
      description: 'Visual style variant of the button',
      table: {
        type: { summary: 'solid | outline | ghost' },
        defaultValue: { summary: 'solid' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: 'medium' }
      }
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'destructive'],
      description: 'Status variant for success/error states',
      table: {
        type: { summary: 'default | success | destructive' },
        defaultValue: { summary: 'default' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    iconOnly: {
      control: 'boolean',
      description: 'Icon-only button (square shape, no text padding)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    radius: {
      control: 'select',
      options: ['none', 'default', 'full'],
      description: 'Border radius variant',
      table: {
        type: { summary: 'none | default | full' },
        defaultValue: { summary: 'default' }
      }
    },
    active: {
      control: 'boolean',
      description: 'Active/pressed state (for toggles and filters)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type for form submission',
      table: {
        type: { summary: 'button | submit | reset' },
        defaultValue: { summary: 'button' }
      }
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for screen readers (important for icon-only buttons)',
      table: {
        type: { summary: 'string' }
      }
    },
    href: {
      control: 'text',
      description: 'URL to navigate to (renders as <a> instead of <button>)',
      table: {
        type: { summary: 'string' }
      }
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Where to open the linked document (only when href is set)',
      table: {
        type: { summary: '_self | _blank | _parent | _top' },
        defaultValue: { summary: '_self' }
      }
    },
    label: {
      control: 'text',
      description: 'Button text content'
    },
    iconStart: {
      control: 'select',
      options: ['None', '⭐', '❤️', '✓', '✗', '🔍', '⚙️', '📥', '📤', '➕', '➖', '🗑️', '✏️', '🔒', '🔓', '👤', '🏠'],
      description: 'Icon to display at the start of the button'
    },
    iconEnd: {
      control: 'select',
      options: ['None', '→', '←', '↑', '↓', '⭐', '❤️', '✓', '✗', '⚙️', '📥', '📤', '➕', '➖'],
      description: 'Icon to display at the end of the button'
    }
  }
};

export default meta;
type Story = StoryObj;

/**
 * Default button with solid variant and medium size.
 */
export const Default: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Button',
    disabled: false,
    loading: false,
    fullWidth: false,
    type: 'button',
    iconStart: 'None',
    iconEnd: 'None'
  }
};

/**
 * Interactive playground - use the controls to customize the button.
 */
export const Playground: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Customize me!',
    disabled: false,
    loading: false,
    fullWidth: false,
    type: 'button',
    iconStart: 'None',
    iconEnd: 'None'
  }
};


/**
 * Complete showcase of all button variants, sizes, states, and features.
 */
export const AllExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Solid Variants -->
      <div>
        <h3 style="margin-bottom: 1rem;">Solid Variant</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button size="small">Small</sando-button>
          <sando-button size="medium">Medium</sando-button>
          <sando-button size="large">Large</sando-button>
          <sando-button disabled>Disabled</sando-button>
          <sando-button loading>Loading</sando-button>
        </div>
      </div>

      <!-- Outline Variants -->
      <div>
        <h3 style="margin-bottom: 1rem;">Outline Variant</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button variant="outline" size="small">Small</sando-button>
          <sando-button variant="outline" size="medium">Medium</sando-button>
          <sando-button variant="outline" size="large">Large</sando-button>
          <sando-button variant="outline" disabled>Disabled</sando-button>
          <sando-button variant="outline" loading>Loading</sando-button>
        </div>
      </div>

      <!-- Ghost Variants -->
      <div>
        <h3 style="margin-bottom: 1rem;">Ghost Variant</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button variant="ghost" size="small">Small</sando-button>
          <sando-button variant="ghost" size="medium">Medium</sando-button>
          <sando-button variant="ghost" size="large">Large</sando-button>
          <sando-button variant="ghost" disabled>Disabled</sando-button>
          <sando-button variant="ghost" loading>Loading</sando-button>
        </div>
      </div>

      <!-- Status States -->
      <div>
        <h3 style="margin-bottom: 1rem;">Status States</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button status="default">Default</sando-button>
          <sando-button status="success">Success</sando-button>
          <sando-button status="destructive">Destructive</sando-button>
        </div>
      </div>

      <!-- With Icons -->
      <div>
        <h3 style="margin-bottom: 1rem;">With Icons</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button>
            <span slot="icon-start">⭐</span>
            Favorite
          </sando-button>
          <sando-button variant="outline">
            <span slot="icon-start">📥</span>
            Download
          </sando-button>
          <sando-button variant="ghost">
            Settings
            <span slot="icon-end">⚙️</span>
          </sando-button>
        </div>
      </div>

      <!-- As Links -->
      <div>
        <h3 style="margin-bottom: 1rem;">As Links (renders as &lt;a&gt;)</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button href="https://example.com" target="_blank">
            Visit Site
            <span slot="icon-end">→</span>
          </sando-button>
          <sando-button variant="outline" href="/">
            <span slot="icon-start">🏠</span>
            Home
          </sando-button>
          <sando-button variant="ghost" href="/docs">
            Documentation
          </sando-button>
        </div>
      </div>

      <!-- Icon-only Buttons -->
      <div>
        <h3 style="margin-bottom: 1rem;">Icon-only (Square)</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-button icon-only size="small">
            <span slot="icon-start">⭐</span>
          </sando-button>
          <sando-button icon-only size="medium">
            <span slot="icon-start">❤️</span>
          </sando-button>
          <sando-button icon-only size="large">
            <span slot="icon-start">⚙️</span>
          </sando-button>
          <sando-button icon-only variant="outline">
            <span slot="icon-start">🗑️</span>
          </sando-button>
          <sando-button icon-only variant="ghost">
            <span slot="icon-start">✏️</span>
          </sando-button>
          <sando-button icon-only status="success">
            <span slot="icon-start">✓</span>
          </sando-button>
          <sando-button icon-only status="destructive">
            <span slot="icon-start">✗</span>
          </sando-button>
        </div>
      </div>
    </div>
  `
};
