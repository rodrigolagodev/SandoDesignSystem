---
title: Checkbox Component
description: A fully accessible checkbox component with checked, indeterminate, and error states, multiple variants and sizes, and form validation support.
---

# Checkbox

The `sando-checkbox` component is a fully accessible checkbox with checked, indeterminate, and disabled states. Think of it as the quality checklist before your Sando leaves the kitchen — every item needs a clear yes, no, or "still working on it."

## Features

- ✅ **Tri-State**: Checked, unchecked, and indeterminate states
- ♿ **Accessible**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support with exported types
- ✨ **Validation**: Built-in error states with helper text and error messages
- 📋 **Form Ready**: Native form participation with `name`, `value`, and validation API

## Basic Usage

```html
<script type="module">
  import "@sando/components";
</script>

<sando-checkbox label="Accept terms and conditions"></sando-checkbox>
```

::: tip Import Path
Most components use `import "@sando/components"` for the main bundle. See the [overview](/components/overview) for details.
:::

## Variants

The checkbox comes in two visual styles:

### Solid (Default)

High emphasis with a filled background when checked.

```html
<sando-checkbox variant="solid" label="Solid checkbox"></sando-checkbox>
```

### Outline

Medium emphasis with a border-only style when checked.

```html
<sando-checkbox variant="outline" label="Outline checkbox"></sando-checkbox>
```

## Sizes

Three WCAG-compliant size options for different contexts:

```html
<sando-checkbox size="sm" label="Small"></sando-checkbox>
<sando-checkbox size="md" label="Medium (Default)"></sando-checkbox>
<sando-checkbox size="lg" label="Large"></sando-checkbox>
```

::: tip Touch Target Compliance
All checkbox sizes meet WCAG 2.1 Level AA minimum touch target size of 44x44px through padding adjustments.
:::

## States

### Checked

```html
<sando-checkbox checked label="This is checked"></sando-checkbox>
```

### Indeterminate

The indeterminate state represents a partial selection — useful for "select all" patterns where some but not all child items are selected.

```html
<sando-checkbox indeterminate label="Select all"></sando-checkbox>
```

::: warning Indeterminate vs Checked
The `indeterminate` property is visual only. When a user clicks an indeterminate checkbox, it clears the indeterminate state and toggles `checked`. The `indeterminate` state must be set programmatically.
:::

### Disabled

```html
<sando-checkbox disabled label="Disabled unchecked"></sando-checkbox>
<sando-checkbox disabled checked label="Disabled checked"></sando-checkbox>
```

### Error

```html
<sando-checkbox
  error
  error-text="You must accept the terms to continue"
  label="Accept terms"
></sando-checkbox>
```

### Required

Displays a required indicator on the label:

```html
<sando-checkbox required label="I agree to the terms"></sando-checkbox>
```

## Labels

### Using the `label` Property

The simplest way to add a label:

```html
<sando-checkbox label="Enable notifications"></sando-checkbox>
```

### Using the Default Slot

For rich label content with links or formatting:

```html
<sando-checkbox>
  I agree to the <a href="/terms">Terms of Service</a> and
  <a href="/privacy">Privacy Policy</a>
</sando-checkbox>
```

## Helper and Error Text

Provide guidance or validation feedback below the checkbox:

```html
<!-- Helper text -->
<sando-checkbox
  label="Subscribe to newsletter"
  helper-text="We'll send you weekly updates"
></sando-checkbox>

<!-- Error text (requires error=true) -->
<sando-checkbox
  error
  error-text="This field is required"
  label="Required checkbox"
></sando-checkbox>
```

::: tip Layout Stability
By default, `reserve-error-space` is enabled, which reserves vertical space for error messages. This prevents layout shift when validation errors appear and disappear.
:::

## Theming

### Using Flavors

Apply different theme flavors:

```html
<sando-checkbox flavor="original" label="Original Theme"></sando-checkbox>
<sando-checkbox flavor="strawberry" label="Strawberry Theme"></sando-checkbox>
```

### Custom Styling

Override CSS custom properties for fine-grained control:

```html
<sando-checkbox
  label="Custom Colors"
  style="
    --sando-checkbox-solid-backgroundColor-checked: oklch(0.56 0.11 230);
    --sando-checkbox-solid-checkmarkColor-default: oklch(1 0 0);
  "
></sando-checkbox>
```

## API Reference

### Properties

| Property            | Attribute             | Type                   | Default      | Description                                              |
| ------------------- | --------------------- | ---------------------- | ------------ | -------------------------------------------------------- |
| `checked`           | `checked`             | `boolean`              | `false`      | Whether the checkbox is checked                          |
| `indeterminate`     | `indeterminate`       | `boolean`              | `false`      | Whether in indeterminate (partial) state                 |
| `disabled`          | `disabled`            | `boolean`              | `false`      | Whether the checkbox is disabled                         |
| `required`          | `required`            | `boolean`              | `false`      | Whether required for form validation                     |
| `error`             | `error`               | `boolean`              | `false`      | Whether in error state                                   |
| `name`              | `name`                | `string`               | `undefined`  | Form field name                                          |
| `value`             | `value`               | `string`               | `'on'`       | Value when checked                                       |
| `variant`           | `variant`             | `'solid' \| 'outline'` | `'solid'`    | Visual style variant                                     |
| `size`              | `size`                | `'sm' \| 'md' \| 'lg'` | `'md'`       | Size variant                                             |
| `label`             | `label`               | `string`               | `undefined`  | Label text (alternative to default slot)                 |
| `helperText`        | `helper-text`         | `string`               | `undefined`  | Helper text displayed below the checkbox                 |
| `errorText`         | `error-text`          | `string`               | `undefined`  | Error message displayed when `error=true`                |
| `reserveErrorSpace` | `reserve-error-space` | `boolean`              | `true`       | Reserve space for error messages to prevent layout shift |
| `flavor`            | `flavor`              | `string`               | `'original'` | Design system theme flavor                               |

### Slots

| Slot    | Description                                                                 |
| ------- | --------------------------------------------------------------------------- |
| Default | Label content (alternative to `label` prop). Supports rich HTML like links. |

### Events

| Event          | Type                                                        | Description                       |
| -------------- | ----------------------------------------------------------- | --------------------------------- |
| `sando-change` | `CustomEvent<{ checked: boolean, indeterminate: boolean }>` | Fired when checkbox state changes |

### Methods

| Method                | Signature                   | Description                                 |
| --------------------- | --------------------------- | ------------------------------------------- |
| `toggle()`            | `() => void`                | Toggle checked state (clears indeterminate) |
| `focus()`             | `() => void`                | Focus the checkbox                          |
| `blur()`              | `() => void`                | Blur the checkbox                           |
| `checkValidity()`     | `() => boolean`             | Check validity (required constraint)        |
| `reportValidity()`    | `() => boolean`             | Report validity with visual error feedback  |
| `setCustomValidity()` | `(message: string) => void` | Set custom validation message               |

### CSS Custom Properties

Key CSS variables you can override:

```css
/* Base styles */
--sando-checkbox-transition-duration
--sando-checkbox-focusOutlineColor

/* Variant-specific: solid */
--sando-checkbox-solid-backgroundColor-default
--sando-checkbox-solid-backgroundColor-checked
--sando-checkbox-solid-borderColor-default
--sando-checkbox-solid-checkmarkColor-default

/* Size-specific: medium */
--sando-checkbox-size-medium-boxSize
--sando-checkbox-size-medium-labelFontSize
--sando-checkbox-size-medium-gap
```

::: tip Complete Token Reference
[See full list in Storybook](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) or check `packages/tokens/src/recipes/checkbox.json`
:::

## Framework Integration

### React

```tsx
import "@sando/components";

function App() {
  const handleChange = (e: CustomEvent) => {
    const { checked, indeterminate } = e.detail;
    console.log("Checked:", checked, "Indeterminate:", indeterminate);
  };

  return <sando-checkbox label="Accept terms" onSandoChange={handleChange} />;
}
```

### Vue 3

```vue
<template>
  <sando-checkbox label="Accept terms" @sando-change="handleChange" />
</template>

<script setup lang="ts">
import "@sando/components";

const handleChange = (e: CustomEvent) => {
  const { checked, indeterminate } = e.detail;
  console.log("Checked:", checked, "Indeterminate:", indeterminate);
};
</script>
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@sando/components";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

```html
<!-- component.html -->
<sando-checkbox
  label="Accept terms"
  (sando-change)="handleChange($event)"
></sando-checkbox>
```

## Accessibility

The Checkbox component is built with accessibility as the foundation and exceeds WCAG 2.1 Level AA requirements:

- ✅ **Keyboard Navigation**: Full keyboard support (Space and Enter to toggle)
- ✅ **Screen Reader Support**: Proper ARIA attributes including `aria-checked="mixed"` for indeterminate
- ✅ **Focus Management**: Visible focus indicator with sufficient contrast
- ✅ **Color Contrast**: WCAG AA compliant contrast ratios (4.5:1 for text, 3:1 for UI)
- ✅ **Touch Targets**: All sizes meet 44x44px minimum (WCAG 2.1 Level AA)
- ✅ **State Communication**: Checked, indeterminate, disabled, and error states announced
- ✅ **Error Association**: Error text linked via `aria-describedby`

### Keyboard Shortcuts

| Key           | Action                 |
| ------------- | ---------------------- |
| `Space`       | Toggle checked state   |
| `Enter`       | Toggle checked state   |
| `Tab`         | Focus next element     |
| `Shift + Tab` | Focus previous element |

### WCAG Compliance

| WCAG Criterion               | Level | Status  | Implementation                                                        |
| ---------------------------- | ----- | ------- | --------------------------------------------------------------------- |
| 1.4.3 Contrast (Minimum)     | AA    | ✅ Pass | All text meets 4.5:1 contrast ratio                                   |
| 2.1.1 Keyboard               | A     | ✅ Pass | Fully keyboard accessible (Tab, Space, Enter)                         |
| 2.4.7 Focus Visible          | AA    | ✅ Pass | Visible focus indicator with 3:1 contrast                             |
| 4.1.2 Name, Role, Value      | A     | ✅ Pass | Proper role, accessible name, and states                              |
| 1.3.1 Info and Relationships | A     | ✅ Pass | Label associated with input, `aria-describedby` for helper/error text |

### Screen Reader Support

- ✅ Announces checkbox role and accessible name
- ✅ Announces checked state ("checked" / "not checked")
- ✅ Announces indeterminate state as `aria-checked="mixed"`
- ✅ Announces disabled state ("dimmed" or "unavailable")
- ✅ Announces error state via `aria-invalid="true"` and linked error text

## Best Practices

### Do ✅

- Use clear, descriptive labels that explain the option
- Use `indeterminate` for "select all" patterns with partial selection
- Use `error` with `error-text` to explain validation issues
- Use the default slot for labels with links or rich formatting
- Group related checkboxes together with a heading or `<fieldset>`
- Use `helper-text` to provide additional context when needed
- Use `required` to indicate mandatory fields

### Don't ❌

- Don't use a checkbox when only one option exists and the opposite is implied — use a switch instead
- Don't use a checkbox for mutually exclusive options — use radio buttons instead
- Don't use vague labels like "Check this box"
- Don't disable checkboxes without explaining why
- Don't use `error` without providing an `error-text` — the user needs to know what's wrong

## Examples

### Select All Pattern

```html
<sando-checkbox id="select-all" indeterminate label="Select all items">
</sando-checkbox>

<div style="margin-left: 1.5rem;">
  <sando-checkbox class="item" checked label="Item 1"></sando-checkbox>
  <sando-checkbox class="item" label="Item 2"></sando-checkbox>
  <sando-checkbox class="item" checked label="Item 3"></sando-checkbox>
</div>

<script>
  const selectAll = document.getElementById("select-all");
  const items = document.querySelectorAll(".item");

  selectAll.addEventListener("sando-change", (e) => {
    items.forEach((item) => (item.checked = e.detail.checked));
  });

  items.forEach((item) => {
    item.addEventListener("sando-change", () => {
      const checkedCount = [...items].filter((i) => i.checked).length;
      selectAll.checked = checkedCount === items.length;
      selectAll.indeterminate = checkedCount > 0 && checkedCount < items.length;
    });
  });
</script>
```

### Form Validation

```html
<form id="signup-form">
  <sando-checkbox
    id="terms"
    required
    name="terms"
    label="I accept the terms and conditions"
    error-text="You must accept the terms to continue"
  ></sando-checkbox>

  <sando-button type="submit" variant="solid">Sign Up</sando-button>
</form>

<script>
  const form = document.getElementById("signup-form");
  const terms = document.getElementById("terms");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!terms.reportValidity()) return;
    console.log("Form submitted!");
  });
</script>
```

### Rich Label with Links

```html
<sando-checkbox required name="privacy">
  I have read and agree to the
  <a href="/terms" target="_blank">Terms of Service</a> and
  <a href="/privacy" target="_blank">Privacy Policy</a>
</sando-checkbox>
```

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+

## Related

- [Radio & Radio Group](/components/radio) — For mutually exclusive choices
- [Switch](/components/switch) — For instant on/off toggles
- [Form Group](/components/form-group) — For grouping form fields with labels
- [Input](/components/input) — Text input fields
- [Component Overview](/components/overview)
- [Theming Guide](/getting-started/theming)
- [Interactive Storybook Demo](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) — Explore with live controls
