---
title: Tag Component
description: A chip/badge component with mandatory icon, multiple interaction modes (informative, removable, clickable, link), variants, sizes, and full accessibility support.
---

# Tag

The `sando-tag` component is a compact, labeled element with a mandatory icon — perfect for categorizing, filtering, and organizing content. Think of it as the toothpick that holds your Sando layers together: small but essential, and sometimes you need to pull it out (removable) or use it to point somewhere (link).

## Features

- ✅ **Fully Tested**: Comprehensive unit and E2E tests
- ♿ **Accessible**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support
- ⚡ **Performant**: Lightweight with minimal DOM footprint
- 🎯 **Mandatory Icon**: Always renders an icon (default: circle-chevron-right)
- 🔄 **Multiple Interaction Modes**: Informative, removable, clickable, or link
- 📐 **Compact Mode**: Reduced padding for tight layouts

## Basic Usage

```html
<!-- Import the component -->
<script type="module">
  import "@sando/components";
</script>

<!-- Use it -->
<sando-tag>Category</sando-tag>
```

::: tip Import Path
Use `import "@sando/components"` to import all components at once. This ensures tree-shaking picks up only what you use.
:::

## Variants

The tag comes in three visual styles:

### Solid (Default)

High emphasis tag with filled background.

```html
<sando-tag variant="solid">Solid Tag</sando-tag>
```

### Outline

Medium emphasis tag with border only.

```html
<sando-tag variant="outline">Outline Tag</sando-tag>
```

### Soft

Low emphasis tag with a subtle tinted background.

```html
<sando-tag variant="soft">Soft Tag</sando-tag>
```

## Sizes

Three size options for different contexts:

```html
<sando-tag size="sm">Small</sando-tag>
<sando-tag size="md">Medium (Default)</sando-tag>
<sando-tag size="lg">Large</sando-tag>
```

## Interaction Modes

The tag supports four interaction modes with a clear priority system. Only the **icon area** is interactive — the label text is never clickable. This is like how you grab a sandwich by the wrapper, not by the filling.

::: warning Interaction Priority
When multiple interaction attributes are set, the following priority applies:

**removable > href > clickable > informative**

`removable` is exclusive — it ignores `clickable`, `href`, and the `icon` slot entirely.
:::

### Informative (Default)

The icon is visible but not interactive. This is the default mode when no interaction attributes are set.

```html
<sando-tag>Status: Active</sando-tag>
<sando-tag variant="outline">TypeScript</sando-tag>
```

### Removable

Setting `removable` replaces the default icon with an X (close) button. Clicking it emits the `sando-remove` event. This mode is **exclusive**: it ignores `clickable`, `href`, and any slotted icon content.

```html
<sando-tag removable>Dismissible</sando-tag>
<sando-tag removable variant="outline">Filter: Active</sando-tag>
```

```html
<sando-tag id="remove-tag" removable>Remove me</sando-tag>

<script>
  const tag = document.getElementById("remove-tag");
  tag.addEventListener("sando-remove", (e) => {
    console.log("Tag removed!", e.detail.originalEvent);
    tag.remove();
  });
</script>
```

### Clickable

Setting `clickable` makes the icon area a button that emits `sando-action` when clicked. Only the icon is interactive, not the entire tag. Has no effect when `removable` is also set.

```html
<sando-tag clickable>Actionable</sando-tag>
```

```html
<sando-tag id="action-tag" clickable>Toggle Filter</sando-tag>

<script>
  const tag = document.getElementById("action-tag");
  tag.addEventListener("sando-action", (e) => {
    console.log("Action triggered!", e.detail.originalEvent);
  });
</script>
```

### Link (href)

Setting `href` turns the icon area into an anchor element for navigation. Only the icon is a link, not the full tag. Has no effect when `removable` is also set.

```html
<sando-tag href="/categories/design">Design</sando-tag>
<sando-tag href="https://example.com" target="_blank">External</sando-tag>
```

## Custom Icons

Override the default `circle-chevron-right` icon using the `icon` slot. This slot is **not rendered** when `removable` is `true`.

```html
<sando-tag>
  <span slot="icon">⭐</span>
  Featured
</sando-tag>

<sando-tag clickable>
  <span slot="icon">🔍</span>
  Search
</sando-tag>

<sando-tag href="/settings">
  <span slot="icon">⚙️</span>
  Settings
</sando-tag>
```

::: info Icon Slot + Removable
When `removable` is set, the `icon` slot is ignored and the X button is rendered instead. The remove action always takes priority — like pulling the toothpick out of a Sando, everything else steps aside.
:::

## Compact Mode

Reduces vertical padding for tags in tight spaces like toolbars or inline lists:

```html
<sando-tag compact>Compact</sando-tag>
<sando-tag compact size="sm">Compact Small</sando-tag>
<sando-tag compact removable>Compact Removable</sando-tag>
```

## Theming

### Using Flavors

Apply different theme flavors:

```html
<sando-tag flavor="original">Original Theme</sando-tag>
<sando-tag flavor="strawberry">Strawberry Theme</sando-tag>
```

### Custom Styling

Override CSS custom properties for fine-grained control. All color values use OKLCH:

```html
<sando-tag
  style="
    --sando-tag-fontFamily: 'Inter', sans-serif;
    --sando-tag-fontWeight: 600;
    --sando-tag-borderRadius: 9999px;
  "
>
  Custom Styled
</sando-tag>
```

For color overrides, always use OKLCH values:

```html
<sando-tag
  variant="solid"
  style="
    --sando-tag-solid-backgroundColor: oklch(0.56 0.11 230);
    --sando-tag-solid-textColor: oklch(1 0 0);
  "
>
  Custom Colors
</sando-tag>
```

## API Reference

### Properties

| Property    | Attribute   | Type                             | Default      | Description                                                                    |
| ----------- | ----------- | -------------------------------- | ------------ | ------------------------------------------------------------------------------ |
| `variant`   | `variant`   | `'solid' \| 'outline' \| 'soft'` | `'solid'`    | Visual style variant                                                           |
| `size`      | `size`      | `'sm' \| 'md' \| 'lg'`           | `'md'`       | Size of the tag                                                                |
| `disabled`  | `disabled`  | `boolean`                        | `false`      | Whether the tag is disabled                                                    |
| `removable` | `removable` | `boolean`                        | `false`      | Shows remove (X) button. Exclusive: ignores `clickable`, `href`, and icon slot |
| `clickable` | `clickable` | `boolean`                        | `false`      | Makes the icon area a clickable button. No effect when `removable` is `true`   |
| `href`      | `href`      | `string`                         | `undefined`  | URL for icon area navigation. No effect when `removable` is `true`             |
| `target`    | `target`    | `string`                         | `undefined`  | Link target attribute (used with `href`)                                       |
| `compact`   | `compact`   | `boolean`                        | `false`      | Reduces vertical padding for compact layouts                                   |
| `flavor`    | `flavor`    | `string`                         | `'original'` | Design system theme flavor                                                     |

### Slots

| Slot    | Description                                                                                           |
| ------- | ----------------------------------------------------------------------------------------------------- |
| Default | Tag content/label text                                                                                |
| `icon`  | Custom icon content (overrides default circle-chevron-right). Not rendered when `removable` is `true` |

### Events

| Event          | Type                                                          | Description                                                               |
| -------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `sando-remove` | `CustomEvent<{ originalEvent: MouseEvent \| KeyboardEvent }>` | Fired when the remove button is clicked (only when `removable` is `true`) |
| `sando-action` | `CustomEvent<{ originalEvent: MouseEvent \| KeyboardEvent }>` | Fired when the icon action is clicked (when `clickable` is `true`)        |

### CSS Custom Properties

Key CSS variables you can override:

```css
/* Base styles */
--sando-tag-fontFamily
--sando-tag-fontWeight
--sando-tag-borderRadius
--sando-tag-transition-duration
```

::: tip Complete Token Reference
[See full list in Storybook](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) or check `packages/tokens/src/recipes/tag.json`
:::

## Framework Integration

### React

```tsx
import "@sando/components";
import type { SandoTag } from "@sando/components";

function App() {
  const handleRemove = (e: CustomEvent) => {
    console.log("Tag removed!", e.detail.originalEvent);
  };

  const handleAction = (e: CustomEvent) => {
    console.log("Tag action!", e.detail.originalEvent);
  };

  return (
    <>
      <sando-tag removable onSando-remove={handleRemove}>
        Removable Tag
      </sando-tag>

      <sando-tag clickable onSando-action={handleAction}>
        Clickable Tag
      </sando-tag>
    </>
  );
}
```

### Vue 3

```vue
<template>
  <sando-tag removable @sando-remove="handleRemove"> Removable Tag </sando-tag>

  <sando-tag clickable @sando-action="handleAction"> Clickable Tag </sando-tag>
</template>

<script setup lang="ts">
import "@sando/components";

const handleRemove = (e: CustomEvent) => {
  console.log("Tag removed!", e.detail.originalEvent);
};

const handleAction = (e: CustomEvent) => {
  console.log("Tag action!", e.detail.originalEvent);
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
<sando-tag removable (sando-remove)="handleRemove($event)">
  Removable Tag
</sando-tag>

<sando-tag clickable (sando-action)="handleAction($event)">
  Clickable Tag
</sando-tag>
```

## Accessibility

The Tag component is built with accessibility in mind and follows WCAG 2.1 Level AA:

- ✅ **Keyboard Navigation**: Icon actions and remove buttons are focusable and activated with Space/Enter
- ✅ **Screen Reader Support**: Proper ARIA roles and labels for interactive elements
- ✅ **Focus Management**: Visible focus indicator on interactive icon area
- ✅ **Color Contrast**: WCAG AA compliant contrast ratios across all variants
- ✅ **State Communication**: Disabled state announced to assistive technologies
- ✅ **Non-Interactive Label**: Tag label text is never a click target, reducing accidental activations
- ✅ **Removable Clarity**: Remove button includes accessible label for screen readers

### Keyboard Shortcuts

| Key           | Action                                        |
| ------------- | --------------------------------------------- |
| `Tab`         | Move focus to the tag's interactive icon area |
| `Space`       | Activate icon action or remove button         |
| `Enter`       | Activate icon action or remove button         |
| `Shift + Tab` | Move focus to previous element                |

## Best Practices

### Do ✅

- Use `variant="solid"` for high-emphasis tags (active filters, primary categories)
- Use `variant="outline"` for medium-emphasis tags (secondary labels)
- Use `variant="soft"` for low-emphasis, ambient tags (metadata, status indicators)
- Use `removable` for user-applied filters that can be dismissed
- Use `clickable` when the tag icon should trigger an action without navigation
- Use `href` when the tag should navigate to a related page or resource
- Use `compact` in dense layouts like toolbars, tables, or inline lists
- Provide clear, descriptive label text ("JavaScript", not "JS tag")
- Use the `icon` slot to give visual context to the tag's purpose

### Don't ❌

- Don't set both `removable` and `clickable` — `removable` takes priority and `clickable` is ignored
- Don't expect the full tag to be clickable — only the icon area is interactive
- Don't use tags for primary actions — use `sando-button` instead
- Don't use overly long labels — tags should be concise (1-3 words)
- Don't nest interactive elements inside the default slot
- Don't rely on color alone to convey meaning — pair with descriptive text

## Examples

### Removable Filter Tags

```html
<div id="active-filters" role="group" aria-label="Active filters">
  <sando-tag removable variant="solid">Category: Design</sando-tag>
  <sando-tag removable variant="solid">Status: Active</sando-tag>
  <sando-tag removable variant="solid">Priority: High</sando-tag>
</div>

<script>
  const filtersContainer = document.getElementById("active-filters");
  filtersContainer.addEventListener("sando-remove", (e) => {
    const tag = e.target;
    tag.remove();
    console.log("Filter removed:", tag.textContent.trim());

    if (filtersContainer.children.length === 0) {
      console.log("All filters cleared");
    }
  });
</script>
```

### Technology Stack with Custom Icons

```html
<div class="tech-stack" role="list" aria-label="Technologies used">
  <sando-tag variant="outline" href="/tech/javascript" role="listitem">
    <span slot="icon">🟨</span>
    JavaScript
  </sando-tag>
  <sando-tag variant="outline" href="/tech/typescript" role="listitem">
    <span slot="icon">🟦</span>
    TypeScript
  </sando-tag>
  <sando-tag variant="outline" href="/tech/lit" role="listitem">
    <span slot="icon">🔥</span>
    Lit
  </sando-tag>
</div>
```

### Clickable Action Tags with State

```html
<sando-tag id="bookmark-tag" clickable variant="soft">
  <span slot="icon">🔖</span>
  Bookmark
</sando-tag>

<script>
  const bookmarkTag = document.getElementById("bookmark-tag");
  let bookmarked = false;

  bookmarkTag.addEventListener("sando-action", () => {
    bookmarked = !bookmarked;
    bookmarkTag.variant = bookmarked ? "solid" : "soft";
    console.log(bookmarked ? "Bookmarked!" : "Bookmark removed");
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
- [Theming Guide](/getting-started/theming)
- [Token Architecture](/tokens/architecture)
- [Design Tokens](/tokens/recipes)
- [Interactive Storybook Demo](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/) — Explore with live controls
