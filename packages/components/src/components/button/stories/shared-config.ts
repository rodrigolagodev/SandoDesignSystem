/**
 * Shared configuration for button stories
 */

export const sharedArgTypes = {
  variant: {
    control: 'select',
    options: ['solid', 'outline', 'ghost'],
    description: 'Visual style variant of the button',
    table: {
      type: { summary: 'solid | outline | ghost' },
      defaultValue: { summary: 'solid' }
    }
  },
  size: {
    control: 'select',
    options: ['small', 'medium', 'large'],
    description: 'Size of the button',
    table: {
      type: { summary: 'small | medium | large' },
      defaultValue: { summary: 'medium' }
    }
  },
  status: {
    control: 'select',
    options: ['default', 'success', 'destructive'],
    description: 'Status variant for success/error states',
    table: {
      type: { summary: 'default | success | destructive' },
      defaultValue: { summary: 'default' }
    }
  },
  disabled: {
    control: 'boolean',
    description: 'Whether the button is disabled',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' }
    }
  },
  loading: {
    control: 'boolean',
    description: 'Whether the button is in a loading state',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' }
    }
  },
  fullWidth: {
    control: 'boolean',
    description: 'Whether the button should take full width',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' }
    }
  },
  iconOnly: {
    control: 'boolean',
    description: 'Icon-only button (square shape, no text padding)',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' }
    }
  },
  type: {
    control: 'select',
    options: ['button', 'submit', 'reset'],
    description: 'Button type for form submission',
    table: {
      type: { summary: 'button | submit | reset' },
      defaultValue: { summary: 'button' }
    }
  },
  href: {
    control: 'text',
    description: 'URL to navigate to (renders as <a> instead of <button>)',
    table: {
      type: { summary: 'string' }
    }
  },
  target: {
    control: 'select',
    options: ['_self', '_blank', '_parent', '_top'],
    description: 'Where to open the linked document (only when href is set)',
    table: {
      type: { summary: '_self | _blank | _parent | _top' },
      defaultValue: { summary: '_self' }
    }
  },
  label: {
    control: 'text',
    description: 'Button text content'
  },
  iconStart: {
    control: 'select',
    options: ['None', '⭐', '❤️', '✓', '✗', '🔍', '⚙️', '📥', '📤', '➕', '➖', '🗑️', '✏️', '🔒', '🔓', '👤', '🏠'],
    description: 'Icon to display at the start of the button'
  },
  iconEnd: {
    control: 'select',
    options: ['None', '→', '←', '↑', '↓', '⭐', '❤️', '✓', '✗', '⚙️', '📥', '📤', '➕', '➖'],
    description: 'Icon to display at the end of the button'
  }
};
