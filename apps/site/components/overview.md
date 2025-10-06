# Components Overview

::: info Button Component Available
The Sando Button component is now available! Other components are under active development. Check back soon or [watch the repo](https://github.com/rodrigolagodev/SandoDesingSystem) for updates.
:::

## Planned Features

When complete, Sando will provide a collection of accessible Web Components built with Lit:

- ⚡ **Framework-agnostic**: Works with React, Vue, Angular, Svelte, or vanilla JS
- ♿ **Accessible**: WCAG 2.1 AA compliant
- 🎨 **Themeable**: Token-driven styling with flavor support
- 📦 **Tree-shakeable**: Import only what you need
- 🔒 **TypeScript**: Full type safety
- 🧪 **Tested**: Comprehensive unit and E2E tests

## Available Components

### ✅ Button

Versatile button component with multiple variants and sizes.

**Variants:** solid, outline, ghost
**Sizes:** small, medium, large
**States:** default, hover, active, focus, disabled, loading
**Status:** default, success, destructive

[View Button Documentation →](/components/button)

### 🔜 Coming Soon

- **Card** - Container for content
- **Input** - Text input field
- **Select** - Dropdown selector
- **Modal** - Dialog overlay
- **Tooltip** - Contextual help
- **Badge** - Status indicators
- **Avatar** - User representation
- **Checkbox** - Selection control
- **Radio** - Single selection from group
- **Switch** - Toggle control
- **Tabs** - Content navigation
- **Alert** - Notification messages

## Installation (When Available)

```bash
# Coming soon to npm
pnpm add @sando/components @sando/tokens
```

::: info Current Status
The Button component is fully functional with comprehensive tests. Additional components are in development. You can:
- Explore the [token system](/tokens/architecture) which is fully functional
- Use the [Button component](/components/button) in your projects
- Contribute to development on [GitHub](https://github.com/rodrigolagodev/SandoDesingSystem)
:::

## Planned Usage

Once available, components will be used like this:

### Import

```js
import '@sando/tokens/css'
import '@sando/components/button'
```

### Use

```html
<sando-button
  variant="solid"
  size="medium"
  flavor="original"
>
  Button Text
</sando-button>
```

### With TypeScript

```ts
/// <reference types="@sando/components" />

const button = document.querySelector('sando-button')
button.variant = 'solid'  // Will be type-safe
```

## Framework Integration (Planned)

### React

```tsx
import '@sando/components/button'

function App() {
  return (
    <sando-button
      variant="solid"
      onClick={(e) => console.log('Clicked!')}
    >
      Click me
    </sando-button>
  )
}
```

### Vue

```vue
<template>
  <sando-button
    variant="solid"
    @click="handleClick"
  >
    Click me
  </sando-button>
</template>

<script setup>
import '@sando/components/button'

const handleClick = () => console.log('Clicked!')
</script>
```

### Angular

```ts
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

```html
<!-- component.html -->
<sando-button
  variant="solid"
  (click)="handleClick()"
>
  Click me
</sando-button>
```

## Planned Customization

Override design tokens:

```css
sando-button {
  --sando-button-solid-backgroundColor-default: #ff6b6b;
  --sando-button-solid-textColor-default: white;
}
```

Or apply flavors:

```html
<sando-button variant="solid" flavor="original">
  Themed Button
</sando-button>
```

## Planned Accessibility

All components will be built with accessibility in mind:

- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ ARIA attributes
- ✅ Focus management
- ✅ Color contrast (WCAG AA)

## Browser Support (Target)

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

## Contributing

Want to help build these components? Check out:
- [Contributing Guide](/guides/contributing)
- [GitHub Issues](https://github.com/yourusername/sando-design-system/issues)
- [Design System Architecture](/tokens/architecture)

## Next Steps

While components are under development, you can:

- **[Explore Tokens](/tokens/architecture)** - Fully functional token system
- **[Read Architecture Guide](/tokens/architecture)** - Understand the three-layer system
- **[Review Testing Strategy](/tokens/testing)** - 2,200+ tests for tokens
- **[Learn About Theming](/getting-started/theming)** - How the flavor system works
