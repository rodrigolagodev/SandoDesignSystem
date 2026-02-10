import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-spinner.ts';
import { DEFAULT_ARC, MIN_ARC, MAX_ARC } from './sando-spinner.constants.js';

/**
 * A loading spinner component with smooth SVG arc animation.
 * Used to indicate that content is loading or a process is in progress.
 *
 * ## Features
 * - **5 Sizes**: xs (12px), sm (16px), md (24px), lg (32px), xl (48px)
 * - **2 Variants**: default (for light backgrounds), inverted (for dark backgrounds)
 * - **Configurable Arc**: Control how much of the circle is visible (10% to 100%)
 * - **5 Flavors**: Each flavor has unique animation easing for distinct personality
 * - **Accessible**: ARIA role="status" with customizable label for screen readers
 * - **Smooth Animation**: Continuous rotation with flavor-specific easing
 *
 * ## Usage
 *
 * Use spinners to:
 * - Indicate loading states
 * - Show progress during async operations
 * - Provide visual feedback during form submissions
 *
 * ## Accessibility
 * - Uses `role="status"` for screen reader announcements
 * - Customizable `label` prop for descriptive loading text
 * - SVG is `aria-hidden` to prevent redundant announcements
 */
const meta: Meta = {
  title: 'Components/Spinner',
  component: 'sando-spinner',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-spinner
      flavor="${args.flavor || 'original'}"
      size="${args.size}"
      variant="${args.variant}"
      label="${args.label}"
      arc="${args.arc}"
    ></sando-spinner>
  `,
  argTypes: {
    flavor: {
      control: 'select',
      options: ['original', 'strawberry', 'tonkatsu', 'kiwi', 'egg-salad'],
      description: 'Design system flavor/theme - each has unique animation easing',
      table: {
        category: 'Theming',
        type: { summary: 'string' },
        defaultValue: { summary: 'original' }
      }
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the spinner (xs=12px, sm=16px, md=24px, lg=32px, xl=48px)',
      table: {
        category: 'Appearance',
        type: { summary: "'xs' | 'sm' | 'md' | 'lg' | 'xl'" },
        defaultValue: { summary: 'md' }
      }
    },
    variant: {
      control: 'select',
      options: ['default', 'inverted'],
      description: 'Color variant - use inverted on dark backgrounds',
      table: {
        category: 'Appearance',
        type: { summary: "'default' | 'inverted'" },
        defaultValue: { summary: 'default' }
      }
    },
    arc: {
      control: { type: 'range', min: MIN_ARC, max: MAX_ARC, step: 0.05 },
      description: `Arc percentage (${MIN_ARC} = 10%, ${MAX_ARC} = 100% full circle)`,
      table: {
        category: 'Appearance',
        type: { summary: 'number' },
        defaultValue: { summary: String(DEFAULT_ARC) }
      }
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers (not visible)',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'Loading' }
      }
    }
  },
  args: {
    flavor: 'original',
    size: 'md',
    variant: 'default',
    arc: DEFAULT_ARC,
    label: 'Loading'
  }
};

export default meta;
type Story = StoryObj;

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default spinner with medium size and default variant.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 */
export const Playground: Story = {
  args: {
    label: 'Loading data...'
  }
};

// ============================================================================
// SIZES
// ============================================================================

/**
 * All 5 size variants displayed side by side.
 * - xs: 12px - For inline indicators
 * - sm: 16px - For compact spaces
 * - md: 24px - Default, balanced size
 * - lg: 32px - For prominent loading states
 * - xl: 48px - For full-page loading
 */
export const Sizes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-spinner size="xs"></sando-spinner>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">xs (12px)</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-spinner size="sm"></sando-spinner>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">sm (16px)</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-spinner size="md"></sando-spinner>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">md (24px)</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-spinner size="lg"></sando-spinner>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">lg (32px)</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-spinner size="xl"></sando-spinner>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">xl (48px)</span>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// VARIANTS
// ============================================================================

/**
 * Both color variants:
 * - **default**: For use on light backgrounds
 * - **inverted**: For use on dark/solid backgrounds
 */
export const Variants: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: stretch;">
      <!-- Default variant on light background -->
      <div
        style="display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 2rem; background: var(--sando-color-background-raised); border-radius: 8px; border: 1px solid var(--sando-color-border-default);"
      >
        <h4 style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Default
        </h4>
        <sando-spinner size="lg" variant="default"></sando-spinner>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);"
          >Light backgrounds</span
        >
      </div>

      <!-- Inverted variant on dark background -->
      <div
        style="display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 2rem; background: var(--sando-color-background-overlay); border-radius: 8px;"
      >
        <h4 style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-on-solid);">
          Inverted
        </h4>
        <sando-spinner size="lg" variant="inverted"></sando-spinner>
        <span style="font-size: 0.75rem; color: rgba(255,255,255,0.7);">Dark backgrounds</span>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// ARC PERCENTAGES
// ============================================================================

/**
 * Different arc percentages showing how much of the circle is visible:
 * - **10%**: Very small arc, minimal visual
 * - **25%**: Quarter circle
 * - **50%**: Half circle
 * - **75%**: Three-quarters (default)
 * - **100%**: Full circle (no gap)
 */
export const ArcPercentages: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
      ${[0.1, 0.25, 0.5, 0.75, 1.0].map(
        (arc) => html`
          <div
            style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 1.5rem; background: var(--sando-color-background-raised); border-radius: 8px; border: 1px solid var(--sando-color-border-default); min-width: 80px;"
          >
            <sando-spinner size="lg" arc="${arc}"></sando-spinner>
            <span
              style="font-size: 0.75rem; font-weight: 500; color: var(--sando-color-text-body);"
            >
              ${Math.round(arc * 100)}%
            </span>
          </div>
        `
      )}
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// FLAVORS
// ============================================================================

/**
 * Each flavor has a unique animation easing:
 * - **original**: Organic, natural movement
 * - **strawberry**: Energetic, snappy
 * - **tonkatsu**: Gentle, calm
 * - **kiwi**: Smooth, gradual
 * - **egg-salad**: Organic, natural
 */
export const Flavors: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: stretch; flex-wrap: wrap;">
      ${['original', 'strawberry', 'tonkatsu', 'kiwi', 'egg-salad'].map(
        (flavor) => html`
          <div
            style="display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 1.5rem; background: var(--sando-color-background-raised); border-radius: 8px; border: 1px solid var(--sando-color-border-default); min-width: 100px;"
          >
            <sando-spinner size="lg" flavor="${flavor}"></sando-spinner>
            <span
              style="font-size: 0.75rem; font-weight: 500; color: var(--sando-color-text-body);"
            >
              ${flavor}
            </span>
          </div>
        `
      )}
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// IN BUTTON (Usage Example)
// ============================================================================

/**
 * Example of a spinner inside a button to indicate loading state.
 * This previews how the spinner can be used in a loading button pattern.
 */
export const InButton: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          Loading Button States
        </h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <!-- Solid button with spinner -->
          <button
            disabled
            style="
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.625rem 1rem;
              background: var(--sando-color-primary-solid);
              color: var(--sando-color-text-on-solid);
              border: none;
              border-radius: 6px;
              font-size: 0.875rem;
              font-weight: 500;
              cursor: not-allowed;
              opacity: 0.8;
            "
          >
            <sando-spinner size="xs" variant="inverted" label="Submitting form"></sando-spinner>
            Submitting...
          </button>

          <!-- Outline button with spinner -->
          <button
            disabled
            style="
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.625rem 1rem;
              background: transparent;
              color: var(--sando-color-text-body);
              border: 1px solid var(--sando-color-border-default);
              border-radius: 6px;
              font-size: 0.875rem;
              font-weight: 500;
              cursor: not-allowed;
              opacity: 0.8;
            "
          >
            <sando-spinner size="xs" variant="default" label="Loading"></sando-spinner>
            Loading...
          </button>
        </div>
      </div>

      <div>
        <h4
          style="margin: 0 0 0.75rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
        >
          Different Sizes in Buttons
        </h4>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <!-- Small button -->
          <button
            disabled
            style="
              display: inline-flex;
              align-items: center;
              gap: 0.375rem;
              padding: 0.375rem 0.75rem;
              background: var(--sando-color-primary-solid);
              color: var(--sando-color-text-on-solid);
              border: none;
              border-radius: 4px;
              font-size: 0.75rem;
              font-weight: 500;
              cursor: not-allowed;
            "
          >
            <sando-spinner size="xs" variant="inverted"></sando-spinner>
            Small
          </button>

          <!-- Medium button -->
          <button
            disabled
            style="
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.625rem 1rem;
              background: var(--sando-color-primary-solid);
              color: var(--sando-color-text-on-solid);
              border: none;
              border-radius: 6px;
              font-size: 0.875rem;
              font-weight: 500;
              cursor: not-allowed;
            "
          >
            <sando-spinner size="sm" variant="inverted"></sando-spinner>
            Medium
          </button>

          <!-- Large button -->
          <button
            disabled
            style="
              display: inline-flex;
              align-items: center;
              gap: 0.5rem;
              padding: 0.875rem 1.5rem;
              background: var(--sando-color-primary-solid);
              color: var(--sando-color-text-on-solid);
              border: none;
              border-radius: 8px;
              font-size: 1rem;
              font-weight: 500;
              cursor: not-allowed;
            "
          >
            <sando-spinner size="sm" variant="inverted"></sando-spinner>
            Large
          </button>
        </div>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

// ============================================================================
// ALL COMBINATIONS
// ============================================================================

/**
 * Complete matrix showing all size × variant combinations.
 * Useful for visual testing and design review.
 */
export const AllCombinations: Story = {
  tags: DOCS_ONLY,
  render: () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    return html`
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Default variant -->
        <div
          style="padding: 1.5rem; background: var(--sando-color-background-raised); border-radius: 8px; border: 1px solid var(--sando-color-border-default);"
        >
          <h4
            style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--sando-color-text-muted);"
          >
            Default Variant (Light Backgrounds)
          </h4>
          <div style="display: flex; gap: 2rem; align-items: center;">
            ${sizes.map(
              (size) => html`
                <div
                  style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"
                >
                  <sando-spinner size="${size}" variant="default"></sando-spinner>
                  <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);"
                    >${size}</span
                  >
                </div>
              `
            )}
          </div>
        </div>

        <!-- Inverted variant -->
        <div
          style="padding: 1.5rem; background: var(--sando-color-background-overlay); border-radius: 8px;"
        >
          <h4
            style="margin: 0 0 1rem 0; font-size: 0.875rem; color: var(--sando-color-text-on-solid);"
          >
            Inverted Variant (Dark Backgrounds)
          </h4>
          <div style="display: flex; gap: 2rem; align-items: center;">
            ${sizes.map(
              (size) => html`
                <div
                  style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"
                >
                  <sando-spinner size="${size}" variant="inverted"></sando-spinner>
                  <span style="font-size: 0.75rem; color: rgba(255,255,255,0.7);">${size}</span>
                </div>
              `
            )}
          </div>
        </div>
      </div>
    `;
  },
  parameters: { controls: { disable: true } }
};
