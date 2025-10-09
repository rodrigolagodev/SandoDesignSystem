import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../sando-button.ts';

/**
 * Buttons rendered as links using the href attribute.
 * When href is provided, the button renders as an <a> tag instead of <button>.
 */
const meta: Meta = {
  title: 'Components/Button/Links',
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
    href: {
      control: 'text',
      description: 'URL to navigate to (renders as <a> instead of <button>)'
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top']
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
    },
    iconStart: {
      control: 'select',
      options: ['None', '🏠', '→', '⭐', '❤️']
    },
    iconEnd: {
      control: 'select',
      options: ['None', '→', '←', '↗']
    }
  }
};

export default meta;
type Story = StoryObj;

/**
 * Link with target="_blank" - opens in new tab.
 */
export const ExternalLink: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    status: 'default',
    label: 'Visit Documentation',
    href: 'https://example.com',
    target: '_blank',
    disabled: false,
    loading: false,
    iconEnd: '→'
  }
};

/**
 * Internal link - same tab navigation.
 */
export const InternalLink: Story = {
  args: {
    variant: 'outline',
    size: 'medium',
    status: 'default',
    label: 'Go Home',
    href: '/',
    target: '_self',
    disabled: false,
    loading: false,
    iconStart: '🏠'
  }
};

/**
 * Ghost link variant.
 */
export const GhostLink: Story = {
  args: {
    variant: 'ghost',
    size: 'medium',
    status: 'default',
    label: 'Learn More',
    href: '#',
    target: '_self',
    disabled: false,
    loading: false
  }
};

/**
 * All link examples.
 */
export const AllLinks: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <sando-button href="https://example.com" target="_blank">
        External Link
        <span slot="icon-end">→</span>
      </sando-button>
      <sando-button variant="outline" href="/">
        <span slot="icon-start">🏠</span>
        Home
      </sando-button>
      <sando-button variant="ghost" href="/docs">
        Documentation
      </sando-button>
      <sando-button variant="text" href="/learn-more">
        Learn More
      </sando-button>
    </div>
  `
};
