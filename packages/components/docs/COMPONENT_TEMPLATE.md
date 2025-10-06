# Component Template

This template provides a consistent structure for creating new components in the Sando Design System.

## MONOLITHIC COMPONENT ARCHITECTURE

Each component folder is **completely self-contained**. Everything related to a component lives in one folder.

## Creating a New Component

### Step 1: Create Component Directory

```bash
mkdir -p src/components/your-component
```

### Step 2: Create ALL Component Files

Your component directory **MUST** contain all these files:

```
your-component/
├── sando-your-component.ts              # Component implementation
├── sando-your-component.types.ts        # Component-specific types
├── sando-your-component.stories.ts      # Storybook stories
├── sando-your-component.test.ts         # Unit tests (Vitest)
├── sando-your-component.spec.ts         # E2E tests (Playwright)
├── sando-your-component.a11y.test.ts    # Accessibility tests (axe-core)
├── sando-your-component.styles.ts       # Complex styles (OPTIONAL)
└── index.ts                             # Barrel export
```

**Why this structure?**
- **Portable**: Copy the folder to another project and it works
- **Discoverable**: Everything about the component is in one place
- **Testable**: Tests live next to the code they test
- **Documented**: Stories and types are included
- **Independent**: Minimal external dependencies

### Step 3: Types File Template (`sando-your-component.types.ts`)

```typescript
/**
 * Type definitions for sando-your-component
 * All component-specific types in one place
 */

/**
 * Visual style variant
 */
export type YourComponentVariant = 'solid' | 'outline' | 'ghost';

/**
 * Size variants
 */
export type YourComponentSize = 'small' | 'medium' | 'large';

/**
 * Props interface for the component
 */
export interface SandoYourComponentProps {
  /**
   * Visual style variant
   * @default 'solid'
   */
  variant?: YourComponentVariant;

  /**
   * Component size
   * @default 'medium'
   */
  size?: YourComponentSize;

  /**
   * Whether the component is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Design system flavor/theme
   * @default 'original'
   */
  flavor?: string;
}

/**
 * Custom event detail for component events
 */
export interface YourComponentEventDetail {
  originalEvent?: Event;
  data?: any;
}

/**
 * Type-safe custom event
 */
export type YourComponentEvent = CustomEvent<YourComponentEventDetail>;
```

### Step 4: Component Implementation Template (`sando-your-component.ts`)

```typescript
/**
 * Sando Your Component
 *
 * Brief description of what this component does.
 *
 * @element sando-your-component
 *
 * @slot - Default slot description
 * @slot slot-name - Named slot description
 *
 * @fires event-name - Event description
 *
 * @csspart part-name - Part description for styling
 *
 * @cssprop --sando-your-component-property - CSS custom property description
 *
 * @example
 * <sando-your-component variant="primary">
 *   Content here
 * </sando-your-component>
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { YourComponentVariant, YourComponentSize } from './sando-your-component.types.js';
import { dispatchCustomEvent } from '../../utils/event-helpers.js';

@customElement('sando-your-component')
export class SandoYourComponent extends LitElement {
  /**
   * Component variant
   * @default 'solid'
   */
  @property({ reflect: true })
  variant: YourComponentVariant = 'solid';

  /**
   * Component size
   * @default 'medium'
   */
  @property({ reflect: true })
  size: YourComponentSize = 'medium';

  /**
   * Whether the component is disabled
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Design system flavor/theme
   * @default 'original'
   */
  @property({ reflect: true })
  flavor = 'original';

  /**
   * Internal state example
   * @internal
   */
  @state()
  private internalState = false;

  static styles = css`
    :host {
      display: block;
    }

    :host([hidden]) {
      display: none;
    }

    :host([disabled]) {
      pointer-events: none;
      opacity: var(--sando-disabled-opacity, 0.5);
    }

    .container {
      /* Use design tokens */
      font-family: var(--sando-your-component-font-family);
      font-size: var(--sando-your-component-font-size);
      color: var(--sando-your-component-color);
    }

    /* Variant styles */
    :host([variant="solid"]) .container {
      background: var(--sando-your-component-solid-bg);
    }

    :host([variant="outline"]) .container {
      background: transparent;
      border: 1px solid var(--sando-your-component-outline-border);
    }

    /* Size styles */
    :host([size="small"]) .container {
      padding: var(--sando-your-component-size-small-padding);
    }

    :host([size="medium"]) .container {
      padding: var(--sando-your-component-size-medium-padding);
    }

    :host([size="large"]) .container {
      padding: var(--sando-your-component-size-large-padding);
    }
  `;

  private handleClick() {
    if (this.disabled) return;

    dispatchCustomEvent(this, 'sando-your-component-click', {
      data: { variant: this.variant }
    });
  }

  render() {
    const classes = {
      container: true,
      disabled: this.disabled
    };

    return html`
      <div class=${classMap(classes)} @click=${this.handleClick} part="container">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'sando-your-component': SandoYourComponent;
  }
}
```

### Step 5: Barrel Export Template (`index.ts`)

```typescript
/**
 * YourComponent - Barrel Export
 * All component exports in one place
 */

// Component class
export { SandoYourComponent } from './sando-your-component.js';

// Type definitions
export type {
  YourComponentVariant,
  YourComponentSize,
  SandoYourComponentProps,
  YourComponentEventDetail,
  YourComponentEvent
} from './sando-your-component.types.js';
```

### Step 6: Unit Tests Template (`sando-your-component.test.ts`)

```typescript
/**
 * Unit Tests for sando-your-component
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html, expect as expectWc } from '@open-wc/testing';
import './sando-your-component.js';
import type { SandoYourComponent } from './sando-your-component.js';

describe('sando-your-component', () => {
  let element: SandoYourComponent;

  beforeEach(async () => {
    element = await fixture<SandoYourComponent>(
      html`<sando-your-component>Content</sando-your-component>`
    );
  });

  describe('Rendering', () => {
    it('should render with default properties', () => {
      expect(element).toBeDefined();
      expect(element.variant).toBe('solid');
      expect(element.size).toBe('medium');
    });

    it('should be accessible', async () => {
      await expectWc(element).to.be.accessible();
    });
  });

  describe('Properties', () => {
    it('should update variant property', async () => {
      element.variant = 'outline';
      await element.updateComplete;
      expect(element.variant).toBe('outline');
    });
  });
});
```

### Step 7: E2E Tests Template (`sando-your-component.spec.ts`)

```typescript
/**
 * E2E Tests for sando-your-component
 */

import { test, expect } from '@playwright/test';

test.describe('sando-your-component E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render component', async ({ page }) => {
    const component = page.locator('sando-your-component').first();
    await expect(component).toBeVisible();
  });

  test('should match visual snapshot', async ({ page }) => {
    const component = page.locator('sando-your-component').first();
    await expect(component).toHaveScreenshot('your-component-default.png');
  });
});
```

### Step 8: Accessibility Tests Template (`sando-your-component.a11y.test.ts`)

```typescript
/**
 * Accessibility Tests for sando-your-component
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { axe, toHaveNoViolations } from 'jest-axe';
import type { SandoYourComponent } from './sando-your-component.js';

expect.extend(toHaveNoViolations);

describe('sando-your-component Accessibility', () => {
  let element: SandoYourComponent;

  beforeEach(async () => {
    element = await fixture<SandoYourComponent>(
      html`<sando-your-component>Content</sando-your-component>`
    );
  });

  it('should have no accessibility violations', async () => {
    const results = await axe(element);
    expect(results).toHaveNoViolations();
  });

  it('should have no violations in disabled state', async () => {
    element.disabled = true;
    await element.updateComplete;
    const results = await axe(element);
    expect(results).toHaveNoViolations();
  });
});
```

### Step 9: Stories Template (`sando-your-component.stories.ts`)

```typescript
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './sando-your-component.ts';

const meta: Meta = {
  title: 'Components/YourComponent',
  tags: ['autodocs'],
  render: (args) => html`
    <sando-your-component
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
    >
      ${args.content}
    </sando-your-component>
  `,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'solid | outline | ghost' },
        defaultValue: { summary: 'solid' }
      }
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Component size',
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: 'medium' }
      }
    },
    disabled: {
      control: 'boolean',
      description: 'Whether component is disabled'
    },
    content: {
      control: 'text',
      description: 'Component content'
    }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    variant: 'solid',
    size: 'medium',
    content: 'Default content',
    disabled: false
  }
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem;">
      <sando-your-component variant="solid">Solid</sando-your-component>
      <sando-your-component variant="outline">Outline</sando-your-component>
      <sando-your-component variant="ghost">Ghost</sando-your-component>
    </div>
  `
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <sando-your-component size="small">Small</sando-your-component>
      <sando-your-component size="medium">Medium</sando-your-component>
      <sando-your-component size="large">Large</sando-your-component>
    </div>
  `
};
```

### Step 10: Update Main Exports

Add to `src/index.ts`:

```typescript
// Use the barrel export from the component folder
export { SandoYourComponent } from './components/your-component/index.js';
export type {
  YourComponentVariant,
  YourComponentSize,
  SandoYourComponentProps,
  YourComponentEventDetail,
  YourComponentEvent
} from './components/your-component/index.js';
```

Add to `package.json` exports (if needed):

```json
{
  "exports": {
    "./your-component": {
      "import": "./dist/components/your-component/index.js",
      "types": "./dist/components/your-component/index.d.ts"
    }
  }
}
```

## Best Practices

1. **Use Design Tokens**: Always use CSS custom properties from the token system
2. **Accessibility First**: Include proper ARIA attributes and keyboard navigation
3. **Type Safety**: Export types for all component variants and properties
4. **Consistent Naming**: Follow `sando-{component-name}` convention
5. **Reflect Properties**: Use `reflect: true` for properties that should sync with attributes
6. **Custom Events**: Prefix events with `sando-{component-name}-{event}`
7. **Shadow DOM**: Use `:host()` for component-level styles
8. **CSS Parts**: Expose parts for external styling when appropriate
9. **Documentation**: Include comprehensive JSDoc comments
10. **Stories**: Create interactive stories for all variants and states

## Component Checklist

Before considering a component complete, ensure ALL files are created:

**Required Files in Component Folder:**
- [ ] `sando-{name}.ts` - Component implementation with all variants
- [ ] `sando-{name}.types.ts` - All type definitions
- [ ] `sando-{name}.stories.ts` - Storybook stories with Controls
- [ ] `sando-{name}.test.ts` - Unit tests (Vitest)
- [ ] `sando-{name}.spec.ts` - E2E tests (Playwright)
- [ ] `sando-{name}.a11y.test.ts` - Accessibility tests (axe-core)
- [ ] `index.ts` - Barrel export

**Quality Standards:**
- [ ] Comprehensive JSDoc documentation
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] Keyboard navigation support
- [ ] Theme/flavor support
- [ ] Responsive behavior
- [ ] All tests passing
- [ ] Export in `src/index.ts` using barrel export
- [ ] Export in `package.json` (if needed)

**Benefits of This Structure:**
- Component is fully self-contained
- Easy to find all related files
- Tests live next to the code
- Can be copied to another project
- Clear ownership and responsibility
