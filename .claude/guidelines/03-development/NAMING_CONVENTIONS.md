# Naming Conventions

**Category**: 03-development
**Version**: 2.0.0
**Status**: Active
**Last Updated**: 2025-11-03
**Owner**: Design System Architect

---

## Purpose

Establish consistent naming patterns for components, files, variables, tokens, and exports to ensure clarity, prevent naming conflicts, enable automated tooling, and maintain a cohesive developer experience across the Sando Design System.

---

## Core Rules

### Rule 1: Component Naming (Non-Negotiable)

**Web Component tag names MUST use the `sando-` prefix with kebab-case. Class names MUST use the `Sando` prefix with PascalCase.**

**Pattern**:
```typescript
// ✅ CORRECT: Component naming from sando-button.ts
@customElement('sando-button')
export class SandoButton extends FlavorableMixin(LitElement) {
  // Component implementation
}

// Global type declaration
declare global {
  interface HTMLElementTagNameMap {
    'sando-button': SandoButton;
  }
}
```

**Anti-pattern**:
```typescript
// ❌ WRONG: Missing prefix
@customElement('button')
export class Button extends LitElement {}

// ❌ WRONG: Wrong case for tag name
@customElement('SandoButton')  // Must be kebab-case
export class SandoButton extends LitElement {}

// ❌ WRONG: Missing prefix on class
@customElement('sando-button')
export class Button extends LitElement {}  // Must be SandoButton
```

**Why This Matters**: The `sando-` prefix prevents naming conflicts with native HTML elements and future web standards. Kebab-case is required by the Custom Elements spec. PascalCase for class names follows TypeScript/JavaScript conventions.

---

### Rule 2: File Naming (Non-Negotiable)

**File names MUST use kebab-case with specific suffixes indicating file purpose.**

**Pattern**:
```
✅ CORRECT: Monolithic component structure
packages/components/src/components/button/
├── sando-button.ts              # Component implementation
├── sando-button.types.ts        # Type definitions
├── sando-button.stories.ts      # Storybook documentation
├── sando-button.test.ts         # Unit tests (Vitest)
├── sando-button.spec.ts         # E2E tests (Playwright) [optional]
├── sando-button.a11y.test.ts    # Accessibility tests (axe-core)
└── index.ts                     # Component barrel export
```

**Anti-pattern**:
```
❌ WRONG: Inconsistent file naming
├── SandoButton.ts               # PascalCase (wrong for files)
├── sando_button.types.ts        # snake_case (wrong)
├── sandoButton.stories.ts       # camelCase (wrong)
├── Button.test.ts               # Missing component prefix
└── sando-button.e2e.test.ts    # Use .spec.ts instead
```

**Why This Matters**: Kebab-case works consistently across all operating systems. File suffixes clearly indicate purpose without opening files. Standardized suffixes enable automated tooling.

**Reference**: See [COMPONENT_ARCHITECTURE.md](../../02-architecture/COMPONENT_ARCHITECTURE.md) for complete file structure patterns.

---

### Rule 3: Token Naming (Non-Negotiable)

**CSS custom properties MUST start with `--sando-` and use kebab-case. Token paths follow the three-layer architecture (Ingredients → Flavors → Recipes).**

**Reference**: See [TOKEN_ARCHITECTURE.md](../../01-design-system/TOKEN_ARCHITECTURE.md) for the complete three-layer token system.

**CSS Naming Formula**: `--sando-{category}-{property}-{variant?}-{state?}`

**Pattern**:
```css
/* ✅ CORRECT: Token naming at each layer */

/* Layer 1: Ingredients (primitives) */
--sando-color-orange-700: hsl(25, 95%, 53%);
--sando-space-4: 1rem;

/* Layer 2: Flavors (semantic) */
--sando-color-background-base: var(--sando-color-neutral-100);
--sando-color-action-solid-background-default: var(--sando-color-orange-700);

/* Layer 3: Recipes (component-specific) */
--sando-button-solid-backgroundColor-default: var(--sando-color-action-solid-background-default);
--sando-button-solid-backgroundColor-hover: var(--sando-color-action-solid-background-hover);
```

**Anti-pattern**:
```css
/* ❌ WRONG: Missing --sando- prefix */
--button-color: #f97415;

/* ❌ WRONG: Using camelCase or snake_case */
--sando-buttonColor: #f97415;
--sando-button_color: #f97415;
```

**Why This Matters**: The `--sando-` prefix creates a namespace preventing conflicts with other libraries. Kebab-case is the CSS standard for custom properties. The hierarchical structure makes tokens self-documenting.

---

### Rule 4: Variable Naming (TypeScript/JavaScript)

**Variables and properties use camelCase. Types and classes use PascalCase. Constants use UPPER_SNAKE_CASE.**

**Pattern**:
```typescript
// ✅ CORRECT: Variable naming

// camelCase for variables, properties, functions
const isDisabled = true;
const buttonVariant = 'solid';
function handleClick(event: MouseEvent) {}

// PascalCase for classes, types, interfaces
class SandoButton extends LitElement {}
type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'text';
interface SandoButtonProps {
  variant?: ButtonVariant;
}

// UPPER_SNAKE_CASE for constants
const MAX_RETRIES = 3;
const DEFAULT_VARIANT = 'solid';

// Boolean properties: descriptive prefixes
const isLoading = true;
const hasError = false;
const disabled = true;  // Short form acceptable for common props

// Event handlers: handle* prefix
private handleClick(e: MouseEvent) {}
```

**Anti-pattern**:
```typescript
// ❌ WRONG: Inconsistent casing
const ButtonVariant = 'solid';  // Should be camelCase
const button_size = 'medium';   // Should be camelCase

// ❌ WRONG: Type naming
type buttonVariant = 'solid';   // Should be PascalCase

// ❌ WRONG: Unclear boolean naming
const loading = true;           // Better: isLoading
const error = false;            // Better: hasError
```

**Why This Matters**: Consistent casing conventions improve code readability, prevent naming collisions, follow TypeScript/JavaScript community standards, and enable better IDE autocomplete.

---

### Rule 5: Export Naming (Modules)

**Use named exports (not default exports). Export types separately with the `type` keyword. Use barrel exports via `index.ts`.**

**Pattern**:
```typescript
// ✅ CORRECT: Named exports (from sando-button.ts)
@customElement('sando-button')
export class SandoButton extends FlavorableMixin(LitElement) {
  // Component implementation
}

// ✅ CORRECT: Type exports (from sando-button.types.ts)
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'text';
export interface SandoButtonProps {
  variant?: ButtonVariant;
}

// ✅ CORRECT: Barrel export (from index.ts)
export { SandoButton } from './sando-button.js';
export type { ButtonVariant, SandoButtonProps } from './sando-button.types.js';
```

**Anti-pattern**:
```typescript
// ❌ WRONG: Default exports
export default class SandoButton extends LitElement {}

// ❌ WRONG: Not using type keyword for type-only exports
export { ButtonVariant };  // Should be: export type { ButtonVariant }
```

**Why This Matters**: Named exports provide better IDE autocomplete, clearer import statements, easier refactoring, and better tree-shaking. The `type` keyword enables TypeScript to strip type imports at compile time.

---

## Component Naming Standards

### Web Component Tag Names and Class Names

**Format**: `sando-{component-name}` → `Sando{ComponentName}`

| Tag Name | Class Name | Usage |
|----------|------------|-------|
| `sando-button` | `SandoButton` | Single word component |
| `sando-card` | `SandoCard` | Single word component |
| `sando-text-field` | `SandoTextField` | Multi-word component |
| `sando-date-picker` | `SandoDatePicker` | Multi-word component |

**Rules**:
1. All lowercase for tag name
2. Use hyphens for multi-word names
3. Class name mirrors tag name in PascalCase
4. Prefix both tag and class with `sando`/`Sando`

### Global Type Declarations

Always declare component in global `HTMLElementTagNameMap`:

```typescript
declare global {
  interface HTMLElementTagNameMap {
    'sando-button': SandoButton;
  }
}
```

**Why**: Enables TypeScript autocomplete for HTML elements and `document.querySelector()`.

---

## Token Naming Quick Reference

**Reference**: See [TOKEN_ARCHITECTURE.md](../../01-design-system/TOKEN_ARCHITECTURE.md) for complete architecture details.

### Three-Layer Naming Formula

| Layer | Format | Example |
|-------|--------|---------|
| **Ingredients** (Primitives) | `--sando-{category}-{scale}` | `--sando-color-orange-700` |
| **Flavors** (Semantic) | `--sando-{context}-{property}-{variant?}` | `--sando-color-background-base` |
| **Recipes** (Component) | `--sando-{component}-{variant}-{property}-{state?}` | `--sando-button-solid-backgroundColor-default` |

### Token JSON Naming

**JSON keys use camelCase** (converted to kebab-case in CSS output):

```json
{
  "color": {
    "action": {
      "solid": {
        "background": {
          "default": { "value": "{color.orange.700.value}" }
        }
      }
    }
  }
}
```

**Build Transform**: `color.action.solid.background.default` → `--sando-color-action-solid-background-default`

---

## TypeScript Naming Conventions

### Type Suffix Patterns

| Pattern | Example | Usage |
|---------|---------|-------|
| `{Component}Props` | `SandoButtonProps` | Component props interface |
| `{Component}{Property}` | `ButtonVariant` | Variant unions |
| `{Component}{Event}Detail` | `ButtonClickEventDetail` | Event detail interfaces |
| `{Component}{Event}Event` | `ButtonClickEvent` | Custom event types |

### Types vs Interfaces

**Use `type` for unions/primitives. Use `interface` for object shapes.**

```typescript
// ✅ CORRECT: Type for union types
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'text';

// ✅ CORRECT: Interface for object shapes
export interface SandoButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}
```

### Avoid Enums (Use Union Types)

```typescript
// ✅ CORRECT: Union types (preferred)
export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'text';

// ❌ WRONG: Enums (avoid)
export enum ButtonVariant {
  Solid = 'solid',
  Outline = 'outline'
}
```

**Why**: Union types are simpler, don't require imports for type checking, tree-shake better, and work seamlessly with string values in HTML attributes.

---

## File and Directory Naming

### File Suffix Table

| Suffix | Purpose | Example |
|--------|---------|---------|
| `.ts` | Component implementation | `sando-button.ts` |
| `.types.ts` | Type definitions | `sando-button.types.ts` |
| `.stories.ts` | Storybook documentation | `sando-button.stories.ts` |
| `.test.ts` | Unit tests (Vitest) | `sando-button.test.ts` |
| `.spec.ts` | E2E tests (Playwright) | `sando-button.spec.ts` |
| `.a11y.test.ts` | Accessibility tests | `sando-button.a11y.test.ts` |
| `.styles.ts` | Style files | `base.styles.ts`, `variant.styles.ts` |
| `index.ts` | Barrel export | `index.ts` |

**Reference**: [COMPONENT_ARCHITECTURE.md](../../02-architecture/COMPONENT_ARCHITECTURE.md) for complete component folder structure.

### Style File Naming

```
styles/
├── base.styles.ts               # Base styles (reset, layout)
├── variant.styles.ts            # Variant-specific (solid, outline)
├── size.styles.ts               # Size variants (xs, small, medium)
└── index.ts                     # Barrel export
```

**Convention**: `{purpose}.styles.ts` with descriptive purpose names.

---

## Variable and Function Naming

### Boolean Properties

```typescript
// ✅ CORRECT: Clear boolean naming
const isLoading = true;
const hasError = false;
const canSubmit = true;

// ✅ CORRECT: Common short forms (acceptable for component props)
const disabled = false;   // Common prop, clear meaning
const loading = true;     // Common prop, clear meaning
```

**Guideline**: Use descriptive prefixes (`is*`, `has*`, `can*`, `should*`) for local variables. Short forms acceptable for component properties.

### Event Handlers

```typescript
// ✅ CORRECT: Event handler naming
private handleClick(e: MouseEvent) {}
private handleChange(e: Event) {}

// Callback props use on* prefix
interface Props {
  onClick?: (e: MouseEvent) => void;
  onChange?: (value: string) => void;
}
```

**Convention**: Methods use `handle*`, callback props use `on*`.

### Constants

```typescript
// ✅ CORRECT: True constants
const MAX_RETRIES = 3;
const DEFAULT_VARIANT = 'solid';

// ✅ CORRECT: camelCase for computed/configuration values
const defaultConfig = { timeout: 5000 };
```

**Rule**: Use UPPER_SNAKE_CASE only for hard-coded constant values that never change.

---

## Validation Checklist

### Component Names
- [ ] Tag name uses `sando-` prefix and kebab-case
- [ ] Class name uses `Sando` prefix and PascalCase matching tag name
- [ ] Global `HTMLElementTagNameMap` declaration present
- [ ] Multi-word components use hyphens in tag, PascalCase in class

### File Names
- [ ] All files use kebab-case
- [ ] Component file matches tag name: `sando-{name}.ts`
- [ ] Test files use correct suffixes (`.test.ts`, `.spec.ts`, `.a11y.test.ts`)
- [ ] Barrel export file is `index.ts`

### Token Names
- [ ] CSS variables start with `--sando-`
- [ ] Token path is kebab-case
- [ ] Token structure follows layer convention (Ingredients/Flavors/Recipes)
- [ ] JSON source tokens use camelCase for keys

### Variable Names
- [ ] Variables and properties are camelCase
- [ ] Types and interfaces are PascalCase
- [ ] Constants are UPPER_SNAKE_CASE (true constants only)
- [ ] Boolean properties have descriptive prefixes or clear short forms
- [ ] Event handlers use `handle*` prefix, callback props use `on*` prefix

### Type Names
- [ ] Component props interfaces use `{Component}Props` suffix
- [ ] Variant types use descriptive names (`ButtonVariant`, `ButtonSize`)
- [ ] Event detail interfaces use `{Component}{Event}Detail` pattern
- [ ] Union types used instead of enums

### Export Names
- [ ] Named exports used (not default exports)
- [ ] Type exports use `type` keyword
- [ ] Barrel exports via `index.ts`
- [ ] All public types exported from component module

---

## Related Guidelines

- [TOKEN_ARCHITECTURE.md](../../01-design-system/TOKEN_ARCHITECTURE.md) - Token naming structure and three-layer system
- [COMPONENT_ARCHITECTURE.md](../../02-architecture/COMPONENT_ARCHITECTURE.md) - Component file structure and organization
- [CODE_STYLE.md](./CODE_STYLE.md) - Code formatting and import organization
- [TESTING_STRATEGY.md](./TESTING_STRATEGY.md) - Test file naming and organization

---

## External References

- [Custom Elements Spec](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name) - Tag name requirements
- [CSS Custom Properties](https://www.w3.org/TR/css-variables-1/) - CSS variable naming standards
- [TypeScript Naming Conventions](https://typescript-eslint.io/rules/naming-convention/) - ESLint naming rules

---

## Changelog

### 2.0.0 (2025-11-03)
- **BREAKING**: Reduced file from 858 lines to ~420 lines (51% reduction) for AI agent optimization
- Removed verbose token architecture explanations (referenced TOKEN_ARCHITECTURE.md instead)
- Reduced examples from 51 to 20 (1-2 per rule)
- Consolidated TypeScript conventions into compact tables
- Streamlined validation checklist from 35+ items to 25 essential items
- Converted file suffix patterns to compact tables
- Removed redundant component structure examples (referenced COMPONENT_ARCHITECTURE.md)
- Maintained all 5 Core Rules with essential examples and anti-patterns
- Optimized for AI agent context windows (400-600 line sweet spot)

### 1.0.0 (2025-11-03)
- Initial NAMING_CONVENTIONS.md guideline created
- Established 5 Core Rules: Component naming, file naming, token naming, variable naming, export naming

---

**Consistent naming is the foundation of a maintainable design system. These conventions ensure clarity, prevent conflicts, enable automated tooling, and create a cohesive developer experience across all Sando Design System code.**
