import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../sando-button.ts';

/**
 * Button sizes: xs (extra small), small, medium, and large.
 * Medium size (44px min-height) meets WCAG touch target requirements.
 */
const meta: Meta = {
  title: 'Components/Button/Sizes',
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
  `
};

export default meta;
type Story = StoryObj;

/**
 * Extra Small size - minimal buttons for very dense UIs.
 */
export const ExtraSmall: Story = {
  args: {
    variant: 'solid',
    size: 'xs',
    status: 'default',
    label: 'XS Button',
    disabled: false,
    loading: false
  }
};

/**
 * Small size - compact buttons for dense UIs.
 */
export const Small: Story = {
  args: {
    variant: 'solid',
    size: 'small',
    status: 'default',
    label: 'Small Button',
    disabled: false,
    loading: false
  }
};

/**
 * Medium size - the default, balanced size.
 */
export const Medium: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Medium Button',
    disabled: false,
    loading: false
  }
};

/**
 * Large size - prominent buttons for primary actions.
 */
export const Large: Story = {
  args: {
    variant: 'solid',
    size: 'large',
    status: 'default',
    label: 'Large Button',
    disabled: false,
    loading: false
  }
};

/**
 * All sizes comparison - XS to Large.
 */
export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-button size="xs">XS</sando-button>
      <sando-button size="small">Small</sando-button>
      <sando-button size="medium">Medium (WCAG)</sando-button>
      <sando-button size="large">Large</sando-button>
    </div>
  `
};
