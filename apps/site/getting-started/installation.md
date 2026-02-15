---
title: Installation
description: Install Sando Design System packages and start building accessible, themeable UIs in minutes.
---

# Installation

You're just a few commands away from adding Sando to your project. Let's get your kitchen set up.

## Prerequisites

Before you start, make sure you have:

- **Node.js** ≥ 20.0.0
- **A modern browser** — Chrome/Edge 90+, Firefox 88+, Safari 14+, Opera 76+
- **A package manager** — pnpm (recommended), npm, or yarn

::: tip Why pnpm?
We recommend [pnpm](https://pnpm.io/) for faster installs and efficient disk usage. Sando itself is built with pnpm. But npm and yarn work perfectly fine too.
:::

## Install Packages

Sando has two packages — **tokens** (the design language) and **components** (the UI elements). Install both:

::: code-group

```bash [pnpm]
pnpm add @sando/tokens @sando/components
```

```bash [npm]
npm install @sando/tokens @sando/components
```

```bash [yarn]
yarn add @sando/tokens @sando/components
```

:::

::: details Only need tokens?
If you're building your own components and just want the design tokens:

```bash
pnpm add @sando/tokens
```

:::

## What's in the Box

### `@sando/tokens`

The design language — your pantry of raw ingredients, flavor profiles, and component recipes:

- **CSS custom properties** — ready to use in any framework
- **Three-layer architecture** — Ingredients → Flavors → Recipes
- **6 curated flavors** — original, sando, tonkatsu, strawberry, egg-salad, kiwi
- **8 OKLCH color palettes** — perceptually uniform, accessible by default
- **Automatic accessibility modes** — dark, high contrast, reduced motion, forced colors

### `@sando/components`

Framework-agnostic Web Components built with [Lit](https://lit.dev):

- **19+ production components** — button, input, checkbox, switch, select, textarea, and more
- **14 skeleton loading patterns** — for polished loading states
- **TypeScript definitions** included
- **Tree-shakeable** ES modules — import only what you need

## Import Tokens

Load the design tokens CSS in your application entry point:

::: code-group

```ts [Vite / Webpack]
// main.ts or App.tsx
import "@sando/tokens/css";
```

```html [HTML]
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

## Import Components

Import components individually — they self-register as custom elements:

```ts
// Import the components you need
import "@sando/components/button";

// That's it! Use them in your HTML
// <sando-button variant="solid">Click me</sando-button>
```

## Load a Flavor

Flavors are loaded globally so they can cascade into component Shadow DOMs. Import a flavor CSS file to activate a theme:

```ts
// Load a flavor (global, Light DOM)
import "@sando/tokens/css/flavors/original/flavor.css";

// Or try a different one
import "@sando/tokens/css/flavors/tonkatsu/flavor.css";
import "@sando/tokens/css/flavors/strawberry/flavor.css";
```

::: tip Flavors inherit automatically
CSS custom properties from flavors naturally inherit from the Light DOM into Shadow DOM. No extra configuration needed — just import the flavor CSS globally.
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
  <sando-button variant="solid">Click me</sando-button>
</template>
```

::: tip Vue Config
Tell Vue to treat `sando-*` as custom elements in `vite.config.ts`:

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
<sando-button variant="solid">Click me</sando-button>
```

### Svelte

```svelte
<script>
  import '@sando/tokens/css';
  import '@sando/components/button';
</script>

<sando-button variant="solid">Click me</sando-button>
```

### Vanilla JavaScript

```html
<!doctype html>
<html lang="en">
  <head>
    <link
      rel="stylesheet"
      href="node_modules/@sando/tokens/dist/sando-tokens/css/index.css"
    />
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

Import only what you need for smaller bundles:

```ts
// Import specific components
import "@sando/components/button"; // <sando-button>
// import '@sando/components/input';   // <sando-input> — not yet exported individually
// import '@sando/components/checkbox'; // <sando-checkbox> — not yet exported individually

// Import specific token layers
import "@sando/tokens/css/ingredients"; // Primitives only
import "@sando/tokens/css/flavors"; // Semantic tokens
import "@sando/tokens/css/recipes"; // Component tokens
```

## CDN Usage

For quick prototyping or static sites:

```html
<!-- Load CSS tokens -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@sando/tokens/dist/sando-tokens/css/index.css"
/>

<!-- Load components -->
<script type="module">
  import "@sando/components/button";
</script>
```

::: warning Production Usage
For production applications, install via a package manager for better performance, caching, and version control.
:::

## Verify Your Installation

Paste this into your HTML to confirm everything is wired up:

```html
<script type="module">
  import "@sando/components/button";
</script>

<sando-button variant="solid">It works! 🍱</sando-button>
```

If you see a styled button, your Sando kitchen is ready.

## Browser Support

| Browser     | Minimum Version |
| ----------- | --------------- |
| Chrome/Edge | 90+             |
| Firefox     | 88+             |
| Safari      | 14+             |
| Opera       | 76+             |

## Next Steps

- **[Quick Start →](/getting-started/quick-start)** — Build your first component in 5 minutes
- **[Theming Guide →](/getting-started/theming)** — Learn flavors, dark mode, and customization
- **[Token Architecture →](/tokens/architecture)** — Understand the three-layer system
- **[Storybook →](https://rodrigolagodev.github.io/SandoDesignSystem/storybook/)** — Interactive component playground
