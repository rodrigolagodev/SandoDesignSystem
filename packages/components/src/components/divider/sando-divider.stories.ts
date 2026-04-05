import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-divider.js';

/**
 * # Divider Component
 *
 * The Divider creates a visual separation between content sections.
 * It supports both horizontal and vertical orientations, multiple
 * line styles, and an optional centered text label.
 *
 * ## Rendering behavior
 *
 * - **Horizontal, no label** → renders as `<hr>` with native `role="separator"`
 * - **Horizontal, with label** → renders as `<div role="separator" aria-label="...">` with centered label between two lines
 * - **Vertical** → renders as `<div role="separator" aria-orientation="vertical">`
 *
 * ## Accessibility
 *
 * - Uses native `<hr>` when possible for optimal screen reader support
 * - `role="separator"` is always present for ARIA compatibility
 * - `aria-orientation="vertical"` is added for vertical dividers
 * - `aria-label` is set to the label text when provided
 */
const meta: Meta = {
  title: 'Components/Divider',
  component: 'sando-divider',
  tags: ['autodocs', 'stable'],
  render: (args) =>
    args.orientation === 'vertical'
      ? html`
          <div style="display: flex; align-items: center; height: 3rem; gap: 1rem;">
            <span style="color: var(--sando-color-text-body);">Left content</span>
            <sando-divider
              orientation="vertical"
              weight="${args.weight}"
              variant="${args.variant}"
              spacing="${args.spacing}"
            ></sando-divider>
            <span style="color: var(--sando-color-text-body);">Right content</span>
          </div>
        `
      : html`
          <sando-divider
            orientation="${args.orientation}"
            weight="${args.weight}"
            variant="${args.variant}"
            spacing="${args.spacing}"
            .label="${args.label || undefined}"
          ></sando-divider>
        `,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction of the divider line',
      table: {
        category: 'Appearance',
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' }
      }
    },
    weight: {
      control: 'select',
      options: ['thin', 'medium', 'thick'],
      description: 'Thickness of the divider line',
      table: {
        category: 'Appearance',
        type: { summary: "'thin' | 'medium' | 'thick'" },
        defaultValue: { summary: 'medium' }
      }
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Visual style of the divider line',
      table: {
        category: 'Appearance',
        type: { summary: "'solid' | 'dashed' | 'dotted'" },
        defaultValue: { summary: 'solid' }
      }
    },
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description:
        'Margin space around the divider. Applied as `margin-block` for horizontal and `margin-inline` for vertical.',
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' }
      }
    },
    label: {
      control: 'text',
      description:
        'Optional centered text label displayed within the divider. When set, renders as `role="separator"` with `aria-label`.',
      table: {
        category: 'Content',
        type: { summary: 'string | undefined' },
        defaultValue: { summary: 'undefined' }
      }
    }
  },
  args: {
    orientation: 'horizontal',
    weight: 'medium',
    variant: 'solid',
    spacing: 'md',
    label: undefined
  }
};

export default meta;
type Story = StoryObj;

// Tag constant for documentation-only stories (hidden from sidebar, shown in autodocs)
const DOCS_ONLY = { tags: ['!dev'] };

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default horizontal divider — medium weight, solid line, md spacing.
 */
export const Default: Story = {};

/**
 * Interactive playground — use the Controls panel to explore all props.
 */
export const Playground: Story = {
  name: 'Playground ↗',
  args: {
    orientation: 'horizontal',
    weight: 'medium',
    variant: 'solid',
    spacing: 'md',
    label: undefined
  }
};

/**
 * Divider with a centered label — common for "OR" / "AND" separators in forms.
 */
export const WithLabel: Story = {
  args: {
    label: 'OR'
  }
};

/**
 * Vertical divider — requires a flex container with a defined height.
 * Use in navbars, toolbars, or any inline content separation.
 */
export const Vertical: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; height: 3rem; gap: 1rem;">
      <span style="color: var(--sando-color-text-body);">Left content</span>
      <sando-divider orientation="vertical"></sando-divider>
      <span style="color: var(--sando-color-text-body);">Right content</span>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in autodocs)
// ============================================================================

/**
 * All weight options — thin, medium, and thick.
 */
export const AllWeights: Story = {
  ...DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <div>
        <span
          style="display: block; margin-bottom: 0.25rem; font-size: 0.75rem; color: var(--sando-color-text-muted);"
          >thin</span
        >
        <sando-divider weight="thin"></sando-divider>
      </div>
      <div>
        <span
          style="display: block; margin-bottom: 0.25rem; font-size: 0.75rem; color: var(--sando-color-text-muted);"
          >medium</span
        >
        <sando-divider weight="medium"></sando-divider>
      </div>
      <div>
        <span
          style="display: block; margin-bottom: 0.25rem; font-size: 0.75rem; color: var(--sando-color-text-muted);"
          >thick</span
        >
        <sando-divider weight="thick"></sando-divider>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All variant styles — solid, dashed, and dotted.
 */
export const AllVariants: Story = {
  ...DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <div>
        <span
          style="display: block; margin-bottom: 0.25rem; font-size: 0.75rem; color: var(--sando-color-text-muted);"
          >solid</span
        >
        <sando-divider variant="solid"></sando-divider>
      </div>
      <div>
        <span
          style="display: block; margin-bottom: 0.25rem; font-size: 0.75rem; color: var(--sando-color-text-muted);"
          >dashed</span
        >
        <sando-divider variant="dashed"></sando-divider>
      </div>
      <div>
        <span
          style="display: block; margin-bottom: 0.25rem; font-size: 0.75rem; color: var(--sando-color-text-muted);"
          >dotted</span
        >
        <sando-divider variant="dotted"></sando-divider>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All spacing options — sm, md, lg — with visible surrounding content
 * so the margin effect is apparent.
 */
export const AllSpacing: Story = {
  ...DOCS_ONLY,
  render: () => html`
    <div
      style="border: 1px dashed var(--sando-color-border-muted); border-radius: 4px; padding: 0.5rem;"
    >
      <p
        style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-muted); text-align: center;"
      >
        spacing="sm"
      </p>
      <sando-divider spacing="sm"></sando-divider>
      <p
        style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-muted); text-align: center;"
      >
        Content
      </p>
    </div>

    <div
      style="margin-top: 1.5rem; border: 1px dashed var(--sando-color-border-muted); border-radius: 4px; padding: 0.5rem;"
    >
      <p
        style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-muted); text-align: center;"
      >
        spacing="md"
      </p>
      <sando-divider spacing="md"></sando-divider>
      <p
        style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-muted); text-align: center;"
      >
        Content
      </p>
    </div>

    <div
      style="margin-top: 1.5rem; border: 1px dashed var(--sando-color-border-muted); border-radius: 4px; padding: 0.5rem;"
    >
      <p
        style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-muted); text-align: center;"
      >
        spacing="lg"
      </p>
      <sando-divider spacing="lg"></sando-divider>
      <p
        style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-muted); text-align: center;"
      >
        Content
      </p>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Both orientations shown together — horizontal above, vertical inline.
 */
export const AllOrientations: Story = {
  ...DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <p style="margin: 0 0 0.5rem 0; font-size: 0.75rem; color: var(--sando-color-text-muted);">
          Horizontal
        </p>
        <sando-divider orientation="horizontal"></sando-divider>
      </div>
      <div>
        <p style="margin: 0 0 0.5rem 0; font-size: 0.75rem; color: var(--sando-color-text-muted);">
          Vertical (inside flex container)
        </p>
        <div style="display: flex; align-items: center; height: 3rem; gap: 1rem;">
          <span style="color: var(--sando-color-text-body);">Section A</span>
          <sando-divider orientation="vertical"></sando-divider>
          <span style="color: var(--sando-color-text-body);">Section B</span>
          <sando-divider orientation="vertical"></sando-divider>
          <span style="color: var(--sando-color-text-body);">Section C</span>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Different label texts — short connectors, section titles.
 */
export const LabelVariants: Story = {
  ...DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <sando-divider label="OR"></sando-divider>
      <sando-divider label="AND"></sando-divider>
      <sando-divider label="Section Title"></sando-divider>
      <sando-divider label="· · ·"></sando-divider>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Realistic in-context usage — content blocks separated by a labeled divider,
 * mimicking a login / sign-up form pattern.
 */
export const InContext: Story = {
  ...DOCS_ONLY,
  render: () => html`
    <div
      style="max-width: 400px; padding: 2rem; background: var(--sando-color-background-surface); border: 1px solid var(--sando-color-border-muted); border-radius: 0.75rem;"
    >
      <!-- Section one -->
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <p style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-body);">
          Continue with your existing account to access all features and saved preferences.
        </p>
        <button
          style="padding: 0.625rem 1rem; border-radius: 0.375rem; border: none; background: var(--sando-color-background-overlay); color: var(--sando-color-text-body); font-size: 0.875rem; cursor: pointer;"
        >
          Sign in
        </button>
      </div>

      <!-- Divider with label -->
      <sando-divider label="OR"></sando-divider>

      <!-- Section two -->
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <p style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-body);">
          New here? Create a free account and get started in seconds.
        </p>
        <button
          style="padding: 0.625rem 1rem; border-radius: 0.375rem; border: 1px solid var(--sando-color-border-default); background: transparent; color: var(--sando-color-text-body); font-size: 0.875rem; cursor: pointer;"
        >
          Create account
        </button>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
