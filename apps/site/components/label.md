---
title: Label Component
description: A reusable form label with required/optional indicators, helper text, tooltip support, and screen-reader-only mode for accessible form controls.
---

# Label

The `sando-label` component is a form label that handles the details most developers forget — required indicators, optional hints, helper text, tooltips, and screen-reader-only mode. It uses a native `<label>` element under the hood, so clicking it properly focuses the associated input. Like a well-written menu description, it tells your users exactly what they need to know.

## Features

- ✅ **Fully Tested**: Comprehensive unit and E2E tests
- ♿ **Accessible**: Native `<label>` with `for` attribute for form control association
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support
- ⚡ **Performant**: Lightweight, no JS overhead for click-to-focus
- 📝 **Required/Optional**: Built-in indicators for form field status
- 💡 **Tooltip Support**: Info icon with tooltip for additional context
- 👁️ **SR-Only Mode**: Visually hidden labels that remain accessible

## Basic Usage

```html
<!-- Import the component -->
<script type="module">
  import "@sando/components";
</script>

<!-- Use it with the for attribute -->
<sando-label for="email">Email Address</sando-label>
<input id="email" type="email" />
```

::: tip Native Label Behavior
The `for` attribute connects the label to a form control by ID. Clicking the label focuses the associated input — this is native browser behavior that `sando-label` preserves.
:::

## Required & Optional

### Required Field

Shows a red asterisk (`*`) after the label text. The asterisk is `aria-hidden` since screen readers announce the `required` attribute on the input itself.

```html
<sando-label for="name" required>Full Name</sando-label>
<input id="name" type="text" required />
```

### Optional Field

Shows "(optional)" text after the label. Useful when most fields are required and you want to call out the exceptions.

```html
<sando-label for="nickname" optional>Nickname</sando-label>
<input id="nickname" type="text" />
```

::: warning Mutually Exclusive
`required` and `optional` are mutually exclusive. If both are set, `required` takes priority and `optional` is ignored.
:::

## Sizes

Three size options that should match the size of the associated form component:

```html
<sando-label size="sm">Small Label</sando-label>
<sando-label size="md">Medium Label (Default)</sando-label>
<sando-label size="lg">Large Label</sando-label>
```

## Font Weight

Control the visual weight of the label text:

```html
<sando-label weight="normal">Normal Weight</sando-label>
<sando-label weight="medium">Medium Weight (Default)</sando-label>
<sando-label weight="semibold">Semibold Weight</sando-label>
```

## States

### Disabled

Reduces visual prominence when the associated form control is disabled:

```html
<sando-label for="disabled-input" disabled>Disabled Field</sando-label>
<input id="disabled-input" type="text" disabled />
```

## Helper Text

Add supplementary text below the label using the `helper-text` prop or the `helper-text` slot:

### Via Property

```html
<sando-label for="password" helper-text="Must be at least 8 characters">
  Password
</sando-label>
```

### Via Slot

For richer helper text content:

```html
<sando-label for="password">
  Password
  <span slot="helper-text">
    Must include <strong>uppercase</strong>, <strong>lowercase</strong>, and a
    <strong>number</strong>
  </span>
</sando-label>
```

## Tooltip

Provide additional context via a tooltip. When set, an info icon (`circle-help`) appears next to the label:

```html
<sando-label for="ssn" tooltip="Required for identity verification">
  Social Security Number
</sando-label>
```

You can also use the `tooltip` slot for custom tooltip content:

```html
<sando-label for="ssn">
  Social Security Number
  <span slot="tooltip" title="Required for identity verification">ℹ️</span>
</sando-label>
```

## Screen Reader Only

Visually hide the label while keeping it accessible to screen readers. Uses the standard visually-hidden CSS pattern:

```html
<sando-label for="search" sr-only>Search</sando-label>
<input id="search" type="search" placeholder="Search..." />
```

::: tip When to Use SR-Only
Use `sr-only` when the input's purpose is visually obvious (e.g., a search bar with a magnifying glass icon) but still needs an accessible label for screen readers.
:::

## Theming

### Using Flavors

```html
<sando-label flavor="original" required>Original Flavor</sando-label>
<sando-label flavor="strawberry" required>Strawberry Flavor</sando-label>
```

### Custom Styling

Override CSS custom properties for fine-grained control. All color values use OKLCH:

```html
<sando-label
  style="
    --sando-label-textColor-default: oklch(0.35 0.02 260);
    --sando-label-required-textColor: oklch(0.55 0.22 15);
  "
  required
>
  Custom Styled Label
</sando-label>
```

## API Reference

### Properties

| Property     | Attribute     | Type                                 | Default      | Description                                              |
| ------------ | ------------- | ------------------------------------ | ------------ | -------------------------------------------------------- |
| `for`        | `for`         | `string`                             | `undefined`  | ID of the associated form element                        |
| `required`   | `required`    | `boolean`                            | `false`      | Shows required indicator (`*`) after label               |
| `optional`   | `optional`    | `boolean`                            | `false`      | Shows "(optional)" text after label                      |
| `disabled`   | `disabled`    | `boolean`                            | `false`      | Disabled visual state                                    |
| `size`       | `size`        | `'sm' \| 'md' \| 'lg'`               | `'md'`       | Label size (match with form component size)              |
| `weight`     | `weight`      | `'normal' \| 'medium' \| 'semibold'` | `'medium'`   | Font weight variant                                      |
| `helperText` | `helper-text` | `string`                             | `undefined`  | Helper text displayed below the label                    |
| `tooltip`    | `tooltip`     | `string`                             | `undefined`  | Tooltip text (shows info icon when provided)             |
| `srOnly`     | `sr-only`     | `boolean`                            | `false`      | Visually hides label, keeps accessible to screen readers |
| `flavor`     | `flavor`      | `string`                             | `'original'` | Design system theme flavor                               |

### Slots

| Slot                 | Description                                       |
| -------------------- | ------------------------------------------------- |
| (default)            | Label text content                                |
| `helper-text`        | Custom helper text content (overrides prop)       |
| `tooltip`            | Custom tooltip content (overrides default icon)   |
| `optional-indicator` | Custom optional indicator (default: "(optional)") |

### CSS Parts

| Part          | Description                  |
| ------------- | ---------------------------- |
| `label`       | The native `<label>` element |
| `text`        | The text content wrapper     |
| `optional`    | The "(optional)" text        |
| `helper-text` | The helper text container    |
| `tooltip`     | The tooltip icon/wrapper     |

### CSS Custom Properties

```css
/* Typography */
--sando-label-fontFamily
--sando-label-fontWeight-normal
--sando-label-fontWeight-medium
--sando-label-fontWeight-semibold

/* Colors */
--sando-label-textColor-default
--sando-label-textColor-disabled
--sando-label-required-textColor
--sando-label-optional-textColor

/* Size variants */
--sando-label-size-sm-fontSize
--sando-label-size-sm-lineHeight
--sando-label-size-md-fontSize
--sando-label-size-md-lineHeight
--sando-label-size-lg-fontSize
--sando-label-size-lg-lineHeight

/* Helper text */
--sando-label-helperText-fontSize
--sando-label-helperText-lineHeight
--sando-label-helperText-textColor
--sando-label-helperText-marginTop

/* Tooltip */
--sando-label-tooltip-iconColor
--sando-label-tooltip-marginInlineStart

/* Spacing */
--sando-label-gap
--sando-label-required-marginInlineStart
--sando-label-optional-marginInlineStart
```

::: tip Complete Token Reference
[See full list in Storybook](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) or check `packages/tokens/src/recipes/label.json`
:::

## Framework Integration

### React

```tsx
import "@sando/components";

function FormField() {
  return (
    <div>
      <sando-label htmlFor="email" required>
        Email Address
      </sando-label>
      <sando-input id="email" type="email" required></sando-input>
    </div>
  );
}
```

### Vue 3

```vue
<template>
  <div>
    <sando-label for="email" required>Email Address</sando-label>
    <sando-input id="email" type="email" required></sando-input>
  </div>
</template>

<script setup lang="ts">
import "@sando/components";
</script>
```

### Angular

```typescript
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@sando/components";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

```html
<div>
  <sando-label for="email" required>Email Address</sando-label>
  <sando-input id="email" type="email" required></sando-input>
</div>
```

## Accessibility

The Label component is built on native HTML semantics for robust accessibility:

- ✅ **Native `<label>`**: Uses the native element for built-in click-to-focus behavior
- ✅ **`for` Attribute**: Associates label with form control by ID
- ✅ **Required Indicator**: Asterisk is `aria-hidden` (screen readers use the input's `required` attribute)
- ✅ **SR-Only Mode**: Standard visually-hidden pattern keeps labels accessible
- ✅ **Color Contrast**: All text meets WCAG AA contrast requirements
- ✅ **Reduced Motion**: Transitions respect `prefers-reduced-motion`

## Best Practices

### Do ✅

- Always use the `for` attribute to associate labels with form controls
- Match `size` with the associated form component's size for visual consistency
- Use `required` on labels when the input has `required` — it provides a visual cue
- Use `optional` when most fields are required and you want to highlight exceptions
- Use `sr-only` for inputs with clear visual context (search bars, icon-only fields)
- Keep label text concise and descriptive ("Email Address", not "Please enter your email address below")

### Don't ❌

- Don't set both `required` and `optional` — `required` wins, which may confuse
- Don't skip the `for` attribute — without it, clicking the label won't focus the input
- Don't use `sr-only` as a shortcut to skip labels — only use when visually redundant
- Don't put interactive elements inside the label (links, buttons)
- Don't use labels without associated form controls

## Examples

### Complete Form Field

```html
<div style="display: flex; flex-direction: column; gap: 0.25rem;">
  <sando-label for="username" required>Username</sando-label>
  <sando-input id="username" type="text" required></sando-input>
  <sando-help-text>Choose a unique username</sando-help-text>
</div>
```

### Label with Helper Text and Tooltip

```html
<sando-label
  for="api-key"
  required
  helper-text="Found in your dashboard under Settings > API"
  tooltip="Your API key is used for authentication"
>
  API Key
</sando-label>
<sando-input id="api-key" type="password" required></sando-input>
```

### Custom Optional Indicator

```html
<sando-label for="bio" optional>
  Bio
  <span slot="optional-indicator">— not required</span>
</sando-label>
<sando-textarea id="bio"></sando-textarea>
```

### Size Matching with Input

```html
<!-- Small -->
<sando-label for="sm-input" size="sm">Small Field</sando-label>
<sando-input id="sm-input" size="sm"></sando-input>

<!-- Medium (default) -->
<sando-label for="md-input" size="md">Medium Field</sando-label>
<sando-input id="md-input" size="md"></sando-input>

<!-- Large -->
<sando-label for="lg-input" size="lg">Large Field</sando-label>
<sando-input id="lg-input" size="lg"></sando-input>
```

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+

## Related

- [Help Text Component](/components/help-text) — displays validation messages below form fields
- [Input Component](/components/input) — text input commonly paired with labels
- [Form Group Component](/components/form-group) — orchestrates label + input + help text
- [Component Overview](/components/overview)
- [Theming Guide](/getting-started/theming)
- [Interactive Storybook Demo](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) — Explore with live controls
