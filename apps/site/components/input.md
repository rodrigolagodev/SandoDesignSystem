---
title: Input Component
description: A fully accessible text input component with variants, sizes, validation states, and prefix/suffix slots
---

# Input

A fully accessible input component with multiple variants, sizes, and states. Like the bread in a good sandwich, the input is the foundation of any form — it needs to be reliable, consistent, and work well with every ingredient you add to it.

## Features

- ✅ **Multiple Variants**: Filled and outlined styles
- ✅ **Flexible Sizing**: `sm`, `md`, and `lg` sizes
- ♿ **Accessible**: WCAG 2.1 AA compliant with full keyboard support
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support
- ✨ **Validation**: Error states with helper text and error messages
- 🎯 **Customizable**: Prefix and suffix slots for icons and actions

## Basic Usage

```html
<script type="module">
  import "@sando/components";
</script>

<sando-input label="Email" placeholder="you@example.com"></sando-input>
```

::: tip Import Path
The input component is imported via the main `@sando/components` entry point, which registers all components. Only `@sando/components/button` has a dedicated individual export path.
:::

## Variants

### Filled (Default)

Input with a filled background. This is the default variant — it provides a clear visual container that helps users identify the input area.

```html
<sando-input variant="filled" label="Username"></sando-input>
```

### Outlined

Input with a visible border on a transparent background.

```html
<sando-input variant="outlined" label="Username"></sando-input>
```

## Sizes

All sizes meet WCAG 2.1 Level AA minimum touch target size (44x44px).

### Small

Compact size for tight spaces and dense UIs.

```html
<sando-input size="sm" label="Compact"></sando-input>
```

### Medium (Default)

Standard size for most use cases.

```html
<sando-input size="md" label="Standard"></sando-input>
```

### Large

Larger size for emphasis or prominent inputs.

```html
<sando-input size="lg" label="Large"></sando-input>
```

## States

### With Helper Text

```html
<sando-input
  label="Password"
  type="password"
  helper-text="Must be at least 8 characters"
></sando-input>
```

### Error State

```html
<sando-input label="Email" error error-text="Email is required"></sando-input>
```

### Required

```html
<sando-input
  label="Email"
  required
  helper-text="We'll never share your email"
></sando-input>
```

### Disabled

```html
<sando-input label="Account ID" value="ACC-12345" disabled></sando-input>
```

### Readonly

```html
<sando-input label="Company" value="Acme Corp" readonly></sando-input>
```

## With Slots

### Prefix Icon

```html
<sando-input label="Search" placeholder="Search...">
  <sando-icon slot="prefix" name="search" size="sm"></sando-icon>
</sando-input>
```

### Suffix Button

```html
<sando-input label="Search" value="query">
  <button slot="suffix" aria-label="Clear">✕</button>
</sando-input>
```

### Both Prefix and Suffix

```html
<sando-input label="Amount" type="number" value="100">
  <span slot="prefix">$</span>
  <span slot="suffix">.00</span>
</sando-input>
```

## Input Types

Supports standard HTML input types:

```html
<sando-input label="Text" type="text"></sando-input>
<sando-input label="Email" type="email"></sando-input>
<sando-input label="Password" type="password"></sando-input>
<sando-input label="Number" type="number"></sando-input>
<sando-input label="Tel" type="tel"></sando-input>
<sando-input label="URL" type="url"></sando-input>
<sando-input label="Search" type="search"></sando-input>
```

## API Reference

### Properties

| Property            | Attribute             | Type                                                                        | Default    | Description                                              |
| ------------------- | --------------------- | --------------------------------------------------------------------------- | ---------- | -------------------------------------------------------- |
| `variant`           | `variant`             | `'filled' \| 'outlined'`                                                    | `'filled'` | Visual style variant                                     |
| `size`              | `size`                | `'sm' \| 'md' \| 'lg'`                                                      | `'md'`     | Input size                                               |
| `type`              | `type`                | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'`   | HTML input type                                          |
| `value`             | `value`               | `string`                                                                    | `''`       | Input value                                              |
| `placeholder`       | `placeholder`         | `string`                                                                    | `—`        | Placeholder text                                         |
| `label`             | `label`               | `string`                                                                    | `—`        | Accessible label                                         |
| `helperText`        | `helper-text`         | `string`                                                                    | `—`        | Helper text below input                                  |
| `errorText`         | `error-text`          | `string`                                                                    | `—`        | Error message when error is true                         |
| `disabled`          | `disabled`            | `boolean`                                                                   | `false`    | Whether input is disabled                                |
| `readonly`          | `readonly`            | `boolean`                                                                   | `false`    | Whether input is readonly                                |
| `required`          | `required`            | `boolean`                                                                   | `false`    | Whether input is required                                |
| `error`             | `error`               | `boolean`                                                                   | `false`    | Whether input has an error                               |
| `reserveErrorSpace` | `reserve-error-space` | `boolean`                                                                   | `true`     | Reserve space for error messages to prevent layout shift |
| `name`              | `name`                | `string`                                                                    | `—`        | Name for form submission                                 |
| `autocomplete`      | `autocomplete`        | `string`                                                                    | `—`        | Autocomplete attribute for browser autofill              |

### Slots

| Slot     | Description                              |
| -------- | ---------------------------------------- |
| `prefix` | Content before the input (icons, text)   |
| `suffix` | Content after the input (icons, actions) |

### Events

| Event    | Type                             | Description                                     |
| -------- | -------------------------------- | ----------------------------------------------- |
| `input`  | `Event`                          | Fired when input value changes                  |
| `change` | `CustomEvent<{ value: string }>` | Fired when input loses focus with changed value |
| `focus`  | `FocusEvent`                     | Fired when input gains focus                    |
| `blur`   | `FocusEvent`                     | Fired when input loses focus                    |

### Methods

| Method                       | Description                                         |
| ---------------------------- | --------------------------------------------------- |
| `focus()`                    | Programmatically focus input                        |
| `blur()`                     | Programmatically blur input                         |
| `select()`                   | Select all input text                               |
| `checkValidity()`            | Check native validation (returns `boolean`)         |
| `reportValidity()`           | Report validity with browser UI (returns `boolean`) |
| `setCustomValidity(message)` | Set a custom validation message                     |

### CSS Custom Properties

```css
/* Border colors (outlined variant) */
--sando-input-outlined-borderColor-default
--sando-input-outlined-borderColor-hover
--sando-input-outlined-borderColor-focus
--sando-input-outlined-borderColor-error
--sando-input-outlined-borderColor-disabled

/* Background colors */
--sando-input-outlined-backgroundColor-default
--sando-input-outlined-backgroundColor-disabled
--sando-input-filled-backgroundColor-default
--sando-input-filled-backgroundColor-hover
--sando-input-filled-backgroundColor-disabled

/* Text colors */
--sando-input-outlined-textColor-default
--sando-input-outlined-textColor-placeholder
--sando-input-outlined-textColor-disabled
--sando-input-filled-textColor-default
--sando-input-filled-textColor-placeholder
--sando-input-filled-textColor-disabled

/* Filled variant borders */
--sando-input-filled-borderColor-default
--sando-input-filled-borderColor-hover
--sando-input-filled-borderColor-focus
--sando-input-filled-borderColor-error
--sando-input-filled-borderColor-disabled

/* Sizes (sm, md, lg) */
--sando-input-size-sm-paddingInline
--sando-input-size-sm-paddingBlock
--sando-input-size-sm-fontSize
--sando-input-size-sm-minHeight
--sando-input-size-md-paddingInline
--sando-input-size-md-paddingBlock
--sando-input-size-md-fontSize
--sando-input-size-md-minHeight
--sando-input-size-lg-paddingInline
--sando-input-size-lg-paddingBlock
--sando-input-size-lg-fontSize
--sando-input-size-lg-minHeight

/* Label */
--sando-input-label-textColor-default
--sando-input-label-textColor-disabled
--sando-input-label-fontSize
--sando-input-label-fontWeight
--sando-input-label-marginBottom

/* Helper & Error text */
--sando-input-helperText-textColor-default
--sando-input-helperText-fontSize
--sando-input-helperText-marginTop
--sando-input-errorText-textColor
--sando-input-errorText-fontSize
--sando-input-errorText-marginTop

/* General */
--sando-input-fontFamily
--sando-input-lineHeight
--sando-input-borderRadius
--sando-input-borderWidth
--sando-input-focusOutlineColor
--sando-input-focusOutlineWidth
--sando-input-focusOutlineOffset
--sando-input-transition-duration
--sando-input-transition-timing
--sando-input-gap
--sando-input-required-textColor
```

## Accessibility

| WCAG Criterion           | Level | Status  | Implementation                           |
| ------------------------ | ----- | ------- | ---------------------------------------- |
| 1.4.3 Contrast (Minimum) | AA    | ✅ Pass | All text meets 4.5:1 contrast ratio      |
| 2.1.1 Keyboard           | A     | ✅ Pass | Fully keyboard accessible                |
| 2.4.7 Focus Visible      | AA    | ✅ Pass | Visible focus indicator                  |
| 3.3.2 Labels             | A     | ✅ Pass | Labels properly associated               |
| 4.1.2 Name, Role, Value  | A     | ✅ Pass | Proper semantic HTML and ARIA attributes |

### Keyboard Navigation

| Key   | Action                   |
| ----- | ------------------------ |
| `Tab` | Move focus to/from input |

### Screen Reader Support

- ✅ Announces label and input type
- ✅ Announces helper text via `aria-describedby`
- ✅ Announces error messages via `aria-describedby` and `role="alert"`
- ✅ Announces disabled/readonly states
- ✅ Announces required fields

## Examples

### Login Form

```html
<form>
  <sando-input
    label="Email"
    type="email"
    required
    placeholder="you@example.com"
  ></sando-input>

  <sando-input
    label="Password"
    type="password"
    required
    helper-text="Must be at least 8 characters"
  ></sando-input>

  <sando-button type="submit">Sign In</sando-button>
</form>
```

### Search Input

```html
<sando-input label="Search" type="search" placeholder="Search documentation...">
  <sando-icon slot="prefix" name="search" size="sm"></sando-icon>
  <button slot="suffix" aria-label="Clear search">✕</button>
</sando-input>
```

### Validation Example

```html
<sando-input
  label="Email Address"
  type="email"
  value="invalid-email"
  error
  error-text="Please enter a valid email address"
></sando-input>
```

### With Flavors

```html
<sando-input
  label="Strawberry Input"
  placeholder="Themed with strawberry flavor"
  flavor="strawberry"
></sando-input>
```

## Best Practices

- ✅ **DO**: Always provide a `label` for accessibility
- ✅ **DO**: Use `helper-text` to guide users with formatting expectations
- ✅ **DO**: Show clear error messages with `error-text`
- ✅ **DO**: Use appropriate input types (`email`, `tel`, `url`, etc.)
- ✅ **DO**: Use `reserve-error-space` (default) to prevent layout shift
- ❌ **DON'T**: Use `placeholder` as the only label
- ❌ **DON'T**: Disable inputs unnecessarily
- ❌ **DON'T**: Use custom validation without proper error messages

## Framework Integration

::: code-group

```tsx [React]
import "@sando/components";

function LoginForm() {
  const [email, setEmail] = useState("");

  return (
    <sando-input
      label="Email"
      type="email"
      value={email}
      onInput={(e: any) => setEmail(e.target.value)}
    />
  );
}
```

```vue [Vue]
<template>
  <sando-input
    label="Email"
    type="email"
    :value="email"
    @input="email = $event.target.value"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import "@sando/components";

const email = ref("");
</script>
```

:::

## Related Components

- [Button](/components/button) — For form submissions
- [Form Group](/components/form-group) — For grouping label, input, and help text
- [Textarea](/components/overview#textarea) — For multi-line text input
- [Select](/components/overview#select) — For dropdown selections
