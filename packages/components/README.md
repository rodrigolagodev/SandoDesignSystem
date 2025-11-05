# @sando/components

> Framework-agnostic Web Components library for Sando Design System built with Lit

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Lit](https://img.shields.io/badge/Lit-3.3-orange)](https://lit.dev/)

A collection of production-ready, accessible, and themeable Web Components that work seamlessly with any framework or no framework at all.

## Features

- **Framework Agnostic**: Works with React, Vue, Angular, Svelte, or vanilla HTML/JavaScript
- **Type Safe**: Full TypeScript support with comprehensive type definitions and autocomplete
- **Accessible**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- **Themeable**: Multi-level theming via HTML attributes and CSS custom properties
- **Performant**: Lightweight components (<10KB gzipped) with tree-shakeable exports
- **Developer Experience**: Excellent DX with utilities, shared styles, and comprehensive documentation

## Quick Start

### Installation

```bash
npm install @sando/components @sando/tokens
# or
pnpm add @sando/components @sando/tokens
# or
yarn add @sando/components @sando/tokens
```

### Basic Usage

```typescript
// 1. Import design tokens CSS (once in your app entry point)
import '@sando/tokens/css';

// 2. Import components
import '@sando/components/button';

// 3. Use in your HTML/JSX/Vue templates
```

```html
<sando-button variant="solid" size="medium"> Click me </sando-button>
```

## Framework Integration

### Vanilla HTML/JavaScript

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="node_modules/@sando/tokens/dist/css/tokens.css" />
  </head>
  <body>
    <sando-button variant="solid">Click me</sando-button>

    <script type="module">
      import '@sando/components/button';

      const button = document.querySelector('sando-button');
      button.addEventListener('click', (e) => {
        console.log('Clicked!', e.detail);
      });
    </script>
  </body>
</html>
```

### React

```jsx
import '@sando/components/button';
import type { SandoButton } from '@sando/components';

function App() {
  const handleClick = (e: CustomEvent) => {
    console.log('Clicked!', e.detail);
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

For better TypeScript support in React:

```typescript
// types/jsx.d.ts
import { SandoButton } from '@sando/components';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sando-button': React.DetailedHTMLProps<
        React.HTMLAttributes<SandoButton> & Partial<SandoButton>,
        SandoButton
      >;
    }
  }
}
```

### Vue 3

```vue
<template>
  <sando-button variant="solid" size="medium" @click="handleClick"> Click me </sando-button>
</template>

<script setup lang="ts">
import '@sando/components/button';

const handleClick = (e: CustomEvent) => {
  console.log('Clicked!', e.detail);
};
</script>
```

Configure Vue to recognize custom elements:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('sando-')
        }
      }
    })
  ]
});
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import '@sando/components/button';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

```html
<!-- app.component.html -->
<sando-button variant="solid" size="medium" (click)="handleClick($event)"> Click me </sando-button>
```

### Svelte

```svelte
<script>
  import '@sando/components/button';

  function handleClick(e) {
    console.log('Clicked!', e.detail);
  }
</script>

<sando-button
  variant="solid"
  size="medium"
  on:click={handleClick}
>
  Click me
</sando-button>
```

## Theming

### Global Theme

Set the theme at the HTML or body level:

```html
<html flavor="dark">
  <body>
    <!-- All components use dark theme -->
    <sando-button>Dark Button</sando-button>
  </body>
</html>
```

### Section Theme

Override theme for specific sections:

```html
<div flavor="strawberry">
  <!-- These components use strawberry theme -->
  <sando-button>Strawberry Button</sando-button>
</div>
```

### Component-Level Override

Fine-grained control via CSS custom properties:

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

## Available Components

| Component           | Description                                         | Status     |
| ------------------- | --------------------------------------------------- | ---------- |
| `sando-button`      | Interactive button with multiple variants and sizes | ✅ Stable  |
| More coming soon... | Additional components in development                | 🚧 Planned |

## Component APIs

### sando-button

```typescript
import '@sando/components/button';
import type { SandoButton, ButtonVariant, ButtonSize } from '@sando/components';
```

**Properties:**

| Property    | Type                                      | Default      | Description                        |
| ----------- | ----------------------------------------- | ------------ | ---------------------------------- |
| `variant`   | `'solid' \| 'outline' \| 'ghost'`         | `'solid'`    | Visual style variant               |
| `size`      | `'small' \| 'medium' \| 'large'`          | `'medium'`   | Button size                        |
| `status`    | `'default' \| 'success' \| 'destructive'` | `'default'`  | Status variant                     |
| `disabled`  | `boolean`                                 | `false`      | Whether button is disabled         |
| `loading`   | `boolean`                                 | `false`      | Whether button is in loading state |
| `type`      | `'button' \| 'submit' \| 'reset'`         | `'button'`   | Button type for forms              |
| `fullWidth` | `boolean`                                 | `false`      | Whether button takes full width    |
| `flavor`    | `string`                                  | `'original'` | Design system theme                |

**Slots:**

- Default slot: Button content
- `icon-start`: Icon before text
- `icon-end`: Icon after text

**Events:**

- `click`: Fired when button is clicked (unless disabled/loading)

**Example:**

```html
<sando-button variant="solid" size="large" loading>
  <span slot="icon-start">⭐</span>
  Favorite
</sando-button>
```

## Advanced Usage

### Using Utilities

```typescript
import {
  // Event helpers
  createCustomEvent,
  dispatchCustomEvent,
  debounce,
  throttle,
  // DOM helpers
  isFocusable,
  getFocusableElements,
  trapFocus,
  // String helpers
  toKebabCase,
  toCamelCase,
  uniqueId,
  // Validation helpers
  isValidEmail,
  isValidUrl,
  clamp
} from '@sando/components/utils';

// Create debounced handler
const handleInput = debounce((e) => {
  console.log('Input:', e.target.value);
}, 300);
```

### Using Shared Styles

```typescript
import { LitElement, css } from 'lit';
import {
  buttonReset,
  focusVisible,
  transition,
  spinAnimation
} from '@sando/components/styles/shared';

class MyComponent extends LitElement {
  static styles = css`
    ${spinAnimation}

    button {
      ${buttonReset}
      ${transition}
    }

    button:focus-visible {
      ${focusVisible}
    }
  `;
}
```

### Token Consumption

```typescript
import { token, tokenWithFallback } from '@sando/components/styles/tokens';
import { tokens } from '@sando/tokens/recipes';
import { css } from 'lit';

const styles = css`
  .button {
    /* Using token helper */
    background: ${token(tokens.button.solid.backgroundColor.default)};

    /* Direct CSS custom property */
    color: var(--sando-button-solid-textColor-default);

    /* With fallback */
    border-radius: ${tokenWithFallback(tokens.button.borderRadius, '4px')};
  }
`;
```

## Package Exports

```typescript
// Main export - all components and utilities
import { SandoButton } from '@sando/components';

// Individual component export (tree-shakeable)
import { SandoButton } from '@sando/components/button';

// Utilities
import { debounce, throttle } from '@sando/components/utils';

// Types
import type { ComponentSize, ComponentVariant } from '@sando/components/types';

// Token helpers
import { token, tokenWithFallback } from '@sando/components/styles/tokens';

// Shared styles
import { buttonReset, focusVisible } from '@sando/components/styles/shared';
```

## Development

### Project Structure - MONOLITHIC COMPONENTS

Each component is **completely self-contained** in its own folder:

```
packages/components/
├── src/
│   ├── components/                    # MONOLITHIC COMPONENT ARCHITECTURE
│   │   ├── button/                    # Each folder is self-contained
│   │   │   ├── sando-button.ts              # Component implementation
│   │   │   ├── sando-button.types.ts        # Component types
│   │   │   ├── sando-button.stories.ts      # Storybook stories
│   │   │   ├── sando-button.test.ts         # Unit tests
│   │   │   ├── sando-button.spec.ts         # E2E tests
│   │   │   ├── sando-button.a11y.test.ts    # Accessibility tests
│   │   │   └── index.ts                     # Barrel export
│   │   └── ... (other components)
│   ├── styles/            # Shared styles and token helpers
│   ├── types/             # ONLY truly shared types
│   └── utils/             # Shared utility functions
├── docs/                  # Documentation
│   └── COMPONENT_TEMPLATE.md
├── ARCHITECTURE.md        # Detailed architecture documentation
└── README.md             # This file
```

**Benefits of Monolithic Structure:**

- Each component folder is portable - copy it to another project and it works
- Easy to find everything related to a component
- Tests live next to the code they test
- Clear ownership and responsibility
- Minimal dependencies on shared code

### Scripts

```bash
# Development
pnpm dev                   # Start dev server with HMR
pnpm build                 # Build for production
pnpm build:watch          # Build in watch mode

# Testing
pnpm test                  # Run unit tests
pnpm test:watch           # Run tests in watch mode
pnpm test:coverage        # Run tests with coverage
pnpm test:e2e             # Run E2E tests
pnpm test:e2e:ui          # Run E2E tests with UI

# Code Quality
pnpm lint                  # Lint code
pnpm lint:fix             # Fix linting issues
pnpm format               # Format code
pnpm format:check         # Check formatting

# Other
pnpm analyze              # Generate custom elements manifest
pnpm clean                # Clean build artifacts
```

### Creating New Components

See [COMPONENT_TEMPLATE.md](./docs/COMPONENT_TEMPLATE.md) for a comprehensive guide.

**IMPORTANT: Each component must have ALL these files:**

1. Create directory: `src/components/your-component/`
2. Create ALL required files in the folder:
   - `sando-your-component.ts` - Component implementation
   - `sando-your-component.types.ts` - Type definitions
   - `sando-your-component.stories.ts` - Storybook documentation
   - `sando-your-component.test.ts` - Unit tests
   - `sando-your-component.spec.ts` - E2E tests
   - `sando-your-component.a11y.test.ts` - Accessibility tests
   - `index.ts` - Barrel export
3. Export from `src/index.ts` using the barrel export
4. Add export to `package.json` (if needed)

This ensures every component is self-contained and fully tested.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Samsung Internet 15+

All modern browsers that support:

- ES2020
- Web Components (Custom Elements v1, Shadow DOM v1)
- CSS Custom Properties

## Contributing

See the main repository [CONTRIBUTING.md](../../CONTRIBUTING.md) for:

- Development workflow
- Code style guidelines
- Pull request process
- Component graduation criteria

## Documentation

- **Architecture Guide**: [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed monolithic component architecture
- **Component Template**: [COMPONENT_TEMPLATE.md](./docs/COMPONENT_TEMPLATE.md) - Step-by-step guide with all required files
- **Storybook**: Run `pnpm --filter @sando/docs dev` to view interactive documentation

## Related Packages

- [`@sando/tokens`](../tokens/README.md) - Design tokens with three-layer architecture
- [`@sando/docs`](../../apps/docs/README.md) - Storybook documentation site

## License

MIT © Sando Design System Team

## Support

- **Issues**: [GitHub Issues](https://github.com/rodrigolagodev/SandoDesignSystem/issues)
- **Discussions**: [GitHub Discussions](https://github.com/rodrigolagodev/SandoDesignSystem/discussions)
- **Documentation**: Storybook (run `pnpm docs:dev`)

---

Built with ❤️ using [Lit](https://lit.dev) and [Vite](https://vitejs.dev)
