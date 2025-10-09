import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../sando-button.ts';

/**
 * Button states: default, success, destructive, disabled, and loading.
 */
const meta: Meta = {
  title: 'Components/Button/States',
  tags: ['autodocs'],
  render: (args) => html`
    <sando-button
      variant="${args.variant}"
      size="${args.size}"
      status="${args.status}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
      ?full-width="${args.fullWidth}"
      ?icon-only="${args.iconOnly}"
      type="${args.type}"
      href="${args.href || ''}"
      target="${args.target || '_self'}"
    >
      ${args.iconStart && args.iconStart !== 'None' ? html`<span slot="icon-start">${args.iconStart}</span>` : ''}
      ${args.iconOnly ? '' : args.label}
      ${args.iconEnd && args.iconEnd !== 'None' ? html`<span slot="icon-end">${args.iconEnd}</span>` : ''}
    </sando-button>
  `,
  argTypes: {
    status: {
      control: 'select',
      options: ['default', 'success', 'destructive']
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
    loading: {
      control: 'boolean'
    },
    label: {
      control: 'text'
    },
    iconStart: {
      control: 'select',
      options: ['None', '✓', '✗', '⭐', '❤️', '🗑️', '⚙️']
    }
  }
};

export default meta;
type Story = StoryObj;

/**
 * Success state - positive actions or confirmations.
 */
export const Success: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'success',
    label: 'Success',
    disabled: false,
    loading: false,
    iconStart: '✓'
  }
};

/**
 * Destructive state - dangerous or irreversible actions.
 */
export const Destructive: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'destructive',
    label: 'Delete',
    disabled: false,
    loading: false,
    iconStart: '🗑️'
  }
};

/**
 * Disabled state - non-interactive button.
 */
export const Disabled: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Disabled',
    disabled: true,
    loading: false
  }
};

/**
 * Loading state - async operations in progress.
 */
export const Loading: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Loading...',
    disabled: false,
    loading: true
  }
};

/**
 * All states comparison.
 */
export const AllStates: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-button status="default">Default</sando-button>
      <sando-button status="success"><span slot="icon-start">✓</span>Success</sando-button>
      <sando-button status="destructive"><span slot="icon-start">✗</span>Destructive</sando-button>
      <sando-button disabled>Disabled</sando-button>
      <sando-button loading>Loading</sando-button>
    </div>
  `
};
