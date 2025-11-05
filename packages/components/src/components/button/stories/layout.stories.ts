import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../sando-button.ts';

/**
 * Layout options for buttons: full-width.
 */
const meta: Meta = {
  title: 'Components/Button/Layout',
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
      ${args.iconStart && args.iconStart !== 'None'
        ? html`<span slot="icon-start">${args.iconStart}</span>`
        : ''}
      ${args.iconOnly ? '' : args.label}
      ${args.iconEnd && args.iconEnd !== 'None'
        ? html`<span slot="icon-end">${args.iconEnd}</span>`
        : ''}
    </sando-button>
  `,
  argTypes: {
    fullWidth: {
      control: 'boolean'
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'text']
    },
    size: {
      control: 'select',
      options: ['xs', 'small', 'medium', 'large']
    },
    status: {
      control: 'select',
      options: ['default', 'success', 'destructive']
    },
    disabled: {
      control: 'boolean'
    },
    loading: {
      control: 'boolean'
    },
    label: {
      control: 'text'
    }
  }
};

export default meta;
type Story = StoryObj;

/**
 * Full-width button - takes up 100% of parent width.
 */
export const FullWidth: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Full Width Button',
    disabled: false,
    loading: false,
    fullWidth: true
  }
};

/**
 * Full-width comparison.
 */
export const FullWidthComparison: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <sando-button>Normal Width</sando-button>
      <sando-button full-width>Full Width</sando-button>
      <sando-button full-width variant="outline">Full Width Outline</sando-button>
      <sando-button full-width variant="ghost">Full Width Ghost</sando-button>
      <sando-button full-width variant="text">Full Width Text</sando-button>
    </div>
  `
};
