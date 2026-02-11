/**
 * Storybook stories for sando-skeleton-table-row component
 */

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-skeleton-table-row.js';
import '../skeleton-composer/sando-skeleton-composer.js';

// Tag constant for documentation-only stories
const DOCS_ONLY = ['!dev', '!autodocs'];

/**
 * A preset skeleton for table row layouts. Provides a quick way to create
 * loading states for tabular data with configurable columns.
 *
 * ## Features
 * - Configurable number of columns
 * - Custom column widths support
 * - Optional checkbox column
 * - Synchronized animations via skeleton-composer
 * - Varied text widths for visual interest
 */
const meta: Meta = {
  title: 'Components/Skeleton/SkeletonTableRow',
  component: 'sando-skeleton-table-row',
  tags: ['autodocs', 'beta'],
  render: (args) => html`
    <sando-skeleton-table-row
      columns="${args.columns || 4}"
      column-widths="${args.columnWidths || ''}"
      ?show-checkbox="${args.showCheckbox}"
    ></sando-skeleton-table-row>
  `,
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of columns to display',
      table: {
        category: 'Content',
        type: { summary: 'number' },
        defaultValue: { summary: '4' }
      }
    },
    columnWidths: {
      control: 'text',
      description: 'Comma-separated column widths (e.g., "20%,30%,30%,20%")',
      table: {
        category: 'Dimensions',
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' }
      }
    },
    showCheckbox: {
      control: 'boolean',
      description: 'Show a checkbox column as the first column',
      table: {
        category: 'Visibility',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  },
  args: {
    columns: 4,
    columnWidths: '',
    showCheckbox: false
  }
};

export default meta;
type Story = StoryObj;

// ============================================================================
// PUBLIC STORIES (visible in sidebar)
// ============================================================================

/**
 * Default skeleton table row with 4 columns.
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize all properties.
 */
export const Playground: Story = {
  args: {
    columns: 5,
    showCheckbox: true,
    columnWidths: '25%,25%,20%,15%,15%'
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * Table rows with different column counts.
 */
export const DifferentColumnCounts: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 8px 0; color: #666;">2 Columns</h4>
        <sando-skeleton-table-row columns="2"></sando-skeleton-table-row>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0; color: #666;">4 Columns</h4>
        <sando-skeleton-table-row columns="4"></sando-skeleton-table-row>
      </div>
      <div>
        <h4 style="margin: 0 0 8px 0; color: #666;">6 Columns</h4>
        <sando-skeleton-table-row columns="6"></sando-skeleton-table-row>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Multiple rows simulating a table loading state.
 */
export const TableExample: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
      <sando-skeleton-composer>
        <sando-skeleton-table-row
          show-checkbox
          column-widths="25%,35%,20%,20%"
        ></sando-skeleton-table-row>
        <sando-skeleton-table-row
          show-checkbox
          column-widths="25%,35%,20%,20%"
        ></sando-skeleton-table-row>
        <sando-skeleton-table-row
          show-checkbox
          column-widths="25%,35%,20%,20%"
        ></sando-skeleton-table-row>
        <sando-skeleton-table-row
          show-checkbox
          column-widths="25%,35%,20%,20%"
        ></sando-skeleton-table-row>
        <sando-skeleton-table-row
          show-checkbox
          column-widths="25%,35%,20%,20%"
        ></sando-skeleton-table-row>
      </sando-skeleton-composer>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
