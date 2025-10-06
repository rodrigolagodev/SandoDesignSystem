import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../sando-button.ts';

/**
 * Border radius variants: none, default, and full (circular).
 * The `full` variant is particularly useful for circular icon-only buttons.
 */
const meta: Meta = {
  title: 'Components/Button/Radius',
  tags: ['autodocs'],
  render: (args) => html`
    <sando-button
      variant="${args.variant}"
      size="${args.size}"
      radius="${args.radius}"
      ?icon-only="${args.iconOnly}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      ${args.iconStart && args.iconStart !== 'None' ? html`<span slot="icon-start">${args.iconStart}</span>` : ''}
      ${args.iconOnly ? '' : args.label}
    </sando-button>
  `,
  argTypes: {
    radius: {
      control: 'select',
      options: ['none', 'default', 'full'],
      description: 'Border radius variant'
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    iconOnly: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    },
    loading: {
      control: 'boolean'
    },
    label: {
      control: 'text'
    },
    iconStart: {
      control: 'select',
      options: ['None', '⭐', '❤️', '➕', '⚙️', '🔍']
    }
  }
};

export default meta;
type Story = StoryObj;

/**
 * No border radius - sharp rectangular corners.
 */
export const None: Story = {
  args: {
    radius: 'none',
    variant: 'solid',
    size: 'medium',
    label: 'No Radius',
    disabled: false,
    loading: false
  }
};

/**
 * Default border radius - uses design system tokens.
 */
export const Default: Story = {
  args: {
    radius: 'default',
    variant: 'solid',
    size: 'medium',
    label: 'Default Radius',
    disabled: false,
    loading: false
  }
};

/**
 * Full border radius - completely rounded (pill shape).
 */
export const Full: Story = {
  args: {
    radius: 'full',
    variant: 'solid',
    size: 'medium',
    label: 'Full Radius',
    disabled: false,
    loading: false
  }
};

/**
 * Circular icon-only button with full radius.
 * Perfect for floating action buttons or icon buttons.
 */
export const CircularIcon: Story = {
  args: {
    radius: 'full',
    variant: 'solid',
    size: 'medium',
    label: '',
    iconOnly: true,
    iconStart: '➕',
    disabled: false,
    loading: false
  }
};

/**
 * All radius variants comparison.
 */
export const AllRadius: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-button radius="none">None</sando-button>
      <sando-button radius="default">Default</sando-button>
      <sando-button radius="full">Full</sando-button>

      <sando-button icon-only radius="none">
        <span slot="icon-start">⭐</span>
      </sando-button>
      <sando-button icon-only radius="default">
        <span slot="icon-start">❤️</span>
      </sando-button>
      <sando-button icon-only radius="full">
        <span slot="icon-start">➕</span>
      </sando-button>
    </div>
  `
};

/**
 * Radius variants with different button variants.
 */
export const WithVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin-bottom: 0.5rem;">Solid</h4>
        <div style="display: flex; gap: 1rem;">
          <sando-button variant="solid" radius="none">None</sando-button>
          <sando-button variant="solid" radius="default">Default</sando-button>
          <sando-button variant="solid" radius="full">Full</sando-button>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 0.5rem;">Outline</h4>
        <div style="display: flex; gap: 1rem;">
          <sando-button variant="outline" radius="none">None</sando-button>
          <sando-button variant="outline" radius="default">Default</sando-button>
          <sando-button variant="outline" radius="full">Full</sando-button>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 0.5rem;">Ghost</h4>
        <div style="display: flex; gap: 1rem;">
          <sando-button variant="ghost" radius="none">None</sando-button>
          <sando-button variant="ghost" radius="default">Default</sando-button>
          <sando-button variant="ghost" radius="full">Full</sando-button>
        </div>
      </div>
    </div>
  `
};

/**
 * Circular icon buttons in different sizes.
 */
export const CircularSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <sando-button icon-only radius="full" size="small">
        <span slot="icon-start">⭐</span>
      </sando-button>
      <sando-button icon-only radius="full" size="medium">
        <span slot="icon-start">❤️</span>
      </sando-button>
      <sando-button icon-only radius="full" size="large">
        <span slot="icon-start">➕</span>
      </sando-button>
    </div>
  `
};
