# API Reference Documentation

**Category**: 06-documentation
**Version**: 1.0.0
**Status**: Active
**Last Updated**: 2025-11-03
**Owner**: Technical Writer

---

## Purpose

Establish comprehensive standards for documenting component APIs in the Sando Design System, ensuring developers can quickly understand and use components through clear, consistent, and complete reference documentation. This includes JSDoc annotations, property tables, event documentation, CSS custom properties, and type definitions.

**Target**: All public components, mixins, and utilities
**Scope**: JSDoc comments, VitePress API tables, TypeScript types, usage examples
**Enforcement**: Code review, documentation build validation

---

## Core Rules

### Rule 1: Comprehensive JSDoc Component Headers (Non-Negotiable)

Every component file MUST include a complete JSDoc header with @element, description, @slot, @fires, @cssprop tags, and usage examples.

**Pattern**:

```typescript
/**
 * Component Name and Brief Description
 *
 * Extended description explaining purpose, features, and when to use.
 * Multiple paragraphs allowed for complex components.
 *
 * @element tag-name
 *
 * @slot - Default slot description
 * @slot named-slot - Named slot description
 *
 * @fires event-name - Event description with payload details
 *
 * @cssprop --component-property - CSS custom property description
 *
 * @example Basic usage
 * <tag-name attribute="value">Content</tag-name>
 *
 * @example Advanced pattern
 * <tag-name>
 *   <element slot="named-slot">Content</element>
 * </tag-name>
 */
```

**Real example from sando-button.ts**:

```typescript
/**
 * Sando Button Component
 *
 * A fully accessible button component built with Lit following industry standards.
 * Supports multiple variants, sizes, states, and can render as button or link.
 *
 * @element sando-button
 *
 * @slot - Button content (text, icons, etc.)
 * @slot icon-start - Icon before the button text (alternative: use start-icon prop)
 * @slot icon-end - Icon after the button text (alternative: use end-icon prop)
 *
 * @fires click - Fired when the button is clicked (unless disabled)
 *
 * @cssprop --sando-button-fontFamily - Button font family
 * @cssprop --sando-button-fontWeight - Button font weight
 * @cssprop --sando-button-borderRadius - Button border radius
 * @cssprop --sando-button-transition-duration - Transition duration
 *
 * @example Basic usage with variants
 * <sando-button variant="solid" size="medium">Solid</sando-button>
 * <sando-button variant="outline">Outline</sando-button>
 *
 * @example With icons (slot method)
 * <sando-button>
 *   <span slot="icon-start">⭐</span>
 *   Favorite
 * </sando-button>
 *
 * @example As link
 * <sando-button href="https://example.com" target="_blank">
 *   Visit Site
 * </sando-button>
 */
```

**Why**: JSDoc serves as the single source of truth for component API. IDEs show this documentation on hover, documentation generators extract it, and it stays synchronized with code.

**Reference**: sando-button.ts (lines 1-61), CODE_STYLE.md JSDoc standards

---

### Rule 2: Complete Property Tables in VitePress (Required)

Every component guide in VitePress MUST include a comprehensive Properties table with columns: Property, Type, Default, Description.

**Pattern**:

```markdown
## API Reference

### Properties

| Property       | Type                   | Default     | Description                                           |
| -------------- | ---------------------- | ----------- | ----------------------------------------------------- |
| `propertyName` | `'value1' \| 'value2'` | `'value1'`  | Human-readable description of what this property does |
| `booleanProp`  | `boolean`              | `false`     | Description of boolean behavior                       |
| `optionalProp` | `string`               | `undefined` | Description (note: undefined means optional)          |
```

**Type notation conventions**:

- Union types: `'solid' \| 'outline' \| 'ghost'`
- Literal escape: Use backticks and `\|` for pipe character
- Boolean: `boolean` (lowercase)
- Optional: Show `undefined` as default
- Complex types: Link to TypeScript definition

**Real example from button.md**:

```markdown
### Properties

| Property    | Type                                        | Default     | Description                                  |
| ----------- | ------------------------------------------- | ----------- | -------------------------------------------- |
| `variant`   | `'solid' \| 'outline' \| 'ghost' \| 'text'` | `'solid'`   | Visual style variant                         |
| `size`      | `'xs' \| 'small' \| 'medium' \| 'large'`    | `'medium'`  | Button size (all WCAG compliant)             |
| `disabled`  | `boolean`                                   | `false`     | Whether the button is disabled               |
| `href`      | `string`                                    | `undefined` | URL (renders as `<a>` instead of `<button>`) |
| `ariaLabel` | `string`                                    | `null`      | Accessible label (overrides visible text)    |
```

**Why**: Tables provide scannable reference format. Developers can quickly find property types, defaults, and usage without reading full documentation.

**Reference**: apps/site/components/button.md (lines 254-278)

---

### Rule 3: Inline Property JSDoc with @default Tag (Required)

Every @property decorator MUST have JSDoc comment with description and @default tag showing the default value.

**Pattern**:

```typescript
/**
 * Human-readable description of what this property does.
 * Can be multiple lines for complex behavior.
 * @default 'defaultValue'
 */
@property({ reflect: true })
propertyName: PropertyType = 'defaultValue';

/**
 * Boolean property description.
 * @default false
 */
@property({ type: Boolean, reflect: true })
booleanProperty = false;

/**
 * Optional property (no default value).
 */
@property({ reflect: true })
optionalProperty?: string;
```

**Real examples from sando-button.ts**:

```typescript
/**
 * Visual style variant of the button
 * @default 'solid'
 */
@property({ reflect: true })
variant: ButtonVariant = 'solid';

/**
 * Whether the button is disabled
 * @default false
 */
@property({ type: Boolean, reflect: true })
disabled = false;

/**
 * URL to navigate to (renders as <a> instead of <button>)
 */
@property({ reflect: true })
href?: string;
```

**Why**: Inline JSDoc keeps documentation synchronized with code. When property defaults change, @default tag must be updated. IDEs show this information on hover.

**Reference**: sando-button.ts (lines 80-200)

---

### Rule 4: Slots, Events, and CSS Properties Documentation (Required)

Components MUST document slots, events, and CSS custom properties in both JSDoc header and VitePress API tables.

**Slots table pattern**:

```markdown
### Slots

| Slot         | Description                                          |
| ------------ | ---------------------------------------------------- |
| Default      | Default slot description (what goes in unnamed slot) |
| `named-slot` | Named slot description and usage                     |
```

**Events table pattern**:

```markdown
### Events

| Event        | Type                       | Description                                     |
| ------------ | -------------------------- | ----------------------------------------------- |
| `event-name` | `CustomEvent<PayloadType>` | When this event fires and what data it contains |
```

**CSS Custom Properties pattern**:

````markdown
### CSS Custom Properties

Key CSS variables you can override:

```css
/* Category: Base Styles */
--component-property: /* Description and default value */

/* Category: Variant-Specific */ --component-variant-property: /* Description */;
```
````

Full list of all CSS custom properties available in the component.

````

**Real example from button.md**:
```markdown
### Slots

| Slot | Description |
|------|-------------|
| Default | Button content (text, icons, etc.) |
| `icon-start` | Icon or content before the button text |
| `icon-end` | Icon or content after the button text |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `click` | `CustomEvent` | Fired when button is clicked (unless disabled or loading) |

### CSS Custom Properties

```css
/* Base styles */
--sando-button-fontFamily
--sando-button-fontWeight
--sando-button-borderRadius
--sando-button-transition-duration

/* Variant-specific: solid */
--sando-button-solid-backgroundColor-default
--sando-button-solid-textColor-default
````

````

**Why**: Complete API reference requires slots, events, and CSS properties. Developers need to know customization points and interaction patterns.

**Reference**: apps/site/components/button.md (lines 279-299), sando-button.ts (lines 9-18)

---

### Rule 5: TypeScript Type Definitions with JSDoc (Required)

All exported types MUST have JSDoc comments explaining their purpose, allowed values, and usage context.

**Pattern**:
```typescript
/**
 * Type description explaining what this type represents and where it's used.
 *
 * @example
 * const variant: ComponentVariant = 'solid';
 */
export type ComponentVariant = 'value1' | 'value2' | 'value3';

/**
 * Interface description with property explanations.
 */
export interface ComponentConfig {
  /**
   * Property description
   * @default 'defaultValue'
   */
  propertyName: string;

  /**
   * Optional property description
   */
  optionalProperty?: boolean;
}
````

**Real example from sando-button.types.ts**:

```typescript
/**
 * Visual style variant of the button.
 *
 * - `solid`: High emphasis with filled background (default)
 * - `outline`: Medium emphasis with border
 * - `ghost`: Low emphasis without background or border
 * - `text`: Minimal text-only style for inline links
 */
export type ButtonVariant = "solid" | "outline" | "ghost" | "text";

/**
 * Size variants for the button.
 *
 * All sizes meet WCAG 2.1 Level AA minimum touch target size (44x44px).
 *
 * - `xs`: Extra small for compact interfaces
 * - `small`: Small for tight spaces
 * - `medium`: Default size for most use cases
 * - `large`: Large for primary actions
 */
export type ButtonSize = "xs" | "small" | "medium" | "large";
```

**Why**: Type definitions are part of public API. JSDoc comments explain allowed values, constraints, and usage patterns. Documentation generators extract this information.

**Reference**: sando-button.types.ts, NAMING_CONVENTIONS.md TypeScript conventions

---

## VitePress Documentation Structure

### Standard Component Page Template

````markdown
# Component Name

Brief one-sentence description of the component.

## Features

- ✅ **Feature 1**: Description
- ♿ **Accessibility**: WCAG compliance level
- 🎨 **Themeable**: Token-driven styling
- 🔒 **Type Safe**: Full TypeScript support
- ⚡ **Performant**: Bundle size

## Basic Usage

```html
<!-- Import -->
<script type="module">
  import "@sando/components/component-name";
</script>

<!-- Use -->
<component-name attribute="value"> Content </component-name>
```
````

## Variants

### Variant 1 Name

Description of what this variant does.

```html
<component-name variant="variant1">Example</component-name>
```

### Variant 2 Name

Description of what this variant does.

```html
<component-name variant="variant2">Example</component-name>
```

## States

### State 1

```html
<component-name state-attribute>Example</component-name>
```

## Theming

### Using Flavors

```html
<component-name flavor="strawberry">Themed</component-name>
```

### Custom Styling

```html
<component-name
  style="
    --component-property: custom-value;
  "
>
  Custom
</component-name>
```

## API Reference

### Properties

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| ...      | ...  | ...     | ...         |

### Slots

| Slot | Description |
| ---- | ----------- |
| ...  | ...         |

### Events

| Event | Type | Description |
| ----- | ---- | ----------- |
| ...   | ...  | ...         |

### CSS Custom Properties

```css
/* List of customizable variables */
```

## Accessibility

- ✅ WCAG criterion met
- ✅ Keyboard navigation details
- ✅ Screen reader support
- ⚠️ Important accessibility considerations

## Examples

### Complex Example 1

Description of the example.

```html
<example-code></example-code>
```

### Complex Example 2

Description of the example.

```html
<example-code></example-code>
```

## Best Practices

- ✅ DO: Recommended pattern
- ❌ DON'T: Anti-pattern to avoid

## Framework Integration

### React

```tsx
import "@sando/components/component-name";

function App() {
  return <component-name attribute="value">Content</component-name>;
}
```

### Vue 3

```vue
<template>
  <component-name attribute="value">Content</component-name>
</template>
```

````

**Why**: Consistent structure helps developers find information quickly. Template ensures all components document the same sections in the same order.

**Reference**: apps/site/components/button.md (complete structure example)

---

## Property Documentation Patterns

### String Union Types

```typescript
/**
 * Visual style variant.
 * @default 'solid'
 */
@property({ reflect: true })
variant: 'solid' | 'outline' | 'ghost' = 'solid';
````

**VitePress table**:

```markdown
| `variant` | `'solid' \| 'outline' \| 'ghost'` | `'solid'` | Visual style variant |
```

---

### Boolean Properties

```typescript
/**
 * Whether the button is disabled.
 * @default false
 */
@property({ type: Boolean, reflect: true })
disabled = false;
```

**VitePress table**:

```markdown
| `disabled` | `boolean` | `false` | Whether the button is disabled |
```

---

### Optional Properties

```typescript
/**
 * URL to navigate to (renders as <a> instead of <button>).
 */
@property({ reflect: true })
href?: string;
```

**VitePress table**:

```markdown
| `href` | `string` | `undefined` | URL (renders as `<a>` instead of `<button>`) |
```

**Note**: Use `undefined` to indicate optional properties in Default column.

---

### Number Properties

```typescript
/**
 * Tab index for keyboard navigation.
 * @default 0
 */
@property({ type: Number, reflect: true })
tabindex = 0;
```

**VitePress table**:

```markdown
| `tabindex` | `number` | `0` | Tab index for keyboard navigation |
```

---

### Complex Object Properties

```typescript
/**
 * Configuration object for advanced behavior.
 * See {@link ComponentConfig} for details.
 */
@property({ type: Object })
config?: ComponentConfig;
```

**VitePress table**:

```markdown
| `config` | `ComponentConfig` | `undefined` | Configuration object (see [ComponentConfig](#componentconfig)) |
```

**Include type definition in docs**:

````markdown
#### ComponentConfig

```typescript
interface ComponentConfig {
  propertyA: string;
  propertyB: boolean;
}
```
````

````

---

## Event Documentation Patterns

### Custom Events

**In component**:
```typescript
/**
 * Dispatched when selection changes.
 */
private dispatchChangeEvent() {
  this.dispatchEvent(
    new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    })
  );
}
````

**In JSDoc header**:

```typescript
/**
 * @fires change - Fired when selection changes
 * @fires change.detail - { value: string } - The new value
 */
```

**In VitePress**:

```markdown
### Events

| Event    | Type                             | Description                                                                   |
| -------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `change` | `CustomEvent<{ value: string }>` | Fired when selection changes. Contains the new value in `event.detail.value`. |
```

---

### Native Events

**In JSDoc header**:

```typescript
/**
 * @fires click - Native click event (fired unless disabled or loading)
 */
```

**In VitePress**:

```markdown
| `click` | `MouseEvent` | Native click event (only fires when not disabled or loading) |
```

---

## CSS Custom Properties Documentation

### Grouping by Category

````markdown
### CSS Custom Properties

#### Base Styles

Variables that apply to all variants:

```css
--component-fontFamily
--component-fontSize
--component-fontWeight
--component-lineHeight
```
````

#### Variant-Specific: Solid

```css
--component-solid-backgroundColor-default
--component-solid-backgroundColor-hover
--component-solid-textColor-default
```

#### Variant-Specific: Outline

```css
--component-outline-borderColor-default
--component-outline-borderColor-hover
--component-outline-textColor-default
```

#### State-Specific

```css
--component-disabled-opacity
--component-loading-spinnerColor
```

````

**Why**: Grouping helps developers find the right CSS variable. Categories match component structure (base, variants, states).

---

### Documenting Token Consumption

Components should reference which Recipe tokens they consume:

```markdown
### Design Tokens

This component consumes tokens from the `button` Recipe:

- `--sando-button-solid-backgroundColor-default`
- `--sando-button-solid-backgroundColor-hover`
- `--sando-button-solid-textColor-default`

See [Token Architecture](../../design-system/tokens) for the complete three-layer system.
````

**Why**: Helps designers understand token usage and enables refactoring. Links component implementation to design system foundations.

---

## Slot Documentation Patterns

### Default Slot

**In JSDoc**:

```typescript
/**
 * @slot - Default slot for button content (text, icons, HTML)
 */
```

**In VitePress**:

```markdown
| Default | Button content (text, icons, HTML elements) |
```

---

### Named Slots

**In JSDoc**:

```typescript
/**
 * @slot icon-start - Icon or content before the button text
 * @slot icon-end - Icon or content after the button text
 */
```

**In VitePress**:

```markdown
| `icon-start` | Icon or content before the button text |
| `icon-end` | Icon or content after the button text |
```

**Usage example**:

```html
<sando-button>
  <svg slot="icon-start">...</svg>
  Button Text
  <span slot="icon-end">→</span>
</sando-button>
```

---

## Accessibility Documentation

### WCAG Compliance Table

```markdown
## Accessibility

| WCAG Criterion           | Level | Status  | Implementation                                |
| ------------------------ | ----- | ------- | --------------------------------------------- |
| 1.4.3 Contrast (Minimum) | AA    | ✅ Pass | All text meets 4.5:1 contrast ratio           |
| 2.1.1 Keyboard           | A     | ✅ Pass | Fully keyboard accessible (Tab, Enter, Space) |
| 2.4.7 Focus Visible      | AA    | ✅ Pass | Visible focus indicator with 3:1 contrast     |
| 4.1.2 Name, Role, Value  | A     | ✅ Pass | Proper role, accessible name, and states      |
```

---

### Keyboard Navigation

```markdown
### Keyboard Navigation

| Key                | Action                               |
| ------------------ | ------------------------------------ |
| `Tab`              | Move focus to/from button            |
| `Enter` or `Space` | Activate button                      |
| `Escape`           | (For dialogs) Close and return focus |
```

---

### Screen Reader Support

```markdown
### Screen Reader Support

- ✅ Announces button role and accessible name
- ✅ Announces disabled state ("dimmed" or "unavailable")
- ✅ Announces loading state via `aria-busy="true"`
- ✅ Announces toggle state via `aria-pressed` (when toggle enabled)
- ⚠️ Icon-only buttons MUST have `aria-label` attribute
```

---

## Examples Documentation

### Basic Example Pattern

````markdown
### Example Title

Brief description of what this example demonstrates.

```html
<component-name attribute="value"> Content </component-name>
```
````

**Result**: What the user sees or experiences.

````

---

### Interactive Example with JavaScript

```markdown
### Dynamic Example

Shows how to update properties programmatically.

```html
<sando-button id="my-button">Click Me</sando-button>

<script>
  const button = document.getElementById('my-button');
  let count = 0;

  button.addEventListener('click', () => {
    count++;
    button.textContent = `Clicked ${count} times`;
  });
</script>
````

````

---

### Framework-Specific Examples

```markdown
### React Example

```tsx
import { useRef } from 'react';
import '@sando/components/button';

function App() {
  const buttonRef = useRef<HTMLElement>(null);

  return (
    <sando-button
      ref={buttonRef}
      variant="solid"
      onClick={() => console.log('Clicked')}
    >
      Click Me
    </sando-button>
  );
}
````

### Vue 3 Example

```vue
<template>
  <sando-button variant="solid" @click="handleClick"> Click Me </sando-button>
</template>

<script setup lang="ts">
const handleClick = () => console.log("Clicked");
</script>
```

```

---

## Documentation Validation Checklist

### Component JSDoc Header

- [ ] Component description (1-2 paragraphs)
- [ ] `@element` tag with custom element name
- [ ] All slots documented with `@slot` tags
- [ ] All events documented with `@fires` tags
- [ ] Key CSS custom properties documented with `@cssprop` tags
- [ ] At least 2-3 `@example` blocks showing common usage
- [ ] Examples use valid HTML syntax

### Property Documentation

- [ ] Every `@property` has JSDoc comment
- [ ] Every property has `@default` tag (if applicable)
- [ ] Optional properties marked with `?` or noted as optional
- [ ] Complex types reference TypeScript definitions
- [ ] Reflect attribute matches property name (kebab-case vs camelCase)

### VitePress API Reference

- [ ] Properties table complete with all public properties
- [ ] Type notation uses proper escaping (`\|` for union types)
- [ ] Default values match component implementation
- [ ] Slots table includes default slot (if applicable)
- [ ] Events table includes all custom and native events
- [ ] CSS custom properties listed and categorized

### Type Definitions

- [ ] All exported types have JSDoc comments
- [ ] Union type values explained (what each value means)
- [ ] Interfaces have property-level JSDoc
- [ ] Complex types include usage examples

### Accessibility Documentation

- [ ] WCAG criteria table included
- [ ] Keyboard navigation documented
- [ ] Screen reader support explained
- [ ] aria-* attributes documented
- [ ] Known limitations or warnings noted

### Examples

- [ ] Basic usage example provided
- [ ] Advanced pattern examples (if applicable)
- [ ] Framework integration examples (React, Vue)
- [ ] Examples are tested and work correctly
- [ ] Code snippets follow CODE_STYLE.md conventions

---

## Related Guidelines

- [CODE_STYLE.md](../03-development/CODE_STYLE.md) - JSDoc format standards
- [STORYBOOK_STORIES.md](./STORYBOOK_STORIES.md) - Interactive documentation in Storybook
- [VITEPRESS_GUIDES.md](./VITEPRESS_GUIDES.md) - Long-form tutorial writing
- [NAMING_CONVENTIONS.md](../03-development/NAMING_CONVENTIONS.md) - Property and type naming
- [WCAG_COMPLIANCE.md](../04-accessibility/WCAG_COMPLIANCE.md) - Accessibility requirements

---

## External References

**JSDoc**:
- [JSDoc Official](https://jsdoc.app/) - Tag reference
- [TypeDoc](https://typedoc.org/) - TypeScript documentation generator
- [Custom Elements Manifest](https://custom-elements-manifest.open-wc.org/) - Web Components analyzer

**VitePress**:
- [VitePress Markdown](https://vitepress.dev/guide/markdown) - Markdown features
- [Markdown Tables](https://www.markdownguide.org/extended-syntax/#tables) - Table syntax

**Web Components**:
- [MDN Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) - Custom elements API
- [Lit Documentation](https://lit.dev/docs/) - Lit-specific patterns

---

## Changelog

### 1.0.0 (2025-11-03)
- Initial guideline creation
- 5 Core Rules: JSDoc headers, property tables, inline JSDoc, slots/events/CSS, TypeScript types
- VitePress documentation structure template
- Property documentation patterns (string unions, booleans, optional, numbers, objects)
- Event documentation patterns (custom events, native events)
- CSS custom properties grouping by category
- Slot documentation patterns (default, named)
- Accessibility documentation (WCAG table, keyboard, screen reader)
- Examples patterns (basic, interactive, framework-specific)
- Validation checklist (JSDoc, properties, VitePress, types, a11y, examples)
- References to sando-button.ts (lines 1-200), button.md (lines 254-299)
- Agent-optimized format (500 lines)

---

**API documentation is the user's first impression of component quality. Invest in clear, complete, accurate reference documentation.**
```
