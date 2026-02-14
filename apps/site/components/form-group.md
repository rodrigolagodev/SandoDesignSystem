---
title: Form Group Component
description: A layout container for grouping labels, form controls, and help text with proper accessibility associations
---

# Form Group

A form group component that provides consistent layout and labeling for form controls. It handles the association between labels, inputs, helper text, and error messages — the plating that presents your form ingredients in a clean, organized arrangement.

::: warning Prefer Built-in Labels
Most Sando form components (`sando-input`, `sando-checkbox`, `sando-switch`, `sando-textarea`, `sando-select`) include built-in `label`, `helper-text`, and `error-text` properties. Use `sando-form-group` only when wrapping native HTML elements or third-party controls that lack their own labeling.
:::

## Features

- ✅ **Accessible Labels**: Proper label association with form controls via `for` attribute
- ♿ **WCAG 2.1 AA Compliant**: Error messages with `role="alert"` and `aria-live="polite"`
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support
- ⚡ **Lightweight**: Minimal footprint, handles layout and accessibility only

## Basic Usage

```html
<script type="module">
  import "@sando/components";
</script>

<sando-form-group label="Email">
  <input type="email" />
</sando-form-group>
```

::: tip Import Path
The form group component is imported via the main `@sando/components` entry point, which registers all components. Only `@sando/components/button` has a dedicated individual export path.
:::

## Properties

| Property     | Attribute     | Type      | Default | Description                                    |
| ------------ | ------------- | --------- | ------- | ---------------------------------------------- |
| `label`      | `label`       | `string`  | `—`     | Label text for the form field                  |
| `error`      | `error`       | `string`  | `—`     | Error message to display (shows error state)   |
| `helperText` | `helper-text` | `string`  | `—`     | Helper text below the field                    |
| `required`   | `required`    | `boolean` | `false` | Whether the field is required (shows asterisk) |
| `disabled`   | `disabled`    | `boolean` | `false` | Whether the form group is disabled             |

## Slots

| Slot          | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| (default)     | Form control elements (input, select, textarea, etc.)         |
| `label`       | Custom label content (alternative to `label` prop)            |
| `helper-text` | Custom helper text content (alternative to `helperText` prop) |
| `error`       | Custom error message content (alternative to `error` prop)    |

## Events

| Event               | Type                                           | Description                                    |
| ------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `sando-focus`       | `CustomEvent`                                  | Fired when a child form control receives focus |
| `sando-blur`        | `CustomEvent`                                  | Fired when a child form control loses focus    |
| `validation-change` | `CustomEvent<FormGroupValidationChangeDetail>` | Fired when validation state changes            |

### Event Details

**validation-change event detail:**

```typescript
interface FormGroupValidationChangeDetail {
  isValid: boolean;
  errorMessage: string | null;
}
```

## Examples

### With Helper Text

```html
<sando-form-group
  label="Username"
  helper-text="Choose a unique username (4-20 characters)"
>
  <input type="text" />
</sando-form-group>
```

### With Error Message

```html
<sando-form-group label="Email" error="Please enter a valid email address">
  <input type="email" value="invalid-email" />
</sando-form-group>
```

### Required Field

```html
<sando-form-group
  label="Password"
  helper-text="Must be at least 8 characters"
  required
>
  <input type="password" required />
</sando-form-group>
```

### Using Slots

```html
<sando-form-group>
  <span slot="label">Email <em>(required)</em></span>
  <input type="email" required />
  <span slot="helper-text">We'll never share your email</span>
</sando-form-group>
```

### With Sando Components

When wrapping Sando form components, prefer using their built-in label support instead:

```html
<!-- ✅ Preferred: use the component's built-in label -->
<sando-input
  label="Email"
  type="email"
  helper-text="We'll never share your email"
  required
></sando-input>

<!-- Also valid: wrapping native elements with form-group -->
<sando-form-group label="Country">
  <select>
    <option>United States</option>
    <option>Canada</option>
    <option>Japan</option>
  </select>
</sando-form-group>
```

### Disabled State

```html
<sando-form-group label="Account ID" disabled>
  <input type="text" value="ACC-12345" />
</sando-form-group>
```

## Accessibility

### WCAG Compliance

| Criterion                    | Level | Status  | Implementation                                        |
| ---------------------------- | ----- | ------- | ----------------------------------------------------- |
| 1.3.1 Info and Relationships | A     | ✅ Pass | Semantic HTML structure with proper label association |
| 3.3.1 Error Identification   | A     | ✅ Pass | Error messages use `role="alert"`                     |
| 3.3.2 Labels or Instructions | A     | ✅ Pass | Labels and helper text provide clear guidance         |
| 4.1.3 Status Messages        | AA    | ✅ Pass | Error messages announced via `aria-live="polite"`     |

### Keyboard Navigation

The form group component does not trap or interfere with keyboard navigation. All slotted form controls maintain their native keyboard behavior:

- **Tab**: Move focus between form controls
- **Form-specific keys**: Work as expected (Enter, Space, Arrow keys, etc.)

### Screen Reader Support

- ✅ Labels are properly associated with form controls via `for`/`id`
- ✅ Error messages are announced when they appear (via `aria-live="polite"`)
- ✅ Helper text provides additional context via `aria-describedby`
- ✅ Required fields are indicated both visually (asterisk) and semantically

## CSS Custom Properties

```css
/* Layout */
--sando-form-group-gap

/* Label */
--sando-form-group-label-fontSize
--sando-form-group-label-fontWeight
--sando-form-group-label-textColor-default
--sando-form-group-label-textColor-disabled

/* Helper text */
--sando-form-group-helperText-fontSize
--sando-form-group-helperText-textColor

/* Error */
--sando-form-group-error-textColor

/* Required indicator */
--sando-form-group-required-textColor
```

## Best Practices

- ✅ **DO**: Use semantic HTML form controls inside the form group
- ✅ **DO**: Provide clear, concise labels
- ✅ **DO**: Use helper text to provide additional guidance
- ✅ **DO**: Use the `required` prop for required fields
- ✅ **DO**: Prefer built-in labels on Sando components (`sando-input`, `sando-checkbox`, etc.)
- ❌ **DON'T**: Use form group without a label (either prop or slot)
- ❌ **DON'T**: Rely solely on color to indicate error state
- ❌ **DON'T**: Nest form groups inside each other
- ❌ **DON'T**: Use both prop and slot for the same content type (choose one)

## Framework Integration

::: code-group

```tsx [React]
import "@sando/components";

function LoginForm() {
  const [error, setError] = useState<string>();

  return (
    <sando-form-group label="Email" error={error} required>
      <input type="email" required />
    </sando-form-group>
  );
}
```

```vue [Vue]
<template>
  <sando-form-group label="Email" :error="error" :required="true">
    <input type="email" required />
  </sando-form-group>
</template>

<script setup>
import { ref } from "vue";
import "@sando/components";

const error = ref("");
</script>
```

:::

## Related Components

- [Input](/components/input) — Text input with built-in label support
- [Checkbox](/components/overview#checkbox) — Selection control with built-in label
- [Switch](/components/overview#switch) — Toggle control with built-in label
- [Select](/components/overview#select) — Dropdown with built-in label
- [Textarea](/components/overview#textarea) — Multi-line input with built-in label
- [Help Text](/components/overview#help-text) — Standalone helper/error text component
