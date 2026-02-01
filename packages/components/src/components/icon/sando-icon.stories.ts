import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-icon.ts';
import { iconNames } from './icon-manifest';

/**
 * The Icon component provides 1,637 high-quality SVG icons from Lucide Icons.
 * Icons are tree-shakeable via Vite and scale with font sizes for visual harmony.
 *
 * ## Features
 * - **1,637 Icons**: Complete Lucide icon library embedded
 * - **5 Sizes**: xs (12px), small (14px), medium (18px), large (24px), xl (32px)
 * - **5 Semantic Colors**: default, muted, emphasis, brand, onSolid
 * - **Custom Overrides**: Custom color and size via props
 * - **Transformations**: Rotate (0°, 90°, 180°, 270°), flip horizontal/vertical
 * - **Accessibility**: WCAG 2.1 AA compliant with aria-label and decorative mode
 * - **Tree-shaking**: Only icons you use are bundled (Vite ?raw imports)
 * - **Font-size Scaling**: Icons scale with typography for visual consistency
 *
 * ## Design Tokens
 * This component uses design tokens from the `recipes/icon` layer.
 * Icon sizes reference font sizes (Ingredients) for perfect alignment with text.
 * Tokens follow the 3-layer architecture: Recipes → Flavors → Ingredients.
 *
 * ## Accessibility
 * - Use `aria-label` for icons with semantic meaning
 * - Use `decorative` prop for purely decorative icons (hidden from screen readers)
 * - Icons automatically get `role="img"` unless decorative
 */
const meta: Meta = {
  title: 'Components/Icon',
  component: 'sando-icon',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-icon
      name="${args.name}"
      size="${args.size || 'medium'}"
      color="${args.color || 'default'}"
      custom-color="${args.customColor || ''}"
      custom-size="${args.customSize || ''}"
      ?flip-horizontal="${args.flipHorizontal}"
      ?flip-vertical="${args.flipVertical}"
      rotate="${args.rotate || 0}"
      ?decorative="${args.decorative}"
      aria-label="${args.ariaLabel || ''}"
      stroke-width="${args.strokeWidth || 2}"
      ?inherit-color="${args.inheritColor}"
    ></sando-icon>
  `,
  argTypes: {
    name: {
      control: 'select',
      options: iconNames.slice(0, 50), // Show first 50 for performance
      description: 'Icon name from Lucide library (1,637 total icons)',
      table: {
        type: { summary: 'IconName' }
      }
    },
    size: {
      control: 'select',
      options: ['xs', 'small', 'medium', 'large', 'xl'],
      description: 'Icon size (scales with font sizes)',
      table: {
        type: { summary: 'xs | small | medium | large | xl' },
        defaultValue: { summary: 'medium' }
      }
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'emphasis', 'brand', 'onSolid'],
      description: 'Semantic color variant',
      table: {
        type: { summary: 'default | muted | emphasis | brand | onSolid' },
        defaultValue: { summary: 'default' }
      }
    },
    customColor: {
      control: 'color',
      description: 'Custom color override (CSS color value)',
      table: {
        type: { summary: 'string' }
      }
    },
    customSize: {
      control: 'text',
      description: 'Custom size override (CSS dimension)',
      table: {
        type: { summary: 'string' }
      }
    },
    flipHorizontal: {
      control: 'boolean',
      description: 'Flip icon horizontally',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    flipVertical: {
      control: 'boolean',
      description: 'Flip icon vertically',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    rotate: {
      control: 'select',
      options: [0, 90, 180, 270],
      description: 'Rotation angle in degrees',
      table: {
        type: { summary: '0 | 90 | 180 | 270' },
        defaultValue: { summary: '0' }
      }
    },
    decorative: {
      control: 'boolean',
      description: 'Mark as decorative (hidden from screen readers)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label (required for semantic icons)',
      table: {
        type: { summary: 'string' }
      }
    },
    strokeWidth: {
      control: 'number',
      description: 'SVG stroke width',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2' }
      }
    },
    inheritColor: {
      control: 'boolean',
      description: 'Inherit color from parent text (currentColor)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
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
 * Default icon with medium size and default color.
 */
export const Default: Story = {
  args: {
    name: 'star',
    size: 'medium',
    color: 'default'
  }
};

/**
 * Interactive playground - use the controls to customize the icon.
 */
export const Playground: Story = {
  args: {
    name: 'heart',
    size: 'large',
    color: 'brand'
  }
};

/**
 * Complete icon catalog - all 1,637 Lucide icons.
 * Click an icon to copy its name to clipboard.
 */
export const IconCatalog: Story = {
  render: () => {
    // Group icons by category based on name patterns
    const categories: Record<string, string[]> = {
      Arrows: iconNames.filter((name) => name.includes('arrow') || name.includes('chevron')),
      UI: iconNames.filter((name) =>
        ['menu', 'x', 'plus', 'minus', 'check', 'circle', 'square', 'star'].some((term) =>
          name.includes(term)
        )
      ),
      Communication: iconNames.filter((name) =>
        ['mail', 'message', 'phone', 'chat', 'send'].some((term) => name.includes(term))
      ),
      Media: iconNames.filter((name) =>
        ['play', 'pause', 'music', 'video', 'image', 'camera', 'film'].some((term) =>
          name.includes(term)
        )
      ),
      Files: iconNames.filter((name) =>
        ['file', 'folder', 'document', 'upload', 'download'].some((term) => name.includes(term))
      ),
      Social: iconNames.filter((name) =>
        ['twitter', 'facebook', 'instagram', 'github', 'linkedin', 'youtube'].some((term) =>
          name.includes(term)
        )
      ),
      Weather: iconNames.filter((name) =>
        ['cloud', 'sun', 'moon', 'rain', 'snow', 'wind'].some((term) => name.includes(term))
      ),
      Development: iconNames.filter((name) =>
        ['code', 'terminal', 'git', 'database', 'server', 'cpu'].some((term) => name.includes(term))
      )
    };

    // Get all categorized icons
    const categorizedIcons = new Set(Object.values(categories).flat());
    // Remaining icons
    const others = iconNames.filter((name) => !categorizedIcons.has(name));
    categories['Others'] = others;

    return html`
      <div style="display: flex; flex-direction: column; gap: 3rem;">
        <div
          style="padding: 1rem; background: var(--sando-color-background-surface); border-radius: 8px;"
        >
          <p style="margin: 0; color: var(--sando-color-text-body);">
            <strong>Total Icons:</strong> ${iconNames.length} |
            <strong>Categories:</strong> ${Object.keys(categories).length}
          </p>
        </div>

        ${Object.entries(categories).map(
          ([category, icons]) => html`
            <div>
              <h3 style="margin-bottom: 1rem; color: var(--sando-color-text-heading);">
                ${category}
                <span style="color: var(--sando-color-text-caption); font-weight: normal;"
                  >(${icons.length})</span
                >
              </h3>
              <div
                style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem; max-height: 400px; overflow-y: auto; padding: 1rem; background: var(--sando-color-background-surface); border-radius: 8px;"
              >
                ${icons.slice(0, 100).map(
                  (name) => html`
                    <div
                      style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 0.75rem; border-radius: 6px; cursor: pointer; transition: background 0.2s;"
                      onmouseover="this.style.background='var(--sando-color-background-emphasis)'"
                      onmouseout="this.style.background='transparent'"
                      title="${name}"
                      onclick="navigator.clipboard.writeText('${name}'); this.querySelector('span').textContent = 'Copied!'; setTimeout(() => this.querySelector('span').textContent = '${name}', 1000);"
                    >
                      <sando-icon name="${name}" size="large"></sando-icon>
                      <span
                        style="font-size: 0.625rem; color: var(--sando-color-text-caption); text-align: center; word-break: break-word; max-width: 100%;"
                      >
                        ${name}
                      </span>
                    </div>
                  `
                )}
                ${icons.length > 100
                  ? html`
                      <div
                        style="grid-column: 1 / -1; text-align: center; padding: 1rem; color: var(--sando-color-text-caption);"
                      >
                        ... and ${icons.length - 100} more icons
                      </div>
                    `
                  : ''}
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * All icon sizes comparison.
 * Icons scale with font sizes: xs=12px, small=14px, medium=18px, large=24px, xl=32px.
 */
export const Sizes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-icon name="star" size="xs"></sando-icon>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">xs (12px)</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-icon name="star" size="small"></sando-icon>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);"
          >small (14px)</span
        >
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-icon name="star" size="medium"></sando-icon>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);"
          >medium (18px)</span
        >
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-icon name="star" size="large"></sando-icon>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);"
          >large (24px)</span
        >
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-icon name="star" size="xl"></sando-icon>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">xl (32px)</span>
      </div>
    </div>
  `
};

/**
 * All semantic color variants.
 */
export const Colors: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-icon name="circle" size="large" color="default"></sando-icon>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">default</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-icon name="circle" size="large" color="muted"></sando-icon>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">muted</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-icon name="circle" size="large" color="emphasis"></sando-icon>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">emphasis</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <sando-icon name="circle" size="large" color="brand"></sando-icon>
        <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">brand</span>
      </div>
      <div
        style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem; padding: 1rem; background: var(--sando-color-brand-700); border-radius: 8px;"
      >
        <sando-icon name="circle" size="large" color="onSolid"></sando-icon>
        <span style="font-size: 0.75rem; color: var(--sando-color-neutral-100);">onSolid</span>
      </div>
    </div>
  `
};

/**
 * Icon transformations: rotation and flipping.
 */
export const Transformations: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Rotation -->
      <div>
        <h4
          style="margin-bottom: 1rem; font-size: 0.875rem; color: var(--sando-color-text-caption);"
        >
          Rotation
        </h4>
        <div style="display: flex; gap: 2rem; align-items: center;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <sando-icon name="arrow-right" size="large" rotate="0"></sando-icon>
            <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">0°</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <sando-icon name="arrow-right" size="large" rotate="90"></sando-icon>
            <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">90°</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <sando-icon name="arrow-right" size="large" rotate="180"></sando-icon>
            <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">180°</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <sando-icon name="arrow-right" size="large" rotate="270"></sando-icon>
            <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">270°</span>
          </div>
        </div>
      </div>

      <!-- Flipping -->
      <div>
        <h4
          style="margin-bottom: 1rem; font-size: 0.875rem; color: var(--sando-color-text-caption);"
        >
          Flipping
        </h4>
        <div style="display: flex; gap: 2rem; align-items: center;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <sando-icon name="chevron-right" size="large"></sando-icon>
            <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);">normal</span>
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <sando-icon name="chevron-right" size="large" flip-horizontal></sando-icon>
            <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);"
              >flip-horizontal</span
            >
          </div>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
            <sando-icon name="arrow-down" size="large" flip-vertical></sando-icon>
            <span style="font-size: 0.75rem; color: var(--sando-color-text-caption);"
              >flip-vertical</span
            >
          </div>
        </div>
      </div>
    </div>
  `
};

/**
 * Common use cases with icons paired with text.
 */
export const WithText: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      <!-- Icons with text -->
      <div style="display: flex; gap: 1rem; align-items: center;">
        <sando-icon name="star" size="small" color="brand"></sando-icon>
        <span>Favorite this item</span>
      </div>

      <div style="display: flex; gap: 1rem; align-items: center;">
        <sando-icon name="download" size="small"></sando-icon>
        <span>Download file</span>
      </div>

      <div style="display: flex; gap: 1rem; align-items: center;">
        <sando-icon name="settings" size="small" color="muted"></sando-icon>
        <span>Settings</span>
      </div>

      <div style="display: flex; gap: 1rem; align-items: center;">
        <sando-icon name="check-circle" size="small" color="emphasis"></sando-icon>
        <span>Task completed</span>
      </div>

      <!-- Inherit color from text -->
      <div>
        <h4
          style="margin-top: 1rem; margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--sando-color-text-caption);"
        >
          Inherit color from parent
        </h4>
        <p style="color: #ef4444;">
          <sando-icon name="alert-circle" size="small" inherit-color></sando-icon>
          Error message with matching icon color
        </p>
        <p style="color: #10b981;">
          <sando-icon name="check-circle" size="small" inherit-color></sando-icon>
          Success message with matching icon color
        </p>
      </div>
    </div>
  `
};

/**
 * Accessibility examples showing proper usage.
 */
export const Accessibility: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h4 style="margin-bottom: 1rem;">Semantic icons (with aria-label)</h4>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          <button
            style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer;"
          >
            <sando-icon name="trash-2" size="small" aria-label="Delete item"></sando-icon>
            Delete
          </button>

          <button
            style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer;"
          >
            <sando-icon name="edit" size="small" aria-label="Edit content"></sando-icon>
            Edit
          </button>

          <button
            style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer;"
          >
            <sando-icon name="save" size="small" aria-label="Save changes"></sando-icon>
            Save
          </button>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom: 1rem;">Decorative icons (hidden from screen readers)</h4>
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <sando-icon name="star" size="small" color="brand" decorative></sando-icon>
            <span>Featured item (icon is decorative)</span>
          </div>

          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <sando-icon name="zap" size="small" color="emphasis" decorative></sando-icon>
            <span>Fast delivery (icon is decorative)</span>
          </div>
        </div>
      </div>

      <div
        style="padding: 1rem; background: var(--sando-color-background-surface); border-radius: 8px;"
      >
        <p style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-body);">
          <strong>Best Practice:</strong> Use <code>aria-label</code> when the icon conveys
          information, use <code>decorative</code> when it's purely visual enhancement.
        </p>
      </div>
    </div>
  `
};
