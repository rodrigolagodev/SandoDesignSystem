---
title: Skeleton Component
description: An accessible loading placeholder system with configurable shapes, animation effects, and pre-composed layouts for content loading states.
---

# Skeleton

The `sando-skeleton` component is a lightweight, accessible loading placeholder that reduces perceived wait time by showing users where content will appear. Think of it as the mise en place of your UI — everything laid out and ready before the real ingredients arrive.

## Features

- ✅ **Fully Tested**: Comprehensive unit and accessibility tests
- ♿ **Accessible**: `role="presentation"` and `aria-hidden="true"` by default
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support
- ⚡ **Performant**: Lightweight with GPU-accelerated animations
- 🧩 **Composable**: Base primitive + 14 pre-composed layouts
- 🎭 **Three Effects**: Shimmer, pulse, or static — with `prefers-reduced-motion` support
- 📐 **Four Shapes**: Text, circular, rectangular, and rounded

## Basic Usage

```html
<!-- Import the component -->
<script type="module">
  import "@sando/components";
</script>

<!-- Use it -->
<sando-skeleton></sando-skeleton>
```

::: tip Import Path
Use `import "@sando/components"` to register all components, including skeleton primitives and compositions. This is the recommended import for most projects.
:::

## Base Skeleton (`sando-skeleton`)

The base component is the fundamental building block. Configure its appearance with `shape` and `effect` attributes, and control dimensions with `width` and `height`.

### Shapes

Each shape applies a different border-radius, suited for the type of content it represents:

```html
<!-- Text: small border-radius, for text line placeholders -->
<sando-skeleton shape="text" width="100%" height="1em"></sando-skeleton>

<!-- Circular: 50% border-radius, for avatars and icons -->
<sando-skeleton shape="circular" width="48px" height="48px"></sando-skeleton>

<!-- Rectangular: no border-radius, for sharp-edge containers -->
<sando-skeleton
  shape="rectangular"
  width="200px"
  height="150px"
></sando-skeleton>

<!-- Rounded: medium border-radius, for cards and panels -->
<sando-skeleton shape="rounded" width="100%" height="80px"></sando-skeleton>
```

### Effects

Animation effects control how the skeleton indicates loading activity:

```html
<!-- Shimmer: moving gradient from left to right (default) -->
<sando-skeleton effect="shimmer"></sando-skeleton>

<!-- Pulse: opacity oscillates between 0.4 and 1 -->
<sando-skeleton effect="pulse"></sando-skeleton>

<!-- None: static, no animation -->
<sando-skeleton effect="none"></sando-skeleton>
```

::: info Reduced Motion
When `prefers-reduced-motion: reduce` is active, all animations are automatically disabled regardless of the `effect` value. The skeleton renders as a static placeholder.
:::

## Composition Components

Beyond the base primitive, Sando provides pre-composed skeleton components for common UI patterns. These are convenience wrappers that compose `sando-skeleton` internally with sensible defaults — like having pre-made sandwich combos on the menu when you don't want to build from scratch.

| Component             | Element                     | Description                                           |
| --------------------- | --------------------------- | ----------------------------------------------------- |
| **SkeletonAvatar**    | `sando-skeleton-avatar`     | Circular avatar placeholder with size presets (xs–xl) |
| **SkeletonButton**    | `sando-skeleton-button`     | Button placeholder matching button size variants      |
| **SkeletonText**      | `sando-skeleton-text`       | Single text line with token-based height sizing       |
| **SkeletonParagraph** | `sando-skeleton-paragraph`  | Multi-line text block with configurable line count    |
| **SkeletonImage**     | `sando-skeleton-image`      | Image placeholder with aspect ratio support           |
| **SkeletonCard**      | `sando-skeleton-card`       | Card layout with optional image, avatar, and actions  |
| **SkeletonArticle**   | `sando-skeleton-article`    | Article layout with optional image                    |
| **SkeletonProfile**   | `sando-skeleton-profile`    | User profile layout placeholder                       |
| **SkeletonComment**   | `sando-skeleton-comment`    | Comment layout with avatar and text lines             |
| **SkeletonMediaCard** | `sando-skeleton-media-card` | Media card with image and text areas                  |
| **SkeletonListItem**  | `sando-skeleton-list-item`  | List item with icon/avatar and text                   |
| **SkeletonTableRow**  | `sando-skeleton-table-row`  | Table row placeholder with configurable columns       |
| **SkeletonRow**       | `sando-skeleton-row`        | Horizontal layout helper with gap control             |
| **SkeletonStack**     | `sando-skeleton-stack`      | Vertical layout helper with gap control               |
| **SkeletonComposer**  | `sando-skeleton-composer`   | Container with staggered animation delay support      |

### Quick Composition Examples

```html
<!-- Avatar with text lines -->
<sando-skeleton-row gap="md" align="center">
  <sando-skeleton-avatar size="md"></sando-skeleton-avatar>
  <sando-skeleton-stack gap="xs" style="flex: 1;">
    <sando-skeleton-text width="60%"></sando-skeleton-text>
    <sando-skeleton-text width="40%" size="sm"></sando-skeleton-text>
  </sando-skeleton-stack>
</sando-skeleton-row>

<!-- Card with image -->
<sando-skeleton-card show-image show-actions></sando-skeleton-card>

<!-- Paragraph block -->
<sando-skeleton-paragraph
  lines="4"
  last-line-width="70%"
></sando-skeleton-paragraph>

<!-- Staggered wave effect -->
<sando-skeleton-composer stagger="50ms">
  <sando-skeleton-text></sando-skeleton-text>
  <sando-skeleton-text width="80%"></sando-skeleton-text>
  <sando-skeleton-text width="60%"></sando-skeleton-text>
</sando-skeleton-composer>
```

## Custom Dimensions

The base skeleton accepts any valid CSS value for `width` and `height`:

```html
<!-- Fixed pixel dimensions -->
<sando-skeleton width="300px" height="24px"></sando-skeleton>

<!-- Relative units -->
<sando-skeleton width="50%" height="2em"></sando-skeleton>

<!-- Viewport-relative -->
<sando-skeleton width="80vw" height="3rem"></sando-skeleton>

<!-- Circular avatar (equal width and height) -->
<sando-skeleton shape="circular" width="64px" height="64px"></sando-skeleton>
```

::: tip Match Your Content
Set skeleton dimensions to match the actual content they replace. This prevents cumulative layout shift (CLS) when the real content loads in.
:::

## Theming

### Using Flavors

Apply different theme flavors to match your design context:

```html
<sando-skeleton flavor="original"></sando-skeleton>
<sando-skeleton flavor="strawberry"></sando-skeleton>
```

### Custom Styling

Override CSS custom properties for fine-grained control. All color values use OKLCH:

```html
<sando-skeleton
  style="
    --sando-skeleton-color-background: oklch(0.92 0.01 260);
    --sando-skeleton-color-shimmer: oklch(0.97 0.005 260 / 0.6);
    --sando-skeleton-animation-duration: 2s;
  "
></sando-skeleton>
```

For a darker theme:

```html
<sando-skeleton
  style="
    --sando-skeleton-color-background: oklch(0.30 0.02 260);
    --sando-skeleton-color-shimmer: oklch(0.40 0.01 260 / 0.4);
  "
></sando-skeleton>
```

## API Reference

### Properties

| Property | Attribute | Type                                                 | Default      | Description                              |
| -------- | --------- | ---------------------------------------------------- | ------------ | ---------------------------------------- |
| `shape`  | `shape`   | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | `'text'`     | Shape variant controlling border-radius  |
| `effect` | `effect`  | `'shimmer' \| 'pulse' \| 'none'`                     | `'shimmer'`  | Animation effect applied to the skeleton |
| `width`  | `width`   | `string`                                             | `'100%'`     | CSS width value                          |
| `height` | `height`  | `string`                                             | `'1em'`      | CSS height value                         |
| `flavor` | `flavor`  | `string`                                             | `'original'` | Design system theme flavor               |

This component has **no slots** and **no events**. It renders with `role="presentation"` and `aria-hidden="true"`.

### CSS Custom Properties

Key CSS variables you can override:

```css
/* Colors */
--sando-skeleton-color-background    /* Background color of the skeleton */
--sando-skeleton-color-shimmer       /* Shimmer gradient highlight color */

/* Animation */
--sando-skeleton-animation-duration  /* Duration of one animation cycle */
--sando-skeleton-animation-easing    /* Easing function for animation */

/* Border radius per shape */
--sando-skeleton-borderRadius-text          /* Border radius for shape="text" */
--sando-skeleton-borderRadius-circular      /* Border radius for shape="circular" */
--sando-skeleton-borderRadius-rectangular   /* Border radius for shape="rectangular" */
--sando-skeleton-borderRadius-rounded       /* Border radius for shape="rounded" */
```

::: tip Complete Token Reference
[See full list in Storybook](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) or check `packages/tokens/src/recipes/skeleton.json`
:::

## Framework Integration

### React

```tsx
import "@sando/components";

function UserCardSkeleton() {
  return <sando-skeleton-card show-image></sando-skeleton-card>;
}

function CustomSkeleton() {
  return (
    <sando-skeleton
      shape="rounded"
      effect="shimmer"
      width="100%"
      height="200px"
    ></sando-skeleton>
  );
}
```

### Vue 3

```vue
<template>
  <sando-skeleton
    shape="text"
    effect="shimmer"
    width="100%"
    height="1em"
  ></sando-skeleton>

  <sando-skeleton-card show-image></sando-skeleton-card>
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
<sando-skeleton shape="rounded" width="100%" height="120px"></sando-skeleton>

<sando-skeleton-card [attr.show-image]="true"></sando-skeleton-card>
```

## Accessibility

The Skeleton component is intentionally invisible to assistive technology:

- ✅ **Decorative Role**: Renders with `role="presentation"` and `aria-hidden="true"` — screen readers skip it entirely
- ✅ **Reduced Motion**: Automatically disables all animations when `prefers-reduced-motion: reduce` is active
- ✅ **No Keyboard Interaction**: Skeletons are not focusable and do not appear in the tab order
- ✅ **Container Responsibility**: The parent loading container should manage `aria-busy="true"` and `aria-live="polite"` to announce loading state changes

### Recommended Loading Pattern

Wrap skeleton content in a container that communicates loading state to assistive technology:

```html
<div aria-busy="true" aria-live="polite">
  <!-- Skeletons shown while loading -->
  <sando-skeleton-card></sando-skeleton-card>
</div>

<script>
  // When content loads, update the container
  container.setAttribute("aria-busy", "false");
  // Replace skeletons with actual content
</script>
```

### Reduced Motion Behavior

The component respects the user's motion preferences at the CSS level:

```css
@media (prefers-reduced-motion: reduce) {
  /* Shimmer gradient is hidden */
  /* Pulse animation is stopped */
  /* Skeleton renders as a static colored block */
}
```

No JavaScript is required — the browser handles this automatically via the component's internal styles.

## Best Practices

### Do ✅

- Match skeleton dimensions to the actual content they replace to prevent layout shift
- Use `sando-skeleton-composer` with `stagger` to create wave effects across multiple skeletons
- Use the appropriate `shape` for your content type (`circular` for avatars, `text` for lines, etc.)
- Wrap skeletons in a container with `aria-busy="true"` for screen reader users
- Use pre-composed components (`sando-skeleton-card`, etc.) for standard patterns
- Set `effect="none"` for contexts where animation is distracting
- Let `prefers-reduced-motion` handle animation removal automatically

### Don't ❌

- Don't use skeletons for content that loads instantly (under 200ms)
- Don't mix different `effect` values within the same loading group — it creates visual noise
- Don't add `aria-label` or `role` overrides to skeleton elements — they're intentionally hidden from assistive tech
- Don't use skeletons as permanent placeholders for empty states — use dedicated empty-state components instead
- Don't set explicit dimensions that differ from the final content — this causes cumulative layout shift
- Don't nest `sando-skeleton-composer` inside another `sando-skeleton-composer`

## Examples

### Card Skeleton

A common card loading state with header, image, and action buttons:

```html
<sando-skeleton-card
  show-image
  show-actions
  lines="3"
  image-ratio="16/9"
  width="320px"
></sando-skeleton-card>
```

### User List Skeleton

A list of user entries with avatars and details, using staggered animation:

```html
<sando-skeleton-composer stagger="80ms">
  <sando-skeleton-stack gap="md">
    <!-- User row 1 -->
    <sando-skeleton-row gap="md" align="center">
      <sando-skeleton-avatar size="sm"></sando-skeleton-avatar>
      <sando-skeleton-stack gap="xs" style="flex: 1;">
        <sando-skeleton-text width="40%"></sando-skeleton-text>
        <sando-skeleton-text width="25%" size="sm"></sando-skeleton-text>
      </sando-skeleton-stack>
      <sando-skeleton-button size="sm"></sando-skeleton-button>
    </sando-skeleton-row>

    <!-- User row 2 -->
    <sando-skeleton-row gap="md" align="center">
      <sando-skeleton-avatar size="sm"></sando-skeleton-avatar>
      <sando-skeleton-stack gap="xs" style="flex: 1;">
        <sando-skeleton-text width="55%"></sando-skeleton-text>
        <sando-skeleton-text width="30%" size="sm"></sando-skeleton-text>
      </sando-skeleton-stack>
      <sando-skeleton-button size="sm"></sando-skeleton-button>
    </sando-skeleton-row>

    <!-- User row 3 -->
    <sando-skeleton-row gap="md" align="center">
      <sando-skeleton-avatar size="sm"></sando-skeleton-avatar>
      <sando-skeleton-stack gap="xs" style="flex: 1;">
        <sando-skeleton-text width="35%"></sando-skeleton-text>
        <sando-skeleton-text width="20%" size="sm"></sando-skeleton-text>
      </sando-skeleton-stack>
      <sando-skeleton-button size="sm"></sando-skeleton-button>
    </sando-skeleton-row>
  </sando-skeleton-stack>
</sando-skeleton-composer>
```

### Form Skeleton

A loading state for a form with labeled fields and a submit button:

```html
<div aria-busy="true" aria-live="polite">
  <sando-skeleton-composer stagger="60ms">
    <sando-skeleton-stack gap="lg">
      <!-- Field 1: Label + Input -->
      <sando-skeleton-stack gap="xs">
        <sando-skeleton
          shape="text"
          width="80px"
          height="0.75em"
        ></sando-skeleton>
        <sando-skeleton
          shape="rounded"
          width="100%"
          height="40px"
        ></sando-skeleton>
      </sando-skeleton-stack>

      <!-- Field 2: Label + Input -->
      <sando-skeleton-stack gap="xs">
        <sando-skeleton
          shape="text"
          width="120px"
          height="0.75em"
        ></sando-skeleton>
        <sando-skeleton
          shape="rounded"
          width="100%"
          height="40px"
        ></sando-skeleton>
      </sando-skeleton-stack>

      <!-- Field 3: Label + Textarea -->
      <sando-skeleton-stack gap="xs">
        <sando-skeleton
          shape="text"
          width="100px"
          height="0.75em"
        ></sando-skeleton>
        <sando-skeleton
          shape="rounded"
          width="100%"
          height="120px"
        ></sando-skeleton>
      </sando-skeleton-stack>

      <!-- Submit button -->
      <sando-skeleton-button size="md"></sando-skeleton-button>
    </sando-skeleton-stack>
  </sando-skeleton-composer>
</div>
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
- [Storybook](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/)
- [GitHub](https://github.com/rodrigolagodev/SandoDesignSystem)
