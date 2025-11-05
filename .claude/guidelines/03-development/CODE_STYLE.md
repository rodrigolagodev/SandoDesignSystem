# Code Style Standards

**Category**: 03-development
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-03
**Owner**: Frontend Developer

---

## Purpose

Define code formatting, naming, and organization standards for TypeScript, Lit components, and related files to ensure consistency, readability, and maintainability across the Sando Design System codebase.

---

## Core Rules

### Rule 1: TypeScript Strict Mode (Non-Negotiable)

**ALL TypeScript code MUST have strict mode enabled with comprehensive linting checks.**

**Pattern**:

```typescript
// ✅ CORRECT: tsconfig.json with strict mode
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}

// Code example with proper typing
export class SandoButton extends LitElement {
  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'solid'; // Explicit type from union type

  private handleClick(e: MouseEvent): void {
    // Fully typed parameters and return
  }
}
```

**Anti-pattern**:

```typescript
// ❌ WRONG: Disabling strict mode
{
  "compilerOptions": {
    "strict": false, // Never do this
    "noImplicitAny": false // Never do this
  }
}

// ❌ WRONG: Implicit any types
export class BadComponent extends LitElement {
  @property()
  data; // No type annotation

  private handleClick(e) { // No parameter type
    // Implicit any
  }
}
```

**Why This Matters**: Strict mode catches bugs at compile time, provides better IDE autocomplete, prevents runtime errors, and serves as living documentation. The small upfront cost of typing saves hours of debugging.

**Reference**: See `packages/components/tsconfig.json` for exact TypeScript configuration.

---

### Rule 2: Import Organization (Non-Negotiable)

**Imports MUST be organized in 5 groups with a blank line between each group: external packages, Lit framework, component types, internal modules, and styles.**

**Pattern**:

```typescript
// ✅ CORRECT: Organized imports from sando-button.ts
// Group 1: External packages (alphabetical)
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

// Group 2: Types (relative imports)
import type {
  ButtonVariant,
  ButtonSize,
  ButtonStatus,
  ButtonRadius,
} from "./sando-button.types.js";

// Group 3: Internal modules (mixins, utilities)
import { FlavorableMixin } from "../../mixins/index.js";

// Group 4: Styles (always last)
import { tokenStyles } from "../../styles/tokens.css.js";
import {
  baseStyles,
  variantStyles,
  sizeStyles,
  radiusStyles,
  statusStyles,
  stateStyles,
} from "./styles/index.js";
```

**Anti-pattern**:

```typescript
// ❌ WRONG: Random import order
import { baseStyles } from "./styles/index.js";
import type { ButtonVariant } from "./sando-button.types.js";
import { LitElement } from "lit";
import { FlavorableMixin } from "../../mixins/index.js";
import { property } from "lit/decorators.js";
// No organization, hard to scan
```

**Why This Matters**: Consistent import order makes code reviews easier, reduces merge conflicts in import blocks, and helps identify missing dependencies quickly. The pattern matches ESLint's automatic sorting.

**Automation**: ESLint with `eslint-plugin-import` (or prettier-plugin-organize-imports) can auto-sort imports.

---

### Rule 3: File Naming Conventions (Non-Negotiable)

**File names MUST use kebab-case with specific suffixes indicating file purpose.**

**Pattern**:

```
✅ CORRECT: Component file structure
packages/components/src/components/button/
├── sando-button.ts              # Component implementation
├── sando-button.types.ts        # Type definitions
├── sando-button.stories.ts      # Storybook documentation
├── sando-button.test.ts         # Unit tests (Vitest)
├── sando-button.spec.ts         # E2E tests (Playwright)
├── sando-button.a11y.test.ts    # Accessibility tests (axe-core)
└── index.ts                     # Barrel export

✅ CORRECT: Token files
packages/tokens/src/
├── ingredients/
│   ├── color.json               # kebab-case
│   ├── space.json
│   └── font-size.json          # Multi-word with hyphen
├── flavors/
│   └── original/
│       ├── flavor.json
│       └── flavor-dark.json    # Mode suffix with hyphen
└── recipes/
    └── button.json
```

**Anti-pattern**:

```
❌ WRONG: Inconsistent file naming
packages/components/src/components/button/
├── SandoButton.ts               # PascalCase (wrong for files)
├── sando_button.types.ts        # snake_case (wrong)
├── sandoButton.stories.ts       # camelCase (wrong)
├── Button.test.ts               # Missing prefix
└── sando-button.accessibility.test.ts  # Use .a11y.test.ts instead
```

**Why This Matters**: Kebab-case works across all operating systems (case-insensitive Windows vs case-sensitive Linux), matches Web Component tag names (`sando-button`), and prevents filename collisions. Suffixes clearly indicate file purpose without opening the file.

---

### Rule 4: JSDoc Documentation (Required for Public APIs)

**ALL public component properties, methods, slots, CSS custom properties, and events MUST have JSDoc comments.**

**Pattern**:

```typescript
// ✅ CORRECT: Comprehensive JSDoc (from sando-button.ts)
/**
 * Sando Button Component
 *
 * A fully accessible button component built with Lit following industry standards.
 * Supports multiple variants, sizes, states, and can render as button or link.
 *
 * @element sando-button
 *
 * @slot - Button content (text, icons, etc.)
 * @slot icon-start - Icon before the button text
 * @slot icon-end - Icon after the button text
 *
 * @fires click - Fired when the button is clicked (unless disabled)
 *
 * @cssprop --sando-button-fontFamily - Button font family
 * @cssprop --sando-button-borderRadius - Button border radius
 *
 * @example Basic usage
 * <sando-button variant="solid">Click Me</sando-button>
 *
 * @example As link
 * <sando-button href="https://example.com">Visit</sando-button>
 */
@customElement("sando-button")
export class SandoButton extends FlavorableMixin(LitElement) {
  /**
   * Visual style variant of the button
   * @default 'solid'
   */
  @property({ reflect: true })
  variant: ButtonVariant = "solid";
}
```

**Anti-pattern**:

```typescript
// ❌ WRONG: Missing or inadequate JSDoc
@customElement("sando-button")
export class SandoButton extends FlavorableMixin(LitElement) {
  @property({ reflect: true })
  variant: ButtonVariant = "solid"; // Inline comment is not enough for public API

  // No documentation for method
  private handleClick(e: MouseEvent) {
    // ...
  }
}
```

**Why This Matters**: JSDoc generates automatic API documentation, provides inline help in IDEs, documents examples for users, and serves as design documentation. Custom element analyzer tools extract JSDoc to generate reference docs automatically.

**Reference**: See `packages/components/src/components/button/sando-button.ts` lines 1-61 for comprehensive JSDoc examples.

---

### Rule 5: Code Formatting Standards

**Code MUST be formatted with Prettier using the project configuration. NO manual formatting deviations allowed.**

**Pattern**:

```typescript
// ✅ CORRECT: Follows Prettier standards (100 char line width, single quotes)
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("sando-button")
export class SandoButton extends FlavorableMixin(LitElement) {
  static styles = [
    tokenStyles,
    baseStyles,
    variantStyles,
    sizeStyles,
    radiusStyles,
    statusStyles,
    stateStyles,
  ];

  render() {
    const classes = {
      button: true,
      loading: this.loading,
      disabled: this.disabled,
    };

    return html`
      <button
        class=${classMap(classes)}
        type=${this.type}
        ?disabled=${this.disabled}
      >
        <slot></slot>
      </button>
    `;
  }
}
```

**Anti-pattern**:

```typescript
// ❌ WRONG: Manual formatting that violates Prettier rules
import { LitElement, html } from "lit"; // Double quotes, no spacing
import { customElement, property } from "lit/decorators.js";

@customElement("sando-button") // Extra spaces
export class SandoButton extends FlavorableMixin(LitElement) {
  static styles = [
    tokenStyles,
    baseStyles,
    variantStyles,
    sizeStyles,
    radiusStyles,
    statusStyles,
    stateStyles,
  ]; // No line breaks, inconsistent spacing

  render() {
    const classes = {
      button: true,
      loading: this.loading,
      disabled: this.disabled,
    }; // No spacing

    return html`<button
      class=${classMap(classes)}
      type=${this.type}
      ?disabled=${this.disabled}
    >
      <slot></slot>
    </button>`; // No formatting
  }
}
```

**Why This Matters**: Automated formatting eliminates bikeshedding, ensures git diffs show real changes (not formatting), prevents PR comments about style, and integrates with pre-commit hooks. Prettier is non-negotiable.

**Reference**: See `packages/components/.prettierrc.json` for exact Prettier configuration.

---

## Configuration Files

### TypeScript (tsconfig.json)

**Reference**: `packages/components/tsconfig.json` for exact configuration.

Critical settings:

- `"strict": true` - Enables all strict type checks
- `"experimentalDecorators": true` - Required for Lit @decorators
- `"useDefineForClassFields": false` - Required for Lit compatibility

### ESLint (.eslintrc.cjs)

**Reference**: `packages/components/.eslintrc.cjs` for exact rules.

Plugin stack: `@typescript-eslint/recommended` + `plugin:wc/recommended` + `plugin:lit/recommended`

Key rules:

- `@typescript-eslint/no-unused-vars` - Error on unused variables (prefix with `_` to bypass)
- `wc/no-closed-shadow-root` - Never create closed shadow roots
- `lit/no-invalid-html` - Validates HTML in templates

**Run**: `pnpm lint` or `pnpm lint --fix`

### Prettier (.prettierrc.json)

**Reference**: `packages/components/.prettierrc.json` for exact settings.

Key settings: Single quotes, 2-space indent, 100-char line width, no trailing commas.

**Run**: `pnpm format` or `pnpm format:check`

---

## Component Code Organization

### Property Declaration Order

Follow this order in component class definitions (from `sando-button.ts`):

```typescript
@customElement("sando-button")
export class SandoButton extends FlavorableMixin(LitElement) {
  // 1. Static properties (styles, etc.)
  static styles = [
    tokenStyles,
    baseStyles,
    // ...
  ];

  // 2. Public properties (@property with reflect)
  @property({ reflect: true })
  variant: ButtonVariant = "solid";

  @property({ reflect: true })
  size: ButtonSize = "medium";

  // 3. Public boolean properties
  @property({ type: Boolean, reflect: true })
  disabled = false;

  // 4. Private/protected properties
  private _internalState: boolean = false;

  // 5. Lifecycle methods (constructor, connectedCallback, etc.)
  connectedCallback() {
    super.connectedCallback();
    // ...
  }

  // 6. Private methods (prefixed with _)
  private handleClick(e: MouseEvent) {
    // ...
  }

  // 7. Render method (always last)
  render() {
    return html`...`;
  }
}
```

**Why this order**: Static members → Public API → Internal state → Lifecycle → Helpers → Render. This pattern makes the public API immediately visible when opening a file.

---

## Variable Naming Conventions

```typescript
// ✅ CORRECT: camelCase for variables, functions, methods
const isDisabled = true;
function handleClick() {}

// ✅ CORRECT: PascalCase for classes, interfaces, types
class SandoButton extends LitElement {}
type ButtonVariant = 'solid' | 'outline';

// ✅ CORRECT: UPPER_CASE for constants
const MAX_RETRIES = 3;

// ✅ CORRECT: Prefix unused params with underscore
protected updated(_changedProperties: Map<string, unknown>) {}
```

**Reference**: [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md) for comprehensive naming standards.

---

## File Structure Within Components

### Monolithic Component Pattern

**Reference**: [COMPONENT_ARCHITECTURE.md](../../02-architecture/COMPONENT_ARCHITECTURE.md)

Each component folder contains exactly 7 files:

```
sando-button/
├── sando-button.ts              # Main component (200-400 lines typical)
├── sando-button.types.ts        # Type definitions (50-150 lines)
├── sando-button.stories.ts      # Storybook stories
├── sando-button.test.ts         # Unit tests (Vitest)
├── sando-button.spec.ts         # E2E tests (Playwright)
├── sando-button.a11y.test.ts    # Accessibility tests
└── index.ts                     # Barrel export
```

**index.ts pattern** (barrel export):

```typescript
// ✅ CORRECT: Clean barrel export
export { SandoButton } from "./sando-button.js";
export type {
  ButtonVariant,
  ButtonSize,
  ButtonStatus,
  ButtonRadius,
  SandoButtonProps,
} from "./sando-button.types.js";
```

**Why monolithic**: All component files live together, making them easy to find, maintain, and understand. No hunting across multiple folders.

---

## Code Comments

**Explain WHY, not WHAT** - Code should be self-documenting for the "what".

```typescript
// ✅ CORRECT: Document reasoning
// Disable Shadow DOM for legacy integration (remove in v3.0)
protected createRenderRoot() { return this; }

// ❌ WRONG: Obvious comments
// Set variant to solid
this.variant = 'solid';

// ❌ WRONG: Commented-out code (use git history)
// const oldImplementation = () => { ... };
```

**JSDoc vs Inline**: Use JSDoc (`/** */`) for public APIs, inline comments (`//`) for implementation details.

---

## Token Consumption Patterns

### Using Design Tokens in Components

**Reference**: [TOKEN_ARCHITECTURE.md](../../01-design-system/TOKEN_ARCHITECTURE.md)

```typescript
// ✅ CORRECT: Import from Recipes layer (component-specific tokens)
import { css } from "lit";

export class SandoButton extends LitElement {
  static styles = css`
    .button {
      /* Use Recipe tokens for component styles */
      background: var(--sando-button-solid-backgroundColor-default);
      color: var(--sando-button-solid-textColor-default);
      padding: var(--sando-button-medium-padding);

      /* Automatic theming via Flavors layer */
      border-radius: var(--sando-button-borderRadius-default);
    }

    .button:hover {
      background: var(--sando-button-solid-backgroundColor-hover);
    }
  `;
}
```

**Anti-patterns**:

```typescript
// ❌ WRONG: Hardcoded values (breaks theming)
static styles = css`
  .button {
    background: #f97415;  // Never hardcode colors
    padding: 12px 24px;   // Never hardcode spacing
  }
`;

// ❌ WRONG: Using Ingredient tokens directly (breaks abstraction)
static styles = css`
  .button {
    background: var(--sando-color-orange-700);  // Should use Recipe token
    padding: var(--sando-space-3);              // Should use Recipe token
  }
`;

// ❌ WRONG: Using Flavor tokens in components (skip a layer)
static styles = css`
  .button {
    background: var(--sando-color-action-background);  // Should use Recipe token
  }
`;
```

**Why**: Components consume Recipe tokens, Recipe tokens reference Flavors, Flavors reference Ingredients. This three-layer architecture enables theming without component changes.

---

## Validation Checklist

### TypeScript

- [ ] `strict: true` enabled in tsconfig.json
- [ ] No `any` types (use `unknown` or specific types)
- [ ] All public APIs have explicit return types
- [ ] All function parameters have type annotations
- [ ] `experimentalDecorators: true` for Lit components

### Code Formatting

- [ ] Prettier configured and running on save
- [ ] ESLint passes with no errors or warnings
- [ ] Imports organized in 5 groups (external, Lit, types, internal, styles)
- [ ] Line length ≤ 100 characters (Prettier enforces)
- [ ] Single quotes for strings (Prettier enforces)

### File Naming

- [ ] All files use kebab-case
- [ ] Component files prefixed with `sando-`
- [ ] Test files use correct suffixes (`.test.ts`, `.spec.ts`, `.a11y.test.ts`)
- [ ] Type files use `.types.ts` suffix
- [ ] Story files use `.stories.ts` suffix

### Documentation

- [ ] Component class has comprehensive JSDoc with @element, @slot, @fires, @cssprop tags
- [ ] All public @property decorators have JSDoc with @default
- [ ] Complex logic has inline comments explaining WHY
- [ ] External references documented with links

### Component Structure

- [ ] Static styles array declared first
- [ ] Public properties before private properties
- [ ] Lifecycle methods before helper methods
- [ ] render() method last
- [ ] Private methods prefixed with underscore (optional)

### Token Usage

- [ ] No hardcoded colors, spacing, or typography values
- [ ] Components use Recipe tokens (not Flavors or Ingredients)
- [ ] CSS custom properties follow `--sando-*` naming
- [ ] Styles reference tokens via `var(--sando-*)`

---

## Related Guidelines

- [COMPONENT_ARCHITECTURE.md](../../02-architecture/COMPONENT_ARCHITECTURE.md) - Component file structure and patterns
- [TOKEN_ARCHITECTURE.md](../../01-design-system/TOKEN_ARCHITECTURE.md) - Token consumption patterns
- [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md) - Comprehensive naming standards
- [TESTING_STRATEGY.md](./TESTING_STRATEGY.md) - Test file organization

---

## External References

- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict) - Official documentation
- [Lit Style Guide](https://lit.dev/docs/components/properties/) - Lit best practices
- [ESLint Rules](https://eslint.org/docs/latest/rules/) - ESLint documentation
- [Prettier Options](https://prettier.io/docs/en/options.html) - Prettier configuration
- [JSDoc Reference](https://jsdoc.app/) - JSDoc tag documentation
- [Custom Element Best Practices](https://web.dev/custom-elements-best-practices/) - Web Components patterns

---

## Tooling Support

**VS Code Extensions**: Prettier, ESLint, Lit Plugin recommended.

**Pre-commit Hooks**: `pnpm lint-staged` runs on staged files.

**Scripts** (from `packages/components/`):

```bash
pnpm lint              # ESLint check
pnpm lint --fix        # Auto-fix
pnpm format            # Prettier format
pnpm typecheck         # TypeScript check
```

---

## Changelog

### 1.0.0 (2025-11-03)

- Initial CODE_STYLE.md guideline created
- Documented TypeScript strict mode configuration (tsconfig.json reference)
- Established 5 Core Rules: Strict mode, import organization, file naming, JSDoc, Prettier
- Referenced ESLint configuration (.eslintrc.cjs) and key rules
- Referenced Prettier configuration (.prettierrc.json) and settings
- Component code organization patterns from sando-button.ts
- Variable naming conventions (camelCase, PascalCase, UPPER_CASE)
- Token consumption patterns (Recipe tokens only)
- Validation checklist covering TypeScript, formatting, naming, docs
- Agent-optimized format (~480 lines, reference-based, no duplication)

---

**These code style standards ensure consistency and quality across the Sando Design System. Follow them precisely, use automated tooling to enforce them, and maintain them as the single source of truth for code formatting decisions.**
