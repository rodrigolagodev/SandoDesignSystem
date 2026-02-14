---
title: Badge Component
description: A purely informative, non-interactive label component for displaying statuses, categories, and quick labels with semantic colors, automatic icons, and multiple visual variants.
---

# Badge

The `sando-badge` component is a purely informative label for displaying statuses, categories, and quick identifiers. Think of it as the label on a jar in your pantry — it tells you exactly what's inside at a glance, but you don't press it to open the jar. Unlike interactive elements, Badge has no click handlers or hover states. It simply communicates.

## Features

- ✅ **Fully Tested**: Comprehensive unit and accessibility tests
- ♿ **Accessible**: Renders with `role="status"` for screen reader announcements
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support with exported types
- 🏷️ **Semantic Colors**: Six color options mapped to meaning (success, warning, danger, etc.)
- 🎯 **Automatic Icons**: Semantic colors display contextual Lucide icons by default
- 📐 **Compact Mode**: Reduced padding for tight layouts like tables and lists

## Basic Usage

```html
<script type="module">
  import "@sando/components";
</script>

<sando-badge>New</sando-badge>
```

::: tip Import Path
Most components use `import "@sando/components"` for the main bundle. See the [overview](/components/overview) for details.
:::

## Variants

The badge comes in four visual styles to control emphasis:

### Solid (Default)

High emphasis with a filled background. The most prominent option — use it when the badge needs to stand out clearly.

```html
<sando-badge variant="solid">Solid</sando-badge>
```

### Soft

Medium emphasis with a muted, tinted background. A good default when you have multiple badges that shouldn't compete for attention.

```html
<sando-badge variant="soft">Soft</sando-badge>
```

### Outline

Low emphasis with a border and no fill. Works well in dense UIs where badges need to be visible but not dominant.

```html
<sando-badge variant="outline">Outline</sando-badge>
```

### Surface

Subtle raised surface background. Blends naturally into card-based layouts.

```html
<sando-badge variant="surface">Surface</sando-badge>
```

## Colors

Six semantic colors communicate purpose and state:

```html
<sando-badge color="neutral">Neutral</sando-badge>
<sando-badge color="primary">Primary</sando-badge>
<sando-badge color="success">Active</sando-badge>
<sando-badge color="warning">Pending</sando-badge>
<sando-badge color="danger">Error</sando-badge>
<sando-badge color="info">Beta</sando-badge>
```

Each color carries semantic meaning:

| Color     | Meaning                  | Example Use               |
| --------- | ------------------------ | ------------------------- |
| `neutral` | Default, general purpose | Category labels, tags     |
| `primary` | Brand or action emphasis | Featured, Pro             |
| `success` | Positive states          | Active, Complete, Valid   |
| `warning` | Caution states           | Pending, Review, Expiring |
| `danger`  | Error or negative states | Error, Expired, Critical  |
| `info`    | Informational            | New, Updated, Beta        |

## Sizes

Three size options for different contexts:

```html
<sando-badge size="sm">Small</sando-badge>
<sando-badge size="md">Medium (Default)</sando-badge>
<sando-badge size="lg">Large</sando-badge>
```

::: tip Touch Target Awareness
Badges are non-interactive, so WCAG touch target requirements don't apply. Use the size that best fits the surrounding content hierarchy.
:::

## Compact Mode

Reduces vertical padding for tight spaces like table cells, list items, or inline contexts:

```html
<sando-badge compact>Compact</sando-badge>
<sando-badge compact size="sm">Compact Small</sando-badge>
<sando-badge compact size="lg">Compact Large</sando-badge>
```

Compact mode works with all size variants. It only affects `paddingBlock` — horizontal padding and font size remain unchanged.

## Semantic Icons

Badge automatically displays contextual icons for status colors. This improves accessibility by ensuring that color is never the sole indicator of meaning — like plating a dish with both color and garnish so even a color-blind diner knows what they're getting.

```html
<!-- These badges show automatic icons -->
<sando-badge color="success">Active</sando-badge>
<!-- ✓ check icon -->
<sando-badge color="warning">Pending</sando-badge>
<!-- ⚠ triangle-alert icon -->
<sando-badge color="danger">Error</sando-badge>
<!-- ⊘ circle-alert icon -->
<sando-badge color="info">Beta</sando-badge>
<!-- ℹ info icon -->

<!-- These colors have no default icon -->
<sando-badge color="neutral">Default</sando-badge>
<!-- no icon -->
<sando-badge color="primary">Featured</sando-badge>
<!-- no icon -->
```

| Color     | Icon             | Meaning                  |
| --------- | ---------------- | ------------------------ |
| `success` | `check`          | Completed, valid, active |
| `warning` | `triangle-alert` | Attention, caution       |
| `danger`  | `circle-alert`   | Error, critical          |
| `info`    | `info`           | Information, note        |
| `neutral` | (none)           | No semantic icon         |
| `primary` | (none)           | No semantic icon         |

## Custom Icons

### Overriding the Default Icon

Use the `icon` property to replace the automatic semantic icon with any Lucide icon name:

```html
<!-- Override success icon with a star -->
<sando-badge color="success" icon="star">Featured</sando-badge>

<!-- Override info icon with a rocket -->
<sando-badge color="info" icon="rocket">Launched</sando-badge>

<!-- Add an icon to a color that doesn't have one by default -->
<sando-badge color="primary" icon="crown">Pro</sando-badge>
```

### Hiding Icons Completely

Use the `no-icon` attribute to suppress all icons, including automatic semantic ones:

```html
<!-- No icon, even though success normally shows a check -->
<sando-badge color="success" no-icon>Active</sando-badge>

<!-- No icon on warning -->
<sando-badge color="warning" no-icon>Review</sando-badge>
```

## Theming

### Using Flavors

Apply different theme flavors to change the badge's visual personality:

```html
<sando-badge flavor="original">Original Theme</sando-badge>
<sando-badge flavor="strawberry">Strawberry Theme</sando-badge>
```

### Custom Styling

Override CSS custom properties for fine-grained control. All color values should use OKLCH:

```html
<sando-badge
  style="
    --sando-badge-neutral-solid-backgroundColor: oklch(0.56 0.11 230);
    --sando-badge-neutral-solid-textColor: oklch(0.98 0 0);
  "
>
  Custom Badge
</sando-badge>
```

```html
<!-- Custom border radius and font -->
<sando-badge
  variant="outline"
  style="
    --sando-badge-borderRadius: 0;
    --sando-badge-fontWeight: 700;
    --sando-badge-primary-outline-borderColor: oklch(0.65 0.2 260);
    --sando-badge-primary-outline-textColor: oklch(0.65 0.2 260);
  "
  color="primary"
>
  Squared
</sando-badge>
```

## API Reference

### Properties

| Property  | Attribute | Type                                                                     | Default      | Description                                                   |
| --------- | --------- | ------------------------------------------------------------------------ | ------------ | ------------------------------------------------------------- |
| `color`   | `color`   | `'neutral' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'neutral'`  | Semantic color of the badge                                   |
| `variant` | `variant` | `'solid' \| 'soft' \| 'outline' \| 'surface'`                            | `'solid'`    | Visual style variant                                          |
| `size`    | `size`    | `'sm' \| 'md' \| 'lg'`                                                   | `'md'`       | Size of the badge                                             |
| `compact` | `compact` | `boolean`                                                                | `false`      | Reduces vertical padding for compact spaces                   |
| `icon`    | `icon`    | `string`                                                                 | `undefined`  | Custom Lucide icon name to override the default semantic icon |
| `noIcon`  | `no-icon` | `boolean`                                                                | `false`      | Hides the icon completely                                     |
| `flavor`  | `flavor`  | `string`                                                                 | `'original'` | Design system theme flavor                                    |

### Slots

| Slot    | Description                |
| ------- | -------------------------- |
| Default | Badge content/label (text) |

### CSS Custom Properties

Key CSS variables you can override:

```css
/* Base styles */
--sando-badge-fontFamily
--sando-badge-fontWeight
--sando-badge-lineHeight
--sando-badge-borderRadius
--sando-badge-borderWidth
--sando-badge-gap

/* Color × variant combinations */
--sando-badge-{color}-{variant}-backgroundColor
--sando-badge-{color}-{variant}-textColor
--sando-badge-{color}-{variant}-borderColor

/* Size-specific */
--sando-badge-size-{size}-paddingInline
--sando-badge-size-{size}-paddingBlock
--sando-badge-size-{size}-fontSize
--sando-badge-size-{size}-minHeight

/* Compact mode */
--sando-badge-compact-paddingBlock
```

::: tip Complete Token Reference
[See full list in Storybook](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) or check `packages/tokens/src/recipes/badge.json`
:::

## Framework Integration

### React

```tsx
import "@sando/components";

function App() {
  return (
    <sando-badge color="success" variant="soft">
      Active
    </sando-badge>
  );
}
```

### Vue 3

```vue
<template>
  <sando-badge color="success" variant="soft"> Active </sando-badge>
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
<sando-badge color="success" variant="soft"> Active </sando-badge>
```

## Accessibility

The Badge component is built to communicate status clearly to all users:

- ✅ **Role Status**: Renders with `role="status"` so screen readers announce badge content
- ✅ **Color + Icon**: Semantic colors pair with icons so color is never the sole indicator
- ✅ **No-Icon Override**: Use `no-icon` only when surrounding context already conveys meaning
- ✅ **Contrast Ratios**: All color/variant combinations meet WCAG AA contrast (4.5:1 for text)
- ✅ **Non-Interactive**: No keyboard handling needed — badge is purely informative
- ✅ **Decorative Icons**: Semantic icons render with `decorative` attribute (hidden from assistive tech) since `role="status"` already announces the text

## Best Practices

### Do ✅

- Use `variant="solid"` for high-priority status badges that must stand out
- Use `variant="soft"` as a comfortable default when showing multiple badges together
- Use `variant="outline"` in dense layouts like tables or data grids
- Use semantic colors to match meaning: `success` for positive, `danger` for errors
- Use `compact` in table cells, list items, and other space-constrained areas
- Keep badge text short — one or two words maximum (e.g., "Active", "Beta")
- Let automatic semantic icons do their job — they reinforce meaning beyond color
- Use the `icon` prop when you need a specific visual cue (e.g., `icon="crown"` for "Pro")

### Don't ❌

- Don't use badges as buttons — they are non-interactive (use `sando-button` or `sando-tag` for actions)
- Don't use `no-icon` on semantic badges without alternative context (color alone is not accessible)
- Don't use `danger` color for non-error states — it dilutes the signal
- Don't put long text in badges — they are meant for quick labels, not sentences
- Don't use `primary` color for status — reserve it for brand emphasis; use `success`/`warning`/`danger`/`info` for states
- Don't mix too many variants in the same context — pick one variant and vary by color

## Examples

### Status Dashboard

```html
<div class="status-list">
  <div class="status-item">
    <span>API Server</span>
    <sando-badge color="success" variant="soft">Active</sando-badge>
  </div>
  <div class="status-item">
    <span>Background Jobs</span>
    <sando-badge color="warning" variant="soft">Degraded</sando-badge>
  </div>
  <div class="status-item">
    <span>Email Service</span>
    <sando-badge color="danger" variant="soft">Down</sando-badge>
  </div>
</div>
```

### User Profile Labels

```html
<div class="user-profile">
  <h3>Jane Doe</h3>
  <sando-badge color="primary" icon="crown" variant="solid">Pro</sando-badge>
  <sando-badge color="info" variant="outline">Beta Tester</sando-badge>
</div>
```

### Data Table with Compact Badges

```html
<table>
  <thead>
    <tr>
      <th>Order</th>
      <th>Status</th>
      <th>Priority</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>#1042</td>
      <td>
        <sando-badge color="success" compact size="sm">Shipped</sando-badge>
      </td>
      <td>
        <sando-badge color="neutral" compact size="sm" variant="outline"
          >Normal</sando-badge
        >
      </td>
    </tr>
    <tr>
      <td>#1043</td>
      <td>
        <sando-badge color="warning" compact size="sm">Processing</sando-badge>
      </td>
      <td>
        <sando-badge color="danger" compact size="sm" variant="outline"
          >Urgent</sando-badge
        >
      </td>
    </tr>
  </tbody>
</table>

<script>
  // Dynamically update badge based on order status
  async function updateOrderStatus(orderId, badgeElement) {
    const response = await fetch(`/api/orders/${orderId}`);
    const order = await response.json();

    const statusMap = {
      shipped: { color: "success", label: "Shipped" },
      processing: { color: "warning", label: "Processing" },
      cancelled: { color: "danger", label: "Cancelled" },
      new: { color: "info", label: "New" },
    };

    const status = statusMap[order.status];
    badgeElement.color = status.color;
    badgeElement.textContent = status.label;
  }
</script>
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
- [Interactive Storybook Demo](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) — Explore with live controls
