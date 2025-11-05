# Installation

Get started with Sando Design System tokens in your project.

::: warning Components Not Yet Available
The `@sando/components` package is under development. Currently, only `@sando/tokens` is available for use. Component installation instructions below are for future reference.
:::

## Package Manager

Install the Sando tokens package:

::: code-group

```bash [pnpm]
pnpm add @sando/tokens
```

```bash [npm]
npm install @sando/tokens
```

```bash [yarn]
yarn add @sando/tokens
```

:::

### Future: Components (Coming Soon)

```bash
# Will be available soon
pnpm add @sando/components @sando/tokens
```

## What's Included

### `@sando/tokens` ✅ Available Now

Design tokens in multiple formats:

- CSS custom properties (fully functional)
- JSON token files
- Three-layer architecture (Ingredients → Flavors → Recipes)
- SCSS variables (coming soon)
- JavaScript/TypeScript exports (coming soon)

### `@sando/components` 🚧 Under Development

Web Components built with Lit (coming soon):

- Framework-agnostic UI components
- TypeScript definitions included
- Tree-shakeable ES modules

## CDN Usage

For quick prototyping or static sites, you can use a CDN:

```html
<!-- Load from unpkg -->
<script type="module">
  import { SandoButton } from "https://unpkg.com/@sando/components";
</script>

<!-- Load CSS tokens -->
<link rel="stylesheet" href="https://unpkg.com/@sando/tokens/css/index.css" />
```

::: warning Production Usage
For production applications, we recommend installing via npm for better performance and caching.
:::

## CSS Import

Import the design tokens CSS in your application:

::: code-group

```js [Vite/Webpack]
// main.js or App.tsx
import "@sando/tokens/css";
```

```html [HTML]
<!-- index.html -->
<link
  rel="stylesheet"
  href="node_modules/@sando/tokens/dist/sando-tokens/css/index.css"
/>
```

```css [CSS]
/* styles.css */
@import "@sando/tokens/css";
```

:::

## Framework-Specific Setup

### React / Next.js

```tsx
// App.tsx
import "@sando/tokens/css";
import "@sando/components/button";

function App() {
  return <sando-button variant="solid">Click me</sando-button>;
}
```

::: tip TypeScript Support
Add to your `vite-env.d.ts` or `global.d.ts`:

```ts
/// <reference types="@sando/components" />
```

This enables autocomplete and type checking for Sando components in JSX.
:::

### Vue 3

```vue
<script setup lang="ts">
import "@sando/tokens/css";
import "@sando/components/button";
</script>

<template>
  <sando-button variant="solid"> Click me </sando-button>
</template>
```

::: tip Vue Config
Tell Vue to ignore custom elements in `vite.config.ts`:

```ts
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith("sando-"),
        },
      },
    }),
  ],
});
```

:::

### Angular

```ts
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import "@sando/tokens/css";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

```ts
// component.ts
import "@sando/components/button";
```

```html
<!-- component.html -->
<sando-button variant="solid"> Click me </sando-button>
```

### Svelte

```svelte
<script>
  import '@sando/tokens/css'
  import '@sando/components/button'
</script>

<sando-button variant="solid">
  Click me
</sando-button>
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="node_modules/@sando/tokens/css/index.css" />
    <script type="module">
      import "@sando/components/button";
    </script>
  </head>
  <body>
    <sando-button variant="solid">Click me</sando-button>
  </body>
</html>
```

## Selective Imports

Import only what you need for smaller bundle sizes:

```js
// Import specific components
import "@sando/components/button";
import "@sando/components/input";
import "@sando/components/card";

// Import specific token layers
import "@sando/tokens/css/ingredients"; // Primitives only
import "@sando/tokens/css/flavors"; // Semantic tokens
import "@sando/tokens/css/recipes"; // Component tokens
```

## Browser Support

Sando supports all modern browsers with native Web Components support:

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

::: warning Legacy Browsers
For older browsers (IE11, legacy Edge), you'll need [polyfills](https://github.com/webcomponents/polyfills).
:::

## Verification

Verify your installation:

```html
<script type="module">
  import "@sando/components/button";

  const button = document.createElement("sando-button");
  button.textContent = "It works!";
  document.body.appendChild(button);
</script>
```

## Next Steps

✅ **Installation complete!**

Continue to:

- [Quick Start Guide →](/getting-started/quick-start)
- [Theming Guide →](/getting-started/theming)
- [Component Overview →](/components/overview)
- [Dependencies Reference →](/getting-started/dependencies)
