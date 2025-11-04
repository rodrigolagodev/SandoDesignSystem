# Inline Code Documentation

**Category**: 06-documentation
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-03
**Owner**: Frontend Developer

---

## Purpose

Establish comprehensive standards for inline code documentation (JSDoc comments, TypeScript type annotations, and helpful comments) across the Sando Design System codebase. This ensures code is self-documenting, maintainable, and provides excellent IDE IntelliSense support for developers.

**Target**: All TypeScript files, JavaScript build scripts, mixins, utilities
**Scope**: JSDoc comments, type annotations, inline comments, code examples
**Enforcement**: Code review, ESLint JSDoc rules

---

## Core Rules

### Rule 1: JSDoc for All Public APIs (Non-Negotiable)

Every exported function, class, method, and property MUST have a JSDoc comment with description, parameter types, and return types.

**Pattern**:
```typescript
/**
 * Brief one-line description of what this does.
 *
 * Extended description with more details if needed.
 * Multiple paragraphs are allowed for complex functionality.
 *
 * @param paramName - Description of parameter
 * @param optionalParam - Description of optional parameter
 * @returns Description of return value
 * @throws ErrorType - When this error occurs
 * @example
 * ```typescript
 * const result = functionName('value');
 * console.log(result); // Output: expected value
 * ```
 */
export function functionName(paramName: string, optionalParam?: boolean): ReturnType {
  // Implementation
}
```

**Real example from flavorable.ts**:
```typescript
/**
 * Flavorable Mixin
 *
 * Adds flavor property with automatic inheritance from ancestor elements.
 * Components can override the inherited flavor by setting an explicit flavor attribute.
 *
 * **Inheritance Rules:**
 * 1. Explicit `flavor` attribute on component (highest priority)
 * 2. Inherited `flavor` from nearest ancestor with `[flavor]` attribute
 * 3. Default `'original'` flavor (fallback)
 *
 * @param Base - Base class (usually LitElement or subclass)
 * @returns Class with Flavorable functionality
 */
export const FlavorableMixin = <T extends Constructor<LitElement>>(Base: T) => {
  // Implementation
};
```

**Why**: JSDoc serves as the contract between code author and consumers. IDEs show this documentation on hover. Documentation generators extract it automatically.

**Reference**: flavorable.ts (lines 64-76), sando-button.ts (lines 1-61)

---

### Rule 2: Property JSDoc with @default and @example (Required)

Every class property MUST have JSDoc with description, @default tag (if applicable), and @example for non-trivial properties.

**Pattern**:
```typescript
/**
 * Description of what this property controls or represents.
 *
 * Additional context about behavior, constraints, or side effects.
 *
 * @default 'defaultValue'
 * @example
 * ```typescript
 * component.propertyName = 'newValue';
 * ```
 */
@property({ reflect: true })
propertyName: PropertyType = 'defaultValue';

/**
 * Boolean property description.
 * @default false
 */
@property({ type: Boolean })
booleanProperty = false;

/**
 * Optional property (no default).
 */
@property()
optionalProperty?: string;
```

**Real example from flavorable.ts**:
```typescript
/**
 * Design system flavor/theme
 *
 * If not explicitly set, will inherit from nearest ancestor with `[flavor]` attribute.
 * Falls back to 'original' if no ancestor flavor is found.
 *
 * @default 'original'
 * @example
 * ```html
 * <!-- Explicit flavor -->
 * <sando-button flavor="strawberry">Strawberry</sando-button>
 *
 * <!-- Inherited flavor -->
 * <div flavor="dark">
 *   <sando-button>Inherits dark</sando-button>
 * </div>
 * ```
 */
@property({ reflect: true })
flavor = 'original';
```

**Why**: Property documentation helps users understand how to configure components. @default shows the fallback value. @example demonstrates typical usage.

**Reference**: flavorable.ts (lines 79-98), sando-button.ts (lines 80-200)

---

### Rule 3: Private/Internal Documentation with @private (Required)

Private methods and internal properties MUST have JSDoc with @private tag and brief description explaining purpose.

**Pattern**:
```typescript
/**
 * Internal: Brief description of what this private method does.
 *
 * Explain implementation details that aren't relevant to public API
 * but help maintainers understand the code.
 *
 * @private
 * @param param - Parameter description
 * @returns Return value description
 */
private _privateMethod(param: string): ReturnType {
  // Implementation
}

/**
 * Internal: Description of private property.
 * @private
 */
private _internalState: StateType;
```

**Real example from flavorable.ts**:
```typescript
/**
 * Internal: Inherited flavor from ancestor element
 * @private
 */
private _inheritedFlavor?: string;

/**
 * Internal: Whether flavor was explicitly set by user
 * @private
 */
private _hasExplicitFlavor = false;

/**
 * Setup flavor inheritance from ancestor elements
 *
 * Walks up the DOM tree to find the nearest ancestor with a `[flavor]` attribute.
 * If found, stores the inherited flavor value.
 *
 * @private
 */
private _setupFlavorInheritance() {
  // Implementation
}
```

**Why**: Private APIs still need documentation for maintainers. @private tag tells documentation generators to exclude from public API docs. "Internal:" prefix clearly marks non-public code.

**Reference**: flavorable.ts (lines 101-186)

---

### Rule 4: Lifecycle Method Documentation (Required)

Lifecycle methods MUST have JSDoc explaining when they're called and what they do, following standard patterns.

**Pattern**:
```typescript
/**
 * Lifecycle: Called when element is added to DOM
 *
 * Additional setup or initialization logic explanation.
 */
override connectedCallback() {
  super.connectedCallback();
  // Setup code
}

/**
 * Lifecycle: Called when element is removed from DOM
 *
 * Cleanup logic explanation.
 */
override disconnectedCallback() {
  super.disconnectedCallback();
  // Cleanup code
}

/**
 * Lifecycle: Called when properties change
 *
 * Explain which property changes trigger what behavior.
 */
override updated(changedProperties: PropertyValues) {
  super.updated(changedProperties);
  // Update logic
}

/**
 * Lifecycle: Called before first update
 *
 * One-time initialization logic explanation.
 */
override willUpdate(changedProperties: PropertyValues) {
  super.willUpdate(changedProperties);
  // Pre-update logic
}
```

**Real example from flavorable.ts**:
```typescript
/**
 * Lifecycle: Called when element is added to DOM
 * Sets up flavor inheritance from ancestors
 */
override connectedCallback() {
  super.connectedCallback();
  this._setupFlavorInheritance();
}

/**
 * Lifecycle: Called when properties change
 * Updates explicit flags
 */
override updated(changedProperties: PropertyValues) {
  super.updated(changedProperties);

  if (changedProperties.has('flavor')) {
    // Check if flavor was explicitly set via attribute
    this._hasExplicitFlavor = this.hasAttribute('flavor');
  }
}
```

**Why**: Lifecycle methods are critical to component behavior. Standard "Lifecycle:" prefix helps identify them quickly. Clear explanation prevents confusion about execution order.

**Reference**: flavorable.ts (lines 136-156)

---

### Rule 5: Complex Logic Inline Comments (Required)

Complex algorithms, workarounds, or non-obvious code MUST have inline comments explaining the "why" not just the "what".

**Pattern**:
```typescript
// Explain WHY this approach is used, not WHAT the code does
// Good: "Use closure to preserve context in event handler"
// Bad: "Create function that returns function"

// Document workarounds with issue references
// WORKAROUND: Safari bug with Shadow DOM focus (https://bugs.webkit.org/show_bug.cgi?id=12345)

// Explain non-obvious algorithms
// Binary search for performance on large datasets (O(log n) vs O(n))

// Warn about critical behavior
// CRITICAL: Don't modify this.flavor - it removes the attribute
```

**Real example from flavorable.ts**:
```typescript
if (ancestorWithFlavor) {
  const inheritedFlavor = ancestorWithFlavor.getAttribute('flavor');
  if (inheritedFlavor) {
    this._inheritedFlavor = inheritedFlavor;
    // CRITICAL FIX: Don't modify this.flavor - it removes the attribute
    // The effectiveFlavor getter will return the inherited value
    // But the DOM attribute stays empty, allowing CSS inheritance to work
    this._hasExplicitFlavor = false; // Mark as inherited, not explicit
  }
}
```

**Why**: Complex code needs explanation. Future maintainers (including yourself) need to understand WHY decisions were made. Inline comments are for implementation details, JSDoc is for API contracts.

**Reference**: flavorable.ts (lines 175-185)

---

## JSDoc Tag Reference

### Essential Tags

**@param** - Parameter description
```typescript
/**
 * @param name - User's full name
 * @param age - User's age in years
 * @param options - Optional configuration object
 */
function createUser(name: string, age: number, options?: UserOptions) {}
```

**@returns** - Return value description
```typescript
/**
 * @returns The calculated total price including tax
 */
function calculateTotal(): number {}
```

**@throws** - Exceptions thrown
```typescript
/**
 * @throws {ValidationError} When email format is invalid
 * @throws {NetworkError} When API request fails
 */
async function submitForm() {}
```

**@example** - Usage examples
```typescript
/**
 * @example
 * ```typescript
 * const button = new Button();
 * button.variant = 'solid';
 * ```
 */
```

**@default** - Default value
```typescript
/**
 * @default 'medium'
 */
@property()
size: Size = 'medium';
```

**@deprecated** - Deprecated API
```typescript
/**
 * @deprecated Use `newMethod()` instead. Will be removed in v3.0.0.
 */
function oldMethod() {}
```

---

### Advanced Tags

**@private** - Private/internal API
```typescript
/**
 * @private
 */
private _internalMethod() {}
```

**@readonly** - Read-only property
```typescript
/**
 * @readonly
 */
get effectiveFlavor(): string {}
```

**@see** - Cross-reference
```typescript
/**
 * @see {@link FlavorableMixin} for inheritance details
 */
```

**@since** - Version introduced
```typescript
/**
 * @since 2.0.0
 */
export function newFeature() {}
```

**@experimental** - Experimental API
```typescript
/**
 * @experimental This API may change in future releases
 */
export function experimentalFeature() {}
```

---

## TypeScript Type Annotations

### Explicit Return Types (Required)

All functions MUST have explicit return types, even if TypeScript can infer them.

**Pattern**:
```typescript
// ✅ CORRECT: Explicit return type
function calculateTotal(price: number, tax: number): number {
  return price + tax;
}

// ✅ CORRECT: Explicit void
function logMessage(message: string): void {
  console.log(message);
}

// ✅ CORRECT: Explicit Promise
async function fetchData(): Promise<DataType> {
  return await api.get('/data');
}

// ❌ WRONG: Inferred return type
function calculateTotal(price: number, tax: number) {
  return price + tax;
}
```

**Why**: Explicit return types prevent accidental API changes, improve compiler performance, and serve as documentation.

**Reference**: CODE_STYLE.md TypeScript strict mode

---

### Parameter Types (Required)

All function parameters MUST have explicit types.

**Pattern**:
```typescript
// ✅ CORRECT: All parameters typed
function createButton(
  label: string,
  variant: ButtonVariant,
  disabled: boolean = false
): HTMLElement {
  // Implementation
}

// ✅ CORRECT: Destructured parameters with type
function createCard({
  title,
  description,
  actions
}: CardOptions): HTMLElement {
  // Implementation
}

// ❌ WRONG: Implicit any
function createButton(label, variant, disabled) {
  // Implementation
}
```

**Why**: TypeScript strict mode requires explicit types. Parameter types provide IntelliSense and catch errors at compile time.

---

### Type Narrowing Comments

Use comments to explain type narrowing logic.

**Pattern**:
```typescript
function processElement(element: Element | null) {
  // Type guard: Ensure element exists before accessing properties
  if (!element) {
    return;
  }

  // TypeScript now knows element is non-null
  console.log(element.tagName);

  // Type guard: Check if element is HTMLInputElement
  if (element instanceof HTMLInputElement) {
    // TypeScript now knows element has value property
    console.log(element.value);
  }
}
```

**Real example from flavorable.ts**:
```typescript
while (current) {
  // Check if current node is an Element and has flavor attribute
  if (current instanceof Element && current.hasAttribute('flavor')) {
    return current;
  }

  // Move to parent (handles both regular DOM and Shadow DOM)
  if (current instanceof ShadowRoot) {
    current = current.host;
  } else if (current instanceof Element) {
    current = current.parentNode;
  } else {
    break;
  }
}
```

**Why**: Type narrowing logic can be confusing. Comments explain the intent behind type guards and instanceof checks.

**Reference**: flavorable.ts (lines 197-217)

---

## Documentation Patterns

### File Header Documentation

Every file SHOULD start with a JSDoc comment explaining the file's purpose.

**Pattern**:
```typescript
/**
 * Component Name / Module Name
 *
 * Brief description of what this file contains and its purpose
 * in the design system architecture.
 *
 * @module path/to/module
 */

import statements...
```

**Real example from flavorable.ts**:
```typescript
/**
 * Flavorable Mixin
 *
 * Adds flavor inheritance functionality to Sando Web Components.
 * This mixin enables components to inherit flavor from ancestor elements,
 * implementing the core "flavor philosophy" of the Sando Design System.
 *
 * @example
 * ```typescript
 * import { LitElement } from 'lit';
 * import { customElement } from 'lit/decorators.js';
 * import { FlavorableMixin } from '../../mixins/flavorable.js';
 *
 * @customElement('my-component')
 * export class MyComponent extends FlavorableMixin(LitElement) {
 *   // Component automatically has flavor property and inheritance
 * }
 * ```
 */
```

**Why**: File headers provide high-level context. New developers can understand a file's purpose without reading implementation.

**Reference**: flavorable.ts (lines 1-37)

---

### Interface and Type Documentation

All exported interfaces and types MUST have JSDoc with property descriptions.

**Pattern**:
```typescript
/**
 * Interface description explaining what this represents.
 *
 * @example
 * ```typescript
 * const config: InterfaceName = {
 *   property1: 'value',
 *   property2: true
 * };
 * ```
 */
export interface InterfaceName {
  /**
   * Description of property1
   * @default 'defaultValue'
   */
  property1: string;

  /**
   * Description of property2
   */
  property2: boolean;

  /**
   * Optional property description
   */
  property3?: number;
}

/**
 * Type description explaining allowed values and usage.
 *
 * - `value1`: Description of what this value means
 * - `value2`: Description of what this value means
 *
 * @example
 * ```typescript
 * const myValue: TypeName = 'value1';
 * ```
 */
export type TypeName = 'value1' | 'value2' | 'value3';
```

**Real example from flavorable.ts**:
```typescript
/**
 * Interface for Flavorable components
 */
export interface FlavorableInterface {
  /**
   * Design system flavor/theme
   * @default 'original'
   */
  flavor: string;

  /**
   * Get the effective flavor (explicit or inherited)
   */
  readonly effectiveFlavor: string;
}

/**
 * Type helper for components using FlavorableMixin
 *
 * @example
 * ```typescript
 * export class MyButton extends FlavorableMixin(LitElement) {
 *   // TypeScript knows about flavor property and effectiveFlavor getter
 * }
 *
 * // Type assertion helper
 * const button = document.querySelector('my-button') as Flavorable<MyButton>;
 * console.log(button.effectiveFlavor);
 * ```
 */
export type Flavorable<T = LitElement> = T & FlavorableInterface;
```

**Why**: Interfaces are contracts. Every property needs explanation. Examples show typical usage patterns.

**Reference**: flavorable.ts (lines 42-61, 244-258)

---

### Build Script Documentation (JavaScript)

Build scripts (JavaScript/Node.js) MUST use JSDoc with type hints for IDE support.

**Pattern**:
```javascript
/**
 * Function description
 *
 * @param {Object} options - Options object
 * @param {string} options.name - Option description
 * @param {boolean} [options.verbose] - Optional option (note square brackets)
 * @returns {Promise<Object>} Return value description
 */
export async function buildFunction(options) {
  const { name, verbose = false } = options;
  // Implementation
}

/**
 * @typedef {Object} ConfigType
 * @property {string} name - Config property
 * @property {number} value - Config value
 */

/**
 * Function using typedef
 * @param {ConfigType} config - Configuration object
 * @returns {boolean} Success status
 */
export function processConfig(config) {
  // Implementation
}
```

**Real example from orchestrator.js**:
```javascript
/**
 * Build all token layers
 * @param {Object} options - Build options
 * @param {Array} options.layers - Layer configurations
 * @param {boolean} options.force - Force rebuild ignoring cache
 * @param {boolean} options.verbose - Show verbose output
 * @returns {Promise<Object>} Build results for all layers
 */
export async function buildAllLayers(options) {
  const { layers, force = false, verbose = false } = options;
  // Implementation
}

/**
 * Validate build results
 * @param {Object} results - Build results from all layers
 * @returns {boolean} True if all builds succeeded
 */
export function validateBuildResults(results) {
  return Object.values(results).every(result => result.success);
}
```

**Why**: JavaScript lacks TypeScript's type system. JSDoc provides type hints for IDEs and documents parameter shapes.

**Reference**: orchestrator.js (lines 11-64)

---

## Inline Comment Best Practices

### When to Comment

**✅ DO comment**:
- Complex algorithms or logic
- Workarounds for bugs or browser issues
- Performance optimizations
- Non-obvious behavior or side effects
- Critical code that must not be changed without understanding
- TODO items with issue references

**❌ DON'T comment**:
- Obvious code (let x = 5; // Set x to 5)
- Repeating what code does without explaining why
- Code that can be improved to be self-explanatory
- Commented-out code (delete it instead)

---

### Comment Style

**Good comments explain WHY**:
```typescript
// Use MutationObserver for performance (faster than polling)
const observer = new MutationObserver(callback);

// Debounce to prevent excessive API calls
const debouncedSearch = debounce(searchFunction, 300);

// Cache result for repeat queries (60% perf improvement in tests)
const cachedData = memoize(expensiveFunction);
```

**Bad comments explain WHAT** (code already shows this):
```typescript
// Create observer
const observer = new MutationObserver(callback);

// Call debounce function
const debouncedSearch = debounce(searchFunction, 300);

// Memoize the function
const cachedData = memoize(expensiveFunction);
```

---

### TODO Comments

Use TODO comments with issue references:

```typescript
// TODO(#123): Implement keyboard navigation for nested menus
// FIXME(#456): Safari focus bug when dialog opens
// HACK: Workaround for IE11 Promise support - remove when IE11 dropped
// NOTE: This approach is temporary until Web Components v2 ships
```

**Format**: `KEYWORD(issue-ref): Description`
- **TODO**: Feature to implement
- **FIXME**: Known bug to fix
- **HACK**: Temporary workaround
- **NOTE**: Important context

---

## Validation Checklist

### Public API Documentation

- [ ] All exported functions have JSDoc
- [ ] All exported classes have JSDoc
- [ ] All public methods have JSDoc
- [ ] All @property decorators have JSDoc with @default
- [ ] Complex properties have @example
- [ ] JSDoc includes @param for all parameters
- [ ] JSDoc includes @returns for non-void returns
- [ ] JSDoc includes @throws for exceptions

### Type Annotations

- [ ] All function parameters have explicit types
- [ ] All functions have explicit return types
- [ ] No implicit `any` types (TypeScript strict mode)
- [ ] Type narrowing logic is commented
- [ ] Complex types have JSDoc explanations

### Private/Internal Code

- [ ] Private methods have JSDoc with @private
- [ ] Private properties have "Internal:" prefix
- [ ] Lifecycle methods have "Lifecycle:" prefix
- [ ] Complex internal logic has inline comments

### Code Quality

- [ ] Comments explain WHY not WHAT
- [ ] No commented-out code
- [ ] TODO comments have issue references
- [ ] Examples in JSDoc are tested and working
- [ ] File header explains module purpose

---

## Related Guidelines

- [API_REFERENCE.md](./API_REFERENCE.md) - External API documentation format
- [CODE_STYLE.md](../03-development/CODE_STYLE.md) - TypeScript and code organization
- [NAMING_CONVENTIONS.md](../03-development/NAMING_CONVENTIONS.md) - Variable and type naming

---

## External References

**JSDoc**:
- [JSDoc Official](https://jsdoc.app/) - Complete tag reference
- [TypeScript JSDoc](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) - JSDoc in TypeScript

**TypeScript**:
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) - Type system guide
- [Strict Mode](https://www.typescriptlang.org/tsconfig#strict) - Strict compiler options

**Best Practices**:
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) - Documentation standards
- [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) - Chapter on comments

---

## Changelog

### 1.0.0 (2025-11-03)
- Initial guideline creation
- 5 Core Rules: public API JSDoc, property JSDoc with @default, private documentation with @private, lifecycle method docs, complex logic inline comments
- JSDoc tag reference: essential tags (@param, @returns, @throws, @example, @default, @deprecated) and advanced tags (@private, @readonly, @see, @since, @experimental)
- TypeScript type annotations: explicit return types, parameter types, type narrowing comments
- Documentation patterns: file headers, interface/type docs, build script docs (JavaScript)
- Inline comment best practices: when to comment, comment style (WHY not WHAT), TODO format
- Validation checklist: public API, type annotations, private/internal, code quality
- References to flavorable.ts (lines 1-259), orchestrator.js (lines 11-64), sando-button.ts
- Agent-optimized format (500 lines)

---

**Code is read more often than it's written. Invest in documentation that helps future readers (including yourself) understand the code quickly.**
