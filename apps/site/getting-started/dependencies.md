# Dependencies

Complete reference of dependencies used in the Sando Design System.

## System Requirements

Before installing Sando, ensure your system meets these requirements:

### Required

- **Node.js**: `>=18.0.0`
- **Package Manager**: `pnpm@8.15.0` (recommended) or `npm@>=9.0.0`

### Verify Installation

```bash
# Check Node version
node --version  # Should be 18.0.0 or higher

# Check pnpm version
pnpm --version  # Should be 8.15.0
```

### Install pnpm

If you don't have pnpm installed:

```bash
npm install -g pnpm@8.15.0
```

## Production Dependencies

These are the only dependencies needed when using Sando in your project:

### `@sando/tokens` Package

The tokens package has **zero runtime dependencies**. It only includes:

- Pure CSS custom properties
- JSON token files
- No JavaScript runtime required

```json
{
  "devDependencies": {
    "style-dictionary": "^4.0.0" // Build-time only
  }
}
```

### `@sando/components` Package 🚧

When available, components will depend on:

```json
{
  "dependencies": {
    "lit": "^3.1.0" // Web Components framework
  }
}
```

## Development Dependencies

Dependencies used for developing the Sando Design System monorepo:

### Build Tools

| Package            | Version | Purpose                        |
| ------------------ | ------- | ------------------------------ |
| `turbo`            | `2.5.8` | Monorepo build orchestration   |
| `vite`             | `5.0.8` | Development server and bundler |
| `style-dictionary` | `4.0.0` | Token transformation           |
| `typescript`       | `5.3.3` | Type checking and compilation  |

### Testing

| Package                       | Version  | Purpose                      |
| ----------------------------- | -------- | ---------------------------- |
| `vitest`                      | `1.0.0`  | Unit testing framework       |
| `@vitest/coverage-v8`         | `1.0.0`  | Code coverage                |
| `@vitest/ui`                  | `1.0.0`  | Test UI                      |
| `@playwright/test`            | `1.40.0` | E2E testing                  |
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
| `prettier`                         | `3.1.1`  | Code formatting               |

### Documentation (Storybook)

| Package                          | Version | Purpose                 |
| -------------------------------- | ------- | ----------------------- |
| `storybook`                      | `7.6.0` | Component documentation |
| `@storybook/web-components`      | `7.6.0` | Web Components support  |
| `@storybook/web-components-vite` | `7.6.0` | Vite integration        |
| `@storybook/addon-essentials`    | `7.6.0` | Core addons             |
| `@storybook/addon-a11y`          | `7.6.0` | Accessibility testing   |
| `@storybook/addon-links`         | `7.6.0` | Story linking           |
| `@storybook/blocks`              | `7.6.0` | Documentation blocks    |

### Version Management

| Package           | Version  | Purpose                        |
| ----------------- | -------- | ------------------------------ |
| `@changesets/cli` | `2.29.7` | Version & changelog management |
| `husky`           | `8.0.3`  | Git hooks                      |
| `lint-staged`     | `15.2.0` | Pre-commit linting             |

### Component Development

| Package                              | Version  | Purpose                     |
| ------------------------------------ | -------- | --------------------------- |
| `lit`                                | `3.1.0`  | Web Components framework    |
| `@custom-elements-manifest/analyzer` | `0.9.0`  | Generate component metadata |
| `react`                              | `18.2.0` | Storybook dependency        |
| `react-dom`                          | `18.2.0` | Storybook dependency        |

## Browser Support

Sando is built for modern browsers with native Web Components support:

### Supported Browsers

- ✅ **Chrome/Edge**: 90+
- ✅ **Firefox**: 88+
- ✅ **Safari**: 14+
- ✅ **Opera**: 76+

### Legacy Browser Support

For older browsers (IE11, legacy Edge), you'll need polyfills:

```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2/webcomponents-loader.js"></script>
```

## Peer Dependencies

When using Sando components in frameworks, you may need additional dependencies:

### React/Next.js

```json
{
  "dependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}
```

No additional configuration needed - Web Components work natively in React.

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
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

### Svelte

```json
{
  "dependencies": {
    "svelte": ">=3.0.0"
  }
}
```

No additional configuration needed.

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

## Troubleshooting

### Node Version Issues

If you encounter Node version errors:

```bash
# Using nvm (Node Version Manager)
nvm install 18
nvm use 18

# Verify version
node --version
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

## Next Steps

- **[Installation Guide](/getting-started/installation)** - Install Sando in your project
- **[Quick Start](/getting-started/quick-start)** - Build your first component
- **[Contributing](/guides/contributing)** - Contribute to Sando
