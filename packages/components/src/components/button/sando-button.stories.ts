import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-button.ts';

/**
 * The Button component is used to trigger actions and events.
 *
 * ## Features
 * - **3 Variants**: solid, outline, ghost
 * - **3 Sizes**: small, medium, large
 * - **Status States**: default, success, destructive
 * - **Interactive States**: hover, active, disabled, loading
 * - **Accessibility**: Full ARIA support, keyboard navigation
 * - **Customizable**: Slots for icons and content
 *
 * ## Design Tokens
 * This component uses design tokens from the `recipes/button` layer.
 * All colors, spacing, and typography are themeable via CSS custom properties.
 */
const meta: Meta = {
  title: 'Components/Button',
  tags: ['autodocs'],
  render: (args) => html`
    <sando-button
      variant="${args.variant}"
      size="${args.size}"
      status="${args.status}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
      ?full-width="${args.fullWidth}"
      type="${args.type}"
    >
      ${args.label}
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
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Button type for form submission',
      table: {
        type: { summary: 'button | submit | reset' },
        defaultValue: { summary: 'button' }
      }
    },
    label: {
      control: 'text',
      description: 'Button text content'
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
    type: 'button'
  }
};

/**
 * All variants side by side for comparison.
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <sando-button variant="solid">Solid</sando-button>
      <sando-button variant="outline">Outline</sando-button>
      <sando-button variant="ghost">Ghost</sando-button>
    </div>
  `
};

/**
 * All sizes side by side for comparison.
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <sando-button size="small">Small</sando-button>
      <sando-button size="medium">Medium</sando-button>
      <sando-button size="large">Large</sando-button>
    </div>
  `
};

/**
 * Status variants for success and error states.
 */
export const StatusStates: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <sando-button status="default">Default</sando-button>
      <sando-button status="success">Success</sando-button>
      <sando-button status="destructive">Destructive</sando-button>
    </div>
  `
};

/**
 * Interactive states: hover, active, disabled, loading.
 */
export const States: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-direction: column; max-width: 300px;">
      <sando-button>Normal</sando-button>
      <sando-button disabled>Disabled</sando-button>
      <sando-button loading>Loading</sando-button>
    </div>
  `
};

/**
 * Outline variant in different sizes.
 */
export const Outline: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <sando-button variant="outline" size="small">Small Outline</sando-button>
      <sando-button variant="outline" size="medium">Medium Outline</sando-button>
      <sando-button variant="outline" size="large">Large Outline</sando-button>
    </div>
  `
};

/**
 * Ghost variant in different sizes.
 */
export const Ghost: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <sando-button variant="ghost" size="small">Small Ghost</sando-button>
      <sando-button variant="ghost" size="medium">Medium Ghost</sando-button>
      <sando-button variant="ghost" size="large">Large Ghost</sando-button>
    </div>
  `
};

/**
 * Full width buttons in a vertical layout.
 */
export const FullWidth: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <sando-button full-width>Full Width Solid</sando-button>
      <sando-button full-width variant="outline">Full Width Outline</sando-button>
      <sando-button full-width variant="ghost">Full Width Ghost</sando-button>
    </div>
  `
};

/**
 * Buttons with icons using slots.
 */
export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <sando-button>
        <span slot="icon-start">⭐</span>
        With Icon Start
      </sando-button>
      <sando-button>
        With Icon End
        <span slot="icon-end">→</span>
      </sando-button>
      <sando-button>
        <span slot="icon-start">⬇️</span>
        Both Icons
        <span slot="icon-end">⬇️</span>
      </sando-button>
    </div>
  `
};

/**
 * Loading state with different variants.
 */
export const Loading: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <sando-button loading>Loading Solid</sando-button>
      <sando-button loading variant="outline">Loading Outline</sando-button>
      <sando-button loading variant="ghost">Loading Ghost</sando-button>
    </div>
  `
};

/**
 * Disabled state with different variants.
 */
export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <sando-button disabled>Disabled Solid</sando-button>
      <sando-button disabled variant="outline">Disabled Outline</sando-button>
      <sando-button disabled variant="ghost">Disabled Ghost</sando-button>
    </div>
  `
};

/**
 * Complete showcase of all combinations.
 */
export const Showcase: Story = {
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
    </div>
  `
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
    type: 'button'
  }
};
