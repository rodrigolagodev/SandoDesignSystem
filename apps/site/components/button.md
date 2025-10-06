# Button Component

The `sando-button` component is a versatile, accessible button with multiple variants, sizes, and states.

## Features

- ✅ **Fully Tested**: Comprehensive unit and E2E tests
- ♿ **Accessible**: WCAG 2.1 AA compliant with keyboard navigation
- 🎨 **Themeable**: Token-driven styling with flavor support
- 🔒 **Type Safe**: Full TypeScript support
- ⚡ **Performant**: Lightweight (<8KB gzipped)

## Basic Usage

```html
<!-- Import the component -->
<script type="module">
  import '@sando/components/button';
</script>

<!-- Use it -->
<sando-button variant="solid">
  Click me
</sando-button>
```

## Variants

The button comes in three visual styles:

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

## Sizes

Three size options for different contexts:

```html
<sando-button size="small">Small</sando-button>
<sando-button size="medium">Medium (Default)</sando-button>
<sando-button size="large">Large</sando-button>
```

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

Shows a loading indicator and prevents interaction.

```html
<sando-button loading>Loading...</sando-button>
```

## Full Width

Make the button span the full container width:

```html
<sando-button full-width>Full Width Button</sando-button>
```

## With Icons

Use slots to add icons before or after the button text:

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
    --sando-button-solid-backgroundColor-default: #ff6b6b;
    --sando-button-solid-textColor-default: white;
  "
>
  Custom Colors
</sando-button>
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'solid' \| 'outline' \| 'ghost'` | `'solid'` | Visual style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `status` | `'default' \| 'success' \| 'destructive'` | `'default'` | Status variant for semantic meaning |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Whether the button is in loading state |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type for forms |
| `fullWidth` | `boolean` | `false` | Whether button takes full width |
| `flavor` | `string` | `'original'` | Design system theme flavor |

### Slots

| Slot | Description |
|------|-------------|
| Default | Button content (text, icons, etc.) |
| `icon-start` | Icon or content before the button text |
| `icon-end` | Icon or content after the button text |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `click` | `CustomEvent` | Fired when button is clicked (unless disabled or loading) |

### CSS Custom Properties

Key CSS variables you can override:

```css
--sando-button-solid-backgroundColor-default
--sando-button-solid-backgroundColor-hover
--sando-button-solid-backgroundColor-active
--sando-button-solid-textColor-default
--sando-button-borderRadius
--sando-button-size-medium-paddingBlock
--sando-button-size-medium-paddingInline
--sando-button-size-medium-fontSize
```

[See full list in Storybook](/SandoDesignSystem/storybook/)

## Framework Integration

### React

```tsx
import '@sando/components/button';
import type { SandoButton } from '@sando/components';

function App() {
  const handleClick = (e: CustomEvent) => {
    console.log('Button clicked!', e.detail);
  };

  return (
    <sando-button
      variant="solid"
      size="medium"
      onClick={handleClick}
    >
      Click me
    </sando-button>
  );
}
```

### Vue 3

```vue
<template>
  <sando-button
    variant="solid"
    size="medium"
    @click="handleClick"
  >
    Click me
  </sando-button>
</template>

<script setup lang="ts">
import '@sando/components/button';

const handleClick = (e: CustomEvent) => {
  console.log('Button clicked!', e.detail);
};
</script>
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@sando/components/button';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

```html
<!-- component.html -->
<sando-button
  variant="solid"
  size="medium"
  (click)="handleClick($event)"
>
  Click me
</sando-button>
```

## Accessibility

The Button component is built with accessibility in mind:

- ✅ **Keyboard Navigation**: Full keyboard support (Space/Enter)
- ✅ **Screen Reader Support**: Proper ARIA labels and roles
- ✅ **Focus Management**: Visible focus indicator
- ✅ **Color Contrast**: WCAG AA compliant contrast ratios
- ✅ **State Communication**: Loading and disabled states announced

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Activate button |
| `Enter` | Activate button |
| `Tab` | Focus next element |
| `Shift + Tab` | Focus previous element |

## Best Practices

### Do ✅

- Use `variant="solid"` for primary actions
- Use `variant="outline"` for secondary actions
- Use `variant="ghost"` for tertiary/subtle actions
- Use `status="destructive"` for dangerous actions
- Provide clear, action-oriented labels
- Use loading state for async operations

### Don't ❌

- Don't use multiple solid buttons in the same context
- Don't use red color for non-destructive actions
- Don't disable buttons without clear feedback
- Don't use generic labels like "Click here"
- Don't nest interactive elements inside buttons

## Examples

### Form Submit Button

```html
<form>
  <sando-button
    type="submit"
    variant="solid"
    full-width
  >
    Submit Form
  </sando-button>
</form>
```

### Destructive Action

```html
<sando-button
  variant="outline"
  status="destructive"
>
  <span slot="icon-start">🗑️</span>
  Delete Item
</sando-button>
```

### Loading State with Async Action

```html
<sando-button id="save-btn" variant="solid">
  Save Changes
</sando-button>

<script>
  const button = document.getElementById('save-btn');
  button.addEventListener('click', async () => {
    button.loading = true;
    try {
      await saveData();
    } finally {
      button.loading = false;
    }
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
