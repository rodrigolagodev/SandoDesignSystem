---
title: Help Text Component
description: An internal utility component for displaying helper, error, success, and warning messages in form controls — with built-in layout shift prevention.
---

# Help Text

The `sando-help-text` component displays contextual messages beneath form controls — helper hints, validation errors, success confirmations, and warnings. Its secret ingredient? It reserves vertical space by default, so your layout doesn't jump around when messages appear. Like pre-slicing your bread before assembling — everything stays aligned.

## Features

- ✅ **Fully Tested**: Comprehensive unit and E2E tests
- ♿ **Accessible**: `role="alert"` with `aria-live="assertive"` for errors, `role="status"` with `aria-live="polite"` for others
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support
- ⚡ **Performant**: Lightweight with smooth CSS transitions
- 📐 **Layout Stable**: Reserves space to prevent content shift
- 🎯 **Variant Icons**: Automatic icon per variant via `sando-icon`

::: tip Internal but Standalone
This component is primarily used internally by form components like `sando-input`, `sando-textarea`, and `sando-select`. However, you can use it standalone whenever you need accessible, layout-stable feedback messages in your UI.
:::

## Basic Usage

```html
<!-- Import the component -->
<script type="module">
  import "@sando/components";
</script>

<!-- Use it -->
<sando-help-text>Enter your email address</sando-help-text>
```

## Variants

Four semantic variants to communicate different types of feedback:

### Default

Neutral helper text for general guidance.

```html
<sando-help-text variant="default">
  Must be at least 8 characters
</sando-help-text>
```

### Error

Validation errors — announced immediately to screen readers via `role="alert"`.

```html
<sando-help-text variant="error"> This field is required </sando-help-text>
```

### Success

Positive confirmation that input is valid.

```html
<sando-help-text variant="success"> Email address is valid </sando-help-text>
```

### Warning

Cautionary messages that don't block submission.

```html
<sando-help-text variant="warning"> Password strength is weak </sando-help-text>
```

## With Icons

Enable `show-icon` to display a contextual icon based on the variant. Each variant maps to a specific Lucide icon:

| Variant   | Icon             |
| --------- | ---------------- |
| `default` | `info`           |
| `error`   | `circle-alert`   |
| `success` | `circle-check`   |
| `warning` | `triangle-alert` |

```html
<sando-help-text variant="default" show-icon>
  Helpful information
</sando-help-text>

<sando-help-text variant="error" show-icon>
  This field is required
</sando-help-text>

<sando-help-text variant="success" show-icon> Looks good! </sando-help-text>

<sando-help-text variant="warning" show-icon>
  Check your input
</sando-help-text>
```

## Layout Shift Prevention

The component's primary purpose is preventing layout shift when messages appear or disappear. By default, it reserves vertical space via `min-height` — even when empty.

### With Reserved Space (Default)

```html
<!-- Space is reserved even with no content — no layout jump -->
<sando-help-text></sando-help-text>
```

### Without Reserved Space

When you don't need the layout stability (e.g., static helper text that never changes):

```html
<sando-help-text reserve-space="false">
  This text won't reserve space when empty
</sando-help-text>
```

::: warning Layout Shift
Setting `reserve-space="false"` means content below will shift when the help text appears or disappears. Use the default (`"true"`) for form validation messages.
:::

## Theming

### Using Flavors

```html
<sando-help-text flavor="original" variant="error" show-icon>
  Original flavor error
</sando-help-text>

<sando-help-text flavor="strawberry" variant="success" show-icon>
  Strawberry flavor success
</sando-help-text>
```

### Custom Styling

Override CSS custom properties for fine-grained control. All color values use OKLCH:

```html
<sando-help-text
  variant="error"
  style="
    --sando-help-text-variant-error-textColor: oklch(0.50 0.18 15);
  "
>
  Custom error color
</sando-help-text>
```

## API Reference

### Properties

| Property       | Attribute       | Type                                             | Default      | Description                                               |
| -------------- | --------------- | ------------------------------------------------ | ------------ | --------------------------------------------------------- |
| `variant`      | `variant`       | `'default' \| 'error' \| 'success' \| 'warning'` | `'default'`  | Visual variant determining color and icon                 |
| `showIcon`     | `show-icon`     | `boolean`                                        | `false`      | Whether to show a variant-specific icon                   |
| `reserveSpace` | `reserve-space` | `'true' \| 'false'`                              | `'true'`     | Whether to reserve vertical space to prevent layout shift |
| `flavor`       | `flavor`        | `string`                                         | `'original'` | Design system theme flavor                                |

### Slots

| Slot      | Description                      |
| --------- | -------------------------------- |
| (default) | Help text content (text message) |

### CSS Custom Properties

```css
/* Base styles */
--sando-help-text-fontFamily
--sando-help-text-fontSize
--sando-help-text-lineHeight
--sando-help-text-marginTop
--sando-help-text-minHeight          /* Reserved space height */
--sando-help-text-gap                /* Space between icon and text */

/* Variant text colors */
--sando-help-text-variant-default-textColor
--sando-help-text-variant-error-textColor
--sando-help-text-variant-success-textColor
--sando-help-text-variant-warning-textColor

/* Variant icon colors */
--sando-help-text-variant-default-iconColor
--sando-help-text-variant-error-iconColor
--sando-help-text-variant-success-iconColor
--sando-help-text-variant-warning-iconColor

/* Animation */
--sando-help-text-animation-duration
--sando-help-text-animation-timing
```

::: tip Complete Token Reference
[See full list in Storybook](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) or check `packages/tokens/src/recipes/help-text.json`
:::

## Framework Integration

### React

```tsx
import "@sando/components";

function FormField() {
  const [error, setError] = useState("");

  return (
    <div>
      <input type="email" onBlur={(e) => validate(e.target.value)} />
      <sando-help-text variant={error ? "error" : "default"} show-icon>
        {error || "We'll never share your email"}
      </sando-help-text>
    </div>
  );
}
```

### Vue 3

```vue
<template>
  <div>
    <input type="email" @blur="validate" />
    <sando-help-text :variant="error ? 'error' : 'default'" show-icon>
      {{ error || "We'll never share your email" }}
    </sando-help-text>
  </div>
</template>

<script setup lang="ts">
import "@sando/components";
import { ref } from "vue";

const error = ref("");
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
  <input type="email" (blur)="validate($event)" />
  <sando-help-text [attr.variant]="error ? 'error' : 'default'" show-icon>
    {{ error || "We'll never share your email" }}
  </sando-help-text>
</div>
```

## Accessibility

The Help Text component uses ARIA live regions to announce messages to assistive technology:

- ✅ **Error Variant**: Uses `role="alert"` + `aria-live="assertive"` for immediate announcement
- ✅ **Other Variants**: Use `role="status"` + `aria-live="polite"` for non-intrusive announcement
- ✅ **Icons are Decorative**: Variant icons use `decorative` attribute (hidden from screen readers)
- ✅ **Reduced Motion**: Animations respect `prefers-reduced-motion` media query
- ✅ **Color + Text**: Messages use both color and text (never color alone) for colorblind users

## Best Practices

### Do ✅

- Use `reserve-space` (the default) for form validation messages to prevent layout shift
- Use `variant="error"` for validation errors — it ensures screen readers announce immediately
- Pair with `show-icon` for visual reinforcement alongside color
- Keep messages concise and actionable ("Must be at least 8 characters", not "Error")
- Use `variant="default"` for persistent helper hints

### Don't ❌

- Don't use this component for general alerts or notifications — use a dedicated alert component
- Don't set `reserve-space="false"` on validation messages — it causes layout jump
- Don't rely on color alone to communicate meaning — always include text
- Don't use overly technical error messages ("Invalid input format for RFC 5322")

## Examples

### Form Field with Validation

```html
<div>
  <sando-label for="email" required>Email</sando-label>
  <sando-input id="email" type="email"></sando-input>
  <sando-help-text id="email-help" variant="default">
    We'll use this to send your order confirmation
  </sando-help-text>
</div>

<script>
  const input = document.getElementById("email");
  const helpText = document.getElementById("email-help");

  input.addEventListener("blur", () => {
    if (!input.value) {
      helpText.variant = "error";
      helpText.showIcon = true;
      helpText.textContent = "Email is required";
    } else if (!input.value.includes("@")) {
      helpText.variant = "error";
      helpText.showIcon = true;
      helpText.textContent = "Please enter a valid email";
    } else {
      helpText.variant = "success";
      helpText.showIcon = true;
      helpText.textContent = "Looks good!";
    }
  });
</script>
```

### All Variants with Icons

```html
<sando-help-text variant="default" show-icon>
  Your password must be at least 8 characters
</sando-help-text>

<sando-help-text variant="error" show-icon>
  Password is too short
</sando-help-text>

<sando-help-text variant="success" show-icon>
  Password meets all requirements
</sando-help-text>

<sando-help-text variant="warning" show-icon>
  Password strength could be improved
</sando-help-text>
```

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+

## Related

- [Input Component](/components/input) — uses help text for field hints and validation
- [Form Group Component](/components/form-group) — orchestrates label + input + help text
- [Label Component](/components/label) — form label with required/optional indicators
- [Component Overview](/components/overview)
- [Theming Guide](/getting-started/theming)
- [Interactive Storybook Demo](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) — Explore with live controls
