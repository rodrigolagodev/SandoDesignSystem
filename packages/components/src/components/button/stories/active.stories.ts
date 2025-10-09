import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../sando-button.ts';

/**
 * Active/pressed state for toggle buttons and filters.
 * The `active` prop maintains a persistent pressed visual state and sets `aria-pressed="true"`.
 * Useful for button groups, filters, tabs, and toggles.
 */
const meta: Meta = {
  title: 'Components/Button/Active State',
  tags: ['autodocs'],
  render: (args) => html`
    <sando-button
      variant="${args.variant}"
      size="${args.size}"
      ?active="${args.active}"
      ?disabled="${args.disabled}"
    >
      ${args.iconStart && args.iconStart !== 'None' ? html`<span slot="icon-start">${args.iconStart}</span>` : ''}
      ${args.label}
    </sando-button>
  `,
  argTypes: {
    active: {
      control: 'boolean',
      description: 'Active/pressed state (for toggles and filters)'
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'text']
    },
    size: {
      control: 'select',
      options: ['xs', 'small', 'medium', 'large']
    },
    disabled: {
      control: 'boolean'
    },
    label: {
      control: 'text'
    },
    iconStart: {
      control: 'select',
      options: ['None', '⭐', '❤️', '📝', '👁️', '⚙️', '🔖']
    }
  }
};

export default meta;
type Story = StoryObj;

/**
 * Active solid button.
 */
export const ActiveSolid: Story = {
  args: {
    active: true,
    variant: 'solid',
    size: 'medium',
    label: 'Active Filter',
    disabled: false
  }
};

/**
 * Active outline button.
 */
export const ActiveOutline: Story = {
  args: {
    active: true,
    variant: 'outline',
    size: 'medium',
    label: 'Active Filter',
    disabled: false
  }
};

/**
 * Active ghost button.
 */
export const ActiveGhost: Story = {
  args: {
    active: true,
    variant: 'ghost',
    size: 'medium',
    label: 'Active Filter',
    disabled: false
  }
};

/**
 * Comparison of normal vs active state.
 */
export const Comparison: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4 style="margin-bottom: 0.5rem;">Solid Variant</h4>
        <div style="display: flex; gap: 1rem;">
          <sando-button variant="solid">Normal</sando-button>
          <sando-button variant="solid" active>Active</sando-button>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 0.5rem;">Outline Variant</h4>
        <div style="display: flex; gap: 1rem;">
          <sando-button variant="outline">Normal</sando-button>
          <sando-button variant="outline" active>Active</sando-button>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 0.5rem;">Ghost Variant</h4>
        <div style="display: flex; gap: 1rem;">
          <sando-button variant="ghost">Normal</sando-button>
          <sando-button variant="ghost" active>Active</sando-button>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 0.5rem;">Text Variant</h4>
        <div style="display: flex; gap: 1rem;">
          <sando-button variant="text">Normal</sando-button>
          <sando-button variant="text" active>Active</sando-button>
        </div>
      </div>
    </div>
  `
};

/**
 * Filter buttons example - typical use case for active state.
 */
export const FilterButtons: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <sando-button variant="outline" active>All</sando-button>
      <sando-button variant="outline">Active</sando-button>
      <sando-button variant="outline">Completed</sando-button>
      <sando-button variant="outline">Archived</sando-button>
    </div>
  `
};

/**
 * Tab-like buttons using active state.
 */
export const Tabs: Story = {
  render: () => html`
    <div style="display: flex; gap: 0; border-bottom: 2px solid #e5e7eb;">
      <sando-button variant="ghost" active radius="none" style="border-bottom: 2px solid currentColor; margin-bottom: -2px;">
        Dashboard
      </sando-button>
      <sando-button variant="ghost" radius="none">
        Analytics
      </sando-button>
      <sando-button variant="ghost" radius="none">
        Settings
      </sando-button>
    </div>
  `
};

/**
 * Toggle button group example.
 */
export const ToggleGroup: Story = {
  render: () => html`
    <div style="display: flex; gap: 0.5rem;">
      <sando-button variant="outline" size="small">
        <span slot="icon-start">📝</span>
      </sando-button>
      <sando-button variant="outline" size="small" active>
        <span slot="icon-start">👁️</span>
      </sando-button>
      <sando-button variant="outline" size="small">
        <span slot="icon-start">⚙️</span>
      </sando-button>
    </div>
  `
};

/**
 * Icon-only active buttons.
 */
export const IconOnlyActive: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <sando-button icon-only active aria-label="Favorite">
        <span slot="icon-start">⭐</span>
      </sando-button>
      <sando-button icon-only variant="outline" active aria-label="Liked">
        <span slot="icon-start">❤️</span>
      </sando-button>
      <sando-button icon-only variant="ghost" active aria-label="Bookmarked">
        <span slot="icon-start">🔖</span>
      </sando-button>
    </div>
  `
};
