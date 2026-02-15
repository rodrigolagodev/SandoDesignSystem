---
title: Button Component
description: A fully accessible button component with multiple variants, sizes, states, icon support, toggle behavior, and link rendering.
---

# Button

The `sando-button` component is a versatile, accessible button with multiple variants, sizes, states, and can render as either a button or link. It's the workhorse of any UI — like the bread that holds your Sando together.

## Features

- ✅ **Fully Tested**: Comprehensive unit and E2E tests
- ♿ **Accessible**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support
- ⚡ **Performant**: Lightweight (<8KB gzipped)
- 🔗 **Dual Mode**: Works as button or link (with href attribute)
- 🎯 **Icon Support**: Multiple ways to add icons (slots or props)
- 🔘 **Toggle Support**: Built-in toggle button functionality with aria-pressed

## Basic Usage

```html
<!-- Import the component -->
<script type="module">
  import "@sando/components/button";
</script>

<!-- Use it -->
<sando-button variant="solid"> Click me </sando-button>
```

## Variants

The button comes in four visual styles:

### Solid (Default)

High emphasis button with filled background.

```html
<sando-button variant="solid">Solid Button</sando-button>
```

### Outline

Medium emphasis button with border.

```html
<sando-button variant="outline">Outline Button</sando-button>
```

### Ghost

Low emphasis button without background or border.

```html
<sando-button variant="ghost">Ghost Button</sando-button>
```

### Text

Minimal text-only button (useful for inline links).

```html
<sando-button variant="text">Text Button</sando-button>
```

## Sizes

Three WCAG-compliant size options for different contexts:

```html
<sando-button size="sm">Small</sando-button>
<sando-button size="md">Medium (Default)</sando-button>
<sando-button size="lg">Large</sando-button>
```

::: tip Touch Target Compliance
All button sizes meet WCAG 2.1 Level AA minimum touch target size of 44x44px through padding adjustments.
:::

## Status

Convey different semantic meanings:

```html
<sando-button status="default">Default</sando-button>
<sando-button status="success">Success</sando-button>
<sando-button status="destructive">Destructive</sando-button>
```

## States

### Disabled

```html
<sando-button disabled>Disabled Button</sando-button>
```

### Loading

Shows a loading spinner and prevents interaction.

```html
<sando-button loading>Loading...</sando-button>
```

## Full Width

Make the button span the full container width:

```html
<sando-button full-width>Full Width Button</sando-button>
```

## Compact Mode

Reduces horizontal padding for toolbars, button groups, or space-constrained layouts:

```html
<sando-button compact>Compact</sando-button>
<sando-button compact size="sm">Compact Small</sando-button>
```

## With Icons

### Method 1: Using Properties (Recommended)

The simplest way to add icons using the `start-icon` and `end-icon` properties:

```html
<sando-button start-icon="⭐">Favorite</sando-button>
<sando-button end-icon="→">Next Page</sando-button>
<sando-button start-icon="💾" end-icon="✓">Save</sando-button>
```

### Method 2: Using Slots (Advanced)

For more complex icon requirements or when using icon components:

```html
<sando-button>
  <span slot="icon-start">⭐</span>
  Favorite
</sando-button>

<sando-button>
  Send
  <span slot="icon-end">→</span>
</sando-button>
```

### Icon-Only Buttons

For buttons with only an icon and no text (must provide `aria-label` for accessibility):

```html
<sando-button icon-only aria-label="Settings">
  <span slot="icon-start">⚙️</span>
</sando-button>

<!-- Circular icon button -->
<sando-button icon-only radius="full" aria-label="Add item">
  <span slot="icon-start">➕</span>
</sando-button>
```

## Border Radius

Control the button's corner rounding:

```html
<sando-button radius="none">No Radius</sando-button>
<sando-button radius="default">Default</sando-button>
<sando-button radius="full">Fully Rounded (Pill)</sando-button>
```

::: tip Perfect Circles
Use `radius="full"` with `icon-only` to create circular icon buttons.
:::

## As Link (href)

Render the button as an anchor tag by providing an `href` attribute:

```html
<!-- Basic link -->
<sando-button href="/about">About Us</sando-button>

<!-- External link with target -->
<sando-button href="https://example.com" target="_blank">
  Visit Site
</sando-button>

<!-- Download link -->
<sando-button href="/files/document.pdf" download> Download PDF </sando-button>
```

::: info Security
When using `target="_blank"`, the component automatically adds `rel="noopener noreferrer"` for security unless you specify a custom `rel` attribute.
:::

## Toggle Buttons

Create toggle buttons with active/inactive states:

```html
<sando-button toggle active> 🔔 Notifications Enabled </sando-button>

<sando-button toggle> 🔕 Notifications Disabled </sando-button>
```

Toggle buttons automatically include `aria-pressed` for screen reader support.

### Toggle Button with JavaScript

```html
<sando-button id="filter-btn" toggle> Filter Active </sando-button>

<script>
  const btn = document.getElementById("filter-btn");
  btn.addEventListener("click", () => {
    btn.active = !btn.active;
    console.log("Filter is now:", btn.active ? "ON" : "OFF");
  });
</script>
```

## Theming

### Using Flavors

Apply different theme flavors:

```html
<sando-button flavor="original">Original Theme</sando-button>
<sando-button flavor="strawberry">Strawberry Theme</sando-button>
```

### Custom Styling

Override CSS custom properties for fine-grained control:

```html
<sando-button
  style="
    --sando-button-solid-backgroundColor-default: oklch(0.56 0.11 230);
    --sando-button-solid-textColor-default: oklch(1 0 0);
  "
>
  Custom Colors
</sando-button>
```

## API Reference

### Properties

| Property    | Attribute    | Type                                         | Default      | Description                                    |
| ----------- | ------------ | -------------------------------------------- | ------------ | ---------------------------------------------- |
| `variant`   | `variant`    | `'solid' \| 'outline' \| 'ghost' \| 'text'`  | `'solid'`    | Visual style variant                           |
| `size`      | `size`       | `'sm' \| 'md' \| 'lg'`                       | `'md'`       | Button size (all WCAG compliant)               |
| `status`    | `status`     | `'default' \| 'success' \| 'destructive'`    | `'default'`  | Status variant for semantic meaning            |
| `radius`    | `radius`     | `'none' \| 'default' \| 'full'`              | `'default'`  | Border radius variant                          |
| `disabled`  | `disabled`   | `boolean`                                    | `false`      | Whether the button is disabled                 |
| `loading`   | `loading`    | `boolean`                                    | `false`      | Whether the button is in loading state         |
| `type`      | `type`       | `'button' \| 'submit' \| 'reset'`            | `'button'`   | Button type for forms                          |
| `fullWidth` | `full-width` | `boolean`                                    | `false`      | Whether button takes full width                |
| `compact`   | `compact`    | `boolean`                                    | `false`      | Reduces padding for compact layouts            |
| `iconOnly`  | `icon-only`  | `boolean`                                    | `false`      | Square shape for icon-only buttons             |
| `toggle`    | `toggle`     | `boolean`                                    | `false`      | Enable toggle button behavior                  |
| `active`    | `active`     | `boolean`                                    | `false`      | Active/pressed state (for toggles)             |
| `flavor`    | `flavor`     | `string`                                     | `'original'` | Design system theme flavor                     |
| `href`      | `href`       | `string`                                     | `undefined`  | URL (renders as `<a>` instead of `<button>`)   |
| `target`    | `target`     | `'_self' \| '_blank' \| '_parent' \| '_top'` | `'_self'`    | Where to open linked document                  |
| `rel`       | `rel`        | `string`                                     | `undefined`  | Relationship to linked document                |
| `download`  | `download`   | `string \| boolean`                          | `undefined`  | Download linked resource                       |
| `startIcon` | `start-icon` | `string`                                     | `undefined`  | Icon to display at start (alternative to slot) |
| `endIcon`   | `end-icon`   | `string`                                     | `undefined`  | Icon to display at end (alternative to slot)   |
| `ariaLabel` | `aria-label` | `string \| null`                             | `null`       | Accessible label (overrides visible text)      |

### Slots

| Slot         | Description                            |
| ------------ | -------------------------------------- |
| Default      | Button content (text, icons, etc.)     |
| `icon-start` | Icon or content before the button text |
| `icon-end`   | Icon or content after the button text  |

### Events

| Event   | Type          | Description                                               |
| ------- | ------------- | --------------------------------------------------------- |
| `click` | `CustomEvent` | Fired when button is clicked (unless disabled or loading) |

### CSS Custom Properties

Key CSS variables you can override:

```css
/* Base styles */
--sando-button-fontFamily
--sando-button-fontWeight
--sando-button-borderRadius
--sando-button-transition-duration

/* Variant-specific (solid/outline/ghost) */
--sando-button-solid-backgroundColor-default
--sando-button-solid-backgroundColor-hover
--sando-button-solid-backgroundColor-active
--sando-button-solid-textColor-default

/* Size-specific */
--sando-button-size-md-paddingBlock
--sando-button-size-md-paddingInline
--sando-button-size-md-fontSize
--sando-button-size-md-minHeight

/* Status-specific */
--sando-button-status-success-backgroundColor
--sando-button-status-destructive-backgroundColor
```

::: tip Complete Token Reference
[See full list in Storybook](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) or check `packages/tokens/src/recipes/button.json`
:::

## Framework Integration

### React

```tsx
import "@sando/components/button";
import type { SandoButton } from "@sando/components";

function App() {
  const handleClick = (e: CustomEvent) => {
    console.log("Button clicked!", e.detail);
  };

  return (
    <sando-button variant="solid" size="md" onClick={handleClick}>
      Click me
    </sando-button>
  );
}
```

### Vue 3

```vue
<template>
  <sando-button variant="solid" size="md" @click="handleClick">
    Click me
  </sando-button>
</template>

<script setup lang="ts">
import "@sando/components/button";

const handleClick = (e: CustomEvent) => {
  console.log("Button clicked!", e.detail);
};
</script>
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@sando/components/button";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

```html
<!-- component.html -->
<sando-button variant="solid" size="md" (click)="handleClick($event)">
  Click me
</sando-button>
```

## Accessibility

The Button component is built with accessibility in mind and exceeds WCAG 2.1 Level AA requirements:

- ✅ **Keyboard Navigation**: Full keyboard support (Space/Enter)
- ✅ **Screen Reader Support**: Proper ARIA labels, roles, and live regions
- ✅ **Focus Management**: Visible focus indicator with sufficient contrast
- ✅ **Color Contrast**: WCAG AA compliant contrast ratios (4.5:1 for text, 3:1 for UI)
- ✅ **Touch Targets**: All sizes meet 44x44px minimum (WCAG 2.1 Level AA)
- ✅ **State Communication**: Loading, disabled, and pressed states announced
- ✅ **Toggle Support**: Built-in `aria-pressed` for toggle buttons
- ✅ **Icon-Only Support**: Requires `aria-label` for screen readers
- ✅ **Loading States**: Includes `aria-busy` and `aria-live="polite"`

### Keyboard Shortcuts

| Key           | Action                 |
| ------------- | ---------------------- |
| `Space`       | Activate button        |
| `Enter`       | Activate button        |
| `Tab`         | Focus next element     |
| `Shift + Tab` | Focus previous element |

### ARIA Attributes

The component automatically manages these ARIA attributes:

- `aria-label` - Custom label (overrides visible text)
- `aria-pressed` - Toggle state (when `toggle` prop is true)
- `aria-disabled` - Disabled state
- `aria-busy` - Loading state
- `aria-live="polite"` - Loading state announcements

## Best Practices

### Do ✅

- Use `variant="solid"` for primary actions (one per context)
- Use `variant="outline"` for secondary actions
- Use `variant="ghost"` for tertiary/subtle actions
- Use `variant="text"` for inline text links
- Use `status="destructive"` for dangerous actions (delete, remove, etc.)
- Provide clear, action-oriented labels ("Save Changes", not "Click Here")
- Use `loading` state for async operations
- Add `aria-label` to `icon-only` buttons
- Use `toggle` prop for on/off states (filters, settings)
- Use `href` instead of `onClick` navigation when possible (better for SEO and accessibility)
- Combine `radius="full"` with `icon-only` for circular buttons
- Use `compact` for toolbars and button groups where space is limited

### Don't ❌

- Don't use multiple solid buttons in the same context (only one primary action)
- Don't use red/destructive for non-dangerous actions
- Don't disable buttons without explaining why (use tooltips or helper text)
- Don't use generic labels like "Click here" or "Submit"
- Don't nest interactive elements inside buttons
- Don't forget `aria-label` on icon-only buttons

## Examples

### Form Submit Button

```html
<form>
  <sando-button type="submit" variant="solid" full-width>
    Submit Form
  </sando-button>
</form>
```

### Destructive Action

```html
<sando-button variant="outline" status="destructive" start-icon="🗑️">
  Delete Item
</sando-button>
```

### Loading State with Async Action

```html
<sando-button id="save-btn" variant="solid"> Save Changes </sando-button>

<script>
  const button = document.getElementById("save-btn");
  button.addEventListener("click", async () => {
    button.loading = true;
    try {
      await saveData();
    } finally {
      button.loading = false;
    }
  });
</script>
```

### Navigation Link Button

```html
<!-- Internal navigation -->
<sando-button href="/dashboard" variant="solid"> Go to Dashboard </sando-button>

<!-- External link with icon -->
<sando-button
  href="https://github.com"
  target="_blank"
  variant="outline"
  end-icon="↗"
>
  View on GitHub
</sando-button>
```

### Icon-Only Circular Buttons

```html
<!-- Floating action button -->
<sando-button icon-only radius="full" size="lg" aria-label="Add new item">
  <span slot="icon-start">➕</span>
</sando-button>

<!-- Small icon buttons for toolbar -->
<sando-button icon-only radius="full" size="sm" aria-label="Edit">
  <span slot="icon-start">✏️</span>
</sando-button>
<sando-button icon-only radius="full" size="sm" aria-label="Delete">
  <span slot="icon-start">🗑️</span>
</sando-button>
```

### Toggle Button Group

```html
<div role="group" aria-label="Text formatting">
  <sando-button toggle id="bold-btn" aria-label="Bold">
    <strong>B</strong>
  </sando-button>
  <sando-button toggle id="italic-btn" aria-label="Italic">
    <em>I</em>
  </sando-button>
  <sando-button toggle id="underline-btn" aria-label="Underline">
    <u>U</u>
  </sando-button>
</div>

<script>
  ["bold", "italic", "underline"].forEach((format) => {
    const btn = document.getElementById(`${format}-btn`);
    btn.addEventListener("click", () => {
      btn.active = !btn.active;
      document.execCommand(format);
    });
  });
</script>
```

### Button with Multiple Icons

```html
<sando-button start-icon="⬇" end-icon="✓" variant="solid" status="success">
  Download Complete
</sando-button>
```

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+

## Related

- [Component Overview](/components/overview)
- [Theming Guide](/getting-started/theming)
- [Token Architecture](/tokens/architecture)
- [Design Tokens](/tokens/recipes)
