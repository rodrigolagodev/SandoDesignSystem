---
title: Switch Component
description: A fully accessible toggle switch component for instant on/off settings, with multiple variants, sizes, and form validation support.
---

# Switch

The `sando-switch` component is a toggle switch for binary on/off settings. If checkboxes are your prep checklist, the switch is your stove knob — flip it, and the effect is immediate. Switches are best for settings that take effect instantly, without needing a "Save" button.

## Features

- ✅ **Instant Toggle**: On/off state with immediate visual feedback
- ♿ **Accessible**: WCAG 2.1 AA compliant with `role="switch"` semantics
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support with exported types
- ✨ **Validation**: Built-in error states with helper text and error messages
- 📋 **Form Ready**: Native form participation with `name`, `value`, and validation API
- 🎯 **Smooth Animation**: CSS transition for thumb movement with reduced-motion support

## Basic Usage

```html
<script type="module">
  import "@sando/components";
</script>

<sando-switch label="Enable notifications"></sando-switch>
```

::: tip Import Path
Most components use `import "@sando/components"` for the main bundle. See the [overview](/components/overview) for details.
:::

## Variants

The switch comes in two visual styles:

### Solid (Default)

High emphasis with a filled track background.

```html
<sando-switch variant="solid" label="Solid switch"></sando-switch>
<sando-switch variant="solid" checked label="Solid switch (on)"></sando-switch>
```

### Outline

Medium emphasis with a border-only track.

```html
<sando-switch variant="outline" label="Outline switch"></sando-switch>
<sando-switch
  variant="outline"
  checked
  label="Outline switch (on)"
></sando-switch>
```

## Sizes

Three WCAG-compliant size options for different contexts:

```html
<sando-switch size="sm" label="Small"></sando-switch>
<sando-switch size="md" label="Medium (Default)"></sando-switch>
<sando-switch size="lg" label="Large"></sando-switch>
```

::: tip Touch Target Compliance
All switch sizes meet WCAG 2.1 Level AA minimum touch target size of 44x44px through padding adjustments.
:::

## States

### Checked (On)

```html
<sando-switch checked label="Feature enabled"></sando-switch>
```

### Disabled

```html
<sando-switch disabled label="Disabled (off)"></sando-switch>
<sando-switch disabled checked label="Disabled (on)"></sando-switch>
```

### Error

```html
<sando-switch
  error
  error-text="This setting is required"
  label="Accept terms"
></sando-switch>
```

### Required

Displays a required indicator on the label:

```html
<sando-switch required label="I agree to data processing"></sando-switch>
```

## Labels

### Using the `label` Property

The simplest way to add a label:

```html
<sando-switch label="Dark mode"></sando-switch>
```

### Using the Default Slot

For rich label content with formatting:

```html
<sando-switch>
  Enable <strong>dark mode</strong> for this session
</sando-switch>
```

## Helper and Error Text

Provide guidance or validation feedback below the switch:

```html
<!-- Helper text -->
<sando-switch
  label="Auto-save"
  helper-text="Automatically save your work every 30 seconds"
></sando-switch>

<!-- Error text (requires error=true) -->
<sando-switch
  error
  error-text="You must enable this to continue"
  label="Accept terms"
></sando-switch>
```

::: tip Layout Stability
By default, `reserve-error-space` is enabled, which reserves vertical space for error messages. This prevents layout shift when validation errors appear and disappear.
:::

## Theming

### Using Flavors

Apply different theme flavors:

```html
<sando-switch flavor="original" label="Original Theme" checked></sando-switch>
<sando-switch
  flavor="strawberry"
  label="Strawberry Theme"
  checked
></sando-switch>
```

### Custom Styling

Override CSS custom properties for fine-grained control:

```html
<sando-switch
  checked
  label="Custom Colors"
  style="
    --sando-switch-solid-track-backgroundColor-checked: oklch(0.56 0.11 145);
    --sando-switch-solid-thumb-backgroundColor-checked: oklch(1 0 0);
  "
></sando-switch>
```

## API Reference

### Properties

| Property            | Attribute             | Type                   | Default      | Description                                              |
| ------------------- | --------------------- | ---------------------- | ------------ | -------------------------------------------------------- |
| `checked`           | `checked`             | `boolean`              | `false`      | Whether the switch is on                                 |
| `disabled`          | `disabled`            | `boolean`              | `false`      | Whether the switch is disabled                           |
| `required`          | `required`            | `boolean`              | `false`      | Whether required for form validation                     |
| `error`             | `error`               | `boolean`              | `false`      | Whether in error state                                   |
| `name`              | `name`                | `string`               | `undefined`  | Form field name                                          |
| `value`             | `value`               | `string`               | `'on'`       | Value when checked                                       |
| `variant`           | `variant`             | `'solid' \| 'outline'` | `'solid'`    | Visual style variant                                     |
| `size`              | `size`                | `'sm' \| 'md' \| 'lg'` | `'md'`       | Size variant                                             |
| `label`             | `label`               | `string`               | `undefined`  | Label text (alternative to default slot)                 |
| `helperText`        | `helper-text`         | `string`               | `undefined`  | Helper text displayed below the switch                   |
| `errorText`         | `error-text`          | `string`               | `undefined`  | Error message displayed when `error=true`                |
| `reserveErrorSpace` | `reserve-error-space` | `boolean`              | `true`       | Reserve space for error messages to prevent layout shift |
| `flavor`            | `flavor`              | `string`               | `'original'` | Design system theme flavor                               |

### Slots

| Slot    | Description                                                                      |
| ------- | -------------------------------------------------------------------------------- |
| Default | Label content (alternative to `label` prop). Supports rich HTML with formatting. |

### Events

| Event          | Type                                | Description                     |
| -------------- | ----------------------------------- | ------------------------------- |
| `sando-change` | `CustomEvent<{ checked: boolean }>` | Fired when switch state changes |

### Methods

| Method                | Signature                   | Description                                |
| --------------------- | --------------------------- | ------------------------------------------ |
| `toggle()`            | `() => void`                | Toggle the switch state                    |
| `focus()`             | `() => void`                | Focus the switch                           |
| `blur()`              | `() => void`                | Blur the switch                            |
| `checkValidity()`     | `() => boolean`             | Check validity (required constraint)       |
| `reportValidity()`    | `() => boolean`             | Report validity with visual error feedback |
| `setCustomValidity()` | `(message: string) => void` | Set custom validation message              |

### CSS Custom Properties

Key CSS variables you can override:

```css
/* Base styles */
--sando-switch-borderRadius
--sando-switch-transition-duration
--sando-switch-focusOutlineColor

/* Variant-specific: solid */
--sando-switch-solid-track-backgroundColor-default
--sando-switch-solid-track-backgroundColor-checked
--sando-switch-solid-thumb-backgroundColor-default
--sando-switch-solid-thumb-backgroundColor-checked

/* Size-specific: medium */
--sando-switch-size-md-trackWidth
--sando-switch-size-md-trackHeight
--sando-switch-size-md-thumbSize
```

::: tip Complete Token Reference
[See full list in Storybook](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) or check `packages/tokens/src/recipes/switch.json`
:::

## Framework Integration

### React

```tsx
import "@sando/components";

function App() {
  const handleChange = (e: CustomEvent) => {
    console.log("Switch is:", e.detail.checked ? "ON" : "OFF");
  };

  return (
    <sando-switch label="Enable notifications" onSandoChange={handleChange} />
  );
}
```

### Vue 3

```vue
<template>
  <sando-switch label="Enable notifications" @sando-change="handleChange" />
</template>

<script setup lang="ts">
import "@sando/components";

const handleChange = (e: CustomEvent) => {
  console.log("Switch is:", e.detail.checked ? "ON" : "OFF");
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
<sando-switch
  label="Enable notifications"
  (sando-change)="handleChange($event)"
></sando-switch>
```

## Accessibility

The Switch component uses `role="switch"` for proper ARIA semantics, which distinguishes it from a checkbox. Screen readers announce it as a switch control rather than a checkbox:

- ✅ **Keyboard Navigation**: Full keyboard support (Space and Enter to toggle)
- ✅ **Screen Reader Support**: `role="switch"` with `aria-checked` for on/off state
- ✅ **Focus Management**: Visible focus indicator with sufficient contrast
- ✅ **Color Contrast**: WCAG AA compliant contrast ratios (4.5:1 for text, 3:1 for UI)
- ✅ **Touch Targets**: All sizes meet 44x44px minimum (WCAG 2.1 Level AA)
- ✅ **State Communication**: On/off, disabled, and error states announced
- ✅ **Reduced Motion**: Respects `prefers-reduced-motion` for thumb animation
- ✅ **Error Association**: Error text linked via `aria-describedby`

### Keyboard Shortcuts

| Key           | Action                 |
| ------------- | ---------------------- |
| `Space`       | Toggle switch state    |
| `Enter`       | Toggle switch state    |
| `Tab`         | Focus next element     |
| `Shift + Tab` | Focus previous element |

### WCAG Compliance

| WCAG Criterion                    | Level | Status  | Implementation                                  |
| --------------------------------- | ----- | ------- | ----------------------------------------------- |
| 1.4.3 Contrast (Minimum)          | AA    | ✅ Pass | All text and UI meets contrast requirements     |
| 2.1.1 Keyboard                    | A     | ✅ Pass | Fully keyboard accessible (Tab, Space, Enter)   |
| 2.4.7 Focus Visible               | AA    | ✅ Pass | Visible focus indicator with 3:1 contrast       |
| 4.1.2 Name, Role, Value           | A     | ✅ Pass | `role="switch"` with accessible name and states |
| 1.3.1 Info and Relationships      | A     | ✅ Pass | Label associated with input, `aria-describedby` |
| 2.3.3 Animation from Interactions | AAA   | ✅ Pass | Respects `prefers-reduced-motion`               |

### Screen Reader Support

- ✅ Announces switch role (not checkbox)
- ✅ Announces "on" / "off" state
- ✅ Announces label text
- ✅ Announces disabled state
- ✅ Announces error state via `aria-invalid` and linked error text

## Checkbox vs Switch

Choosing between a checkbox and a switch? Here's the recipe:

| Use Case                        | Component    | Why                                      |
| ------------------------------- | ------------ | ---------------------------------------- |
| Binary setting, instant effect  | **Switch**   | Like flipping a light switch — immediate |
| Agree to terms (form submit)    | **Checkbox** | Part of a form, submitted together       |
| Multiple selections from a list | **Checkbox** | Select any number of items               |
| Single on/off preference        | **Switch**   | Settings panel, instant toggle           |
| "Select all" with partial state | **Checkbox** | Supports indeterminate state             |

::: tip Rule of Thumb
If the setting takes effect **immediately** (like enabling dark mode), use a switch. If the setting is **submitted with a form** (like accepting terms), use a checkbox.
:::

## Best Practices

### Do ✅

- Use clear, descriptive labels that explain what the switch controls
- Use switches for settings that take effect immediately
- Use `helper-text` to explain the effect of the setting
- Place the label to the right of the switch (default layout)
- Use the `error` state with `error-text` for validation in forms
- Consider showing the current state in the label ("Notifications: On")

### Don't ❌

- Don't use a switch for form submissions — use a checkbox instead
- Don't use a switch for multi-select options — use checkboxes
- Don't use vague labels like "Toggle setting"
- Don't disable switches without explaining why
- Don't use `error` without providing an `error-text`
- Don't rely only on color to communicate state — the thumb position provides visual confirmation

## Examples

### Settings Panel

```html
<div
  style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;"
>
  <sando-switch
    checked
    label="Push notifications"
    helper-text="Receive alerts on your device"
  ></sando-switch>

  <sando-switch
    label="Email notifications"
    helper-text="Get updates in your inbox"
  ></sando-switch>

  <sando-switch
    checked
    label="Dark mode"
    helper-text="Reduce eye strain in low light"
  ></sando-switch>

  <sando-switch
    disabled
    label="Beta features"
    helper-text="Not available in your region"
  ></sando-switch>
</div>
```

### Interactive Dark Mode Toggle

```html
<sando-switch id="dark-mode" label="Dark mode"></sando-switch>

<script>
  const toggle = document.getElementById("dark-mode");
  toggle.addEventListener("sando-change", (e) => {
    document.body.classList.toggle("dark", e.detail.checked);
    console.log("Dark mode:", e.detail.checked ? "ON" : "OFF");
  });
</script>
```

### Form with Validation

```html
<form id="consent-form">
  <sando-switch
    id="data-consent"
    required
    name="data-consent"
    label="I consent to data processing"
    error-text="You must consent to continue"
  ></sando-switch>

  <sando-switch
    name="marketing"
    label="Send me marketing emails"
    helper-text="Optional — you can unsubscribe anytime"
  ></sando-switch>

  <sando-button type="submit" variant="solid">Submit</sando-button>
</form>

<script>
  const form = document.getElementById("consent-form");
  const consent = document.getElementById("data-consent");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!consent.reportValidity()) return;
    console.log("Form submitted!");
  });
</script>
```

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+

## Related

- [Checkbox](/components/checkbox) — For form-submitted binary choices and multi-select
- [Radio & Radio Group](/components/radio) — For mutually exclusive choices
- [Form Group](/components/form-group) — For grouping form fields with labels
- [Input](/components/input) — Text input fields
- [Component Overview](/components/overview)
- [Theming Guide](/getting-started/theming)
- [Interactive Storybook Demo](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) — Explore with live controls
