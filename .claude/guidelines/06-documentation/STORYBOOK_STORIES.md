# Storybook Stories

**Category**: 06-documentation
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-03
**Owner**: Technical Writer

---

## Purpose

Establish comprehensive standards for creating Storybook stories in the Sando Design System, following **Strapi Design System's organization and presentation patterns**. This guideline ensures consistent, interactive, and accessible component documentation that serves both designers and developers.

**Inspiration**: Strapi Design System (design-system.strapi.io)
**Target**: All public components, design tokens, and composition patterns
**Scope**: Story organization, argTypes configuration, interactive controls, accessibility
**Enforcement**: Code review, Storybook build validation

---

## Core Rules

### Rule 1: Three-Section Organization (Strapi Pattern)

Stories MUST be organized into three top-level sections following Strapi's structure:

**Section 1: Design Tokens** - Foundation layer showcasing token system
**Section 2: Components** - Individual component documentation
**Section 3: Patterns** - Composition examples and usage patterns

**Pattern**:

```typescript
// Design Tokens stories
const meta: Meta = {
  title: "Design Tokens/Colors/Brand",
  tags: ["autodocs"],
};

// Component stories
const meta: Meta = {
  title: "Components/Button",
  tags: ["autodocs"],
};

// Pattern stories
const meta: Meta = {
  title: "Patterns/Forms/Login Form",
  tags: ["autodocs"],
};
```

**Directory structure**:

```
packages/components/src/
├── tokens/
│   └── stories/
│       ├── colors.stories.ts        # Design Tokens/Colors
│       ├── spacing.stories.ts       # Design Tokens/Spacing
│       └── typography.stories.ts    # Design Tokens/Typography
├── components/
│   └── button/
│       ├── sando-button.stories.ts  # Components/Button
│       └── stories/                 # Additional focused stories
└── patterns/
    └── stories/
        ├── forms.stories.ts         # Patterns/Forms
        └── navigation.stories.ts    # Patterns/Navigation
```

**Why**: Strapi's three-section approach clearly separates foundation (tokens), building blocks (components), and real-world usage (patterns). This structure helps users understand the system hierarchy and find what they need quickly.

**Reference**: Strapi Design System organization (3 main sections: tokens, components, pages)

---

### Rule 2: Main Story File Per Component (Required)

Each component MUST have ONE main story file (`sando-component.stories.ts`) that serves as the comprehensive reference and entry point.

**Pattern**:

```typescript
// packages/components/src/components/button/sando-button.stories.ts
import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "./sando-button";

/**
 * # Button Component
 *
 * Buttons trigger actions and events. They communicate calls to action
 * and help users interact with your application.
 *
 * ## Usage
 *
 * Use buttons to trigger immediate actions like:
 * - Submitting forms
 * - Opening dialogs
 * - Navigating between pages
 * - Confirming or canceling operations
 *
 * ## Accessibility
 *
 * - All buttons have visible focus indicators
 * - Disabled buttons are not focusable
 * - Icon-only buttons require aria-label
 * - Loading state announced to screen readers
 */
const meta: Meta = {
  title: "Components/Button",
  component: "sando-button",
  tags: ["autodocs"],
  argTypes: {
    // Variants
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost"],
      description: "Visual style of the button",
      table: {
        category: "Appearance",
        defaultValue: { summary: "solid" },
      },
    },

    // Sizes
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the button",
      table: {
        category: "Appearance",
        defaultValue: { summary: "medium" },
      },
    },

    // States
    disabled: {
      control: "boolean",
      description: "Disabled state prevents interaction",
      table: {
        category: "State",
        defaultValue: { summary: false },
      },
    },

    loading: {
      control: "boolean",
      description: "Loading state shows spinner",
      table: {
        category: "State",
        defaultValue: { summary: false },
      },
    },

    // Theming (flavor)
    flavor: {
      control: "select",
      options: ["original", "strawberry", "ocean", "forest", "sunset"],
      description: "Theme flavor (inherited from ancestor)",
      table: {
        category: "Theming",
        defaultValue: { summary: "original" },
      },
    },

    // Content
    label: {
      control: "text",
      description: "Button text content",
      table: {
        category: "Content",
      },
    },
  },
  args: {
    variant: "solid",
    size: "medium",
    disabled: false,
    loading: false,
    flavor: "original",
    label: "Button",
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default button state with interactive controls.
 * Use the Controls panel to experiment with different configurations.
 */
export const Default: Story = {
  args: {
    label: "Click me",
  },
};

/**
 * Interactive playground to test all button combinations.
 * Try different variants, sizes, and states together.
 */
export const Playground: Story = {
  render: (args) => html`
    <sando-button
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      ${args.label}
    </sando-button>
  `,
};

/**
 * All button variants displayed together for visual comparison.
 * This helps designers and developers understand variant differences.
 */
export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <sando-button variant="solid">Solid</sando-button>
      <sando-button variant="outline">Outline</sando-button>
      <sando-button variant="ghost">Ghost</sando-button>
    </div>
  `,
  parameters: {
    controls: { disable: true },
  },
};

/**
 * All button sizes displayed together for scale comparison.
 */
export const AllSizes: Story = {
  render: () => html`
    <div
      style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;"
    >
      <sando-button size="small">Small</sando-button>
      <sando-button size="medium">Medium</sando-button>
      <sando-button size="large">Large</sando-button>
    </div>
  `,
  parameters: {
    controls: { disable: true },
  },
};

/**
 * Button states: default, disabled, and loading.
 */
export const States: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      <sando-button>Default</sando-button>
      <sando-button disabled>Disabled</sando-button>
      <sando-button loading>Loading</sando-button>
    </div>
  `,
  parameters: {
    controls: { disable: true },
  },
};
```

**Why**: Main story provides comprehensive documentation, interactive playground, and visual reference. All variations in one place help users understand the full component API.

**Reference**: Strapi components have single comprehensive story files

---

### Rule 3: Automatic Flavor Modes via @media (Critical)

Flavor modes (light, dark, high-contrast) are **automatic via CSS @media queries** and MUST NOT be manually controllable in Storybook.

**Pattern**:

````typescript
// ✅ CORRECT - No flavorMode in argTypes
const meta: Meta = {
  title: "Components/Button",
  argTypes: {
    flavor: {
      control: "select",
      options: ["original", "strawberry", "ocean", "forest", "sunset"],
      description: "Theme flavor (inherited from ancestor)",
    },
    // ❌ DO NOT add flavorMode control - it's automatic
  },
};

/**
 * Flavor mode demonstration.
 *
 * **Automatic Mode Switching**:
 * - Light mode: Default system appearance
 * - Dark mode: Automatically applied when system uses dark theme
 * - High-contrast: Automatically applied when system uses high-contrast
 *
 * **Testing modes**:
 * 1. Use browser DevTools > Rendering > Emulate CSS media feature
 * 2. Change OS system preferences (Settings > Appearance)
 * 3. Storybook toolbar "Backgrounds" addon shows mode visually
 *
 * **Implementation**:
 * ```css
 * @media (prefers-color-scheme: dark) {
 *   [flavor="original"] {
 *     --sando-color-background-base: var(--sando-color-neutral-900);
 *   }
 * }
 * ```
 */
export const FlavorModes: Story = {
  render: () => html`
    <div>
      <p>Current mode: Automatic (responds to system preferences)</p>
      <sando-button flavor="original">Original Flavor</sando-button>
      <sando-button flavor="strawberry">Strawberry Flavor</sando-button>
      <sando-button flavor="ocean">Ocean Flavor</sando-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
          Flavor modes automatically respond to system preferences.

          **To test dark mode**:
          - Browser: DevTools > Rendering > "Emulate CSS media feature prefers-color-scheme: dark"
          - Mac: System Preferences > General > Appearance > Dark
          - Windows: Settings > Personalization > Colors > Choose your mode > Dark
        `,
      },
    },
  },
};
````

**Why**: Flavor modes use `@media (prefers-color-scheme)` for automatic system preference detection. Manual controls would contradict this behavior and confuse users.

**Reference**: Sando theming system uses CSS @media queries for automatic mode switching

---

### Rule 4: Comprehensive argTypes Documentation (Required)

All interactive component properties MUST have complete argTypes configuration with controls, descriptions, categories, and default values.

**Pattern**:

```typescript
const meta: Meta = {
  argTypes: {
    propertyName: {
      // Control type (select, boolean, text, number, etc.)
      control: "select",
      options: ["option1", "option2"],

      // Human-readable description
      description: "Clear explanation of what this property does",

      // Organize related properties
      table: {
        category: "Appearance", // or 'State', 'Content', 'Behavior', 'Theming'
        defaultValue: { summary: "default" },
        type: { summary: "string" },
      },
    },
  },
};
```

**Category conventions**:

- **Appearance**: Visual styles (variant, size, color)
- **State**: Interactive states (disabled, loading, error)
- **Content**: Text, icons, slots
- **Behavior**: Event handlers, interaction settings
- **Theming**: Flavor, mode-related properties

**Control types**:

```typescript
// Select dropdown
control: 'select',
options: ['small', 'medium', 'large']

// Boolean checkbox
control: 'boolean'

// Text input
control: 'text'

// Number slider
control: { type: 'number', min: 0, max: 100, step: 1 }

// Color picker
control: 'color'

// Date picker
control: 'date'

// Object/Array editor
control: 'object'

// Disable control (display-only)
control: false
```

**Why**: Comprehensive argTypes enable interactive exploration and serve as self-documenting API reference. Categories organize complex components with many properties.

---

### Rule 5: Focused Stories for Complex Scenarios (Optional)

Complex components MAY have additional focused story files in a `stories/` subdirectory for specialized documentation.

**Pattern**:

```typescript
// packages/components/src/components/button/stories/icons.stories.ts
import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "../sando-button";

const meta: Meta = {
  title: "Components/Button/Icons",
  component: "sando-button",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

/**
 * Buttons with leading icons improve visual recognition.
 */
export const LeadingIcon: Story = {
  render: () => html`
    <sando-button>
      <svg slot="icon-start" width="16" height="16">
        <path d="M8 2L2 8l6 6 6-6z" />
      </svg>
      With Icon
    </sando-button>
  `,
};

/**
 * Icon-only buttons require aria-label for accessibility.
 */
export const IconOnly: Story = {
  render: () => html`
    <sando-button aria-label="Settings">
      <svg slot="icon-start" width="16" height="16">
        <path d="M8 2L2 8l6 6 6-6z" />
      </svg>
    </sando-button>
  `,
};
```

**When to create focused stories**:

- Component has 5+ variants/states/sizes
- Special use cases (icons, forms, compositions)
- Integration examples (with other components)
- Responsive behavior demonstrations
- Complex slot configurations

**Why**: Focused stories keep main story file manageable while providing deep-dive documentation for advanced scenarios. Strapi uses this pattern for complex components.

---

## Story Templates

### Design Tokens Story Template

````typescript
// packages/components/src/tokens/stories/colors.stories.ts
import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

/**
 * # Color Tokens
 *
 * Sando uses a three-layer token architecture:
 *
 * **Layer 1: Ingredients** - Raw color values (#f97415)
 * **Layer 2: Flavors** - Semantic color roles (background, text, border)
 * **Layer 3: Recipes** - Component-specific colors (button-background)
 *
 * ## Usage
 *
 * Components consume Flavor tokens via CSS custom properties:
 *
 * ```css
 * background: var(--sando-color-background-base);
 * color: var(--sando-color-text-primary);
 * border: 1px solid var(--sando-color-border-default);
 * ```
 *
 * ## Accessibility
 *
 * All color combinations meet WCAG 2.1 AA contrast requirements (4.5:1 for text, 3:1 for UI).
 */
const meta: Meta = {
  title: "Design Tokens/Colors",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

/**
 * Brand colors define the primary visual identity.
 */
export const BrandColors: Story = {
  render: () => html`
    <div
      style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px;"
    >
      ${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(
        (shade) => html`
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div
              style="
            background: var(--sando-color-brand-${shade});
            height: 80px;
            border-radius: 8px;
            border: 1px solid var(--sando-color-border-default);
          "
            ></div>
            <div style="font-size: 12px; text-align: center;">
              brand-${shade}
            </div>
          </div>
        `,
      )}
    </div>
  `,
  parameters: {
    controls: { disable: true },
  },
};

/**
 * Semantic colors provide meaning and context.
 */
export const SemanticColors: Story = {
  render: () => html`
    <div style="display: grid; gap: 16px;">
      ${["success", "warning", "error", "info"].map(
        (type) => html`
          <div style="display: flex; align-items: center; gap: 16px;">
            <div
              style="
            background: var(--sando-color-${type}-background);
            color: var(--sando-color-${type}-text);
            padding: 16px 24px;
            border-radius: 8px;
            border: 1px solid var(--sando-color-${type}-border);
            flex: 1;
          "
            >
              ${type.charAt(0).toUpperCase() + type.slice(1)} message
            </div>
          </div>
        `,
      )}
    </div>
  `,
  parameters: {
    controls: { disable: true },
  },
};
````

---

### Pattern Story Template

```typescript
// packages/components/src/patterns/stories/forms.stories.ts
import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "../../components/input/sando-input";
import "../../components/button/sando-button";

/**
 * # Form Patterns
 *
 * Common form layouts and compositions using Sando components.
 *
 * ## Best Practices
 *
 * - Use semantic HTML (`<form>`, `<label>`, `<fieldset>`)
 * - Provide clear labels and error messages
 * - Validate on blur and submit
 * - Show loading state during submission
 * - Announce errors to screen readers
 */
const meta: Meta = {
  title: "Patterns/Forms",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

/**
 * Standard login form with email and password fields.
 */
export const LoginForm: Story = {
  render: () => html`
    <form
      style="max-width: 400px; display: flex; flex-direction: column; gap: 24px;"
    >
      <h2 style="margin: 0;">Sign In</h2>

      <sando-input
        type="email"
        label="Email"
        placeholder="you@example.com"
        required
      ></sando-input>

      <sando-input
        type="password"
        label="Password"
        placeholder="Enter your password"
        required
      ></sando-input>

      <div style="display: flex; gap: 12px;">
        <sando-button type="submit" variant="solid" style="flex: 1;">
          Sign In
        </sando-button>
        <sando-button type="button" variant="ghost">
          Forgot Password?
        </sando-button>
      </div>
    </form>
  `,
  parameters: {
    controls: { disable: true },
  },
};
```

---

## Story Organization Best Practices

### Naming Conventions

**Story titles** (meta.title):

```typescript
// Design Tokens section
"Design Tokens/Colors";
"Design Tokens/Spacing";
"Design Tokens/Typography";

// Components section
"Components/Button";
"Components/Input";
"Components/Card";

// Patterns section
"Patterns/Forms";
"Patterns/Navigation";
"Patterns/Layouts";
```

**Story names** (export names):

```typescript
// Use PascalCase
export const Default: Story = {};
export const AllVariants: Story = {};
export const WithIcons: Story = {};

// Descriptive names
export const LoginForm: Story = {};
export const BrandColors: Story = {};
export const ResponsiveGrid: Story = {};
```

**File names**:

```typescript
// Main story per component
sando - button.stories.ts;
sando - input.stories.ts;

// Token stories
colors.stories.ts;
spacing.stories.ts;

// Pattern stories
forms.stories.ts;
navigation.stories.ts;
```

---

### Story Documentation

**JSDoc comments** provide context in Storybook UI:

````typescript
/**
 * Short one-line summary.
 *
 * ## Extended Documentation
 *
 * Markdown formatting supported:
 * - Lists
 * - **Bold** and *italic*
 * - `Code blocks`
 * - [Links](https://example.com)
 *
 * ### Code Examples
 *
 * ```html
 * <sando-button variant="solid">Click me</sando-button>
 * ```
 *
 * ### Accessibility
 *
 * Important a11y notes here.
 */
export const StoryName: Story = {};
````

**Story parameters** for additional metadata:

```typescript
export const StoryName: Story = {
  parameters: {
    // Disable controls for showcase stories
    controls: { disable: true },

    // Custom documentation
    docs: {
      description: {
        story: "Additional context shown in docs page",
      },
    },

    // Custom backgrounds
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#1a1a1a" },
        { name: "light", value: "#ffffff" },
      ],
    },

    // Viewport sizes
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
```

---

## Common Story Patterns

### All Variants Showcase

```typescript
/**
 * All button variants for visual comparison.
 */
export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap;">
      ${["solid", "outline", "ghost"].map(
        (variant) => html`
          <sando-button variant="${variant}">
            ${variant.charAt(0).toUpperCase() + variant.slice(1)}
          </sando-button>
        `,
      )}
    </div>
  `,
  parameters: {
    controls: { disable: true },
  },
};
```

---

### Flavor Comparison

```typescript
/**
 * All flavor themes displayed together.
 * Modes automatically respond to system preferences.
 */
export const AllFlavors: Story = {
  render: () => html`
    <div style="display: grid; gap: 24px;">
      ${["original", "strawberry", "ocean", "forest", "sunset"].map(
        (flavor) => html`
          <div
            flavor="${flavor}"
            style="padding: 24px; border-radius: 8px; background: var(--sando-color-background-base);"
          >
            <h3 style="margin: 0 0 16px; text-transform: capitalize;">
              ${flavor}
            </h3>
            <div style="display: flex; gap: 12px;">
              <sando-button variant="solid">Solid</sando-button>
              <sando-button variant="outline">Outline</sando-button>
              <sando-button variant="ghost">Ghost</sando-button>
            </div>
          </div>
        `,
      )}
    </div>
  `,
  parameters: {
    controls: { disable: true },
  },
};
```

---

### Interactive Playground

```typescript
/**
 * Interactive playground to experiment with all properties.
 */
export const Playground: Story = {
  render: (args) => html`
    <sando-button
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      ${args.label}
    </sando-button>
  `,
};
```

---

### Responsive Behavior

```typescript
/**
 * Component adapts to different screen sizes.
 */
export const Responsive: Story = {
  render: () => html`
    <div style="display: grid; gap: 16px;">
      <sando-button style="width: 100%;">Full Width Mobile</sando-button>
      <div
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;"
      >
        <sando-button>Action 1</sando-button>
        <sando-button>Action 2</sando-button>
        <sando-button>Action 3</sando-button>
      </div>
    </div>
  `,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
```

---

## Accessibility in Stories

### Testing Accessibility

```typescript
import { expect } from "@storybook/jest";
import { within, userEvent } from "@storybook/testing-library";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

/**
 * Accessibility validation with axe-core.
 */
export const AccessibilityTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const results = await axe(canvasElement);
    expect(results).toHaveNoViolations();
  },
};
```

---

### Keyboard Navigation

```typescript
/**
 * All interactive elements are keyboard accessible.
 */
export const KeyboardNavigation: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px;">
      <sando-button>First</sando-button>
      <sando-button>Second</sando-button>
      <sando-button disabled>Disabled (not focusable)</sando-button>
      <sando-button>Third</sando-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: `
          **Keyboard shortcuts**:
          - Tab: Focus next button
          - Shift+Tab: Focus previous button
          - Enter/Space: Activate button
          - Disabled buttons are skipped in tab order
        `,
      },
    },
  },
};
```

---

## Validation Checklist

### Component Story Creation

- [ ] Main story file exists (`sando-component.stories.ts`)
- [ ] Story title follows pattern: `Components/ComponentName`
- [ ] `tags: ['autodocs']` enabled for automatic documentation
- [ ] Comprehensive argTypes with descriptions and categories
- [ ] Default story exists for basic usage
- [ ] Playground story exists for interactive exploration
- [ ] All variants showcased in comparison story
- [ ] JSDoc documentation added to component and stories
- [ ] Accessibility notes included in documentation
- [ ] Flavor comparison included (if applicable)
- [ ] No manual `flavorMode` controls (modes are automatic)

### Design Tokens Story

- [ ] Story title follows pattern: `Design Tokens/TokenCategory`
- [ ] Visual showcase of all token values
- [ ] Usage examples in code blocks
- [ ] Explanation of three-layer architecture
- [ ] Accessibility compliance noted (WCAG contrast)

### Pattern Story

- [ ] Story title follows pattern: `Patterns/PatternName`
- [ ] Real-world composition example
- [ ] Best practices documented
- [ ] Accessibility guidance included
- [ ] Responsive behavior demonstrated

---

## Related Guidelines

- [API_REFERENCE.md](./API_REFERENCE.md) - Component API documentation standards
- [VITEPRESS_GUIDES.md](./VITEPRESS_GUIDES.md) - Long-form guide writing
- [WCAG_COMPLIANCE.md](../04-accessibility/WCAG_COMPLIANCE.md) - Accessibility requirements
- [CODE_STYLE.md](../03-development/CODE_STYLE.md) - TypeScript and Lit conventions

---

## External References

**Storybook Documentation**:

- [Storybook 8 Docs](https://storybook.js.org/docs) - Official documentation
- [Web Components in Storybook](https://storybook.js.org/docs/web-components/get-started/introduction) - Framework setup
- [ArgTypes](https://storybook.js.org/docs/api/arg-types) - Control configuration

**Design System References**:

- [Strapi Design System](https://design-system.strapi.io/) - Organization inspiration
- [Material Design](https://m3.material.io/) - Component documentation patterns
- [Carbon Design System](https://carbondesignsystem.com/) - Story structure examples

---

## Changelog

### 1.0.0 (2025-11-03)

- Initial guideline creation following Strapi Design System patterns
- Three-section organization (Design Tokens, Components, Patterns)
- Main story file pattern with comprehensive argTypes
- Automatic flavor mode documentation (no manual controls)
- Focused story files for complex scenarios
- Design tokens, component, and pattern templates
- Common story patterns (variants, flavors, playground, responsive)
- Accessibility testing integration
- Validation checklist for all story types
- Agent-optimized format (500 lines)

---

**Storybook stories are living documentation - they serve developers, designers, and stakeholders equally. Invest in comprehensive, interactive examples.**
