import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../sando-button.ts';

/**
 * Buttons with icons using slots: icon-start, icon-end, and icon-only mode.
 */
const meta: Meta = {
  title: 'Components/Button/Icons',
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
 * Icon at the start of the button.
 */
export const IconStart: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Favorite',
    disabled: false,
    loading: false,
    iconStart: '⭐'
  }
};

/**
 * Icon at the end of the button.
 */
export const IconEnd: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Next',
    disabled: false,
    loading: false,
    iconEnd: '→'
  }
};

/**
 * Icons at both start and end.
 */
export const BothIcons: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Download',
    disabled: false,
    loading: false,
    iconStart: '📥',
    iconEnd: '→'
  }
};

/**
 * Icon-only button - square shape, no text.
 */
export const IconOnly: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: '',
    disabled: false,
    loading: false,
    iconOnly: true,
    iconStart: '❤️'
  }
};

/**
 * Icon-only button sizes comparison.
 */
export const IconOnlySizes: Story = {
  render: () => html`
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
    </div>
  `
};

/**
 * Icon-only button variants comparison.
 */
export const IconOnlyVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-button icon-only variant="solid">
        <span slot="icon-start">❤️</span>
      </sando-button>
      <sando-button icon-only variant="outline">
        <span slot="icon-start">🗑️</span>
      </sando-button>
      <sando-button icon-only variant="ghost">
        <span slot="icon-start">✏️</span>
      </sando-button>
    </div>
  `
};

/**
 * All icon examples.
 */
export const AllIconExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin-bottom: 1rem;">With Text</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <sando-button>
            <span slot="icon-start">⭐</span>
            Icon Start
          </sando-button>
          <sando-button>
            Icon End
            <span slot="icon-end">→</span>
          </sando-button>
          <sando-button>
            <span slot="icon-start">📥</span>
            Both
            <span slot="icon-end">→</span>
          </sando-button>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 1rem;">Icon-only</h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <sando-button icon-only size="small">
            <span slot="icon-start">⭐</span>
          </sando-button>
          <sando-button icon-only>
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
        </div>
      </div>
    </div>
  `
};
