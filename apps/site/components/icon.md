---
title: Icon Component
description: A performant, accessible icon component powered by Lucide Icons with lazy loading, multiple sizes, color variants, transformations, and full theming support.
---

# Icon

The `sando-icon` component renders any of 1,637+ Lucide Icons with lazy loading, multiple sizes, color variants, and transformations. Think of it as the garnish on your Sando — small in portion but essential for presentation. Icons scale with your font sizes, so they always sit in visual harmony with surrounding text.

## Features

- ✅ **Fully Tested**: Comprehensive unit and E2E tests
- ♿ **Accessible**: Decorative and semantic modes with proper ARIA handling
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support with `IconName` type for autocomplete
- ⚡ **Performant**: Lazy-loaded SVGs via Vite `?raw` imports — only what you use ships
- 🎯 **1,637+ Icons**: Full Lucide Icons library at your fingertips
- 🔄 **Transformable**: Rotate, flip, and adjust stroke width on the fly
- 🎨 **Color Variants**: Five semantic color options plus custom color override

## Basic Usage

```html
<!-- Import the component -->
<script type="module">
  import "@sando/components";
</script>

<!-- Use it -->
<sando-icon name="heart"></sando-icon>
```

::: tip Import Path
Use `import "@sando/components"` to register all components at once. This ensures `sando-icon` and any other components you need are available without individual imports.
:::

## Sizes

Five size presets that align with the typographic scale — so icons always look right next to text, like a perfectly proportioned layer in a sandwich:

```html
<sando-icon name="star" size="xs"></sando-icon>
<!-- 12px — matches font.size.100 -->
<sando-icon name="star" size="sm"></sando-icon>
<!-- 14px — matches font.size.200 -->
<sando-icon name="star" size="md"></sando-icon>
<!-- 18px — matches font.size.400 (Default) -->
<sando-icon name="star" size="lg"></sando-icon>
<!-- 24px — matches font.size.600 -->
<sando-icon name="star" size="xl"></sando-icon>
<!-- 32px — matches font.size.700 -->
```

::: tip Typographic Harmony
Each size maps to a font size token so icons sit flush with adjacent text. Use `md` for body copy, `sm` for captions, and `lg`/`xl` for headings or hero sections.
:::

## Colors

Five semantic color variants to match intent and context:

```html
<sando-icon name="circle" color="default"></sando-icon>
<!-- Standard text color -->
<sando-icon name="circle" color="muted"></sando-icon>
<!-- Subdued, secondary -->
<sando-icon name="circle" color="emphasis"></sando-icon>
<!-- High contrast -->
<sando-icon name="circle" color="brand"></sando-icon>
<!-- Brand accent -->
<sando-icon name="circle" color="onSolid"></sando-icon>
<!-- For use on solid backgrounds -->
```

## Custom Color and Size

Override the preset values when you need something specific:

```html
<!-- Custom color using OKLCH -->
<sando-icon name="flame" custom-color="oklch(0.7 0.15 30)"></sando-icon>

<!-- Custom size -->
<sando-icon name="flame" custom-size="48px"></sando-icon>

<!-- Both -->
<sando-icon
  name="flame"
  custom-color="oklch(0.65 0.2 25)"
  custom-size="64px"
></sando-icon>
```

::: info
When `custom-color` or `custom-size` is set, it takes precedence over the `color` and `size` props respectively.
:::

## Transformations

Rotate and flip icons without needing CSS overrides:

### Rotation

```html
<sando-icon name="arrow-right" rotate="0"></sando-icon>
<!-- Default -->
<sando-icon name="arrow-right" rotate="90"></sando-icon>
<!-- Points down -->
<sando-icon name="arrow-right" rotate="180"></sando-icon>
<!-- Points left -->
<sando-icon name="arrow-right" rotate="270"></sando-icon>
<!-- Points up -->
```

### Flipping

```html
<sando-icon name="message-circle" flip-horizontal></sando-icon>
<sando-icon name="message-circle" flip-vertical></sando-icon>

<!-- Combine both -->
<sando-icon name="message-circle" flip-horizontal flip-vertical></sando-icon>
```

### Combining Transformations

```html
<sando-icon name="corner-up-right" rotate="90" flip-horizontal></sando-icon>
```

## Inherit Color

Let the icon pick up whatever text color its parent uses — useful for buttons, links, and interactive elements where the icon should follow the text:

```html
<a href="/home" style="color: oklch(0.56 0.11 230);">
  <sando-icon name="home" inherit-color></sando-icon>
  Go Home
</a>
```

```html
<p style="color: oklch(0.45 0.1 150);">
  <sando-icon name="check" inherit-color></sando-icon>
  Task complete
</p>
```

## Stroke Width

Adjust the SVG stroke width for thinner or bolder icon weight:

```html
<sando-icon name="heart" stroke-width="1"></sando-icon>
<!-- Thin -->
<sando-icon name="heart" stroke-width="2"></sando-icon>
<!-- Default -->
<sando-icon name="heart" stroke-width="3"></sando-icon>
<!-- Bold -->
```

## Theming

### Using Flavors

Apply different theme flavors:

```html
<sando-icon name="star" flavor="original"></sando-icon>
<sando-icon name="star" flavor="strawberry"></sando-icon>
```

### Custom Styling

Override CSS custom properties for fine-grained control. All color values use OKLCH:

```html
<sando-icon
  name="zap"
  style="
    --sando-icon-color-brand: oklch(0.72 0.19 58);
    --sando-icon-size-md: 22px;
  "
  color="brand"
></sando-icon>
```

```html
<!-- Override multiple properties at a container level -->
<div
  style="
    --sando-icon-color-default: oklch(0.45 0.03 260);
    --sando-icon-color-muted: oklch(0.65 0.02 260);
  "
>
  <sando-icon name="sun" color="default"></sando-icon>
  <sando-icon name="moon" color="muted"></sando-icon>
</div>
```

## API Reference

### Properties

| Property         | Attribute         | Type                                                         | Default      | Description                                        |
| ---------------- | ----------------- | ------------------------------------------------------------ | ------------ | -------------------------------------------------- |
| `name`           | `name`            | `IconName` (string)                                          | _required_   | Name of the Lucide icon to display                 |
| `size`           | `size`            | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                       | `'md'`       | Icon size preset (scales with font sizes)          |
| `color`          | `color`           | `'default' \| 'muted' \| 'emphasis' \| 'brand' \| 'onSolid'` | `'default'`  | Semantic color variant                             |
| `customColor`    | `custom-color`    | `string`                                                     | `undefined`  | Custom CSS color value (overrides `color`)         |
| `customSize`     | `custom-size`     | `string`                                                     | `undefined`  | Custom CSS dimension value (overrides `size`)      |
| `flipHorizontal` | `flip-horizontal` | `boolean`                                                    | `false`      | Flip the icon horizontally                         |
| `flipVertical`   | `flip-vertical`   | `boolean`                                                    | `false`      | Flip the icon vertically                           |
| `rotate`         | `rotate`          | `0 \| 90 \| 180 \| 270`                                      | `0`          | Rotation angle in degrees                          |
| `ariaLabel`      | `aria-label`      | `string \| null`                                             | `null`       | Accessible label for screen readers                |
| `decorative`     | `decorative`      | `boolean`                                                    | `false`      | Whether icon is purely decorative (hidden from AT) |
| `strokeWidth`    | `stroke-width`    | `number`                                                     | `2`          | SVG stroke width                                   |
| `inheritColor`   | `inherit-color`   | `boolean`                                                    | `false`      | Inherit color from parent text color               |
| `flavor`         | `flavor`          | `string`                                                     | `'original'` | Design system theme flavor                         |

### Events

| Event        | Type                                                  | Description                            |
| ------------ | ----------------------------------------------------- | -------------------------------------- |
| `icon-load`  | `CustomEvent<{ iconName: string, success: boolean }>` | Fired when icon SVG loads successfully |
| `icon-error` | `CustomEvent<{ iconName: string, error: string }>`    | Fired when icon SVG fails to load      |

### CSS Custom Properties

Key CSS variables you can override:

```css
/* Size tokens */
--sando-icon-size-xs    /* 12px — font.size.100 */
--sando-icon-size-sm    /* 14px — font.size.200 */
--sando-icon-size-md    /* 18px — font.size.400 */
--sando-icon-size-lg    /* 24px — font.size.600 */
--sando-icon-size-xl    /* 32px — font.size.700 */

/* Color tokens */
--sando-icon-color-default
--sando-icon-color-muted
--sando-icon-color-emphasis
--sando-icon-color-brand
--sando-icon-color-onSolid
```

::: tip Complete Token Reference
[See full list in Storybook](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) or check `packages/tokens/src/recipes/icon.json`
:::

## Framework Integration

### React

```tsx
import "@sando/components";
import type { SandoIcon } from "@sando/components";

function App() {
  const handleLoad = (
    e: CustomEvent<{ iconName: string; success: boolean }>,
  ) => {
    console.log("Icon loaded:", e.detail.iconName);
  };

  return (
    <sando-icon name="heart" size="lg" color="brand" onIcon-load={handleLoad} />
  );
}
```

### Vue 3

```vue
<template>
  <sando-icon name="heart" size="lg" color="brand" @icon-load="handleLoad" />
</template>

<script setup lang="ts">
import "@sando/components";

const handleLoad = (e: CustomEvent) => {
  console.log("Icon loaded:", e.detail.iconName);
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
<sando-icon
  name="heart"
  size="lg"
  color="brand"
  (icon-load)="handleLoad($event)"
></sando-icon>
```

## Accessibility

The Icon component distinguishes between **decorative** and **semantic** icons — a critical distinction for screen reader users.

### Decorative Icons

Icons that are purely visual and convey no information the user needs. Screen readers skip these entirely.

```html
<!-- Decorative: the text already communicates the meaning -->
<sando-button>
  <sando-icon name="trash-2" decorative></sando-icon>
  Delete Item
</sando-button>

<!-- Decorative: icon adds visual flair, not meaning -->
<h2>
  <sando-icon name="sparkles" decorative></sando-icon>
  What's New
</h2>
```

When `decorative` is set, the component applies `aria-hidden="true"` and `role="presentation"` so assistive technology ignores the icon.

### Semantic Icons

Icons that convey meaning on their own — where no adjacent text explains the action. These **must** have an `aria-label`.

```html
<!-- Semantic: icon is the only indicator of the action -->
<sando-icon name="x" aria-label="Close dialog"></sando-icon>

<!-- Semantic: standalone icon button -->
<button>
  <sando-icon name="search" aria-label="Search"></sando-icon>
</button>

<!-- Semantic: status indicator -->
<sando-icon
  name="check-circle"
  aria-label="Verified"
  color="brand"
></sando-icon>
```

::: warning Always Choose One
Every icon should be either `decorative` or have an `aria-label`. An icon with neither leaves screen reader users guessing. An icon with both is contradictory — the `decorative` prop takes precedence.
:::

### Decision Guide

| Scenario                               | Approach                          |
| -------------------------------------- | --------------------------------- |
| Icon next to descriptive text          | `decorative`                      |
| Icon-only button or link               | `aria-label="Action description"` |
| Icon conveying status (success, error) | `aria-label="Status meaning"`     |
| Purely visual flourish                 | `decorative`                      |

## Best Practices

### Do ✅

- Use `decorative` for icons paired with visible text
- Provide `aria-label` for standalone icons that convey meaning
- Use semantic `color` variants (`brand`, `emphasis`) rather than hardcoding colors
- Use `size` presets to stay consistent with the typographic scale
- Use `inherit-color` when an icon lives inside an interactive element (buttons, links)
- Listen for `icon-error` to handle missing or mistyped icon names gracefully
- Use `stroke-width` to match the visual weight of surrounding content
- Prefer named sizes over `custom-size` for design consistency

### Don't ❌

- Don't leave an icon without either `decorative` or `aria-label`
- Don't use `custom-color` with raw hex or RGB — use OKLCH values for theme consistency
- Don't set both `decorative` and `aria-label` on the same icon
- Don't use icons as the sole indicator of critical information without a text alternative
- Don't hardcode pixel sizes with `custom-size` when a preset `size` works
- Don't ignore `icon-error` events — a broken icon is worse than no icon

## Examples

### Icon with Text

```html
<p>
  <sando-icon name="info" size="sm" color="muted" decorative></sando-icon>
  Your changes have been saved.
</p>
```

### Standalone Status Indicator

```html
<sando-icon
  name="check-circle"
  color="brand"
  aria-label="Verified account"
></sando-icon>
<span>rodrigolago</span>
```

### Directional Navigation

```html
<nav aria-label="Pagination">
  <button aria-label="Previous page">
    <sando-icon name="chevron-left" decorative></sando-icon>
  </button>
  <span>Page 3 of 12</span>
  <button aria-label="Next page">
    <sando-icon name="chevron-right" decorative></sando-icon>
  </button>
</nav>
```

### Error Handling

```html
<sando-icon id="my-icon" name="rocket"></sando-icon>

<script>
  const icon = document.getElementById("my-icon");
  icon.addEventListener("icon-error", (e) => {
    console.error(`Failed to load icon: ${e.detail.iconName}`, e.detail.error);
  });
</script>
```

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+

## Related

- [Component Overview](/components/overview)
- [Button Component](/components/button) — uses `sando-icon` for icon slots
- [Theming Guide](/getting-started/theming)
- [Token Architecture](/tokens/architecture)
- [Design Tokens](/tokens/recipes)
- [Interactive Storybook Demo](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) — Explore with live controls
