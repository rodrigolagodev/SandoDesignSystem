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
      ${args.iconStart && args.iconStart !== 'None' ? html`<span slot="icon-start">${args.iconStart}</span>` : ''}
      ${args.label}
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
 * Solid variant - use controls to customize.
 */
export const Solid: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Solid Button',
    disabled: false,
    loading: false,
    fullWidth: false,
    type: 'button',
    iconStart: 'None',
    iconEnd: 'None'
  }
};

/**
 * Small size variant - use controls to customize.
 */
export const Small: Story = {
  args: {
    variant: 'solid',
    size: 'small',
    status: 'default',
    label: 'Small Button',
    disabled: false,
    loading: false,
    fullWidth: false,
    type: 'button',
    iconStart: 'None',
    iconEnd: 'None'
  }
};

/**
 * Medium size variant - use controls to customize.
 */
export const Medium: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Medium Button',
    disabled: false,
    loading: false,
    fullWidth: false,
    type: 'button',
    iconStart: 'None',
    iconEnd: 'None'
  }
};

/**
 * Large size variant - use controls to customize.
 */
export const Large: Story = {
  args: {
    variant: 'solid',
    size: 'large',
    status: 'default',
    label: 'Large Button',
    disabled: false,
    loading: false,
    fullWidth: false,
    type: 'button',
    iconStart: 'None',
    iconEnd: 'None'
  }
};

/**
 * Success status variant - use controls to customize.
 */
export const Success: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'success',
    label: 'Success',
    disabled: false,
    loading: false,
    fullWidth: false,
    type: 'button',
    iconStart: '✓',
    iconEnd: 'None'
  }
};

/**
 * Destructive status variant - use controls to customize.
 */
export const Destructive: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'destructive',
    label: 'Delete',
    disabled: false,
    loading: false,
    fullWidth: false,
    type: 'button',
    iconStart: '🗑️',
    iconEnd: 'None'
  }
};

/**
 * Disabled state - use controls to customize.
 */
export const Disabled: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Disabled Button',
    disabled: true,
    loading: false,
    fullWidth: false,
    type: 'button',
    iconStart: 'None',
    iconEnd: 'None'
  }
};

/**
 * Loading state - use controls to customize.
 */
export const Loading: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Loading...',
    disabled: false,
    loading: true,
    fullWidth: false,
    type: 'button',
    iconStart: 'None',
    iconEnd: 'None'
  }
};

/**
 * Outline variant - use controls to customize.
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'medium',
    status: 'default',
    label: 'Outline Button',
    disabled: false,
    loading: false,
    fullWidth: false,
    type: 'button',
    iconStart: 'None',
    iconEnd: 'None'
  }
};

/**
 * Ghost variant - use controls to customize.
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'medium',
    status: 'default',
    label: 'Ghost Button',
    disabled: false,
    loading: false,
    fullWidth: false,
    type: 'button',
    iconStart: 'None',
    iconEnd: 'None'
  }
};

/**
 * Full width button - use controls to customize.
 */
export const FullWidth: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Full Width Button',
    disabled: false,
    loading: false,
    fullWidth: true,
    type: 'button',
    iconStart: 'None',
    iconEnd: 'None'
  }
};

/**
 * Button with icon start - change icon via controls.
 */
export const WithIconStart: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Favorite',
    disabled: false,
    loading: false,
    fullWidth: false,
    type: 'button',
    iconStart: '⭐',
    iconEnd: 'None'
  }
};

/**
 * Button with icon end - change icon via controls.
 */
export const WithIconEnd: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Next',
    disabled: false,
    loading: false,
    fullWidth: false,
    type: 'button',
    iconStart: 'None',
    iconEnd: '→'
  }
};

/**
 * Button with both icons - change both via controls.
 */
export const WithBothIcons: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Download',
    disabled: false,
    loading: false,
    fullWidth: false,
    type: 'button',
    iconStart: '📥',
    iconEnd: '→'
  }
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
    type: 'button',
    iconStart: 'None',
    iconEnd: 'None'
  }
};
