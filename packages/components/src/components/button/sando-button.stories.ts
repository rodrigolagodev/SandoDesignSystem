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
      ${args.iconStart && args.iconStart !== 'None' ? html`<span slot="icon-start">${args.iconStart}</span>` : ''}
      ${args.iconOnly ? '' : args.label}
      ${args.iconEnd && args.iconEnd !== 'None' ? html`<span slot="icon-end">${args.iconEnd}</span>` : ''}
    </sando-button>
  `,
  argTypes: {
    flavor: {
      control: 'select',
      options: ['original', 'original-dark'],
      description: 'Design system flavor/theme',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'original' }
      }
    },
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
    flavor: 'original',
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
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
};

/**
 * Interactive playground - use the controls to customize the button.
 */
export const Playground: Story = {
  args: {
    flavor: 'original',
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
  },
  parameters: {
    backgrounds: {
      default: 'light'
    }
  }
};


/**
 * Complete showcase of all button variants, sizes, states, and features.
 * Use the flavor control to test different themes.
 *
 * 💡 Tip: When switching flavors, use the Backgrounds toolbar in Storybook to change the background:
 * - Use 'light' or 'surface-light' for the 'original' flavor
 * - Use 'dark' or 'surface-dark' for the 'original-dark' flavor
 */
export const AllExamples: Story = {
  args: {
    flavor: 'original'
  },
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Solid Variants -->
      <div>
        <h3 style="margin-bottom: 1rem;">Solid Variant</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button flavor="${args.flavor}" size="small">Small</sando-button>
          <sando-button flavor="${args.flavor}" size="medium">Medium</sando-button>
          <sando-button flavor="${args.flavor}" size="large">Large</sando-button>
          <sando-button flavor="${args.flavor}" disabled>Disabled</sando-button>
          <sando-button flavor="${args.flavor}" loading>Loading</sando-button>
        </div>
      </div>

      <!-- Outline Variants -->
      <div>
        <h3 style="margin-bottom: 1rem;">Outline Variant</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button flavor="${args.flavor}" variant="outline" size="small">Small</sando-button>
          <sando-button flavor="${args.flavor}" variant="outline" size="medium">Medium</sando-button>
          <sando-button flavor="${args.flavor}" variant="outline" size="large">Large</sando-button>
          <sando-button flavor="${args.flavor}" variant="outline" disabled>Disabled</sando-button>
          <sando-button flavor="${args.flavor}" variant="outline" loading>Loading</sando-button>
        </div>
      </div>

      <!-- Ghost Variants -->
      <div>
        <h3 style="margin-bottom: 1rem;">Ghost Variant</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button flavor="${args.flavor}" variant="ghost" size="small">Small</sando-button>
          <sando-button flavor="${args.flavor}" variant="ghost" size="medium">Medium</sando-button>
          <sando-button flavor="${args.flavor}" variant="ghost" size="large">Large</sando-button>
          <sando-button flavor="${args.flavor}" variant="ghost" disabled>Disabled</sando-button>
          <sando-button flavor="${args.flavor}" variant="ghost" loading>Loading</sando-button>
        </div>
      </div>

      <!-- Status States -->
      <div>
        <h3 style="margin-bottom: 1rem;">Status States</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button flavor="${args.flavor}" status="default">Default</sando-button>
          <sando-button flavor="${args.flavor}" status="success">Success</sando-button>
          <sando-button flavor="${args.flavor}" status="destructive">Destructive</sando-button>
        </div>
      </div>

      <!-- With Icons -->
      <div>
        <h3 style="margin-bottom: 1rem;">With Icons</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button flavor="${args.flavor}">
            <span slot="icon-start">⭐</span>
            Favorite
          </sando-button>
          <sando-button flavor="${args.flavor}" variant="outline">
            <span slot="icon-start">📥</span>
            Download
          </sando-button>
          <sando-button flavor="${args.flavor}" variant="ghost">
            Settings
            <span slot="icon-end">⚙️</span>
          </sando-button>
        </div>
      </div>

      <!-- As Links -->
      <div>
        <h3 style="margin-bottom: 1rem;">As Links (renders as &lt;a&gt;)</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button flavor="${args.flavor}" href="https://example.com" target="_blank">
            Visit Site
            <span slot="icon-end">→</span>
          </sando-button>
          <sando-button flavor="${args.flavor}" variant="outline" href="/">
            <span slot="icon-start">🏠</span>
            Home
          </sando-button>
          <sando-button flavor="${args.flavor}" variant="ghost" href="/docs">
            Documentation
          </sando-button>
        </div>
      </div>

      <!-- Icon-only Buttons -->
      <div>
        <h3 style="margin-bottom: 1rem;">Icon-only (Square)</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-button flavor="${args.flavor}" icon-only size="small">
            <span slot="icon-start">⭐</span>
          </sando-button>
          <sando-button flavor="${args.flavor}" icon-only size="medium">
            <span slot="icon-start">❤️</span>
          </sando-button>
          <sando-button flavor="${args.flavor}" icon-only size="large">
            <span slot="icon-start">⚙️</span>
          </sando-button>
          <sando-button flavor="${args.flavor}" icon-only variant="outline">
            <span slot="icon-start">🗑️</span>
          </sando-button>
          <sando-button flavor="${args.flavor}" icon-only variant="ghost">
            <span slot="icon-start">✏️</span>
          </sando-button>
          <sando-button flavor="${args.flavor}" icon-only status="success">
            <span slot="icon-start">✓</span>
          </sando-button>
          <sando-button flavor="${args.flavor}" icon-only status="destructive">
            <span slot="icon-start">✗</span>
          </sando-button>
        </div>
      </div>
    </div>
  `
};

/**
 * Theme comparison showing the same buttons in both light (original) and dark (original-dark) themes.
 * This demonstrates how the flavor attribute changes the button's appearance.
 */
export const ThemeComparison: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 3rem;">
      <!-- Original Theme (Light) -->
      <div style="padding: 2rem; background: var(--sando-color-background-base, #fff); border-radius: 8px;">
        <h3 style="margin-bottom: 1.5rem; color: var(--sando-color-text-heading);">Original Theme (Light)</h3>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--sando-color-text-caption);">Variants</h4>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <sando-button flavor="original" variant="solid">Solid</sando-button>
              <sando-button flavor="original" variant="outline">Outline</sando-button>
              <sando-button flavor="original" variant="ghost">Ghost</sando-button>
            </div>
          </div>

          <div>
            <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--sando-color-text-caption);">Status States</h4>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <sando-button flavor="original" status="default">Default</sando-button>
              <sando-button flavor="original" status="success">Success</sando-button>
              <sando-button flavor="original" status="destructive">Destructive</sando-button>
            </div>
          </div>

          <div>
            <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--sando-color-text-caption);">States</h4>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <sando-button flavor="original">Normal</sando-button>
              <sando-button flavor="original" disabled>Disabled</sando-button>
              <sando-button flavor="original" loading>Loading</sando-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Original-Dark Theme -->
      <div style="padding: 2rem; background: #0a0a0a; border-radius: 8px;">
        <h3 style="margin-bottom: 1.5rem; color: #f5f5f5;">Original-Dark Theme</h3>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #a8a8a8;">Variants</h4>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <sando-button flavor="original-dark" variant="solid">Solid</sando-button>
              <sando-button flavor="original-dark" variant="outline">Outline</sando-button>
              <sando-button flavor="original-dark" variant="ghost">Ghost</sando-button>
            </div>
          </div>

          <div>
            <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #a8a8a8;">Status States</h4>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <sando-button flavor="original-dark" status="default">Default</sando-button>
              <sando-button flavor="original-dark" status="success">Success</sando-button>
              <sando-button flavor="original-dark" status="destructive">Destructive</sando-button>
            </div>
          </div>

          <div>
            <h4 style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #a8a8a8;">States</h4>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <sando-button flavor="original-dark">Normal</sando-button>
              <sando-button flavor="original-dark" disabled>Disabled</sando-button>
              <sando-button flavor="original-dark" loading>Loading</sando-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
