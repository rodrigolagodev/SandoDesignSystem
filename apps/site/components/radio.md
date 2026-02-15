---
title: Radio & Radio Group Components
description: Fully accessible radio button and radio group components with roving tabindex, keyboard navigation, and form validation support.
---

# Radio & Radio Group

The `sando-radio` and `sando-radio-group` components work together like the perfect pairing of bread and filling — individually crafted, but best served together. Radio buttons let users choose exactly one option from a set, while the radio group provides the container with proper ARIA semantics and keyboard navigation.

## Features

- ✅ **Mutually Exclusive**: Only one radio per group can be selected at a time
- ♿ **Accessible**: WCAG 2.1 AA compliant with roving tabindex and WAI-ARIA radio group pattern
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support with exported types
- ⌨️ **Keyboard Navigation**: Arrow keys, Home, End with automatic selection
- ✨ **Validation**: Built-in error states with helper text and error messages
- 📋 **Form Ready**: Native form participation with `name`, `value`, and validation API
- 🔄 **Orientation**: Vertical or horizontal layout

## Basic Usage

```html
<script type="module">
  import "@sando/components";
</script>

<sando-radio-group name="topping" label="Choose your topping">
  <sando-radio value="tonkatsu" label="Tonkatsu"></sando-radio>
  <sando-radio value="chicken" label="Chicken Katsu"></sando-radio>
  <sando-radio value="ebi" label="Ebi Fry"></sando-radio>
</sando-radio-group>
```

::: tip Import Path
Most components use `import "@sando/components"` for the main bundle. See the [overview](/components/overview) for details.
:::

## Using Radio Group vs Standalone Radios

### Radio Group (Recommended)

The `sando-radio-group` wraps multiple `sando-radio` elements and provides:

- Automatic `name` propagation to all child radios
- Roving tabindex keyboard navigation (arrow keys)
- Shared group label, helper text, and error state
- `role="radiogroup"` ARIA semantics

```html
<sando-radio-group name="size" label="Choose a size" value="md">
  <sando-radio value="sm" label="Small"></sando-radio>
  <sando-radio value="md" label="Medium"></sando-radio>
  <sando-radio value="lg" label="Large"></sando-radio>
</sando-radio-group>
```

### Standalone Radios

You can also use `sando-radio` independently with a shared `name` attribute. Note that you'll need to manage keyboard navigation and mutual exclusion yourself:

```html
<sando-radio name="color" value="red" label="Red"></sando-radio>
<sando-radio name="color" value="green" label="Green"></sando-radio>
<sando-radio name="color" value="blue" label="Blue"></sando-radio>
```

::: warning Use Radio Group
Standalone radios lack the roving tabindex navigation pattern that screen reader users expect. Always prefer `sando-radio-group` for the best accessibility experience.
:::

## Variants

Both `sando-radio` and `sando-radio-group` support two visual styles:

### Solid (Default)

High emphasis with a filled circle when selected.

```html
<sando-radio-group name="variant-solid" label="Solid variant">
  <sando-radio variant="solid" value="a" label="Option A"></sando-radio>
  <sando-radio variant="solid" value="b" label="Option B" checked></sando-radio>
</sando-radio-group>
```

### Outline

Medium emphasis with a border-only style when selected.

```html
<sando-radio-group name="variant-outline" label="Outline variant">
  <sando-radio variant="outline" value="a" label="Option A"></sando-radio>
  <sando-radio
    variant="outline"
    value="b"
    label="Option B"
    checked
  ></sando-radio>
</sando-radio-group>
```

## Sizes

Three WCAG-compliant size options. When set on the group, all child radios inherit the size:

```html
<sando-radio-group name="size-demo" label="Size examples" size="sm">
  <sando-radio value="a" label="Small A"></sando-radio>
  <sando-radio value="b" label="Small B"></sando-radio>
</sando-radio-group>

<sando-radio-group name="size-demo-md" label="Medium (Default)" size="md">
  <sando-radio value="a" label="Medium A"></sando-radio>
  <sando-radio value="b" label="Medium B"></sando-radio>
</sando-radio-group>

<sando-radio-group name="size-demo-lg" label="Large" size="lg">
  <sando-radio value="a" label="Large A"></sando-radio>
  <sando-radio value="b" label="Large B"></sando-radio>
</sando-radio-group>
```

::: tip Touch Target Compliance
All radio sizes meet WCAG 2.1 Level AA minimum touch target size of 44x44px through padding adjustments.
:::

## Orientation

### Vertical (Default)

Options stacked top to bottom:

```html
<sando-radio-group
  name="vertical"
  label="Vertical layout"
  orientation="vertical"
>
  <sando-radio value="a" label="Option A"></sando-radio>
  <sando-radio value="b" label="Option B"></sando-radio>
  <sando-radio value="c" label="Option C"></sando-radio>
</sando-radio-group>
```

### Horizontal

Options side by side — best for short lists with short labels:

```html
<sando-radio-group
  name="horizontal"
  label="Horizontal layout"
  orientation="horizontal"
>
  <sando-radio value="yes" label="Yes"></sando-radio>
  <sando-radio value="no" label="No"></sando-radio>
  <sando-radio value="maybe" label="Maybe"></sando-radio>
</sando-radio-group>
```

## States

### Default Value

Pre-select an option by setting `value` on the group:

```html
<sando-radio-group name="default" label="Default selection" value="medium">
  <sando-radio value="small" label="Small"></sando-radio>
  <sando-radio value="medium" label="Medium"></sando-radio>
  <sando-radio value="large" label="Large"></sando-radio>
</sando-radio-group>
```

### Disabled

Disable the entire group or individual radios:

```html
<!-- Entire group disabled -->
<sando-radio-group name="disabled-all" label="All disabled" disabled>
  <sando-radio value="a" label="Option A"></sando-radio>
  <sando-radio value="b" label="Option B" checked></sando-radio>
</sando-radio-group>

<!-- Individual radio disabled -->
<sando-radio-group name="disabled-one" label="One disabled">
  <sando-radio value="a" label="Available"></sando-radio>
  <sando-radio value="b" label="Unavailable" disabled></sando-radio>
  <sando-radio value="c" label="Available"></sando-radio>
</sando-radio-group>
```

### Error

```html
<sando-radio-group
  name="error-demo"
  label="Required selection"
  required
  error
  error-text="Please select an option"
>
  <sando-radio value="a" label="Option A"></sando-radio>
  <sando-radio value="b" label="Option B"></sando-radio>
</sando-radio-group>
```

### Required

Displays a required indicator on the group label:

```html
<sando-radio-group name="required-demo" label="Pick one" required>
  <sando-radio value="a" label="Option A"></sando-radio>
  <sando-radio value="b" label="Option B"></sando-radio>
</sando-radio-group>
```

## Helper and Error Text

### On the Group

```html
<!-- Helper text on group -->
<sando-radio-group
  name="help-group"
  label="Shipping speed"
  helper-text="Faster shipping costs more"
>
  <sando-radio value="standard" label="Standard (5-7 days)"></sando-radio>
  <sando-radio value="express" label="Express (2-3 days)"></sando-radio>
  <sando-radio value="overnight" label="Overnight"></sando-radio>
</sando-radio-group>

<!-- Error text on group -->
<sando-radio-group
  name="error-group"
  label="Payment method"
  required
  error
  error-text="Please select a payment method"
>
  <sando-radio value="card" label="Credit Card"></sando-radio>
  <sando-radio value="paypal" label="PayPal"></sando-radio>
</sando-radio-group>
```

### On Individual Radios

Individual radios can also have their own helper text:

```html
<sando-radio-group name="plan" label="Choose a plan">
  <sando-radio
    value="free"
    label="Free"
    helper-text="Limited features, always free"
  ></sando-radio>
  <sando-radio
    value="pro"
    label="Pro"
    helper-text="All features, $9/month"
  ></sando-radio>
</sando-radio-group>
```

## Labels

### Using the `label` Property

```html
<sando-radio name="opt" value="a" label="Simple label"></sando-radio>
```

### Using the Default Slot

For rich label content:

```html
<sando-radio name="opt" value="b">
  I agree to the <a href="/terms">Terms of Service</a>
</sando-radio>
```

## Theming

### Using Flavors

Apply different theme flavors:

```html
<sando-radio-group name="themed" label="Themed radios" flavor="strawberry">
  <sando-radio value="a" label="Option A"></sando-radio>
  <sando-radio value="b" label="Option B"></sando-radio>
</sando-radio-group>
```

### Custom Styling

Override CSS custom properties for fine-grained control:

```html
<sando-radio-group
  name="custom"
  label="Custom colors"
  style="
    --sando-radio-solid-backgroundColor-checked: oklch(0.56 0.11 230);
    --sando-radio-solid-dotColor-default: oklch(1 0 0);
  "
>
  <sando-radio value="a" label="Option A"></sando-radio>
  <sando-radio value="b" label="Option B"></sando-radio>
</sando-radio-group>
```

## API Reference

### sando-radio Properties

| Property            | Attribute             | Type                   | Default      | Description                                              |
| ------------------- | --------------------- | ---------------------- | ------------ | -------------------------------------------------------- |
| `checked`           | `checked`             | `boolean`              | `false`      | Whether the radio is checked                             |
| `disabled`          | `disabled`            | `boolean`              | `false`      | Whether the radio is disabled                            |
| `required`          | `required`            | `boolean`              | `false`      | Whether required for form validation                     |
| `error`             | `error`               | `boolean`              | `false`      | Whether in error state                                   |
| `name`              | `name`                | `string`               | `undefined`  | Form field name (auto-set by radio group)                |
| `value`             | `value`               | `string`               | `'on'`       | Value when selected                                      |
| `variant`           | `variant`             | `'solid' \| 'outline'` | `'solid'`    | Visual style variant                                     |
| `size`              | `size`                | `'sm' \| 'md' \| 'lg'` | `'md'`       | Size variant                                             |
| `label`             | `label`               | `string`               | `undefined`  | Label text (alternative to default slot)                 |
| `helperText`        | `helper-text`         | `string`               | `undefined`  | Helper text displayed below the radio                    |
| `errorText`         | `error-text`          | `string`               | `undefined`  | Error message displayed when `error=true`                |
| `reserveErrorSpace` | `reserve-error-space` | `boolean`              | `true`       | Reserve space for error messages to prevent layout shift |
| `tabIndex`          | `tabindex`            | `number`               | `0`          | Tab index (managed by radio group for roving tabindex)   |
| `flavor`            | `flavor`              | `string`               | `'original'` | Design system theme flavor                               |

### sando-radio Slots

| Slot    | Description                                                                 |
| ------- | --------------------------------------------------------------------------- |
| Default | Label content (alternative to `label` prop). Supports rich HTML like links. |

### sando-radio Events

| Event          | Type                                               | Description                                       |
| -------------- | -------------------------------------------------- | ------------------------------------------------- |
| `sando-change` | `CustomEvent<{ checked: boolean, value: string }>` | Fired when radio is selected (not on deselection) |

### sando-radio Methods

| Method                | Signature                   | Description                            |
| --------------------- | --------------------------- | -------------------------------------- |
| `select()`            | `() => void`                | Select the radio (set checked to true) |
| `focus()`             | `() => void`                | Focus the radio                        |
| `blur()`              | `() => void`                | Blur the radio                         |
| `checkValidity()`     | `() => boolean`             | Check validity                         |
| `reportValidity()`    | `() => boolean`             | Report validity with browser UI        |
| `setCustomValidity()` | `(message: string) => void` | Set custom validation message          |

---

### sando-radio-group Properties

| Property      | Attribute     | Type                         | Default      | Description                                           |
| ------------- | ------------- | ---------------------------- | ------------ | ----------------------------------------------------- |
| `name`        | `name`        | `string`                     | `''`         | Name attribute for all child radios (auto-propagated) |
| `value`       | `value`       | `string`                     | `undefined`  | Currently selected value                              |
| `label`       | `label`       | `string`                     | `undefined`  | Group label text                                      |
| `helperText`  | `helper-text` | `string`                     | `undefined`  | Helper text below the group                           |
| `errorText`   | `error-text`  | `string`                     | `undefined`  | Error message (shows error state)                     |
| `error`       | `error`       | `boolean`                    | `false`      | Error state (propagates to children)                  |
| `required`    | `required`    | `boolean`                    | `false`      | Required state — displays asterisk on label           |
| `disabled`    | `disabled`    | `boolean`                    | `false`      | Disabled state (propagates to children)               |
| `orientation` | `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout orientation                                    |
| `size`        | `size`        | `'sm' \| 'md' \| 'lg'`       | `'md'`       | Size variant (propagates to children)                 |
| `flavor`      | `flavor`      | `string`                     | `'original'` | Design system theme flavor                            |

### sando-radio-group Slots

| Slot    | Description                          |
| ------- | ------------------------------------ |
| Default | `sando-radio` elements to be grouped |

### sando-radio-group Events

| Event          | Type                                           | Description                  |
| -------------- | ---------------------------------------------- | ---------------------------- |
| `sando-change` | `CustomEvent<{ value: string, name: string }>` | Fired when selection changes |

### sando-radio-group Methods

| Method               | Signature                  | Description                                |
| -------------------- | -------------------------- | ------------------------------------------ |
| `getSelectedRadio()` | `() => SandoRadio \| null` | Get the currently selected radio element   |
| `selectByValue()`    | `(value: string) => void`  | Programmatically select a radio by value   |
| `clearSelection()`   | `() => void`               | Clear the current selection                |
| `checkValidity()`    | `() => boolean`            | Check validity (required constraint)       |
| `reportValidity()`   | `() => boolean`            | Report validity with visual error feedback |

### CSS Custom Properties (sando-radio)

Key CSS variables you can override:

```css
/* Base styles */
--sando-radio-transition-duration
--sando-radio-focusOutlineColor

/* Variant-specific: solid */
--sando-radio-solid-backgroundColor-default
--sando-radio-solid-backgroundColor-checked
--sando-radio-solid-borderColor-default
--sando-radio-solid-dotColor-default

/* Size-specific: medium */
--sando-radio-size-md-boxSize
--sando-radio-size-md-dotSize
```

### CSS Custom Properties (sando-radio-group)

```css
/* Layout */
--sando-radio-group-gap
--sando-radio-group-optionsGap
--sando-radio-group-orientation-horizontal-gap

/* Label */
--sando-radio-group-label-fontSize
--sando-radio-group-label-fontWeight
--sando-radio-group-label-textColor-default
--sando-radio-group-label-textColor-disabled
--sando-radio-group-label-textColor-error

/* Helper / Error text */
--sando-radio-group-helperText-fontSize
--sando-radio-group-helperText-textColor-default
--sando-radio-group-helperText-textColor-error

/* Required indicator */
--sando-radio-group-required-textColor
```

::: tip Complete Token Reference
[See full list in Storybook](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) or check `packages/tokens/src/recipes/radio.json` and `packages/tokens/src/recipes/radio-group.json`
:::

## Framework Integration

### React

```tsx
import "@sando/components";

function App() {
  const handleChange = (e: CustomEvent) => {
    console.log("Selected:", e.detail.value);
  };

  return (
    <sando-radio-group
      name="flavor"
      label="Choose a flavor"
      onSandoChange={handleChange}
    >
      <sando-radio value="tonkatsu" label="Tonkatsu" />
      <sando-radio value="strawberry" label="Strawberry" />
      <sando-radio value="matcha" label="Matcha" />
    </sando-radio-group>
  );
}
```

### Vue 3

```vue
<template>
  <sando-radio-group
    name="flavor"
    label="Choose a flavor"
    @sando-change="handleChange"
  >
    <sando-radio value="tonkatsu" label="Tonkatsu" />
    <sando-radio value="strawberry" label="Strawberry" />
    <sando-radio value="matcha" label="Matcha" />
  </sando-radio-group>
</template>

<script setup lang="ts">
import "@sando/components";

const handleChange = (e: CustomEvent) => {
  console.log("Selected:", e.detail.value);
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
<sando-radio-group
  name="flavor"
  label="Choose a flavor"
  (sando-change)="handleChange($event)"
>
  <sando-radio value="tonkatsu" label="Tonkatsu"></sando-radio>
  <sando-radio value="strawberry" label="Strawberry"></sando-radio>
  <sando-radio value="matcha" label="Matcha"></sando-radio>
</sando-radio-group>
```

## Accessibility

The Radio and Radio Group components are built with accessibility as the foundation and follow the [WAI-ARIA Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/):

- ✅ **Roving Tabindex**: Tab enters the group, arrow keys navigate between options
- ✅ **Screen Reader Support**: `role="radiogroup"` with `aria-labelledby` and `aria-describedby`
- ✅ **Focus Management**: Visible focus indicator with sufficient contrast
- ✅ **Color Contrast**: WCAG AA compliant contrast ratios (4.5:1 for text, 3:1 for UI)
- ✅ **Touch Targets**: All sizes meet 44x44px minimum (WCAG 2.1 Level AA)
- ✅ **State Communication**: Checked, disabled, and error states announced
- ✅ **Error Association**: Error text linked via `aria-describedby` and announced as `role="alert"`

### Keyboard Navigation

| Key                | Action                                     |
| ------------------ | ------------------------------------------ |
| `Tab`              | Move focus into/out of the radio group     |
| `Arrow Down/Right` | Move to next radio and select it           |
| `Arrow Up/Left`    | Move to previous radio and select it       |
| `Home`             | Move to first radio and select it          |
| `End`              | Move to last radio and select it           |
| `Space`            | Select the focused radio (if not selected) |

### WCAG Compliance

| WCAG Criterion               | Level | Status  | Implementation                                    |
| ---------------------------- | ----- | ------- | ------------------------------------------------- |
| 1.4.3 Contrast (Minimum)     | AA    | ✅ Pass | All text meets 4.5:1 contrast ratio               |
| 2.1.1 Keyboard               | A     | ✅ Pass | Full keyboard navigation with roving tabindex     |
| 2.4.7 Focus Visible          | AA    | ✅ Pass | Visible focus indicator with 3:1 contrast         |
| 4.1.2 Name, Role, Value      | A     | ✅ Pass | `role="radiogroup"` with proper labels and states |
| 1.3.1 Info and Relationships | A     | ✅ Pass | Group label, radio labels, `aria-describedby`     |

### Screen Reader Support

- ✅ Announces radio group role and label
- ✅ Announces "X of Y" position within group
- ✅ Announces checked state ("selected" / "not selected")
- ✅ Announces disabled state
- ✅ Announces error state via `aria-invalid` and linked error text (announced as alert)

## Best Practices

### Do ✅

- Always use `sando-radio-group` to wrap related radio buttons
- Provide a descriptive `label` on the group that explains the choice
- Set a default `value` when there's a sensible default option
- Use `helper-text` on the group to explain the overall choice
- Use `helper-text` on individual radios to explain each option
- Use `orientation="horizontal"` for short lists (2-3 options) with short labels
- Use `required` when a selection is mandatory

### Don't ❌

- Don't use radios for on/off toggles — use a switch or checkbox
- Don't use radios for multi-select — use checkboxes
- Don't use standalone `sando-radio` without a group (accessibility issue)
- Don't mix radio sizes within the same group — use the `size` prop on the group
- Don't use `error` on the group without providing `error-text`
- Don't forget the `name` attribute on the group — it's required for form participation

## Examples

### Survey Question

```html
<sando-radio-group
  name="satisfaction"
  label="How satisfied are you with our service?"
  required
>
  <sando-radio value="very-satisfied" label="Very satisfied"></sando-radio>
  <sando-radio value="satisfied" label="Satisfied"></sando-radio>
  <sando-radio value="neutral" label="Neutral"></sando-radio>
  <sando-radio value="dissatisfied" label="Dissatisfied"></sando-radio>
  <sando-radio
    value="very-dissatisfied"
    label="Very dissatisfied"
  ></sando-radio>
</sando-radio-group>
```

### Pricing Plan Selector

```html
<sando-radio-group name="plan" label="Select a plan" value="pro">
  <sando-radio
    value="free"
    label="Free"
    helper-text="Basic features, up to 3 projects"
  ></sando-radio>
  <sando-radio
    value="pro"
    label="Pro — $12/mo"
    helper-text="All features, unlimited projects"
  ></sando-radio>
  <sando-radio
    value="enterprise"
    label="Enterprise — Custom"
    helper-text="Custom features, dedicated support"
  ></sando-radio>
</sando-radio-group>
```

### Programmatic Control

```html
<sando-radio-group id="color-group" name="color" label="Pick a color">
  <sando-radio value="red" label="Red"></sando-radio>
  <sando-radio value="green" label="Green"></sando-radio>
  <sando-radio value="blue" label="Blue"></sando-radio>
</sando-radio-group>

<sando-button id="select-blue">Select Blue</sando-button>
<sando-button id="clear-btn" variant="outline">Clear</sando-button>

<script>
  const group = document.getElementById("color-group");

  document.getElementById("select-blue").addEventListener("click", () => {
    group.selectByValue("blue");
  });

  document.getElementById("clear-btn").addEventListener("click", () => {
    group.clearSelection();
  });

  group.addEventListener("sando-change", (e) => {
    console.log("Selected:", e.detail.value);
  });
</script>
```

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+

## Related

- [Checkbox](/components/checkbox) — For non-exclusive multi-select options
- [Switch](/components/switch) — For instant on/off toggles
- [Form Group](/components/form-group) — For grouping form fields with labels
- [Input](/components/input) — Text input fields
- [Component Overview](/components/overview)
- [Theming Guide](/getting-started/theming)
- [Interactive Storybook Demo](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) — Explore with live controls
