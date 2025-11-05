import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../sando-button.ts';

/**
 * Button variants define the visual style: solid, outline, and ghost.
 */
const meta: Meta = {
  title: 'Components/Button/Variants',
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
  `
};

export default meta;
type Story = StoryObj;

/**
 * Solid variant - the default, most prominent style.
 */
export const Solid: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Solid Button',
    disabled: false,
    loading: false
  }
};

/**
 * Outline variant - less prominent, bordered style.
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'medium',
    status: 'default',
    label: 'Outline Button',
    disabled: false,
    loading: false
  }
};

/**
 * Ghost variant - subtle, no border or background.
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'medium',
    status: 'default',
    label: 'Ghost Button',
    disabled: false,
    loading: false
  }
};

/**
 * Text variant - Link-style button with underline on hover.
 * Best for inline actions and tertiary navigation.
 */
export const Text: Story = {
  args: {
    variant: 'text',
    size: 'medium',
    status: 'default',
    label: 'Text Link Button',
    disabled: false,
    loading: false
  }
};

/**
 * All variants comparison - including new text variant.
 */
export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-button variant="solid">Solid</sando-button>
      <sando-button variant="outline">Outline</sando-button>
      <sando-button variant="ghost">Ghost</sando-button>
      <sando-button variant="text">Text</sando-button>
    </div>
  `
};
