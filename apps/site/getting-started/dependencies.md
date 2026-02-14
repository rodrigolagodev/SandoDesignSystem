---
title: Dependencies
description: Complete reference of dependencies, system requirements, and package exports for the Sando Design System
---

# Dependencies

Every great recipe starts with knowing your ingredients. This page covers everything Sando needs to run—from system requirements to the exact packages under the hood.

## System Requirements

Before installing Sando, make sure your kitchen is properly equipped:

### Required

- **Node.js**: `>=20.0.0`
- **Package Manager**: `pnpm@>=8.15.0` (recommended) or `npm@>=9.0.0`

### Verify Installation

```bash
# Check Node version
node --version  # Should be 20.0.0 or higher

# Check pnpm version
pnpm --version  # Should be 8.15.0 or higher
```

### Install pnpm

If you don't have pnpm installed:

```bash
npm install -g pnpm
```

::: tip Why pnpm?
The Sando monorepo uses pnpm workspaces for efficient dependency management. While you can use npm or yarn to install `@sando/tokens` and `@sando/components` in your own project, pnpm is required if you're contributing to the design system itself.
:::

---

## Production Dependencies

These are the only dependencies your project needs when using Sando. We keep the ingredient list short on purpose.

### `@sando/tokens`

The tokens package has **zero runtime dependencies**. It produces pure CSS custom properties and JSON token files—no JavaScript runtime required.

```json
{
  "devDependencies": {
    "style-dictionary": "^4.0.0"
  }
}
```

::: details Build-time Only
Style Dictionary is used at build time to transform token JSON files into CSS custom properties. It's never shipped to your users.
:::

### `@sando/components`

The components package depends on Lit for Web Components rendering and on `@sando/tokens` for design tokens:

```json
{
  "dependencies": {
    "lit": "^3.1.0",
    "@sando/tokens": "workspace:*"
  }
}
```

Lit is lightweight (~7KB minified+gzipped) and provides reactive properties, declarative templates, and Shadow DOM encapsulation—the essentials for framework-agnostic Web Components.

---

## Development Dependencies

These packages are used for developing the Sando Design System monorepo. You don't need these in your project.

### Build Tools

| Package            | Version | Purpose                        |
| ------------------ | ------- | ------------------------------ |
| `turbo`            | `2.5.8` | Monorepo build orchestration   |
| `vite`             | `6.4.1` | Development server and bundler |
| `style-dictionary` | `4.0.0` | Token transformation           |
| `typescript`       | `5.9.3` | Type checking and compilation  |

### Testing

| Package                       | Version  | Purpose                      |
| ----------------------------- | -------- | ---------------------------- |
| `vitest`                      | `3.2.4`  | Unit testing framework       |
| `@vitest/coverage-v8`         | `3.2.4`  | Code coverage                |
| `@vitest/ui`                  | `3.2.4`  | Test UI                      |
| `@playwright/test`            | `1.55.1` | E2E testing                  |
| `@web/test-runner`            | `0.18.0` | Web Component testing        |
| `@web/test-runner-playwright` | `0.11.0` | Playwright integration       |
| `@open-wc/testing`            | `4.0.0`  | Web Component test utilities |
| `jsdom`                       | `23.0.0` | DOM implementation for Node  |

### Linting & Formatting

| Package                            | Version  | Purpose                       |
| ---------------------------------- | -------- | ----------------------------- |
| `eslint`                           | `8.56.0` | JavaScript/TypeScript linting |
| `@typescript-eslint/eslint-plugin` | `6.15.0` | TypeScript ESLint rules       |
| `@typescript-eslint/parser`        | `6.15.0` | TypeScript parser for ESLint  |
| `eslint-plugin-lit`                | `1.11.0` | Lit-specific linting rules    |
| `eslint-plugin-wc`                 | `2.0.4`  | Web Components linting        |
| `eslint-config-prettier`           | `9.1.0`  | Prettier integration          |
| `prettier`                         | `3.6.2`  | Code formatting               |

### Storybook

| Package                          | Version  | Purpose                 |
| -------------------------------- | -------- | ----------------------- |
| `storybook`                      | `8.6.14` | Component documentation |
| `@storybook/web-components`      | `8.6.14` | Web Components support  |
| `@storybook/web-components-vite` | `8.6.14` | Vite integration        |
| `@storybook/addon-essentials`    | `8.6.14` | Core addons             |
| `@storybook/addon-a11y`          | `8.6.14` | Accessibility testing   |
| `@storybook/addon-links`         | `8.6.14` | Story linking           |
| `@storybook/blocks`              | `8.6.14` | Documentation blocks    |

### Version Management

| Package           | Version  | Purpose                        |
| ----------------- | -------- | ------------------------------ |
| `@changesets/cli` | `2.29.7` | Version & changelog management |
| `husky`           | `8.0.3`  | Git hooks                      |
| `lint-staged`     | `15.2.0` | Pre-commit linting             |

### Component Development

| Package                              | Version  | Purpose                     |
| ------------------------------------ | -------- | --------------------------- |
| `lit`                                | `3.3.1`  | Web Components framework    |
| `@custom-elements-manifest/analyzer` | `0.9.0`  | Generate component metadata |
| `react`                              | `18.2.0` | Storybook dependency        |
| `react-dom`                          | `18.2.0` | Storybook dependency        |

---

## Browser Support

Sando is built for modern browsers with native Web Components and OKLCH color support:

### Supported Browsers

- **Chrome/Edge**: 111+ (OKLCH support)
- **Firefox**: 113+ (OKLCH support)
- **Safari**: 15.4+ (OKLCH support)
- **Opera**: 97+

::: warning OKLCH Color Space
Sando uses the OKLCH color space for perceptual uniformity. Browsers that don't support OKLCH (released before 2023) won't render colors correctly. All modern evergreen browsers support OKLCH.
:::

---

## Peer Dependencies

When using Sando components in frameworks, you may need these additional dependencies in your project:

### React / Next.js

```json
{
  "dependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

No additional configuration needed—Web Components work natively in React 19+. For React 18, wrap event handlers manually for custom events.

### Vue 3

```json
{
  "dependencies": {
    "vue": ">=3.0.0"
  }
}
```

Configure Vue to recognize Sando custom elements:

```ts
// vite.config.ts
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

### Angular

```json
{
  "dependencies": {
    "@angular/core": ">=14.0.0"
  }
}
```

Enable custom elements schema:

```ts
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

### Svelte

```json
{
  "dependencies": {
    "svelte": ">=3.0.0"
  }
}
```

No additional configuration needed. Svelte handles custom elements natively.

---

## Package Exports

### `@sando/tokens`

```json
{
  "exports": {
    "./css": "./dist/sando-tokens/css/index.css",
    "./css/ingredients": "./dist/sando-tokens/css/ingredients/index.css",
    "./css/ingredients/*": "./dist/sando-tokens/css/ingredients/*.css",
    "./css/flavors": "./dist/sando-tokens/css/flavors/index.css",
    "./css/flavors/*": "./dist/sando-tokens/css/flavors/*.css",
    "./css/recipes": "./dist/sando-tokens/css/recipes/index.css",
    "./css/recipes/*": "./dist/sando-tokens/css/recipes/*.css"
  }
}
```

**Usage:**

```ts
// Import all tokens
import "@sando/tokens/css";

// Import specific layers
import "@sando/tokens/css/ingredients";
import "@sando/tokens/css/flavors";
import "@sando/tokens/css/recipes";

// Import specific files
import "@sando/tokens/css/ingredients/color";
import "@sando/tokens/css/flavors/original";
```

### `@sando/components`

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./button": "./dist/components/button/sando-button.js",
    "./utils": "./dist/utils/index.js",
    "./types": "./dist/types/index.js"
  }
}
```

**Usage:**

```ts
// Import all components (auto-registers custom elements)
import "@sando/components";

// Import only the button (tree-shakeable)
import "@sando/components/button";
```

::: tip Selective Imports
Currently, only `./button` has a dedicated export path. All other components are available through the main `@sando/components` entry point. More individual exports will be added as the library matures.
:::

---

## Updating Dependencies

### Check for Updates

```bash
# Check outdated packages
pnpm outdated

# Interactive update
pnpm update -i
```

### Update All

```bash
# Update all dependencies to latest
pnpm update --latest
```

### Update Specific Package

```bash
# Update specific package
pnpm update <package-name>

# Update to specific version
pnpm add <package-name>@<version> -D
```

---

## Security

### Audit Dependencies

```bash
# Check for security vulnerabilities
pnpm audit

# Fix vulnerabilities automatically
pnpm audit --fix
```

### Dependency Resolution

The project uses pnpm's strict resolution to ensure consistent dependencies:

```bash
# Verify dependency integrity
pnpm install --frozen-lockfile
```

---

## Troubleshooting

### Node Version Issues

If you encounter Node version errors:

```bash
# Using nvm (Node Version Manager)
nvm install 20
nvm use 20

# Verify version
node --version  # Should output v20.x.x or higher
```

### pnpm Issues

If pnpm commands fail:

```bash
# Clear pnpm cache
pnpm store prune

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Build Errors

If builds fail due to dependency issues:

```bash
# Clean and rebuild
pnpm clean
pnpm install
pnpm build
```

---

## Next Steps

- **[Installation Guide](/getting-started/installation)** — Install Sando in your project
- **[Quick Start](/getting-started/quick-start)** — Build your first component
- **[Contributing](/guides/contributing)** — Contribute to Sando
