---
title: Spinner Component
description: An accessible loading indicator with configurable size, arc, and color variant for signaling ongoing processes.
---

# Spinner

The `sando-spinner` component is a lightweight, accessible loading indicator that uses an inline SVG with a rotating arc. Think of it as the timer on your oven — it tells your users something good is being prepared, so they know to wait for it.

## Features

- ✅ **Fully Tested**: Comprehensive unit and E2E tests
- ♿ **Accessible**: Uses `role="status"` with configurable `aria-label` for screen readers
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support
- ⚡ **Performant**: Pure SVG animation, no JS animation loops
- 🎛️ **Configurable Arc**: Control how much of the circle is visible

## Basic Usage

```html
<!-- Import the component -->
<script type="module">
  import "@sando/components";
</script>

<!-- Use it -->
<sando-spinner></sando-spinner>
```

::: tip Import Path
`import "@sando/components"` registers all components. The spinner is also the component used internally by `sando-button` in its loading state.
:::

## Sizes

Five size options to fit different contexts — from inline text indicators to full overlay spinners:

```html
<sando-spinner size="xs"></sando-spinner>
<!-- 12px -->
<sando-spinner size="sm"></sando-spinner>
<!-- 16px -->
<sando-spinner size="md"></sando-spinner>
<!-- 24px (Default) -->
<sando-spinner size="lg"></sando-spinner>
<!-- 32px -->
<sando-spinner size="xl"></sando-spinner>
<!-- 48px -->
```

## Variants

### Default

For use on light backgrounds.

```html
<sando-spinner variant="default"></sando-spinner>
```

### Inverted

For use on dark backgrounds where the default color wouldn't have enough contrast.

```html
<div style="background: oklch(0.25 0.01 260); padding: 1rem;">
  <sando-spinner variant="inverted"></sando-spinner>
</div>
```

## Arc Control

The `arc` prop controls how much of the circle is visible, ranging from `0.1` (small sliver) to `1.0` (full circle). The default is `0.25` — a quarter turn, like the perfect ratio of filling to bread.

```html
<sando-spinner arc="0.1"></sando-spinner>
<!-- Thin sliver -->
<sando-spinner arc="0.25"></sando-spinner>
<!-- Quarter (Default) -->
<sando-spinner arc="0.5"></sando-spinner>
<!-- Half circle -->
<sando-spinner arc="0.75"></sando-spinner>
<!-- Three quarters -->
<sando-spinner arc="1.0"></sando-spinner>
<!-- Full circle -->
```

::: info Arc Behavior
Values outside the `0.1–1.0` range will be clamped. An arc of `1.0` renders a full circle, which still rotates but has no visible gap.
:::

## Custom Label

The `label` prop sets the `aria-label` for screen readers. Default is `"Loading"`.

```html
<sando-spinner label="Saving your changes"></sando-spinner>
<sando-spinner label="Fetching results"></sando-spinner>
```

## Theming

### Using Flavors

Apply different theme flavors to match context:

```html
<sando-spinner flavor="original"></sando-spinner>
<sando-spinner flavor="strawberry"></sando-spinner>
```

### Custom Styling

Override CSS custom properties for fine-grained control. All color values use OKLCH:

```html
<sando-spinner
  style="
    --sando-spinner-color-default: oklch(0.65 0.20 145);
    --sando-spinner-animation-duration: 1200ms;
  "
></sando-spinner>
```

```html
<!-- Larger stroke, slower spin -->
<sando-spinner
  size="xl"
  style="
    --sando-spinner-color-default: oklch(0.56 0.11 230);
    --sando-spinner-animation-duration: 1000ms;
    --sando-spinner-animation-easing: ease-in-out;
  "
></sando-spinner>
```

## API Reference

### Properties

| Property  | Attribute | Type                                   | Default      | Description                                    |
| --------- | --------- | -------------------------------------- | ------------ | ---------------------------------------------- |
| `size`    | `size`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`       | Size of the spinner                            |
| `variant` | `variant` | `'default' \| 'inverted'`              | `'default'`  | Color variant for light or dark backgrounds    |
| `label`   | `label`   | `string`                               | `'Loading'`  | Accessible label for screen readers            |
| `arc`     | `arc`     | `number`                               | `0.25`       | Arc percentage (0.1–1.0) of the visible circle |
| `flavor`  | `flavor`  | `string`                               | `'original'` | Design system theme flavor                     |

### CSS Custom Properties

```css
/* Size tokens */
--sando-spinner-size-xs       /* 12px */
--sando-spinner-size-sm       /* 16px */
--sando-spinner-size-md       /* 24px */
--sando-spinner-size-lg       /* 32px */
--sando-spinner-size-xl       /* 48px */

/* Color tokens */
--sando-spinner-color-default
--sando-spinner-color-inverted

/* Animation tokens */
--sando-spinner-animation-duration   /* 700ms */
--sando-spinner-animation-easing     /* linear */

/* Stroke width per size */
--sando-spinner-stroke-xs
--sando-spinner-stroke-sm
--sando-spinner-stroke-md
--sando-spinner-stroke-lg
--sando-spinner-stroke-xl
```

::: tip Complete Token Reference
[See full list in Storybook](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) or check `packages/tokens/src/recipes/spinner.json`
:::

## Framework Integration

### React

```tsx
import "@sando/components";
import type { SandoSpinner } from "@sando/components";

function App() {
  return <sando-spinner size="md" label="Loading data"></sando-spinner>;
}
```

### Vue 3

```vue
<template>
  <sando-spinner size="md" label="Loading data"></sando-spinner>
</template>

<script setup lang="ts">
import "@sando/components";
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
<sando-spinner size="md" label="Loading data"></sando-spinner>
```

## Accessibility

The Spinner component uses native ARIA patterns to communicate loading state to assistive technology:

- ✅ **`role="status"`**: Announces the spinner as a live status region
- ✅ **`aria-label`**: Configurable label (defaults to "Loading")
- ✅ **Screen Reader Friendly**: Announced without interrupting user flow
- ✅ **No Motion Preference**: Respects `prefers-reduced-motion` by reducing or pausing animation
- ✅ **Color Contrast**: Both variants meet WCAG AA contrast requirements against their intended backgrounds

## Best Practices

### Do ✅

- Use `size="sm"` or `size="xs"` when placing the spinner inline with text or inside buttons
- Use `size="xl"` for full-page or overlay loading states
- Provide a descriptive `label` when the loading context isn't obvious (e.g., `label="Uploading file"`)
- Use `variant="inverted"` on dark backgrounds to maintain contrast
- Pair the spinner with visible loading text when the wait may be long

### Don't ❌

- Don't use a spinner for operations that complete in under 100ms — it causes visual noise
- Don't leave the spinner visible after loading completes — always clean up
- Don't use `arc="1.0"` unless you have a specific design reason (no visible progress cue)
- Don't rely solely on the spinner to communicate state — combine with text for clarity

## Examples

### Inside a Button (Loading State)

The spinner is the same component `sando-button` uses internally when `loading` is set. You can also compose it manually:

```html
<sando-button disabled>
  <sando-spinner size="xs" variant="inverted"></sando-spinner>
  Saving...
</sando-button>
```

### Full-Page Loading Overlay

```html
<div
  style="
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: oklch(0.15 0.01 260 / 0.6);
    z-index: 1000;
  "
>
  <sando-spinner
    size="xl"
    variant="inverted"
    label="Loading application"
  ></sando-spinner>
</div>
```

### Inline Loading Indicator

```html
<p>
  Fetching results
  <sando-spinner size="xs" label="Fetching results"></sando-spinner>
</p>
```

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+

## Related

- [Button Component](/components/button) — uses `sando-spinner` in its loading state
- [Component Overview](/components/overview)
- [Theming Guide](/getting-started/theming)
- [Token Architecture](/tokens/architecture)
- [Design Tokens](/tokens/recipes)
- [Interactive Storybook Demo](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) — Explore with live controls
