import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-textarea.js';

/**
 * A fully accessible multi-line text input component with multiple variants, sizes, and states.
 * Supports native form participation with validation, resize control, and character limits.
 *
 * ## Features
 * - **2 Variants**: outlined, filled
 * - **3 Sizes**: sm, md, lg
 * - **States**: disabled, readonly, error, required
 * - **Resize Options**: none, vertical, horizontal, both
 * - **Character Limits**: minlength, maxlength support
 * - **Form Integration**: Works with native form validation
 *
 * ## Accessibility
 * - Full keyboard navigation
 * - ARIA attributes for screen readers
 * - Visible focus indicators
 * - Error states announced via role="alert"
 * - Label association via for/id
 */
const meta: Meta = {
  title: 'Components/Textarea',
  component: 'sando-textarea',
  tags: ['autodocs', 'stable'],
  render: (args) => html`
    <sando-textarea
      variant="${args.variant}"
      size="${args.size}"
      resize="${args.resize}"
      wrap="${args.wrap}"
      flavor="${args.flavor || 'original'}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?readonly="${args.readonly}"
      ?error="${args.error}"
      .value="${args.value || ''}"
      placeholder="${args.placeholder || ''}"
      label="${args.label || ''}"
      helper-text="${args.helperText || ''}"
      error-text="${args.errorText || ''}"
      name="${args.name || ''}"
      rows="${args.rows}"
      minlength="${args.minlength || ''}"
      maxlength="${args.maxlength || ''}"
      autocomplete="${args.autocomplete || ''}"
      ?spellcheck="${args.spellcheck}"
    ></sando-textarea>
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
      options: ['outlined', 'filled'],
      description: 'Visual style variant',
      table: {
        category: 'Appearance',
        type: { summary: "'outlined' | 'filled'" },
        defaultValue: { summary: 'outlined' }
      }
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the textarea',
      table: {
        category: 'Appearance',
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: 'md' }
      }
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior of the textarea',
      table: {
        category: 'Appearance',
        type: { summary: "'none' | 'vertical' | 'horizontal' | 'both'" },
        defaultValue: { summary: 'vertical' }
      }
    },
    rows: {
      control: { type: 'number', min: 1, max: 20, step: 1 },
      description: 'Initial number of visible text rows',
      table: {
        category: 'Appearance',
        type: { summary: 'number' },
        defaultValue: { summary: '3' }
      }
    },
    // 3. Content
    label: {
      control: 'text',
      description: 'Label text for the textarea',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    value: {
      control: 'text',
      description: 'Current text value',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the textarea',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    errorText: {
      control: 'text',
      description: 'Error message displayed when error is true',
      table: {
        category: 'Content',
        type: { summary: 'string' }
      }
    },
    // 4. State
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the textarea is read-only',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    required: {
      control: 'boolean',
      description: 'Whether the textarea is required for form validation',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    error: {
      control: 'boolean',
      description: 'Whether the textarea is in error state',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    // 5. Form
    name: {
      control: 'text',
      description: 'Form field name',
      table: {
        category: 'Form',
        type: { summary: 'string' }
      }
    },
    minlength: {
      control: { type: 'number', min: 0, max: 1000 },
      description: 'Minimum text length',
      table: {
        category: 'Form',
        type: { summary: 'number' }
      }
    },
    maxlength: {
      control: { type: 'number', min: 0, max: 10000 },
      description: 'Maximum text length',
      table: {
        category: 'Form',
        type: { summary: 'number' }
      }
    },
    // 6. Behavior
    wrap: {
      control: 'select',
      options: ['soft', 'hard', 'off'],
      description: 'Text wrapping mode',
      table: {
        category: 'Behavior',
        type: { summary: "'soft' | 'hard' | 'off'" },
        defaultValue: { summary: 'soft' }
      }
    },
    autocomplete: {
      control: 'text',
      description: 'Autocomplete attribute',
      table: {
        category: 'Behavior',
        type: { summary: 'string' }
      }
    },
    spellcheck: {
      control: 'boolean',
      description: 'Enable browser spellcheck',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    }
  },
  args: {
    variant: 'outlined',
    size: 'md',
    resize: 'vertical',
    wrap: 'soft',
    rows: 3,
    disabled: false,
    readonly: false,
    required: false,
    error: false,
    spellcheck: true,
    label: 'Comments',
    placeholder: 'Enter your comments...',
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
 * Default textarea with label and placeholder.
 */
export const Default: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments...'
  }
};

/**
 * Interactive playground - use controls to customize.
 */
export const Playground: Story = {
  args: {
    label: 'Customize me!',
    placeholder: 'Try different props using the controls panel...',
    helperText: 'Use the controls to experiment with different configurations.'
  }
};

// ============================================================================
// DOCUMENTATION STORIES (hidden from sidebar, used in MDX)
// ============================================================================

/**
 * Textarea with placeholder text to guide user input.
 */
export const Placeholder: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <sando-textarea
        label="Description"
        placeholder="Describe your project in detail..."
      ></sando-textarea>
      <sando-textarea label="Bio" placeholder="Tell us about yourself..."></sando-textarea>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Textarea with pre-filled value.
 */
export const WithValue: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <sando-textarea
      label="Cover Letter"
      .value="${'Dear Hiring Manager,\n\nI am writing to express my interest in the Software Developer position at your company. With my experience in web development and passion for creating intuitive user interfaces, I believe I would be a valuable addition to your team.\n\nBest regards'}"
      rows="6"
      style="max-width: 500px;"
    ></sando-textarea>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Textarea with helper text for additional context.
 */
export const WithHelperText: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <sando-textarea
        label="Bio"
        placeholder="Tell us about yourself..."
        helper-text="Maximum 500 characters. This will appear on your public profile."
      ></sando-textarea>
      <sando-textarea
        label="Feedback"
        placeholder="Share your thoughts..."
        helper-text="Your feedback helps us improve our services."
      ></sando-textarea>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Outlined variant (default).
 */
export const Outlined: Story = {
  tags: DOCS_ONLY,
  args: {
    variant: 'outlined',
    label: 'Outlined Variant',
    placeholder: 'This is the default outlined variant...'
  }
};

/**
 * Filled variant with background color.
 */
export const Filled: Story = {
  tags: DOCS_ONLY,
  args: {
    variant: 'filled',
    label: 'Filled Variant',
    placeholder: 'This variant has a subtle background...'
  }
};

/**
 * All variant styles comparison.
 */
export const AllVariants: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; gap: 2rem; flex-wrap: wrap; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; gap: 1rem; min-width: 280px;">
        <h4 style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Outlined (default)
        </h4>
        <sando-textarea
          variant="outlined"
          label="Outlined"
          placeholder="Enter text..."
        ></sando-textarea>
        <sando-textarea
          variant="outlined"
          label="Outlined with value"
          .value="${'Pre-filled content'}"
        ></sando-textarea>
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem; min-width: 280px;">
        <h4 style="margin: 0; font-size: 0.875rem; color: var(--sando-color-text-muted);">
          Filled
        </h4>
        <sando-textarea
          variant="filled"
          label="Filled"
          placeholder="Enter text..."
        ></sando-textarea>
        <sando-textarea
          variant="filled"
          label="Filled with value"
          .value="${'Pre-filled content'}"
        ></sando-textarea>
      </div>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Small size variant.
 */
export const Small: Story = {
  tags: DOCS_ONLY,
  args: {
    size: 'sm',
    label: 'Small Textarea',
    placeholder: 'Compact size for tight layouts...',
    rows: 2
  }
};

/**
 * Medium size variant (default).
 */
export const Medium: Story = {
  tags: DOCS_ONLY,
  args: {
    size: 'md',
    label: 'Medium Textarea',
    placeholder: 'Default size for most use cases...'
  }
};

/**
 * Large size variant.
 */
export const Large: Story = {
  tags: DOCS_ONLY,
  args: {
    size: 'lg',
    label: 'Large Textarea',
    placeholder: 'Larger size for more prominent inputs...',
    rows: 4
  }
};

/**
 * All size options comparison.
 */
export const AllSizes: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <sando-textarea
        size="sm"
        label="Small"
        placeholder="Compact size..."
        rows="2"
      ></sando-textarea>
      <sando-textarea size="md" label="Medium" placeholder="Default size..."></sando-textarea>
      <sando-textarea
        size="lg"
        label="Large"
        placeholder="Larger size..."
        rows="4"
      ></sando-textarea>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Disabled textarea state.
 */
export const Disabled: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <sando-textarea
        label="Disabled (empty)"
        placeholder="Cannot edit this field..."
        disabled
      ></sando-textarea>
      <sando-textarea
        label="Disabled (with value)"
        .value="${'This content is read-only and cannot be modified.'}"
        disabled
      ></sando-textarea>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Readonly textarea state.
 */
export const Readonly: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <sando-textarea
        label="Terms and Conditions"
        .value="${'By using this service, you agree to our terms and conditions. This agreement outlines the rights and responsibilities of all parties involved.\n\nPlease read carefully before proceeding.'}"
        readonly
        rows="5"
        helper-text="You can select and copy this text, but cannot edit it."
      ></sando-textarea>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Required textarea with indicator.
 */
export const Required: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <sando-textarea
        label="Project Description"
        placeholder="Describe your project..."
        required
        helper-text="This field is required."
      ></sando-textarea>
      <sando-textarea
        label="Additional Notes"
        placeholder="Any additional information..."
        required
      ></sando-textarea>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Error state with error message.
 */
export const Error: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <sando-textarea
        label="Description"
        error
        error-text="Please enter at least 50 characters."
        .value="${'Too short'}"
      ></sando-textarea>
      <sando-textarea
        label="Required Field"
        error
        error-text="This field is required."
        required
        placeholder="Enter text..."
      ></sando-textarea>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Textarea with maxlength showing character count.
 */
export const MaxLength: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
      <sando-textarea
        label="Tweet"
        placeholder="What's happening?"
        maxlength="280"
        helper-text="Maximum 280 characters"
        rows="3"
      ></sando-textarea>
      <sando-textarea
        label="Bio"
        placeholder="Tell us about yourself..."
        maxlength="500"
        minlength="50"
        helper-text="Between 50 and 500 characters"
        rows="4"
      ></sando-textarea>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * No resize allowed.
 */
export const ResizeNone: Story = {
  tags: DOCS_ONLY,
  args: {
    resize: 'none',
    label: 'No Resize',
    placeholder: 'This textarea cannot be resized...',
    helperText: 'Resize is disabled'
  }
};

/**
 * Vertical resize only (default).
 */
export const ResizeVertical: Story = {
  tags: DOCS_ONLY,
  args: {
    resize: 'vertical',
    label: 'Vertical Resize',
    placeholder: 'Drag the bottom-right corner to resize vertically...',
    helperText: 'Can only resize vertically (default)'
  }
};

/**
 * Horizontal resize only.
 */
export const ResizeHorizontal: Story = {
  tags: DOCS_ONLY,
  args: {
    resize: 'horizontal',
    label: 'Horizontal Resize',
    placeholder: 'Drag the bottom-right corner to resize horizontally...',
    helperText: 'Can only resize horizontally'
  }
};

/**
 * Both directions resize.
 */
export const ResizeBoth: Story = {
  tags: DOCS_ONLY,
  args: {
    resize: 'both',
    label: 'Resize Both',
    placeholder: 'Drag the bottom-right corner to resize in any direction...',
    helperText: 'Can resize in both directions'
  }
};

/**
 * All resize options comparison.
 */
export const AllResizeOptions: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; max-width: 700px;"
    >
      <sando-textarea
        resize="none"
        label="None"
        placeholder="Cannot resize..."
        helper-text="resize='none'"
      ></sando-textarea>
      <sando-textarea
        resize="vertical"
        label="Vertical (default)"
        placeholder="Resize vertically..."
        helper-text="resize='vertical'"
      ></sando-textarea>
      <sando-textarea
        resize="horizontal"
        label="Horizontal"
        placeholder="Resize horizontally..."
        helper-text="resize='horizontal'"
      ></sando-textarea>
      <sando-textarea
        resize="both"
        label="Both"
        placeholder="Resize any direction..."
        helper-text="resize='both'"
      ></sando-textarea>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * All interactive states comparison.
 */
export const States: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <sando-textarea label="Default (empty)" placeholder="Enter text..."></sando-textarea>
      <sando-textarea label="With Value" .value="${'Some content here'}"></sando-textarea>
      <sando-textarea label="Disabled" disabled placeholder="Cannot edit..."></sando-textarea>
      <sando-textarea label="Readonly" readonly .value="${'Read-only content'}"></sando-textarea>
      <sando-textarea label="Required" required placeholder="Required field..."></sando-textarea>
      <sando-textarea label="Error" error error-text="This field has an error."></sando-textarea>
    </div>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Textarea inside a form with submit.
 */
export const InForm: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <form
      @submit=${(e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const message = formData.get('message');
        const feedback = formData.get('feedback');
        alert(
          `Form submitted!\n\nMessage: ${message || '(empty)'}\n\nFeedback: ${feedback || '(empty)'}`
        );
      }}
      style="max-width: 500px; display: flex; flex-direction: column; gap: 1.5rem;"
    >
      <sando-textarea
        name="message"
        label="Message"
        placeholder="Enter your message..."
        rows="4"
      ></sando-textarea>

      <sando-textarea
        name="feedback"
        label="Feedback"
        placeholder="Share your feedback..."
        helper-text="Optional - tell us how we can improve"
        rows="3"
      ></sando-textarea>

      <div style="display: flex; gap: 1rem;">
        <button
          type="submit"
          style="padding: 12px 24px; background: var(--sando-color-action-solid-background-default); color: var(--sando-color-action-solid-text-default); border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; font-weight: 500;"
        >
          Submit
        </button>
        <button
          type="reset"
          style="padding: 12px 24px; background: transparent; color: var(--sando-color-text-muted); border: 1px solid var(--sando-color-border-default); border-radius: 6px; cursor: pointer; font-size: 1rem;"
        >
          Reset
        </button>
      </div>
    </form>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Form with validation demo.
 */
export const FormValidation: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <form
      @submit=${(e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const textarea = form.querySelector('sando-textarea') as HTMLElement & {
          checkValidity: () => boolean;
          value: string;
        };

        if (textarea.checkValidity()) {
          alert(`Valid submission!\n\nContent: ${textarea.value}`);
        } else {
          // Set error state
          textarea.setAttribute('error', '');
          textarea.setAttribute('error-text', 'Please enter at least 10 characters.');
        }
      }}
      style="max-width: 500px; display: flex; flex-direction: column; gap: 1.5rem;"
    >
      <sando-textarea
        name="description"
        label="Description"
        placeholder="Enter at least 10 characters..."
        required
        minlength="10"
        helper-text="Minimum 10 characters required"
        rows="4"
        @sando-input=${(e: CustomEvent) => {
          const textarea = e.target as HTMLElement;
          // Clear error on input
          if (textarea.hasAttribute('error')) {
            textarea.removeAttribute('error');
            textarea.removeAttribute('error-text');
          }
        }}
      ></sando-textarea>

      <div style="display: flex; gap: 1rem;">
        <button
          type="submit"
          style="padding: 12px 24px; background: var(--sando-color-action-solid-background-default); color: var(--sando-color-action-solid-text-default); border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; font-weight: 500;"
        >
          Validate & Submit
        </button>
        <button
          type="reset"
          style="padding: 12px 24px; background: transparent; color: var(--sando-color-text-muted); border: 1px solid var(--sando-color-border-default); border-radius: 6px; cursor: pointer; font-size: 1rem;"
        >
          Reset
        </button>
      </div>
    </form>
  `,
  parameters: { controls: { disable: true } }
};

/**
 * Complete showcase of all textarea features.
 */
export const AllExamples: Story = {
  tags: DOCS_ONLY,
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2.5rem; max-width: 500px;">
      <!-- Variants -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Variants</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <sando-textarea
            variant="outlined"
            label="Outlined"
            placeholder="Default outlined variant..."
          ></sando-textarea>
          <sando-textarea
            variant="filled"
            label="Filled"
            placeholder="Filled variant..."
          ></sando-textarea>
        </div>
      </section>

      <!-- Sizes -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Sizes</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <sando-textarea
            size="sm"
            label="Small"
            placeholder="Compact..."
            rows="2"
          ></sando-textarea>
          <sando-textarea size="md" label="Medium" placeholder="Default..."></sando-textarea>
          <sando-textarea
            size="lg"
            label="Large"
            placeholder="Prominent..."
            rows="4"
          ></sando-textarea>
        </div>
      </section>

      <!-- States -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">States</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <sando-textarea label="Default" placeholder="Enter text..."></sando-textarea>
          <sando-textarea
            label="Required"
            required
            placeholder="Required field..."
          ></sando-textarea>
          <sando-textarea label="Disabled" disabled .value="${'Cannot edit'}"></sando-textarea>
          <sando-textarea
            label="Readonly"
            readonly
            .value="${'Read-only content'}"
          ></sando-textarea>
          <sando-textarea label="Error" error error-text="Something went wrong."></sando-textarea>
        </div>
      </section>

      <!-- Helper/Error Text -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">With Helper/Error Text</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <sando-textarea
            label="With Helper"
            placeholder="Enter text..."
            helper-text="This is helpful guidance text."
          ></sando-textarea>
          <sando-textarea
            label="With Error"
            error
            error-text="Please correct this field."
          ></sando-textarea>
        </div>
      </section>

      <!-- Resize Options -->
      <section>
        <h3 style="margin: 0 0 1rem 0; font-size: 1rem;">Resize Options</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <sando-textarea resize="none" label="None" placeholder="No resize..."></sando-textarea>
          <sando-textarea
            resize="vertical"
            label="Vertical"
            placeholder="Vertical..."
          ></sando-textarea>
          <sando-textarea
            resize="horizontal"
            label="Horizontal"
            placeholder="Horizontal..."
          ></sando-textarea>
          <sando-textarea resize="both" label="Both" placeholder="Both..."></sando-textarea>
        </div>
      </section>
    </div>
  `,
  parameters: { controls: { disable: true } }
};
