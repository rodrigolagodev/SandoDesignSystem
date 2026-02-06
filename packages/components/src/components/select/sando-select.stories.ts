import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './sando-select.js';
import '../option/sando-option.js';
import '../option-group/sando-option-group.js';

/**
 * # Select Component
 *
 * A fully accessible select/dropdown component that supports single and multiple selection.
 * Implements the WAI-ARIA combobox pattern with listbox popup.
 *
 * ## Features
 * - **2 Variants**: filled, outlined
 * - **3 Sizes**: sm, md, lg
 * - **States**: disabled, error, required
 * - **Multiple selection**: With tag display
 * - **Option grouping**: Using sando-option-group
 * - **Clearable**: Optional clear button
 * - **Keyboard navigation**: Full arrow key, home/end, type-ahead support
 * - **Popover API**: Dropdown escapes overflow containers in modern browsers
 *
 * ## Accessibility
 * - Full keyboard navigation (Arrow keys, Enter, Space, Escape)
 * - ARIA combobox pattern with listbox popup
 * - Visible focus indicators
 * - Error states announced via role="alert"
 * - Type-ahead for quick option selection
 */
const meta: Meta = {
  title: 'Components/Select',
  component: 'sando-select',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-select
      variant="${args.variant}"
      size="${args.size}"
      placement="${args.placement}"
      flavor="${args.flavor || 'original'}"
      label="${args.label || ''}"
      placeholder="${args.placeholder || ''}"
      value="${args.value || ''}"
      helper-text="${args.helperText || ''}"
      error-text="${args.errorText || ''}"
      prefix-icon="${ifDefined(args.prefixIcon)}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?multiple="${args.multiple}"
      ?clearable="${args.clearable}"
      ?open="${args.open}"
      max-tags-visible="${args.maxTagsVisible}"
    >
      <sando-option value="option1">Option 1</sando-option>
      <sando-option value="option2">Option 2</sando-option>
      <sando-option value="option3">Option 3</sando-option>
      <sando-option value="option4">Option 4</sando-option>
      <sando-option value="option5">Option 5</sando-option>
    </sando-select>
  `,
  argTypes: {
    // 1. Theming (ALWAYS first)
    flavor: {
      control: 'select',
      options: ['original', 'strawberry', 'tonkatsu', 'kiwi', 'egg-salad'],
      description: 'Design system flavor/theme',
      table: {
        category: 'Theming',
        type: { summary: 'string' },
        defaultValue: { summary: 'original' }
      }
    },
    // 2. Appearance
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: 'Visual style of the select',
      table: {
        category: 'Appearance',
        type: { summary: "'filled' | 'outlined'" },
        defaultValue: { summary: 'filled' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select',
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' }
      }
    },
    placement: {
      control: 'select',
      options: ['bottom', 'top'],
      description: 'Dropdown placement relative to trigger',
      table: {
        category: 'Appearance',
        type: { summary: "'bottom' | 'top'" },
        defaultValue: { summary: 'bottom' }
      }
    },
    // 3. Content
    label: {
      control: 'text',
      description: 'Accessible label for the select',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value is selected',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    value: {
      control: 'text',
      description: 'Selected value (single select mode)',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the select',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    errorText: {
      control: 'text',
      description: 'Error message when error is true',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    // 4. State
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Whether the select is required',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    error: {
      control: 'boolean',
      description: 'Whether the select has an error',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    open: {
      control: 'boolean',
      description: 'Whether the dropdown is open',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    // 5. Behavior
    multiple: {
      control: 'boolean',
      description: 'Whether multiple options can be selected',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    clearable: {
      control: 'boolean',
      description: 'Whether to show a clear button',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    maxTagsVisible: {
      control: 'number',
      description: 'Maximum number of tags visible in multi-select mode',
      table: {
        category: 'Behavior',
        type: { summary: 'number' },
        defaultValue: { summary: '3' }
      }
    },
    prefixIcon: {
      control: 'text',
      description: 'Icon name for prefix (e.g., "search", "map-pin")',
      table: {
        category: 'Appearance',
        type: { summary: 'string' }
      }
    }
  },
  args: {
    variant: 'filled',
    size: 'md',
    placement: 'bottom',
    disabled: false,
    required: false,
    error: false,
    multiple: false,
    clearable: false,
    open: false,
    maxTagsVisible: 3,
    label: 'Select',
    placeholder: 'Select an option',
    flavor: 'original'
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
 * Default select with basic options
 */
export const Default: Story = {};

/**
 * Interactive playground - use controls to customize.
 */
export const Playground: Story = {
  render: (args) => html`
    <sando-select
      variant="${args.variant}"
      size="${args.size}"
      placement="${args.placement}"
      flavor="${args.flavor || 'original'}"
      label="${args.label || ''}"
      placeholder="${args.placeholder || ''}"
      value="${args.value || ''}"
      helper-text="${args.helperText || ''}"
      error-text="${args.errorText || ''}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?multiple="${args.multiple}"
      ?clearable="${args.clearable}"
      ?open="${args.open}"
      max-tags-visible="${args.maxTagsVisible}"
    >
      <sando-option value="option1">Option 1</sando-option>
      <sando-option value="option2">Option 2</sando-option>
      <sando-option value="option3">Option 3</sando-option>
      <sando-option value="option4">Option 4</sando-option>
      <sando-option value="option5">Option 5</sando-option>
    </sando-select>
  `
};

/**
 * Select with option groups
 */
export const WithGroups: Story = {
  render: (args) => html`
    <sando-select
      variant="${args.variant}"
      size="${args.size}"
      placement="${args.placement}"
      flavor="${args.flavor || 'original'}"
      label="${args.label || 'Category'}"
      placeholder="${args.placeholder || 'Select a category'}"
      value="${args.value || ''}"
      helper-text="${args.helperText || ''}"
      error-text="${args.errorText || ''}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?clearable="${args.clearable}"
    >
      <sando-option-group label="Fruits">
        <sando-option value="apple">Apple</sando-option>
        <sando-option value="banana">Banana</sando-option>
        <sando-option value="orange">Orange</sando-option>
      </sando-option-group>
      <sando-option-group label="Vegetables">
        <sando-option value="carrot">Carrot</sando-option>
        <sando-option value="broccoli">Broccoli</sando-option>
      </sando-option-group>
    </sando-select>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Options can be grouped using `<sando-option-group>` with a label.'
      }
    }
  }
};

/**
 * Multiple selection mode with tag display
 */
export const MultiSelect: Story = {
  render: (args) => html`
    <sando-select
      variant="${args.variant}"
      size="${args.size}"
      placement="${args.placement}"
      flavor="${args.flavor || 'original'}"
      label="${args.label || 'Technologies'}"
      placeholder="${args.placeholder || 'Select technologies'}"
      helper-text="${args.helperText || ''}"
      error-text="${args.errorText || ''}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      multiple
      clearable
      max-tags-visible="${args.maxTagsVisible}"
    >
      <sando-option value="react">React</sando-option>
      <sando-option value="vue">Vue</sando-option>
      <sando-option value="angular">Angular</sando-option>
      <sando-option value="svelte">Svelte</sando-option>
      <sando-option value="solid">Solid</sando-option>
      <sando-option value="lit">Lit</sando-option>
    </sando-select>
  `,
  parameters: {
    docs: {
      description: {
        story:
          'Enable `multiple` for multi-selection. Selected options are displayed as removable tags.'
      }
    }
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * Select with placeholder text
 */
export const Placeholder: Story = {
  tags: DOCS_ONLY,
  args: {
    placeholder: 'Choose your country...',
    label: 'Country'
  }
};

/**
 * Select with pre-selected value
 */
export const WithValue: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <sando-select
      variant="${args.variant}"
      size="${args.size}"
      placement="${args.placement}"
      flavor="${args.flavor || 'original'}"
      label="${args.label || 'Country'}"
      placeholder="${args.placeholder || ''}"
      value="ca"
      helper-text="${args.helperText || ''}"
      error-text="${args.errorText || ''}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?clearable="${args.clearable}"
    >
      <sando-option value="us">United States</sando-option>
      <sando-option value="ca">Canada</sando-option>
      <sando-option value="mx">Mexico</sando-option>
    </sando-select>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Set the `value` attribute to pre-select an option.'
      }
    }
  }
};

/**
 * Disabled select
 */
export const Disabled: Story = {
  tags: DOCS_ONLY,
  args: {
    disabled: true,
    label: 'Disabled Select',
    value: 'option1'
  }
};

/**
 * Required select with indicator
 */
export const Required: Story = {
  tags: DOCS_ONLY,
  args: {
    required: true,
    label: 'Required Field',
    placeholder: 'Select an option'
  },
  parameters: {
    docs: {
      description: {
        story: 'Required selects show an asterisk indicator after the label.'
      }
    }
  }
};

/**
 * Error state with error text
 */
export const WithError: Story = {
  tags: DOCS_ONLY,
  args: {
    error: true,
    errorText: 'Please select a country',
    label: 'With Error',
    required: true,
    placeholder: 'Select an option'
  }
};

/**
 * Select with helper text
 */
export const WithHelperText: Story = {
  tags: DOCS_ONLY,
  args: {
    helperText: 'Choose your country of residence',
    label: 'With Helper',
    placeholder: 'Select an option'
  }
};

/**
 * Clearable select with clear button
 */
export const Clearable: Story = {
  tags: DOCS_ONLY,
  args: {
    clearable: true,
    value: 'option1',
    label: 'Clearable'
  },
  parameters: {
    docs: {
      description: {
        story: 'Add `clearable` to show a clear button when a value is selected.'
      }
    }
  }
};

/**
 * All sizes comparison
 */
export const Sizes: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <sando-select
        variant="${args.variant}"
        flavor="${args.flavor || 'original'}"
        label="Small"
        size="sm"
        placeholder="Small select"
        ?disabled="${args.disabled}"
        ?error="${args.error}"
      >
        <sando-option value="1">Option 1</sando-option>
        <sando-option value="2">Option 2</sando-option>
        <sando-option value="3">Option 3</sando-option>
      </sando-select>
      <sando-select
        variant="${args.variant}"
        flavor="${args.flavor || 'original'}"
        label="Medium"
        size="md"
        placeholder="Medium select"
        ?disabled="${args.disabled}"
        ?error="${args.error}"
      >
        <sando-option value="1">Option 1</sando-option>
        <sando-option value="2">Option 2</sando-option>
        <sando-option value="3">Option 3</sando-option>
      </sando-select>
      <sando-select
        variant="${args.variant}"
        flavor="${args.flavor || 'original'}"
        label="Large"
        size="lg"
        placeholder="Large select"
        ?disabled="${args.disabled}"
        ?error="${args.error}"
      >
        <sando-option value="1">Option 1</sando-option>
        <sando-option value="2">Option 2</sando-option>
        <sando-option value="3">Option 3</sando-option>
      </sando-select>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Outlined variant
 */
export const VariantOutlined: Story = {
  tags: DOCS_ONLY,
  args: {
    variant: 'outlined',
    label: 'Outlined',
    placeholder: 'Select an option'
  }
};

/**
 * Filled variant (default)
 */
export const VariantFilled: Story = {
  tags: DOCS_ONLY,
  args: {
    variant: 'filled',
    label: 'Filled',
    placeholder: 'Select an option'
  }
};

/**
 * Select with prefix icon
 */
export const WithPrefix: Story = {
  render: (args) => html`
    <sando-select
      variant="${args.variant}"
      size="${args.size}"
      placement="${args.placement}"
      flavor="${args.flavor || 'original'}"
      label="${args.label || 'Location'}"
      placeholder="${args.placeholder || 'Select a location'}"
      prefix-icon="map-pin"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?clearable="${args.clearable}"
    >
      <sando-option value="ny">New York</sando-option>
      <sando-option value="la">Los Angeles</sando-option>
      <sando-option value="chi">Chicago</sando-option>
    </sando-select>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Use the `prefix-icon` prop to add an icon before the value display.'
      }
    }
  }
};

/**
 * Multi-select showing tags
 */
export const MultiSelectWithTags: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <sando-select
      variant="${args.variant}"
      size="${args.size}"
      placement="${args.placement}"
      flavor="${args.flavor || 'original'}"
      label="${args.label || 'Skills'}"
      placeholder="${args.placeholder || ''}"
      helper-text="${args.helperText || ''}"
      error-text="${args.errorText || ''}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      multiple
      .values=${['react', 'typescript']}
      clearable
      max-tags-visible="${args.maxTagsVisible}"
    >
      <sando-option value="react">React</sando-option>
      <sando-option value="typescript">TypeScript</sando-option>
      <sando-option value="javascript">JavaScript</sando-option>
      <sando-option value="css">CSS</sando-option>
      <sando-option value="html">HTML</sando-option>
    </sando-select>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Pre-selected values in multi-select are shown as removable tags.'
      }
    }
  }
};

/**
 * Multi-select with maxTagsVisible limit
 */
export const MultiSelectMaxTags: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <sando-select
      variant="${args.variant}"
      size="${args.size}"
      placement="${args.placement}"
      flavor="${args.flavor || 'original'}"
      label="${args.label || 'Languages'}"
      placeholder="${args.placeholder || ''}"
      helper-text="${args.helperText || ''}"
      error-text="${args.errorText || ''}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      multiple
      .values=${['js', 'ts', 'py', 'go', 'rust']}
      max-tags-visible="2"
      clearable
    >
      <sando-option value="js">JavaScript</sando-option>
      <sando-option value="ts">TypeScript</sando-option>
      <sando-option value="py">Python</sando-option>
      <sando-option value="go">Go</sando-option>
      <sando-option value="rust">Rust</sando-option>
      <sando-option value="java">Java</sando-option>
    </sando-select>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Use `max-tags-visible` to limit visible tags. Overflow shows as "+N" indicator.'
      }
    }
  }
};

/**
 * Options with icons in prefix slot
 */
export const OptionsWithIcons: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <sando-select
      variant="${args.variant}"
      size="${args.size}"
      placement="${args.placement}"
      flavor="${args.flavor || 'original'}"
      label="${args.label || 'Action'}"
      placeholder="${args.placeholder || 'Select an action'}"
      value="${args.value || ''}"
      helper-text="${args.helperText || ''}"
      error-text="${args.errorText || ''}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?clearable="${args.clearable}"
    >
      <sando-option value="edit">
        <span slot="prefix">✏️</span>
        Edit
      </sando-option>
      <sando-option value="duplicate">
        <span slot="prefix">📋</span>
        Duplicate
      </sando-option>
      <sando-option value="archive">
        <span slot="prefix">📦</span>
        Archive
      </sando-option>
      <sando-option value="delete">
        <span slot="prefix">🗑️</span>
        Delete
      </sando-option>
    </sando-select>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Options can have icons using the `prefix` slot.'
      }
    }
  }
};

/**
 * Scrollable dropdown with many options
 */
export const ManyOptions: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <sando-select
      variant="${args.variant}"
      size="${args.size}"
      placement="${args.placement}"
      flavor="${args.flavor || 'original'}"
      label="${args.label || 'Month'}"
      placeholder="${args.placeholder || 'Select a month'}"
      value="${args.value || ''}"
      helper-text="${args.helperText || ''}"
      error-text="${args.errorText || ''}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?clearable="${args.clearable}"
    >
      <sando-option value="jan">January</sando-option>
      <sando-option value="feb">February</sando-option>
      <sando-option value="mar">March</sando-option>
      <sando-option value="apr">April</sando-option>
      <sando-option value="may">May</sando-option>
      <sando-option value="jun">June</sando-option>
      <sando-option value="jul">July</sando-option>
      <sando-option value="aug">August</sando-option>
      <sando-option value="sep">September</sando-option>
      <sando-option value="oct">October</sando-option>
      <sando-option value="nov">November</sando-option>
      <sando-option value="dec">December</sando-option>
    </sando-select>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Dropdown automatically scrolls when there are many options.'
      }
    }
  }
};

/**
 * Dropdown opens above the trigger
 */
export const PlacementTop: Story = {
  tags: DOCS_ONLY,
  args: {
    placement: 'top',
    label: 'Dropdown on Top',
    placeholder: 'Select an option'
  },
  decorators: [(story) => html`<div style="margin-top: 200px;">${story()}</div>`],
  parameters: {
    docs: {
      description: {
        story: 'Use `placement="top"` to open the dropdown above the trigger.'
      }
    }
  }
};

/**
 * Controlled open state
 */
export const Controlled: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <sando-select
        id="controlled-select"
        variant="${args.variant}"
        size="${args.size}"
        placement="${args.placement}"
        flavor="${args.flavor || 'original'}"
        label="${args.label || 'Country'}"
        placeholder="${args.placeholder || 'Select a country'}"
        value="${args.value || ''}"
        helper-text="${args.helperText || ''}"
        error-text="${args.errorText || ''}"
        ?disabled="${args.disabled}"
        ?required="${args.required}"
        ?error="${args.error}"
        ?clearable="${args.clearable}"
        open
      >
        <sando-option value="us">United States</sando-option>
        <sando-option value="ca">Canada</sando-option>
        <sando-option value="mx">Mexico</sando-option>
      </sando-select>
      <p style="color: var(--sando-color-text-muted); font-size: 0.875rem;">
        This select is controlled with <code>open</code> attribute set to <code>true</code>.
      </p>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'The `open` attribute can be used to control the dropdown programmatically.'
      }
    }
  }
};

/**
 * Select inside a form with submit
 */
export const FormIntegration: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <form
      @submit=${(e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const select = form.querySelector('sando-select');
        alert(`Selected value: ${select?.value || 'none'}`);
      }}
      style="max-width: 400px; display: flex; flex-direction: column; gap: 1.5rem;"
    >
      <sando-select
        variant="${args.variant}"
        size="${args.size}"
        flavor="${args.flavor || 'original'}"
        label="${args.label || 'Country'}"
        name="country"
        placeholder="${args.placeholder || 'Select your country'}"
        helper-text="${args.helperText || 'Required for shipping'}"
        error-text="${args.errorText || ''}"
        ?disabled="${args.disabled}"
        required
        ?error="${args.error}"
        ?clearable="${args.clearable}"
      >
        <sando-option value="us">United States</sando-option>
        <sando-option value="ca">Canada</sando-option>
        <sando-option value="mx">Mexico</sando-option>
        <sando-option value="uk">United Kingdom</sando-option>
        <sando-option value="de">Germany</sando-option>
      </sando-select>

      <div style="display: flex; gap: 1rem;">
        <button
          type="submit"
          style="padding: 12px 24px; background: var(--sando-color-brand-500, #f97316); color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; font-weight: 500;"
        >
          Submit
        </button>
        <button
          type="reset"
          style="padding: 12px 24px; background: transparent; color: #64748b; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer; font-size: 1rem;"
        >
          Reset
        </button>
      </div>
    </form>
  `,
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Select integrates with native forms and resets on form reset.'
      }
    }
  }
};

/**
 * Grid showing all states combinations
 */
export const AllStates: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <div
      style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; max-width: 600px;"
    >
      <sando-select
        variant="${args.variant}"
        size="${args.size}"
        flavor="${args.flavor || 'original'}"
        label="Default"
        placeholder="Select..."
      >
        <sando-option value="1">Option 1</sando-option>
        <sando-option value="2">Option 2</sando-option>
      </sando-select>

      <sando-select
        variant="${args.variant}"
        size="${args.size}"
        flavor="${args.flavor || 'original'}"
        label="With Value"
        value="1"
      >
        <sando-option value="1">Option 1</sando-option>
        <sando-option value="2">Option 2</sando-option>
      </sando-select>

      <sando-select
        variant="${args.variant}"
        size="${args.size}"
        flavor="${args.flavor || 'original'}"
        label="Required"
        placeholder="Select..."
        required
      >
        <sando-option value="1">Option 1</sando-option>
        <sando-option value="2">Option 2</sando-option>
      </sando-select>

      <sando-select
        variant="${args.variant}"
        size="${args.size}"
        flavor="${args.flavor || 'original'}"
        label="Error"
        placeholder="Select..."
        error
        error-text="This is required"
      >
        <sando-option value="1">Option 1</sando-option>
        <sando-option value="2">Option 2</sando-option>
      </sando-select>

      <sando-select
        variant="${args.variant}"
        size="${args.size}"
        flavor="${args.flavor || 'original'}"
        label="Disabled"
        value="1"
        disabled
      >
        <sando-option value="1">Option 1</sando-option>
        <sando-option value="2">Option 2</sando-option>
      </sando-select>

      <sando-select
        variant="${args.variant}"
        size="${args.size}"
        flavor="${args.flavor || 'original'}"
        label="Clearable"
        value="1"
        clearable
      >
        <sando-option value="1">Option 1</sando-option>
        <sando-option value="2">Option 2</sando-option>
      </sando-select>

      <sando-select
        variant="${args.variant}"
        size="${args.size}"
        flavor="${args.flavor || 'original'}"
        label="Helper Text"
        placeholder="Select..."
        helper-text="Choose an option"
      >
        <sando-option value="1">Option 1</sando-option>
        <sando-option value="2">Option 2</sando-option>
      </sando-select>

      <sando-select
        variant="${args.variant}"
        size="${args.size}"
        flavor="${args.flavor || 'original'}"
        label="Multiple"
        placeholder="Select..."
        multiple
        clearable
      >
        <sando-option value="1">Option 1</sando-option>
        <sando-option value="2">Option 2</sando-option>
        <sando-option value="3">Option 3</sando-option>
      </sando-select>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All variants comparison
 */
export const AllVariants: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; gap: 1rem; min-width: 250px;">
        <h4 style="margin: 0; font-size: 0.875rem; color: #78716c;">Filled (default)</h4>
        <sando-select
          variant="filled"
          size="${args.size}"
          flavor="${args.flavor || 'original'}"
          label="Country"
          placeholder="Select..."
          ?disabled="${args.disabled}"
          ?error="${args.error}"
        >
          <sando-option value="us">United States</sando-option>
          <sando-option value="ca">Canada</sando-option>
        </sando-select>
        <sando-select
          variant="filled"
          size="${args.size}"
          flavor="${args.flavor || 'original'}"
          label="With Value"
          value="us"
          ?disabled="${args.disabled}"
          ?error="${args.error}"
        >
          <sando-option value="us">United States</sando-option>
          <sando-option value="ca">Canada</sando-option>
        </sando-select>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem; min-width: 250px;">
        <h4 style="margin: 0; font-size: 0.875rem; color: #78716c;">Outlined</h4>
        <sando-select
          variant="outlined"
          size="${args.size}"
          flavor="${args.flavor || 'original'}"
          label="Country"
          placeholder="Select..."
          ?disabled="${args.disabled}"
          ?error="${args.error}"
        >
          <sando-option value="us">United States</sando-option>
          <sando-option value="ca">Canada</sando-option>
        </sando-select>
        <sando-select
          variant="outlined"
          size="${args.size}"
          flavor="${args.flavor || 'original'}"
          label="With Value"
          value="us"
          ?disabled="${args.disabled}"
          ?error="${args.error}"
        >
          <sando-option value="us">United States</sando-option>
          <sando-option value="ca">Canada</sando-option>
        </sando-select>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * With disabled options
 */
export const WithDisabledOptions: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <sando-select
      variant="${args.variant}"
      size="${args.size}"
      placement="${args.placement}"
      flavor="${args.flavor || 'original'}"
      label="${args.label || 'Plan'}"
      placeholder="${args.placeholder || 'Select a plan'}"
      value="${args.value || ''}"
      helper-text="${args.helperText || ''}"
      error-text="${args.errorText || ''}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?error="${args.error}"
      ?clearable="${args.clearable}"
    >
      <sando-option value="free">Free</sando-option>
      <sando-option value="pro">Pro</sando-option>
      <sando-option value="enterprise" disabled>Enterprise (Contact sales)</sando-option>
    </sando-select>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Individual options can be disabled using the `disabled` attribute.'
      }
    }
  }
};

/**
 * Complete showcase of all select features
 */
export const AllExamples: Story = {
  tags: DOCS_ONLY,
  render: (args) => html`
    <div style="display: flex; flex-direction: column; gap: 2.5rem; max-width: 500px;">
      <!-- Variants -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Variants</h3>
        <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
          <sando-select
            variant="filled"
            size="${args.size}"
            flavor="${args.flavor || 'original'}"
            label="Filled"
            value="1"
            style="min-width: 200px;"
          >
            <sando-option value="1">Option 1</sando-option>
            <sando-option value="2">Option 2</sando-option>
          </sando-select>
          <sando-select
            variant="outlined"
            size="${args.size}"
            flavor="${args.flavor || 'original'}"
            label="Outlined"
            value="1"
            style="min-width: 200px;"
          >
            <sando-option value="1">Option 1</sando-option>
            <sando-option value="2">Option 2</sando-option>
          </sando-select>
        </div>
      </section>

      <!-- Sizes -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Sizes</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <sando-select
            variant="${args.variant}"
            size="sm"
            flavor="${args.flavor || 'original'}"
            label="Small"
            value="1"
          >
            <sando-option value="1">Option 1</sando-option>
          </sando-select>
          <sando-select
            variant="${args.variant}"
            size="md"
            flavor="${args.flavor || 'original'}"
            label="Medium"
            value="1"
          >
            <sando-option value="1">Option 1</sando-option>
          </sando-select>
          <sando-select
            variant="${args.variant}"
            size="lg"
            flavor="${args.flavor || 'original'}"
            label="Large"
            value="1"
          >
            <sando-option value="1">Option 1</sando-option>
          </sando-select>
        </div>
      </section>

      <!-- States -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">States</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <sando-select
            variant="${args.variant}"
            size="${args.size}"
            flavor="${args.flavor || 'original'}"
            label="Default"
            placeholder="Select..."
          >
            <sando-option value="1">Option 1</sando-option>
          </sando-select>
          <sando-select
            variant="${args.variant}"
            size="${args.size}"
            flavor="${args.flavor || 'original'}"
            label="Required"
            placeholder="Select..."
            required
          >
            <sando-option value="1">Option 1</sando-option>
          </sando-select>
          <sando-select
            variant="${args.variant}"
            size="${args.size}"
            flavor="${args.flavor || 'original'}"
            label="Disabled"
            value="1"
            disabled
          >
            <sando-option value="1">Option 1</sando-option>
          </sando-select>
          <sando-select
            variant="${args.variant}"
            size="${args.size}"
            flavor="${args.flavor || 'original'}"
            label="Error"
            error
            error-text="This field has an error"
          >
            <sando-option value="1">Option 1</sando-option>
          </sando-select>
        </div>
      </section>

      <!-- With Text -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">With Helper/Error Text</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <sando-select
            variant="${args.variant}"
            size="${args.size}"
            flavor="${args.flavor || 'original'}"
            label="With Helper"
            placeholder="Select..."
            helper-text="This is helper text"
          >
            <sando-option value="1">Option 1</sando-option>
          </sando-select>
          <sando-select
            variant="${args.variant}"
            size="${args.size}"
            flavor="${args.flavor || 'original'}"
            label="With Error"
            error
            error-text="Please select an option"
          >
            <sando-option value="1">Option 1</sando-option>
          </sando-select>
        </div>
      </section>

      <!-- Multiple -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Multiple Selection</h3>
        <sando-select
          variant="${args.variant}"
          size="${args.size}"
          flavor="${args.flavor || 'original'}"
          label="Technologies"
          multiple
          .values=${['react', 'vue']}
          clearable
        >
          <sando-option value="react">React</sando-option>
          <sando-option value="vue">Vue</sando-option>
          <sando-option value="angular">Angular</sando-option>
          <sando-option value="svelte">Svelte</sando-option>
        </sando-select>
      </section>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
